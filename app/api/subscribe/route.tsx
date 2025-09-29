import { type NextRequest, NextResponse } from "next/server"
import { appConfig } from "@/app.config"

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = appConfig.rateLimiting.subscription.windowMs
  const maxRequests = appConfig.rateLimiting.subscription.maxRequests

  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email) {
    return { isValid: false, error: "Email is required" }
  }

  if (email.length > appConfig.validation.email.maxLength) {
    return { isValid: false, error: "Email is too long" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Invalid email format" }
  }

  return { isValid: true }
}

async function sendWelcomeEmail(email: string): Promise<boolean> {
  try {
    const welcomeTemplate = appConfig.email.templates.welcome

    const transactionalEmailResponse = await fetch(
      `${appConfig.email.brevo.apiUrl}${appConfig.email.brevo.endpoints.transactionalEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": appConfig.email.brevo.apiKey,
        },
        body: JSON.stringify({
          sender: welcomeTemplate.sender,
          to: [{ email }],
          subject: welcomeTemplate.subject,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1e40af; font-size: 28px; margin-bottom: 10px;">Welcome to Tech Saints!</h1>
                <p style="color: #6b7280; font-size: 16px;">Building Saints with Technology</p>
              </div>
              
              <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">🙏 Thank you for joining our mission!</h2>
                <p style="color: #4b5563; line-height: 1.6; margin-bottom: 15px;">
                  You've just become part of a growing community of Catholic technologists who are using their skills 
                  to serve God and neighbor through innovative, faith-driven projects.
                </p>
                <p style="color: #4b5563; line-height: 1.6;">
                  We believe technology should serve the universal call to sainthood, and together we're building 
                  tools that strengthen faith and evangelization.
                </p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">What's Next?</h3>
                <ul style="color: #4b5563; line-height: 1.6; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">Join our community discussions and prayer feed</li>
                  <li style="margin-bottom: 8px;">Explore open-source projects you can contribute to</li>
                  <li style="margin-bottom: 8px;">Connect with fellow Catholic technologists</li>
                  <li style="margin-bottom: 8px;">Attend virtual events and formation sessions</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
                  Built with ❤️ and 🙏 for the Kingdom of God
                </p>
                <p style="color: #6b7280; font-size: 12px;">
                  Tech Saints • Building Saints with Technology
                </p>
              </div>
            </div>
          `,
        }),
      },
    )

    return transactionalEmailResponse.ok
  } catch (error) {
    console.error("Failed to send welcome email:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many subscription attempts. Please try again later." }, { status: 429 })
    }

    const { email } = await request.json()

    // Validation
    const validation = validateEmail(email)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Add to Brevo contact list
    const brevoResponse = await fetch(`${appConfig.email.brevo.apiUrl}${appConfig.email.brevo.endpoints.contacts}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": appConfig.email.brevo.apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [appConfig.email.brevo.listId],
        attributes: {
          FIRSTNAME: "",
          LASTNAME: "",
          SOURCE: "Tech Saints Awareness Page",
          SIGNUP_DATE: new Date().toISOString(),
        },
        updateEnabled: true,
      }),
    })

    if (!brevoResponse.ok) {
      const error = await brevoResponse.json()
      console.error("Brevo API error:", error)

      // Handle duplicate contact gracefully
      if (error.code === "duplicate_parameter") {
        // Still send welcome email for existing contacts
        await sendWelcomeEmail(email)
        return NextResponse.json({
          success: true,
          message: "Welcome back! You're already subscribed to our newsletter.",
        })
      }

      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
    }

    // Send welcome email
    const emailSent = await sendWelcomeEmail(email)
    if (!emailSent) {
      console.warn("Contact added but welcome email failed to send")
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed! Check your email for a welcome message.",
    })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const appConfig = {
  // Email Configuration
  email: {
    brevo: {
      apiKey: process.env.BREVO_API_KEY || "",
      listId: Number.parseInt(process.env.BREVO_LIST_ID || "1"),
      apiUrl: "https://api.brevo.com/v3",
      endpoints: {
        contacts: "/contacts",
        transactionalEmail: "/smtp/email",
      },
    },
    templates: {
      welcome: {
        subject: "Welcome to Tech Saints - Building Saints with Technology",
        sender: {
          name: "Rhyan from Tech Saints",
          email: "hello@rhyan.dev",
        },
      },
    },
  },

  // Application Settings
  app: {
    name: "Tech Saints",
    description: "Building Saints with Technology",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://techsaints.dev",
    supportEmail: "support@techsaints.dev",
  },

  // Rate Limiting Configuration
  rateLimiting: {
    subscription: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5, // max 5 subscription attempts per window
    },
  },

  // Validation Settings
  validation: {
    email: {
      maxLength: 254,
      allowedDomains: [], // empty array means all domains allowed
    },
  },
} as const

export type AppConfig = typeof appConfig

export default appConfig

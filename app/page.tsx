"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Code, Heart, Users, Cross, Star, ArrowRight, Mail, Github, Linkedin } from "lucide-react"

export default function TechSaintsAwareness() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to Brevo
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-3 px-4 text-center text-sm">
        <span className="font-medium">🙏 Join our founding community of Catholic technologists</span>
        <Button variant="link" className="text-primary-foreground underline ml-2 p-0 h-auto">
          Sign the manifesto →
        </Button>
      </div>

      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cross className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-serif">Tech Saints</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#mission" className="text-muted-foreground hover:text-foreground transition-colors">
              Mission
            </a>
            <a href="#manifesto" className="text-muted-foreground hover:text-foreground transition-colors">
              Manifesto
            </a>
            {/* <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </a> */}
            <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </a>
          </nav>
          <Button variant="outline">Join Us</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-background via-muted/20 to-primary/5">
        <div className="container mx-auto max-w-4xl">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            Built by Tech Saints, for the Kingdom of God
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-balance leading-tight">
            Building Saints with <span className="text-primary">Technology</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto leading-relaxed">
            Unite with Catholic technologists worldwide to build open-source tools, resources, and media that draw
            people closer to Jesus Christ through faith and innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                disabled={isSubmitting || isSubmitted}
              />
              <Button type="submit" disabled={isSubmitting || isSubmitted} className="whitespace-nowrap">
                {isSubmitting ? "Joining..." : isSubmitted ? "Welcome!" : "Join the Mission"}
                {!isSubmitting && !isSubmitted && <ArrowRight className="ml-2 h-4 w-4" />}
                {isSubmitted && <CheckCircle className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </div>

          {isSubmitted && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-md mx-auto mb-8">
              <p className="text-primary font-medium">🎉 Welcome to the Tech Saints community!</p>
              <p className="text-sm text-muted-foreground mt-1">Check your email for next steps.</p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>500+ Catholic Technologists</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>25+ Open Source Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Faith-Driven Innovation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-serif mb-6">
                Technology as a Bridge to <span className="text-primary">Holiness</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe technology should serve the universal call to sainthood. Our mission is to equip and unite
                Catholic technologists to use code and creativity as offerings to God, developing tools that strengthen
                faith and evangelization.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Faith-First Development</h3>
                    <p className="text-muted-foreground text-sm">
                      Every project begins with prayer and aligns with Catholic teaching
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Open Source Community</h3>
                    <p className="text-muted-foreground text-sm">
                      Collaborative development that serves the common good
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Excellence in Craft</h3>
                    <p className="text-muted-foreground text-sm">
                      Professional-grade tools worthy of our divine calling
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cross className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif">Our Impact</h3>
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Members</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary">25+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">10+</div>
                    <div className="text-sm text-muted-foreground">Universities</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">100K+</div>
                    <div className="text-sm text-muted-foreground">Lives Touched</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold font-serif mb-6">Our Manifesto</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Five principles that guide every line of code, every design decision, and every community interaction.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Faith First",
                description: "Every project begins with prayer and aligns with Catholic teaching",
                icon: Cross,
                color: "text-primary",
              },
              {
                title: "Community over Ego",
                description: "We build together, share knowledge, and lift each other up",
                icon: Users,
                color: "text-secondary",
              },
              {
                title: "Open & Shared",
                description: "Our work serves the common good through open source principles",
                icon: Code,
                color: "text-accent",
              },
              {
                title: "Excellence in Craft",
                description: "Professional-grade tools worthy of our divine calling",
                icon: Star,
                color: "text-primary",
              },
              {
                title: "Prayerful Innovation",
                description: "Technology rooted in Catholic wisdom and tradition",
                icon: Heart,
                color: "text-secondary",
              },
            ].map((principle, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4`}>
                    <principle.icon className={`h-6 w-6 ${principle.color}`} />
                  </div>
                  <h3 className="font-bold mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section
        id="community"
        className="py-20 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif mb-6">Join Our Growing Community</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with Catholic students, professionals, professors, and business leaders who share your passion for
              faith-driven technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Students & Professionals</h3>
                <p className="text-muted-foreground mb-4">
                  Gain hands-on experience, find mentors, and build your portfolio while serving the Church.
                </p>
                <Badge variant="secondary">500+ Members</Badge>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Open Source Projects</h3>
                <p className="text-muted-foreground mb-4">
                  Contribute to rosary trackers, catechism searches, liturgical calendars, and more.
                </p>
                <Badge variant="secondary">25+ Active Projects</Badge>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">Prayer & Formation</h3>
                <p className="text-muted-foreground mb-4">
                  Share prayer intentions, join virtual retreats, and grow in holiness together.
                </p>
                <Badge variant="secondary">Daily Prayer Feed</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold font-serif mb-6">Ready to Build for the Kingdom?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of Catholic technologists who are using their skills to serve God and neighbor through
            innovative, faith-driven projects.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-8"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-primary-foreground text-foreground"
              disabled={isSubmitting || isSubmitted}
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting || isSubmitted}
              className="whitespace-nowrap"
            >
              {isSubmitting ? "Joining..." : isSubmitted ? "Welcome!" : "Join Now"}
              {!isSubmitting && !isSubmitted && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <p className="text-sm opacity-75">
            No spam, ever. Unsubscribe at any time. We respect your privacy and your faith.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/50 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cross className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold font-serif">Tech Saints</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building Saints with Technology. Unite with Catholic technologists worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Prayer Feed
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Projects
                  </a>
                </li> */}
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Members
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Manifesto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="p-2">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Tech Saints. Built with ❤️ and 🙏 for the Kingdom of God.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

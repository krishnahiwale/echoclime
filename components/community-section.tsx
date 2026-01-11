"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, MessageSquare, Trophy, Rocket, ArrowRight, Github, Twitter, CheckCircle } from "lucide-react"

const communityStats = [
  { icon: Users, value: "10,000+", label: "Active Members" },
  { icon: MessageSquare, value: "50,000+", label: "Discussions" },
  { icon: Trophy, value: "200+", label: "Contributors" },
  { icon: Rocket, value: "500+", label: "Projects Built" },
]

const contributors = [
  { name: "Alex M.", role: "Data Scientist", avatar: "A", contributions: 234 },
  { name: "Sarah K.", role: "Climate Researcher", avatar: "S", contributions: 189 },
  { name: "David L.", role: "Developer", avatar: "D", contributions: 156 },
  { name: "Emma W.", role: "Journalist", avatar: "E", contributions: 143 },
  { name: "Michael R.", role: "Policy Analyst", avatar: "M", contributions: 128 },
  { name: "Lisa T.", role: "Designer", avatar: "L", contributions: 112 },
]

export function CommunitySection() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    motivation: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsJoinModalOpen(false)
      setIsSubmitted(false)
      setFormData({ name: "", email: "", role: "", motivation: "" })
    }, 2000)
  }

  return (
    <section id="community" className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Users className="w-3 h-3 mr-1" />
            Community
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Join the Movement for
            <br />
            <span className="text-primary">Climate Action</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Connect with researchers, policymakers, and activists working together to understand and address
            environmental challenges.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contributors */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Top Contributors</h3>
            <p className="text-muted-foreground mb-8">
              Meet the dedicated individuals driving EchoClime forward with their expertise and passion.
            </p>
            <div className="space-y-4">
              {contributors.map((contributor, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                    {contributor.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{contributor.name}</p>
                    <p className="text-sm text-muted-foreground">{contributor.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{contributor.contributions}</p>
                    <p className="text-xs text-muted-foreground">contributions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Get Involved</h3>
            <p className="text-muted-foreground mb-8">
              Whether you&apos;re a developer, researcher, or climate enthusiast, there&apos;s a place for you in our
              community.
            </p>
            <div className="space-y-4 mb-8">
              <a
                href="https://github.com/echoclime"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors cursor-pointer"
              >
                <Github className="w-6 h-6 text-foreground" />
                <div>
                  <p className="font-semibold text-foreground">Contribute Code</p>
                  <p className="text-sm text-muted-foreground">Help improve our open-source tools</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
                <MessageSquare className="w-6 h-6 text-foreground" />
                <div>
                  <p className="font-semibold text-foreground">Join Discussions</p>
                  <p className="text-sm text-muted-foreground">Share insights and learn from others</p>
                </div>
              </div>
              <a
                href="https://twitter.com/echoclime"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors cursor-pointer"
              >
                <Twitter className="w-6 h-6 text-foreground" />
                <div>
                  <p className="font-semibold text-foreground">Follow Updates</p>
                  <p className="text-sm text-muted-foreground">Stay connected on social media</p>
                </div>
              </a>
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
              onClick={() => setIsJoinModalOpen(true)}
            >
              Join the Community
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Join EchoClime Community</DialogTitle>
            <DialogDescription>
              Be part of the movement for climate action. Fill in your details to join our community.
            </DialogDescription>
          </DialogHeader>
          {isSubmitted ? (
            <div className="flex flex-col items-center py-8">
              <CheckCircle className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Welcome to EchoClime!</h3>
              <p className="text-muted-foreground text-center">Check your email for next steps to get started.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input
                  id="role"
                  placeholder="e.g., Researcher, Developer, Student"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to join?</Label>
                <Textarea
                  id="motivation"
                  placeholder="Tell us about your interest in climate action..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Join Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Sparkles, Check, Calendar, CheckCircle } from "lucide-react"

const benefits = [
  "Access to real-time climate data",
  "Interactive visualization tools",
  "AI-powered insights",
  "Community collaboration",
]

export function CTASection() {
  const router = useRouter()
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    company: "",
    date: "",
    time: "",
  })

  const handleGetStarted = () => {
    router.push("/login")
  }

  const handleScheduleDemo = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsDemoModalOpen(false)
      setIsSubmitted(false)
      setDemoForm({ name: "", email: "", company: "", date: "", time: "" })
    }, 2000)
  }

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Start Free Today
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Ready to Transform How You
            <br />
            Understand Climate Data?
          </h2>

          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers, journalists, and policymakers using EchoClime to make sense of environmental
            data and drive meaningful action.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Check className="w-4 h-4 text-white" />
                <span className="text-white text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20 text-lg px-8 group"
              onClick={handleGetStarted}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 bg-transparent"
              onClick={() => setIsDemoModalOpen(true)}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>

          <p className="text-white/60 text-sm mt-6">No credit card required - Free forever for individuals</p>
        </div>
      </div>

      <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Schedule a Demo</DialogTitle>
            <DialogDescription>
              Book a personalized demo to see how EchoClime can help your organization.
            </DialogDescription>
          </DialogHeader>
          {isSubmitted ? (
            <div className="flex flex-col items-center py-8">
              <CheckCircle className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Demo Scheduled!</h3>
              <p className="text-muted-foreground text-center">We will send you a calendar invite shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleScheduleDemo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-name">Full Name</Label>
                <Input
                  id="demo-name"
                  placeholder="Enter your name"
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-email">Work Email</Label>
                <Input
                  id="demo-email"
                  type="email"
                  placeholder="you@company.com"
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-company">Company/Organization</Label>
                <Input
                  id="demo-company"
                  placeholder="Your organization"
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demo-date">Preferred Date</Label>
                  <Input
                    id="demo-date"
                    type="date"
                    value={demoForm.date}
                    onChange={(e) => setDemoForm({ ...demoForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-time">Preferred Time</Label>
                  <Select value={demoForm.time} onValueChange={(value) => setDemoForm({ ...demoForm, time: value })}>
                    <SelectTrigger id="demo-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Demo
                <Calendar className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

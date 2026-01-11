"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { DataVisualization } from "@/components/data-visualization"
import { IndiaMapDashboard } from "@/components/india-map-dashboard"
import { ImpactStories } from "@/components/impact-stories"
import { CommunitySection } from "@/components/community-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading EchoClime...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <IndiaMapDashboard />
      <FeaturesSection />
      <DataVisualization />
      <ImpactStories />
      <CommunitySection />
      <CTASection />
      <Footer />
    </main>
  )
}

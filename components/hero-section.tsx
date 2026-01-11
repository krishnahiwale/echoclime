"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, Play, Globe, Zap, TrendingUp, X } from "lucide-react"

export function HeroSection() {
  const globeRef = useRef<HTMLDivElement>(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    let rotation = 0
    const animate = () => {
      rotation += 0.2
      globe.style.transform = `rotateY(${rotation}deg)`
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Powered by Real-Time Climate Data
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              <span className="text-balance">Environmental Data </span>
              <span className="relative">
                <span className="text-primary">Storytelling</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-primary/40"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 text-pretty">
              Transform complex climate data into compelling visual narratives. Monitor, analyze, and share
              environmental insights that drive real change.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 group text-lg px-8"
              >
                Start Exploring
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary group text-lg px-8 bg-transparent"
                onClick={() => setIsVideoOpen(true)}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-700">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">10k+ researchers</span>
              </div>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>50M+ data points analyzed</span>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Globe Visualization */}
          <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />

              {/* Globe Container */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 shadow-2xl shadow-primary/20 overflow-hidden">
                {/* Globe Surface */}
                <div
                  ref={globeRef}
                  className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-background"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Continents Pattern */}
                  <div className="absolute inset-0 rounded-full opacity-60">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path
                            d="M 10 0 L 0 0 0 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-primary/30"
                          />
                        </pattern>
                      </defs>
                      <circle cx="100" cy="100" r="95" fill="url(#grid)" />
                      {/* Stylized continents */}
                      <ellipse cx="70" cy="60" rx="25" ry="15" fill="currentColor" className="text-primary/40" />
                      <ellipse cx="130" cy="80" rx="30" ry="20" fill="currentColor" className="text-primary/40" />
                      <ellipse cx="90" cy="130" rx="20" ry="25" fill="currentColor" className="text-primary/40" />
                    </svg>
                  </div>
                </div>

                {/* Orbit Ring */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />
                </div>

                {/* Data Points */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-chart-1 animate-ping" />
                <div
                  className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-chart-2 animate-ping"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-chart-3 animate-ping"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Global Coverage</p>
                    <p className="text-lg font-bold text-foreground">195 Countries</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Data Accuracy</p>
                    <p className="text-lg font-bold text-foreground">99.7%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-background border-border overflow-hidden">
          <DialogTitle className="sr-only">EchoClime Demo Video</DialogTitle>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
              onClick={() => setIsVideoOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="aspect-video bg-muted">
              {isVideoOpen && (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/8facy0nK8Lw?autoplay=1"
                  title="EchoClime Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

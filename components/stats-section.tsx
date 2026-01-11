"use client"

import { useEffect, useRef, useState } from "react"
import { Thermometer, Wind, Droplets, TreePine } from "lucide-react"

const stats = [
  {
    icon: Thermometer,
    value: 1.2,
    suffix: "°C",
    label: "Global Temperature Rise",
    description: "Since pre-industrial levels",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    icon: Wind,
    value: 421,
    suffix: "ppm",
    label: "CO₂ Concentration",
    description: "Current atmospheric level",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: Droplets,
    value: 3.4,
    suffix: "mm/yr",
    label: "Sea Level Rise",
    description: "Average annual increase",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: TreePine,
    value: 4.7,
    suffix: "M ha",
    label: "Forest Loss",
    description: "Annual deforestation rate",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toFixed(value % 1 !== 0 ? 1 : 0)}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Real-Time Climate Metrics</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Track critical environmental indicators updated continuously from global monitoring networks
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>

                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>

                {/* Progress Bar */}
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${stat.bgColor.replace("/10", "")}`}
                    style={{ width: `${Math.min((stat.value / 10) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

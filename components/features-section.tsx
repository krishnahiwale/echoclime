"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  BarChart3,
  Map,
  Bell,
  Share2,
  Sparkles,
  Shield,
  ArrowRight,
  Check,
  LineChart,
  Footprints,
  FileText,
  BookOpen,
  TrendingUp,
  Thermometer,
  Droplets,
  Users,
  MessageSquare,
  Lock,
  Key,
  FileCheck,
  Bot,
  Languages,
  Wand2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const temperatureData = [
  { month: "Jan", temp: 12 },
  { month: "Feb", temp: 14 },
  { month: "Mar", temp: 18 },
  { month: "Apr", temp: 22 },
  { month: "May", temp: 26 },
  { month: "Jun", temp: 30 },
]

const carbonData = [
  { name: "Transport", value: 35, color: "#22c55e" },
  { name: "Industry", value: 28, color: "#3b82f6" },
  { name: "Energy", value: 22, color: "#f59e0b" },
  { name: "Other", value: 15, color: "#8b5cf6" },
]

const emissionTrendData = [
  { year: "2020", emissions: 400 },
  { year: "2021", emissions: 380 },
  { year: "2022", emissions: 350 },
  { year: "2023", emissions: 310 },
  { year: "2024", emissions: 280 },
  { year: "2025", emissions: 250 },
]

const collaborationData = [
  { name: "Research Team", members: 12, activity: 85 },
  { name: "Policy Group", members: 8, activity: 72 },
  { name: "Data Analysts", members: 15, activity: 93 },
]

const securityMetrics = [
  { label: "Encryption", status: "Active", icon: Lock },
  { label: "Access Control", status: "Enabled", icon: Key },
  { label: "Audit Logs", status: "Recording", icon: FileCheck },
]

const features = [
  {
    id: "analytics",
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Transform raw environmental data into actionable insights with AI-powered analysis and predictive modeling.",
    benefits: ["Real-time data processing", "Trend forecasting", "Anomaly detection", "Custom reports"],
    color: "primary",
    previewType: "analytics",
  },
  {
    id: "climate-analysis",
    icon: LineChart,
    title: "Climate Analysis",
    description:
      "Deep dive into climate patterns with sophisticated analysis tools powered by machine learning algorithms.",
    benefits: ["Temperature trends", "Precipitation analysis", "Seasonal patterns", "Climate projections"],
    color: "chart-2",
    hasPage: true,
    previewType: "temperature",
  },
  {
    id: "carbon-tracking",
    icon: Footprints,
    title: "Carbon Tracking",
    description:
      "Monitor and analyze carbon emissions across industries, regions, and time periods with precision tracking.",
    benefits: ["Emission monitoring", "Carbon footprint calculator", "Offset suggestions", "Compliance reporting"],
    color: "chart-3",
    hasPage: true,
    previewType: "carbon",
  },
  {
    id: "environmental-reports",
    icon: FileText,
    title: "Environmental Reports",
    description:
      "Generate comprehensive environmental impact reports with beautiful visualizations and actionable recommendations.",
    benefits: ["Auto-generated reports", "Custom templates", "PDF/Excel export", "Scheduled reports"],
    color: "chart-4",
    hasPage: true,
    previewType: "reports",
  },
  {
    id: "data-stories",
    icon: BookOpen,
    title: "Data Stories",
    description:
      "Create compelling data-driven narratives that communicate complex environmental information effectively.",
    benefits: ["Story templates", "Interactive embeds", "Social sharing", "Collaboration tools"],
    color: "chart-5",
    hasPage: true,
    previewType: "stories",
  },
  {
    id: "mapping",
    icon: Map,
    title: "Interactive Mapping",
    description:
      "Visualize environmental changes across the globe with stunning interactive maps and satellite imagery.",
    benefits: ["Satellite overlays", "Time-lapse views", "Heat mapping", "Region comparison"],
    color: "chart-2",
    previewType: "mapping",
  },
  {
    id: "alerts",
    icon: Bell,
    title: "Smart Alerts",
    description: "Stay informed with intelligent notifications for environmental events and threshold breaches.",
    benefits: ["Custom thresholds", "Multi-channel alerts", "Priority ranking", "Alert history"],
    color: "chart-3",
    previewType: "alerts",
  },
  {
    id: "collaboration",
    icon: Share2,
    title: "Team Collaboration",
    description: "Share insights and collaborate with researchers, policymakers, and communities worldwide.",
    benefits: ["Shared dashboards", "Comment threads", "Export options", "API access"],
    color: "chart-4",
    previewType: "collaboration",
  },
  {
    id: "ai",
    icon: Sparkles,
    title: "AI Storytelling",
    description: "Generate compelling data narratives automatically using advanced natural language processing.",
    benefits: ["Auto summaries", "Narrative generation", "Visual stories", "Multi-language"],
    color: "chart-5",
    previewType: "ai",
  },
  {
    id: "security",
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security ensuring your environmental data and research remains protected.",
    benefits: ["End-to-end encryption", "Role-based access", "Audit logs", "Compliance ready"],
    color: "chart-1",
    previewType: "security",
  },
]

function LivePreview({ type }: { type: string }) {
  switch (type) {
    case "temperature":
      return (
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={temperatureData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={10} />
              <YAxis stroke="#9ca3af" fontSize={10} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#f3f4f6" }}
              />
              <Area type="monotone" dataKey="temp" stroke="#22c55e" fill="url(#tempGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )
    case "carbon":
      return (
        <div className="h-40 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={carbonData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
              >
                {carbonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#f3f4f6" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-xs space-y-1">
            {carbonData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )
    case "analytics":
      return (
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={emissionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" stroke="#9ca3af" fontSize={10} />
              <YAxis stroke="#9ca3af" fontSize={10} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#f3f4f6" }}
              />
              <Line type="monotone" dataKey="emissions" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      )
    case "reports":
      return (
        <div className="h-40 space-y-2 p-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Environmental Report Q4</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-primary/10 rounded p-2">
              <p className="text-xs text-muted-foreground">CO2 Reduced</p>
              <p className="text-lg font-bold text-primary">-18%</p>
            </div>
            <div className="bg-emerald-500/10 rounded p-2">
              <p className="text-xs text-muted-foreground">Green Score</p>
              <p className="text-lg font-bold text-emerald-500">A+</p>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-1 h-2 bg-primary/20 rounded">
                <div className="h-full bg-primary rounded" style={{ width: `${100 - i * 10}%` }} />
              </div>
            ))}
          </div>
        </div>
      )
    case "stories":
      return (
        <div className="h-40 space-y-2 p-2">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Climate Story Builder</span>
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-gradient-to-r from-primary/20 to-transparent rounded animate-pulse" />
            <div className="h-8 bg-gradient-to-r from-emerald-500/20 to-transparent rounded animate-pulse delay-75" />
            <div className="h-8 bg-gradient-to-r from-blue-500/20 to-transparent rounded animate-pulse delay-150" />
          </div>
          <div className="flex gap-2 mt-2">
            <Badge className="text-xs bg-primary/10 text-primary">Interactive</Badge>
            <Badge className="text-xs bg-emerald-500/10 text-emerald-500">Shareable</Badge>
          </div>
        </div>
      )
    case "mapping":
      return (
        <div className="h-40 relative bg-gradient-to-br from-primary/5 to-emerald-500/5 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-primary/30 relative">
              <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <div className="absolute top-6 right-3 w-2 h-2 rounded-full bg-primary animate-ping delay-300" />
              <div className="absolute bottom-4 left-6 w-2 h-2 rounded-full bg-emerald-500 animate-ping delay-500" />
              <Map className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex gap-1">
            <div className="flex-1 h-1 bg-primary/40 rounded" />
            <div className="flex-1 h-1 bg-emerald-500/40 rounded" />
            <div className="flex-1 h-1 bg-red-500/40 rounded" />
          </div>
        </div>
      )
    case "alerts":
      return (
        <div className="h-40 space-y-2 p-2">
          <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded border border-red-500/20">
            <Bell className="w-4 h-4 text-red-500 animate-bounce" />
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">High AQI Alert</p>
              <p className="text-xs text-muted-foreground">Delhi - AQI 320</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded border border-orange-500/20">
            <Thermometer className="w-4 h-4 text-orange-500" />
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">Heat Warning</p>
              <p className="text-xs text-muted-foreground">Mumbai - 42°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-primary/10 rounded border border-primary/20">
            <Droplets className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">Good Air Quality</p>
              <p className="text-xs text-muted-foreground">Shimla - AQI 45</p>
            </div>
          </div>
        </div>
      )
    case "collaboration":
      return (
        <div className="h-40 space-y-2 p-2">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Active Teams</span>
          </div>
          {collaborationData.map((team, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{team.name}</p>
                  <p className="text-xs text-muted-foreground">{team.members} members</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${team.activity}%` }} />
                </div>
                <MessageSquare className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      )
    case "ai":
      return (
        <div className="h-40 space-y-2 p-2">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI Story Generator</span>
          </div>
          <div className="p-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg border border-primary/20">
            <div className="flex items-start gap-2">
              <Wand2 className="w-4 h-4 text-primary mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs text-foreground leading-relaxed">
                  "Global temperatures rose 1.2°C in 2024, with significant impacts on coastal regions..."
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-primary animate-pulse">Generating...</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="text-xs bg-purple-500/10 text-purple-500">
              <Languages className="w-3 h-3 mr-1" />
              12 Languages
            </Badge>
            <Badge className="text-xs bg-primary/10 text-primary">Auto Summary</Badge>
          </div>
        </div>
      )
    case "security":
      return (
        <div className="h-40 space-y-2 p-2">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Security Dashboard</span>
          </div>
          {securityMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <metric.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground">{metric.label}</span>
              </div>
              <Badge className="text-xs bg-emerald-500/10 text-emerald-500">{metric.status}</Badge>
            </div>
          ))}
          <div className="flex items-center gap-2 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-600">All systems operational</span>
          </div>
        </div>
      )
    default:
      return (
        <div className="h-40 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Interactive Preview</p>
          </div>
        </div>
      )
  }
}

export function FeaturesSection() {
  const router = useRouter()
  const [activeFeature, setActiveFeature] = useState(features[0])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalFeature, setModalFeature] = useState(features[0])

  const handleLearnMore = (feature: (typeof features)[0]) => {
    setModalFeature(feature)
    setIsModalOpen(true)
  }

  const handleExploreFeature = () => {
    setIsModalOpen(false)
    router.push("/login")
  }

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything you need to tell
            <br />
            <span className="text-primary">environmental stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comprehensive tools designed for researchers, journalists, and policymakers to understand and communicate
            climate data effectively.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature List */}
          <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-300",
                  activeFeature.id === feature.id
                    ? "bg-primary/10 border-primary/30 shadow-lg shadow-primary/10"
                    : "bg-card border-border hover:bg-secondary/50",
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center transition-colors shrink-0",
                      activeFeature.id === feature.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{feature.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Feature Detail */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-8 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <activeFeature.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{activeFeature.title}</h3>
                  <p className="text-muted-foreground">{activeFeature.description}</p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {activeFeature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Live Preview
                  </Badge>
                </div>
                <LivePreview type={activeFeature.previewType || "default"} />
              </div>

              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                onClick={() => handleLearnMore(activeFeature)}
              >
                Learn more about {activeFeature.title}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <modalFeature.icon className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-2xl">{modalFeature.title}</DialogTitle>
            </div>
            <DialogDescription>{modalFeature.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Key Features:</h4>
            <ul className="space-y-3">
              {modalFeature.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="bg-muted rounded-xl p-4">
              <LivePreview type={modalFeature.previewType || "default"} />
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleExploreFeature}
            >
              Explore {modalFeature.title}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

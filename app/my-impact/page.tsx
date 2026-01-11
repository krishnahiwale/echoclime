"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Zap,
  Leaf,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Award,
  Recycle,
  TreeDeciduous,
  Globe,
  Target,
  Flame,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const weeklyProgressData = [
  { day: "Mon", points: 40 },
  { day: "Tue", points: 65 },
  { day: "Wed", points: 85 },
  { day: "Thu", points: 70 },
  { day: "Fri", points: 90 },
  { day: "Sat", points: 110 },
  { day: "Sun", points: 150 },
]

const carbonBreakdownData = [
  { name: "Energy", value: 30, color: "#f59e0b" },
  { name: "Food", value: 25, color: "#3b82f6" },
  { name: "Transport", value: 35, color: "#22c55e" },
  { name: "Waste", value: 10, color: "#a855f7" },
]

const achievements = [
  {
    id: 1,
    name: "Seedling",
    description: "Started the green journey.",
    icon: TreeDeciduous,
    unlocked: true,
    points: 0,
  },
  {
    id: 2,
    name: "First Sprout",
    description: "First 100 points achieved.",
    icon: Leaf,
    unlocked: true,
    points: 100,
  },
  {
    id: 3,
    name: "Eco-Apprentice",
    description: "Learned the basics of climate action.",
    icon: Globe,
    unlocked: false,
    points: 200,
    locked: true,
  },
  {
    id: 4,
    name: "Master Recycler",
    description: "Reached 300 points in waste reduction.",
    icon: Recycle,
    unlocked: false,
    points: 300,
    locked: true,
  },
]

const dailyActions = [
  { id: 1, action: "No Single-Use Plastic", points: 10, completed: true },
  { id: 2, action: "Used Public Transit", points: 20, completed: true },
  { id: 3, action: "Sorted Out Trash", points: 5, completed: true },
  { id: 4, action: "Bought Second Hand", points: 20, completed: true },
  { id: 5, action: "Donated Old Clothes", points: 20, completed: true },
  { id: 6, action: "Planted a Tree", points: 50, completed: false },
  { id: 7, action: "Used Reusable Bags", points: 10, completed: false },
]

const impactStats = [
  {
    label: "GLOBAL RANK",
    value: "#1,422",
    subtext: "Top 5.2% globally",
    icon: Trophy,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    label: "ENERGY SAVED",
    value: "24.5 kWh",
    subtext: "Equivalent to 3 days of TV",
    icon: Zap,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "CO2 OFFSET",
    value: "12.8 kg",
    subtext: "Managed to save 2 trees!",
    icon: Leaf,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "LONGEST STREAK",
    value: "5 Days",
    subtext: "Personal Best: 15 Days",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

export default function MyImpactPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [completedActions, setCompletedActions] = useState(dailyActions)
  const [totalPoints, setTotalPoints] = useState(175)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const toggleAction = (id: number) => {
    setCompletedActions((prev) =>
      prev.map((action) => {
        if (action.id === id) {
          const newCompleted = !action.completed
          setTotalPoints((p) => (newCompleted ? p + action.points : p - action.points))
          return { ...action, completed: newCompleted }
        }
        return action
      }),
    )
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Your Climate Impact</h1>
            <p className="text-muted-foreground text-lg">Tracking your journey towards a greener future.</p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className={`${stat.bgColor} border-0 shadow-sm`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className={`text-xs font-semibold ${stat.color} tracking-wider`}>{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
                  <p className={`text-sm ${stat.color} flex items-center gap-1`}>
                    {stat.subtext}
                    {index === 0 && <TrendingUp className="w-3 h-3" />}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Achievements & Weekly Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Achievements Progress */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Award className="w-5 h-5 text-primary" />
                    Achievements Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`text-center p-4 rounded-xl border-2 transition-all ${
                          achievement.unlocked
                            ? "border-primary/30 bg-primary/5"
                            : "border-slate-200 bg-slate-50 opacity-60"
                        }`}
                      >
                        <div
                          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                            achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-slate-200 text-slate-400"
                          }`}
                        >
                          <achievement.icon className="w-8 h-8" />
                        </div>
                        <h4
                          className={`font-semibold mb-1 ${achievement.unlocked ? "text-foreground" : "text-slate-400"}`}
                        >
                          {achievement.name}
                        </h4>
                        <p className={`text-xs ${achievement.unlocked ? "text-muted-foreground" : "text-slate-400"}`}>
                          {achievement.description}
                        </p>
                        {achievement.locked && (
                          <p className="text-xs text-slate-400 mt-2 font-medium">LOCKED: {achievement.points} PTS</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Progress Chart */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Weekly Progress</CardTitle>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                          labelStyle={{ color: "#1e293b", fontWeight: 600 }}
                          formatter={(value: number) => [`${value} pts`, "Points"]}
                        />
                        <Bar dataKey="points" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Daily Actions & Carbon Breakdown */}
            <div className="space-y-6">
              {/* Daily Actions */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-5 h-5 text-primary" />
                    Daily Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {completedActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => toggleAction(action.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                        action.completed
                          ? "bg-primary/5 border-primary/20"
                          : "bg-slate-50 border-slate-200 hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${action.completed ? "text-primary" : "text-slate-300"}`} />
                        <span
                          className={`text-sm ${
                            action.completed ? "text-muted-foreground line-through" : "text-foreground"
                          }`}
                        >
                          {action.action}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          action.completed
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        +{action.points} PTS
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Carbon Breakdown */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Globe className="w-5 h-5 text-primary" />
                    Carbon Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={carbonBreakdownData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                          strokeWidth={0}
                        >
                          {carbonBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`${value}%`, "Percentage"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {carbonBreakdownData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-4 uppercase tracking-wide">
                    Based on your onboarding profile and recent weekly activity.
                  </p>
                </CardContent>
              </Card>

              {/* Current Streak */}
              <Card className="shadow-sm border-slate-200 bg-gradient-to-br from-orange-50 to-amber-50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Current Streak</p>
                      <p className="text-2xl font-bold text-orange-700">5 Days</p>
                    </div>
                  </div>
                  <Progress value={33} className="h-2 bg-orange-200" />
                  <p className="text-xs text-orange-600 mt-2">10 more days to unlock "Streak Master" badge!</p>
                </CardContent>
              </Card>

              {/* Total Points */}
              <Card className="shadow-sm border-primary/20 bg-primary/5">
                <CardContent className="p-5 text-center">
                  <p className="text-sm text-primary font-medium mb-1">Total Points Earned</p>
                  <p className="text-4xl font-bold text-primary">{totalPoints}</p>
                  <p className="text-xs text-muted-foreground mt-2">Keep going to unlock more achievements!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

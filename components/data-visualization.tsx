"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

const temperatureData = [
  { year: "2015", global: 0.87, arctic: 1.23, ocean: 0.74 },
  { year: "2016", global: 0.99, arctic: 1.41, ocean: 0.78 },
  { year: "2017", global: 0.91, arctic: 1.32, ocean: 0.77 },
  { year: "2018", global: 0.83, arctic: 1.19, ocean: 0.67 },
  { year: "2019", global: 0.98, arctic: 1.38, ocean: 0.77 },
  { year: "2020", global: 1.02, arctic: 1.45, ocean: 0.84 },
  { year: "2021", global: 0.84, arctic: 1.21, ocean: 0.73 },
  { year: "2022", global: 0.89, arctic: 1.29, ocean: 0.78 },
  { year: "2023", global: 1.18, arctic: 1.62, ocean: 0.92 },
  { year: "2024", global: 1.29, arctic: 1.78, ocean: 1.01 },
]

const emissionsData = [
  { sector: "Energy", value: 34 },
  { sector: "Transport", value: 16 },
  { sector: "Industry", value: 21 },
  { sector: "Buildings", value: 6 },
  { sector: "Agriculture", value: 14 },
  { sector: "Other", value: 9 },
]

const EMISSION_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"]

const radarData = [
  { category: "Air Quality", current: 72, target: 90 },
  { category: "Water", current: 85, target: 95 },
  { category: "Biodiversity", current: 58, target: 80 },
  { category: "Emissions", current: 45, target: 70 },
  { category: "Renewable", current: 68, target: 100 },
  { category: "Waste", current: 62, target: 85 },
]

export function DataVisualization() {
  const [activeTab, setActiveTab] = useState("temperature")

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Activity className="w-3 h-3 mr-1" />
            Data Insights
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Interactive Climate Visualizations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore comprehensive environmental data through beautiful, interactive charts updated with the latest
            scientific measurements.
          </p>
        </div>

        {/* Main Visualization */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">Environmental Trends</CardTitle>
                <CardDescription>Interactive data visualization dashboard</CardDescription>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-muted">
                  <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  <TabsTrigger value="emissions">Emissions</TabsTrigger>
                  <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab}>
              <TabsContent value="temperature" className="mt-0">
                <div className="grid lg:grid-cols-4 gap-6 mb-6">
                  <MetricCard
                    title="Global Average"
                    value="+1.29°C"
                    change="+0.11"
                    trend="up"
                    description="vs last year"
                  />
                  <MetricCard
                    title="Arctic Region"
                    value="+1.78°C"
                    change="+0.16"
                    trend="up"
                    description="vs last year"
                  />
                  <MetricCard
                    title="Ocean Surface"
                    value="+1.01°C"
                    change="+0.09"
                    trend="up"
                    description="vs last year"
                  />
                  <MetricCard
                    title="Rate of Change"
                    value="0.18°C"
                    change="-0.02"
                    trend="down"
                    description="per decade"
                  />
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" domain={[0.5, 2]} tickFormatter={(value) => `${value}°C`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                        formatter={(value: number) => [`${value}°C`, ""]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="global"
                        name="Global"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ fill: "#22c55e", strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: "#22c55e" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="arctic"
                        name="Arctic"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={{ fill: "#f59e0b", strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: "#f59e0b" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="ocean"
                        name="Ocean"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: "#3b82f6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="emissions" className="mt-0">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">CO₂ Emissions by Sector</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={emissionsData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                          <XAxis type="number" stroke="#9ca3af" unit="%" domain={[0, 40]} />
                          <YAxis dataKey="sector" type="category" stroke="#9ca3af" width={80} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1f2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                              color: "#fff",
                            }}
                            formatter={(value) => [`${value}%`, "Share"]}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {emissionsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={EMISSION_COLORS[index % EMISSION_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Sector Breakdown</h3>
                    {emissionsData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: EMISSION_COLORS[index % EMISSION_COLORS.length] }}
                          />
                          <span className="font-medium">{item.sector}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">{item.value}%</span>
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${item.value * 2.5}%`,
                                backgroundColor: EMISSION_COLORS[index % EMISSION_COLORS.length],
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sustainability" className="mt-0">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Sustainability Index</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="category" stroke="#9ca3af" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9ca3af" />
                          <Radar name="Current" dataKey="current" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                          <Radar name="Target" dataKey="target" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                          <Legend />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1f2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                              color: "#fff",
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Progress to Targets</h3>
                    {radarData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.category}</span>
                          <span className="text-muted-foreground">
                            {item.current} / {item.target}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${(item.current / item.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
  description,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
}) {
  return (
    <div className="bg-secondary/50 rounded-xl p-4">
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className={`flex items-center text-sm ${trend === "up" ? "text-amber-500" : "text-emerald-500"}`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {change}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  )
}

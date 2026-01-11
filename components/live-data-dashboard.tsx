"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Globe, Thermometer, Wind, Droplets, Sun, CloudRain, AlertTriangle, RefreshCw, MapPin } from "lucide-react"

const locations = [
  { id: 1, name: "Amazon Rainforest", temp: 28.4, humidity: 89, aqi: 42, status: "good" },
  { id: 2, name: "Arctic Circle", temp: -12.3, humidity: 65, aqi: 18, status: "excellent" },
  { id: 3, name: "Great Barrier Reef", temp: 26.8, humidity: 78, aqi: 35, status: "good" },
  { id: 4, name: "Sahara Desert", temp: 42.1, humidity: 12, aqi: 85, status: "moderate" },
  { id: 5, name: "Himalayan Range", temp: -8.5, humidity: 45, aqi: 22, status: "good" },
]

const alerts = [
  { id: 1, type: "warning", message: "Elevated CO₂ levels detected in Southeast Asia", time: "2 hours ago" },
  { id: 2, type: "info", message: "New climate data available for North Atlantic", time: "4 hours ago" },
  { id: 3, type: "alert", message: "Coral bleaching threshold reached in Pacific", time: "6 hours ago" },
]

export function LiveDataDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedLocation, setSelectedLocation] = useState(locations[0])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <section id="dashboard" className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Globe className="w-3 h-3 mr-1" />
              Live Dashboard
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Real-Time Monitoring</h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Track environmental conditions across global monitoring stations with live updates.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-lg font-mono font-semibold text-foreground">{currentTime.toLocaleTimeString()}</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-12 w-12 bg-transparent"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* World Map Preview */}
            <Card className="border-border bg-card/50 backdrop-blur overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Global Monitoring Stations
                  </CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {locations.length} Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-muted rounded-xl overflow-hidden">
                  {/* Simplified World Map */}
                  <svg viewBox="0 0 800 400" className="w-full h-full opacity-30">
                    <path
                      d="M150,100 Q200,80 250,90 T350,85 Q400,90 450,100 T550,95 Q600,85 650,100 L650,200 Q600,220 550,210 T450,220 Q400,230 350,220 T250,225 Q200,220 150,200 Z"
                      fill="currentColor"
                      className="text-primary/40"
                    />
                    <path
                      d="M100,180 Q150,170 200,185 T300,190 Q350,200 400,195 T500,200 L500,280 Q450,290 400,280 T300,285 Q250,280 200,290 T100,280 Z"
                      fill="currentColor"
                      className="text-primary/30"
                    />
                    <path
                      d="M550,180 Q600,175 650,185 T750,180 L750,260 Q700,270 650,260 T550,265 Z"
                      fill="currentColor"
                      className="text-primary/35"
                    />
                  </svg>

                  {/* Location Markers */}
                  {locations.map((loc, index) => {
                    const positions = [
                      { x: "25%", y: "45%" },
                      { x: "50%", y: "15%" },
                      { x: "85%", y: "55%" },
                      { x: "45%", y: "35%" },
                      { x: "70%", y: "30%" },
                    ]
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                          selectedLocation.id === loc.id ? "scale-125 z-10" : "hover:scale-110"
                        }`}
                        style={{ left: positions[index].x, top: positions[index].y }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full ${
                            selectedLocation.id === loc.id ? "bg-primary ring-4 ring-primary/30" : "bg-chart-2"
                          } animate-pulse`}
                        />
                        {selectedLocation.id === loc.id && (
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-2 shadow-lg whitespace-nowrap">
                            <p className="text-sm font-medium">{loc.name}</p>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Selected Location Details */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>{selectedLocation.name}</CardTitle>
                <CardDescription>Current environmental conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Thermometer className="w-5 h-5 text-chart-1" />
                      <span className="text-sm text-muted-foreground">Temperature</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{selectedLocation.temp}°C</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Droplets className="w-5 h-5 text-chart-2" />
                      <span className="text-sm text-muted-foreground">Humidity</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{selectedLocation.humidity}%</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Wind className="w-5 h-5 text-chart-3" />
                      <span className="text-sm text-muted-foreground">Air Quality</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{selectedLocation.aqi}</p>
                    <Badge
                      variant="secondary"
                      className={`mt-1 ${
                        selectedLocation.status === "excellent"
                          ? "bg-primary/10 text-primary"
                          : selectedLocation.status === "good"
                            ? "bg-chart-2/10 text-chart-2"
                            : "bg-chart-4/10 text-chart-4"
                      }`}
                    >
                      {selectedLocation.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Global Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data Coverage</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stations Online</span>
                    <span className="font-medium">847 / 912</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data Quality</span>
                    <span className="font-medium">99.7%</span>
                  </div>
                  <Progress value={99.7} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Weather Overview */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Weather Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <Sun className="w-8 h-8 mx-auto text-chart-4 mb-1" />
                    <p className="text-xs text-muted-foreground">Clear</p>
                    <p className="font-semibold">42%</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <CloudRain className="w-8 h-8 mx-auto text-chart-2 mb-1" />
                    <p className="text-xs text-muted-foreground">Rain</p>
                    <p className="font-semibold">28%</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <Wind className="w-8 h-8 mx-auto text-chart-3 mb-1" />
                    <p className="text-xs text-muted-foreground">Windy</p>
                    <p className="font-semibold">18%</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <Droplets className="w-8 h-8 mx-auto text-primary mb-1" />
                    <p className="text-xs text-muted-foreground">Humid</p>
                    <p className="font-semibold">12%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-chart-4" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${
                      alert.type === "alert"
                        ? "bg-destructive/10 border-destructive/30"
                        : alert.type === "warning"
                          ? "bg-chart-4/10 border-chart-4/30"
                          : "bg-primary/10 border-primary/30"
                    }`}
                  >
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  RefreshCw,
  Search,
  Navigation,
  AlertTriangle,
  TrendingUp,
  CloudRain,
  Sun,
  Gauge,
} from "lucide-react"
import {
  indianCities,
  statesList,
  getAqiColor,
  getAqiBackground,
  getStatusBadgeColor,
  type IndianCity,
} from "@/lib/indian-cities"

interface UserLocation {
  lat: number
  lng: number
  city: string | null
}

export function IndiaMapDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedCity, setSelectedCity] = useState<IndianCity>(indianCities[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Filter cities based on search and state
  const filteredCities = indianCities.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesState = selectedState === "All States" || city.state === selectedState
    return matchesSearch && matchesState
  })

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  // Get user's live location
  const detectLocation = () => {
    setIsLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          // Find nearest city
          let nearestCity = indianCities[0]
          let minDistance = Number.POSITIVE_INFINITY

          indianCities.forEach((city) => {
            const distance = Math.sqrt(Math.pow(city.lat - latitude, 2) + Math.pow(city.lng - longitude, 2))
            if (distance < minDistance) {
              minDistance = distance
              nearestCity = city
            }
          })

          setUserLocation({
            lat: latitude,
            lng: longitude,
            city: nearestCity.name,
          })
          setSelectedCity(nearestCity)
          setIsLocating(false)
        },
        () => {
          setIsLocating(false)
          alert("Unable to detect location. Please enable location services.")
        },
      )
    } else {
      setIsLocating(false)
      alert("Geolocation is not supported by your browser.")
    }
  }

  // Get city position on map
  const getCityPosition = (city: IndianCity) => {
    // Normalize coordinates to percentage of map
    // India bounds: lat 8-37, lng 68-97
    const x = ((city.lng - 68) / 29) * 100
    const y = ((37 - city.lat) / 29) * 100
    return { x: `${Math.min(95, Math.max(5, x))}%`, y: `${Math.min(95, Math.max(5, y))}%` }
  }

  return (
    <section className="py-12 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <MapPin className="w-3 h-3 mr-1" />
              India Environmental Monitor
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Real-Time India Dashboard</h2>
            <p className="text-muted-foreground max-w-xl">
              Track environmental conditions across 50+ Indian cities with live updates.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
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

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card"
            />
          </div>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full sm:w-48 bg-card">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {statesList.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={detectLocation} disabled={isLocating} className="bg-primary text-primary-foreground gap-2">
            <Navigation className={`w-4 h-4 ${isLocating ? "animate-pulse" : ""}`} />
            {isLocating ? "Detecting..." : "My Location"}
          </Button>
        </div>

        {/* User Location Alert */}
        {userLocation && (
          <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-4">
            <Navigation className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Your Location Detected</p>
              <p className="text-sm text-muted-foreground">
                Nearest monitoring station: <span className="text-primary font-medium">{userLocation.city}</span>{" "}
                (Coordinates: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
              </p>
            </div>
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* India Map */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border bg-card/50 backdrop-blur overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Indian Cities Monitoring
                  </CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {filteredCities.length} Cities
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-80 sm:h-96 bg-muted rounded-xl overflow-hidden">
                  {/* India Map SVG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-20" preserveAspectRatio="xMidYMid meet">
                    <path
                      d="M50,5 L60,8 L70,6 L78,12 L82,20 L85,30 L90,35 L88,45 L92,55 L90,65 L85,75 L78,82 L70,88 L60,92 L50,95 L40,92 L30,88 L22,82 L15,75 L10,65 L8,55 L12,45 L10,35 L15,30 L18,20 L22,12 L30,6 L40,8 Z"
                      fill="currentColor"
                      className="text-primary/40"
                    />
                  </svg>

                  {/* City Markers */}
                  {filteredCities.slice(0, 25).map((city) => {
                    const pos = getCityPosition(city)
                    return (
                      <button
                        key={city.id}
                        onClick={() => setSelectedCity(city)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
                          selectedCity.id === city.id ? "scale-150 z-20" : "hover:scale-125 z-10"
                        }`}
                        style={{ left: pos.x, top: pos.y }}
                        title={city.name}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedCity.id === city.id
                              ? "bg-primary ring-4 ring-primary/30"
                              : city.aqi <= 100
                                ? "bg-green-500"
                                : city.aqi <= 200
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          } ${selectedCity.id === city.id ? "" : "animate-pulse"}`}
                        />
                        {selectedCity.id === city.id && (
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-2 shadow-lg whitespace-nowrap z-30">
                            <p className="text-sm font-medium">{city.name}</p>
                            <p className="text-xs text-muted-foreground">{city.state}</p>
                          </div>
                        )}
                      </button>
                    )
                  })}

                  {/* User Location Marker */}
                  {userLocation && (
                    <div
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                      style={{
                        left: `${((userLocation.lng - 68) / 29) * 100}%`,
                        top: `${((37 - userLocation.lat) / 29) * 100}%`,
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-chart-2 flex items-center justify-center ring-4 ring-chart-2/30">
                        <Navigation className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 border border-border">
                    <p className="text-xs font-medium mb-2">Air Quality Index</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> Good
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-500" /> Moderate
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500" /> Poor
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected City Details */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedCity.name}
                      <Badge variant="outline" className={getStatusBadgeColor(selectedCity.status)}>
                        {selectedCity.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {selectedCity.state} | Population: {(selectedCity.population / 1000000).toFixed(2)}M
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`rounded-xl p-4 ${getAqiBackground(selectedCity.aqi)}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Gauge className={`w-5 h-5 ${getAqiColor(selectedCity.aqi)}`} />
                      <span className="text-sm text-muted-foreground">Air Quality</span>
                    </div>
                    <p className={`text-3xl font-bold ${getAqiColor(selectedCity.aqi)}`}>{selectedCity.aqi}</p>
                    <p className="text-xs text-muted-foreground mt-1">AQI Index</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Thermometer className="w-5 h-5 text-chart-1" />
                      <span className="text-sm text-muted-foreground">Temperature</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{selectedCity.temp}°C</p>
                    <p className="text-xs text-muted-foreground mt-1">Current</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Droplets className="w-5 h-5 text-chart-2" />
                      <span className="text-sm text-muted-foreground">Humidity</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{selectedCity.humidity}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Relative</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Wind className="w-5 h-5 text-chart-3" />
                      <span className="text-sm text-muted-foreground">Wind Speed</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{selectedCity.windSpeed}</p>
                    <p className="text-xs text-muted-foreground mt-1">km/h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* City List */}
            <Card className="border-border bg-card/50 backdrop-blur max-h-96 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">City Rankings</CardTitle>
                <CardDescription>Sorted by AQI (best to worst)</CardDescription>
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-64">
                <div className="space-y-2">
                  {[...filteredCities]
                    .sort((a, b) => a.aqi - b.aqi)
                    .slice(0, 10)
                    .map((city, index) => (
                      <button
                        key={city.id}
                        onClick={() => setSelectedCity(city)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedCity.id === city.id
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-secondary/50 hover:bg-secondary"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <div className="text-left">
                            <p className="font-medium text-sm">{city.name}</p>
                            <p className="text-xs text-muted-foreground">{city.state}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusBadgeColor(city.status)}>
                          {city.aqi}
                        </Badge>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  India Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cities with Good AQI</span>
                    <span className="font-medium">{indianCities.filter((c) => c.aqi <= 100).length}</span>
                  </div>
                  <Progress
                    value={(indianCities.filter((c) => c.aqi <= 100).length / indianCities.length) * 100}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cities Monitored</span>
                    <span className="font-medium">{indianCities.length}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">States Covered</span>
                    <span className="font-medium">{statesList.length - 1}</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Weather Overview */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">National Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <Sun className="w-8 h-8 mx-auto text-chart-4 mb-1" />
                    <p className="text-xs text-muted-foreground">Avg Temp</p>
                    <p className="font-semibold">
                      {Math.round(indianCities.reduce((a, b) => a + b.temp, 0) / indianCities.length)}°C
                    </p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <CloudRain className="w-8 h-8 mx-auto text-chart-2 mb-1" />
                    <p className="text-xs text-muted-foreground">Avg Rainfall</p>
                    <p className="font-semibold">
                      {Math.round(indianCities.reduce((a, b) => a + b.rainfall, 0) / indianCities.length)}mm
                    </p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <Wind className="w-8 h-8 mx-auto text-chart-3 mb-1" />
                    <p className="text-xs text-muted-foreground">Avg Wind</p>
                    <p className="font-semibold">
                      {Math.round(indianCities.reduce((a, b) => a + b.windSpeed, 0) / indianCities.length)} km/h
                    </p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <Droplets className="w-8 h-8 mx-auto text-primary mb-1" />
                    <p className="text-xs text-muted-foreground">Avg Humidity</p>
                    <p className="font-semibold">
                      {Math.round(indianCities.reduce((a, b) => a + b.humidity, 0) / indianCities.length)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-chart-4" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {indianCities
                  .filter((c) => c.aqi > 200)
                  .slice(0, 3)
                  .map((city) => (
                    <div key={city.id} className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                      <p className="text-sm font-medium">High AQI Alert: {city.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        AQI at {city.aqi} - Unhealthy air quality levels
                      </p>
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

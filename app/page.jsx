"use client"

import { useState, useEffect, useCallback } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Rocket,
  Users,
  Cpu,
  DollarSign,
  TrendingUp,
  Target,
  Leaf,
  Shield,
  Telescope,
  Home,
} from "lucide-react"

// Starfield background component - pure CSS
function Starfield() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const newStars = []
    for (let i = 0; i < 150; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 3,
      })
    }
    setStars(newStars)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white star-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
    </div>
  )
}

// Glass card component
function GlassCard({ children, className = "" }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>{children}</div>
  )
}

// Animated bar component
function AnimatedBar({ percentage, color, delay = 0 }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), delay)
    return () => clearTimeout(timer)
  }, [percentage, delay])

  return (
    <div
      className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
      style={{ width: `${width}%`, backgroundColor: color }}
    />
  )
}

// Funding data for chart
const fundingData = [
  { year: "2019", amount: 0.7, label: "Seed" },
  { year: "2020", amount: 5, label: "Pre-Series A" },
  { year: "2022", amount: 27, label: "Series A" },
  { year: "2023", amount: 36, label: "Series B" },
  { year: "2024", amount: 24, label: "Series B Ext" },
]

// Revenue data for chart
const revenueData = [
  { year: "FY23", revenue: 15.3, loss: 10.1 },
  { year: "FY24", revenue: 28.7, loss: 20.4 },
]

// Bar chart component
function BarChart({ data, dataKey, label, color = "#7F56D9" }) {
  const maxValue = Math.max(...data.map((d) => d[dataKey]))
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 mb-4">{label}</p>
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <span className="text-xs text-gray-400 w-12">{item.year}</span>
          <div className="flex-1 bg-white/10 rounded-full h-6 overflow-hidden">
            <AnimatedBar percentage={(item[dataKey] / maxValue) * 100} color={color} delay={index * 100} />
          </div>
          <span className="text-sm text-white w-16">${item[dataKey]}M</span>
        </div>
      ))}
    </div>
  )
}

// Slide indicator component
function SlideIndicator({ total, current, onSelect }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <GlassCard className="px-4 py-3 flex gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? "bg-purple-500 w-6" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </GlassCard>
    </div>
  )
}

// Slide 1: Title Slide
function Slide1({ onLaunch }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="slide-fade-in">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
              <Telescope className="w-8 h-8 text-white" />
            </div>
            <span className="text-5xl font-bold text-white tracking-tight">PIXXEL</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
            Pioneering Hyperspectral{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
              Earth Imaging
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Bangalore-Based Space-Tech Startup Building the World&apos;s Highest-Resolution Hyperspectral Satellite
            Constellation
          </p>
          <button
            onClick={onLaunch}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full text-white font-semibold hover:from-purple-500 hover:to-violet-500 transition-all hover:scale-105"
          >
            <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Launch Presentation
          </button>
        </div>
      </div>
    </div>
  )
}

// Slide 2: Company Overview
function Slide2() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <Home className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Company Overview</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="hover:bg-white/10 transition-all">
            <h3 className="text-purple-400 font-semibold mb-3">Founded</h3>
            <p className="text-4xl font-bold text-white mb-2">2019</p>
            <p className="text-gray-400">by Awais Ahmed & Kshitij Khandelwal (IIT-K alumni)</p>
          </GlassCard>

          <GlassCard className="hover:bg-white/10 transition-all">
            <h3 className="text-purple-400 font-semibold mb-3">Headquarters</h3>
            <p className="text-4xl font-bold text-white mb-2">Bangalore</p>
            <p className="text-gray-400">India&apos;s Silicon Valley</p>
          </GlassCard>

          <GlassCard className="hover:bg-white/10 transition-all">
            <h3 className="text-purple-400 font-semibold mb-3">Mission</h3>
            <p className="text-white">Deploy largest commercial hyperspectral satellite constellation</p>
            <p className="text-gray-400 mt-2">5-meter resolution imagery</p>
          </GlassCard>

          <GlassCard className="hover:bg-white/10 transition-all">
            <h3 className="text-purple-400 font-semibold mb-3">Vision</h3>
            <p className="text-white">&quot;Health monitor for the planet&quot;</p>
            <p className="text-gray-400 mt-2">Real-time Earth intelligence</p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

// Slide 3: Hyperspectral Technology
function Slide3() {
  const bands = [
    { name: "Visible", range: "400-700nm", color: "from-violet-500 via-green-500 to-red-500" },
    { name: "Near-IR", range: "700-1000nm", color: "from-red-600 to-red-900" },
    { name: "SWIR", range: "1000-2500nm", color: "from-red-900 to-amber-900" },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <Cpu className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Hyperspectral Technology</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <GlassCard className="mb-6">
              <h3 className="text-purple-400 font-semibold mb-4">What is Hyperspectral?</h3>
              <p className="text-gray-300 mb-4">
                Unlike RGB cameras (3 bands), hyperspectral captures{" "}
                <span className="text-purple-400 font-bold">150+ narrow bands</span> across the electromagnetic
                spectrum.
              </p>
              <p className="text-gray-400">
                This reveals chemical composition, material properties, and subtle changes invisible to traditional
                imaging.
              </p>
            </GlassCard>

            <GlassCard>
              <h3 className="text-purple-400 font-semibold mb-4">Spectral Bands</h3>
              <div className="space-y-3">
                {bands.map((band, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-16 h-4 rounded bg-gradient-to-r ${band.color}`} />
                    <div>
                      <span className="text-white font-medium">{band.name}</span>
                      <span className="text-gray-500 ml-2 text-sm">{band.range}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard className="flex flex-col justify-center">
            <h3 className="text-purple-400 font-semibold mb-4">Pixxel Advantage</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">5m</span>
                </div>
                <div>
                  <p className="text-white font-medium">Highest Resolution</p>
                  <p className="text-gray-400 text-sm">Industry-leading 5-meter hyperspectral imagery</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">24h</span>
                </div>
                <div>
                  <p className="text-white font-medium">Daily Revisit</p>
                  <p className="text-gray-400 text-sm">Full constellation enables daily global coverage</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">AI</span>
                </div>
                <div>
                  <p className="text-white font-medium">Aurora Platform</p>
                  <p className="text-gray-400 text-sm">ML-powered analytics for actionable insights</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

// Slide 4: Satellite Constellation
function Slide4() {
  const satellites = [
    { name: "Shakuntala (TD-2)", year: "2022", status: "Operational", desc: "Technology demonstrator" },
    { name: "Fireflies", year: "2024-25", status: "Launching", desc: "6 satellites, 5m resolution" },
    { name: "Honeybees", year: "2025-26", status: "Planned", desc: "18 satellites, full constellation" },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <Rocket className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Satellite Constellation</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {satellites.map((sat, i) => (
            <GlassCard key={i} className="hover:bg-white/10 transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    sat.status === "Operational"
                      ? "bg-green-500/20 text-green-400"
                      : sat.status === "Launching"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {sat.status}
                </span>
                <span className="text-gray-500 text-sm">{sat.year}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{sat.name}</h3>
              <p className="text-gray-400">{sat.desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard>
          <div className="flex flex-wrap justify-between gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-purple-400">24</p>
              <p className="text-gray-400">Total Satellites</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-400">5m</p>
              <p className="text-gray-400">Resolution</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-400">150+</p>
              <p className="text-gray-400">Spectral Bands</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-400">24hr</p>
              <p className="text-gray-400">Global Revisit</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

// Slide 5: Leadership Team
function Slide5() {
  const leaders = [
    { name: "Awais Ahmed", role: "Co-founder & CEO", bg: "Aerospace Engineer, Ex-ISRO, IIT-K" },
    { name: "Kshitij Khandelwal", role: "Co-founder & CTO", bg: "Spacecraft Systems, IIT-K" },
  ]

  const stats = [
    { value: "200+", label: "Team Members" },
    { value: "40+", label: "Countries Served" },
    { value: "6", label: "Global Offices" },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Leadership Team</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {leaders.map((leader, i) => (
            <GlassCard key={i} className="hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{leader.name[0]}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                  <p className="text-purple-400">{leader.role}</p>
                </div>
              </div>
              <p className="text-gray-400">{leader.bg}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard>
          <div className="flex flex-wrap justify-around gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-bold text-purple-400">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

// Slide 6: Funding & Financials
function Slide6() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <DollarSign className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Funding & Financials</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-6">Total Raised: $92M+</h3>
            <BarChart data={fundingData} dataKey="amount" label="Funding Rounds" />
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-6">Revenue Growth</h3>
            <BarChart data={revenueData} dataKey="revenue" label="Annual Revenue" color="#22c55e" />
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm">Key Investors</p>
              <p className="text-white mt-2">Google, Radical Ventures, Lightspeed, Blume, Athera VP</p>
            </div>
          </GlassCard>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <GlassCard className="text-center">
            <p className="text-3xl font-bold text-green-400">87%</p>
            <p className="text-gray-400 text-sm">Revenue Growth YoY</p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-3xl font-bold text-purple-400">$306M</p>
            <p className="text-gray-400 text-sm">Valuation (2024)</p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-3xl font-bold text-yellow-400">2027</p>
            <p className="text-gray-400 text-sm">IPO Target</p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

// Slide 7: Use Cases
function Slide7() {
  const useCases = [
    {
      icon: Leaf,
      title: "Agriculture",
      desc: "Crop health, soil moisture, yield prediction, pest detection",
    },
    {
      icon: Shield,
      title: "Defense & Intel",
      desc: "GEOSAT signed for reconnaissance, border monitoring",
    },
    {
      icon: Target,
      title: "Mining & Energy",
      desc: "Mineral exploration, oil spill detection, pipeline monitoring",
    },
    {
      icon: TrendingUp,
      title: "Environmental",
      desc: "Deforestation, carbon tracking, methane detection",
    },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <Target className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Industry Applications</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, i) => {
            const IconComponent = useCase.icon
            return (
              <GlassCard key={i} className="hover:bg-white/10 transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                    <p className="text-gray-400">{useCase.desc}</p>
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>

        <GlassCard className="mt-6">
          <div className="flex flex-wrap justify-between gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-400">$3.3B</p>
              <p className="text-gray-400 text-sm">TAM by 2032</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">40+</p>
              <p className="text-gray-400 text-sm">Countries Served</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">150+</p>
              <p className="text-gray-400 text-sm">Enterprise Clients</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

// Slide 8: Aurora Platform
function Slide8() {
  const features = [
    { title: "Automated Processing", desc: "Raw imagery to analysis-ready products" },
    { title: "ML Models", desc: "Pre-built models for agriculture, mining, environment" },
    { title: "API Access", desc: "Integrate satellite data into existing workflows" },
    { title: "Custom Analytics", desc: "Tailored solutions for enterprise needs" },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <Cpu className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Aurora Analytics Platform</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <GlassCard className="h-full">
              <h3 className="text-xl font-bold text-white mb-6">End-to-End Solution</h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl">
                    <h4 className="text-purple-400 font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-6">Key Metrics</h3>
            <div className="space-y-6">
              <div>
                <p className="text-3xl font-bold text-purple-400">95%</p>
                <p className="text-gray-400 text-sm">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">10x</p>
                <p className="text-gray-400 text-sm">Faster Analysis</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-400">50+</p>
                <p className="text-gray-400 text-sm">Pre-built Models</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

// Slide 9: Competitive Landscape
function Slide9() {
  const competitors = [
    { name: "Planet Labs", focus: "RGB/Multispectral", res: "3-5m", edge: "Large fleet" },
    { name: "Satellogic", focus: "Multispectral", res: "1m", edge: "High resolution" },
    { name: "BlackBridge", focus: "Multispectral", res: "5m", edge: "Agricultural focus" },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Competitive Landscape</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-6">Market Players</h3>
            <div className="space-y-4">
              {competitors.map((comp, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">{comp.name}</span>
                    <span className="text-gray-500 text-sm">{comp.res}</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {comp.focus} - {comp.edge}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-purple-900/30 to-violet-900/30">
            <h3 className="text-xl font-bold text-white mb-6">Pixxel Differentiation</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <p className="text-white">Only pure-play hyperspectral</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <p className="text-white">Highest resolution (5m) in class</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <p className="text-white">150+ bands vs 4-8 typical</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <p className="text-white">Integrated analytics platform</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <p className="text-white">Cost-effective Indian manufacturing</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

// Slide 10: Key Partnerships
function Slide10() {
  const partnerships = [
    { name: "Google", type: "Investor & Cloud Partner", desc: "Strategic investment, Google Cloud infrastructure" },
    { name: "ISRO", type: "Launch Partner", desc: "PSLV launches, technical collaboration" },
    { name: "NASA", type: "Research Partner", desc: "Landsat calibration, data validation" },
    { name: "GEOSAT", type: "Defense Partner", desc: "Indian defense & intelligence contracts" },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Strategic Partnerships</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {partnerships.map((partner, i) => (
            <GlassCard key={i} className="hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-violet-500/30 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-400">{partner.name[0]}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{partner.name}</h3>
                  <p className="text-purple-400 text-sm">{partner.type}</p>
                </div>
              </div>
              <p className="text-gray-400">{partner.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}

// Slide 11: Summary & Future
function Slide11() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full slide-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Building the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
              Future of Earth Observation
            </span>
          </h2>
          <p className="text-xl text-gray-400">Health monitor for the planet</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <GlassCard className="text-center">
            <p className="text-4xl font-bold text-purple-400 mb-2">2025</p>
            <p className="text-white font-semibold">Fireflies Complete</p>
            <p className="text-gray-400 text-sm">6 satellites operational</p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-4xl font-bold text-green-400 mb-2">2026</p>
            <p className="text-white font-semibold">Full Constellation</p>
            <p className="text-gray-400 text-sm">24 satellites, global coverage</p>
          </GlassCard>
          <GlassCard className="text-center">
            <p className="text-4xl font-bold text-yellow-400 mb-2">2027</p>
            <p className="text-white font-semibold">IPO Target</p>
            <p className="text-gray-400 text-sm">Public market debut</p>
          </GlassCard>
        </div>

        <GlassCard className="text-center bg-gradient-to-r from-purple-900/30 to-violet-900/30">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Telescope className="w-8 h-8 text-purple-400" />
            <span className="text-3xl font-bold text-white">PIXXEL</span>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            From Bangalore to the stars - Pixxel is revolutionizing how we see and understand our planet with
            hyperspectral intelligence.
          </p>
        </GlassCard>
      </div>
    </div>
  )
}

// Main Presentation Component
export default function PixxelPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const totalSlides = 11

  useEffect(() => {
    setIsClient(true)
  }, [])

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1)
    }
  }, [currentSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }, [currentSlide])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-screen bg-[#0b0c10] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  const slides = [
    <Slide1 key={0} onLaunch={nextSlide} />,
    <Slide2 key={1} />,
    <Slide3 key={2} />,
    <Slide4 key={3} />,
    <Slide5 key={4} />,
    <Slide6 key={5} />,
    <Slide7 key={6} />,
    <Slide8 key={7} />,
    <Slide9 key={8} />,
    <Slide10 key={9} />,
    <Slide11 key={10} />,
  ]

  return (
    <div className="relative w-full h-screen bg-[#0b0c10] overflow-hidden">
      <Starfield />

      {/* Slide Content */}
      <div className="relative z-10 w-full h-full">
        <div key={currentSlide} className="w-full h-full slide-enter">
          {slides[currentSlide]}
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentSlide < totalSlides - 1 && (
        <button
          onClick={nextSlide}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Slide Indicator */}
      <SlideIndicator total={totalSlides} current={currentSlide} onSelect={goToSlide} />

      {/* Slide Counter */}
      <div className="fixed top-6 right-6 z-50">
        <GlassCard className="px-4 py-2">
          <span className="text-purple-400 font-bold">{currentSlide + 1}</span>
          <span className="text-gray-500"> / {totalSlides}</span>
        </GlassCard>
      </div>
    </div>
  )
}

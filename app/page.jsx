"use client"

import { useState, useCallback, useEffect } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { motion, AnimatePresence } from "framer-motion"
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

// Particle configuration for space effect
const particlesOptions = {
  background: {
    color: { value: "#0b0c10" },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 120,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#7F56D9",
      distance: 150,
      enable: true,
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
    },
    number: {
      density: {
        enable: true,
        area: 900,
      },
      value: 100,
    },
    opacity: {
      value: 0.6,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
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

// Glass card component
function GlassCard({ children, className = "" }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>{children}</div>
  )
}

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
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item[dataKey] / maxValue) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="h-full rounded-full flex items-center justify-end pr-2"
              style={{ backgroundColor: color }}
            >
              <span className="text-xs font-semibold text-white">${item[dataKey]}M</span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Slide 1: Landing
function Slide1({ onLaunch }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-purple-600 bg-clip-text text-transparent mb-6">
          PIXXEL
        </h1>
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl text-gray-300 mb-4"
      >
        The Health Monitor for the Planet
      </motion.p>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm md:text-base text-gray-500 max-w-xl mb-8"
      >
        Seeing the unseen. From BITS Pilani to the World&apos;s Highest-Resolution Hyperspectral Constellation.
      </motion.p>
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onLaunch}
        className="group flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-semibold transition-all"
      >
        <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        Launch Mission
      </motion.button>
    </div>
  )
}

// Slide 2: Genesis
function Slide2() {
  return (
    <div className="h-full overflow-y-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Genesis</h2>
        <p className="text-purple-400 mb-8">The BITS Pilani Crucible</p>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="md:col-span-2">
            <p className="text-gray-300 leading-relaxed">
              The story of Pixxel begins not in a corporate boardroom, but in the dormitories of the
              <span className="text-purple-400 font-semibold">
                {" "}
                Birla Institute of Technology and Science (BITS) Pilani
              </span>
              , one of India&apos;s premier engineering institutes. In 2017, the founders were part of
              <span className="text-purple-400 font-semibold"> Hyperloop India</span>—the only Indian finalists at the
              SpaceX Hyperloop Pod Competition, traveling to SpaceX HQ in Hawthorne, California.
            </p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Origin</h3>
            </div>
            <p className="text-gray-400">BITS Pilani, Rajasthan</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Pre-cursor</h3>
            </div>
            <p className="text-gray-400">Hyperloop India (SpaceX Pod Competition Finalists)</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Incorporation</h3>
            </div>
            <p className="text-gray-400">February 2019</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center">
                <Telescope className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Philosophy</h3>
            </div>
            <p className="text-gray-400">&quot;Space 2.0&quot; Democratization</p>
          </GlassCard>
        </div>

        <GlassCard className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">The Pivot</h3>
          <p className="text-gray-300 leading-relaxed">
            While working on Hyperloop, they realized existing Earth Observation satellites were
            <span className="text-red-400 font-semibold"> &quot;colorblind&quot;</span>—they could see shapes but not
            detailed chemistry. The world needed a{" "}
            <span className="text-purple-400 font-semibold">&quot;health monitor&quot;</span> capable of spectral
            analysis, not just visual observation.
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}

// Slide 3: Founders
function Slide3() {
  return (
    <div className="h-full overflow-y-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">The Visionaries</h2>
        <p className="text-purple-400 mb-8">From Student Engineers to Space CEOs</p>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="group hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                AA
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Awais Ahmed</h3>
                <p className="text-purple-400">CEO & Co-Founder</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Born in the village of Aldur, Karnataka, Ahmed grew up without internet access until the 8th grade,
              relying on encyclopedias to fuel his fascination with space. At BITS Pilani, he pursued a Master&apos;s in
              Mathematics.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-purple-600/30 rounded-full text-xs text-purple-300">
                Strategic Visionary
              </span>
              <span className="px-3 py-1 bg-purple-600/30 rounded-full text-xs text-purple-300">BITS Pilani</span>
            </div>
          </GlassCard>

          <GlassCard className="group hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                KK
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Kshitij Khandelwal</h3>
                <p className="text-purple-400">CTO & Co-Founder</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              The engineering backbone who spearheaded the immense technical challenge of miniaturizing a hyperspectral
              camera—traditionally the size of a refrigerator—into a payload that fits on a microsatellite (~50kg).
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-purple-600/30 rounded-full text-xs text-purple-300">Hardware Expert</span>
              <span className="px-3 py-1 bg-purple-600/30 rounded-full text-xs text-purple-300">BITS Pilani</span>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Team Growth</h3>
          </div>
          <p className="text-gray-300">
            From 2 founders to <span className="text-purple-400 font-bold">160+ engineers</span> building the future of
            Earth observation.
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}

// Slide 4: Technology
function Slide4() {
  const specs = [
    { label: "Resolution", value: "5 Meters", highlight: "Best-in-class" },
    { label: "Spectral Bands", value: "135 - 250+", highlight: "Bands" },
    { label: "Swath Width", value: "40 km", highlight: "" },
    { label: "Revisit Time", value: "24 Hours", highlight: "Daily" },
  ]

  return (
    <div className="h-full overflow-y-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">The Innovation</h2>
        <p className="text-purple-400 mb-8">Hyperspectral Technology Deep Dive</p>

        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">The Firefly Advantage</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Standard satellites capture light in <span className="text-gray-400">4-8 broad bands</span>{" "}
              (Multispectral). Pixxel&apos;s Firefly satellites capture light across{" "}
              <span className="text-purple-400 font-bold">150+ to 250+ narrow, continuous bands</span> in the VNIR and
              SWIR spectrums (450-2500 nm).
            </p>
            <p className="text-gray-300 leading-relaxed">
              Every material on Earth has a unique{" "}
              <span className="text-purple-400">&quot;spectral fingerprint.&quot;</span> By analyzing hundreds of bands,
              Pixxel can distinguish between healthy and stressed crops, identify specific minerals, or detect gas
              leaks—things <span className="text-red-400">invisible</span> to standard cameras.
            </p>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-purple-900/50 to-violet-900/50">
            <h3 className="text-lg font-semibold text-white mb-4">5-Meter Breakthrough</h3>
            <p className="text-5xl font-bold text-purple-400 mb-2">5m</p>
            <p className="text-gray-400 text-sm">Spatial Resolution</p>
            <p className="text-gray-300 text-xs mt-4">vs. 30m for scientific missions like EnMAP</p>
          </GlassCard>
        </div>

        <h3 className="text-xl font-semibold text-white mt-8 mb-4">Technical Specifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specs.map((spec, index) => (
            <GlassCard key={index} className="text-center">
              <p className="text-gray-400 text-sm mb-2">{spec.label}</p>
              <p className="text-2xl font-bold text-white">{spec.value}</p>
              {spec.highlight && <p className="text-purple-400 text-xs mt-1">{spec.highlight}</p>}
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Slide 5: Funding
function Slide5() {
  return (
    <div className="h-full overflow-y-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">The Fuel</h2>
        <p className="text-purple-400 mb-8">Funding & Investors</p>

        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="md:col-span-2">
            <BarChart data={fundingData} dataKey="amount" label="Cumulative Funding by Round ($M)" />
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20">
            <DollarSign className="w-8 h-8 text-green-400 mb-4" />
            <p className="text-gray-400 text-sm">Total Raised</p>
            <p className="text-4xl font-bold text-green-400">$97M</p>
            <p className="text-gray-400 text-xs mt-2">Highest-funded space tech startup in India</p>
          </GlassCard>
        </div>

        <h3 className="text-xl font-semibold text-white mt-8 mb-4">Key Investment Milestones</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <GlassCard>
            <p className="text-purple-400 font-semibold mb-2">Series A (2022)</p>
            <p className="text-2xl font-bold text-white">$27M</p>
            <p className="text-gray-400 text-sm">Led by Radical Ventures & Seraphim Space</p>
          </GlassCard>
          <GlassCard className="border-yellow-500/30 bg-yellow-900/10">
            <p className="text-yellow-400 font-semibold mb-2">Series B - The Google Moment (2023)</p>
            <p className="text-2xl font-bold text-white">$36M</p>
            <p className="text-gray-400 text-sm">Led by Google — Big Tech validation</p>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}

// Slide 6: Revenue
function Slide6() {
  return (
    <div className="h-full overflow-y-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">The Engine</h2>
        <p className="text-purple-400 mb-8">Financial Growth (FY24)</p>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="border-green-500/20">
            <TrendingUp className="w-6 h-6 text-green-400 mb-4" />
            <p className="text-gray-400 text-sm mb-2">FY24 Revenue</p>
            <p className="text-4xl font-bold text-green-400">₹28.7 Cr</p>
            <p className="text-gray-400 text-sm mt-2">~$3.5M USD</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-green-600/30 rounded-full text-xs text-green-300">+87% YoY</span>
            </div>
          </GlassCard>

          <GlassCard className="border-red-500/20">
            <TrendingUp className="w-6 h-6 text-red-400 mb-4 rotate-180" />
            <p className="text-gray-400 text-sm mb-2">FY24 Loss (Strategic Investment)</p>
            <p className="text-4xl font-bold text-red-400">₹20.4 Cr</p>
            <p className="text-gray-400 text-sm mt-2">~$2.5M USD</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-red-600/30 rounded-full text-xs text-red-300">R&D Phase</span>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue vs Loss Comparison</h3>
          <div className="space-y-4">
            {revenueData.map((item, index) => (
              <div key={index} className="space-y-2">
                <p className="text-gray-400 text-sm">{item.year}</p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-400">Revenue</span>
                    </div>
                    <div className="bg-white/10 rounded-full h-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.revenue / 30) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="h-full bg-green-500 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-green-400 mt-1">₹{item.revenue} Cr</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-400">Loss</span>
                    </div>
                    <div className="bg-white/10 rounded-full h-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.loss / 30) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 + 0.1 }}
                        className="h-full bg-red-500 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-red-400 mt-1">₹{item.loss} Cr</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

// Slide 7: Competitors
function Slide7() {
  const competitors = [
    { name: "Pixxel", resolution: "5m", revisit: "Daily", focus: "Commercial & Defense", highlight: true },
    { name: "Planet (Tanager)", resolution: "30m", revisit: "Varies", focus: "Methane/Climate", highlight: false },
    {
      name: "EnMAP (Germany)",
      resolution: "30m",
      revisit: "4-27 Days",
      focus: "Scientific Research",
      highlight: false,
    },
    { name: "Satellogic", resolution: "25m", revisit: "Daily", focus: "Commercial", highlight: false },
  ]

  return (
    <div className="h-full overflow-y-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">The Landscape</h2>
        <p className="text-purple-400 mb-8">Competitor Comparison</p>

        <GlassCard className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">The Resolution Gap</h3>
          <p className="text-gray-300 leading-relaxed">
            Pixxel&apos;s strategic moat is defined by the{" "}
            <span className="text-purple-400 font-bold">&quot;Resolution Gap.&quot;</span> While competitors offer
            hyperspectral at 25-30m resolution, Pixxel achieves <span className="text-purple-400 font-bold">5m</span>
            —enabling precision agriculture and defense markets that competitors cannot effectively resolve.
          </p>
        </GlassCard>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Company</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Resolution</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Revisit</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Focus</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp, index) => (
                <tr key={index} className={`border-b border-white/5 ${comp.highlight ? "bg-purple-900/30" : ""}`}>
                  <td className="py-4 px-4">
                    <span className={comp.highlight ? "text-purple-400 font-bold" : "text-white"}>{comp.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={comp.highlight ? "text-purple-400 font-bold" : "text-gray-300"}>
                      {comp.resolution}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{comp.revisit}</td>
                  <td className="py-4 px-4 text-gray-300">{comp.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

// Slide 8: Agriculture
function Slide8() {
  return (
    <div className="h-full overflow-y-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Impact</h2>
        <p className="text-purple-400 mb-8">Agriculture & Environment</p>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600/30 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">MNCFC Partnership</h3>
                <p className="text-green-400 text-sm">India</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Partnered with the Indian Ministry of Agriculture to improve crop yield estimation and insurance
              settlements. Detects crop stress{" "}
              <span className="text-green-400 font-semibold">weeks before visual signs appear</span>, aiding millions of
              farmers.
            </p>
          </GlassCard>

          <GlassCard className="border-yellow-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-600/30 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">DataFarming</h3>
                <p className="text-yellow-400 text-sm">Australia</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Partnership with Australian agritech firm bringing hyperspectral insights to tens of thousands of
              farmers—offering
              <span className="text-yellow-400 font-semibold"> 8x more data</span> than conventional tools to optimize
              fertilizer use.
            </p>
          </GlassCard>

          <GlassCard className="md:col-span-2 border-orange-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-600/30 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Coactive Sustainability</h3>
                <p className="text-orange-400 text-sm">Spain</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Monitoring vineyards and olive groves year-round, helping insurers value assets based on moisture and
              health scores. Enabling sustainable agriculture through precision monitoring.
            </p>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}

// Slide 9: Defense
function Slide9() {
  return (
    <div className="h-full overflow-y-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Impact</h2>
        <p className="text-purple-400 mb-8">Defense & Strategic Applications</p>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-amber-900/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-600/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">iDEX Prime</h3>
                <p className="text-orange-400">India Ministry of Defence</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Winner of the iDEX Prime Space Grant to build miniaturized satellites for the Indian Air Force with
              <span className="text-orange-400 font-semibold"> MWIR (Mid-Wave Infrared) payloads</span>.
            </p>
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Capabilities:</p>
              <ul className="text-gray-300 text-sm mt-2 space-y-1">
                <li>• Detect heat signatures</li>
                <li>• Camouflaged vehicle detection</li>
                <li>• Night-time surveillance</li>
              </ul>
            </div>
          </GlassCard>

          <GlassCard className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">NRO Contract</h3>
                <p className="text-blue-400">US Intelligence</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Secured a <span className="text-blue-400 font-bold">5-year contract</span> with the US National
              Reconnaissance Office (NRO).
            </p>
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Significance:</p>
              <p className="text-gray-300 text-sm mt-2">
                Highlights the geopolitical trust Pixxel has earned, allowing the US intelligence community to access
                its commercial data for strategic enhancements.
              </p>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Dual-Use Technology</h3>
          <p className="text-gray-300 leading-relaxed">
            Pixxel bridges the gap between <span className="text-purple-400">commercial speed</span> and
            <span className="text-purple-400"> military requirements</span>—a key strategic positioning in the global
            space economy.
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}

// Slide 10: Future Vision
function Slide10() {
  return (
    <div className="h-full overflow-y-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">The Horizon</h2>
        <p className="text-purple-400 mb-8">Future Vision & Asteroid Mining</p>

        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="md:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-4">Phase 1: Firefly Constellation</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Building towards a constellation of <span className="text-purple-400 font-bold">24 satellites</span>{" "}
              providing global daily coverage with 5-meter hyperspectral resolution.
            </p>
            <div className="flex gap-4 flex-wrap">
              <div className="bg-white/5 rounded-lg px-4 py-2">
                <p className="text-2xl font-bold text-purple-400">24</p>
                <p className="text-xs text-gray-400">Satellites</p>
              </div>
              <div className="bg-white/5 rounded-lg px-4 py-2">
                <p className="text-2xl font-bold text-purple-400">24h</p>
                <p className="text-xs text-gray-400">Revisit Time</p>
              </div>
              <div className="bg-white/5 rounded-lg px-4 py-2">
                <p className="text-2xl font-bold text-purple-400">Global</p>
                <p className="text-xs text-gray-400">Coverage</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-yellow-500/30">
            <Telescope className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Asteroid Mining</h3>
            <p className="text-gray-300 text-sm">The ultimate vision</p>
          </GlassCard>
        </div>

        <GlassCard className="mt-6 border-yellow-500/20">
          <h3 className="text-xl font-semibold text-white mb-4">Beyond Earth: Asteroid Prospecting</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            The logic is consistent: if you can identify <span className="text-yellow-400">lithium in Nevada</span> from
            space, you can identify <span className="text-yellow-400">platinum on an asteroid</span>. Pixxel aims to map
            the asteroid belt to identify resource-rich targets, providing the{" "}
            <span className="text-purple-400 font-bold">&quot;treasure maps&quot;</span> for future mining missions.
          </p>
          <div className="bg-black/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm italic">
              &quot;From an Earth data company to a solar system resources company.&quot;
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

// Slide 11: Thank You
function Slide11() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Thank You</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-violet-600 mx-auto mb-8 rounded-full"></div>
        <p className="text-xl text-gray-400 mb-2">Pixxel Space</p>
        <p className="text-purple-400 mb-8">Seeing the Unseen</p>

        <div className="flex gap-4 justify-center flex-wrap">
          <GlassCard className="px-6 py-3">
            <p className="text-gray-400 text-sm">Founded</p>
            <p className="text-white font-bold">2019</p>
          </GlassCard>
          <GlassCard className="px-6 py-3">
            <p className="text-gray-400 text-sm">Raised</p>
            <p className="text-green-400 font-bold">$97M</p>
          </GlassCard>
          <GlassCard className="px-6 py-3">
            <p className="text-gray-400 text-sm">Resolution</p>
            <p className="text-purple-400 font-bold">5m</p>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}

// Slide indicator dots
function SlideIndicator({ total, current, onSelect }) {
  const slideNames = [
    "Home",
    "Genesis",
    "Founders",
    "Technology",
    "Funding",
    "Revenue",
    "Competitors",
    "Agriculture",
    "Defense",
    "Vision",
    "End",
  ]

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <GlassCard className="flex items-center gap-2 px-4 py-2">
        {Array.from({ length: total }, (_, i) => (
          <button key={i} onClick={() => onSelect(i)} className="group relative" title={slideNames[i]}>
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-purple-500 scale-125" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </GlassCard>
    </div>
  )
}

// Main App
export default function PixxelPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [particlesInit, setParticlesInit] = useState(false)
  const totalSlides = 11

  const particlesLoaded = useCallback(async (engine) => {
    await loadSlim(engine)
    setParticlesInit(true)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0))
  const goToSlide = (index) => setCurrentSlide(index)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

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
      {/* Particle Background */}
      <Particles id="tsparticles" init={particlesLoaded} options={particlesOptions} className="absolute inset-0 z-0" />

      {/* Slide Content */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
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

"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, ArrowRight, Bot, Network, Workflow, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
        {/* Logo */}
        <div className="flex items-center gap-3 ">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">OmniDimension</h1>
        </div>

        {/* Main Heading */}
        <div className="max-w-4xl mx-auto my-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">AI Agent Orchestration</h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            ONE COMMAND | MULTIPLE ACTIONS | ZERO FRICTION
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium">
            <MessageSquare className="w-4 h-4 mr-2" />
            Natural Language Processing
          </Badge>
          <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium">
            <Bot className="w-4 h-4 mr-2" />
            Real-time Orchestration
          </Badge>
          <Badge className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-sm font-medium">
            <Network className="w-4 h-4 mr-2" />
            Multi-Agent Coordination
          </Badge>
          <Badge className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm font-medium">
            <Workflow className="w-4 h-4 mr-2" />
            Automated Workflows
          </Badge>
        </div>

        {/* CTA Button */}
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Natural Commands</h3>
            <p className="text-slate-400">Simply describe what you want to accomplish in plain English</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Network className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Coordination</h3>
            <p className="text-slate-400">Agents work together seamlessly to execute complex workflows</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Workflow className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Execution</h3>
            <p className="text-slate-400">Watch your tasks execute in real-time with live status updates</p>
          </div>
        </div>
      </div>
    </div>
  )
}

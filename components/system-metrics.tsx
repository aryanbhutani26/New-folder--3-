"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, TrendingUp, Zap, CheckCircle, Users } from "lucide-react"

interface SystemMetrics {
  activeTasks: number
  completedTasks: number
  failedTasks: number
  totalAgents: number
  activeAgents: number
  avgResponseTime: number
  successRate: number
  systemLoad: number
  uptime: number
  throughput: number
}

interface SystemMetricsProps {
  metrics: SystemMetrics
}

export function SystemMetrics({ metrics }: SystemMetricsProps) {
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const getLoadColor = (load: number) => {
    if (load < 50) return "text-green-400"
    if (load < 80) return "text-yellow-400"
    return "text-red-400"
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return "text-green-400"
    if (rate >= 85) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Tasks */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-400" />
            Active Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{metrics.activeTasks}</span>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {metrics.completedTasks} completed, {metrics.failedTasks} failed
          </p>
        </CardContent>
      </Card>

      {/* Agent Status */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Users className="h-4 w-4 text-green-400" />
            Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">
              {metrics.activeAgents}/{metrics.totalAgents}
            </span>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
              {Math.round((metrics.activeAgents / metrics.totalAgents) * 100)}%
            </Badge>
          </div>
          <Progress value={(metrics.activeAgents / metrics.totalAgents) * 100} className="h-1 mt-2" />
        </CardContent>
      </Card>

      {/* Performance */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Response Time</span>
              <span className="text-sm text-white">{metrics.avgResponseTime}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Success Rate</span>
              <span className={`text-sm font-medium ${getSuccessRateColor(metrics.successRate)}`}>
                {metrics.successRate}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-purple-400" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Load</span>
              <span className={`text-sm font-medium ${getLoadColor(metrics.systemLoad)}`}>{metrics.systemLoad}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Uptime</span>
              <span className="text-sm text-white">{formatUptime(metrics.uptime)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

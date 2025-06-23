"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Play,
  Pause,
  RotateCcw,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface Agent {
  id: string
  name: string
  type: string
  status: "idle" | "active" | "completed" | "error"
  progress: number
  lastAction: string
  avatar: string
  capabilities?: string[]
  tasksCompleted?: number
  successRate?: number
  avgResponseTime?: number
}

interface AgentStatusCardProps {
  agent: Agent
  onAction?: (agentId: string, action: "start" | "pause" | "reset") => void
}

export function AgentStatusCard({ agent, onAction }: AgentStatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "error":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{agent.avatar}</div>
            <div>
              <CardTitle className="text-white text-sm font-medium">{agent.name}</CardTitle>
              <p className="text-xs text-slate-400 capitalize">{agent.type} Agent</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
            <Badge className={getStatusBadgeColor(agent.status)}>
              {getStatusIcon(agent.status)}
              <span className="ml-1 capitalize">{agent.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar for Active Tasks */}
        {agent.status === "active" && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Progress</span>
              <span className="text-xs text-slate-300">{agent.progress}%</span>
            </div>
            <Progress value={agent.progress} className="h-2" />
          </div>
        )}

        {/* Last Action */}
        <div className="space-y-1">
          <span className="text-xs text-slate-400">Current Status</span>
          <p className="text-sm text-slate-300">{agent.lastAction}</p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400">Tasks</span>
            <div className="flex items-center gap-1">
              <span className="text-white font-medium">{agent.tasksCompleted || 0}</span>
              <TrendingUp className="h-3 w-3 text-green-400" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400">Success Rate</span>
            <div className="flex items-center gap-1">
              <span className="text-white font-medium">{agent.successRate || 95}%</span>
              {(agent.successRate || 95) > 90 ? (
                <TrendingUp className="h-3 w-3 text-green-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
            </div>
          </div>
        </div>

        {/* Capabilities */}
        {agent.capabilities && (
          <div className="space-y-2">
            <span className="text-xs text-slate-400">Capabilities</span>
            <div className="flex flex-wrap gap-1">
              {agent.capabilities.slice(0, 3).map((capability) => (
                <Badge key={capability} variant="secondary" className="text-xs px-2 py-0">
                  {capability}
                </Badge>
              ))}
              {agent.capabilities.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  +{agent.capabilities.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 h-8 flex-1"
            onClick={() => onAction?.(agent.id, "start")}
            disabled={agent.status === "active"}
          >
            <Play className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 h-8 flex-1"
            onClick={() => onAction?.(agent.id, "pause")}
            disabled={agent.status !== "active"}
          >
            <Pause className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 h-8 flex-1"
            onClick={() => onAction?.(agent.id, "reset")}
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

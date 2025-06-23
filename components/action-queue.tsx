"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp, ArrowDown, Clock, Play, Pause, X, AlertTriangle, Activity } from "lucide-react"

interface QueuedAction {
  id: string
  instruction: string
  priority: "high" | "medium" | "low"
  status: "queued" | "processing" | "paused"
  estimatedTime: number
  assignedAgents: string[]
  createdAt: Date
}

interface ActionQueueProps {
  actions: QueuedAction[]
  onPriorityChange?: (actionId: string, direction: "up" | "down") => void
  onStatusChange?: (actionId: string, status: "play" | "pause" | "cancel") => void
}

export function ActionQueue({ actions, onPriorityChange, onStatusChange }: ActionQueueProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Activity className="h-3 w-3" />
      case "paused":
        return <Pause className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ${seconds % 60}s`
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Action Queue
          <Badge variant="secondary" className="ml-auto">
            {actions.length} tasks
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {actions.map((action, index) => (
              <div key={action.id} className="border border-slate-700 rounded-lg p-3 bg-slate-700/30">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">#{index + 1}</span>
                    <Badge className={getPriorityColor(action.priority)}>{action.priority}</Badge>
                    <Badge variant="outline" className="text-slate-400 border-slate-600">
                      {getStatusIcon(action.status)}
                      <span className="ml-1">{action.status}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-slate-400"
                      onClick={() => onPriorityChange?.(action.id, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-slate-400"
                      onClick={() => onPriorityChange?.(action.id, "down")}
                      disabled={index === actions.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-white text-sm mb-2">{action.instruction}</p>

                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Est. {formatTime(action.estimatedTime)}</span>
                  <span>{action.createdAt.toLocaleTimeString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400">Agents:</span>
                    {action.assignedAgents.map((agentId) => (
                      <Badge key={agentId} variant="secondary" className="text-xs">
                        {agentId}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-1">
                    {action.status === "queued" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-green-400"
                        onClick={() => onStatusChange?.(action.id, "play")}
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                    {action.status === "processing" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-yellow-400"
                        onClick={() => onStatusChange?.(action.id, "pause")}
                      >
                        <Pause className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-400"
                      onClick={() => onStatusChange?.(action.id, "cancel")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

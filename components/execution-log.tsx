"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, CheckCircle, AlertCircle, Info, Clock } from "lucide-react"

interface LogEntry {
  id: string
  timestamp: Date
  level: "info" | "success" | "warning" | "error"
  message: string
  agentId?: string
  taskId?: string
  duration?: number
}

interface ExecutionLogProps {
  logs: LogEntry[]
  maxEntries?: number
}

export function ExecutionLog({ logs, maxEntries = 100 }: ExecutionLogProps) {
  const getLogIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle className="h-3 w-3 text-green-400" />
      case "warning":
        return <AlertCircle className="h-3 w-3 text-yellow-400" />
      case "error":
        return <AlertCircle className="h-3 w-3 text-red-400" />
      default:
        return <Info className="h-3 w-3 text-blue-400" />
    }
  }

  const getLogColor = (level: string) => {
    switch (level) {
      case "success":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-blue-400"
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const displayLogs = logs.slice(0, maxEntries)

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Execution Log
          <Badge variant="secondary" className="ml-auto">
            {logs.length} entries
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-2 font-mono text-xs">
            {displayLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-2 p-2 rounded bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {getLogIcon(log.level)}
                  <span className="text-slate-400 shrink-0">{formatTimestamp(log.timestamp)}</span>
                  <span className={`${getLogColor(log.level)} break-all`}>{log.message}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {log.agentId && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      {log.agentId}
                    </Badge>
                  )}
                  {log.duration && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      <Clock className="h-2 w-2 mr-1" />
                      {log.duration}ms
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

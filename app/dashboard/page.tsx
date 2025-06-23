"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useOmniDimension } from "@/hooks/use-omnidimension"
import { AgentStatusCard } from "@/components/agent-status-card"
import { ActionQueue } from "@/components/action-queue"
import { ExecutionLog } from "@/components/execution-log"
import { SystemMetrics } from "@/components/system-metrics"
import { Toaster } from "@/components/toaster"
import { Phone, Calendar, Mail, MessageSquare, Zap, Send, Mic, Settings, Wifi, WifiOff } from "lucide-react"

export default function OmniDimensionOrchestration() {
  const [command, setCommand] = useState("")
  const [isListening, setIsListening] = useState(false)

  const {
    agents,
    tasks,
    actionQueue,
    executionLog,
    systemMetrics,
    isConnected,
    isProcessingVoice,
    liveTranscription,
    executeCommand,
    startVoiceRecording,
    stopVoiceRecording,
    handleAgentAction,
    handleQueuePriorityChange,
    handleQueueStatusChange,
  } = useOmniDimension()

  const handleExecuteCommand = async () => {
    if (!command.trim()) return

    try {
      await executeCommand(command)
      setCommand("")
    } catch (error) {
      console.error("Failed to execute command:", error)
    }
  }

  const handleVoiceToggle = async () => {
    if (isListening) {
      stopVoiceRecording()
      setIsListening(false)
    } else {
      const success = await startVoiceRecording()
      setIsListening(success)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">OmniDimension</h1>
                <p className="text-sm text-slate-400">AI Agent Orchestration</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className={`${isConnected ? "text-green-400 border-green-400" : "text-yellow-400 border-yellow-400"}`}
              >
                {isConnected ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
                {isConnected ? "Live Mode" : "Demo Mode"}
              </Badge>
              <Button variant="ghost" size="icon" className="text-slate-400">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* System Metrics */}
        <SystemMetrics metrics={systemMetrics} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Command Center */}
          <div className="lg:col-span-2 space-y-6">
            {/* Natural Language Command Input */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Natural Language Command Center
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Describe what you want your agents to do in plain English
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="e.g., 'Call all leads from yesterday, book a demo for interested prospects, and send follow-up emails to those who didn't answer'"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
                  />
                </div>
               {isListening && liveTranscription && (
                  <div className="p-2 bg-slate-700 text-yellow-400 rounded-md text-sm italic">
                    {liveTranscription}
                  </div>
               )}
                <div className="flex gap-2">
                  <Button
                    onClick={handleExecuteCommand}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    disabled={!command.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Execute Command
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`border-slate-600 ${isListening ? "bg-red-600 text-white" : isProcessingVoice ? "bg-yellow-600 text-white" : "text-slate-400"}`}
                    onClick={handleVoiceToggle}
                    disabled={isProcessingVoice}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Queue */}
            <ActionQueue
              actions={actionQueue}
              onPriorityChange={handleQueuePriorityChange}
              onStatusChange={handleQueueStatusChange}
            />

            
            <ExecutionLog logs={executionLog} />
          </div>

          {/* Agent Status Panel */}
          <div className="space-y-6">
            {/* Agent Status Cards */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Agent Status</h3>
              {agents.map((agent) => (
                <AgentStatusCard key={agent.id} agent={agent} onAction={handleAgentAction} />
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-slate-400">Common orchestration patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-slate-300 border-slate-600 hover:bg-slate-700"
                  onClick={() => setCommand("Call all leads from this week and schedule follow-up meetings")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Lead Outreach Campaign
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-slate-300 border-slate-600 hover:bg-slate-700"
                  onClick={() => setCommand("Book restaurant reservations for team dinner next Friday")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Event Coordination
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-slate-300 border-slate-600 hover:bg-slate-700"
                  onClick={() => setCommand("Send personalized follow-up emails to all demo attendees")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Automation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
  }

    
// WebSocket server for real-time agent communication
// Run with: node scripts/websocket-server.mjs

import { WebSocketServer } from 'ws'
import { createServer } from 'http'

const server = createServer()
const wss = new WebSocketServer({ server })

// Store active connections and agent states
const connections = new Map()
const agentStates = new Map()

// Simulate agent processing
function simulateAgentWork(taskId, agentId, command) {
  const steps = [
    { progress: 25, action: "Analyzing command..." },
    { progress: 50, action: "Connecting to services..." },
    { progress: 75, action: "Executing action..." },
    { progress: 100, action: "Completed successfully" },
  ]

  let stepIndex = 0

  const interval = setInterval(() => {
    if (stepIndex >= steps.length) {
      clearInterval(interval)

      // Send completion message
      broadcast({
        type: "task_update",
        taskId,
        updates: {
          status: "completed",
          results: [`Agent ${agentId} completed: ${command.slice(0, 50)}...`],
        },
      })

      return
    }

    const step = steps[stepIndex]

    // Update agent status
    broadcast({
      type: "agent_update",
      agentId,
      updates: {
        status: step.progress === 100 ? "completed" : "active",
        progress: step.progress,
        lastAction: step.action,
      },
    })

    stepIndex++
  }, 2000)
}

function broadcast(data) {
  const message = JSON.stringify(data)
  connections.forEach((ws) => {
    if (ws.readyState === 1) { // WebSocket.OPEN
      ws.send(message)
    }
  })
}

wss.on("connection", (ws, req) => {
  const clientId = Date.now().toString()
  connections.set(clientId, ws)

  console.log(`Client ${clientId} connected`)

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data.toString())

      switch (message.type) {
        case "execute_command":
          console.log(`Executing command: ${message.command}`)

          // Simulate agent selection and activation
          const selectedAgents = ["agent-1", "agent-2"]

          selectedAgents.forEach((agentId) => {
            simulateAgentWork(message.taskId, agentId, message.command)
          })

          break

        case "ping":
          ws.send(JSON.stringify({ type: "pong", timestamp: Date.now() }))
          break
      }
    } catch (error) {
      console.error("Error processing message:", error)
    }
  })

  ws.on("close", () => {
    connections.delete(clientId)
    console.log(`Client ${clientId} disconnected`)
  })

  ws.on("error", (error) => {
    console.error(`WebSocket error for client ${clientId}:`, error)
    connections.delete(clientId)
  })

  // Send welcome message
  ws.send(
    JSON.stringify({
      type: "connection_established",
      clientId,
      timestamp: Date.now(),
    }),
  )
})

const PORT = process.env.WS_PORT || 8080

server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`)
  console.log(`Connect to: ws://localhost:${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down WebSocket server...')
  wss.close(() => {
    server.close(() => {
      process.exit(0)
    })
  })
})

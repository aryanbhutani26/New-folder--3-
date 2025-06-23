"use client"

export class WebSocketClient {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 3
  private reconnectDelay = 2000
  private isManuallyDisconnected = false

  connect(url: string, onMessage: (data: any) => void, onStatusChange?: (connected: boolean) => void) {
    // Skip WebSocket connection if URL is not provided or in development without server
    if (!url || url.includes("localhost:8080")) {
      console.log("WebSocket server not available, using fallback mode")
      onStatusChange?.(false)
      return
    }

    try {
      this.ws = new WebSocket(url)

      this.ws.onopen = () => {
        console.log("WebSocket connected")
        this.reconnectAttempts = 0
        onStatusChange?.(true)
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          onMessage(data)
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error)
        }
      }

      this.ws.onclose = (event) => {
        console.log("WebSocket disconnected", event.code, event.reason)
        onStatusChange?.(false)

        if (!this.isManuallyDisconnected && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.attemptReconnect(url, onMessage, onStatusChange)
        }
      }

      this.ws.onerror = (error) => {
        console.log("WebSocket connection failed, continuing in offline mode")
        onStatusChange?.(false)
      }
    } catch (error) {
      console.log("WebSocket not supported or connection failed, using fallback mode")
      onStatusChange?.(false)
    }
  }

  private attemptReconnect(url: string, onMessage: (data: any) => void, onStatusChange?: (connected: boolean) => void) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect(url, onMessage, onStatusChange)
      }, this.reconnectDelay * this.reconnectAttempts)
    } else {
      console.log("Max reconnection attempts reached, continuing in offline mode")
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
      return true
    }
    return false
  }

  disconnect() {
    this.isManuallyDisconnected = true
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

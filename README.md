
# MultiAgent Task Automation System

This project is a voice-first multi-agent task automation platform built using FastAPI, OmniDim, and Google Calendar API. It enables users to perform complex operations like booking events, scheduling meetings, or triggering API workflows just through natural voice commands. The system leverages agent-based orchestration and voice AI to simplify everyday automation.

## Features


🎙️ Voice-First Interaction
Integrates with OmniDim to receive and process natural voice commands in real-time.

🧠 Multi-Agent Orchestration
Supports dynamic routing of tasks to specialized agents like booking_agent, call_agent, and more.

📞 Call Integration via OmniDim
Initiate real-time voice calls with custom agents using OmniDim's Voice Call API.

📅 Google Calendar Integration
Seamlessly schedule, manage, and fetch events using the Google Calendar API.

🔄 Session-Aware Context Management
Maintains user-specific conversation context across voice interactions for a smoother experience.

⚡ FastAPI Backend
Lightweight, high-performance API server built with FastAPI for rapid response to webhook and API requests.

🛡️ Environment-First Security
Sensitive data like API keys, OAuth tokens, and secrets are handled using .env variables (excluded from GitHub).


## Tech Stack

Backend Framework: FastAPI – For building high-performance REST APIs

Voice Agent Platform: OmniDim – Handles voice input/output, agent logic, and call integration

Task Orchestration: Custom-built agent router with modular design (e.g., booking_agent, call_agent)

Calendar Integration: Google Calendar API (OAuth 2.0 based)

Session Management: In-memory context tracking using Python classes

Environment Variables: .env for managing sensitive keys (e.g., API keys, client secrets)

Version Control: Git + GitHub

Local Server: Uvicorn (ASGI server) with auto-reload support for development


## API Reference

#### 	For OmniDim voice webhooks: processes voice commands.

```http
  	POST/webhook
```

#### Converts text/voice to actions (booking, calendar, call).

```http
  POST/voice-command
```


#### Adds an event to Google Calendar.

```http
  POST/calendar/add
```
#### Initiates an OmniDim voice call.

```http
  POST/call
```
## License

[MIT](https://choosealicense.com/licenses/mit/)

Built with ❤️ by Aryan Bhutani
Voice‑First • Agent Orchestration • Hackathon‑Ready

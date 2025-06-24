import { type NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

interface EmailRequest {
  to: string | string[]
  subject: string
  content: string
  from?: string
  templateId?: string
  dynamicTemplateData?: Record<string, any>
}

interface EmailResponse {
  success: boolean
  messageId?: string
  status: "sent" | "failed" | "queued"
  error?: string
}

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function POST(request: NextRequest) {
        console.log("SENDGRID_API_KEY starts with:", process.env.SENDGRID_API_KEY)

  try {
    const {
      to,
      subject,
      content,
      from = "manshi547075@gmail.com",
      templateId,
      dynamicTemplateData,
    }: EmailRequest = await request.json()

    // Validate SendGrid API key
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "SendGrid API key not configured",
          status: "failed",
        },
        { status: 500 },
      )
    }

    // Validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const recipients = Array.isArray(to) ? to : [to]

    for (const email of recipients) {
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid email address: ${email}`,
            status: "failed",
          },
          { status: 400 },
        )
      }
    }

    // Prepare email message
    const msg: any = {
      to: recipients,
      from: {
        email: from,
        name: "OmniDimension AI Agent",
      },
      subject,
    }

    // Use template if provided, otherwise use HTML content
    if (templateId) {
      msg.templateId = templateId
      msg.dynamicTemplateData = dynamicTemplateData || {}
    } else {
      // Create professional HTML email template
      msg.html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">
              ⚡ OmniDimension AI Agent
            </h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              ${content.replace(/\n/g, "<br>")}
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
              <p>This email was sent by OmniDimension AI Agent Orchestration System</p>
              <p>Powered by natural language processing and intelligent automation</p>
            </div>
          </div>
        </body>
        </html>
      `

      // Also include plain text version
      msg.text = content
    }

    console.log(`Sending email to ${recipients.join(", ")} with subject: ${subject}`)

    // Send the email
    const response = await sgMail.send(msg)

    console.log(`Email sent successfully. Message ID: ${response[0].headers["x-message-id"]}`)

    const emailResponse: EmailResponse = {
      success: true,
      messageId: response[0].headers["x-message-id"],
      status: "sent",
    }

    return NextResponse.json(emailResponse)
  } catch (error: any) {
    console.error("SendGrid email error:", error)

    let errorMessage = "Failed to send email"
    if (error.response?.body?.errors) {
      errorMessage = error.response.body.errors[0].message
    } else if (error.message) {
      errorMessage = error.message
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        status: "failed",
        sendGridError: error.code,
      },
      { status: 500 },
    )
  }
}

// Get email statistics and service status
export async function GET() {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json({
        service: "SendGrid Email API",
        status: "not_configured",
        error: "API key not set",
      })
    }

    return NextResponse.json({
      service: "SendGrid Email API",
      status: "operational",
      features: ["transactional_email", "html_templates", "dynamic_content", "delivery_tracking", "bounce_handling"],
      rateLimit: "100 emails/second",
      configured: true,
    })
  } catch (error: any) {
    console.error("Error checking SendGrid status:", error)
    return NextResponse.json(
      {
        service: "SendGrid Email API",
        status: "error",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

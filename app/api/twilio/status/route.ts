import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const callSid = formData.get("CallSid")
  const callStatus = formData.get("CallStatus")
  const from = formData.get("From")
  const to = formData.get("To")
  const timestamp = new Date().toISOString()

  console.log(`[Twilio Callback] ${timestamp}`)
  console.log(`Call SID: ${callSid}`)
  console.log(`From: ${from} ➡️ To: ${to}`)
  console.log(`Status: ${callStatus}`)

  return NextResponse.json({ received: true })
}

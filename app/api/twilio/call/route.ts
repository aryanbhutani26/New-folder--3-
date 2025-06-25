// app/api/twilio/call/route.ts

import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  try {
    const { to, message } = await req.json()


    if (!to) {
      return NextResponse.json({ success: false, error: "Missing 'to' number" }, { status: 400 });
    }

    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;

    if (!sid || !token || !from) {
      console.error("Missing Twilio env variables");
      return NextResponse.json({ success: false, error: "Twilio credentials missing" }, { status: 500 });
    }

    const client = twilio(sid, token);

    const call = await client.calls.create({
      to,
      from,
      twiml: "<Response><Say>Hello! This is an automated call from OmniDimension AI Agent. Thank you for using our services.</Say></Response>",
      
    });

    return NextResponse.json({ success: true, sid: call.sid });
  } catch (err: any) {
    console.error("Twilio call error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

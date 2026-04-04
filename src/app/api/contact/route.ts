// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 🔍 Debug env variable
    console.log("USER:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

    // transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact from ${name}`,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email sending error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

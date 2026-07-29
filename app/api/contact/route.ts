import { NextResponse } from "next/server";
import { getMongoClientPromise } from "@/lib/mongodb";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}; 

async function sendWhatsAppNotification(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  const whatsappPhone = process.env.WHATSAPP_PHONE;
  const whatsappApiKey = process.env.WHATSAPP_APIKEY;

  if (!whatsappPhone || !whatsappApiKey || whatsappApiKey === "YOUR_CALLMEBOT_APIKEY_HERE") {
    console.warn("WhatsApp env variables not configured. Skipping notification.");
    return;
  }

  const text = `
🔔 *New Lead - Sabka Saathi*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone || "Not provided"}
🛠️ *Service:* ${data.service || "Not specified"}

💬 *Message:*
${data.message}

⏰ ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
  `.trim();

  const encodedText = encodeURIComponent(text);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${whatsappPhone}&text=${encodedText}&apikey=${whatsappApiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("WhatsApp notification failed:", await res.text());
    } else {
      console.log("✅ WhatsApp notification sent successfully.");
    }
  } catch (err) {
    console.error("WhatsApp notification error:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const phone = body.phone?.trim();
    const service = body.service?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // 1. Save to MongoDB
    const client = await getMongoClientPromise();
    const db = client.db();

    await db.collection("contacts").insertOne({
      name,
      email,
      phone: phone || null,
      service: service || null,
      message,
      createdAt: new Date(),
    });

    // 2. Send WhatsApp notification (non-blocking)
    sendWhatsAppNotification({ name, email, phone, service, message });

    return NextResponse.json({ message: "Thanks! We will reach out soon." });
  } catch {
    return NextResponse.json(
      { error: "Unable to process request." },
      { status: 500 }
    );
  }
}

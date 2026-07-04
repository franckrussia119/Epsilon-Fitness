import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("⚠️ Telegram token or chat ID is missing from environment. Message would be:");
    console.log(text);
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Telegram API responded with error: ${response.status} - ${errorText}`);
      return false;
    }

    console.log("✅ Telegram message sent successfully.");
    return true;
  } catch (error) {
    console.error("❌ Failed to send Telegram message:", error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route - Contact form submissions
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required fields" });
    }

    const text = `💪 EPSILON FITNESS - New Contact
Name: ${name}
Email: ${email}
Phone: ${phone || "Not specified"}
Subject: ${subject || "General"}
Message: ${message}`;

    const sent = await sendTelegramMessage(text);
    res.json({ success: true, telegramSent: sent, message: "Contact message logged successfully" });
  });

  // API Route - Membership applications
  app.post("/api/membership", async (req, res) => {
    const { name, email, phone, plan, location, startDate, message } = req.body;

    if (!name || !email || !plan) {
      return res.status(400).json({ error: "Name, email and plan are required fields" });
    }

    const text = `🏆 NEW MEMBERSHIP INQUIRY - EPSILON FITNESS
Name: ${name}
Email: ${email}
Phone: ${phone || "Not specified"}
Plan: ${plan}
Location: ${location || "Not specified"}
Start Date: ${startDate || "As soon as possible"}
Message: ${message || "No custom message provided"}`;

    const sent = await sendTelegramMessage(text);
    res.json({ success: true, telegramSent: sent, message: "Membership inquiry logged successfully" });
  });

  // API Route - Free Trial Signups
  app.post("/api/trial", async (req, res) => {
    const { name, email, phone, location, preferredClass, goal } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required fields" });
    }

    const text = `⚡ FREE TRIAL SIGNUP - EPSILON FITNESS
Name: ${name}
Email: ${email}
Phone: ${phone || "Not specified"}
Location: ${location || "Not specified"}
Preferred Class: ${preferredClass || "Any class / Gym access"}
Goal: ${goal || "General physical transformation"}`;

    const sent = await sendTelegramMessage(text);
    res.json({ success: true, telegramSent: sent, message: "Free trial registered successfully" });
  });

  // Vite middleware integration or static serving
  if (process.env.NODE_ENV !== "production") {
    console.log("🚀 Starting Epsilon Fitness server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("📦 Starting Epsilon Fitness server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ Epsilon Fitness server successfully listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

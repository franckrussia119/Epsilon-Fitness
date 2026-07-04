import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram token or chat ID is missing. Message logged:");
    console.log(text);
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Telegram API error: ${response.status} - ${errorText}`);
      return false;
    }

    console.log("Telegram message sent successfully.");
    return true;
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }

    const text = `💪 EPSILON FITNESS - New Contact
Name: ${name}
Email: ${email}
Phone: ${phone || "Not specified"}
Subject: ${subject || "General"}
Message: ${message}`;

    const sent = await sendTelegramMessage(text);
    res.json({ success: true, telegramSent: sent });
  });

  // Membership inquiry
  app.post("/api/membership", async (req, res) => {
    const { name, email, phone, plan, location, startDate, message } = req.body;

    if (!name || !email || !plan) {
      return res.status(400).json({ error: "Name, email and plan are required" });
    }

    const text = `🏆 NEW MEMBERSHIP - EPSILON FITNESS
Name: ${name}
Email: ${email}
Phone: ${phone || "Not specified"}
Plan: ${plan}
Location: ${location || "Not specified"}
Start Date: ${startDate || "ASAP"}
Message: ${message || "None"}`;

    const sent = await sendTelegramMessage(text);
    res.json({ success: true, telegramSent: sent });
  });

  // Free trial signup
  app.post("/api/trial", async (req, res) => {
    const { name, email, phone, location, preferredClass, goal } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const text = `⚡ FREE TRIAL - EPSILON FITNESS
Name: ${name}
Email: ${email}
Phone: ${phone || "Not specified"}
Location: ${location || "Not specified"}
Preferred Class: ${preferredClass || "Any"}
Goal: ${goal || "General fitness"}`;

    const sent = await sendTelegramMessage(text);
    res.json({ success: true, telegramSent: sent });
  });

  // Production: serve built static files
  if (process.env.NODE_ENV === "production") {
    console.log("Starting Epsilon Fitness in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    // Development: use Vite dev server (dynamic import to avoid production crash)
    console.log("Starting Epsilon Fitness in DEVELOPMENT mode...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Epsilon Fitness server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

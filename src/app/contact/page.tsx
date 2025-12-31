"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Support is available Mon–Fri 9am–6pm (local time).
        </p>
      </div>

      <div className="surface p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              placeholder="you@example.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 min-h-[140px] w-full rounded-md border border-border/60 bg-background/70 px-3 py-2 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              placeholder="How can we help?"
            />
          </div>
        </div>

        <button
          type="button"
          className="btn mt-5 h-11 px-6"
          onClick={() => {
            alert("Message sent (mock). Our team will reply shortly.");
            setName("");
            setEmail("");
            setMessage("");
          }}
          style={{ opacity: name.trim() && email.trim() && message.trim() ? 1 : 0.7 }}
          disabled={!(name.trim() && email.trim() && message.trim())}
        >
          Send message
        </button>

        <div className="mt-6 rounded-xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground backdrop-blur">
          <div>support@zenvoraelectronics.com</div>
          <div>+1 (800) 778-ZEN-VORA</div>
          <div className="mt-2">Address placeholder • City, ST 00000</div>
        </div>
      </div>
    </div>
  );
}

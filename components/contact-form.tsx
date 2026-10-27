"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export function ContactForm({ deliveryReady }: { deliveryReady: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<{ status: "idle" | "sending" | "success" | "error"; message: string }>({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    formRef.current?.setAttribute("data-ready", "true");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState({ status: "sending", message: "Sending your enquiry..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          projectType: data.get("projectType"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setState({ status: "error", message: result.error || "Your enquiry could not be sent." });
        return;
      }

      form.reset();
      setState({ status: "success", message: result.message || "Your enquiry was sent." });
    } catch {
      setState({ status: "error", message: "Connection failed. Please try again later." });
    }
  }

  return (
    <div className="formbox">
      <form
        ref={formRef}
        aria-label="Project enquiry form"
        data-delivery-ready={deliveryReady}
        onSubmit={handleSubmit}
      >
        <div className="formrow">
          <div>
            <label htmlFor="contact-name">Your name *</label>
            <input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="contact-email">Email address *</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <label htmlFor="contact-type">What do you need? (optional)</label>
          <select id="contact-type" name="projectType" defaultValue="">
            <option value="">Select a service</option>
            <option>Website</option>
            <option>Web app</option>
            <option>Automation</option>
            <option>AI assistant</option>
            <option>Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-message">Tell me about your project *</label>
          <textarea id="contact-message" name="message" required minLength={20} maxLength={5000} placeholder="What would you like to build, and what problem should it solve?" />
        </div>
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button className="btn primary contact-submit" type="submit" disabled={!deliveryReady || state.status === "sending"}>
          <Send size={17} aria-hidden="true" /> {state.status === "sending" ? "Sending..." : "Send enquiry"}
        </button>
        <p className={`contact-form-status ${state.status}`} role="status" aria-live="polite">
          {deliveryReady ? state.message : "Email sending is not configured yet. The form cannot be submitted right now."}
        </p>
      </form>
    </div>
  );
}

"use client";
import { useState, type FormEvent } from "react";
import { site } from "@/config/site";
type Values = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<
    "idle" | "sending" | "success" | "error" | "unconfigured"
  >("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: Values = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      subject: String(data.get("subject") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
    const nextErrors: Errors = {};
    if (values.name.length < 2)
      nextErrors.name = "Please enter your name (at least 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      nextErrors.email = "Please enter a valid email address.";
    if (values.subject.length < 3)
      nextErrors.subject = "Please add a subject (at least 3 characters).";
    if (values.message.length < 10)
      nextErrors.message = "Please add a message (at least 10 characters).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setState("idle");
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }
    if (!site.formEndpoint) {
      setState("unconfigured");
      return;
    }
    setState("sending");
    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Submission failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }
  const field = (
    name: keyof Values,
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <div>
      <label htmlFor={name}>{label}</label>
      {name === "message" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required
          minLength={10}
          maxLength={5000}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={
            name === "name" ? "name" : name === "email" ? "email" : undefined
          }
          placeholder={placeholder}
          required
          maxLength={name === "email" ? 254 : 160}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
      )}
      {errors[name] && (
        <p className="field-error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );
  return (
    <div className="formbox">
      <h2>Tell me what you&apos;re building.</h2>
      <p>Share a little about your project, role, or idea.</p>
      <form onSubmit={submit} noValidate aria-busy={state === "sending"}>
        <div className="formrow">
          {field("name", "YOUR NAME", "Your name")}
          {field("email", "EMAIL ADDRESS", "you@company.com", "email")}
        </div>
        {field("subject", "SUBJECT", "What's this about?")}
        {field(
          "message",
          "YOUR MESSAGE",
          "Tell me a little about your idea...",
        )}
        <button
          className="btn primary"
          type="submit"
          disabled={state === "sending"}
        >
          {state === "sending" ? "Sending…" : "Send message ↗"}
        </button>
        {!site.formEndpoint && (
          <div className="note" id="form-configuration">
            Sending is not available yet. A contact service needs to be
            connected before messages can be delivered.
          </div>
        )}
        <div
          role="status"
          aria-live="polite"
          className={`form-status ${state === "error" ? "field-error" : ""}`}
        >
          {state === "success" &&
            "Thank you. Your message was submitted successfully."}
          {state === "error" &&
            "Your message could not be sent. Please try again later; your text has been kept."}
          {state === "unconfigured" &&
            "Your message has not been sent. Configure NEXT_PUBLIC_CONTACT_ENDPOINT to enable delivery."}
        </div>
      </form>
    </div>
  );
}

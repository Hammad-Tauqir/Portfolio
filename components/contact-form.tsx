"use client";

import { Send } from "lucide-react";

export function ContactForm() {
  return (
    <div className="formbox">
      <form
        aria-label="Project enquiry form"
        onSubmit={(event) => event.preventDefault()}
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
        <button className="btn primary contact-submit" type="submit" disabled>
          <Send size={17} aria-hidden="true" /> Send enquiry
        </button>
        <p className="note">Email sending is coming soon. This form is a preview and does not submit yet.</p>
      </form>
    </div>
  );
}

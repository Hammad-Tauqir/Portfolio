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
        <div className="formrow">
          <div>
            <label htmlFor="contact-type">What do you need? *</label>
            <select id="contact-type" name="projectType" required defaultValue="">
              <option value="" disabled>Select a service</option>
              <option>Website</option>
              <option>Web app</option>
              <option>Automation</option>
              <option>AI assistant</option>
              <option>Something else</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-timeline">Timeline</label>
            <select id="contact-timeline" name="timeline" defaultValue="">
              <option value="">Not sure yet</option>
              <option>As soon as possible</option>
              <option>Within 1 month</option>
              <option>Within 3 months</option>
              <option>Flexible</option>
            </select>
          </div>
        </div>
        <div className="formrow">
          <div>
            <label htmlFor="contact-budget">Budget range</label>
            <input id="contact-budget" name="budget" maxLength={80} placeholder="Optional" />
          </div>
          <div>
            <label htmlFor="contact-link">Existing website or reference link</label>
            <input id="contact-link" name="referenceLink" type="url" maxLength={500} placeholder="https://example.com" />
          </div>
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

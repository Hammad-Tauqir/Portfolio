const features = [
  {
    title: "Business information",
    description:
      "Retrieves service details and frequently asked questions from Google Sheets.",
  },
  {
    title: "Lead capture",
    description:
      "Saves visitor contact details and requirements after confirmation.",
  },
  {
    title: "Appointment booking",
    description:
      "Checks Google Calendar availability and creates a 30-minute discovery call after the visitor confirms.",
  },
  {
    title: "Booking notifications",
    description:
      "A separate workflow emails the owner when a qualifying new booking is created.",
  },
  {
    title: "Verified rescheduling",
    description:
      "Checks email access before updating the existing Calendar event to a new available time.",
  },
  {
    title: "Verified cancellation",
    description:
      "Requires email verification before deleting the matched booking.",
  },
  {
    title: "Voice interaction",
    description:
      "Supports website voice-to-text input and reading responses aloud.",
  },
  {
    title: "Controlled access",
    description: "Login is restricted to users approved by the owner.",
  },
] as const;

const steps = [
  "A visitor logs in and sends a typed message or uses the website microphone.",
  "The website sends the message and conversation session ID to its backend, which forwards the request to n8n.",
  "The AI agent uses the conversation context and selects the relevant business tool.",
  "The tool reads information or performs the requested action.",
  "The result returns to the agent, which responds on the website.",
] as const;

const workflows = [
  {
    name: "AI Receptionist",
    responsibility:
      "Conversation handling, business information, lead capture, availability checks, and new bookings.",
  },
  {
    name: "Booking Email Notification",
    responsibility: "Owner notifications for qualifying new bookings.",
  },
  {
    name: "Verify Booking Request",
    responsibility:
      "Booking matching, email verification, rescheduling, and cancellation.",
  },
] as const;

const decisions = [
  "Kept n8n credentials on the website’s server.",
  "Used Google Sheets to make business information easy to update.",
  "Required visitor confirmation before booking or saving a lead.",
  "Used email verification to protect appointment changes.",
  "Updated the existing Calendar event during rescheduling so the original slot becomes available.",
  "Separated conversation handling, notifications, and verification into dedicated workflows.",
] as const;

export function AiReceptionistCaseStudy() {
  return (
    <div className="case-story">
      <section aria-labelledby="case-problem">
        <h3 id="case-problem">The problem</h3>
        <p>
          Service businesses often handle the same questions repeatedly and
          coordinate appointments through multiple messages. Customer details,
          booking requests, and calendar updates can become scattered across
          conversations and spreadsheets.
        </p>
        <p>
          I built this demo to explore how a website assistant could connect
          customer conversations with business information, lead capture, and
          appointment management.
        </p>
      </section>

      <section aria-labelledby="case-solution">
        <h3 id="case-solution">The solution</h3>
        <p>
          The website connects visitors to an AI agent powered by n8n. The agent
          uses dedicated tools to retrieve service information, save leads,
          check calendar availability, and book appointments.
        </p>
        <p>
          For rescheduling and cancellation, a separate verification workflow
          checks the existing booking and sends a one-time code to the booking
          email before allowing changes.
        </p>
      </section>

      <section aria-labelledby="case-features">
        <h3 id="case-features">Key features</h3>
        <ul className="case-feature-list">
          {features.map((feature) => (
            <li key={feature.title}>
              <strong>{feature.title}.</strong> {feature.description}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="case-process">
        <h3 id="case-process">How it works</h3>
        <ol className="case-step-list">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="case-callout">
          <strong>Booking changes have two stages:</strong> request a
          verification code, then submit the code to authorize the change.
        </p>
      </section>

      <section aria-labelledby="case-workflows">
        <h3 id="case-workflows">Workflow architecture</h3>
        <div className="case-workflows">
          {workflows.map((workflow, index) => (
            <div key={workflow.name}>
              <span aria-hidden="true">0{index + 1}</span>
              <h4>{workflow.name}</h4>
              <p>{workflow.responsibility}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="case-contribution">
        <h3 id="case-contribution">My contribution</h3>
        <p>
          I implemented the website-to-n8n integration and configured the AI
          agent’s instructions, memory, and business tools. I built the Google
          Sheets and Calendar integrations, booking notification workflow, and
          email verification process for appointment changes. I also added
          controlled login access and deployed the website on Vercel.
        </p>
      </section>

      <section aria-labelledby="case-decisions">
        <h3 id="case-decisions">Key engineering decisions</h3>
        <ul>
          {decisions.map((decision) => (
            <li key={decision}>{decision}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="case-outcome">
        <h3 id="case-outcome">Outcome &amp; scope</h3>
        <p>
          The project demonstrates a connected workflow from customer enquiry to
          lead capture and appointment management. It is deployed as an
          invite-only portfolio demo.
        </p>
        <p>
          Voice interaction currently runs through the website microphone and
          read-aloud controls. Telephone call handling is a potential future
          extension.
        </p>
      </section>
    </div>
  );
}

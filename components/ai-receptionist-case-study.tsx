const capabilities = [
  {
    title: "Service answers",
    detail: "The assistant reads service information and FAQs from Google Sheets.",
  },
  {
    title: "Lead capture",
    detail: "It collects requirements and saves a lead after the visitor gives permission.",
  },
  {
    title: "Appointment booking",
    detail: "It checks Google Calendar availability and books a time after confirmation.",
  },
  {
    title: "Protected booking changes",
    detail: "Cancellation and rescheduling require an email verification code.",
  },
  {
    title: "Controlled access",
    detail: "The website demo is available only to approved users.",
  },
] as const;

export function AiReceptionistCaseStudy() {
  return (
    <div className="case-story">
      <section aria-labelledby="case-overview">
        <h3 id="case-overview">The project</h3>
        <p>
          Nova Digital AI Receptionist connects a protected website chat with
          business information, lead capture, and appointment workflows.
        </p>
      </section>

      <section aria-labelledby="case-capabilities">
        <h3 id="case-capabilities">What it does</h3>
        <ul className="case-feature-list">
          {capabilities.map(({ title, detail }) => (
            <li key={title}>
              <strong>{title}.</strong> {detail}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="case-scope">
        <h3 id="case-scope">Current scope</h3>
        <p>
          The demo supports chat and voice input on the website. Phone calling
          could be added later with a voice platform and telephony integration;
          the current demo does not handle phone calls.
        </p>
      </section>
    </div>
  );
}

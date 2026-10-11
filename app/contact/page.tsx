import type { Metadata } from "next";
import { site } from "@/config/site";
import { ContactContent } from "@/components/contact-content";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss full-stack development opportunities, web products and AI automation with Hammad Tauqir in Lahore, Pakistan.",
  openGraph: {
    title: "Contact | Hammad Tauqir",
    description:
      "Start a conversation about your next web product or workflow.",
  },
  ...(site.url ? { alternates: { canonical: `${site.url}/contact` } } : {}),
};
export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="wrap page-head">
        <span className="eyebrow">CONTACT / START A CONVERSATION</span>
        <h1>
          Let&apos;s make
          <br />
          something <span className="accent">useful.</span>
        </h1>
        <p>
          Interested in a full-stack role, a web product, or an automation idea?
          Let&apos;s talk about what you have in mind.
        </p>
      </section>
      <section className="wrap" aria-label="Contact information and form">
        <ContactContent />
      </section>
    </main>
  );
}

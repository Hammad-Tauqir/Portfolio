import type { Metadata } from "next";
import { site } from "@/config/site";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss a web application, business integration, or AI automation with Hammad Tauqir.",
  ...(site.url ? { alternates: { canonical: `${site.url}/contact` } } : {}),
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="wrap page-head">
        <span className="eyebrow">CONTACT / START A CONVERSATION</span>
        <h1>
          Let’s build something
          <br />
          <span className="accent">genuinely useful.</span>
        </h1>
        <p>
          Share the website, tool, or workflow you have in mind. A little
          context about the problem is the best place to start.
        </p>
      </section>
      <section className="wrap" aria-label="Contact information and form">
        <ContactContent />
      </section>
    </main>
  );
}

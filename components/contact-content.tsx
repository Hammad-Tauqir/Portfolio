import { site } from "@/config/site";
import { SocialLinks, CvLink } from "./links";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export function ContactContent() {
  return (
    <div className="contact-options spot">
      <span className="eyebrow">PROJECTS · OPPORTUNITIES · DEMO ACCESS</span>
      <h2>Let’s talk about your next build.</h2>
      <p>
        Share what you want to build, the tools you use, and your timeline. For
        AI Receptionist access, mention that you would like to try the portfolio
        demo.
      </p>
      {site.email ? (
        <a className="btn primary contact-email" href={`mailto:${site.email}`}>
          <Mail size={18} aria-hidden="true" />
          {site.email}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      ) : (
        <p className="contact-pending">
          Direct contact and demo access requests are not available yet. You can
          explore my public work on GitHub.
        </p>
      )}
      <div className="contact-actions">
        <SocialLinks />
        <CvLink />
      </div>
      <p className="contact-location">
        <span className="pulse" aria-hidden="true" />
        <MapPin size={14} aria-hidden="true" />
        {site.location} · Open to development opportunities
      </p>
    </div>
  );
}

import { site } from "@/config/site";
import { SocialLinks, CvLink } from "./links";
import { ContactForm } from "./contact-form";
export function ContactContent() {
  return (
    <div className="contact-layout">
      <div>
        <div className="contact-note">
          <small>01 / OPPORTUNITIES</small>
          <b>Development roles</b>Open to full-stack, backend and AI automation
          opportunities.
          <p className="availability">
            <span className="dot" /> {site.availability}
          </p>
        </div>
        <div className="contact-note">
          <small>02 / COLLABORATION</small>
          <b>Projects & automation</b>Available to discuss websites, API
          integrations, and practical business workflows.
        </div>
        <div className="contact-note">
          <small>03 / LOCATION</small>
          <b>{site.location}</b>
          {site.email ? (
            <a href={`mailto:${site.email}`}>{site.email}</a>
          ) : (
            <p>Professional email to be added.</p>
          )}
          <SocialLinks />
          <CvLink />
        </div>
      </div>
      <ContactForm />
    </div>
  );
}

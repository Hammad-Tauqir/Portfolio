import { Download, ExternalLink } from "lucide-react";
import { Github, Linkedin } from "./social-icons";
import { site } from "@/config/site";
export function CvLink({ compact = false }: { compact?: boolean }) {
  if (!site.cv)
    return (
      <span className={compact ? "cv-unavailable compact" : "cv-unavailable"}>
        <Download size={14} aria-hidden="true" /> CV coming soon
      </span>
    );
  return (
    <a href={site.cv} download className={compact ? "navcta" : "btn secondary"}>
      <Download size={15} aria-hidden="true" /> Download CV
    </a>
  );
}
export function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social profiles">
      {[
        { name: "GitHub", url: site.github, Icon: Github },
        { name: "LinkedIn", url: site.linkedin, Icon: Linkedin },
        { name: "Upwork", url: site.upwork, Icon: ExternalLink },
      ].map(({ name, url, Icon }) =>
        url ? (
          <a key={name} href={url} target="_blank" rel="noopener noreferrer">
            <Icon size={15} aria-hidden="true" />
            {name}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <span
            key={name}
            className="unavailable"
            title={`${name} URL to be added`}
          >
            <Icon size={15} aria-hidden="true" />
            {name}
            <small>to be added</small>
          </span>
        ),
      )}
    </div>
  );
}

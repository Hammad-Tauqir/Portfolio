import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { SocialLinks } from "./links";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <strong className="footer-name">{site.name}</strong>
            <p>{site.title}</p>
            <p>{site.location}</p>
            <Link className="footer-link" href="/#contact">
              Start a conversation <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <nav aria-label="Footer navigation">
            <small>Explore</small>
            <Link href="/projects">Projects</Link>
            <Link href="/#about">About</Link>
            <Link href="/#skills">Skills</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <div>
            <small>Elsewhere</small>
            <SocialLinks />
          </div>
        </div>
        <p className="footer-wordmark" aria-hidden="true">
          {site.name}
        </p>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. Designed &amp; built in
            Lahore.
          </span>
          <a href="#top">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

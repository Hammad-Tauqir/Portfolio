import Link from "next/link";
import { site } from "@/config/site";
import { SocialLinks } from "./links";
export function Footer() {
  return (
    <footer className="wrap footer">
      <div>
        <strong>{site.name}</strong>
        <p>{site.title}</p>
        <SocialLinks />
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
      <div className="footer-right">
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <span>
          {site.location} · <a href="#top">Back to top ↑</a>
        </span>
      </div>
    </footer>
  );
}

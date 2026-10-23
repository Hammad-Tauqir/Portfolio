import Link from "next/link";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="wrap footer">
      <div>
        <strong>{site.name}</strong>
        <p>Full-stack development · AI automation</p>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
      <div className="footer-right">
        <nav aria-label="Footer navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <span>
          {site.location} · <a href="#top">Back to top ↑</a>
        </span>
      </div>
    </footer>
  );
}

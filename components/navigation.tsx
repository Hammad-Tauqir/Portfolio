"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { CvLink } from "./links";
import { site } from "@/config/site";
const items = [
  { label: "Home", href: "/", id: "top" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Projects", href: "/projects", id: "projects" },
  { label: "Certifications", href: "/#certifications", id: "certifications" },
  { label: "Contact", href: "/contact", id: "contact" },
];
function subscribeTheme(callback: () => void) {
  window.addEventListener("portfolio-theme", callback);
  return () => window.removeEventListener("portfolio-theme", callback);
}
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("top");
  const menuRef = useRef<HTMLButtonElement>(null);
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.theme || "dark",
    () => "dark",
  );
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  useEffect(() => {
    if (pathname !== "/") return;
    const update = () => {
      const sections = [
        "top",
        "projects",
        "about",
        "skills",
        "experience",
        "services",
        "certifications",
        "contact",
      ];
      let active = "top";
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 180) active = id;
      }
      setSection(active);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Theme still works without storage. */
    }
    window.dispatchEvent(new Event("portfolio-theme"));
  }
  return (
    <header className="site-header">
      <div className="topline" />
      <div className="wrap nav">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brandmark">HT.</span>
          <span>
            {site.name}
            <small>FULL-STACK DEVELOPER</small>
          </span>
        </Link>
        <nav
          id="main-navigation"
          className={`links ${open ? "open" : ""}`}
          aria-label="Main navigation"
        >
          {items.map((item) => {
            const active =
              pathname === "/"
                ? section === item.id
                : item.id === "projects"
                  ? pathname.startsWith("/projects")
                  : pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={active ? "active" : ""}
                aria-current={
                  active
                    ? pathname === "/" && item.id !== "top"
                      ? "location"
                      : "page"
                    : undefined
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav-actions">
          <CvLink compact />
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            ref={menuRef}
            className="menu"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

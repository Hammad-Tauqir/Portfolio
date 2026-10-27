"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/config/site";

const items = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    const scroll = () => setScrolled(window.scrollY > 12);
    scroll();
    window.addEventListener("keydown", close);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  return (
    <header className={`site-header ${scrolled || open ? "scrolled" : ""}`}>
      <div className="wrap nav">
        <Link
          href="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label={`${site.name}, home`}
        >
          <span className="brandmark">HT</span>
          <span className="brand-name">
            {site.name}
            <small>Full-stack · Automation</small>
          </span>
        </Link>
        <nav
          id="main-navigation"
          className={`links ${open ? "open" : ""}`}
          aria-label="Main navigation"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="navcta" href="/#contact">
          Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
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
    </header>
  );
}

"use client";
import Link from "next/link";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="wrap notfound" id="main-content">
      <span className="eyebrow">SOMETHING WENT WRONG</span>
      <h1>Let&apos;s try that again.</h1>
      <p>The page could not be loaded.</p>
      <div className="actions">
        <button className="btn primary" onClick={reset}>
          Try again
        </button>
        <Link className="btn secondary" href="/">
          Go home
        </Link>
      </div>
    </main>
  );
}

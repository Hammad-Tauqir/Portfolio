import Link from "next/link";
export default function NotFound() {
  return (
    <main className="wrap notfound" id="main-content">
      <span className="eyebrow">404 / LOST PAGE</span>
      <h1>Nothing here yet.</h1>
      <p>This page may have moved, or the address may be incorrect.</p>
      <Link className="btn primary" href="/">
        Go home ↗
      </Link>
    </main>
  );
}

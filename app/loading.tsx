export default function Loading() {
  return (
    <main
      id="main-content"
      className="wrap loading-state"
      aria-busy="true"
      aria-label="Loading page"
    >
      <span className="eyebrow" role="status">
        Loading…
      </span>
      <div className="loading-bar" />
      <div className="loading-bar short" />
    </main>
  );
}

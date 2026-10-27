import { ImageResponse } from "next/og";
import { site } from "@/config/site";
export const alt =
  "Hammad Tauqir — Full-Stack Developer and Automation Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b1016",
        color: "#f4f4ec",
        padding: 70,
        borderTop: "8px solid #cefa7b",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28 }}>{site.name}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: -5,
        }}
      >
        <span>Building</span>
        <span style={{ color: "#cefa7b" }}>what&apos;s next.</span>
      </div>
      <div style={{ display: "flex", fontSize: 23, color: "#a4b1b2" }}>
        {site.title}
      </div>
    </div>,
    size,
  );
}

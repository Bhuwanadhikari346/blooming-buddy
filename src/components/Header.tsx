"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartOutlined, HomeOutlined } from "@ant-design/icons";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-light)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
            color: "var(--accent-green)",
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          <span style={{ fontSize: "2rem" }}>🌿</span>
          Blooming Buddy
        </Link>

        <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link
            href="/"
            className={`btn ${pathname === "/" ? "btn-primary" : "btn-secondary"}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
          <Link
            href="/favourites"
            className={`btn ${pathname === "/favourites" ? "btn-primary" : "btn-secondary"}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <HeartOutlined />
            <span className="nav-text">Favorites</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
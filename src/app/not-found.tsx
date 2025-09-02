import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ 
      textAlign: "center", 
      padding: "4rem 2rem",
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ fontSize: "6rem", marginBottom: "1rem" }}>🌿</div>
      <h1 style={{ 
        fontSize: "3rem", 
        color: "var(--accent-green)", 
        marginBottom: "1rem",
        fontWeight: "700"
      }}>
        404
      </h1>
      <h2 style={{ 
        color: "var(--text-muted)", 
        marginBottom: "1rem",
        fontSize: "1.5rem"
      }}>
        Page Not Found
      </h2>
      <p style={{ 
        color: "var(--text-muted)", 
        marginBottom: "2rem",
        maxWidth: "500px",
        lineHeight: "1.6"
      }}>
        Looks like this plant got lost in the garden! The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary">
          🏠 Go Home
        </Link>
        <Link href="/favourites" className="btn btn-secondary">
          💚 View Favorites
        </Link>
      </div>
    </div>
  );
}
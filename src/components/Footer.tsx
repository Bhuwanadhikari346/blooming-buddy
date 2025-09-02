export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--light-gray)",
        borderTop: "1px solid var(--border-color)",
        marginTop: "3rem",
        padding: "2rem 0",
      }}
    >
      <div 
        className="footer-container"
        style={{ 
          textAlign: "center", 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "0 1rem" 
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "2rem", marginBottom: "0.5rem", display: "inline-block" }}>
            🌿
          </span>
          <h3 style={{ color: "var(--accent-green)", margin: "0 0 0.5rem 0", fontSize: "1.5rem" }}>
            Blooming Buddy
          </h3>
          <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "1rem" }}>
            Your trusted companion for plant care and discovery
          </p>
        </div>
        
        <div
          className="footer-features"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div className="footer-section" style={{ minWidth: "150px" }}>
            <strong style={{ color: "var(--accent-green)", fontSize: "1.1rem", display: "block", marginBottom: "0.75rem" }}>
              Features
            </strong>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ margin: "0.5rem 0", color: "var(--text-muted)" }}>🔍 Plant Discovery</li>
              <li style={{ margin: "0.5rem 0", color: "var(--text-muted)" }}>📖 Care Guidelines</li>
              <li style={{ margin: "0.5rem 0", color: "var(--text-muted)" }}>💚 Favorites Collection</li>
            </ul>
          </div>
          
          <div className="footer-section" style={{ minWidth: "150px" }}>
            <strong style={{ color: "var(--accent-green)", fontSize: "1.1rem", display: "block", marginBottom: "0.75rem" }}>
              Learn
            </strong>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ margin: "0.5rem 0", color: "var(--text-muted)" }}>🌱 Plant Care Tips</li>
              <li style={{ margin: "0.5rem 0", color: "var(--text-muted)" }}>🗺️ Hardiness Zones</li>
              <li style={{ margin: "0.5rem 0", color: "var(--text-muted)" }}>🌿 Propagation Methods</li>
            </ul>
          </div>
        </div>
        
        <div
          style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "1.5rem",
            color: "var(--text-muted)",
            fontSize: "0.875rem",
          }}
        >
          <p style={{ margin: "0 0 0.5rem 0", fontWeight: "500" }}>
            © 2025 Blooming Buddy. Made with 💚 for plant lovers everywhere.
          </p>
          <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.8 }}>
            Plant data provided by Perenual API
          </p>
        </div>
      </div>
    </footer>
  );
}
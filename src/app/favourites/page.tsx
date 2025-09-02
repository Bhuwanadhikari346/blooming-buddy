"use client";

import styles from "@/components/PlantSearchResults.module.css";
import { useFavorites } from "@/context/FavouritesContext";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

  return (
    <div className="container" style={{ padding: "2rem 1rem", minHeight: "100vh" }}>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "1rem", 
        marginBottom: "2rem",
        padding: "1rem 0"
      }}>
        <button
          onClick={() => router.back()}
          className="btn btn-secondary"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <ArrowLeftOutlined /> Back
        </button>
        <h1 style={{ 
          margin: 0, 
          color: "var(--accent-green)", 
          fontSize: "2.5rem",
          fontWeight: "700" 
        }}>
          🌿 Your Favorite Plants
        </h1>
      </div>
      
      {favorites.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "var(--light-gray)",
            borderRadius: "var(--border-radius)",
            margin: "2rem 0",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💚</div>
          <h3 style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
            No favorites yet
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            Start exploring plants and add them to your favorites by clicking the heart icon!
          </p>
          <Link href="/" className="btn btn-primary">
            🔍 Discover Plants
          </Link>
        </div>
      ) : (
        <>
          <div style={{ 
            textAlign: "center", 
            marginBottom: "2rem",
            padding: "1rem",
            background: "var(--secondary-green)",
            borderRadius: "var(--border-radius)",
            border: "1px solid var(--primary-green)"
          }}>
            <p style={{ 
              margin: 0, 
              color: "var(--accent-green)",
              fontSize: "1.1rem",
              fontWeight: "500"
            }}>
              You have {favorites.length} favorite plant{favorites.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className={styles.flex}>
            {favorites?.map((plant) => (
              <div key={plant.id} className={styles.card}>
                <Link href={`/plant/${plant.id}`}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={plant.default_image.thumbnail || plant.default_image.original_url}
                      alt={plant.common_name}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.content}>
                    <div>
                      <h3>{plant.common_name}</h3>
                      <p>
                        <em>{plant.scientific_name}</em>
                      </p>
                    </div>
                  </div>
                </Link>
                <div style={{ padding: "0 1.25rem 1.25rem 1.25rem" }}>
                  <button
                    className="btn"
                    style={{
                      width: "100%",
                      background: "#ff4d4f",
                      color: "white",
                      fontSize: "0.875rem",
                      padding: "0.75rem 1rem",
                      border: "none",
                    }}
                    onClick={() => toggleFavorite(plant)}
                    type="button"
                  >
                    💔 Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

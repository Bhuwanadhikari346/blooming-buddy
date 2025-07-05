"use client";

import styles from "@/components/PlantSearchResults.module.css";
import { useFavorites } from "@/context/FavouritesContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FavoritesPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>🌿 Your Favourite Plants</h2>
      {favorites.length === 0 ? (
        <p style={{ textAlign: "center" }}>No favourites added yet.</p>
      ) : (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {favorites?.map((plant) => (
            <div key={plant.id} className={styles.card}>
              <Link
                href={`/plant/${plant.id}${
                  q ? `?q=${encodeURIComponent(q)}` : ""
                }`}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={plant.default_image.thumbnail}
                    alt={plant.common_name}
                    className={styles.image}
                  />
                </div>
                <div className={styles.content}>
                  <h3>{plant.common_name}</h3>
                  <p>
                    <em>{plant.scientific_name}</em>
                  </p>
                </div>
              </Link>
              <button
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "2px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleFavorite(plant)}
                type="reset"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

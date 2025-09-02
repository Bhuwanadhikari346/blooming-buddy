"use client";

import styles from "@/components/PlantSearchResults.module.css";
import { useFavorites } from "@/context/FavouritesContext";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface PlantSearchResultsProps {
  data: any;
}

export default function PlantSearchResults({ data }: PlantSearchResultsProps) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  
  const onlyDatasWithImages = data?.filter((datas: any) => {
    return datas?.default_image != null && !imageErrors.has(datas.id);
  });
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleImageError = (plantId: number) => {
    setImageErrors(prev => new Set(prev).add(plantId));
  };

  const handleFavoriteClick = (e: React.MouseEvent, plant: any) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(plant);
  };

  if (!onlyDatasWithImages || onlyDatasWithImages.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "4rem 2rem",
        background: "var(--light-gray)",
        borderRadius: "var(--border-radius)",
        margin: "2rem auto",
        maxWidth: "600px"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
        <h3 style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>
          No plants found
        </h3>
        <p style={{ color: "var(--text-muted)" }}>
          Try searching with different keywords or check your spelling.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.flex}>
      {onlyDatasWithImages?.map((plant: any) => (
        <article key={plant.id} className={styles.card} role="article">
          <Link
            href={`/plant/${plant.id}${q ? `?q=${encodeURIComponent(q)}` : ""}`}
            aria-label={`View details for ${plant.common_name}`}
          >
            <div className={styles.imageWrapper}>
              <img
                src={plant.default_image.thumbnail}
                alt={`${plant.common_name} - ${plant.scientific_name}`}
                className={styles.image}
                loading="lazy"
                onError={() => handleImageError(plant.id)}
              />
            </div>
            <div className={styles.content}>
              <h3>{plant.common_name}</h3>
              <p style={{ marginBottom: "8px" }}>
                <em>{plant.scientific_name}</em>
              </p>
            </div>
          </Link>
          <Tooltip
            title={
              isFavorite(plant.id)
                ? "Remove from Favourites"
                : "Add to Favourites"
            }
          >
            <button
              className={styles.onHover}
              onClick={(e) => handleFavoriteClick(e, plant)}
              aria-label={
                isFavorite(plant.id)
                  ? `Remove ${plant.common_name} from favorites`
                  : `Add ${plant.common_name} to favorites`
              }
            >
              {isFavorite(plant.id) ? (
                <HeartFilled style={{ color: "#ff4d4f", fontSize: "20px" }} />
              ) : (
                <HeartOutlined style={{ color: "var(--primary-green)", fontSize: "20px" }} />
              )}
            </button>
          </Tooltip>
        </article>
      ))}
    </div>
  );
}

"use client";

import styles from "@/components/PlantSearchResults.module.css";
import { useFavorites } from "@/context/FavouritesContext";
import { Tooltip } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PlantSearchResultsProps {
  data: any;
}

export default function PlantSearchResults({ data }: PlantSearchResultsProps) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const onlyDatasWithImages = data?.filter((datas: any) => {
    return datas?.default_image != null;
  });
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className={styles.flex}>
      {onlyDatasWithImages?.map((plant: any) => (
        <div key={plant.id} className={styles.card}>
          <Link
            href={`/plant/${plant.id}${q ? `?q=${encodeURIComponent(q)}` : ""}`}
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
              <p style={{ marginBottom: "8px" }}>
                <em>{plant.scientific_name}</em>
              </p>
            </div>
          </Link>
          <Tooltip title="Your Favourites">
            <button
              className={styles.onHover}
              onClick={() => toggleFavorite(plant)}
            >
              {isFavorite(plant.id) ? "❤️" : "🤎"}
            </button>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}

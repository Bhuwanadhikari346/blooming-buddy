"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Plant = {
  id: number;
  common_name: string;
  scientific_name: string;
  default_image: {
    original_url: string;
    thumbnail?: string;
  };
};

type FavoritesContextType = {
  favorites: Plant[];
  toggleFavorite: (plant: Plant) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Plant[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (plant: Plant) => {
    setFavorites((current) => {
      const exists = current.find((fav) => fav.id === plant.id);
      return exists
        ? current.filter((fav) => fav.id !== plant.id)
        : [...current, plant];
    });
  };

  const isFavorite = (id: number) => favorites.some((fav) => fav.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PlantSearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export default function PlantSearch({ onSearch, onClear }: PlantSearchProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="input"
            placeholder="Search for plants, flowers, herbs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="search-buttons">
          {query && (
            <button
              className="btn btn-secondary"
              onClick={handleClear}
              type="button"
            >
              Clear
            </button>
          )}
          <button className="btn btn-primary" type="submit" disabled={!query.trim()}>
            🔍 Search
          </button>
        </div>
      </form>
    </div>
  );
}

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
    <form className="form" onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div className="search-bar" style={{ marginRight: 10 }}>
          <input
            type="text"
            style={{
              padding: 8,
              border: "1px solid #2c6e49",
              borderRadius: "5px",
              width: "350px",
            }}
            placeholder="Search plants..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="btn-btn">
          {query && (
            <button
              style={{
                backgroundColor: "#564b36",
                color: "white",
                padding: "8px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: 10,
              }}
              onClick={handleClear}
              type="reset"
            >
              Cancel
            </button>
          )}
          <button
            style={{
              backgroundColor: "#389e0d",
              color: "white",
              padding: "8px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: 10,
            }}
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

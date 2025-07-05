"use client";

import FeaturedPlant from "@/components/FeaturedPlant";
import PlantSearch from "@/components/PlantSearch";
import PlantSearchResults from "@/components/PlantSearchResults";
import { Card, FloatButton, Skeleton, Tooltip } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const speciesOfPlants = [
    "pineapple",
    "apple",
    "kiwi",
    "marigold",
    "rose",
    "cactus",
    "banana",
    "grape",
    "tulip",
    "fern",
  ];

  //   const handleSearch = (query: string) => {
  //   router.push(`/?q=${encodeURIComponent(query)}`);
  // };

  const handleSearch = useCallback(
    (query: string) => {
      router.push(`/?q=${encodeURIComponent(query)}`);
    },
    [router]
  ); // using callback

  const handleClear = useCallback(() => {
    router.replace("/");
  }, [router]);

  const handleGoToFavourite = () => {
    router.push("/favourites");
  };

  // useEffect(() => {
  //   const fetchPlants = async (plantQuery: string) => {
  //     try {
  //       setLoading(true);
  //       setError("");

  //       const res = await fetch(
  //         `https://perenual.com/api/v2/species-list?key=sk-K1mB683408aab149910656&q=${plantQuery}`
  //       );
  //       const plantsData = await res.json();
  //       setPlants(plantsData?.data || []);
  //     } catch (err) {
  //       setError("Something went wrong");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   const plantToFetch = query
  //     ? query
  //     : speciesOfPlants[Math.floor(Math.random() * speciesOfPlants.length)];

  //   fetchPlants(plantToFetch);
  // }, [query]);

  useEffect(() => {
    // if (!query) return;
    const fetchPlants = async (
      plantQuery: string,
      type: "featured" | "search"
    ) => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://perenual.com/api/v2/species-list?key=${apiKey}&q=${plantQuery}`
        );
        const plantsData = await res.json();

        if (type === "featured") {
          setFeaturedPlants(plantsData?.data || []);
        } else {
          setSearchResults(plantsData?.data || []);
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchPlants(query, "search");
    } else if (featuredPlants.length === 0) {
      const randomQuery =
        speciesOfPlants[Math.floor(Math.random() * speciesOfPlants.length)];
      fetchPlants(randomQuery, "featured");
    }
  }, [query]);

  return (
    <main>
      {error && <div style={{ textAlign: "center" }}>{error}</div>}
      {!loading && !query && (
        <div style={{ height: "60vh" }}>
          <FeaturedPlant data={featuredPlants} />
          <div
            style={{
              height: "100%",
              padding: "4rem 2rem",
              textAlign: "center",
              backgroundColor: "#f6ffed", // soft green tint
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                color: "#389e0d", // deep green
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Get to know your favourite plants — better than ever.
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#595959",
              }}
            >
              Discover care tips, sunlight needs, and more — all in one place.
            </p>
            <PlantSearch onSearch={handleSearch} onClear={handleClear} />
          </div>
        </div>
      )}
      {loading ? (
        <div style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Card key={index} style={{ width: 250 }}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </div>
      ) : (
        <>
          {!query && (
            <Tooltip title="Your Favourites">
              <FloatButton
                icon={<HeartOutlined />}
                type="primary"
                style={{ right: 24, bottom: 24 }}
                onClick={handleGoToFavourite}
              />
            </Tooltip>
          )}
          {query && (
            <>
              <PlantSearch onSearch={handleSearch} onClear={handleClear} />
              {searchResults?.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "#989191",
                    marginTop: "2rem",
                  }}
                >
                  No data Found...
                </div>
              ) : (
                <div className="rendered-items">
                  <PlantSearchResults data={searchResults} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}

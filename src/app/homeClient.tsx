"use client";

import FeaturedPlant from "@/components/FeaturedPlant";
import PlantSearch from "@/components/PlantSearch";
import PlantSearchResults from "@/components/PlantSearchResults";
import { Card, FloatButton, Skeleton, Tooltip } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function HomeClient() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const speciesOfPlants = ["pineapple", "kiwi", "lily", "tulip", "fern"];

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
    <main className="container">
      {error && (
        <div style={{ 
          textAlign: "center", 
          padding: "2rem",
          background: "#fff2f0",
          border: "1px solid #ffccc7",
          borderRadius: "var(--border-radius)",
          color: "#a8071a",
          margin: "1rem 0"
        }}>
          <h3>⚠️ {error}</h3>
          <p>Please try again or check your internet connection.</p>
        </div>
      )}
      
      {!loading && !query && (
        <div style={{ minHeight: "60vh" }}>
          <FeaturedPlant data={featuredPlants} />
          <div
            style={{
              padding: "3rem 2rem",
              textAlign: "center",
              background: "linear-gradient(135deg, var(--secondary-green), #f0f9ff)",
              borderRadius: "var(--border-radius)",
              boxShadow: "var(--shadow-medium)",
              margin: "2rem 0",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "200px",
                height: "200px",
                background: "linear-gradient(45deg, var(--primary-green), transparent)",
                borderRadius: "50%",
                opacity: 0.1,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-30px",
                left: "-30px",
                width: "150px",
                height: "150px",
                background: "linear-gradient(45deg, var(--accent-green), transparent)",
                borderRadius: "50%",
                opacity: 0.1,
              }}
            />
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                color: "var(--accent-green)",
                fontWeight: "700",
                marginBottom: "1rem",
                lineHeight: "1.2",
                position: "relative",
                zIndex: 1,
              }}
            >
              🌿 Discover Your Plant Paradise
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                color: "var(--text-muted)",
                marginBottom: "2rem",
                maxWidth: "600px",
                margin: "0 auto 2rem auto",
                lineHeight: "1.6",
                position: "relative",
                zIndex: 1,
              }}
            >
              Get expert care tips, sunlight requirements, and everything you need to help your plants thrive.
            </p>
            <PlantSearch onSearch={handleSearch} onClear={handleClear} />
          </div>
        </div>
      )}
      
      {loading && (
        <div className="skeleton-container">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Card key={index} className="skeleton-card">
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </div>
      )}
      
      {!loading && (
        <>
          {!query && (
            <Tooltip title="View Your Favourite Plants" placement="left">
              <FloatButton
                icon={<HeartOutlined style={{ color: "#ff4d4f", fontSize: "20px" }} />}
                type="primary"
                style={{ 
                  right: 24, 
                  bottom: 24,
                  background: "white",
                  boxShadow: "var(--shadow-medium)",
                  border: "2px solid var(--primary-green)"
                }}
                onClick={handleGoToFavourite}
              />
            </Tooltip>
          )}
          {query && (
            <>
              <div style={{ 
                background: "var(--light-gray)", 
                padding: "1rem 2rem", 
                borderRadius: "var(--border-radius)",
                margin: "1rem 0 2rem 0",
                border: "1px solid var(--border-color)"
              }}>
                <PlantSearch onSearch={handleSearch} onClear={handleClear} />
              </div>
              {searchResults?.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "4rem 2rem",
                    background: "var(--light-gray)",
                    borderRadius: "var(--border-radius)",
                    margin: "2rem 0",
                  }}
                >
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
                  <h3 style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                    No plants found
                  </h3>
                  <p style={{ color: "var(--text-muted)" }}>
                    Try searching with different keywords or check your spelling.
                  </p>
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

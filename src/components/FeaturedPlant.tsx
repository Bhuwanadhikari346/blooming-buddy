"use client";

import { Carousel, Tooltip } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

interface FeaturedPlantProps {
  data: any;
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "600px",
  color: "var(--foreground)",
  lineHeight: "1.6",
  textAlign: "center",
  background: "linear-gradient(135deg, var(--secondary-green), #f0f9ff)",
  borderRadius: "var(--border-radius)",
  overflow: "hidden",
  position: "relative",
};

const imageStyle: React.CSSProperties = {
  height: "450px",
  width: "100%",
  objectFit: "cover",
  margin: "0 auto",
  display: "block",
  padding: "1.5rem",
  borderRadius: "var(--border-radius)",
  transition: "transform 0.3s ease",
};

export default function FeaturedPlant(data: FeaturedPlantProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const handleOnDetalPage = (id: number) => {
    const query = q ? `?q=${encodeURIComponent(q)}` : "";
    router.push(`/plant/${id}${query}`);
  };
  if (!data || data.data.length === 0) return null;
  
  return (
    <div style={{ margin: "2rem 0", borderRadius: "var(--border-radius)", overflow: "hidden", boxShadow: "var(--shadow-medium)" }}>
      <Carousel 
        dots={true} 
        autoplay 
        arrows 
        effect="fade"
        autoplaySpeed={4000}
      >
        {data?.data.slice(0, 3).map((plant: any, index: number) => (
          <div key={index}>
            <div style={contentStyle}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(45deg, rgba(82, 196, 26, 0.05), rgba(47, 84, 235, 0.05))",
                  zIndex: 0,
                }}
              />
              <img
                style={imageStyle}
                src={plant?.default_image?.original_url}
                alt={plant?.common_name}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <Tooltip title="Click to learn more about this plant">
                <div
                  style={{
                    cursor: "pointer",
                    width: "max-content",
                    margin: "0 auto",
                    padding: "1rem 2rem",
                    background: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "var(--border-radius)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "var(--shadow-light)",
                    border: "1px solid var(--border-color)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    zIndex: 1,
                  }}
                  onClick={() => handleOnDetalPage(plant.id)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-medium)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow-light)";
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 0.5rem 0", 
                    color: "var(--accent-green)", 
                    fontSize: "1.5rem",
                    fontWeight: "700" 
                  }}>
                    {plant?.common_name}
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    color: "var(--text-muted)", 
                    fontStyle: "italic",
                    fontSize: "1rem" 
                  }}>
                    {plant?.scientific_name}
                  </p>
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

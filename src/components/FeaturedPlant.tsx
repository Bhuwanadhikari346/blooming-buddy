"use client";

import { Carousel, Tooltip } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

interface FeaturedPlantProps {
  data: any;
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "550px",
  color: "#595959",
  lineHeight: "24px",
  textAlign: "center",
  background: "#f6ffed",
};

const imageStyle: React.CSSProperties = {
  maxHeight: "450px",
  width: "100%",
  objectFit: "cover",
  margin: "0 auto",
  display: "block",
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
    <Carousel dots={false} autoplay arrows>
      {data?.data.slice(0, 3).map((plant: any, index: number) => (
        <div key={index}>
          <div style={contentStyle}>
            <img
              style={imageStyle}
              src={plant?.default_image?.original_url}
              alt={plant?.common_name}
            />
            <Tooltip title="Click for more detail">
              <div
                style={{
                  cursor: "pointer",
                  width: "max-content",
                  margin: "0 auto",
                }}
                onClick={() => handleOnDetalPage(plant.id)}
              >
                <h3 style={{ marginTop: "1rem" }}>{plant?.common_name}</h3>
                <p>{plant?.scientific_name}</p>
              </div>
            </Tooltip>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

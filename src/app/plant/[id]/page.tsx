import React from "react";
import BackButton from "@/components/BackButton";
import styles from "./page.module.css";
import PlantAttributes from "@/components/PlantAttributes";
import PlantCareInfo from "@/components/PlantCareInfo";

interface PlantDetailParams {
  id: string;
}

export default async function PlantDetail({
  params,
}: {
  params: Promise<PlantDetailParams>;
}) {
  const { id } = await params;
  const apiKey = process.env.PERENUAL_API_KEY;
  
  try {
    const res = await fetch(
      `https://perenual.com/api/v2/species/details/${id}?key=${apiKey}`
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch plant data: ${res.status}`);
    }
    
    const plantDetailData = await res.json();
    
    if (!plantDetailData || plantDetailData.error) {
      throw new Error("Plant not found");
    }

    const hardiness_location = {
      full_iframe: plantDetailData?.hardiness_location?.full_iframe || "",
    };

    const zoneText =
      plantDetailData?.hardiness?.min != null &&
      plantDetailData?.hardiness?.max != null
        ? plantDetailData.hardiness.min === plantDetailData.hardiness.max
          ? `USDA Hardiness Zone ${plantDetailData.hardiness.min}`
          : `USDA Hardiness Zones ${plantDetailData.hardiness.min} to ${plantDetailData.hardiness.max}`
        : "Hardiness zone info not available";

    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={plantDetailData?.default_image?.original_url || "/placeholder-plant.jpg"}
            alt={plantDetailData?.common_name || "Plant image"}
            width={"100%"}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </div>
        
        <div className={`${styles.flex} ${styles.nowrap}`}>
          <div className={styles.name_info}>
            <h1 className={styles.bigFont}>
              {plantDetailData?.common_name || "Unknown Plant"}
            </h1>
            <p className={styles.smallFont}>
              {plantDetailData?.scientific_name || "Scientific name not available"}
            </p>
          </div>
          
          {(plantDetailData?.fruits !== undefined || 
            plantDetailData?.flower !== undefined || 
            plantDetailData?.poisonous_to_humans !== undefined || 
            plantDetailData?.poisonous_to_pets !== undefined || 
            plantDetailData?.indoor !== undefined) && (
            <div className={styles.generalInfo}>
              <p>🍎 Fruit: {plantDetailData?.fruits ? "Yes" : "No"}</p>
              <p>🌸 Flower: {plantDetailData?.flower ? "Yes" : "No"}</p>
              <p>⚠️ Toxic to Humans: {plantDetailData?.poisonous_to_humans ? "Yes" : "No"}</p>
              <p>🐕 Toxic to Pets: {plantDetailData?.poisonous_to_pets ? "Yes" : "No"}</p>
              <p>🏠 Indoor Plant: {plantDetailData?.indoor ? "Yes" : "No"}</p>
            </div>
          )}
        </div>
        
        {plantDetailData?.description && (
          <div className={styles.desc}>
            <p>{plantDetailData.description}</p>
          </div>
        )}
        
        <div className={styles.flex} style={{ marginBottom: "1rem" }}>
          <PlantAttributes propagation={plantDetailData?.propagation} />
          <PlantCareInfo
            pruning={plantDetailData?.pruning_month}
            sunlight={plantDetailData?.sunlight}
            watering={plantDetailData?.watering}
            care={plantDetailData?.care_level}
            origin={plantDetailData?.origin}
          />
        </div>
        
        <div className={styles.flexColumn}>
          <h2 className={`${styles.hardinessTitle} ${styles.greenText}`}>
            🗺️ Plant Hardiness Information
          </h2>
          <div className={styles.innerFlex}>
            {hardiness_location.full_iframe ? (
              <div
                style={{ flex: 2, minWidth: "300px" }}
                dangerouslySetInnerHTML={{
                  __html: hardiness_location.full_iframe,
                }}
              />
            ) : (
              <div
                style={{
                  flex: 2,
                  minWidth: "300px",
                  background: "var(--light-gray)",
                  padding: "2rem",
                  borderRadius: "var(--border-radius)",
                  textAlign: "center",
                  color: "var(--text-muted)",
                }}
              >
                <p>🗺️ Hardiness map not available for this plant.</p>
              </div>
            )}

            <div className={styles.borderBox}>
              <h3 className={styles.greenText}>🌡️ Hardiness Zone</h3>
              <p>{zoneText}</p>
              {plantDetailData?.hardiness?.min && plantDetailData?.hardiness?.max && (
                <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--secondary-green)", borderRadius: "var(--border-radius-small)" }}>
                  <small style={{ color: "var(--text-muted)" }}>
                    This plant can survive in climates with minimum winter temperatures 
                    in the specified USDA zones.
                  </small>
                </div>
              )}
            </div>
          </div>
          <BackButton />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching plant details:", error);
    return (
      <div className={styles.container}>
        <div style={{
          textAlign: "center",
          padding: "4rem 2rem",
          background: "#fff2f0",
          border: "1px solid #ffccc7",
          borderRadius: "var(--border-radius)",
          margin: "2rem 0",
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿💔</div>
          <h2 style={{ color: "#a8071a", marginBottom: "1rem" }}>
            Plant Not Found
          </h2>
          <p style={{ color: "#595959", marginBottom: "1.5rem" }}>
            We couldn't find the plant you're looking for. It might have been removed or the ID is incorrect.
          </p>
          <BackButton />
        </div>
      </div>
    );
  }
}

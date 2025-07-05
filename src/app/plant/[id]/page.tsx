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
  const res = await fetch(
    `https://perenual.com/api/v2/species/details/${id}?key=${apiKey}`
  );
  const plantDetailData = await res.json();
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
          src={plantDetailData?.default_image?.original_url}
          alt={plantDetailData?.common_name}
          width={"100%"}
          height={500}
        />
      </div>
      <div className={styles.flex}>
        <div className={styles.name_info}>
          <p className={styles.bigFont}>{plantDetailData?.common_name}</p>
          <p className={styles.smallFont}>{plantDetailData?.scientific_name}</p>
        </div>
        <div className={styles.generalInfo}>
          <p>Fruit:&nbsp;{plantDetailData?.fruits ? "Yes" : "No"}</p>
          <p>Flower:&nbsp;{plantDetailData?.flower ? "Yes" : "No"}</p>
          <p>
            Poisonous To Humans:&nbsp;
            {plantDetailData?.poisonous_to_humans ? "Yes" : "No"}
          </p>
          <p>
            Poisonous To Pets:&nbsp;
            {plantDetailData?.poisonous_to_pets ? "Yes" : "No"}
          </p>
          <p>Indoor:&nbsp;{plantDetailData?.indoor ? "Yes" : "No"}</p>
        </div>
      </div>
      <div className={styles.desc}>
        <p>{plantDetailData?.description}</p>
      </div>
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
          Plant Hardiness Map
        </h2>
        <div className={styles.innerFlex}>
          {hardiness_location.full_iframe ? (
            <div
              dangerouslySetInnerHTML={{
                __html: hardiness_location.full_iframe,
              }}
            />
          ) : (
            <p>No hardiness map available.</p>
          )}

          {plantDetailData?.hardiness?.min &&
          plantDetailData?.hardiness?.max ? (
            <div className={styles.borderBox}>
              <h3 className={styles.greenText}>Hardiness Zone</h3>
              <p>{zoneText}</p>
            </div>
          ) : (
            <p>Hardiness zone info not available.</p>
          )}
        </div>
        <BackButton />
      </div>
    </div>
  );
}

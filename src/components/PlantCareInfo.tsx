"use client";

import styles from "@/components/PlantCareInfo.module.css";

interface PlantCareProps {
  pruning: any;
  watering: string;
  sunlight: string;
  care: string;
  origin: any;
}

export default function PlantCareInfo(prop: PlantCareProps) {
  const careItems = [
    { icon: "☀️", label: "Sunlight", value: prop?.sunlight || "Not specified" },
    { icon: "💧", label: "Watering", value: prop?.watering || "Not specified" },
    { icon: "🌱", label: "Care Level", value: prop?.care || "Not specified" },
  ];

  return (
    <div className={styles.flex}>
      {/* Pruning Information */}
      <div className={styles.wrapper}>
        <div className={styles.title}>🌿 Pruning Schedule</div>
        {prop?.pruning && prop.pruning.length > 0 ? (
          prop.pruning.map((month: string, index: number) => (
            <div key={index} className={styles.careItem}>
              <strong>Month {index + 1}:</strong>
              <span>{month}</span>
            </div>
          ))
        ) : (
          <div className={styles.careItem}>
            <span>No pruning schedule available</span>
          </div>
        )}
      </div>

      {/* Care Instructions */}
      <div className={styles.wrapper}>
        <div className={styles.title}>🌿 Care Instructions</div>
        {careItems.map((item, index) => (
          <div key={index} className={styles.careItem}>
            <strong>{item.icon} {item.label}:</strong>
            <span>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Origin Information */}
      <div className={styles.wrapper}>
        <div className={styles.title}>🌍 Origin</div>
        {prop?.origin && prop.origin.length > 0 ? (
          prop.origin.map((location: string, index: number) => (
            <div key={index} className={styles.careItem}>
              <strong>Region {index + 1}:</strong>
              <span>{location}</span>
            </div>
          ))
        ) : (
          <div className={styles.careItem}>
            <span>Origin information not available</span>
          </div>
        )}
      </div>
    </div>
  );
}

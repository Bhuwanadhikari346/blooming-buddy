"use client";

import styles from "@/components/PlantAttributes.module.css";
interface PlantAttributesProps {
  propagation: any;
}

export default function PlantAttributes(prop: PlantAttributesProps) {
  if (!prop?.propagation || prop.propagation.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <h3 style={{ color: "var(--accent-green)", marginBottom: "1rem" }}>
          🌱 Propagation Methods
        </h3>
        <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem" }}>
          No propagation information available for this plant.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <h3 style={{ color: "var(--accent-green)", marginBottom: "1rem" }}>
        🌱 Propagation Methods
      </h3>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Method #</th>
            <th>Propagation Technique</th>
          </tr>
        </thead>
        <tbody>
          {prop?.propagation?.map((v: string, i: number) => (
            <tr key={i}>
              <td data-label="Method #">{i + 1}</td>
              <td data-label="Propagation Technique">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

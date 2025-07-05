"use client";

import styles from "@/components/PlantAttributes.module.css";
interface PlantAttributesProps {
  propagation: any;
}

export default function PlantAttributes(prop: PlantAttributesProps) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Propagation (How to reproduce)</th>
          </tr>
        </thead>
        <tbody>
          {prop?.propagation?.map((v: string, i: number) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

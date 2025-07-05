"use client";

import styles from "@/components/PlantCareInfo.module.css";
import { List } from "antd";
interface PlantCareProps {
  pruning: any;
  watering: string;
  sunlight: string;
  care: string;
  origin: any;
}

export default function PlantCareInfo(prop: PlantCareProps) {
  return (
    <div className={styles.flex}>
      <List
        className={styles.wrapper}
        header={<div>Month of Pruning</div>}
        bordered
        dataSource={prop?.pruning}
        renderItem={(item: string, index: number) => (
          <List.Item key={index}>{item}</List.Item>
        )}
      />

      <List
        className={styles.wrapper}
        header={<div>Care Instructions</div>}
        bordered
        dataSource={[1]} // dummy single-item list to render one block
        renderItem={() => (
          <List.Item>
            <div>
              <p>Sunlight: {prop?.sunlight}</p>
              <p>Watering: {prop?.watering}</p>
              <p>Care: {prop?.care}</p>
            </div>
          </List.Item>
        )}
      />

      <List
        className={styles.wrapper}
        header={<div>Origin</div>}
        bordered
        dataSource={prop?.origin}
        renderItem={(item: string, index: number) => (
          <List.Item key={index}>{item}</List.Item>
        )}
      />
    </div>
  );
}

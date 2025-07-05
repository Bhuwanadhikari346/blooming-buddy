import { Suspense } from "react";
import HomeClient from "./homeClient";
import { Card, Skeleton } from "antd";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Card key={index} style={{ width: 250 }}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </div>
      }
    >
      <HomeClient />
    </Suspense>
  );
}

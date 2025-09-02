import { Suspense } from "react";
import HomeClient from "./homeClient";
import { Card, Skeleton } from "antd";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="skeleton-container">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Card key={index} className="skeleton-card">
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

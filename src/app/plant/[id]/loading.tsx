"use client";

import { Spin, Card, Skeleton } from "antd";

export default function Loading() {
  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Image skeleton */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        marginBottom: "2rem",
        borderRadius: "var(--border-radius)",
        overflow: "hidden" 
      }}>
        <Skeleton.Image 
          style={{ width: "100%", maxWidth: "800px", height: "400px" }} 
          active 
        />
      </div>
      
      {/* Content skeletons */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
        <div style={{ flex: 2, minWidth: "300px" }}>
          <Card>
            <Skeleton active paragraph={{ rows: 3 }} />
          </Card>
        </div>
      </div>
      
      {/* Description skeleton */}
      <Card style={{ marginBottom: "2rem" }}>
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
      
      {/* Care info skeletons */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <Card style={{ flex: 1, minWidth: "300px" }}>
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card>
        <Card style={{ flex: 1, minWidth: "300px" }}>
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card>
      </div>
      
      {/* Hardiness map skeleton */}
      <Card style={{ textAlign: "center", padding: "3rem" }}>
        <Skeleton active paragraph={{ rows: 3 }} />
        <div style={{ marginTop: "2rem" }}>
          <Spin size="large" />
        </div>
      </Card>
    </div>
  );
}

import { Spin } from "antd";

export default function Loading() {
  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <Spin size="large" />
    </div>
  );
}

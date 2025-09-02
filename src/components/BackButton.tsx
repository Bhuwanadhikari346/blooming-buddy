"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function BackButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const goBack = () => {
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  };

  return (
    <button
      className="btn btn-secondary"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        margin: "2rem auto 1rem auto",
        fontSize: "1rem",
        padding: "0.75rem 1.5rem",
      }}
      onClick={goBack}
    >
      <ArrowLeftOutlined /> 
      Back to {q ? 'Search Results' : 'Home'}
    </button>
  );
}

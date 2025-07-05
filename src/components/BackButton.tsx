"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const goBack = () => {
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  };

  return (
    <button
      style={{
        backgroundColor: "#2c6e49",
        color: "white",
        padding: "8px",
        border: "none",
        borderRadius: "5px",
        marginTop: "1rem",
        marginBottom: "1rem",
        cursor: "pointer",
      }}
      onClick={goBack}
    >
      ← Back
    </button>
  );
}

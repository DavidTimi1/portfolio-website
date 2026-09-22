"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

export function HomeScrollHandler() {
  const hasScrolledRef = useRef(false);
  const params = useParams();

  useEffect(() => {
    if (!params?.section || hasScrolledRef.current) {
      return;
    }

    const sectionId =
      params.section === "contact" ? "contact-end" : (params.section as string);
    const element = document.getElementById(sectionId);

    if (element) {
      const timeoutId = window.setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
        hasScrolledRef.current = true;
      }, 100);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }
  }, [params?.section]);

  return null;
}

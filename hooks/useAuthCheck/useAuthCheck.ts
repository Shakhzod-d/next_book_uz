"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { getCookie } from "cookies-next";

export default function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const token = false; // MUST CHECK LATER

    if (!token) {
      router.replace("/sign-in"); // Redirect unauthenticated users
    }
  }, [router]);
}

"use client";

import dynamic from "next/dynamic";

const AuthorList = dynamic(() => import("./list/container"), { ssr: false });

export default function AuthorClientWrapper() {
  return <AuthorList />;
}

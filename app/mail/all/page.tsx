"use client";
import { Suspense } from "react";
import { EmailPage } from "../components/email-page";

export default function AllMailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailPage folder="all" showTabs={true} />
    </Suspense>
  );
}

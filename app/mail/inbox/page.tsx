"use client";

import { EmailPage } from "../components/email-page";

export default function InboxPage() {
  return (
    <>
      <EmailPage folder="inbox" showTabs={true} />
    </>
  );
}

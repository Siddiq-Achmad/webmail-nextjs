"use client";

import { MailHeader } from "./components/mail-header";
import MailSidebar from "./components/mail-sidebar";
import { Toaster } from "sonner";
import { WelcomeToast } from "@/components/welcome-toast";

export default function MailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Header */}
      <MailHeader />

      {/* Sidebar */}
      <MailSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 mt-14">
        <main className="h-full overflow-y-auto">{children}</main>
        <Toaster closeButton />
        <WelcomeToast />
      </div>
    </div>
  );
}

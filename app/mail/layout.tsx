"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Archive,
  ChevronDown,
  Edit3,
  Grid,
  Inbox,
  LayoutGrid,
  Mail,
  MailPlus,
  Search,
  Send,
  Settings,
  Star,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { MailHeader } from "./components/mail-header";
import MailSidebar from "./components/mail-sidebar";
import { Toaster } from "sonner";
import { WelcomeToast } from "@/components/welcome-toast";

export default function MailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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

"use client";

import { FramerModal, ModalContent } from "@/components/core/modal/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Edit3, Inbox, Star, Send, Trash2, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ComposePage from "../compose/page";

const sidebarItems = [
  { icon: Inbox, label: "Inbox", href: "/mail/inbox", count: 115 },
  { icon: Star, label: "Important", href: "/mail/important" },
  { icon: Edit3, label: "Drafts", href: "/mail/drafts", count: 11 },
  { icon: Send, label: "Sent", href: "/mail/sent", count: 5 },
  { icon: Trash2, label: "Trash", href: "/mail/trash", count: 4 },
  { icon: Mail, label: "All Mail", href: "/mail/all", count: 294 },
];

const labels = [
  { name: "Work", color: "bg-blue-500", count: 0 },
  { name: "Studies", color: "bg-yellow-500", count: 0 },
];

export default function MailSidebar() {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="w-64 border-r flex flex-col fixed left-0 top-14 bottom-0">
      <div className="p-4">
        <Button
          className="w-full justify-center gap-2"
          size="lg"
          onClick={() => setModalOpen(true)}
        >
          <Edit3 className="h-4 w-4" />
          <span className="text-large">Compose</span>
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-full transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 ${isActive ? "text-blue-600" : ""}`}
                    />
                    {item.label}
                  </div>
                  {item.count !== undefined && (
                    <span className="text-xs text-muted-foreground">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="px-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Labels
              </h2>
            </div>
            <div className="space-y-1">
              {labels.map((label) => (
                <Link
                  key={label.name}
                  href={`/mail/label/${label.name.toLowerCase()}`}
                  className="flex items-center justify-between px-3 py-2 text-sm rounded-full hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${label.color}`} />
                    {label.name}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {label.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-full bg-secondary/50 rounded-full h-2">
            <div className="bg-blue-500 h-full w-1/2 rounded-full" />
          </div>
          <span>255.13 MB / 500.00 MB</span>
        </div>
      </div>

      <FramerModal open={modalOpen} setOpen={setModalOpen}>
        <ModalContent>
          <ComposePage />
        </ModalContent>
      </FramerModal>
    </div>
  );
}

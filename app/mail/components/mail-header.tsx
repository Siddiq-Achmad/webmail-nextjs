"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Mail, Search, Settings, LayoutGrid } from "lucide-react";
import Link from "next/link";

export function MailHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background z-50 flex items-center px-4 gap-4">
      <div className="flex items-center gap-2">
        <Mail className="h-8 w-8 text-blue-500" />
        <span className="text-xl font-semibold">Mailbox</span>
      </div>
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search mail"
            className="w-full pl-10 bg-secondary/50"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Link href="/mail/settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon">
          <LayoutGrid className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <img src="https://github.com/shadcn.png" alt="User" />
        </Avatar>
      </div>
    </header>
  );
}

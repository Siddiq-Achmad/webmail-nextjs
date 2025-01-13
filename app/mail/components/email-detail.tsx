"use client";

import { Button } from "@/components/ui/button";
import {
  Archive,
  ChevronLeft,
  Forward,
  MoreHorizontal,
  Printer,
  Reply,
  Star,
  Trash2,
} from "lucide-react";
import { Email } from "@/types/email";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface EmailDetailProps {
  email: Email | null;
  onClose: () => void;
  onReply: (email: Email) => void;
  onForward: (email: Email) => void;
  onDelete: (email: Email) => void;
}

export function EmailDetail({
  email,
  onClose,
  onReply,
  onForward,
  onDelete,
}: EmailDetailProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-y-14 right-0 w-full max-w-3xl bg-background border-l transform transition-transform duration-200 ease-in-out z-30",
        email ? "translate-x-0" : "translate-x-full"
      )}
    >
      {email && (
        <>
          <div className="h-14 border-b flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold truncate">
                {email.subject}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Archive className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(email)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="h-[calc(100vh-7rem)] overflow-auto p-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`h-12 w-12 rounded-full ${email.avatarColor} flex items-center justify-center text-white font-medium text-lg`}
                >
                  {email.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-lg">{email.from}</div>
                      <div className="text-sm text-muted-foreground">to me</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {email.date}
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none mb-8">
                {email.content?.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => onReply(email)}
                >
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => onForward(email)}
                >
                  <Forward className="h-4 w-4" />
                  Forward
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

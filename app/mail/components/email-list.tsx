"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Star, StarOff } from "lucide-react";
import { Email } from "@/types/email";

interface EmailListProps {
  emails: (Email & { avatar: string; avatarColor: string })[];
  selectedEmails: number[];
  onEmailSelect: (emailId: number) => void;
  onEmailClick: (email: Email) => void;
  onToggleStar: (emailId: number) => void;
}

export function EmailList({
  emails,
  selectedEmails,
  onEmailSelect,
  onEmailClick,
  onToggleStar,
}: EmailListProps) {
  return (
    <div className="flex-1 overflow-auto">
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onEmailClick(email)}
          className={`flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-secondary/50 ${
            email.read ? "" : "font-medium bg-blue-50/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedEmails.includes(email.id)}
              onCheckedChange={() => onEmailSelect(email.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(email.id);
              }}
            >
              {email.starred ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div
            className={`h-8 w-8 rounded-full ${email.avatarColor} flex items-center justify-center text-white font-medium`}
          >
            {email.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {email.read ? (
                <span className="font-medium truncate">{email.from}</span>
              ) : (
                <span className="font-semibold truncate">{email.from}</span>
              )}

              <span className="text-sm text-muted-foreground">
                {email.date}
              </span>
            </div>
            {email.read ? (
              <div className="text-sm truncate">{email.subject}</div>
            ) : (
              <div className="text-sm font-semibold truncate">
                {email.subject}
              </div>
            )}

            <div className="text-sm text-muted-foreground truncate">
              {email.preview}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

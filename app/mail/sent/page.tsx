"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sentEmails = [
  {
    id: 1,
    to: "jane@example.com",
    subject: "Project Update",
    preview: "Here's the latest update on the project...",
    date: "10:30 AM",
    starred: false,
  },
  {
    id: 2,
    to: "team@company.com",
    subject: "Weekly Report",
    preview: "Please find attached the weekly report...",
    date: "Yesterday",
    starred: true,
  },
];

export default function SentPage() {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);

  const toggleEmailSelection = (emailId: number) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  return (
    <div className="h-full flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead className="w-12"></TableHead>
            <TableHead>To</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sentEmails.map((email) => (
            <TableRow
              key={email.id}
              className="cursor-pointer hover:bg-secondary/50"
            >
              <TableCell className="w-12">
                <Checkbox
                  checked={selectedEmails.includes(email.id)}
                  onCheckedChange={() => toggleEmailSelection(email.id)}
                />
              </TableCell>
              <TableCell className="w-12">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {email.starred ? (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              <TableCell>{email.to}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <span>{email.subject}</span>
                  <span className="text-muted-foreground">
                    - {email.preview}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {email.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

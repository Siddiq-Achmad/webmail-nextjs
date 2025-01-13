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
import {
  Star,
  StarOff,
  Reply,
  Forward,
  Trash2,
  Archive,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EmailDetail } from "../components/email-detail";
import { Email } from "@/types/email";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const emails: (Email & { avatar: string; avatarColor: string })[] = [
  {
    id: 1,
    from: "Alice Johnson",
    subject: "Team Collaboration Meeting Tomorrow!",
    preview:
      "Hi team, I hope this email finds you well. Our next collaboration meeting...",
    content: `Hi team,

I hope you're doing well. Our next collaboration meeting is scheduled for tomorrow at 2:30 PM. During this session, we'll be discussing the latest updates on upcoming projects and addressing any challenges that have arisen.

Your input and insights are crucial, so please come prepared with your updates and suggestions. If there are specific agenda items you'd like to cover, feel free to reply to this email with your suggestions.

Looking forward to a productive meeting!

Best regards,
Alice`,
    date: "10:30 AM",
    starred: false,
    read: false,
    avatar: "AJ",
    avatarColor: "bg-blue-500",
  },
  {
    id: 2,
    from: "Bob Smith",
    subject: "Project Deadline Reminder",
    preview: "Just a friendly reminder about the upcoming deadline...",
    content: `Hello everyone,

This is a friendly reminder that our project deadline is approaching next week.
Please make sure to complete your assigned tasks and update the project board.

Key points to remember:
- Code freeze by Thursday
- Testing phase starts Friday
- Final review meeting on Monday

Let me know if you need any clarification or support.

Thanks,
Bob`,
    date: "Yesterday",
    starred: true,
    read: true,
    avatar: "BS",
    avatarColor: "bg-green-500",
  },
  {
    id: 3,
    from: "Carol White",
    subject: "New Feature Implementation",
    preview: "Here's the documentation for the new feature we discussed...",
    content: `Hi team,

I've completed the documentation for the new feature we discussed in our last meeting. You can find all the technical specifications and implementation details attached.

Please review and let me know if any changes are needed.

Best,
Carol`,
    date: "2 days ago",
    starred: false,
    read: true,
    avatar: "CW",
    avatarColor: "bg-purple-500",
  },
  {
    id: 4,
    from: "Eve Green",
    subject: "Weekly Team Update",
    preview: "Here's a summary of what we accomplished this week...",
    content: `Hi team,

Here's a summary of what we accomplished this week:

- Implemented new feature X
- Fixed bug Y
- Collaborated with team member Z

Looking forward to the next week!

Best,
Eve`,
    date: "Last week",
    starred: true,
    read: false,
    avatar: "EG",
    avatarColor: "bg-pink-500",
  },
  {
    id: 5,
    from: "Frank Brown",
    subject: "Project Status Update",
    preview: "Please find attached the latest project status report...",
    content: `Hi team,

Please find attached the latest project status report for our upcoming project.

Best,
Frank`,
    date: "Last month",
    starred: false,
    read: true,
    avatar: "FB",
    avatarColor: "bg-yellow-500",
  },
];

export default function InboxPage() {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const toggleEmailSelection = (emailId: number) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b">
        <div className="flex items-center justify-between p-4">
          <Tabs defaultValue="primary" className="w-full">
            <TabsList>
              <TabsTrigger value="primary" className="gap-2">
                Primary
                <span className="text-xs bg-secondary rounded-full px-2">
                  78
                </span>
              </TabsTrigger>
              <TabsTrigger value="promotion" className="gap-2">
                Promotion
                <span className="text-xs bg-secondary rounded-full px-2">
                  109
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {selectedEmails.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-secondary/50">
            <Checkbox
              checked={selectedEmails.length === emails.length}
              onCheckedChange={(checked) => {
                setSelectedEmails(checked ? emails.map((e) => e.id) : []);
              }}
            />
            <Button variant="ghost" size="sm">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Reply className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Forward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex-1 overflow-auto transition-all duration-200",
          selectedEmail ? "mr-[calc(100vw-16rem)]" : ""
        )}
      >
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => setSelectedEmail(email)}
            className={`flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-secondary/50 ${
              email.read ? "" : "font-medium bg-blue-50/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedEmails.includes(email.id)}
                onCheckedChange={() => toggleEmailSelection(email.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <Button
                variant="ghost"
                size="sm"
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
            </div>
            <div
              className={`h-8 w-8 rounded-full ${email.avatarColor} flex items-center justify-center text-white font-medium`}
            >
              {email.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{email.from}</span>
                <span className="text-sm text-muted-foreground">
                  {email.date}
                </span>
              </div>
              <div className="text-sm truncate">{email.subject}</div>
              <div className="text-sm text-muted-foreground truncate">
                {email.preview}
              </div>
            </div>
          </div>
        ))}
      </div>

      <EmailDetail
        email={selectedEmail}
        onClose={() => setSelectedEmail(null)}
        onReply={(email) => console.log("Reply to:", email)}
        onForward={(email) => console.log("Forward:", email)}
        onDelete={(email) => {
          console.log("Delete:", email);
          setSelectedEmail(null);
        }}
      />
    </div>
  );
}

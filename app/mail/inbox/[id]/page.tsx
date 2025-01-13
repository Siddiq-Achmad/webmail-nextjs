// email detail by id
" use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Email } from "@/types/email";

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
import Link from "next/link";

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

export default async function EmailDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const email = emails.find((email) => email.id === Number(id));

  if (!email) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Email not found</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full mx-auto",
        email ? "translate-x-0" : "translate-x-full"
      )}
    >
      {email && (
        <>
          <div className="h-14 border-b flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Link
                href={`/mail/inbox`}
                className="text-gray-400 hover:text-gray-600"
              >
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h2 className="text-lg font-semibold truncate">
                {email.subject}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
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
                <Button variant="outline" className="gap-2">
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
                <Button variant="outline" className="gap-2">
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

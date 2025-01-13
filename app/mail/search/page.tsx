import Link from "next/link";
import { X } from "lucide-react";
import { highlightText } from "@/lib/utils";
import SearchComponent from "../components/search";
import { Suspense } from "react";

import { Email } from "@/types/email";

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
async function Emails({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  let q = (await searchParams).q;

  if (!q) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No emails found</p>
      </div>
    );
  }

  q = q.toLowerCase();
  const filteredEmails = emails.filter((email) => {
    return (
      email.from?.toLowerCase().includes(q) ||
      email.subject.toLowerCase().includes(q) ||
      email.preview.toLowerCase().includes(q) ||
      email.content?.toLowerCase().includes(q)
    );
  });

  if (filteredEmails.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No emails found</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto h-[calc(100vh-64px)]">
      {emails.map((thread) => {
        return (
          <Link key={thread.id} href={`/mail/inbox/${thread.id}`}>
            <div
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100`}
            >
              <div className="flex-grow flex items-center overflow-hidden">
                <div className="w-[200px] flex-shrink-0 mr-4">
                  <span className="font-medium truncate"></span>
                </div>
                <div className="flex-grow flex items-center overflow-hidden">
                  <span className="font-medium truncate min-w-[175px] max-w-[400px] mr-2">
                    {highlightText(thread.subject, q)}
                  </span>
                  <span className="text-gray-600 truncate"></span>
                </div>
              </div>
              <div className="flex items-center justify-end flex-shrink-0 w-40 ml-4">
                <span className="text-sm text-gray-500">
                  {new Date(thread.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  return (
    <div className="flex h-screen">
      <div className="flex-grow border-r border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 h-[70px]">
          <div className="flex items-center w-full">
            <Suspense>
              <SearchComponent />
            </Suspense>
          </div>
          <div className="flex items-center ml-4">
            <Link href="/" passHref>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </Link>
          </div>
        </div>
        <Suspense>
          <Emails searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

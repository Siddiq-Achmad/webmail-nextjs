"use client";

import { useEffect, useState } from "react";
import {
  mockInboxEmails,
  mockImportantEmails,
  mockArchiveEmails,
  mockDraftEmails,
  mockSentEmails,
  mockTrashEmails,
  mockSpamEmails,
} from "@/lib/data/mock-emails";
import { EmailList } from "../components/email-list";
import { Email } from "@/types/email";
import { EmailService } from "@/lib/services/email-service";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Archive, Forward, Reply, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmailDetail } from "../components/email-detail";

const allEmails = [
  ...mockInboxEmails,
  ...mockImportantEmails,
  ...mockArchiveEmails,
  ...mockDraftEmails,
  ...mockSentEmails,
  ...mockTrashEmails,
  ...mockSpamEmails,
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(allEmails);

  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmails = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await EmailService.getAllEmails();
        setEmails(data);
      } catch (error) {
        console.error("Failed to load emails:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, []);

  const toggleEmailSelection = (emailId: number) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredEmails = allEmails.filter(
      (email) =>
        email.subject.toLowerCase().includes(query) ||
        email.content?.toLowerCase().includes(query) ||
        email.preview?.toLowerCase().includes(query) ||
        ("from" in email && email.from?.toLowerCase().includes(query)) || // Periksa properti 'from'
        ("to" in email && email.to?.toLowerCase().includes(query))
    );

    setResults(filteredEmails);
  };

  const handleEmailClick = async (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      try {
        await EmailService.markAsRead(email.id);
        setResults(
          results.map((e) => (e.id === email.id ? { ...e, read: true } : e))
        );
      } catch (error) {
        console.error("Failed to mark email as read:", error);
      }
    }
  };
  const handleDelete = async (email: Email) => {
    try {
      await EmailService.deleteEmail(email.id);
      setEmails(emails.filter((e) => e.id !== email.id));
      setSelectedEmail(null);
    } catch (error) {
      console.error("Failed to delete email:", error);
    }
  };

  const handleToggleStar = async (emailId: number) => {
    try {
      const updatedEmail = await EmailService.toggleStar(emailId);
      if (updatedEmail) {
        setEmails(
          emails.map((e) =>
            e.id === emailId ? { ...e, starred: updatedEmail.starred } : e
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle star:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Emails</h1>
      <input
        type="text"
        placeholder="Search by subject or sender..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      {selectedEmails.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-secondary/50 border-b">
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
      {results.length > 0 ? (
        <div
          className={cn(
            "flex-1 overflow-auto transition-all duration-200",
            selectedEmail ? "mr-[calc(100vw-16rem)]" : ""
          )}
        >
          <EmailList
            emails={results}
            selectedEmails={selectedEmails}
            onEmailSelect={toggleEmailSelection}
            onEmailClick={handleEmailClick}
            onToggleStar={handleToggleStar}
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center p-6">No results found.</p>
      )}

      <EmailDetail
        email={selectedEmail}
        onClose={() => setSelectedEmail(null)}
        onReply={(email) => console.log("Reply to:", email)}
        onForward={(email) => console.log("Forward:", email)}
        onDelete={handleDelete}
      />
    </div>
  );
}

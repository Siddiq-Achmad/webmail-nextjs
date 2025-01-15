"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Archive,
  Reply,
  Forward,
  Trash2,
  Star,
  StarOff,
  Mail,
} from "lucide-react";
import { useState, useEffect } from "react";
import { EmailDetail } from "./email-detail";
import { EmailList } from "./email-list";
import { Email } from "@/types/email";
import { cn } from "@/lib/utils";
import { EmailService } from "@/lib/services/email-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmailPageProps {
  folder: string;
  showTabs?: boolean;
  tabs?: string;
}

export function EmailPage({
  folder,
  showTabs = false,
  tabs = "all",
}: EmailPageProps) {
  const [emails, setEmails] = useState<
    (Email & { avatar: string; avatarColor: string })[]
  >([]);
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmails = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await EmailService.getEmailsByFolder(folder as any);
        setEmails(data);
      } catch (error) {
        console.error("Failed to load emails:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, [folder, tabs]);

  const toggleEmailSelection = (emailId: number) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleEmailClick = async (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      try {
        await EmailService.markAsRead(email.id);
        setEmails(
          emails.map((e) => (e.id === email.id ? { ...e, read: true } : e))
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
    <div className="h-full flex flex-col">
      {showTabs ? (
        <div className="flex items-center justify-between">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="m-6">
              <TabsTrigger value="all" className="gap-2">
                <Mail className="h-4 w-4" />
                All Mails
                <span className="text-xs bg-secondary rounded-full px-2">
                  {emails.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="unread" className="gap-2">
                Unread
                <span className="text-xs bg-secondary rounded-full px-2">
                  {emails.filter((e) => e.read === false).length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="read" className="gap-2">
                Read
                <span className="text-xs bg-secondary rounded-full px-2">
                  {emails.filter((e) => e.read === true).length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="starred" className="gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Stared
                <span className="text-xs bg-secondary rounded-full px-2">
                  {emails.filter((e) => e.starred === true).length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="unstarred" className="gap-2">
                <StarOff className="h-4 w-4" />
                Unstared
                <span className="text-xs bg-secondary rounded-full px-2">
                  {emails.filter((e) => e.starred === false).length}
                </span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex-1 overflow-auto transition-all duration-200",
                    selectedEmail ? "mr-[calc(100vw-16rem)]" : ""
                  )}
                >
                  <EmailList
                    emails={emails}
                    selectedEmails={selectedEmails}
                    onEmailSelect={toggleEmailSelection}
                    onEmailClick={handleEmailClick}
                    onToggleStar={handleToggleStar}
                  />
                </div>

                <EmailDetail
                  email={selectedEmail}
                  onClose={() => setSelectedEmail(null)}
                  onReply={(email) => console.log("Reply to:", email)}
                  onForward={(email) => console.log("Forward:", email)}
                  onDelete={handleDelete}
                />
              </div>
            </TabsContent>
            <TabsContent value="unread">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex-1 overflow-auto transition-all duration-200",
                    selectedEmail ? "mr-[calc(100vw-16rem)]" : ""
                  )}
                >
                  <EmailList
                    emails={emails.filter((e) => e.read === false)}
                    selectedEmails={selectedEmails}
                    onEmailSelect={toggleEmailSelection}
                    onEmailClick={handleEmailClick}
                    onToggleStar={handleToggleStar}
                  />
                </div>

                <EmailDetail
                  email={selectedEmail}
                  onClose={() => setSelectedEmail(null)}
                  onReply={(email) => console.log("Reply to:", email)}
                  onForward={(email) => console.log("Forward:", email)}
                  onDelete={handleDelete}
                />
              </div>
            </TabsContent>
            <TabsContent value="read">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex-1 overflow-auto transition-all duration-200",
                    selectedEmail ? "mr-[calc(100vw-16rem)]" : ""
                  )}
                >
                  <EmailList
                    emails={emails.filter((e) => e.read === true)}
                    selectedEmails={selectedEmails}
                    onEmailSelect={toggleEmailSelection}
                    onEmailClick={handleEmailClick}
                    onToggleStar={handleToggleStar}
                  />
                </div>

                <EmailDetail
                  email={selectedEmail}
                  onClose={() => setSelectedEmail(null)}
                  onReply={(email) => console.log("Reply to:", email)}
                  onForward={(email) => console.log("Forward:", email)}
                  onDelete={handleDelete}
                />
              </div>
            </TabsContent>
            <TabsContent value="starred">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex-1 overflow-auto transition-all duration-200",
                    selectedEmail ? "mr-[calc(100vw-16rem)]" : ""
                  )}
                >
                  <EmailList
                    emails={emails.filter((e) => e.starred === true)}
                    selectedEmails={selectedEmails}
                    onEmailSelect={toggleEmailSelection}
                    onEmailClick={handleEmailClick}
                    onToggleStar={handleToggleStar}
                  />
                </div>

                <EmailDetail
                  email={selectedEmail}
                  onClose={() => setSelectedEmail(null)}
                  onReply={(email) => console.log("Reply to:", email)}
                  onForward={(email) => console.log("Forward:", email)}
                  onDelete={handleDelete}
                />
              </div>
            </TabsContent>
            <TabsContent value="unstarred">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex-1 overflow-auto transition-all duration-200",
                    selectedEmail ? "mr-[calc(100vw-16rem)]" : ""
                  )}
                >
                  <EmailList
                    emails={emails.filter((e) => e.starred === false)}
                    selectedEmails={selectedEmails}
                    onEmailSelect={toggleEmailSelection}
                    onEmailClick={handleEmailClick}
                    onToggleStar={handleToggleStar}
                  />
                </div>

                <EmailDetail
                  email={selectedEmail}
                  onClose={() => setSelectedEmail(null)}
                  onReply={(email) => console.log("Reply to:", email)}
                  onForward={(email) => console.log("Forward:", email)}
                  onDelete={handleDelete}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex-1 overflow-auto transition-all duration-200",
              selectedEmail ? "mr-[calc(100vw-16rem)]" : ""
            )}
          >
            <EmailList
              emails={emails}
              selectedEmails={selectedEmails}
              onEmailSelect={toggleEmailSelection}
              onEmailClick={handleEmailClick}
              onToggleStar={handleToggleStar}
            />
          </div>

          <EmailDetail
            email={selectedEmail}
            onClose={() => setSelectedEmail(null)}
            onReply={(email) => console.log("Reply to:", email)}
            onForward={(email) => console.log("Forward:", email)}
            onDelete={handleDelete}
          />
        </div>
      )}
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
    </div>
  );
}

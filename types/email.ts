export interface Email {
  id: number;
  from?: string;
  to?: string;
  subject: string;
  preview: string;
  content?: string;
  date: string;
  starred: boolean;
  read: boolean;
  attachments?: string[];
  avatar?: string;
  avatarColor?: string;
}
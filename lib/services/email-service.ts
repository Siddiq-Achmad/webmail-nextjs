
import {
  mockInboxEmails,
  mockArchiveEmails,
  mockSentEmails,
  mockDraftEmails,
  mockTrashEmails,
  mockSpamEmails,
  mockImportantEmails,
} from "../data/mock-emails";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Map folder names to their respective email arrays
export const folderMap = {
  inbox: mockInboxEmails,
  important: mockImportantEmails,
  archive: mockArchiveEmails,
  sent: mockSentEmails,
  drafts: mockDraftEmails,
  trash: mockTrashEmails,
  spam: mockSpamEmails,
  all: [...mockInboxEmails, ...mockSentEmails, ...mockDraftEmails],
};


export const EmailService = {
  getAllEmails: async () => {
    await delay(500);
    return folderMap.all;
  },
  getFolder : async (folder: keyof typeof folderMap) => {
    await delay(500);
    return folderMap[folder] || [];
  },


  getEmailsByQuery: async (query: string) => {
    await delay(500);
    return folderMap.all.filter(email => email.subject.includes(query));
  },

  getEmailsByFolder: async (folder: keyof typeof folderMap) => {
    await delay(500);
    return folderMap[folder] || [];
  },

  getEmailById: async (id: number) => {
    await delay(300);
    return Object.values(folderMap)
      .flat()
      .find(email => email.id === id);
  },

  markAsRead: async (id: number) => {
    await delay(200);
    const email = Object.values(folderMap)
      .flat()
      .find(email => email.id === id);
    if (email) {
      email.read = true;
    }
    return email;
  },

  toggleStar: async (id: number) => {
    await delay(200);
    const email = Object.values(folderMap)
      .flat()
      .find(email => email.id === id);
    if (email) {
      email.starred = !email.starred;
    }
    return email;
  },

  deleteEmail: async (id: number) => {
    await delay(300);
    Object.values(folderMap).forEach(folder => {
      const index = folder.findIndex(email => email.id === id);
      if (index !== -1) {
        folder.splice(index, 1);
      }
    });
    return true;
  },
};
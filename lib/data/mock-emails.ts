

// Helper function to generate avatar initials from email
function getInitials(email: string): string {
  return email
    .split('@')[0]
    .split('.')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

// Helper function to generate random avatar colors
function getRandomColor(): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-violet-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export const mockInboxEmails = [
  {
    id: 1,
    from: "team@company.com",
    subject: "Weekly Team Update",
    preview: "Here's a summary of what we accomplished this week...",
    content: `Hi team,

Here's a summary of what we accomplished this week:

- Launched new feature X
- Fixed critical bug in module Y
- Improved performance by 25%

Please review and let me know if you have any questions.

Best regards,
Team Lead`,
    date: "10:30 AM",
    starred: true,
    read: false,
    avatar: getInitials("team@company.com"),
    avatarColor: getRandomColor(),
  },
  {
    id: 2,
    from: "alice.smith@example.com",
    subject: "Project Proposal Review",
    preview: "I've reviewed the proposal and have some feedback...",
    content: `Hi,

I've reviewed the project proposal and have the following feedback:

1. Great overall structure
2. Need more detail in section 3
3. Budget looks good

Let's discuss in our next meeting.

Best,
Alice`,
    date: "Yesterday",
    starred: false,
    read: true,
    avatar: getInitials("alice.smith@example.com"),
    avatarColor: getRandomColor(),
  },
  {
    id: 3,
    from: "notifications@github.com",
    subject: "Pull Request #123 Merged",
    preview: "The pull request has been successfully merged...",
    content: `Pull request #123 was successfully merged into main.

Changes included:
- Feature implementation
- Bug fixes
- Documentation updates

View the changes on GitHub.`,
    date: "2 days ago",
    starred: true,
    read: true,
    avatar: getInitials("notifications@github.com"),
    avatarColor: getRandomColor(),
  },
  {
    id: 4,
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
    avatarColor: getRandomColor(),
  },
  {
    id: 5,
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
    avatarColor: getRandomColor(),
  },
  {
    id: 6,
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
    avatarColor: getRandomColor(),
  },
  {
    id: 7,
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
    id: 8,
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
    avatarColor: getRandomColor(),
  },
  {
    id: 9,
    from: "Alice Johnson",
    subject: "Team Collaboration Meeting Tomorrow!",
    preview:
      "Hi team, I hope this email finds you well. Our next collaboration meeting...",
    content: `Hi team,
    I hope this email finds you well. Our next collaboration meeting is scheduled for tomorrow at 2 PM
    During this session, we'll be discussing the latest updates on upcoming projects and addressing any challenges that have arisen.
    Looking forward to seeing you all there!
    Best regards,
    Alice`,
    date: "10:30 AM",
    starred: false,
    read: false,
    avatar: "AJ",
    avatarColor: getRandomColor(),
  },
];

// Mock data for different folders

export const mockArchiveEmails = [
  {
    id: 201,
    to: "client@example.com",
    subject: "Project Proposal",
    preview: "Thank you for the opportunity to present our proposal...",
    content: `Dear Client,\n\nThank you for the opportunity...\n\nBest regards,\nMe`,
    date: "2 hours ago",
    starred: false,
    read: true,
    avatar: getInitials("client@example.com"),
    avatarColor: getRandomColor(),
  },
  {
    id: 202,
    to: "team@company.com",
    subject: "Meeting Minutes",
    preview: "Here are the minutes from today's meeting...",
    content: `Team,\n\nHere are the key points from today's meeting...\n\nRegards`,
    date: "Yesterday",
    starred: true,
    read: true,
    avatar: getInitials("team@company.com"),
    avatarColor: getRandomColor(),
  },
  {
    id: 203,
    to: "alice.smith@example.com",
    subject: "Project Proposal Review",
    preview: "I've reviewed the proposal and have some feedback...",
    content: `Hi Alice,\n\nI've reviewed the proposal and have some feedback...\n\nBest regards,\nBob`,
    date: "Last week",
    starred: true,
    read: false,
    avatar: getInitials("alice.smith@example.com"),
    avatarColor: getRandomColor(),
  },
]
export const mockSentEmails = [
  {
    id: 101,
    to: "client@example.com",
    subject: "Project Proposal",
    preview: "Thank you for the opportunity to present our proposal...",
    content: `Dear Client,\n\nThank you for the opportunity...\n\nBest regards,\nMe`,
    date: "2 hours ago",
    starred: false,
    read: true,
    avatar: getInitials("client@example.com"),
    avatarColor: getRandomColor(),
  },
  {
    id: 102,
    to: "team@company.com",
    subject: "Meeting Minutes",
    preview: "Here are the minutes from today's meeting...",
    content: `Team,\n\nHere are the key points from today's meeting...\n\nRegards`,
    date: "Yesterday",
    starred: true,
    read: true,
    avatar: getInitials("team@company.com"),
    avatarColor: getRandomColor(),
  },
];

export const mockDraftEmails = [
  {
    id: 201,
    to: "partner@business.com",
    subject: "Partnership Opportunity (Draft)",
    preview: "I hope this email finds you well. I wanted to discuss...",
    content: `Dear [Partner],\n\nI hope this email finds you well...\n\nBest regards`,
    date: "1 hour ago",
    starred: false,
    read: true,
    avatar: getInitials("partner@business.com"),
    avatarColor: getRandomColor(),
  },
];

export const mockTrashEmails = [
  {
    id: 301,
    from: "spam@example.com",
    subject: "Special Offer",
    preview: "Limited time offer...",
    content: `Don't miss out on this amazing deal...`,
    date: "3 days ago",
    starred: false,
    read: true,
    avatar: getInitials("spam@example.com"),
    avatarColor: getRandomColor(),
  },
];

export const mockSpamEmails = [
  {
    id: 501,
    from: "aku@example.com",
    subject: "Company Strategy Update",
    preview: "Important updates regarding our Q2 strategy...",
    content: `Team,\n\nI wanted to share some important updates about our direction...\n\nBest regards,\nCEO`,
    date: "1 day ago",
    starred: true,
    read: false,
    avatar: getInitials("aku@example.com"),
    avatarColor: getRandomColor(),
  },
  {
    id: 502,
    from: "dia@example.com",
    subject: "Company Strategy Update",
    preview: "Important updates regarding our Q2 strategy...",
    content: `Team,\n\nI wanted to share some important updates about our direction...\n\nBest regards,\nCEO`,
    date: "1 day ago",
    starred: true,
    read: false,
    avatar: getInitials("dia@example.com"),
    avatarColor: getRandomColor(),
  },
];

export const mockImportantEmails = [
  {
    id: 401,
    from: "ceo@company.com",
    subject: "Company Strategy Update",
    preview: "Important updates regarding our Q2 strategy...",
    content: `Team,\n\nI wanted to share some important updates about our direction...\n\nBest regards,\nCEO`,
    date: "1 day ago",
    starred: true,
    read: false,
    avatar: getInitials("ceo@company.com"),
    avatarColor: getRandomColor(),
  },
];

// Teacher communication types

export interface TeacherCommunication {
  id: string;
  date: string;
  subject: string;
  content: string;
  sender: string;
  attachments: string[];
  read: boolean;
}

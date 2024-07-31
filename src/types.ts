export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  deadline?: string;
  createdAt: string; // Add this field
}

export interface User {
    id: string;
    email: string;
    name: string;
  }
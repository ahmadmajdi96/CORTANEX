// src/app/models/task.model.ts
export interface Task {
  id: string;
  title: string;
  customer: string;
  status: 'pending' | 'in-progress' | 'done' | 'failed' | 'testing';
}
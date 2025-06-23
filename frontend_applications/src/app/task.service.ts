import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://0.0.0.0:3005/tasks'; // Your mock backend URL

  constructor(private http: HttpClient) {}

  /**
   * Fetch all tasks from the API
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Update a task's status on the server
   */
  updateTaskStatus(taskId: string, status: Task['status']): Observable<Task> {
    const url = `${this.apiUrl}/${taskId}/status`;
    return this.http.post<Task>(url, { status });
  }
}
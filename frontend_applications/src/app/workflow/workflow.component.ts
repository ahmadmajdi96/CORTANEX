import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { WebsocketService } from '../websocket.service'; // <-- Add this
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  workflowSteps = [
    { name: 'Order Confirmation', tasks: [] as Task[] },
    { name: '3D Finishing', tasks: [] as Task[] },
    { name: '3D Printing', tasks: [] as Task[] },
    { name: 'PTSS', tasks: [] as Task[] },
    { name: 'Indexing', tasks: [] as Task[] },
    { name: 'Thermoforming', tasks: [] as Task[] },
    { name: 'Laser Marking', tasks: [] as Task[] }



  ];

  constructor(
    private taskService: TaskService,
    private wsService: WebsocketService // ✅ Injected here
  ) {}

  ngOnInit(): void {
    this.loadInitialTasks();
    this.listenForUpdates(); // ✅ Start listening
  }

  loadInitialTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.updateWorkflowColumns(tasks);
    });
  }

  listenForUpdates(): void {
    this.wsService.onTaskUpdate().subscribe({
      next: (updatedTask: Task) => {
        console.log('Received updated task:', updatedTask);
        this.handleTaskUpdate(updatedTask);
      },
      error: (err) => {
        console.error('WebSocket error:', err);
      }
    });
  }

  handleTaskUpdate(updatedTask: Task): void {
    // Remove from old column
    this.workflowSteps.forEach(step => {
      step.tasks = step.tasks.filter(task => task.id !== updatedTask.id);
    });

    // Add to new column
    this.addToColumn(updatedTask);

    // Trigger change detection
    this.workflowSteps = [...this.workflowSteps];
  }

  updateWorkflowColumns(tasks: Task[]): void {
    this.workflowSteps.forEach(step => step.tasks = []);
    tasks.forEach(task => this.addToColumn(task));
  }

  addToColumn(task: Task): void {
    const stepIndex = this.getStatusStepIndex(task.status);
    if (stepIndex >= 0 && stepIndex < this.workflowSteps.length) {
      this.workflowSteps[stepIndex].tasks = [
        ...this.workflowSteps[stepIndex].tasks,
        task
      ];
    }
  }

  getStatusStepIndex(status: Task['status']): number {
    switch (status) {
      case 'pending': return 0;
      case 'in-progress': return 1;
      case 'testing': return 2;
      case 'done': return 3;
      default: return -1;
    }
  }
}
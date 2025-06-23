// src/app/task-card/task-card.component.ts
import { Component, Input } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task; // This will be fixed next
}
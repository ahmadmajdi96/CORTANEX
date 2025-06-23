import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WorkflowComponent } from './workflow/workflow.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [    
    HttpClientModule,
    WorkflowComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {}
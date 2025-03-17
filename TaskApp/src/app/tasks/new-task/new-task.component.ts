import { Component, ElementRef, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';

//render form and collect the user info
@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  constructor(@Inject(TasksServiceToken) private taskService: TaskService){ }  //inject TaskService  //injecting custom token

  onAddTask(title: string, description: string) {
    this.taskService.addTask({title: title, description: description});
    this.formEl()?.nativeElement.reset();
  }
}

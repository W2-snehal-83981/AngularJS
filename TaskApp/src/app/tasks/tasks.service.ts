import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";
import { Title } from "@angular/platform-browser";

@Injectable({
    providedIn:'root',
})
export class TaskService {
    private loggingService = inject(LoggingService); //injecting service into another service
    private tasks = signal<Task[]>([]);
    allTasks = this.tasks.asReadonly();

    addTask(taskData: {title:string; description: string}) {  //adding new task
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        };
        this.tasks.update((oldTask)=>[...oldTask,newTask]);
        this.loggingService.log('Added task with title ' +taskData.title)
    }

    updateTaskStatus(taskId:string, newStatus:TaskStatus){  //update the task
       this.tasks.update((oldTasks)=>
           oldTasks.map((task)=>
              task.id === taskId ? {...task, status:newStatus} : task
            )
        );  
        this.loggingService.log('change task status to ' +newStatus);
    }
}
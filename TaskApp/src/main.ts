import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TaskService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

export const TasksServiceToken = new InjectionToken<TaskService>('tasks-service-token');

bootstrapApplication(AppComponent,{
    providers: [{provide: TasksServiceToken, useClass:TaskService}],
}).catch((err) => console.error(err));

//if we not provide @Injectable alternative way to do it
// bootstrapApplication(AppComponent,{      
//     providers: [TaskService]
// }).catch((err) => console.error(err));

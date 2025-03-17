import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes} from './users/users.routes'

export const routes:  Routes = [
    {
        path: '',
        component: NoTaskComponent,
    //    redirectTo: '/users/u1',
    //    pathMatch: 'full'
        title: 'No task selected'
    },
    {
        path: 'users/:userId',  //<your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes,
        data: {   //for providing static data
            message: 'Hello'
        },
        resolve: { //for route related dynamic data
            userName: resolveUserName
        },
        title:resolveTitle  //for title shows in statusbar
    },
    {
        path: '**',
        component: NotFoundComponent
    }
    
]
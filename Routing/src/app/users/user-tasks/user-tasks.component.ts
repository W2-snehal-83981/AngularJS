import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userName= input.required<string>();
  message = input.required<string>();

  //userId = input.required<string>();
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute); //tells info that hold info about route
  // private destroyRef = inject(DestroyRef);
  
  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);  //extract name from dummyUsers

//   ngOnInit(): void {
//     console.log('Input Data: ' +this.message());
//     console.log(this.activatedRoute);
//     //console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
//     const subscription =this.activatedRoute.paramMap.subscribe({
//       next: (paramMap) => {
//         this.userName = 
//         this.usersService.users.find(
//           (u) => u.id === paramMap.get('userId')
//         )?.name || '';
//       },  
//     });
//     this.destroyRef.onDestroy(() =>subscription.unsubscribe());
//   }
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot ) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(
    (u) => u.id === activatedRoute.paramMap.get('userId')
  )?.name || '';
  return userName;
};

export const resolveTitle : ResolveFn<string> = (
   activatedRoute, routerState) => {
    return resolveUserName(activatedRoute, routerState) + '\'s Tasks'
  }

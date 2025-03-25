import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  user: any; //to hold user data

  constructor(private router: Router, private userService: UserService){}

  ngOnInit(): void {
    // const user = localStorage.getItem('user');
    // const role = localStorage.getItem('role');
    
    // console.log('user: ',user);
    // console.log('role: ',role);
    // if(!user || role! =='user'){
    //   this.router.navigate(['/login']);
    // }
    // else{
    //   this.user = JSON.parse(user); //parse user from localstorage
    // }
    this.user = this.userService.getUser();
    if(!this.user.id){
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


}

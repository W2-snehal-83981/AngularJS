import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  user: any; //to hold user data

  constructor(private router: Router){}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    console.log('user: ',user);
    console.log('role: ',role);

    // if(!user || role! =='user'){
    //   this.router.navigate(['/login']);
    // }
    // else{
    //   this.user = JSON.parse(user); //parse user from localstorage
    // }
  }

}

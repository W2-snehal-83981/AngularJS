import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-users',
  imports: [CommonModule],
  providers:[DatePipe],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit{
  users: any[] = [];

  constructor(private userService: UserService, private router: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  editUser(id: number): void {
    this.router.navigate(['dashboard/edit-user/', id]);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      //this.users = this.users.filter(user => user.id !== id);
       this.loadUsers(); // Reload users after deletion
      //this.router.navigate(['dashboard/view-users']);
    });
  }
}

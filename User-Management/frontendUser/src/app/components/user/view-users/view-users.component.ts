import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-users',
  imports: [CommonModule,ReactiveFormsModule],
  providers:[DatePipe],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit{
  users: any[] = [];
  selectedRole : string = '';
  userForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private datePipe: DatePipe) {
    this.userForm = new FormGroup({
      role: new FormControl('')
    });
  }
   
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUserByRole(this.selectedRole).subscribe((data) => {
      this.users = data;
    });

    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onRoleChange(): void {
    this.selectedRole = this.userForm.get('role')?.value;
    this.loadUsers(); // Reload users when role is changed
  }

  editUser(id: number): void {
    this.router.navigate(['dashboard/edit-user/', id]);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      //this.users = this.users.filter(user => user.id !== id);
       this.loadUsers(); // Reload users after deletion
    });
  }
}

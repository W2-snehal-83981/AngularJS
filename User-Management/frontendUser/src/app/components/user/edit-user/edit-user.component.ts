import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  user: any; //to hold user data
  isLoading = false;
  errorMessage = '';
  // userId: number | any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.createForm(); // Create the form
    this.loadUserData(userId); // Load the user data
  }

  // Create the form with controls and validators
  createForm(): void {
    this.editUserForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      password: [{ value: '', disabled: true }],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Only numbers allowed
      country: ['', [Validators.required]],
      role: [{ value: '', disabled: true }],
    });
  }

  // Load user data from the server
  loadUserData(userId: number): void {
    this.isLoading = true;
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        this.user = response;
        this.editUserForm.patchValue({
          name: response.name,
          age: response.age,
          email: response.email,
          password:response.password,
          phone: response.phone,
          country: response.country,
          role: response.role,
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading user data';
        this.isLoading = false;
      },
    });
  }

  // Update the user with the form values
  onSubmit(): void {
    if (this.editUserForm.invalid) {
      return;
    }

    const updatedUser = {
      age: this.editUserForm.value.age,
      email: this.editUserForm.value.email,
      phone: this.editUserForm.value.phone,
      country: this.editUserForm.value.country,
    };

    this.isLoading = true;
    this.userService.updateUser(this.user.id, updatedUser).subscribe({
      next: (response) => {
        console.log('User updated successfully', response);
        this.router.navigate(['/dashboard/view-users']); // Redirect after update
      },
      error: (error) => {
        this.errorMessage = 'Error updating user';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/view-users'], { relativeTo: this.route });
  }

  // Getters for form controls for easy access in the template
  get age() {
    return this.editUserForm.get('age');
  }

  get email() {
    return this.editUserForm.get('email');
  }

  get phone() {
    return this.editUserForm.get('phone');
  }

  get country() {
    return this.editUserForm.get('country');
  }
}

//   user : any= { id: null, name: '', email: '', age: null, address: '', phone: '' };

//   constructor(
//     private userService: UserService,
//     private activatedRoute: ActivatedRoute,
//     private router: Router
//   ) {}
//     // userId: number | undefined;

//   ngOnInit(): void {
//     const id = this.activatedRoute.snapshot.paramMap.get('id');
//     this.loadUser(id);
//   }

//   loadUser(id: string | null): void {
//     this.userService.getAllUsers().subscribe((users) => {
//       this.user = users.find((user:any) => user.id == id);
//     });
//   }

//   updateUser(): void {
//     this.userService.updateUser(this.user.id,this.user).subscribe(() => {
//       this.router.navigate(['/dashboard/view-users']);
//     });
//   }
// }

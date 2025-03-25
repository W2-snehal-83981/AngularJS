import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  // user = { name: '', email: '', age: null, address: '', phone: '' };

  // constructor(private userService: UserService, private router: Router) {}

  // addUser(): void {
  //   this.userService.addUser(this.user).subscribe(() => {
  //     this.router.navigate(['/view-users']);
  //   });
  // }
  userForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  errorMessage = '';
  roles = ['admin', 'user'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10,15}$")]],
      country: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  get formControls() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.formControls).forEach(field => {
        const control = this.userForm.get(field);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    
    this.userService.addUser(this.userForm.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.userForm.reset();
        setTimeout(() => {
          this.submitSuccess = false;
        }, 3000);
        this.router.navigate(['/dashboard/view-users'])
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'An error occurred while adding the user. Please try again.';
      }
    });
  }

  resetForm(): void {
    this.userForm.reset();
    this.userForm.patchValue({
      role: 'User'
    });
    this.errorMessage = '';
  }
}

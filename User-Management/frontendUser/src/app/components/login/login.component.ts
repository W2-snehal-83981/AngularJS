import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;                         //using the '!' we assured the form is not empty.
  isLoading = false;                              
  errorMessage = '';

  
  
  constructor(
    private formBuilder: FormBuilder,             
    private userService: UserService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],             //validation regarding feild.
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const { email, password } = this.loginForm.value;
    
    this.userService.login(email, password).subscribe({
      next: (response) => {
      console.log('Login successful', response);
      localStorage.setItem('user', JSON.stringify(response.userData)); //after login user store in localstorage
      localStorage.setItem('role', response.role);  //after login role store in localstorage
      if(response.role === 'admin'){
        this.router.navigate(['/dashboard']);
      }
      else{
        this.router.navigateByUrl('/user-dashboard');
      }
      },
      error: (error) => {
      console.error('Login failed', error);
      this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
      this.isLoading = false;
      },
      complete: () => {
      this.isLoading = false;
      }
    });
  }
}

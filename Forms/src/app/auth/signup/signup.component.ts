import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function equalValues(controlName1:string, controlName2: string){
  return (control: AbstractControl) =>{  //for checking passwords are equal or not
    const val1 = control.get(controlName1)?.value;  //get for finding password property
    const val2 = control.get(controlName2)?.value;
  
    if(val1 === val2){
      return null;
    }
    return {valuesNotEqual: true};
  }
}
  

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('',{
      validators: [Validators.email, Validators.required]
    }),

    passwords: new FormGroup({
      password: new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)],
      }),
    }, {
      validators: [equalValues('password','confirmPassword')],
    }),
    
    firstName: new FormControl('',{validators: [Validators.required]}),
    lastName: new FormControl('',{validators: [Validators.required]}),

    //for address field
    address: new FormControl({
    street: new FormControl('',{validators: [Validators.required]}),
    number: new FormControl('',{validators: [Validators.required]}),
    postalCode: new FormControl('',{validators: [Validators.required]}),
    city: new FormControl('',{validators: [Validators.required]}),
    }),

    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student',{validators: [Validators.required]}),
    //for option selected
    source: new FormArray([
      new FormControl(false), //initially false means not selected
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {validators: [Validators.required]}),
  });

  onSubmit(){
    if(this.form.invalid){
      console.log('Invalid Form');
      return;
    }
    console.log(this.form);
  }

  onReset(){
    this.form.reset();
  }
}

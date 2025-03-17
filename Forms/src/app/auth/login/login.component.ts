import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return {doesNotContainQuestionMark: true};
}

function emailIsUnique(control: AbstractControl){
  if(control.value !== 'test@example.com'){
    return of(null);
  }
  return of({noUnique: true})
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if(savedForm){
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}


//Reactive Forms
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('',{
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    })
  });

  get emailIsInavalid(){
     return(
      this.form.controls.email.touched && 
      this.form.controls.email.dirty && 
      this.form.controls.email.invalid
     );
  }

  get passwordIsInavalid(){
    return(
     this.form.controls.password.touched && 
     this.form.controls.password.dirty && 
     this.form.controls.password.invalid
    );
 }

  ngOnInit(){
    // const savedForm = window.localStorage.getItem('saved-login-form');
    // if(savedForm){
    //   const loadedForm = JSON.parse(savedForm);
    //   this.form.patchValue({
    //     email: loadedForm.email,
    //   });
    // }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));
      }
    });
    this.destroyRef.onDestroy(()=> subscription.unsubscribe());
  }

  onSubmit(){
   // this.form.controls.email.addValidators; //another way to add validators
   console.log(this.form);
   const enteredEmail = this.form.value.email;
   const enteredPassword = this.form.value.password;

   console.log(enteredEmail,enteredPassword);
  }
}





// import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounceTime } from 'rxjs';
// //template driven
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef);

//   constructor(){
//     //executed once after the component executed first time 
//     afterNextRender(()=>{
//       const savedForm = window.localStorage.getItem('saved-login-form');

//       if(savedForm){
//         const loadedFormData = JSON.parse(savedForm);
//         const savedEmail = loadedFormData.email;
//         setTimeout(() => {
//           this.form().controls['email'].setValue(savedEmail);
//         },1);
//       }

//       const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
//         next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email})) , //update the every letter we type on localstorage
//       });
//       this.destroyRef.onDestroy(() => subscription?.unsubscribe());
//     });
//   }

//   onSubmit(formData : NgForm){
//     if(formData.form.invalid){
//       return
//     }
//     // console.log(formData.form);
//     const enteredEmail = formData.form.value.email;
//     const enteredPassword = formData.form.value.password;
//     console.log(enteredEmail,enteredPassword);
//     formData.form.reset();
//   }
// }

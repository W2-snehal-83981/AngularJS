import { Directive, input,inject, effect, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'});
  private authService = inject(AuthService); //to find out which type of user logged in
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef); //place in the dom where the template is being used

  constructor() {
    effect(()=>{
      if(this.authService.activePermission() === this.userType()){
        this.viewContainerRef.createEmbeddedView(this.templateRef); //to render new content into a certain place in dom
       // console.log('Show Element');
      } else{
        this.viewContainerRef.clear();
        //console.log('Do Not Show Element');
      }
    });
   }

}

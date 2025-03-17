import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)' : 'onLog()'
  }
})
export class LogDirective {
  private elementRef = inject(ElementRef); //injecting host reference
  constructor() { }

  onLog(){
    console.log('CLICKED');
    console.log(this.elementRef);
  }

}

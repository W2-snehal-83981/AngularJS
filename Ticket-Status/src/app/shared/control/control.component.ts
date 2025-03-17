import { AfterContentInit, afterNextRender, afterRender, Component,contentChild,ElementRef,inject,input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  }
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';
   label = input.required<string>();
   private el = inject(ElementRef);

   private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

   constructor(){
    afterRender(()=>{   //exexute if anything changes in website
      console.log('afterRender')
    });
    afterNextRender(()=>{
      console.log('afterNextRender')
    });
   }

   ngAfterContentInit(){
    console.log(' ngAfterContentInit');
    }

   onClick(){
    console.log('Clicked!');
    console.log(this.el);
   }
}

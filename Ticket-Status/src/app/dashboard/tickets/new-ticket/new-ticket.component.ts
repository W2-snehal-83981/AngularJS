import { AfterViewInit, Component, ElementRef, OnInit, output, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

//for entering newly generated ticket data
@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent,FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit,OnInit{
  // onSubmit(titleElement: HTMLInputElement){
  //   const enetredTitle = titleElement.value;
  //   console.log('Entered Title: ' +enetredTitle);
  // }
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  //private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  enteredTitle ='';
  enteredText = '';
  add = output<{title: string; text:string}>();

  onSubmit(){
    this.add.emit({title:this.enteredTitle , text:this.enteredText});
   // this.form?.nativeElement.reset(); //nativeElement - ElementRef wrapper object
   //this.form?.nativeElement.reset();
   this.enteredTitle = '';  //for reset the form
   this.enteredText = '';
  }

  ngOnInit(){
    console.log('OnInit');
    console.log(this.form?.nativeElement)
  }

  ngAfterViewInit(){
    console.log('After New Init');
    console.log(this.form?.nativeElement)
  }
}

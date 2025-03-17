import { Component, Input, input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

//hold the content for an individual ticket
@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
   data = input.required<Ticket>(); //transform - used to change the type of the input value
   close = output();
   detailsVisible = signal(false);

   onToggleDetails(){
   // this.detailsVisible.set(!this.detailsVisible()); //toggle the choice of default
    this.detailsVisible.update((wasVisible)=> !wasVisible); //alternative way to toggle
   }

   onMarkAsCompleted(){  //for ticket completion status
    this.close.emit();
   }
}

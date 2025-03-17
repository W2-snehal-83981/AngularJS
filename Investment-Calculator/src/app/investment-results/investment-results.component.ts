import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input, Input } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: false,
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  results = this.investmentService.resultData.asReadonly();

  // @Input() results?: {
  //       year: number,
  //       interest: number,
  //       valueEndOfYear: number,
  //       annualInvestment: number,
  //       totalInterest: number,
  //       totalAmountInvested: number,
  // }[];

//   results =input< {
//     year: number,
//     interest: number,
//     valueEndOfYear: number,
//     annualInvestment: number,
//     totalInterest: number,
//     totalAmountInvested: number,
// }[]>();
}

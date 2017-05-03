import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { AppState, getAdmin, getPatientsData, getPaymentsMonthData, getPatientsCostMonth } from 'app/reducers';

import { PaymentModel } from 'app/model/payment.model';
import { filter } from 'app/utils/filter';

@Component({
  selector: 'appointment-payments-container',
  template: `
    <h2 class="clearfix">
      <small class="pull-left">
        <i class="fa fa-money fa-lg"></i>
        Payments
      </small>

      <span *ngIf="IS_ADMIN" class="pull-right l">
        <small title="TOTAL PAYMENTS" class="b"> {{ paid | currency:'NGN':true}} </small>
        <small title="TOTAL COST" class="r"> {{ total | currency:'NGN':true}} </small>
      </span>
    </h2>

    <div *ngIf="!fetched" class="text-center">
      <br /><br />
      <progress-bar></progress-bar>
      <br />
    </div>

    <appointment-payments [payments]="payments$ | async"></appointment-payments>
  `,
  styles: [`
    :host { display: block; }
    .l { display: inline-block }
    .l small { color: white; padding: .5rem 1rem; }
    .l .b { background: #03A9F4; }
    .l .r { background: #9E9E9E; }
  `]
})
export class AppointmentsPaymentsContainer {
  payments$: Observable<PaymentModel[]>;
  fetched: boolean = false;
  paid: number = 0;
  total: number = 0;
  IS_ADMIN: boolean;
  Sub: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    ){

    this.Sub = store.let(getAdmin()).subscribe(state => this.IS_ADMIN = !!state)
  }

  ngOnInit(){
    this.payments$ = this.route.parent.params
      .map(params => [params['month'], params['year']])
      .switchMap(([month, year]) => {
        const cost$: Observable<number> = this.store.let(getPatientsCostMonth(month, year));
        const payments$: Observable<PaymentModel[]> = this.store.let(getPaymentsMonthData(month, year));

        return Observable.combineLatest(cost$, payments$);
      })
      .do(([cost, ]) => this.total = cost)
      .map(([, payments]) => payments)
      .distinctUntilChanged()
      .do(payments => {
        this.fetched = true;
        this.paid = payments.reduce((a, c) => a + +c.payment, 0);
      })
  }

  ngOnDelete() {
    this.Sub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Store } from '@ngrx/store';
import { AppState, getPaymentsMonthData } from 'app/reducers';

import { MONTHS } from 'app/utils/months';

@Component({
  selector: 'appointments-details',
  template: `
    <div class="col-md-7 col-center">
      <h3 class="remove-top">
        <span class="glyphicon glyphicon-calendar"></span>
        <small>{{month}}, {{year}}.</small>

        <div class="pull-right">
          <a routerLink="payments" queryParamsHandling class="btn btn-link">
            Payments
            <span class="badge">{{ payments }}</span>
          </a>
          <a routerLink="sessions" queryParamsHandling class="btn btn-link">
            Sessions
            <span class="badge">{{ sessions }}</span>
          </a>
        </div>
      </h3>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppointmentsDetails implements OnInit, OnDestroy {
  month: string;
  year: number;
  sessions: number = 0;
  payments: number = 0;
  subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ){}

  ngOnInit(){
    this.subscription = this.route.params.map(params => {
        this.month = MONTHS[1][params['month']-1];
        this.year = params['year'];
        return params['month']-1;
      })
      .flatMap(month => this.store.select(state => state.appointments).do(data => {
        if(data) {
          this.sessions = data[month]['sessions'];
          this.payments = data[month]['payments'];
        }
      }))
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

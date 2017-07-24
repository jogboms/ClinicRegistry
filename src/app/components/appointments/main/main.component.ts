import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MONTHS } from 'app/utils/months';

import { AppState } from 'app/reducers';
import { AppointmentsActions } from 'app/actions/appointments.action';
import { AppointmentModel } from 'app/model/appointment.model';


@Component({
	selector: 'appointments-main',
	template: `
    <div class="container">
      <h1 class="text-center">
        <span class="glyphicon glyphicon-calendar"></span>
      </h1>

      <div class="col-md-9 col-center clearfix">
        <div class="clearfix">
          <h3 class="inline text-muted remove-top">
            <small>
              <span class="glyphicon glyphicon-inbox"></span>
            </small>
            &nbsp;{{year}}
          </h3>
          <span style="min-width: 125px;" class="pull-right">
            <select class="form-control" id="" (change)="onChange($event)">
              <option *ngFor="let y of years" [selected]="y === year" [value]="y">{{ y }}</option>
            </select>
          </span>
        </div>

        <br />

		<ng-template #spinnerEl>
	        <div class="clearfix text-center">
	          <h2>
	            <small><i class="fa fa-spinner fa-4x fa-spin"></i></small>
	          </h2>
	        </div>
		</ng-template>

        <div class="clearfix" *ngIf="appointments$ | async as appointments; else spinnerEl">
          <appointment-months-list *ngFor="let appointment of appointments" [appointment]="appointment"></appointment-months-list>
        </div>

      </div>
    </div>
  `,
})
export class AppointmentsMain {
	appointments$: Observable<AppointmentModel[]>;
	years: number[] = [];
	year: number = (new Date).getFullYear();
	start_year: number = 2016;
	end_year: number = 2026;

	constructor(
		private store: Store<AppState>,
		private appointmentsActions: AppointmentsActions,
	) {

		for (var i = this.start_year; i <= this.end_year; i++)
			this.years.push(i);
	}

	ngOnInit() {
		this.appointments$ = this.store.select(state => state.appointments)
			.filter(x => x !== null)
	}

	onChange(e) {
		this.year = +e.target.value;
		this.store.dispatch(this.appointmentsActions.fetch(this.year))
	}
}

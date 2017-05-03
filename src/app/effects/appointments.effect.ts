import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import 'rxjs/Rx';

import { AppState, getPaymentsData, getSessionsData } from 'app/reducers';
import { AppointmentsActions } from 'app/actions/appointments.action';
import { MONTHS } from 'app/utils/months';

@Injectable()
export class AppointmentsEffects {
  default_year = (new Date).getFullYear();

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private appointmentsActions: AppointmentsActions,
    ) {}

  // Initiate load of all appointments at App boot
  @Effect() boot$: Observable<Action> = this.store.take(1)
    .mapTo(this.appointmentsActions.fetch(this.default_year))

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(AppointmentsActions.FETCH)
    .map(action => action.payload).filter(year => +year && +year > 2000 )
    .combineLatest(this.store.let(getPaymentsData()), this.store.let(getSessionsData()))
    .map(([year, payments, sessions]) => {
      const p = _.countBy(payments.filter(p => p.year == year), p => p['month'])
      const s = _.countBy(sessions.filter(s => s.year == year), s => s['month'])

      return MONTHS[0].reduce((data: string[], v) => {
        const i = data.length;
        return [...data, {
          month_name: v,
          month: i+1,
          year: year,
          sessions: s[i+1] || 0,
          payments: p[i+1] || 0
        }];
      }, [])
    })
    .map(s => this.appointmentsActions.fetch_success(s))
}

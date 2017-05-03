import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState, getPaymentsData, getSessionsData } from 'app/reducers';
import { PatientsActions } from 'app/actions/patients.action';
import { __fix } from './patient.effect';

import { PatientsService } from 'app/services/patients.service';

@Injectable()
export class PatientsEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private patientsActions: PatientsActions,
    private patients: PatientsService
    ) {}

  // Initiate load of all patients at App boot
  @Effect() boot$: Observable<Action> = this.store.take(1)
    .map(() => this.patientsActions.init());

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(PatientsActions.INIT)
    .map(action => action.payload)
    .switchMap(preload => preload ? Observable.of(preload) : this.patients.fetch())
    .combineLatest(this.store.let(getPaymentsData()), this.store.let(getSessionsData()))
    .map(([patients, payments, sessions]) => patients.map(__fix(payments, sessions)))
    .map(patients => this.patientsActions.init_success(patients));
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from 'app/reducers';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState, getPaymentsData, getSessionsData } from 'app/reducers';
import { PatientsActions } from 'app/actions/patients.action';
import { __fix } from './patient.effect';

import { PatientsService } from 'app/services/patients.service';
import { BOOT } from "app/actions";

@Injectable()
export class PatientsEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private patientsActions: PatientsActions,
    private patients: PatientsService
    ) {}

  // Initiate load of all patients at App boot
  @Effect() init$: Observable<Action> = this.actions$.ofType(BOOT)
    .map((action: Action) => action.payload)
    .switchMap(preload => preload ? Observable.of(preload) : this.patients.fetch())
    .combineLatest(this.store.let(getPaymentsData()), this.store.let(getSessionsData()))
    .map(([patients, payments, sessions]) => patients.map(__fix(payments, sessions)))
    .map(patients => this.patientsActions.init_success(patients));
}

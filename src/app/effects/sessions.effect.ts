import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from 'app/reducers';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState } from 'app/reducers';
import { SessionsActions } from 'app/actions/sessions.action';
import { PatientActions } from 'app/actions/patient.action';

import { SessionsService } from 'app/services/sessions.service';
import { BOOT } from "app/actions";

@Injectable()
export class SessionsEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private patientsActions: PatientActions,
    private sessionsActions: SessionsActions,
    private sessions: SessionsService
    ) {}

  // Initiate load of all sessions at App boot
  @Effect() init$: Observable<Action> = this.actions$.ofType(BOOT)
    .map((action: Action) => action.payload)
    .switchMap(preload => preload ? Observable.of(preload) : this.sessions.fetch())
    .map(data => this.sessionsActions.init_success(data))

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(SessionsActions.CREATE)
    .map((action: Action) => action.payload)
    .map(session => this.sessions.create(session))
    .map(update => this.sessionsActions.create_success(update))

  @Effect() remove$: Observable<Action> = this.actions$
    .ofType(SessionsActions.REMOVE)
    .map((action: Action) => action.payload)
    .map(session => this.sessions.remove(session))
    .map(update => this.sessionsActions.remove_success(update))

  @Effect() toggle$: Observable<Action> = this.actions$
    .ofType(SessionsActions.TOGGLE)
    .map((action: Action) => action.payload)
    .map(session => this.sessions.toggle(session))
    .map(update => this.sessionsActions.toggle_success(update))

  @Effect() edit$: Observable<Action> = this.actions$
    .ofType(SessionsActions.EDIT)
    .map((action: Action) => action.payload)
    .map(session => this.sessions.edit(session))
    .map(update => this.sessionsActions.edit_success(update))

  @Effect({ dispatch: false }) remove_by_patient$ = this.actions$
    .ofType(PatientActions.REMOVE_SUCCESS)
    .map((action: Action) => action.payload)
    .map(id => this.sessions.removeByPatient(id))

  @Effect({ dispatch: false }) payment_persist$ = this.actions$
    .ofType(
      PatientActions.REMOVE_SUCCESS,
      SessionsActions.TOGGLE_SUCCESS,
      SessionsActions.REMOVE_SUCCESS,
      SessionsActions.CREATE_SUCCESS,
      SessionsActions.EDIT_SUCCESS)
    .debounceTime(3500)
    .do(() => this.sessions.persist())
}

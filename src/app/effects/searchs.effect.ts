import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState, getPatientsData } from 'app/reducers';
import { SearchsActions } from 'app/actions/searchs.action';
import { PatientModel } from 'app/model/patient.model';

@Injectable()
export class SearchsEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private searchsActions: SearchsActions,
    ) {}

  @Effect() by_id$: Observable<Action> = this.actions$
    .ofType(SearchsActions.BY_ID)
    .map(action => action.payload)
    .withLatestFrom(this.store.let(getPatientsData()))
    .map(([id, patients]) => {
      const searched = patients.find((patient: PatientModel) => patient.patient_id === id);
      return this.searchsActions.patients_success([searched]);
    });

  @Effect() by_key$: Observable<Action> = this.actions$
    .ofType(SearchsActions.BY_KEY)
    .map(action => action.payload)
    .withLatestFrom(this.store.let(getPatientsData()))
    .map(([key, patients]) => {
      const regex = new RegExp(key, 'i');
      const searched = patients.filter((patient: PatientModel) => patient.surname.match(regex) || patient.names.match(regex));
      return this.searchsActions.patients_success(searched);
    });

}

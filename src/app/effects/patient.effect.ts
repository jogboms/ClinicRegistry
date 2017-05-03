import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState } from 'app/reducers';
import { PatientActions } from 'app/actions/patient.action';

import { PatientsService } from 'app/services/patients.service';
import { PatientModel } from 'app/model/patient.model';
import { PaymentModel } from 'app/model/payment.model';

export const __fix = (payments = null, sessions = null) => {
  return (patient: PatientModel): PatientModel => {
    const P = Object.assign({}, patient);

    if(payments !== null) {
      P.payments = payments.filter(p => p.patient_id == P.id);
      P.deposit = (!P.payments.length) ? 0 :
        P.payments.reduce((a, b) => ({ payment: a.payment + b.payment } as PaymentModel)).payment
    }

    if(sessions !== null) {
      P.sessions = sessions.filter(s => s.patient_id == P.id);
      P.remaining = P.sessions.length - (P.sessions.filter((x) => x.completed === true)).length;
      P.completed = !!(P.remaining == 0);
    }

    P._bg_text_ = P.surname.slice(0,1).toUpperCase();

    P.cost = +P.cost;

    return P;
  }
}


@Injectable()
export class PatientEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private patientActions: PatientActions,
    private patients: PatientsService
    ) {}

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(PatientActions.CREATE)
    .map(action => action.payload)
    .map(insert => this.patients.add(insert))
    .map(patient => this.patientActions.create_success(__fix([], [])(patient)))

  @Effect() edit$: Observable<Action> = this.actions$
    .ofType(PatientActions.EDIT)
    .map(action => action.payload)
    .map(update => this.patients.edit(update))
    .map(patient => this.patientActions.edit_success(__fix()(patient)))

  @Effect() seen$: Observable<Action> = this.actions$
    .ofType(PatientActions.SEEN)
    .map(action => action.payload)
    .map(id => this.patients.seen(id))
    .map(patient => this.patientActions.edit_success(__fix()(patient)))

  @Effect() delete$: Observable<Action> = this.actions$
    .ofType(PatientActions.REMOVE)
    .map(action => action.payload)
    .map(id => this.patients.delete(id))
    .map(id => this.patientActions.delete_success(id))

  @Effect({ dispatch: false }) persist$ = this.actions$
    .ofType(
      PatientActions.CREATE_SUCCESS,
      PatientActions.EDIT_SUCCESS,
      PatientActions.REMOVE_SUCCESS)
    .debounceTime(3500)
    .do(() => this.patients.persist())
}

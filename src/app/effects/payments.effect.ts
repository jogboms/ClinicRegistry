import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from 'app/reducers';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState } from 'app/reducers';
import { PaymentModel } from 'app/model/payment.model';
import { PatientActions } from 'app/actions/patient.action';
import { PaymentsActions } from 'app/actions/payments.action';

import { PaymentsService } from 'app/services/payments.service';
import { BOOT } from "app/actions";

@Injectable()
export class PaymentsEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private patientActions: PatientActions,
    private paymentsActions: PaymentsActions,
    private payments: PaymentsService
    ) {}

  __fix(payment: PaymentModel): PaymentModel {
    const date = new Date(payment.date);
    const month = date.getMonth()+1;
    const year = date.getFullYear();

    return Object.assign({}, payment, { date, month, year });
  }

  // Initiate load of all payments at App boot
  @Effect() init$: Observable<Action> = this.actions$.ofType(BOOT)
    .map((action: Action) => action.payload)
    .switchMap(preload => preload ? Observable.of(preload) : this.payments.fetch())
    .map(data => {
      const payments =  data.map(this.__fix)

      return this.paymentsActions.init_success(payments);
    })

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(PaymentsActions.CREATE)
    .map((action: Action) => action.payload)
    .map(payment => this.payments.create(payment))
    .map(update => this.paymentsActions.create_success(this.__fix(update)))

  @Effect() edit$: Observable<Action> = this.actions$
    .ofType(PaymentsActions.EDIT)
    .map((action: Action) => action.payload)
    .map(payment => this.payments.edit(payment))
    .map(update => this.paymentsActions.edit_success(update))

  @Effect() remove$: Observable<Action> = this.actions$
    .ofType(PaymentsActions.REMOVE)
    .map((action: Action) => action.payload)
    .map(payment => this.payments.remove(payment))
    .map(update => this.paymentsActions.remove_success(update))

  @Effect({ dispatch: false }) remove_by_patient$ = this.actions$
    .ofType(PatientActions.REMOVE_SUCCESS)
    .map((action: Action) => action.payload)
    .map(id => this.payments.removeByPatient(id))

  @Effect({ dispatch: false }) persist$ = this.actions$
    .ofType(
      PatientActions.REMOVE_SUCCESS,
      PaymentsActions.REMOVE_SUCCESS,
      PaymentsActions.CREATE_SUCCESS,
      PaymentsActions.EDIT_SUCCESS)
    .debounceTime(3500)
    .do(() => this.payments.persist())
}

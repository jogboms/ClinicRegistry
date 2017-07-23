import { Injectable } from '@angular/core';
import { Store, Action as A } from '@ngrx/store';
import { Action } from 'app/reducers';
import { Router } from '@angular/router';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState } from 'app/reducers';
import { AuthActions } from 'app/actions/auth.action';

import { AuthService } from 'app/services/auth.service';
import { BOOT } from "app/actions";

const LOGIN = '[ADMIN] LOGIN';
export class loginActions implements A {
	readonly type = LOGIN;
	constructor(public payload: any) { }
}

const LOGIN_COMPLETE = '[ADMIN] LOGIN COMPLETE';
export class loginCompleteActions implements A {
	readonly type = LOGIN_COMPLETE;
	constructor(public payload: any) { }
}

@Injectable()
export class AuthEffects {

	constructor(
		private router: Router,
		private store: Store<AppState>,
		private actions$: Actions,
		private authActions: AuthActions,
		private auth: AuthService
	) { }

	/**
	 * Initiallize administrative priviledges at start of app
	 */
	@Effect() init$: Observable<Action> = this.actions$.ofType(BOOT)
		.switchMap(() => this.auth.is_logged())
		.map(state => this.authActions.init(state))

	/**
	 * Log in a user, update the AuthState, wait for 0.5s and redirect to '/patients'
	 * @param {dispatch: false} Disable auto-dispatch
	 */
	@Effect({ dispatch: false }) login$: Observable<boolean> = this.actions$
		.ofType(AuthActions.LOGIN)
		.map((action: loginActions) => action.payload)
		.switchMap((payload) => this.auth.login(payload).map((response) => {
			this.store.dispatch(this.authActions.login_complete(response))
			return response['logged'];
		}))
		.delay(500)
		.do(response => (response == true) ? this.router.navigate(['/patients']) : 0)

	/**
	 * Log out a user, update the AuthState, wait for 0.5s and redirect to '/patients'
	 */
	@Effect() logout$: Observable<Action> = this.actions$
		.ofType(AuthActions.LOGOUT)
		.switchMap(() => {
			this.auth.logout()
			return Observable.of(this.authActions.logout_complete())
				.delay(500)
				.do(() => this.router.navigate(['/']))
		})

	/**
	 * Create a new User
	 */
	@Effect() create$: Observable<Action> = this.actions$
		.ofType(AuthActions.CREATE)
		.map((action: Action) => action.payload)
		.switchMap((payload) => this.auth.create(payload).map(response => {
			return this.authActions.create_complete(response)
		}))

	/**
	 * Update the records of an active user
	 */
	@Effect() edit$: Observable<Action> = this.actions$
		.ofType(AuthActions.EDIT)
		.map((action: Action) => action.payload)
		.switchMap((payload) => this.auth.edit(payload).map(response => {
			return this.authActions.edit_complete(response)
		}))
}

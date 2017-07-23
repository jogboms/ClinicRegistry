import { Store as S, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ActionReducerMap } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Patient from './patient';
import * as Payments from './payments';
import * as Sessions from './sessions';
import * as Patients from './patients';
import * as Backup from './backup';
import * as Searchs from './searchs';
import * as Sorts from './sort';
import * as Filters from './filter';
import * as Diary from './diary';
import * as Messages from './messages';
import * as Store from './store';
import * as StoreActions from './storeActions';
import * as Appointments from './appointments';
import * as Auth from './auth';

import { combineReducers, compose } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from 'app/../environments/environment';

export type Action = { type: string, payload?: any };

export interface AppState {
	sort: Sorts.SortState;
	filter: Filters.FilterState;
	diary: Diary.DiaryState;
	messages: Messages.MessagesState;
	store: Store.StoreState;
	storeActions: StoreActions.StoreActionsState;
	sessions: Sessions.SessionsState;
	payments: Payments.PaymentsState;
	patients: Patients.PatientsState;
	backup: Backup.BackupState;
	searchs: Searchs.SearchsState;
	appointments: Appointments.AppointmentsState;
	auth: Auth.AuthState;
};

export const reducers: ActionReducerMap<AppState> = {
	sort: Sorts.sort,
	filter: Filters.filter,
	diary: Diary.diary,
	messages: Messages.messages,
	store: Store.store,
	storeActions: StoreActions.storeActions,
	sessions: Sessions.sessions,
	payments: Payments.payments,
	patients: Patients.patients,
	backup: Backup.backup,
	searchs: Searchs.searchs,
	appointments: Appointments.appointments,
	auth: Auth.auth,
};

const prod = combineReducers(reducers);
// const dev = compose(logger, combineReducers)(reducers);
const dev = compose(storeLogger({ collapsed: true }), combineReducers)(reducers);
export function redux(state: any, action: any) {
	return environment.production ? prod(state, action) : dev(state, action);
}

// WORKAROUND HERE
// https://github.com/ngrx/platform/issues/116#issuecomment-316843727
import { InjectionToken } from "@angular/core";
export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');
Object.assign(REDUCERS_TOKEN, reducers)
export const STORE_PROVIDERS = [{ provide: REDUCERS_TOKEN, useValue: reducers }];
// WORKAROUND HERE

export const STORE = [
	StoreModule.forRoot(REDUCERS_TOKEN), // Hack: Stll
	// StoreModule.forRoot(redux),
	// StoreDevtoolsModule.instrument({ maxAge: 10 }),
	(!environment.production ? StoreDevtoolsModule.instrument({ maxAge: 10 }) : []),
];

// Selectors
export function getLogged() {
	return (state$: S<AppState>) => state$.select(s => s.auth.logged);
}
export function getAdmin() {
	return (state$: S<AppState>) => state$.select(s => s.auth.admin);
}
export function getBackupPatient() {
	return (state$: S<AppState>) => state$
		.let(compose(Backup.getSelected(), getBackupPatients())).filter(p => !!p);
}
export function getPatient() {
	return (state$: S<AppState>) => state$
		.let(compose(Patients.getSelected(), getPatients())).filter(p => !!p);
}
export function getMessages() {
	return (state$: S<AppState>) => state$.select(s => s.messages);
}
export function getMessagesIds() {
	return compose(Messages.getIds(), getMessages());
}
export function getMessagesSelectedDate() {
	return compose(Messages.getSelectedDate(), getMessages());
}
export function getMessagesDataRaw() {
	return (state$: S<AppState>) => state$.select(s => s.messages.data);
}
export function getMessagesData() {
	return (state$: S<AppState>) => state$
		.let(getMessagesIds())
		.switchMap(ids => state$.let(compose(Messages.getData(ids), getMessages())));
}
export function getMessagesDayData() {
	return compose(Messages.getDayData(), getMessages())
}
export function getDiary() {
	return (state$: S<AppState>) => state$.select(s => s.diary);
}
export function getDiaryIds() {
	return compose(Diary.getIds(), getDiary());
}
export function getDiarySelectedId() {
	return compose(Diary.getSelectedId(), getDiary());
}
export function getDiarySelectedDate() {
	return compose(Diary.getSelectedDate(), getDiary());
}
export function getDiaryDataRaw() {
	return (state$: S<AppState>) => state$.select(s => s.diary.data);
}
export function getDiaryData() {
	return (state$: S<AppState>) => state$
		.let(getDiaryIds())
		.switchMap(ids => state$.let(compose(Diary.getData(ids), getDiary())));
}
export function getDiaryDayData() {
	return compose(Diary.getDayData(), getDiary())
}
export function getActions() {
	return (state$: S<AppState>) => state$.select(s => s.storeActions);
}
export function getStore() {
	return (state$: S<AppState>) => state$.select(s => s.store);
}
export function getStoreIds() {
	return compose(Store.getIds(), getStore());
}
export function getStoreDataRaw() {
	return (state$: S<AppState>) => state$.select(s => s.store.data);
}
export function getStoreItemData() {
	return (state$: S<AppState>) => state$
		.let(compose(Store.getSelected(), getStore())).filter(p => !!p);
}
export function getStoreData() {
	return (state$: S<AppState>) => state$
		.let(getStoreIds())
		.switchMap(ids => state$.let(compose(Store.getData(ids), getStore())));
}
export function getStoreActions() {
	return (state$: S<AppState>) => state$.select(s => s.storeActions);
}
export function getStoreActionIds() {
	return compose(StoreActions.getIds(), getStoreActions());
}
export function getStoreActionData() {
	return (state$: S<AppState>) => state$
		.let(getStoreActionIds())
		/** @todo Remove the need for any */
		.switchMap(ids => state$.let(compose(Store.getData(ids), <any>getActions())));
}
export function getSessions() {
	return (state$: S<AppState>) => state$.select(s => s.sessions);
}
export function getPayments() {
	return (state$: S<AppState>) => state$.select(s => s.payments);
}
export function getPatients() {
	return (state$: S<AppState>) => state$.select(s => s.patients);
}
export function getBackupPatients() {
	return (state$: S<AppState>) => state$.select(s => s.backup);
}
export function getSorts() {
	return (state$: S<AppState>) => state$.select(s => s.sort);
}
export function getSorter() {
	return compose(Sorts.getSort(), getSorts());
}
export function getPaymentsIds() {
	return compose(Payments.getIds(), getPayments());
}
export function getPaymentsData() {
	return (state$: S<AppState>) => state$
		.let(getPaymentsIds())
		.switchMap(ids => state$.let(compose(Payments.getData(ids), getPayments())));
}
export function getPaymentsMonthData(month, year) {
	return compose(Payments.getMonthData(month, year), getPaymentsData())
}
export function getSessionsIds() {
	return compose(Sessions.getIds(), getSessions());
}
export function getSessionsData() {
	return (state$: S<AppState>) => state$
		.let(getSessionsIds())
		.switchMap(ids => state$.let(compose(Sessions.getData(ids), getSessions())));
}
export function getSessionsMonthData(month, year) {
	return compose(Sessions.getMonthData(month, year), getSessionsData())
}
export function getPatientsIds() {
	return compose(Patients.getIds(), getPatients());
}
export function getPatientsRawData() {
	return (state$: S<AppState>) => state$
		.switchMap(() => state$.let(compose(Patients.getRawData(), getPatients())));
}
export function getPatientsData() {
	return (state$: S<AppState>) => state$
		.let(getPatientsIds())
		.switchMap(ids => state$.let(compose(Patients.getData(ids), getPatients())));
}
export function getPatientsCost() {
	return compose(Patients.getCosts(), getPatientsData());
}
export function getPatientsCostMonth(month, year) {
	return compose(Patients.getCosts(month, year), getPatientsData());
}
export function getPatientsStatus() {
	return compose(Patients.getStatus(), getPatients());
}
export function getPatientsIdsSorted() {
	return (state$: S<AppState>) => state$
		.let(getPatientsIds())
		.combineLatest(state$.let(getSorts()))
	// .map(([id, sort]) => id.sort(sort.alpha).sort(sort.date));
}
export function getPatientsDataSorted() {
	return (state$: S<AppState>) => state$
		.let(getPatientsData())
		.combineLatest(state$.let(getSorts()))
	// .map(([data, sort]) => data.sort(sort.alpha).sort(sort.date));
}


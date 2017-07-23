import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from 'app/reducers';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState, getStoreDataRaw } from 'app/reducers';
import { StoreActions } from 'app/actions/store.action';
import { StoreActionModel } from 'app/model/storeAction.model';
import { StoreActionService } from 'app/services/storeAction.service';
import { BOOT } from "app/actions";

@Injectable()
export class StoreActionsEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private storesAction: StoreActionService,
    private storeActions: StoreActions,
    ) {}


  // Initiate load of all store actions at App boot
  @Effect() init$: Observable<Action> = this.actions$.ofType(BOOT)
    .map((action: Action) => action.payload)
    .switchMap(preload => preload ? Observable.of(preload) : this.storesAction.fetch())
    .map(s => this.storeActions.init_actions_success(s))

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(StoreActions.CREATE_ACTION)
    .map((action: Action) => action.payload)
    .map(item => this.storesAction.create({ ...item }))
    .map((item: StoreActionModel) => this.storeActions.create_action_success(item))
    .do(() => this.storesAction.persist());
}

import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState, getStoreDataRaw } from 'app/reducers';
import { StoreActions } from 'app/actions/store.action';
import { StoreActionModel } from 'app/model/storeAction.model';
import { StoreActionService } from 'app/services/storeAction.service';

@Injectable()
export class StoreActionsEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private storesAction: StoreActionService,
    private storeActions: StoreActions,
    ) {}


  // Initiate load of all store actions at App boot
  @Effect() boot$: Observable<Action> = this.store.take(1)
    .mapTo(this.storeActions.init_actions())

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(StoreActions.INIT_ACTIONS)
    .map(action => action.payload)
    .switchMap(preload => preload ? Observable.of(preload) : this.storesAction.fetch())
    .map(s => this.storeActions.init_actions_success(s))

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(StoreActions.CREATE_ACTION)
    .map(action => action.payload)
    .map(item => this.storesAction.create({ ...item }))
    .map((item: StoreActionModel) => this.storeActions.create_action_success(item))
    .do(() => this.storesAction.persist());
}

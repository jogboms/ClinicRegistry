import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState, getStoreActionData } from 'app/reducers';
import { StoreActions } from 'app/actions/store.action';
import { StoreService } from 'app/services/store.service';
import { MONTHS } from 'app/utils/months';
import { StoreItemModel } from 'app/model/storeItem.model';

export const __fix = (actions = null) => {
  return (item: StoreItemModel): StoreItemModel => {
    const P = { ...item };

    if(actions !== null) {
      const def_type = 4;
      const def_initial_stock = P.stock;
      const sorter = (x, y) => x > y ? 1 : (x < y ? -1 : 0);
      P.actions = actions.sort((a, b) => sorter(b.date, a.date)).filter(p =>  p && p.item_id == P.id);
      const reduce = P.actions.reduce((a, c) => {
        let stock = a.stock;
        if(+c.type == 1 || +c.type == 2) { // Sold or Used
          stock -= +c.stock;
        }
        else if(+c.type == 0) { // Added
          stock += +c.stock;
        }
        // Do nothing for just created
        return { stock, type: +c.type };
      }, { stock: +item.stock, type: def_type });
      P.initial_stock = P.actions[P.actions.length - 1] && P.actions[P.actions.length - 1].stock || def_initial_stock; // Get last stock
      P.stock = reduce.stock;
      P.last_action = P.actions[0] && P.actions[0].type || def_type;
    }

    return P;
  }
}

@Injectable()
export class StoreEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private stores: StoreService,
    private storeActions: StoreActions,
    ) {}

  // Initiate load of all store at App boot
  @Effect() boot$: Observable<Action> = this.store.take(1)
    .mapTo(this.storeActions.init())


  @Effect() init$: Observable<Action> = this.actions$
    .ofType(StoreActions.INIT)
    .map(action => action.payload)
    .switchMap(preload => preload ? Observable.of(preload) : this.stores.fetch())
    .combineLatest(this.store.let(getStoreActionData()))
    .map(([items, actions]) => items.map(__fix(actions)))
    .map(s => this.storeActions.init_success(s));

  @Effect({ dispatch: false }) create$ = this.actions$
    .ofType(StoreActions.CREATE)
    .map(action => action.payload)
    .map((item: StoreItemModel) => this.stores.create(item))
    .do(item => this.storeActions.create_success(item))
    .map(item => ({ date: new Date, comment: 'Just created this item', item_id: item.id, type: 4, stock: item.stock }))
    .do(action => this.store.dispatch(this.storeActions.create_action(action)))
    .do(() => this.stores.persist());

  @Effect() remove$: Observable<Action> = this.actions$
    .ofType(StoreActions.REMOVE)
    .map(action => action.payload)
    .map(item => this.stores.remove(item))
    .map(update => this.storeActions.remove_success(update))
    .do(() => this.stores.persist());
}

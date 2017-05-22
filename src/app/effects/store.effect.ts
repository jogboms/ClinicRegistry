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
      P.actions = actions.filter(p =>  p && p.item_id == P.id);
      const reduce = P.actions.reduce((a, c) => {
        let stock = a.stock;
        if(+c.type == 1 || +c.type == 2) {
          stock -= +c.stock;
        }
        else {
          stock += +c.stock;
        }
        return { stock, type: +c.type };
      }, { stock: +item.stock, type: 0 });
      P.stock = reduce.stock;
      P.last_action = reduce.type;
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

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(StoreActions.CREATE)
    .map(action => action.payload)
    .map((item: StoreItemModel) => {
      this.stores.create(item);
      return this.storeActions.create_success(item);
    })
    .do(() => this.stores.persist());

  @Effect() remove$: Observable<Action> = this.actions$
    .ofType(StoreActions.REMOVE)
    .map(action => action.payload)
    .map(item => this.stores.remove(item))
    .map(update => this.storeActions.remove_success(update))
    .do(() => this.stores.persist());
}

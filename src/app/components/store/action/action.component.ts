import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getLogged } from 'app/reducers';

@Component({
  moduleId: module.id,
  selector: 'store-action',
  templateUrl: './action.html',
})
export class StoreAction {
  IS_LOGGED$: Observable<boolean>;

  constructor(_store: Store<AppState>) {
    this.IS_LOGGED$ = _store.let(getLogged());
  }
}

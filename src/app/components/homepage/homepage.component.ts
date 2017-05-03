import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getLogged } from 'app/reducers';

@Component({
  moduleId: module.id,
  selector: 'homepage',
  templateUrl: './homepage.html',
})
export class HomepageComponent {
  IS_LOGGED$: Observable<boolean>;

  constructor(_store: Store<AppState>) {
    this.IS_LOGGED$ = _store.let(getLogged());
  }
}

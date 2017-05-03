import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getLogged, getAdmin } from 'app/reducers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'menu-bar',
  templateUrl: './menubar.html',
  styleUrls: ['./menubar.scss'],
})
export class Menubar {
  @Input() title: string;
  IS_LOGGED: boolean = false;
  IS_ADMIN: boolean = false;
  Sub: Subscription;

  constructor(_store: Store<AppState>) {
    this.Sub = _store.let(getLogged())
      .combineLatest(_store.let(getAdmin()))
      .subscribe(([IS_LOGGED, IS_ADMIN]) => {
        this.IS_LOGGED = !!IS_LOGGED;
        this.IS_ADMIN = !!IS_ADMIN;
      })
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }
}

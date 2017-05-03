import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState, getLogged } from 'app/reducers';


@Component({
  selector: 'protected',
  template: `
    <div *ngIf="!IS_LOGGED" class="container">
      <div class="alert alert-danger" role="alert">
          <strong>Warning!</strong>
          Better check yourself, you're not looking too good.
          Login <a routerLink="/login" class="alert-link">HERE</a>
      </div>
    </div>

    <router-outlet [hidden]="!IS_LOGGED"></router-outlet>
  `,
})
export class Protected implements OnDestroy {
  IS_LOGGED: boolean;
  Sub: Subscription;

  constructor(_store: Store<AppState>) {
    this.Sub = _store.let(getLogged()).subscribe(state => this.IS_LOGGED = state)
  }

  ngOnDestroy(){
    this.Sub.unsubscribe()
  }
}


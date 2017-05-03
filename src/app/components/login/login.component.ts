import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppState, getLogged } from 'app/reducers';

import { AuthActions } from 'app/actions/auth.action';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.html',
})
export class LoginComponent {
  form: FormGroup;
  login_submitted: boolean = false;
  IS_LOGGED: boolean;
  Sub: Subscription;

  constructor(
    private _form: FormBuilder,
    private store: Store<AppState>,
    private authActions: AuthActions
    ){

    this.Sub = store.let(getLogged()).subscribe(state => this.IS_LOGGED = state)
  }

  ngOnInit(){
    this.form = this._form.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }

  onSubmit(e){
    this.store.dispatch(this.authActions.login(this.form.value));

    this.login_submitted = true;

    e.preventDefault()
  }
}

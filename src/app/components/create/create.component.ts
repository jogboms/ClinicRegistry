import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from 'app/reducers';

import { AuthActions } from 'app/actions/auth.action';
import { AuthCreationState } from 'app/reducers/auth';

@Component({
  moduleId: module.id,
  selector: 'create',
  templateUrl: './create.html',
})
export class CreateComponent {
  form: FormGroup;
  create_submitted: boolean = false;
  Sub: Subscription;
  state: AuthCreationState;

  constructor(
    private _form: FormBuilder,
    private store: Store<AppState>,
    private authActions: AuthActions
    ){

    this.Sub = store.select(state => state.auth.create)
      .subscribe(state => this.state = state)
  }

  ngOnInit(){
    this.form = this._form.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      admin: [''],
      key: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }

  onSubmit(e){
    this.state.create_key_error = this.state.create_success = this.state.create_error = false;

    this.store.dispatch(this.authActions.create(this.form.value));

    this.create_submitted = true;

    e.preventDefault()
  }
}

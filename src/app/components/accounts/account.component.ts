import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from 'app/reducers';

import { AuthActions } from 'app/actions/auth.action';
import { AuthService } from 'app/services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'account',
  templateUrl: './account.html',
})
export class AccountComponent implements OnInit {
  form: FormGroup;
  toggle: boolean = false;
  @Input() index: number;
  @Input() account;

  constructor(
    private _form: FormBuilder,
    private store: Store<AppState>,
    private _account: AuthService,
    private _accounts: AuthActions,
  ) { }

  ngOnInit() {
    this.form = this._form.group({
      id: this.account.id,
      username: [this.account.username, Validators.required],
      password: [this.account.password, Validators.required],
      admin: [this.account.admin],
    });
  }

  onToggle(e){
    this.toggle = !this.toggle;
    e.preventDefault();
  }

  onDelete(e, id){
    this._account.delete(id);
    e.preventDefault()
  }

  onSubmit(e) {
    this.toggle = false;
    this.store.dispatch(this._accounts.edit(this.form.value));
    e.preventDefault();
  }
}

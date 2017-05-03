import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Observable } from 'rxjs/Observable';

import { AuthService } from 'app/services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'accounts',
  templateUrl: './accounts.html',
})
export class AccountsComponent {
  form: FormGroup;
  accounts$: Observable<{}>;

  constructor(
    private _form: FormBuilder,
    private _accounts: AuthService,
    ){}

  ngOnInit(){
    this.form = this._form.group({ key: ['', Validators.required] });
  }

  onSubmit(e){
    this.accounts$ = this._accounts.fetch(this.form.value.key);
    e.preventDefault()
  }

}

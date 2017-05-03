import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from 'app/reducers';
import { MessagesActions } from 'app/actions/messages.action';

@Component({
  selector: 'messages',
  templateUrl: './messages.html',
})
export class MessagesComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formSub: Subscription; 
  date: Date = new Date();

  constructor(
    private _form: FormBuilder,
    private store: Store<AppState>,
    private messagesActions: MessagesActions,
    ){

    this.form = this._form.group({
      date: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.onSelect();
  
    this.formSub = this.form.valueChanges
      .map(v => v.date)
      .filter(x => x)
      .subscribe(date => {
        this.date = new Date(date);
        this.onSelect();
      });
  }

  onSelect(date: Date = this.date) {
    const d = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
    const m = date.getMonth() > 8 ? date.getMonth() : '0'+date.getMonth();
    const y = date.getFullYear();
    this.form.patchValue({ date: y+'-'+m+'-'+d }, { emitEvent: false });
    this.store.dispatch(this.messagesActions.select(date));
  }

  onToday() {
    this.date = new Date();
    this.onSelect();
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }
}

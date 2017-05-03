import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { AppState, getMessagesDayData } from 'app/reducers';

import { MessageModel } from 'app/model/message.model';

import { MessagesActions } from 'app/actions/messages.action';

@Component({
  selector: 'messages-edit',
  templateUrl: '../../diary/edit/edit.html',
  styleUrls: ['../../diary/edit/edit.scss']
})
export class MessagesEdit implements OnInit {
  Sub: Subscription;
  formSub: Subscription;
  date: Date;
  form: FormGroup;
  state: { isSaved: boolean, isTyping: boolean } = { isSaved: false, isTyping: false };
  @ViewChild('content') el: ElementRef;

  constructor(
    private _form: FormBuilder,
    private store: Store<AppState>,
    private messagesActions: MessagesActions
    ){

    this.form = this._form.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.Sub = this.store.let(getMessagesDayData())
      .map(content => content || ' ')
      .subscribe(({ content }) => this.form.patchValue({ content }, { emitEvent: false }))

    this.el.nativeElement.focus();
    
    this.formSub = this.form.valueChanges
      .do(() => Object.assign(this.state, { isTyping: true, isSaved: false }))
      .map(v => v.content)
      .map(content => content.trim())
      .distinctUntilChanged()
      .debounceTime(2000)
      .do(() => Object.assign(this.state, { isTyping: false, isSaved: true }))
      .subscribe(content => this.store.dispatch(this.messagesActions.create({ 
        content
      })));
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
    this.formSub.unsubscribe();
  }
}

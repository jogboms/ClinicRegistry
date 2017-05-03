import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { DiaryActions } from 'app/actions/diary.action';

import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { AppState, getDiaryDayData } from 'app/reducers';

import { DiaryModel } from 'app/model/diary.model';

@Component({
  selector: 'diary-edit',
  templateUrl: './edit.html',
  styles: [`
    :host { display: block; }
  `]
})
export class DiaryEdit implements OnInit {
  Sub: Subscription;
  formSub: Subscription;
  date: Date;
  form: FormGroup;
  state: { isSaved: boolean, isTyping: boolean } = { isSaved: false, isTyping: false };
  @ViewChild('content') el: ElementRef;

  constructor(
    private store: Store<AppState>,
    private _form: FormBuilder,
    private diaryActions: DiaryActions
    ) {

    this.form = this._form.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.Sub = this.store.let(getDiaryDayData())
      .take(1).filter(x => x)
      .subscribe(({ content }) => this.form.patchValue({ content }))

    this.el.nativeElement.focus();

    this.formSub = this.form.valueChanges
      .skip(1)
      .do(() => Object.assign(this.state, { isTyping: true, isSaved: false }))
      .map(v => v.content)
      .map(content => content.trim())
      .distinctUntilChanged()
      .debounceTime(2000)
      .do(() => Object.assign(this.state, { isTyping: false, isSaved: true }))
      .subscribe(content => this.store.dispatch(this.diaryActions.create({ 
        content
      })));
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
    this.formSub.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from 'app/reducers';
import { DiaryActions } from 'app/actions/diary.action';

@Component({
  selector: 'diary',
  templateUrl: './diary.html',
})
export class DiaryComponent {
  form: FormGroup;
  date: Date = new Date();
  formSub: Subscription; 

  constructor(
    private _form: FormBuilder,
    private store: Store<AppState>,
    private diaryActions: DiaryActions,
    ){
  
    this.form = this._form.group({
      date: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.onSelect();

    this.formSub = this.form.valueChanges
      .map(v => v.date)
      .filter(x => x)
      .subscribe(date => {
        this.date = new Date(date);
        this.onSelect();
      })
  }

  onSelect(date: Date = this.date) {
    const d = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
    const m = date.getMonth() > 8 ? date.getMonth() : '0'+date.getMonth();
    const y = date.getFullYear();
    this.form.patchValue({ date: y+'-'+m+'-'+d }, { emitEvent: false });
    this.store.dispatch(this.diaryActions.select(date));
  }

  onToday() {
    this.date = new Date();
    this.onSelect();
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }
}

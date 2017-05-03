import { Component } from "@angular/core";

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, getDiaryDayData } from 'app/reducers';

import { DiaryModel } from 'app/model/diary.model';

@Component({
  selector: 'diary-view',
  templateUrl: './view.html',
  styles: [`
    :host { display: block; }
  `]
})
export class DiaryView {
  data$: Observable<DiaryModel>;

  constructor(
    private store: Store<AppState>,
    ){}

  ngOnInit(){
    this.data$ = this.store.let(getDiaryDayData());
  }
}

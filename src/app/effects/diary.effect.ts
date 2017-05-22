import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState, getDiarySelectedDate } from 'app/reducers';
import { DiaryActions } from 'app/actions/diary.action';
import { DiaryService } from 'app/services/diary.service';
import { MONTHS } from 'app/utils/months';

@Injectable()
export class DiaryEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private diary: DiaryService,
    private diaryActions: DiaryActions,
    ) {}

  // Initiate load of all diary at App boot
  @Effect() boot$: Observable<Action> = this.store.take(1)
    .mapTo(this.diaryActions.init())


  @Effect() init$: Observable<Action> = this.actions$
    .ofType(DiaryActions.INIT)
    .map(action => action.payload)
    .switchMap(preload => preload ? Observable.of(preload) : this.diary.fetch())
    .map(s => this.diaryActions.init_success(s));

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(DiaryActions.CREATE)
    .map(action => action.payload)
    .withLatestFrom(this.store.let(getDiarySelectedDate()))
    .map(([{ content }, date]) => {
      const note = {
        id: 'diary_'+date.getDate()+'_'+(date.getMonth()+1)+'_'+date.getFullYear(),
        month_name: MONTHS[0][date.getMonth()],
        month: date.getMonth()+1,
        year: date.getFullYear(),
        day: date.getDate(),
        created: new Date(),
        date,
        content,
      }
      this.diary.create(note);
      return this.diaryActions.create_success(note);
    })
    .do(() => this.diary.persist());
}

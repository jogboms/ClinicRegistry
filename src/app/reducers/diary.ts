import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import * as _ from 'lodash';

import { DiaryModel } from '../model/diary.model';
import { DiaryActions } from '../actions/diary.action';

export type DiaryData = { [id: number]: DiaryModel };
export interface DiaryState {
  selected: string;
  date: Date;
  status: boolean;
  ids: number[];
  data: DiaryData;
}

const initialState: DiaryState = {
  selected: '',
  date: new Date,
  status: false,
  ids: [],
  data: null,
}

// Reducer
export function diary(state: DiaryState = initialState, {type, payload}: Action): DiaryState {
  switch (type) {
    case DiaryActions.SELECT: {
      const date = payload.date as Date;
      const y = date.getFullYear();
      const m = date.getMonth()+1;
      const d = date.getDate();
      return { ...state, date, selected: 'diary_'+d+'_'+m+'_'+y };
    }

    case DiaryActions.CREATE_SUCCESS: {
      const data = { ...state.data, [payload.id]: payload };
      const ids = [payload.id, ...state.ids];
      return { ...state, date: payload.date, selected: payload.id, status: true, ids , data };
    }

    case DiaryActions.INIT_SUCCESS: {
      const ids = payload.map(data => data.id);
      const data = _.mapKeys(payload, 'id') as DiaryData;

      return { ...state, status: false, ids, data };
    }

    default: return state;
  }
};


// Selectors
export function getDayData() {
  return (diary$: Observable<DiaryState>) => diary$
    .filter(diary => !!diary.data)
    .map(diary => diary.data[diary.selected])
}
export function getIds() {
  return (diary$: Observable<DiaryState>) => diary$.map(t => t.ids).filter(ids => !!ids);
}
export function getData(ids) {
  return (diary$: Observable<DiaryState>) => diary$
    .map(t => t.data)
    .filter(data => data !== null)
    .map(data => ids.map(id => data[id]));
}
export function getSelectedId() {
  return (diary$: Observable<DiaryState>) => diary$.map(t => t.selected).filter(s => !!s.length);
}
export function getSelectedDate() {
  return (diary$: Observable<DiaryState>) => diary$.map(t => t.date);
}
export function getSelected() {
  return (diary$: Observable<DiaryState>) => diary$.filter(s => !!s.ids.length).map(t => t.data[t.selected]);
}

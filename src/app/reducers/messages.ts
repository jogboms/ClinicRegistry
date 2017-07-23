import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { MessageModel } from '../model/message.model';
import { MessagesActions } from '../actions/messages.action';

import { Action } from 'app/reducers';

export type MessagesData = { [id: number]: MessageModel };
export interface MessagesState {
  selected: string;
  date: Date;
  status: boolean;
  ids: number[];
  data: MessagesData;
}

const initialState: MessagesState = {
  selected: '',
  date: new Date,
  status: false,
  ids: [],
  data: null,
}

// Reducer
export function messages(state: MessagesState = initialState, {type, payload}: Action): MessagesState {
  switch (type) {
    case MessagesActions.SELECT: {
      const date = payload.date as Date;
      const y = date.getFullYear();
      const m = date.getMonth()+1;
      const d = date.getDate();
      return { ...state, date, selected: 'messages_'+d+'_'+m+'_'+y };
    }

    case MessagesActions.CREATE_SUCCESS: {
      const data = { ...state.data, [payload.id]: payload };
      const ids = [payload.id, ...state.ids];
      return { ...state, selected: payload.id, date: payload.date, status: true, ids , data };
    }

    case MessagesActions.INIT_SUCCESS: {
      const ids = payload.map(data => data.id);
      const data = _.mapKeys(payload, 'id') as MessagesData;

      return { ...state, status: false, ids, data };
    }

    default: return state;
  }
};


// Selectors
export function getDayData() {
  return (messages$: Observable<MessagesState>) => messages$
    .filter(messages => !!messages.data)
    .map(messages => messages.data[messages.selected])
}
export function getIds() {
  return (messages$: Observable<MessagesState>) => messages$.map(t => t.ids).filter(ids => !!ids);
}
export function getData(ids) {
  return (messages$: Observable<MessagesState>) => messages$
    .map(t => t.data)
    .filter(data => data !== null)
    .map(data => ids.map(id => data[id]));
}
export function getSelectedId() {
  return (messages$: Observable<MessagesState>) => messages$.map(t => t.selected).filter(s => !!s.length);
}
export function getSelectedDate() {
  return (diary$: Observable<MessagesState>) => diary$.map(t => t.date);
}
export function getSelected() {
  return (messages$: Observable<MessagesState>) => messages$.filter(s => !!s.ids.length).map(t => t.data[t.selected]);
}

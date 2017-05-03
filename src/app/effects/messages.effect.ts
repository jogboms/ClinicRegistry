import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState, getMessagesSelectedDate } from 'app/reducers';
import { MessagesActions } from 'app/actions/messages.action';
import { MessagesService } from 'app/services/messages.service';
import { MONTHS } from 'app/utils/months';

@Injectable()
export class MessagesEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private messages: MessagesService,
    private messagesActions: MessagesActions,
    ) {}

  // Initiate load of all messages at App boot
  @Effect() boot$: Observable<Action> = this.store.take(1)
    .mapTo(this.messagesActions.init())


  @Effect() init$: Observable<Action> = this.actions$
    .ofType(MessagesActions.INIT)
    .switchMap(() => this.messages.fetch())
    .map(s => this.messagesActions.init_success(s));

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(MessagesActions.CREATE)
    .map(action => action.payload)
    .withLatestFrom(this.store.let(getMessagesSelectedDate()))
    .map(([{ content }, date]) => {
      const note = {
        id: 'messages_'+date.getDate()+'_'+(date.getMonth()+1)+'_'+date.getFullYear(),
        month_name: MONTHS[0][date.getMonth()],
        month: date.getMonth()+1,
        year: date.getFullYear(),
        day: date.getDate(),
        created: new Date(),
        date,
        content,
      }
      this.messages.create(note);
      return this.messagesActions.create_success(note);
    })
    .do(() => this.messages.persist());
}

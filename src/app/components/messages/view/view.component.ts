import { Component, Input } from "@angular/core";

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, getMessagesDayData } from 'app/reducers';

import { MessageModel } from 'app/model/message.model';

import { MessagesActions } from 'app/actions/messages.action';

@Component({
  selector: 'messages-view',
  templateUrl: '../../diary/view/view.html',
  styleUrls: ['../../diary/view/view.scss']
})
export class MessagesView {
  data$: Observable<MessageModel>;

  constructor(
    private store: Store<AppState>,
    ){}

  ngOnInit(){
    this.data$ = this.store.let(getMessagesDayData());
  }
}

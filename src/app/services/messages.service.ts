import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { MessageModel } from 'app/model/message.model';

import { MessagesDB } from "../storage/clinicreg";

@Injectable()
export class MessagesService {

  count(): number {
    return MessagesDB.count();
  }

  fetch(): Observable<MessageModel[]> {
    return MessagesDB.getPersistedData();
  }

  edit(message): MessageModel {
    MessagesDB.update({id: message.id}, { date: message.date, message: message.content, status: true });
    return message;
  }

  remove(message): MessageModel {
    MessagesDB.remove({ id: message.id });
    return message;
  }

  create(message): MessageModel {
    let p = MessagesDB.upsert(message);
    return p.result[0];
  }

  persist() {
    MessagesDB.save();
  }
}

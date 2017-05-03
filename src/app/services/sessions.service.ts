import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { SessionModel } from 'app/model/session.model';

import { SessionsDB } from "../storage/clinicreg";

@Injectable()
export class SessionsService {

  count(): number {
    return SessionsDB.count();
  }

  fetch(): Observable<SessionModel[]> {
    return SessionsDB.getPersistedData();
  }

  remove(session): SessionModel {
    SessionsDB.remove({ id: session.id });
    return session;
  }

  removeByPatient(id): void {
    SessionsDB.remove({ patient_id : id });
  }

  edit(session): SessionModel {
    session.month = session.date.getMonth()+1;
    session.year = session.date.getFullYear();
    SessionsDB.update({ id: session.id }, {
      date: session.date,
      month: session.month,
      year: session.year,
      status: true
    });
    return session;
  }

  toggle(session): SessionModel {
    SessionsDB.update({ id: session.id }, { completed: !session.completed, status: true });
    return session
  }

  create(session): SessionModel {
    session.date = new Date(session.date);
    session.month = session.date.getMonth()+1;
    session.year = session.date.getFullYear();
    session.status = true;

    let p = SessionsDB.insert(session);
    return p.inserted[0]
  }

  persist() {
    SessionsDB.save();
  }
}

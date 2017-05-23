import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import * as Rx from "rxjs/Rx";
window['Rx'] = Rx;

import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';

import { PatientModel } from 'app/model/patient.model';
import {
  BackupActions,
  PatientsActions,
  PaymentsActions,
  SessionsActions,
  DiaryActions,
  MessagesActions,
  StoreActions,
} from 'app/actions';
import {
  BackupDB,
  AdminsDB,
  PatientsDB,
  PaymentsDB,
  DiaryDB,
  MessagesDB,
  StoreDB,
  StoreActionDB,
  SessionsDB
} from "../storage/clinicreg";

/**
 * Back Up class
 *
 *
 * -   Backs up updated data and all data
 * -   Restores updated data and/or all data depending on choice
 */


@Injectable()
export class BackupService {
  constructor(
    private store: Store<AppState>,
    private backupActions: BackupActions,
    private patientsActions: PatientsActions,
    private paymentsActions: PaymentsActions,
    private sessionsActions: SessionsActions,
    private diaryActions: DiaryActions,
    private messagesActions: MessagesActions,
    private storeActions: StoreActions,
  ){}

  fetch(): Observable<PatientModel[]> {
    return BackupDB.getPersistedData();
  }

  out(): Observable<string> {
    return Observable.of(0).map((o) => {
      // Get update sessions, payments and/or storeActions
      const __sessions = SessionsDB.find({ status: true });
      const __payments = PaymentsDB.find({ status: true });
      const __storeActions = StoreActionDB.find({ status: true });

      // Get only patient_id columns from both collections
      const __set = new Set<string>(__sessions.map(b => b.patient_id).concat(__payments.map(b => b.patient_id)));
      // Get only item_id columns from both collection
      const __set2 = new Set<string>(__storeActions.map(b => b.item_id));

      // Get Updated patient IDs
      const ids = [ ...Array.from(__set) ];
      // Get Updated storeActions IDs
      const ids2 = [ ...Array.from(__set2) ];

      // Get patients that have been updated or have updated sessions and/or payments
      const __patients = PatientsDB.find({
        $or: [
          { status: true },
          { id: { $in: ids } },
        ]
      });

      // Get store records that have been updated or have updated actions
      const __store = StoreDB.find({
        $or: [
          { status: true },
          { id: { $in: ids2 } },
        ]
      });

      // Save a copy of the full and the updated database
      const data = {
        full: {
          ids: PatientsDB.data().map(p => p.id),
          patients: PatientsDB.data(),
          sessions: SessionsDB.data(),
          payments: PaymentsDB.data(),
          diary: DiaryDB.data(),
          messages: MessagesDB.data(),
          store: StoreDB.data(),
          storeAction: StoreActionDB.data(),
          admins: AdminsDB.data(),
        },
        updated : {
          ids: __patients.map(p => p.id),
          patients: __patients,
          sessions: __sessions,
          payments: __payments,
          diary: DiaryDB.data(),
          messages: MessagesDB.data(),
          store: __store,
          storeAction: __storeActions,
          admins: AdminsDB.data(),
        }
      }

      // console.log(data);
      return JSON.stringify(data);
    }).delay(1500).do(() => {
      // Update updated data to reflect backed-up state
      // PatientsDB.update({ status: true }, { status: false })
      // SessionsDB.update({ status: true }, { status: false })
      // PaymentsDB.update({ status: true }, { status: false })
    })
  }

  in(contents): Observable<boolean> {
    const data = JSON.parse(contents);
    // const parsed = JSON.parse(contents);
    var parsed = [];

    // Save present state of Patients into Backup database
    this.store.dispatch(this.backupActions.save());

    // Full restore
    // parsed = data.full;
    parsed = data.updated;

    const __ = (name, action, db, method = 'init') => {
      return Observable.of(null).do(() => {
        db.upsert(parsed[name], (x) => {
          this.store.dispatch(action[method](db.data()));
          db.save();
        });
      });
    }

    const a = __('diary', this.diaryActions, DiaryDB);
    const b = __('messages', this.messagesActions, MessagesDB);
    const c = __('store', this.storeActions, StoreDB);
    const d = __('storeAction', this.storeActions, StoreActionDB, 'init_actions');
    const x = __('sessions', this.sessionsActions, SessionsDB);
    const y = __('payments', this.paymentsActions, PaymentsDB);
    const z = __('patients', this.patientsActions, PatientsDB);

    return Observable.concat(a, b, c, d, x, y, z)
      .map(() => true)
      .delay(1500)
  }

  save(patients) {
    BackupDB.truncate();
    BackupDB.insert(patients);
    BackupDB.save();
    return patients;
  }
}

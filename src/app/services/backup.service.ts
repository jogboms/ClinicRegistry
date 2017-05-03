import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { BackupActions } from 'app/actions/backup.action';
import { PatientsActions } from 'app/actions/patients.action';
import { PaymentsActions } from 'app/actions/payments.action';
import { SessionsActions } from 'app/actions/sessions.action';
import "rxjs/Rx";

import { PatientModel } from 'app/model/patient.model';

import { BackupDB, AdminsDB, PatientsDB, PaymentsDB, SessionsDB } from "../storage/clinicreg";

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
  ){}

  fetch(): Observable<PatientModel[]> {
    return BackupDB.getPersistedData();
  }

  out(): Observable<string> {
    return Observable.of(0).map((o) => {
      // Get update sessions and/or payments
      const __sessions = SessionsDB.find({ status: true });
      const __payments = PaymentsDB.find({ status: true });

      // Get only patient_id columns from both collections
      const __set = new Set<string>(__sessions.map(b => b.patient_id).concat(__payments.map(b => b.patient_id)));

      // Get Updated patient IDs
      const ids = [ ...Array.from(__set) ];

      // Get patients that have been updated or have updated sessions and/or payments
      const __patients = PatientsDB.find({
        $or: [
          { status: true },
          { id: { $in: ids } },
        ]
      });

      // Save a copy of the full and the updated database
      const data = {
        full: {
          ids: PatientsDB.data().map(p => p.id),
          patients: PatientsDB.data(),
          sessions: SessionsDB.data(),
          payments: PaymentsDB.data(),
          admins: AdminsDB.data(),
        },
        updated : {
          ids: __patients.map(p => p.id),
          patients: __patients,
          sessions: __sessions,
          payments: __payments,
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

    const x = Observable.create((o) => {
      SessionsDB.upsert(parsed['sessions'], (x) => {
        this.store.dispatch(this.sessionsActions.init(SessionsDB.data()));
        SessionsDB.save();
        o.next(true);
      });
    });
    const y = Observable.create((o) => {
      PaymentsDB.upsert(parsed['payments'], (x) => {
        this.store.dispatch(this.paymentsActions.init(PaymentsDB.data()));
        PaymentsDB.save();
        o.next(true);
      });
    });
    const z = Observable.create((o) => {
      PatientsDB.upsert(parsed['patients'], (x) => {
        this.store.dispatch(this.patientsActions.init(PatientsDB.data()));
        PatientsDB.save();
        o.next(true);
      });
    });

    return Observable.of(0).switchMap(() => x).switchMap(() => y).switchMap(() => z)
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

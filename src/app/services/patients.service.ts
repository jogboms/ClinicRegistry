import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { PatientModel } from 'app/model/patient.model';

import { PatientsDB } from "../storage/clinicreg";

@Injectable()
export class PatientsService {

  count(): number {
    return PatientsDB.count();
  }

  fetch(): Observable<PatientModel[]> {
    return PatientsDB.getPersistedData();
  }

  delete(id): string {
    PatientsDB.removeById(id);
    return id;
  }

  seen(id): PatientModel {
    return PatientsDB.updateById(id, { status: false });
  }

  add(insert): PatientModel {
    insert.status = true;
    let p = PatientsDB.insert(insert);
    return p.inserted[0];
  }

  edit(update): PatientModel {
    // fix because of old database schema
    update.updated = new Date();
    // fix because of old database schema
    update.status = true;

    var p = PatientsDB.update({ id: update.id }, update);
    // fix because of older database schema
    if(p[0].payments || p[0].sessions) {
      if(p[0].payments) delete p[0].payments;
      if(p[0].sessions) delete p[0].sessions;
      p = PatientsDB.update({ id: update.id }, { $overwrite: update });
    }
    return p[0];
  }

  persist() {
    PatientsDB.save();
  }
}

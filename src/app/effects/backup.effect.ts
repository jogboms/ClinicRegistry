import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as _ from 'lodash';

import { AppState, getPatientsData } from 'app/reducers';
import { BackupActions } from 'app/actions/backup.action';

import { BackupService } from 'app/services/backup.service';
import { PatientModel } from 'app/model/patient.model';


@Injectable()
export class BackupEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private backupActions: BackupActions,
    private backup: BackupService
    ) {}

  // Initiate load of all backedup patients at App boot
  @Effect() boot$: Observable<Action> = this.store.take(1)
    .switchMap(() => this.backup.fetch())
    .map(patients => this.backupActions.init(patients[0]));

  @Effect() save$: Observable<Action> = this.actions$
    .ofType(BackupActions.SAVE)
    .switchMap(() => this.store.select(store => store.patients.data))
    .map(patients => this.backup.save(patients))
    .map(patients => this.backupActions.init(patients));
}

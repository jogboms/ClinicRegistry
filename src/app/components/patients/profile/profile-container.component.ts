import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState, getAdmin } from 'app/reducers';
import { BackupActions } from 'app/actions/backup.action';
import { PatientActions } from 'app/actions/patient.action';
import { PaymentsActions } from 'app/actions/payments.action';
import { SessionsActions } from 'app/actions/sessions.action';
import { PatientModel } from 'app/model/patient.model';
import { getPatient, getBackupPatient } from 'app/reducers';

@Component({
  selector: 'patient-profile-container',
  template: `
    <ng-template #loadingEl>
      <div class="container add-top add-bottom">
        <br /><br /><br />
        <progress-bar></progress-bar>
      </div>
    </ng-template>

    <div *ngIf="(view_type == 'back' ? backup$ : patient$) | async as patient; else loadingEl">
      <patient-profile (view)="toggle($event)" [type]="view_type"
        (actions)="dispatch($event)"
        [IS_ADMIN]="IS_ADMIN"
        [visible]="visible$ | async"
        [patient]="patient">
      </patient-profile>
    </div>
  `,
})
export class PatientsProfileContainer {
  patient$: Observable<PatientModel>;
  backup$: Observable<PatientModel>;
  visible$: Observable<string>;
  view_type = 'up';
  IS_ADMIN: boolean = false;

  constructor(
    private store: Store<AppState>,
    private backupActions: BackupActions,
    private patientActions: PatientActions,
    private paymentsActions: PaymentsActions,
    private sessionsActions: SessionsActions,
    private router: Router,
    private route: ActivatedRoute,
    ){

    this.store.let(getAdmin()).subscribe(state => this.IS_ADMIN = !!state)
  }

  ngOnInit(){
    const params$ = this.route.params;

    this.patient$ = params$.do(params => this.store.dispatch(this.patientActions.fetch(params['id'])))
      .switchMap(() => this.store.let(getPatient()))

    this.backup$ = params$.do(params => this.store.dispatch(this.backupActions.fetch(params['id'])))
      .switchMap(() => this.store.let(getBackupPatient()))

    this.visible$ = this.route.fragment.filter(x => !!x).startWith('details')
  }

  actions({type, payload}) {
    switch (type) {
      case 'session_toggle':
        return this.sessionsActions.toggle(payload);
      case 'session_create':
        return this.sessionsActions.create(payload);
      case 'session_remove':
        return this.sessionsActions.remove(payload);
      case 'session_edit':
        return this.sessionsActions.edit(payload);
      case 'payment_create':
        return this.paymentsActions.create(payload);
      case 'payment_edit':
        return this.paymentsActions.edit(payload);
      case 'payment_remove':
        return this.paymentsActions.remove(payload);
      case 'seen_patient':
        return this.patientActions.seen(payload);
      case 'edit_patient':
        return this.patientActions.edit(payload);
      case 'delete_patient': {
        this.router.navigate(['/patients'])
        return this.patientActions.delete(payload);
      }
    }
  }

  dispatch = (action) => this.store.dispatch(this.actions(action));

  toggle(view) {
    this.view_type = view.type;
  }
}


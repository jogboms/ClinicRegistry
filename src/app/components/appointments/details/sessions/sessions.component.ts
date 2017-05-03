import { Component, Input } from "@angular/core";
import { SessionModel } from 'app/model/session.model';

@Component({
  selector: 'appointment-sessions',
  template: `
    <div *ngIf="!sessions?.length" class="text-center alert alert-warning" role="alert">
      No Sessions exists.
    </div>

    <div *ngFor="let session of sessions" class="session" [style.opacity]="session.completed ? '1':'.3'">

      <button type="button" class="ok btn pull-left btn-link">
        <span class="glyphicon glyphicon-ok text-success"></span>
      </button>

      <div class="content">
        <div class="text-muted clearfix">
          <div>
            <h4 class="remove-top">
              <span>{{ session.completed ? '':'Not'}} Completed</span>

              <a class="btn btn-link pull-right btn-sm" routerLink="/patients/view/{{session.patient_id}}" fragment="sessions">
                <span class="glyphicon glyphicon-eye-open"></span>&nbsp;
                PATIENT
              </a>
            </h4>
          </div>

          <span class="glyphicon glyphicon-calendar"></span>
          <span>{{ session.date | date}}</span>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
    .session {
      transition: all .5s ease-in-out;
      background: white;
      padding: 1.75rem 1rem 1.25rem;
      margin-bottom: 3pt;
      border: 1px solid #E0E0E0;
    }
    .session:hover {
      opacity: 1 !important;
    }
    .session .ok {
      margin-right: 3%;
      padding: .5%;
      width: 12%;
      border: 2pt solid #f6f6f6;
      border-radius: 5px;
      cursor: pointer;
      text-align: center;
    }
    .session .ok span {
      font-size: 300%;
    }

    .session .content {
      width: 85%;
      display: inline-block;
    }
  `]
})
export class AppointmentsSessions {
  @Input() sessions: SessionModel[] = [];
}

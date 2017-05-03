import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Store } from '@ngrx/store';
import { AppState, getSessionsMonthData } from 'app/reducers';

import { SessionModel } from 'app/model/session.model';

@Component({
  selector: 'appointment-sessions-container',
  template: `
    <h2 class="clearfix">
      <small class="pull-left">
        <i class="fa fa-stethoscope fa-lg"></i>
        Sessions
      </small>

      <small class="l {{ completed ? 's' : 'd'}} pull-right">
        {{ completed ? '' : 'UN'}}COMPLETED
      </small>
    </h2>

    <div *ngIf="!fetched" class="text-center">
      <br /><br />
      <progress-bar></progress-bar>
      <br />
    </div>

    <appointment-sessions [sessions]="sessions$ | async"></appointment-sessions>
  `,
  styles: [`
    :host { display: block; }
    .l { color: white; background: #e91e63; padding: .5rem 1rem; }
    .l.s { background: #4caf50; }
    .l.d { background: #e91e63; }
  `]
})
export class AppointmentsSessionsContainer {
  sessions$: Observable<SessionModel[]>;
  fetched: boolean = false;
  completed: boolean = false;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ){}

  ngOnInit(){
    this.sessions$ = this.route.parent.params
      .map(params => [params['month'], params['year']])
      .switchMap(([month, year]) => this.store.let(getSessionsMonthData(month, year)))
      .do((sessions: SessionModel[]) => {
        this.fetched = true;
        const incomplete = (sessions.filter(s => s.completed !== true))
        this.completed = incomplete.length == 0;
      });
  }
}

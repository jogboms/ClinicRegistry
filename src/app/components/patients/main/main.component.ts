import { Component, Input, Output, EventEmitter } from "@angular/core";
import { transition, animate, trigger, state, style } from "@angular/animations";

import { PatientModel } from 'app/model/patient.model';

@Component({
  moduleId: module.id,
  selector: 'patients-main',
  template: `
    <div *ngIf="!patients.length" class="text-center alert alert-warning" role="alert">
      No Patients exists.
    </div>

    <div class="clearfix row">
      <patient-list @toggle 
        *ngFor="let patient of patients" 
        (delete)="delete.emit($event)" 
        [patientInfo]="patient" 
        [IS_ADMIN]="IS_ADMIN">
      </patient-list>
    </div>
  `,
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%)',
        }),
        animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
          opacity: 1,
          transform: 'translateX(0%)',
        }))
      ]),
      transition(':leave', [
        animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
          opacity: 0,
          transform: 'translateX(-100%)',
        }))
      ]),
    ])
  ]
})
export class PatientsMain {
  @Input() patients: PatientModel[];
  @Input('IS_ADMIN') IS_ADMIN;
  @Output() delete = new EventEmitter<number>();
}

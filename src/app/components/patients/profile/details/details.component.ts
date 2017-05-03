import {
  Component,
  Input,
  Output,
  EventEmitter,
  transition,
  animate,
  trigger,
  state,
  style } from "@angular/core";

@Component({
  selector: 'patient-details',
  template: `
    <div class="remove-top">
      <h3 class="remove-top inline">
        <span class="fa fa-info fa-lg text-warning"></span>
        <small>Details</small>
      </h3>
      <small class="pull-right">
        <button (click)="toggle_edit()" type="button" class="btn btn-primary btn-lg btn-circle">
          <span *ngIf="!show_edit" class="glyphicon glyphicon-pencil"></span>
          <span *ngIf="show_edit" class="glyphicon glyphicon-refresh"></span>
        </button>
      </small>
    </div>

    <br />

    <patient-details-edit @toggle (edit)="edit($event)" [patient]="patient" *ngIf="show_edit"></patient-details-edit>

    <patient-details-view @toggle [patient]="patient" *ngIf="!show_edit"></patient-details-view>
  `,
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', animate('500ms ease-in-out', style({ opacity: 0 }))),
    ])
  ]

})
export class PatientsDetails {
  @Input() patient;
  @Output() actions = new EventEmitter<Object>();
  show_edit = false;

  toggle_edit = ()  => this.show_edit = !this.show_edit;

  edit = (patient) => this.actions.emit({ type: 'edit_patient', payload: patient });
}

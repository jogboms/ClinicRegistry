import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'patient-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
})
export class PatientList {
  @Input('patientInfo') patient;
  @Input('IS_ADMIN') IS_ADMIN;
  @Output() delete = new EventEmitter<string>();

  onDelete = (id) => this.delete.emit(id);
}


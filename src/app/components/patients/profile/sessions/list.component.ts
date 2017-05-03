import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'patient-sessions-list',
  templateUrl: './list.html',
})
export class PatientsSessionList {
  @Input() session;
  @Output() remove = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  toggle_edit: boolean = false;

  onEdit = () => this.toggle_edit = !this.toggle_edit;

  onDelete = () => this.remove.emit(this.session);

  onToggle = () => this.toggle.emit(this.session);

  onSave(i){
    this.session.date = new Date(i.value);
    this.edit.emit(this.session)

    this.onEdit();
  }
}

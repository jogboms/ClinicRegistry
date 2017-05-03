import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'patient-sessions',
  templateUrl: './sessions.html',
})
export class PatientsSessions {
  @Input() patient;
  @Output() actions = new EventEmitter<Object>();

  show_session_create = false;
  create_session_success = false;

  toggle_show_create = () => this.show_session_create = !this.show_session_create;

  remove = (session) => this.actions.emit({ type: 'session_remove', payload: session });

  edit = (session) => this.actions.emit({ type: 'session_edit', payload: session });

  toggle = (session) => this.actions.emit({ type: 'session_toggle', payload: session });

  create(session){
    this.actions.emit({type: 'session_create', payload: Object.assign(session, {
      patient_id: this.patient.id,
      patient_id_2: this.patient.patient_id
    })})

    setTimeout(() => this.create_session_success = true, 2000)
    this.toggle_show_create();
  }
}

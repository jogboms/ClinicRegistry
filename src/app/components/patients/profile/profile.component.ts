import { Component, Input, Output, EventEmitter } from "@angular/core";
import { trigger } from "@angular/animations";
import { Router } from "@angular/router";
import { PatientModel } from 'app/model/patient.model';
import { SlideLeftRight } from 'app/animation';

@Component({
  selector: 'patient-profile',
  templateUrl: './profile.html',
  animations: [
    trigger('toggle', [...SlideLeftRight])
  ]
})
export class PatientsProfile {
  @Input() type: string;
  @Input() visible: string;
  @Input() IS_ADMIN: boolean = false;
  @Input() patient: PatientModel;
  @Output() actions = new EventEmitter<Object>();
  @Output() view = new EventEmitter<Object>();

  toggle(e, type) {
    this.view.emit({ type });
    e.preventDefault();
  }

  seen(seen = true) {
    this.actions.emit({type: 'seen_patient', payload: this.patient.id});
  }

  onDelete(){
    if(confirm(`Are you sure you wish to remove all records of ${this.patient.surname} including Payments & Sessions?`)){
      this.actions.emit({type: 'delete_patient', payload: this.patient.id});
    }
  }
}


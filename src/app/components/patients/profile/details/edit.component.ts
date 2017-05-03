import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { generateId } from 'app/utils/generateId';

@Component({
  moduleId: module.id,
  selector: 'patient-details-edit',
  templateUrl: './edit.html',
  styles: [' :host { display: block } ']
})
export class PatientsDetailEdit {
  form: FormGroup;
  @Input() patient;
  @Output() edit = new EventEmitter<any>();

  constructor(private _form: FormBuilder){}

  ngOnInit(){
    this.form = this._form.group({
      id: [this.patient.id],
      z: [this.patient.z],
      title: [this.patient.title, Validators.required],
      surname: [this.patient.surname, Validators.required],
      names: [this.patient.names, Validators.required],
      telephone: [this.patient.telephone, Validators.required],
      referral: [this.patient.referral],
      gender: [this.patient.gender, Validators.required],
      age: [this.patient.age, Validators.required],
      cost: [this.patient.cost, Validators.required],
    });
  }

  onSubmit(e){
    if(!this.form.valid)
      return;

    const insert = Object.assign({}, this.form.value, {
      cost: parseFloat(this.form.value.cost),
      patient_id: generateId(this.patient.i, this.patient.x, this.patient.y, this.form.value.z),
    });

    this.edit.emit(insert)

    e.preventDefault()
  }
}

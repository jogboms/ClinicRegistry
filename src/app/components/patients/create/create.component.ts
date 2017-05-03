import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { generateId } from 'app/utils/generateId';
import { generateHexColor } from "app/utils/generateHexColor";

import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { PatientActions } from 'app/actions/patient.action';
import { PatientModel } from 'app/model/patient.model';
import { getPatient } from 'app/reducers';


@Component({
  selector: 'patients-create',
  templateUrl: './create.html',
  styles: [' :host { display: block }'],
})
export class PatientsCreate {
  id$: Observable<string>;
  form: FormGroup;
  create_success: boolean = false;
  create_submitted: boolean = false;
  create_invalid: boolean = false;
  Sub: Subscription;

  constructor(
    private _form: FormBuilder,
    private store: Store<AppState>,
    private patientActions: PatientActions,
    ) {}

  ngOnInit() {
    this.id$ = this.store.let(getPatient()).map((p: PatientModel) => p.id)
      .do(id => this.create_success = this.create_submitted ? !!id : false);

    this.form = this._form.group({
      x: [(new Date()).getMonth()+1, Validators.required],
      y: [(new Date()).getFullYear(), Validators.required],
      z: ['B', Validators.required],
      i: ['', Validators.required],
      title: ['', Validators.required],
      surname: ['', Validators.required],
      names: ['', Validators.required],
      telephone: ['', Validators.required],
      referral: [''],
      gender: ['m', Validators.required],
      age: ['', Validators.required],
      cost: [0, Validators.required],
      created: [new Date()],
    });

    this.Sub = this.form.valueChanges.debounceTime(1500).subscribe(() => this.create_submitted = false);
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }

  onSubmit(e) {
    this.create_submitted = true;

    if(!this.form.valid) {
      this.create_invalid = true;
      return;
    }

    const insert = Object.assign({}, this.form.value, {
      patient_id: generateId(this.form.value.i, this.form.value.x, this.form.value.y, this.form.value.z),
      cost: parseFloat(this.form.value.cost),
      color: generateHexColor(),
      vip: this.form.value.z == 'vip',
    });

    this.store.dispatch(this.patientActions.create(insert));

    setTimeout(() => {
      this.form.patchValue({
        i: '',
        surname: '',
        names: '',
        telephone: '',
      });
    }, 2500);

    e.preventDefault();
  }
}

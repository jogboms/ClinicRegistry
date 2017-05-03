import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'patient-payments-create',
  template:  `
    <form class="form" (submit)="onSubmit($event)" [formGroup]="form">
      <div class="form-group">
        <div class="row">
          <div class="col-xs-6">
            <label for="">Date</label>
            &nbsp;
            <input type="date" formControlName="date" class="form-control inline" placeholder="yyyy-mm-dd">
          </div>
          <div class="col-xs-6 text-right">
            <label for="">Payment</label>
            &nbsp;
            <input required="true" type="text" autofocus="autofocus" formControlName="payment" class="form-control inline" placeholder="Amount">
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="block">
          Comment

          <span class="pull-right">
            (optional)
          </span>
        </label>
        <input type="text" formControlName="comment" class="form-control" placeholder="..." />
      </div>

      <button type="submit" class="btn btn-success btn-circle">
        <span class="glyphicon glyphicon-save"></span>
      </button>
    </form>
  `,
})
export class PatientsPaymentCreate {
  form: FormGroup;
  @Output() create = new EventEmitter<any>();

  constructor(private _form: FormBuilder){}

  ngOnInit(){
    this.form = this._form.group({
      date: [new Date()],
      payment: [0, Validators.required],
      comment: [''],
    });
  }

  onSubmit(e){
    const insert = Object.assign({}, this.form.value, {
      payment: parseFloat(this.form.value.payment),
    });

    this.create.emit(insert)

    e.preventDefault()
  }

}

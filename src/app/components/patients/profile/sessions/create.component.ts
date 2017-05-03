import {Component, EventEmitter, Output} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'patient-sessions-create',
  template: `
    <form class="form" (submit)="onSubmit($event)" [formGroup]="form">
      <div class="form-group">
        <label for="">Date</label>
        &nbsp;
        <input type="date" formControlName="date" class="form-control inline" placeholder="yyyy-mm-dd">
        &nbsp;&nbsp;

        <label class="checkbox-inline pull-right">
          <input formControlName="completed" type="checkbox"> Completed
        </label>
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
export class PatientsSessionCreate {
  form: FormGroup;
  @Output() create = new EventEmitter<any>();

  constructor(private _form: FormBuilder){}

  ngOnInit(){
    this.form = this._form.group({
      date: [new Date()],
      comment: [''],
      completed: [false],
    });
  }

  onSubmit(e){
    this.create.emit(this.form.value)

    e.preventDefault()
  }

}

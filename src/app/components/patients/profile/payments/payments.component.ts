import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'patient-payments',
  templateUrl: './payments.html',
})
export class PatientsPayments {
  @Input() patient;
  @Output() actions = new EventEmitter<Object>();

  create_payment_show = false;
  create_payment_success = false;

  toggle_show_create = () => this.create_payment_show = !this.create_payment_show;

  edit = (payment) => this.actions.emit({ type: 'payment_edit', payload: payment });

  remove = (payment) => this.actions.emit({ type: 'payment_remove', payload: payment });

  /**
   * @todo listen to change on this.create_payment_success
   */
  create(payment){
    this.actions.emit({type: 'payment_create', payload: Object.assign(payment, {
      patient_id: this.patient.id
    })})

    setTimeout(() => this.create_payment_success = true, 2000)
    this.toggle_show_create()
  }
}




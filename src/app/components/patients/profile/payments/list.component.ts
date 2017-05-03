import {Component, EventEmitter, Input, Output} from "@angular/core";

import {PaymentModel} from 'app/model/payment.model';

@Component({
  selector: 'patient-payments-list',
  templateUrl: './list.html',
})
export class PatientsPaymentList {
  @Input() payment: PaymentModel;
  @Output() remove = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  toggle_edit = false;

  onToggle = () => this.payment.completed = !this.payment.completed;

  onEdit = () => this.toggle_edit = !this.toggle_edit;

  onDelete = () => this.remove.emit(this.payment);

  onSave(i, f){
    this.payment.date = new Date(i.value || this.payment.date);
    this.payment.payment = parseFloat(f.value);

    this.edit.emit(this.payment)
    this.toggle_edit = !this.toggle_edit;
  }

}

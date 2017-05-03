import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { PaymentModel } from 'app/model/payment.model';

import { PaymentsDB } from "../storage/clinicreg";

@Injectable()
export class PaymentsService {

  count(): number {
    return PaymentsDB.count();
  }

  fetch(): Observable<PaymentModel[]> {
    return PaymentsDB.getPersistedData();
  }

  edit(payment): PaymentModel {
    PaymentsDB.update({id: payment.id}, { date: payment.date, payment: payment.payment, status: true });
    return payment;
  }

  remove(payment): PaymentModel {
    PaymentsDB.remove({ id: payment.id });
    return payment;
  }

  removeByPatient(id): void {
    PaymentsDB.remove({ patient_id : id });
  }

  create(payment): PaymentModel {
    payment.date = new Date(payment.date);
    payment.status = true;
    let p = PaymentsDB.insert(payment);
    return p.inserted[0];
  }

  persist() {
    PaymentsDB.save();
  }

}

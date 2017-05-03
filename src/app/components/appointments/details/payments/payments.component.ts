import { Component, Input } from "@angular/core";
import { PaymentModel } from 'app/model/payment.model';

@Component({
  selector: 'appointment-payments',
  template: `
    <div *ngIf="!payments?.length" class="text-center alert alert-warning" role="alert">
      No Payments exists.
    </div>

    <div *ngFor="let payment of payments" class="payment">

      <button type="button" class="btn btn-link button pull-left">
        <span class="glyphicon glyphicon-ok text-primary"></span>
      </button>


      <div class="content">
        <div>
          <h4 class="remove-top">
            <span>
              {{ payment.payment | currency:'NGN':true}}
            </span>

            <a class="btn btn-link pull-right btn-sm" routerLink="/patients/view/{{payment.patient_id}}" fragment="payments">
              <span class="glyphicon glyphicon-eye-open"></span>&nbsp;
              PATIENT
            </a>
          </h4>
        </div>

        <div class="text-muted clearfix">
          <span class="glyphicon glyphicon-calendar"></span>
          <span>{{ payment.date | date}}</span>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
    .payment {
      transition: all .5s ease-in-out;
      background: white;
      padding: 1.75rem 1rem 1.25rem;
      margin-bottom: 3pt;
      border: 1px solid #E0E0E0;
    }
    .payment:hover {
      opacity: 1 !important;
    }
    .payment .button {
      margin-right: 3%;
      padding: .5%;
      width: 12%;
      border: 2pt solid #f6f6f6;
      border-radius: 5px;
      cursor: pointer;
      text-align: center;
    }
    .payment .button span {
      font-size: 300%;
    }

    .payment .content {
      width: 85%;
      display: inline-block;
    }
  `]
})
export class AppointmentsPayments {
  @Input() payments: PaymentModel[] = [];
}

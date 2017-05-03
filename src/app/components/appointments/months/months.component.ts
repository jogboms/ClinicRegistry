import { Component, Input } from '@angular/core';
import { AppointmentModel } from 'app/model/appointment.model';


@Component({
  moduleId: module.id,
  selector: 'appointment-months-list',
  template: `
    <a class="col-md-3 col-sm-4 col-xs-6"
      routerLink="{{appointment.year}}/{{appointment.month}}"
      title="{{appointment.sessions}} sessions & {{appointment.payments}} payments"
      >
      <div class="month row">
        <h5 class="text-center">{{appointment.month_name}}</h5>

        <footer class="text-center">
          <span class="badge bg-{{appointment.sessions > 0 ? 'success' : 'primary'}}">{{appointment.sessions}}</span>
          <span class="badge bg-{{appointment.payments > 0 ? 'danger' : 'primary'}}">{{appointment.payments}}</span>
        </footer>
      </div>
    </a>
  `,
  styleUrls: ['./month.scss'],
})
export class AppointmentMonthsList {
  @Input() appointment: AppointmentModel;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainModule } from '../shared-module/main/index';

import { AppointmentsComponent } from './appointments.component';
import { AppointmentsMain } from './main/main.component';
import { AppointmentMonthsList } from './months/months.component';
import { AppointmentsDetails } from './details/details.component';
import { AppointmentsPaymentsContainer } from './details/payments/payments-container.component';
import { AppointmentsPayments } from './details/payments/payments.component';
import { AppointmentsSessionsContainer } from './details/sessions/sessions-container.component';
import { AppointmentsSessions } from './details/sessions/sessions.component';

const routes:Routes = [
  { path: '', component: AppointmentsComponent, children:
    [
      { path: '', component: AppointmentsMain, },
      { path: ':year/:month', component: AppointmentsDetails, children:
        [
          { path: '', redirectTo: 'payments' },
          { path: 'payments', component: AppointmentsPaymentsContainer },
          { path: 'sessions', component: AppointmentsSessionsContainer },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AppointmentsComponent,
    AppointmentsMain,
    AppointmentsDetails,
    AppointmentsPayments,
    AppointmentsPaymentsContainer,
    AppointmentsSessions,
    AppointmentsSessionsContainer,
    AppointmentMonthsList,
  ]
})
export class AppointmentsModule {}

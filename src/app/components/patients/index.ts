import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientsMainContainer } from './main/main-container.component';
import { PatientsMain } from './main/main.component';
import { PatientList } from './main/list/list.component';
import { PatientsSearchBar } from './main/searchbar/searchbar.component';
import { PatientsCreate } from './create/create.component';
import { PatientsProfile } from './profile/profile.component';
import { PatientsProfileContainer } from './profile/profile-container.component';
import { PatientsDetailEdit } from './profile/details/edit.component';
import { PatientsDetailView } from './profile/details/view.component';
import { PatientsDetails } from './profile/details/details.component';
import { PatientsPaymentCreate } from './profile/payments/create.component';
import { PatientsPaymentList } from './profile/payments/list.component';
import { PatientsPayments } from './profile/payments/payments.component';
import { PatientsSessionCreate } from './profile/sessions/create.component';
import { PatientsSessionList } from './profile/sessions/list.component';
import { PatientsSessions } from './profile/sessions/sessions.component';

import { MainModule } from '../shared-module/main/index';

const routes:Routes = [
  { path: '', component: PatientsComponent, children:
    [
      { path: '', component: PatientsMainContainer, },
      { path: 'view/:id', component: PatientsProfileContainer },
      { path: 'create', component: PatientsCreate },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PatientsMain,
    PatientsMainContainer,
    PatientsComponent,
    PatientsDetails,
    PatientsProfileContainer,
    PatientsProfile,
    PatientsCreate,
    PatientsSessions,
    PatientsPayments,
    PatientsPaymentCreate,
    PatientsPaymentList,
    PatientsSessionCreate,
    PatientsSessionList,
    PatientList,
    PatientsSearchBar,
    PatientsDetailView,
    PatientsDetailEdit,
  ]
})
export class PatientsModule {}

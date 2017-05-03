import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { AccountsComponent } from './accounts.component';

const routes:Routes = [
  { path: '', component: AccountsComponent, },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AccountComponent,
    AccountsComponent,
  ]
})
export class AccountsModule {}

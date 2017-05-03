import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';

const routes:Routes = [
  { path: '', component: HomepageComponent, },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomepageComponent,
  ]
})
export class HomepageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MainModule } from '../shared-module/main/index';

import { StoreComponent } from './store.component';
import { StoreItem } from './item/item.component';
import { StoreAction } from './action/action.component';

const routes:Routes = [
  { path: '', component: StoreComponent },
  { path: ':item', component: StoreItem, },
];

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    StoreComponent,
    StoreItem,
    StoreAction,
  ]
})
export class StoreModule {}


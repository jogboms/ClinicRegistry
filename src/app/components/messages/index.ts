import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MainModule } from '../shared-module/main/index';

import { MessagesComponent } from './messages.component';
import { MessagesView } from './view/view.component';
import { MessagesEdit } from './edit/edit.component';

const routes:Routes = [
  { path: '', component: MessagesComponent, children:
    [
      { path: '', redirectTo: 'view' },
      { path: 'view', component: MessagesView },
      { path: 'edit', component: MessagesEdit },
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
    MessagesComponent,
    MessagesView,
    MessagesEdit,
  ]
})
export class MessagesModule {}


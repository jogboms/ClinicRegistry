import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MainModule } from '../shared-module/main/index';

import { DiaryComponent } from './diary.component';
import { DiaryView } from './view/view.component';
import { DiaryEdit } from './edit/edit.component';

const routes:Routes = [
  { path: '', component: DiaryComponent, children:
    [
      { path: '', redirectTo: 'view' },
      { path: 'view', component: DiaryView },
      { path: 'edit', component: DiaryEdit },
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
    DiaryComponent,
    DiaryView,
    DiaryEdit,
  ]
})
export class DiaryModule {}


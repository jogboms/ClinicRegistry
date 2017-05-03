import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { STORE } from './reducers';
import { SERVICES } from './services';
import { EFFECTS } from './effects';
import { ACTIONS } from './actions';

import { AppComponent } from './components/app/app.component';
import { Protected } from './components/shared/protected.component';
import { Menubar } from './components/shared/menubar.component';
import { NwSaveAs } from './components/shared/nwsaveas.directive';
import { MainModule } from './components/shared-module/main';

const routes:Routes = [
  { path: '', component: Protected, children:
    [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'appointments', loadChildren: 'app/components/appointments#AppointmentsModule' },
      { path: 'store', loadChildren: 'app/components/store#StoreModule' },
      { path: 'diary', loadChildren: 'app/components/diary#DiaryModule' },
      { path: 'messages', loadChildren: 'app/components/messages#MessagesModule' },
      { path: 'patients', loadChildren: 'app/components/patients#PatientsModule' }
    ]
  },
  { path: 'home', loadChildren: 'app/components/homepage#HomepageModule' },
  { path: 'login', loadChildren: 'app/components/login#LoginModule' },
  { path: 'create', loadChildren: 'app/components/create#CreateModule' },
  { path: 'accounts', loadChildren: 'app/components/accounts#AccountsModule' },
]

@NgModule({
  imports: [
    BrowserModule,
    MainModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
    ReactiveFormsModule,
    ...STORE,
    ...EFFECTS,
  ],
  declarations: [
    AppComponent,
    Protected,
    NwSaveAs,
    Menubar,
  ],
  providers: [
    ...SERVICES,
    ...ACTIONS,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Alert } from '../../shared/alert.component';
import { ProgressBar } from '../../shared/progressbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Alert,
    ProgressBar,
  ],
  exports: [
    Alert,
    ProgressBar,
  ],
})
export class MainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MainModule,
      providers: []
    };
  };
}

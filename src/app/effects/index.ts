import { EffectsModule } from '@ngrx/effects';

import { PatientEffects } from './patient.effect';
import { SessionsEffects } from './sessions.effect';
import { PaymentsEffects } from './payments.effect';
import { PatientsEffects } from './patients.effect';
import { StoreEffects } from './store.effect';
import { StoreActionsEffects } from './storeActions.effect';
import { DiaryEffects } from './diary.effect';
import { MessagesEffects } from './messages.effect';
import { BackupEffects } from './backup.effect';
import { AppointmentsEffects } from './appointments.effect';
import { SearchsEffects } from './searchs.effect';
import { AuthEffects } from './auth.effect';

export const EFFECTS = [
  EffectsModule.run(PatientEffects),
  EffectsModule.run(SessionsEffects),
  EffectsModule.run(StoreEffects),
  EffectsModule.run(StoreActionsEffects),
  EffectsModule.run(DiaryEffects),
  EffectsModule.run(MessagesEffects),
  EffectsModule.run(PaymentsEffects),
  EffectsModule.run(BackupEffects),
  EffectsModule.run(PatientsEffects),
  EffectsModule.run(AppointmentsEffects),
  EffectsModule.run(SearchsEffects),
  EffectsModule.run(AuthEffects),
];

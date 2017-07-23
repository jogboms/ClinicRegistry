import { EffectsModule } from '@ngrx/effects';

import { BootEffects } from "./boot.effect";
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

export const EFFECTS = EffectsModule.forRoot([
	PatientEffects,
	SessionsEffects,
	StoreEffects,
	StoreActionsEffects,
	DiaryEffects,
	MessagesEffects,
	PaymentsEffects,
	BackupEffects,
	PatientsEffects,
	AppointmentsEffects,
	SearchsEffects,
	AuthEffects,
	BootEffects, // Should always remain last https://github.com/ngrx/platform/issues/103#issuecomment-316813618
]);

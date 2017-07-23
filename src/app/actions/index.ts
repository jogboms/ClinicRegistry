export * from './boot.action';
export * from './auth.action';
export * from './sort.action';
export * from './backup.action';
export * from './diary.action';
export * from './messages.action';
export * from './store.action';
export * from './filter.action';
export * from './searchs.action';
export * from './patient.action';
export * from './patients.action';
export * from './payments.action';
export * from './sessions.action';
export * from './appointments.action';

import { BootActions } from './boot.action';
import { AuthActions } from './auth.action';
import { SortActions } from './sort.action';
import { BackupActions } from './backup.action';
import { StoreActions } from './store.action';
import { DiaryActions } from './diary.action';
import { MessagesActions } from './messages.action';
import { FilterActions } from './filter.action';
import { SearchsActions } from './searchs.action';
import { PatientActions } from './patient.action';
import { PatientsActions } from './patients.action';
import { PaymentsActions } from './payments.action';
import { SessionsActions } from './sessions.action';
import { AppointmentsActions } from './appointments.action';

export const ACTIONS = [
  SortActions,
  BackupActions,
  StoreActions,
  MessagesActions,
  DiaryActions,
  FilterActions,
  PatientActions,
  PatientsActions,
  SessionsActions,
  PaymentsActions,
  SearchsActions,
  AppointmentsActions,
  AuthActions,
  BootActions,
];


export * from './auth.service';
export * from './patients.service';
export * from './patients.service';
export * from './diary.service';
export * from './messages.service';
export * from './store.service';
export * from './storeAction.service';
export * from './operations.service';
export * from './backup.service';

import { AuthService } from './auth.service';
import { PatientsService } from './patients.service';
import { PaymentsService } from './payments.service';
import { StoreService } from './store.service';
import { StoreActionService } from './storeAction.service';
import { MessagesService } from './messages.service';
import { DiaryService } from './diary.service';
import { SessionsService } from './sessions.service';
import { OperationsService } from './operations.service';
import { BackupService } from './backup.service';

export const SERVICES = [
  AuthService,
  SessionsService,
  StoreActionService,
  StoreService,
  MessagesService,
  DiaryService,
  PaymentsService,
  PatientsService,
  OperationsService,
  BackupService
];

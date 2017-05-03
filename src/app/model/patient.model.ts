import { SessionModel } from './session.model';
import { PaymentModel } from './payment.model';

export interface PatientModel {
  id?: string;
  x: number;
  y: number;
  z: string;
  i: number;
  title: string;
  surname: string;
  names: string;
  patient_id: string;
  telephone: string;
  referral: string;
  age: number;
  cost: number;
  color: string;
  gender: string;
  created: Date;
  updated: Date;
  sessions: SessionModel[];
  payments: PaymentModel[];
  _bg_text_?: string;
  deposit: number;
  remaining: number;
  completed: boolean;
  length: number;
  vip: boolean;
  status: boolean;
}


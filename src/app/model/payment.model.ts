export interface PaymentModel {
  id: string;
  date: Date;
  payment: number;
  comment: string;
  patient_id: string;
  month: number;
  year: number;
  completed: boolean;
  status: boolean;
}

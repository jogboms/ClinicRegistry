import { StoreActionModel } from './storeAction.model';

export interface StoreItemModel {
  id?: string;
  title: string;
  stock: number;
  cost: number;
  description: string;
  date: Date;
  actions: StoreActionModel[];
  last_action: number;
}

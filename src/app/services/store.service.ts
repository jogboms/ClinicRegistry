import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { StoreItemModel } from 'app/model/storeItem.model';
import { StoreActionModel } from 'app/model/storeAction.model';

import { StoreDB } from "../storage/clinicreg";

@Injectable()
export class StoreService {

  count(): number {
    return StoreDB.count();
  }

  fetch(): Observable<StoreItemModel[]> {
    return StoreDB.getPersistedData();
  }

  edit(store): StoreItemModel {
    StoreDB.update({id: store.id}, { date: store.date, store: store.store, status: true });
    return store;
  }

  remove(store): StoreItemModel {
    StoreDB.remove({ id: store.id });
    return store;
  }

  create(store): StoreItemModel {
    let p = StoreDB.upsert(store);
    return p.result[0];
  }

  persist() {
    StoreDB.save();
  }
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { StoreActionModel } from 'app/model/storeAction.model';

import { StoreActionDB } from "../storage/clinicreg";

@Injectable()
export class StoreActionService {

  count(): number {
    return StoreActionDB.count();
  }

  fetch(): Observable<StoreActionModel[]> {
    return StoreActionDB.getPersistedData();
  }

  edit(store): StoreActionModel {
    // StoreActionDB.update({id: store.id}, { date: store.date, store: store.store, status: true });
    return store;
  }

  remove(store): StoreActionModel {
    StoreActionDB.remove({ id: store.id });
    return store;
  }

  create(action): StoreActionModel {
    let p = StoreActionDB.insert(action);
    // console.log(p)
    return p.inserted[0];
    // let p = StoreActionDB.upsert(action);
    // return p.result[0];
  }

  persist() {
    StoreActionDB.save();
  }
}

import { Injectable } from "@angular/core";
import { Store, Action } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/Rx";

import {AppState} from 'app/reducers';

@Injectable()
export class OperationsService {
  operations$ = new BehaviorSubject<any>([]);

  constructor(private store: Store<AppState>) {
  }

  op(operation){
    this.operations$.next(operation);;
  }
}

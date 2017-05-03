import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
// import "rxjs/Rx";

import { AdminsDB } from "../storage/clinicreg";

const PRIVATE_AUTH_KEY = 'jerian';
declare const sessionStorage;

@Injectable()
export class AuthService {

  is_logged(): Observable<{ logged: boolean, admin: boolean }> {
    return Observable.of({ logged: sessionStorage.hasOwnProperty('login'), admin: sessionStorage.hasOwnProperty('admin') });
  }

  login(input): Observable<{ logged: boolean, admin: boolean }> {
    const res = AdminsDB.find({ username: input.username, password: input.password });

    if(res.length == 0) {
      return Observable.of({ logged: false, admin: false });
    }

    if(res[0].admin == true) {
      sessionStorage.setItem('admin', true);
    }

    sessionStorage.setItem('login', true);
    return Observable.of({ logged: true, admin: res[0].admin == true });
  }

  logout(): void {
    delete sessionStorage.login;
    delete sessionStorage.admin;
  }

  create(input): Observable<number> {
    const username = input.username;
    const password = input.password;
    const admin = input.admin;

    if(input.key !== PRIVATE_AUTH_KEY){
      return Observable.of(-1);
    }

    if(AdminsDB.data().length >= 2){
      return Observable.of(-2);
    }

    let a = AdminsDB.find({ username });

    if(!a.length){
      AdminsDB.insert({ username, password, admin })
      AdminsDB.save();
      return Observable.of(1);
    }
    return Observable.of(0);
  }

  fetch(key) {
    if(key == PRIVATE_AUTH_KEY) {
      return Observable.of(0).map(() => AdminsDB.data());
    }
    return Observable.of([]);
  }

  edit(update): Observable<number> {
    let a = AdminsDB.find({ username: update.username });

    if(a.length && a[0].id != update.id){
      return Observable.of(0);
    }

    AdminsDB.update({ id: update.id }, update);
    AdminsDB.save();
    return Observable.of(1);
  }

  delete(id) {
    AdminsDB.remove({ id });
    AdminsDB.save();
  }
}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder} from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState, getLogged } from 'app/reducers';
import { AuthActions } from 'app/actions/auth.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Window } from 'app/nw/main';

import { BackupService } from 'app/services/backup.service';

import { DB } from 'app/storage/db';


declare const $; // jQuery
declare const fs; // node.js filesystem module
window['NW'] = Window; // node-webkit window object

@Component({
  selector: 'main',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  IS_LOGGED: boolean = true;
  backup: boolean = false;
  uploading: boolean = false;
  downloading: boolean = false;
  downloading_success: boolean = false;
  uploading_success: boolean = false;
  Window = Window;
  filename: string;
  title: string = Window.App.name;
  formBackup: FormGroup;
  formRestore: FormGroup;
  Sub: Subscription;

  onLogout = () => this.store.dispatch(this.authActions.logout());

  onBack = () => this._location.back();

  onForward = () => this._location.forward();

  constructor(
    _form: FormBuilder,
    private store: Store<AppState>,
    private authActions: AuthActions,
    private _backup: BackupService,
    private _location: Location,
    ) {

    this.formBackup = _form.group({ file: '' })
    this.formRestore = _form.group({ file: '', submit: false })

    this.Sub = this.store.let(getLogged()).subscribe(state => this.IS_LOGGED = !!state)
  }

  ngOnInit() {
    // Backup process
    this.formBackup.valueChanges
      .do(() => this.downloading = true)
      .map(values => values.file[0].path)
      .flatMap((path: string) => Observable.combineLatest(this._backup.out(), Observable.of(path)))
      .map(([data, path]) => fs.writeFile(path, data, 'utf8'))
      .delay(1000)
      .do(() => {
        this.downloading = false;
        this.downloading_success = true;
      })
      .delay(1500)
      .subscribe(() => {
        $('#myModal_backup').modal('hide');
        this.backup = false ;
        this.downloading_success = false;
      })

    // Restore process
    this.formRestore.valueChanges
      .do(() => this.uploading = true)
      .filter(values => values.submit)
      // .map(() => {
      //   let f = DB;
      //   // console.log(f);
      //   return [f, 'a'] //a || r
      // })
      .flatMap(values => Observable.of(fs.readFileSync(values.file[0].path, 'utf8')))
      .delay(1000)
      .flatMap(contents => this._backup.in(contents))
      .do(status => {
        this.uploading = false;
        this.uploading_success = !!status;
      })
      .delay(1500)
      .subscribe(() => {
        $('#myModal_restore').modal('hide');
        this.uploading_success = false;
      })
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }

  onBackup() {
    /** @TODO remove next line after test */
    // this.formBackup.patchValue({ file: { files: [[ 'file.db' ]] } });
    // this._backup.out().subscribe(data => {
    //   console.log(data);
    // })

    this.backup = true;
    const d = new Date();
    const append = d.getFullYear()+'_'+(d.getMonth()+1)+'_'+d.getDate()+'_'+d.getHours()+d.getMinutes()+d.getSeconds();
    this.filename = this.Window.App.name+'_'+append+'_backup.db';
  }
}

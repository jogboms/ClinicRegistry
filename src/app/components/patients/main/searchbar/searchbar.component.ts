import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  moduleId: module.id,
  selector: 'patients-searchbar',
  templateUrl: './searchbar.html',
  styles: [`
    :host { display: block }
    .btn-fab { position: absolute; bottom: 15%; right: 5%; z-index: 9999; transform: scale(1.35); }
    .nav { background: white; padding: 1rem 1.5rem; }
    .form-group { display: inline-block; }
    .nav li { display: inline-block; }
    .nav li a { display: inline-block; }
    .nav li strong { font-size: 2rem; font-weight: 400; vertical-align: -webkit-baseline-middle; }
    .nav li form .form-group:first-of-type { vertical-align: -webkit-baseline-middle; }
    button.active { border: 1px solid #9E9E9E; background: white; }
  `],
})
export class PatientsSearchBar {
  form: FormGroup;
  searching: boolean = false;
  switcher: boolean = true;
  disabled: { 
    alpha_asc?: boolean, 
    alpha_desc?: boolean,
    date_asc?: boolean, 
    date_desc?: boolean, 
    updated_asc?: boolean, 
    updated_desc?: boolean }  = {};
  @Input() count: number = 0;
  @Output() sort = new EventEmitter<any>();
  @Output() filter = new EventEmitter<{month: number, year: number}>();
  @Output() search = new EventEmitter<{type: string, value: string}>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private _form: FormBuilder) {}

  ngOnInit() {
    this.form = this._form.group({ id: '', name: '', month: new Date() });

    const filter$ = this.form.controls['month'].valueChanges
      .map(date => date.split('-'))
      .map(([year, month]) => [parseInt(month), parseInt(year)])
      .do(([month, year]) => this.filter.emit({ month, year }))
      .subscribe()

    const id$ = this.form.controls['id'].valueChanges
      .map(value => ({ type: 'id', value: value.trim() }))
    const name$ = this.form.controls['name'].valueChanges
      .map(value => ({ type: 'key', value: value.trim() }))

    Observable.merge(id$, name$)
      .debounceTime(500)
      .filter(search => search.value.length > 2)
      .do(() => this.searching = true)
      .subscribe(search => this.search.emit(search))
  }

  onSwitch() {
    this.switcher = !this.switcher;
  }

  onSort(type) {
    var emit = type;
    if(this.disabled[type] == true) {
      switch (type.split('_')[0]) {
        case "alpha":
          emit = 'alpha_cancel';
          break;
        case "date":
          emit = 'date_cancel';
          break;
        case "updated":
          emit = 'updated_cancel';
          break;
      }
    }
    this.disabled[type] = !this.disabled[type];
    this.sort.emit(emit);
  }

  onCancel() {
    this.searching = false
    this.form.patchValue({ id: '', name: '' })
    this.cancel.emit()
  }
}


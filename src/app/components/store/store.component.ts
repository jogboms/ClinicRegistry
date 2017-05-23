import { Component } from "@angular/core";
import { trigger} from "@angular/animations";
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { AppState, getLogged, getAdmin, getStoreData } from 'app/reducers';

import { StoreItemModel } from 'app/model/storeItem.model';
import { StoreActions } from 'app/actions/store.action';
import { SlideUpLeft, SlideUpDown, SlideLeftRight } from 'app/animation';

@Component({
  selector: 'store',
  templateUrl: './store.html',
  styleUrls: ['./store.scss'],
  animations: [
    trigger('toggle1', [...SlideUpLeft]),
    trigger('toggle2', [...SlideLeftRight])
  ],
})
export class StoreComponent {
  form: FormGroup;
  items$: Observable<StoreItemModel[]>;
  IS_LOGGED$: Observable<boolean>;
  IS_ADMIN$: Observable<boolean> = Observable.of(false);
  showCreate: boolean = false;

  constructor(
    private store: Store<AppState>,
    private _form: FormBuilder,
    private storeActions: StoreActions
    ) {
    this.IS_LOGGED$ = this.store.let(getLogged());
    this.IS_ADMIN$ = this.store.let(getAdmin());
    this.items$ = this.store.let(getStoreData());
  }

  ngOnInit(){
    this.form = this._form.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      stock: [0, Validators.required],
      cost: [0, Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  ngOnDestroy() { }

  onSubmit(e){
    this.store.dispatch(this.storeActions.create(this.form.value));

    // this.showCreate = true;

    e.preventDefault()
  }

  onCancel(e){
    this.showCreate = !this.showCreate;
    e.preventDefault()
  }

  onDelete(item) {
    this.store.dispatch(this.storeActions.remove(item));
  }
}

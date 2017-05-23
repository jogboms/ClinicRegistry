import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { trigger} from "@angular/animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getStoreActionData, getStoreItemData } from 'app/reducers';
import { StoreActions } from 'app/actions/store.action';

import { StoreItemModel } from 'app/model/storeItem.model';
import { SlideUpDown, SlideLeftRight } from 'app/animation';

@Component({
  selector: 'store-item',
  templateUrl: './item.html',
  animations: [
    trigger('toggle1', [...SlideUpDown]),
    trigger('toggle2', [...SlideLeftRight])
  ],
  styleUrls: ['./item.scss']
})
export class StoreItem implements OnInit, OnDestroy, AfterViewInit {
  form: FormGroup;
  item_id: string;
  item$: Observable<StoreItemModel>;
  showCreate: boolean = false;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private _form: FormBuilder,
    private storeActions: StoreActions
    ){}

  ngOnInit(){
    this.item$ = this.route.params.map(params => this.item_id = params.item)
      .do(id => this.store.dispatch(this.storeActions.select(id)))
      .switchMap(id => this.store.let(getStoreItemData()))
  }

  ngAfterViewInit() {
    this.form = this._form.group({
      type: [1, Validators.required],
      comment: [''],
      item_id: [this.item_id],
      stock: [0, Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  ngOnDestroy() {
  }

  onSubmit(e){
    this.store.dispatch(this.storeActions.create_action(this.form.value));

    // this.showCreate = true;

    e.preventDefault()
  }

  onCancel(e){
    this.showCreate = !this.showCreate;
    e.preventDefault()
  }

}

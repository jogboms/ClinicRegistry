import { Component } from "@angular/core";

import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { getPatientsData, getPatientsDataSorted } from 'app/reducers';
import { getSorter, getAdmin } from 'app/reducers';
import { PatientActions, SearchsActions, FilterActions, SortActions } from 'app/actions';
import { PatientModel } from 'app/model/patient.model';

import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'patients-main-container',
  template: `
    <div class="container">
      <patients-searchbar
        [count]="isSearching ? total : count"
        (cancel)="onSearchCancel()"
        (search)="onSearch($event)"
        (filter)="onFilter($event)"
        (sort)="onSort($event)"
       ></patients-searchbar>

      <h5 [hidden]="isSearching == false">
        <small>Searching:</small> {{searchkey}}
        <small class="pull-right">({{count}} results)</small>
      </h5>

      <br />
      
      <ng-template #loadingEl>
        <div class="text-center">
          <br /><br /><br />
          <progress-bar></progress-bar>
        </div>
      </ng-template>
      
      <div *ngIf="patients$ | async as patients; else loadingEl">
        <patients-main (delete)="onDelete($event)" [patients]="patients" [IS_ADMIN]="IS_ADMIN$ | async" ></patients-main>
      </div>
    </div>
  `,
})
export class PatientsMainContainer {
  patients$: Observable<PatientModel[]>;
  total: number = 0;
  count: number = 0;
  searchkey: string;
  isSearching: boolean = false;
  IS_ADMIN$: Observable<boolean>;

  onSort = (type) => this.store.dispatch(this.sortActions[type]());

  onFilter = ({month, year}) => this.store.dispatch(this.filterActions.month(month, year));

  onSearchCancel = () => this.store.dispatch(this.searchsActions.cancel());

  constructor(
    private store: Store<AppState>,
    private sortActions: SortActions,
    private filterActions: FilterActions,
    private patientActions: PatientActions,
    private searchsActions: SearchsActions,
    ){
      this.IS_ADMIN$ = store.let(getAdmin());
    }

  ngOnInit(){
    const sort$ = this.store.let(getSorter());
    const filter$ = this.store.select(state => state.filter);
    const searchs$ = this.store.select(state => state.searchs);
    const patients$ = this.store.let(getPatientsData());

    this.patients$ = Observable.combineLatest(patients$, searchs$, filter$, sort$)
      .map(([patients, searchs, filter, sort]) => {
        this.total = patients.length;
        const data = (this.isSearching = searchs.searching) ? searchs.patients : patients;
        return data.filter(filter).sort(sort);
      })
      .do(data => this.count = data.length)

  }

  ngOnDelete() {
  }

  onDelete(id){
    if(confirm(`Are you sure you wish to remove all records including Payments & Sessions?`)){
      this.store.dispatch(this.patientActions.delete(id));
    }
  }

  onSearch(search){
    this.searchkey = search.value;

    this.store.dispatch(this.searchsActions.search(search))
  }
}

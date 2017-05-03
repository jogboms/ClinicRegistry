import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/Rx";
declare const ForerunnerDB;

type DB = any;
type Collection = any;

export default class NgDB {
  private DB: DB;
  private datas: { [name: string]: any } = {};
  private dbs: { [name: string]: Collection } = {};
  private takes: Observable<{ [name: string]: Collection }>[] = [];
  private Subject = new Subject<{ name: string, data: Collection }>();
  private message = col => console.log('%cNgDB%c: `'+col.name+'` - ('+col.data.length+')', 'color: green;', 'color: #666;');

  constructor(dbname: string) {
    this.DB = (new ForerunnerDB()).db(dbname)
  }

  getDb(): DB {
    return this.DB;
  }

  setCollection(name: string, config: Object = {}): Collection {
    const sub = this.Subject.filter(d => d.name == name);
    this.takes.push(sub.take(1));
    this.datas[name] = sub.map(d => d.data);
    this.dbs[name] = this.DB.collection(name, config);

    // Get Persisted data from collection  
    this.dbs[name].getPersistedData = () => this.getCollectionData(name);

    return this.dbs[name];
  }

  getCollection(name: string): Collection {
    return this.dbs[name];
  }

  getCollectionData(name: string): Observable<any> {
    return this.datas[name];
  }

  loadPersistedData(): void {
    // Display Initialization message on loaded data
    Observable.merge(...this.takes).subscribe(this.message);
    // Load all persisted data from DB
    Object.keys(this.dbs).forEach(name => {
      this.dbs[name].load(() => this.Subject.next({ name, data: this.dbs[name].data() }));
    });
  }
}

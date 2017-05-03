import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { DiaryModel } from 'app/model/diary.model';

import { DiaryDB } from "../storage/clinicreg";

@Injectable()
export class DiaryService {

  count(): number {
    return DiaryDB.count();
  }

  fetch(): Observable<DiaryModel[]> {
    return DiaryDB.getPersistedData();
  }

  edit(diary): DiaryModel {
    DiaryDB.update({id: diary.id}, { date: diary.date, diary: diary.content, status: true });
    return diary;
  }

  remove(diary): DiaryModel {
    DiaryDB.remove({ id: diary.id });
    return diary;
  }

  create(diary): DiaryModel {
    let p = DiaryDB.upsert(diary);
    return p.result[0];
  }

  persist() {
    DiaryDB.save();
  }
}

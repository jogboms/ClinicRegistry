import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { BootActions } from "app/actions";

@Injectable()
export class BootEffects {

	// Initiate an App boot other @Effects can listen to
	@Effect() init$ = Observable.defer(() => Observable.of(new BootActions));
}

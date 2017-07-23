import { Action } from "@ngrx/store";

export const BOOT = '[BOOT]';

export class BootActions implements Action {
	readonly type = BOOT;
}

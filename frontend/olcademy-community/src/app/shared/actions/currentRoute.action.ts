import { Action } from '@ngrx/store';
import { CurrentRoute } from '../services/currentRoute.model';

export const SAVE_CURRENT_ROUTE = "[CurrentRoute] Save";

export class SaveCurrentRoute implements Action {
readonly type = SAVE_CURRENT_ROUTE ; 

constructor(public payload: CurrentRoute) {}
}

export type CurrentRouteActions = SaveCurrentRoute;
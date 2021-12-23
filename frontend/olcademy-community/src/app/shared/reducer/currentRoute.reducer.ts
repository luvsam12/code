import { CurrentRoute } from '../services/currentRoute.model';
import * as fromCurrentRoute from "../actions/currentRoute.action";



export function currentRouteReducer(
  state: CurrentRoute[] = [], 
  action: fromCurrentRoute.CurrentRouteActions
) {
  switch (action.type) {
    //saving assessment details
    case fromCurrentRoute.SAVE_CURRENT_ROUTE: {
      return [...state, action.payload];
    }
    //default empty
    default:
      return state;
  }
}

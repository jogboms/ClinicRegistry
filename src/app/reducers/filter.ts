import { FilterActions } from '../actions/filter.action';
import { PatientModel } from 'app/model/patient.model';
import { filter as F } from 'app/utils/filter';

import { Action } from 'app/reducers';

export type FilterState = (a:any) => number|boolean;

const initialState: FilterState = () => true;

// Reducer
export function filter(state = initialState, {type, payload}: Action): FilterState {
  switch (type) {
    case FilterActions.MONTH: {
      return (patient:PatientModel) => {
        if(!!payload.month == false) return true;

        return (patient.x == payload.month && patient.y == payload.year);
        // return F(patient.created, payload.month, payload.year);
      }
    }

    default: return state;
  }
};

import {  FETCH_MODEL,
          DEVICE_REMOVED,
          DEVICE_NOT_SUPPORTED,
          RESET_SEARCH } from '../utils/constants';


const DEFAULT_DROPDOWN_VALUE = {model_id: 0, vehicle_model:"Select Model..."};

export default function(state = {list: [DEFAULT_DROPDOWN_VALUE]}, action){
  switch (action.type){
    case FETCH_MODEL:
      //return state.concat([ action.payload.data ]);
      //or (same crete new array). NEVER!!!!! mutate array
      return {list: [DEFAULT_DROPDOWN_VALUE, ...action.payload.data]};
    case RESET_SEARCH:
      return {list: [DEFAULT_DROPDOWN_VALUE]};
    case DEVICE_REMOVED:
      return {list: [DEFAULT_DROPDOWN_VALUE]};
    case DEVICE_NOT_SUPPORTED:
      return {list: [DEFAULT_DROPDOWN_VALUE]};
  }
  return state;
}

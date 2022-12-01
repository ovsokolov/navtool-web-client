import {  FETCH_MAKE,
          FETCH_MODEL,
          FETCH_YEAR, SET_YEAR,
          FETCH_SOFTWARE ,
          DEVICE_REMOVED, 
          DEVICE_MFG_ID_RECIEVED,
          SET_TRANSMISSION_TYPE,
          SET_SOFTWARE ,
          DEVICE_NOT_SUPPORTED,
          RESET_SEARCH } from '../utils/constants';


const DEFAULT_STATE = {mfg_id: '', vehicle_make: '', vehicle_model: '', vehicle_year: '', sw_id: '', sw_valid_status: 1, automatic_transmission: 1};

export default function(state = JSON.parse(JSON.stringify(DEFAULT_STATE)), action){
  let result = {};
  switch (action.type){
    case DEVICE_MFG_ID_RECIEVED:
    case FETCH_MAKE:
      //return state.concat([ action.payload.data ]);
      //or (same crete new array). NEVER!!!!! mutate array
      result = Object.assign({}, state, {mfg_id: action.payload.mfg_id, vehicle_make: '', vehicle_model: '', vehicle_year: '', automatic_transmission: 1});
      return result;
    case FETCH_MODEL:
      //return state.concat([ action.payload.data ]);
      //or (same crete new array). NEVER!!!!! mutate array
      result = Object.assign({}, state, {vehicle_make: action.payload.vehicle_make, vehicle_model: '', vehicle_year: '', automatic_transmission: 1});
      //console.log(result);
      return result;
    case FETCH_YEAR:
      //return state.concat([ action.payload.data ]);
      //or (same crete new array). NEVER!!!!! mutate array
      result = Object.assign({}, state, {vehicle_model: action.payload.vehicle_model, vehicle_year: '', automatic_transmission: 1});
      //console.log(result);
      return result;
    case SET_TRANSMISSION_TYPE:
      //return state.concat([ action.payload.data ]);
      //or (same crete new array). NEVER!!!!! mutate array
      result = Object.assign({}, state, {automatic_transmission: action.payload});
      //console.log(result);
      return result;
    case SET_YEAR:
      //return state.concat([ action.payload.data ]);
      //or (same crete new array). NEVER!!!!! mutate array
      //console.log("Software reducer");
      result = Object.assign({}, state, {vehicle_year: action.payload});
      //console.log(result);
      return result;
    case FETCH_SOFTWARE:
      result = Object.assign({}, state, {sw_id: ''});
      //console.log(result);
      return result;      
    case SET_SOFTWARE:
      //return state.concat([ action.payload.data ]);
      //or (same crete new array). NEVER!!!!! mutate array
      console.log("********* Software Search Reducer SET_SOFTWARE !!**********");
      result = Object.assign({}, state, {sw_id: action.payload.software_id});
      console.log(result);
      return result;
    case RESET_SEARCH:
      result = Object.assign({}, state, {vehicle_make: 0, vehicle_model: '', vehicle_year: '', automatic_transmission: 1});
      return result;
    case DEVICE_REMOVED:
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    case DEVICE_NOT_SUPPORTED:
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
  return state;
}

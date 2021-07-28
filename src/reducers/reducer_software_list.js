import { FETCH_SOFTWARE, DEVICE_REMOVED, DEVICE_NOT_SUPPORTED, RESET_SEARCH} from '../utils/constants';



export default function(state = [], action){
  switch (action.type){
    case FETCH_SOFTWARE:
      //return state.concat([ action.payload.data ]);
      //or (same crete new array). NEVER!!!!! mutate array
      return action.payload;
    case RESET_SEARCH:
        return [];
    case DEVICE_REMOVED:
      return [];
    case DEVICE_NOT_SUPPORTED:
      return [];
  }
  return state;
}
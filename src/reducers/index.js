import { combineReducers } from 'redux';
import DeviceSettingsReducer from './reducer_device_settings'
import SoftwareUpdateReducer from './reducer_sofrtware_update'
import SoftwareListReducer from './reducer_software_list'
import CarMakeReducer from './reducer_make'
import CarModelReducer from './reducer_model'
import CarYearReducer from './reducer_year'
import SoftwareSearchReducer from './reducer_software_search'
import Messages from './reducer_messages'

const rootReducer = combineReducers({
  //state: (state = {}) => state
  system_settings: DeviceSettingsReducer,
  software_list: SoftwareListReducer,
  software_update: SoftwareUpdateReducer,
  car_make: CarMakeReducer,
  car_model: CarModelReducer,
  car_year: CarYearReducer,
  software_search: SoftwareSearchReducer,
  messages: Messages
});

export default rootReducer;

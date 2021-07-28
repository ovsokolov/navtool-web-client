import axios from 'axios';
/*
import { fetchMake } from './get_make';
import { clearSBL } from './hid_action';
import { fetchOBDConfig} from './get_obdconfig'
*/
import { WEB_SERVICES_URL } from '../utils/constants';
import { OBD_COMPLETED } from '../utils/constants';
import { DEVICE_OBD_SUCCESS, DEVICE_OBD_FAILED } from '../utils/constants';
import { DEVICE_SUPPORTED, DEVICE_NOT_SUPPORTED, DEVICE_START_SECTOR, FETCH_DEVICE_DB_DATA } from '../utils/constants';

import { fetchSoftwareDescription, fetchMake } from './get_software';
//const ROOT_URL = "https://tranquil-mesa-29755.herokuapp.com/";
const ROOT_URL = WEB_SERVICES_URL + "/v1/navtooldevices/";


export function fetchDeviceDBData(deviceSettings){

  //console.log('URL', url);

  return (dispatch) => {
    const url = ROOT_URL + deviceSettings.serialNumber;
    const request = axios.get(url);
    request.then( ({data}) =>{
      console.log("fetchDeviceDBData")
      console.log(data);
      //console.log(data["mfg_id"])
      console.log("fetchDeviceDBData")
      //console.log(serial_number);
      dispatch( { type: FETCH_DEVICE_DB_DATA, payload: {'mfgId': data.mfg_id, 'carMake': data.vehicle_make, 'carModel': data.vehicle_model} } )
      dispatch(fetchSoftwareDescription(data.mfg_id,data.sw_id,data.sw_build,data.vehicle_make,data.vehicle_model))
      dispatch(fetchMake(data.mfg_id));
    });
  };
}

export function updateDeviceDBData(serial_number, update_data){
  console.log('@@@@@@@@@@@@updateDeviceDBData@@@@@@@@@@@@@');
  console.log(update_data);
  console.log('@@@@@@@@@@@@updateDeviceDBData@@@@@@@@@@@@@');
  const url = ROOT_URL + serial_number;
  
  const request = axios.put(url, {
    sw_id: update_data.sw_id,
    sw_build: update_data.sw_build,
    vehicle_make: update_data.vehicle_make,
    vehicle_model: update_data.vehicle_model
  });
  /*
  const request = axios.put(url, {
    sw_id: 1,
    sw_build: 1,
    vehicle_make: 'XXXX',
    vehicle_model: 'YYYYY   '
  });
  */
  //console.log('URL', url);

  return (dispatch) => {
    request.then( ({data}) =>{
      console.log(data);
      console.log(data["mfg_id"])
      dispatch( { type: FETCH_DEVICE_DB_DATA, payload: {'mfgId': data.mfg_id, 'carMake': data.vehicle_make, 'carModel': data.vehicle_model} } )
      dispatch(fetchSoftwareDescription(data.mfg_id,data.sw_id,data.sw_build,data.vehicle_make,data.vehicle_model))
    });
  };
}

export function updateDeviceOBDData(serial_number, obd_status){
  if(obd_status == DEVICE_OBD_SUCCESS){
    const url = WEB_SERVICES_URL + '/v1/obdupdate/' + "?mcu_id=" + serial_number;
    const request = axios.get(url);

    //console.log('OBD MCU ', serial_number);

    return (dispatch) => {
      request.then( ({data}) =>{
        //console.log(data);
        //console.log(data["mfg_id"])
        dispatch( { type: OBD_COMPLETED, payload: 'Programming Completed' } )
        dispatch(fetchDeviceDBData(serial_number))
      });
    };
  }else{
    return { 
      type: OBD_COMPLETED, 
      payload: 'Programming Failed' 
    }; 
  }
}

export function checkDeviceSupport(mfg_id){
    const url = WEB_SERVICES_URL + '/v1/navtoolhws/' + "?mfg_id=" + mfg_id;
    const request = axios.get(url);

    return (dispatch) => {
      request.then( ({data}) =>{
        //console.log("checkDeviceSupport");
        //console.log(data[0]["hw_hid"]);
        if(data[0]["hw_hid"] == 1 || data[0]["hw_hid"] == 2){
          //console.log("Supported");
          dispatch( { type: DEVICE_SUPPORTED, payload: data[0] } )
        }else{
          //console.log("Not Supported");
          dispatch( { type: DEVICE_NOT_SUPPORTED, payload: '' } )
        }
      });
    };

}

export function checkDeviceStartSector(mfg_id){
    const url = WEB_SERVICES_URL + '/v1/navtoolhws/' + "?mfg_id=" + mfg_id;
    const request = axios.get(url);

    return (dispatch) => {
      request.then( ({data}) =>{
        //console.log("checkDeviceStartSector");
        //console.log("Supported");
        dispatch( { type: DEVICE_START_SECTOR, payload: data[0] } )
      });
    };

}
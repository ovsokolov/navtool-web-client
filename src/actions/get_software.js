import axios from 'axios';
import { WEB_SERVICES_URL } from '../utils/constants';

import {    FETCH_SOFTWARE, 
            SET_SOFTWARE, 
            SET_SOFTWARE_DESCRIPTION,
            FETCH_MAKE,
            FETCH_MODEL,
            FETCH_YEAR,
            SET_YEAR,
            SET_TRANSMISSION_TYPE,
            RESET_SEARCH } from '../utils/constants';

//const ROOT_URL = "https://tranquil-mesa-29755.herokuapp.com/navtoolsws/make";
const ROOT_URL = WEB_SERVICES_URL + "/v1/navtoolsws";

export function fetchSoftware(mfg_id, vehicle_make, vehicle_model, vehicle_year, automatic_transmission){
  let param_url = "?mfg_id=" + mfg_id + "&sw_active=1";
  if(vehicle_make != null && vehicle_make != 0){
    param_url += "&vehicle_make=" + vehicle_make;
  }
  if(vehicle_model != null && vehicle_model != 0){
    param_url += "&vehicle_model=" + vehicle_model;
  }
  if(vehicle_year != null && vehicle_year != 0){
    param_url += "&vehicle_year=" + vehicle_year;
  }
  if(automatic_transmission == null || automatic_transmission == "0"){
    param_url += "&manual_transmission=1";
  }
  const url = ROOT_URL + param_url;
  const request = axios.get(url);

  console.log('URL', url);

  return (dispatch) => {
    request.then( ({data}) =>{
      //console.log(data);
      dispatch( { type: FETCH_SOFTWARE, payload: data } );
    });
  };
}

export function fetchSoftwareDescription(mfg_id,sw_id, sw_build, vehicle_make, vehicle_model){
  let param_url = "/sw?mfg_id=" + mfg_id + "&sw_id=" + sw_id + "&sw_build=" + sw_build + "&vehicle_make=" + vehicle_make + "&vehicle_model=" + vehicle_model; 

  const url = ROOT_URL + param_url;
  const request = axios.get(url);
  console.log(url);
  //console.log('fetchSoftwareConfig URL', url);

  return (dispatch) => {
    request.then( ({data}) =>{
        console.log("fetchSoftwareConfig data");
        console.log(data);
        console.log("fetchSoftwareConfig data");
        var sw_config = data[0];
        console.log(sw_config);
        if(sw_config != undefined){
            dispatch( { type: SET_SOFTWARE_DESCRIPTION, payload: { softwareId: sw_id, softwareBuild:sw_build, softwareDescription: sw_config["sw_description"], softwareYears: sw_config["vehicle_year_from"] + "-" + sw_config["vehicle_year_to"],} });
        }
    });
  };
}

export function setSoftware(software_id, mcu_type){
  let payload_data = {software_id, mcu_type};
  return {
    type: SET_SOFTWARE,
    payload: payload_data
  };
}

export function fetchMake(mfg_id){
    //console.log("In fetchMake ", mfg_id);
    const url = ROOT_URL + "/make?mfg_id=" + mfg_id;
    const request = axios.get(url);
  
    console.log('URL', url);
  
    return (dispatch) => {
      request.then( ({data}) =>{
        //console.log(data);
        data.sort((a, b) => a.make_id.localeCompare(b.make_id));
        let payload_data = {mfg_id, data};
        console.log("FETCH MAKE");
        console.log(mfg_id);
        console.log(data);
        dispatch( { type: FETCH_MAKE, payload: payload_data } );
      });
    };
}

export function fetchModel(mfg_id, vehicle_make){
    const url = ROOT_URL + "/model?mfg_id=" + mfg_id + "&vehicle_make=" + vehicle_make;
    const request = axios.get(url);
  
    console.log('URL', url);
  
    return (dispatch) => {
      request.then( ({data}) =>{
        console.log(data);
        data.sort((a, b) => a.model_id.localeCompare(b.model_id));
        let payload_data = {mfg_id, vehicle_make, data};
        dispatch( { type: FETCH_MODEL, payload: payload_data } );
      });
    };
}

export function fetchYear(mfg_id, vehicle_make, vehicle_model){
    //console.log('params: ', mfg_id, vehicle_make, vehicle_model);
  
    return (dispatch) => {
        let payload_data = {mfg_id, vehicle_make, vehicle_model};
        dispatch( { type: FETCH_YEAR, payload: payload_data } );
    };
}
  
export function setYear(vehicle_year){
    return {
      type: SET_YEAR,
      payload: vehicle_year
    };
}

export function setTransmissionType(type){
    return {
      type: SET_TRANSMISSION_TYPE,
      payload: type
    };
}

export function resetSearch(type){
    return {
      type: RESET_SEARCH,
      payload: ''
    };
}

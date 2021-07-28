export default function(state = {app_status: NO_DEVICE_STATUS, update_status: UPDATE_NOT_STARTED, obd_status: OBD_NOT_STARTED}, action){
    let result = {};
    /*
    switch (action.type){
      case DEVICE_APP_ARRIVED:
        result = Object.assign({}, state, {app_status: DEVICE_APP_STATUS});
        return result;
      case DEVICE_SBL_ARRIVED:
        result = Object.assign({}, state, {app_status: DEVICE_SBL_STATUS, update_status: UPDATE_READY});
        return result;     
      case START_SOFTWARE_UPDATE:
        result = Object.assign({}, state, {update_status: UPDATE_READY});
        return result;
      case DEVICE_REMOVED:
        return {app_status: NO_DEVICE_STATUS, update_status: UPDATE_NOT_STARTED};
      case DEVICE_NOT_SUPPORTED:
        return {app_status: NO_DEVICE_STATUS, update_status: UPDATE_NOT_STARTED};
      case REQUEST_SBL_FOR_UPDATE:
        result = Object.assign({}, state, {update_status: WAITING_FOR_SBL });
        return result;
      case REQUEST_REBOOT_AFTER_UPDATE:
        result = Object.assign({}, state, {update_status: WAITING_FOR_APP_UPDATE });
        return result;
      case REQUEST_DATA_SETUP:
        result = Object.assign({}, state, {update_status: UPDATE_IN_PROGRESS });
        return result;
      case COMPLETE_UPDATE_REQUEST:
        result = Object.assign({}, state, {update_status: UPDATE_NOT_STARTED });
        return result;
      case START_OBD_PROGRAMMING:
        //console.log("******* START_OBD_PROGRAMMING ******");
        result = Object.assign({}, state, {obd_status: OBD_IN_PROGRESS });
        //console.log(result);
        return result;
      case DEVICE_OBD_SUCCESS:
        result = Object.assign({}, state, {obd_status: DEVICE_OBD_SUCCESS });
        //console.log(result);
        return result;
      case DEVICE_OBD_FAILED:
        result = Object.assign({}, state, {obd_status: DEVICE_OBD_FAILED });
        //console.log(result);
        return result;
      case OBD_COMPLETED:
        result = Object.assign({}, state, {obd_status: OBD_NOT_STARTED });
        //console.log(result);
        return result;
      default:
        return state;
    }
    */
    return state;
  }
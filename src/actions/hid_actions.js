import {    DEVICE_DATA_MCU, 
            DEVICE_DATA_INPUT_SETTINGS, 
            DEVICE_REMOVED} from '../utils/constants';

import {    SET_UP_BULK_TRANSFER,
            START_TRANSFER,
            START_BULK_TRANSFER,
            BULK_UPDATE_IN_PROGRESS,
            BULK_UPDATE_SECTOR_VALIDATE,
            BULK_SECTOR_WRITE_IN_PROGRESS,
            BULK_SECTOR_WRITE,
            BULK_SECTOR_WRITE_RESULT,
            REQUEST_TRANSFER_START,
            UPDATE_PROGRESS_REPORT,
            DISPLAY_UPDATE_ERROR,
            DISPLAY_UPDATE_SUCCESS } from '../utils/constants';

import { SMALL_SECTOR_SIZE, HID_TRANSFER_SIZE } from '../utils/constants';
import { BL_WRITE_SUCCESS, BL_WRITE_FAILED } from '../utils/constants';
import { SUCCESS_SETTINGS_UPDATE, FAILED_SETTINGS_UPDATE } from '../utils/constants';

import {  setUpBulkTransferData,
          getBulkTransfterCheckSum,
          setUpBulkSectorWrite,
          getBulkWriteSectorResult,
          prepareInputSettings,
          getDeviceData,
          setUpTransferStart} from '../utils/device_utils';

import { fetchDeviceDBData  } from './get_device_data';

export function handleDeviceDataResult(deviceData){
    let action;
    let subAction; 
    let result;
    return (dispatch) => {
        if(deviceData != undefined){
            action = deviceData[0];
        }
        //console.log('action: ', action);
        switch(action) {
            case 0x90: //READ_CONFIG
                subAction =  deviceData[1];
                switch(subAction){
                    case 0x00: //READ_MCU
                        let deviceSettings = getDeviceData(deviceData);
                        dispatch(fetchDeviceDBData(deviceSettings));
                        dispatch({
                            type: DEVICE_DATA_MCU,
                            payload: deviceSettings
                        });
                        break;
                    case 0x01: //INPUT_CONGIG
                        console.log('DEVICE_DATA_SETTINGS in handleDeviceDataResult');
                        dispatch({
                            type: DEVICE_DATA_INPUT_SETTINGS,
                            payload: deviceData
                        });
                        break;
                }
                break;
            case 0x20: //SETUP_DATA_TRANSFER_RESPONSE || BL_START_BULK_RESPONSE
                //console.log('SETUP_DATA_TRANSFER_RESPONSE');
                console.log('BL_START_BULK_RESPONSE');
                //result = parseTransferDataResponse(deviceData);
                //console.log(result);
                dispatch({
                    type: START_BULK_TRANSFER,
                    payload: ""
                  });
                break;
            case 0x21: //BL_EMD_BULK_TRANSFER
                //console.log('BL_END_BULK_transfer');
                console.log('BL_EMD_BULK_TRANSFER');

                var checksum = getBulkTransfterCheckSum(deviceData);
                //console.log(result);
                dispatch({
                    type: BULK_UPDATE_SECTOR_VALIDATE,
                    payload: checksum
                  });
                break;
            case 0x70: //BL_WRITE_SECTOR_RESULT
                console.log('BL_WRITE_SECTOR_RESULT');
                result = getBulkWriteSectorResult(deviceData);
                console.log('result: ', result);
                dispatch({
                  type: BULK_SECTOR_WRITE_RESULT,
                  payload: result
                });
                break;
            case 0x91: //BL_WRITE_CONFIG_RESPONSE
                console.log('BL_WRITE_CONFIG_RESPONSE');
                subAction =  deviceData[1];
                switch(subAction){
                  case 0x01: //INPUT_CONGIG
                    console.log('BL_WRITE_CONFIG_RESPONSE INPUT_CONGIG');
                    let result =  deviceData[2];
                    if(result == BL_WRITE_SUCCESS){
                      dispatch({
                          type: SUCCESS_SETTINGS_UPDATE,
                          payload: { message_header: 'Settings Update', message_text: 'Settings Update Success', id: 'settingsok'}
                      });
                      break;
                    }
                    if(result == BL_WRITE_FAILED){
                      dispatch({
                          type: FAILED_SETTINGS_UPDATE,
                          payload: { message_header: 'Settings Update', message_text: 'Settings Update Failed', id: 'settingsfail'}
                      });
                      break;
                    }
                }
                break;
        }
    };
}

export function saveSystemConfig(systemConfig, device){
  console.log('SAVE_SYSTEM_CONFIG', systemConfig);
  let data = prepareInputSettings(systemConfig);
  console.log(data);
  device.sendReport(0x00, new Uint8Array(data));
  return {
    type: 'SAVE_SYSTEM_CONFIG',
    payload: ""
};
}

export function sendSoftwareUpdateData(action, update_status, device){
    var data = [];

    switch(action){
      case SET_UP_BULK_TRANSFER:
        console.log("inside software update action", SET_UP_BULK_TRANSFER);
        console.log(update_status);
        data = setUpBulkTransferData(update_status);
        console.log(data);
        device.sendReport(0x00, new Uint8Array(data));
        return {
            type: SET_UP_BULK_TRANSFER,
            payload: ""
        };
      case START_TRANSFER:
        console.log("inside software update action", START_TRANSFER);
        data = setUpTransferStart()
        device.sendReport(0x00, new Uint8Array(data));
        return {
          type: REQUEST_TRANSFER_START,
          payload: ""
        };
      case BULK_SECTOR_WRITE:
        console.log("inside software update action", BULK_SECTOR_WRITE);
        data = setUpBulkSectorWrite(update_status);
        device.sendReport(0x00, new Uint8Array(data));
        return {
          type: BULK_SECTOR_WRITE_IN_PROGRESS,
          payload: ""
        };
      /*
      case PACKET_SEND:
        ////console.log("inside software update action", PACKET_SEND);
        data = setUpPacketData(update_status);
        ////console.log("sendSoftwareUpdateData", data);
        device.sendReport(0x00, new Uint8Array(data));
        return {
          type: REQUEST_PACKET_SEND,
          payload: ""
        };
      case BLOCK_VALIDATE:
        ////console.log("inside software update action", BLOCK_VALIDATE);
        data = setUpBlockValidateData(update_status);
        device.sendReport(0x00, new Uint8Array(data));
        return {
          type: REQUEST_VALIDATE_BLOCK_SEND,
          payload: ""
        };
      case SECTOR_WRITE:
        console.log("inside software update action", SECTOR_WRITE);
        data = setUpSectorWriteData(update_status);
        device.sendReport(0x00, new Uint8Array(data));
        return {
          type: REQUEST_SECTOR_WRITE_SEND,
          payload: ""
        };
      */
    }
}

export function setSystemSetting(action, setting, value){
  let tmp = {};
  tmp[setting] = value;
  console.log(setting);
  console.log(value);
  console.log('in setSystemSetting',tmp );
  return {
    type: action,
    payload: tmp
  }; 
}


export function sendBulkUpdateData(action, update_status, device){
  console.log("inside sendBulkUpdateData");
  return (dispatch) => {
    dispatch({
        type: BULK_UPDATE_IN_PROGRESS,
        payload: ""
    });
    let currentSector = update_status.current_sector;
    let currentSectorData = update_status.sectors_data[currentSector].sectorData;
    let total_number_of_sectors = update_status.total_number_of_sectors;
    let sectorSize = update_status.sector_size;
    //console.log(currentSectorData);
    let tmpSum = 0;
    //let  totalTransfers = SMALL_SECTOR_SIZE / HID_TRANSFER_SIZE; //(8192 / 64)
    let  totalTransfers = sectorSize / HID_TRANSFER_SIZE; //(8192 / 64)
    for(var i = 0; i < totalTransfers; i++){
      //console.log("i=", i);
      let tmpArray = [];
      for(var p = 0; p < HID_TRANSFER_SIZE; p++){
        tmpSum += (currentSectorData[(HID_TRANSFER_SIZE*i)+p]);
        tmpArray.push((currentSectorData[(64*i)+p]));
      }
      //console.log('i: ', i , 'sum: ', tmpSum);
      //console.log(tmpArray);
      //let progress = Math.round(( ((currentSector * SMALL_SECTOR_SIZE) + (i * HID_TRANSFER_SIZE)) * 100 )/ (total_number_of_sectors * SMALL_SECTOR_SIZE) ) - 1; //never show 100%
      let progress = Math.round(( ((currentSector * sectorSize) + (i * HID_TRANSFER_SIZE)) * 100 )/ (total_number_of_sectors * sectorSize) ) - 1; //never show 100%
      console.log('progress', progress, '%');
      dispatch({
        type: UPDATE_PROGRESS_REPORT,
        payload: progress
      });
      device.sendReport(0x00, new Uint8Array(tmpArray));
    } 
    console.log('sending tmpSum: ', tmpSum) 
  };
}

export function handleDeviceRemoved(){
    return {
        type: DEVICE_REMOVED,
        payload: ""
    };
}

export function handleUpdateError(){
  return {
      type: DISPLAY_UPDATE_ERROR,
      payload: { message_header: 'Update Error', message_text: 'Update error sector validate/write', id: 'updatefailed'}
  };
}

export function handleUpdateSuccess(){
  return {
      type: DISPLAY_UPDATE_SUCCESS,
      payload: { message_header: 'Update Completed', message_text: 'Update completed', id: 'updateok'}
  };
}
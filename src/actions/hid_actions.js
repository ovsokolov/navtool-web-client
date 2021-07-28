import {    DEVICE_DATA_MCU, 
            DEVICE_DATA_INPUT_SETTINGS, 
            DEVICE_REMOVED,
            DEVICE_NOT_SUPPORTED } from '../utils/constants';

import {    SET_UP_TRANSFER, 
            SET_UP_BULK_TRANSFER,
            START_TRANSFER,
            START_BULK_TRANSFER,
            BULK_UPDATE_IN_PROGRESS,
            BULK_UPDATE_SECTOR_VALIDATE,
            BULK_SECTOR_WRITE_IN_PROGRESS,
            BULK_SECTOR_WRITE,
            BULK_SECTOR_WRITE_RESULT,
            PACKET_SEND,
            REQUEST_PACKET_SEND,
            SECTOR_WRITE,
            BLOCK_VALIDATE,
            REQUEST_VALIDATE_BLOCK_SEND_RESPONSE,
            REQUEST_VALIDATE_BLOCK_SEND,
            REQUEST_SECTOR_WRITE_SEND,
            REQUEST_SECTOR_WRITE_SEND_RESPONSE,
            REQUEST_PACKET_SEND_RESPONSE,
            REQUEST_DATA_SETUP,
            REQUEST_DATA_SETUP_RESPONSE,
            REQUEST_TRANSFER_START,
            REQUEST_TRANSFER_START_RESPONSE } from '../utils/constants';


import { getSerialNumber,
    checkOBDSupport,
    getSoftwareId,
    setDeviceSettings,
    setDeviceOSDSettings,
    setDeviceOBDSettings,
    setVehicleInfo,
    setUpTransferData,
    setUpBulkTransferData,
    getBulkTransfterCheckSum,
    setUpBulkSectorWrite,
    getBulkWriteSectorResult,
    prepareInputSettings,
    getDeviceData,
    parseTransferDataResponse,
    setUpTransferStart,
    setUpPacketData,
    parsePacketDataResponse,
    setUpBlockValidateData,
    parseSectorWriteResponse,
    setUpSectorWriteData,
    parseOBDStatus,
    setCanFilterMessage,} from '../utils/device_utils';

import { fetchDeviceDBData  } from './get_device_data';

export function handleDeviceDataResult(deviceData){
    let action;
    let usbResult; 
    let result;
    return (dispatch) => {
        if(deviceData != undefined){
            action = deviceData[0];
        }
        //console.log('action: ', action);
        switch(action) {
            case 0x90: //READ_CONFIG
                let subAction =  deviceData[1];
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
    //console.log(currentSectorData);
    let tmpSum = 0;
    //SECTOR_SIZE = 8192 / HID_TRANSFER_SIZE = 64 
    for(var i = 0; i < 128; i++){
      //console.log("i=", i);
      let tmpArray = [];
      for(var p = 0; p < 64; p++){
        tmpSum += (currentSectorData[(64*i)+p]);
        tmpArray.push((currentSectorData[(64*i)+p]));
      }
      //console.log('i: ', i , 'sum: ', tmpSum);
      //console.log(tmpArray);
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
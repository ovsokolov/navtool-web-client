import { TRANSFER_SET_UP_DATA_RESPONSE ,
         TRANSFER_STATUS_DATA_RESPONSE } from '../utils/structures';

import { DEVICE_APP_STATUS, DEVICE_SBL_STATUS} from '../utils/constants';

export function setDeviceSettings(data, settings){
  let device_data = data;
  //byte 1
  let byte1 = "";
  byte1 = settings["SoundSupported"] + byte1;
  byte1 = settings["ObdSupported"] + byte1;
  byte1 = settings["ConfigSupported"] + byte1;
  byte1 = settings["RearCameraSupported"] + byte1;
  byte1 = settings["FrontCameraSupported"] + byte1;
  byte1 = settings["LeftCameraSupported"] + byte1;
  byte1 = settings["RightCameraSupported"] + byte1;
  byte1 = settings["ReservedSupported"] + byte1;
  //console.log(byte1);
  //byte 2
  let byte2 = "";
  byte2 = settings["SoundEnabled"] + byte2;
  byte2 = settings["RearCameraEnabled"] + byte2;
  byte2 = settings["FrontCameraEnabled"] + byte2;
  byte2 = settings["LeftCameraEnabled"] + byte2;
  byte2 = settings["RightCameraEnabled"] + byte2;
  byte2 = settings["FactoryRearCamera"] + byte2;
  byte2 = settings["FactoryFrontCamera"] + byte2;
  byte2 = settings["FactoryLeftCamera"] + byte2;
  //console.log(byte2);
  //byte_3;
  let byte3 = "";
  byte3 = settings["HDMIEnabled"] + byte3;
  byte3 = settings["RGBEnabled"] + byte3;
  byte3 = settings["Input1Enabled"] + byte3;
  byte3 = settings["Input2Enabled"] + byte3;
  byte3 = settings["Input3Enabled"] + byte3;
  byte3 = settings["Input4Enabled"] + byte3;
  byte3 = settings["NotUsed"] + byte3;
  //console.log(byte3);
  //byte_4;
  let byte4 = "";
  byte4 = settings["FactoryRightCamera"] + byte4;
  byte4 = settings["FrontCameraMode"] + byte4;
  byte4 = settings["SideCameraMode"] + byte4;
  byte4 = settings["ResrvedBits"] + byte4;
  //console.log(byte4);
  //byte_5;
  let byte5 = "";
  byte5 = settings["IsDefaultSettings"] + byte5;
  byte5 = settings["VideoInputs"] + byte5;
  byte5 = settings["VIMCapacity"] + byte5;
  byte5 = settings["RGBCapacity"] + byte5;
  byte5 = settings["HDMICapacity"] + byte5;
  byte5 = settings["ParkingLinesDisabled"] + byte5;

  //byte 6  
  let byte6 = "";
  byte6 = settings["ScreenSize"] + byte6;
  byte6 = settings["CSyncPolarity"] + byte6;
  byte6 = settings["SOGEnabled"] + byte6;
  byte6 = settings["VIMEnabled"] + byte6; 


  //byte 7
  let byte7 = "";
  byte7 = settings["VideoSize1"] + byte7;
  byte7 = settings["VideoSize2"] + byte7;
  byte7 = settings["VideoSize3"] + byte7;
  byte7 = settings["VideoSize4"] + byte7; 
  
  //byte 8
  let byte8 = "";
  byte8 = settings["VideoFunction1"] + byte8;
  byte8 = settings["VideoFunction2"] + byte8;
  byte8 = settings["VideoFunction3"] + byte8;
  byte8 = settings["VideoFunction4"] + byte8; 


  device_data[21] = parseInt(byte1,2);
  device_data[22] = parseInt(byte2,2);
  device_data[23] = parseInt(byte3,2);
  device_data[24] = parseInt(byte4,2);
  device_data[25] = parseInt(byte5,2);
  device_data[26] = parseInt(byte6,2);
  device_data[27] = parseInt(byte7,2);
  device_data[28] = parseInt(byte8,2);
  
  let result = [];
  result[0] = 0x00;
  result[1] = 0x1B;
  for(var i = 0; i < 43; i++){
    result[2 + i] =   device_data[21 + i];
  }
  //console.log(result);
  //console.log(result.length);
  return result;
}

export function setDeviceOSDSettings(settings){

  //byte 1
  let byte1 = "";
  byte1 = settings["OsdCVBS1"] + byte1;
  byte1 = settings["OsdCVBS2"] + byte1;
  byte1 = settings["OsdCVBS3"] + byte1;
  byte1 = settings["OsdCVBS4"] + byte1;

  //console.log(byte1);
  //byte 2
  let byte2 = "";
  byte2 = settings["TextMenuHDMI"] + byte2;
  byte2 = settings["TextMenuRGB"] + byte2;
  byte2 = settings["TextMenuCh1"] + byte2;
  byte2 = settings["TextMenuCh2"] + byte2;
  //console.log(byte2);
  //byte_3;
  let byte3 = "";
  byte3 = settings["TextMenuCh3"] + byte3;
  byte3 = settings["TextMenuCh4"] + byte3;
  byte3 = settings["Reserved2"] + byte3;
  //console.log(byte3);
  //byte_4;
  let byte4 = settings["Reserved3"];
  //console.log(byte4);

  let result = [];
  result[0] = 0x00;
  result[1] = 0x66;
  result[2] = settings["BackgroundColor"];
  result[3] = settings["TextColor"];
  result[4] = settings["HighlightColor"];
  result[5] = settings["Reserved1"];
  result[6] = parseInt(byte1,2);
  result[7] = parseInt(byte2,2);
  result[8] = parseInt(byte3,2);
  result[9] = parseInt(byte4,2);

  //console.log(result);
  //console.log(result.length);
  return result;
}

export function setDeviceOBDSettings(settings){
  console.log("OBD Settings ", settings);
  //byte 1
  let byte1 = "";
  byte1 = settings["obd_feature_idx1"] + byte1;
  byte1 = settings["obd_feature_idx2"] + byte1;
  byte1 = settings["obd_feature_idx3"] + byte1;
  byte1 = "00000" + byte1;

  console.log(byte1);

  let result = [];
  result[0] = 0x00;
  result[1] = 0x61;
  result[2] = parseInt(byte1,2);

  console.log(result);
  //console.log(result.length);
  return result;
}

export function getDeviceData(deviceData){
  let bareNum;
  let serial_number = "";
  let hexStringFrmt = "00"
  for (var i = 0; i < 16; i++) {
    if (i % 4 == 0 && i > 0) {
      serial_number += "-";
    }
    bareNum = deviceData[3+i].toString(16);
    serial_number += hexStringFrmt.substring((bareNum).length, 2) + bareNum;
  }

  let serialNumber = serial_number.toUpperCase();

  //19 20 21  22 Part ID (Example F0 01 D8 30)
  let partId = ""; //[22][23][24][25] Part ID (Example F0 01 D8 30)
  let hexSoftwareId = ""; //[20][19]
  let hexSoftwareBuild = "" // [22]
  let bootloaderMode = "";
  let apiVersion = false;

  for(var i=0; i < 2; i++){
    //console.log(msg[19-i]);
    bareNum = deviceData[20-i].toString(16);
    hexSoftwareId += hexStringFrmt.substring((bareNum).length, 2) + bareNum;
    //console.log(softwareId);

  }
  console.log("Software Id: ", parseInt(hexSoftwareId, 16));

  //build siftwareBuild
  bareNum = deviceData[21].toString(10);
  hexSoftwareBuild += hexStringFrmt.substring((bareNum).length, 2) + bareNum;
  console.log("Software Build",parseInt(hexSoftwareBuild, 16));
  var softwareId = parseInt(hexSoftwareId, 16);
  var softwareBuild = parseInt(hexSoftwareBuild, 16);


  for(var i=0; i < 4; i++){
    //console.log(msg[19-i]);
    bareNum = deviceData[25-i].toString(16);
    partId += hexStringFrmt.substring((bareNum).length, 2) + bareNum;
    //console.log(softwareId);

  }
  partId = partId.toUpperCase();
  console.log("Part Id: ", partId);
  
  //bootloader mode - 26
  bareNum = deviceData[26].toString(10);
  if(parseInt(hexStringFrmt.substring((bareNum).length, 2) + bareNum) == 0){
    bootloaderMode = DEVICE_SBL_STATUS;
  }else{
    bootloaderMode = DEVICE_APP_STATUS;
  };
  console.log('Bootloader Mode: ', bareNum);
  console.log('Bootloader Mode: ', bootloaderMode);

  //api version - 29
  bareNum = deviceData[29].toString(10);
  apiVersion = parseInt(hexStringFrmt.substring((bareNum).length, 2) + bareNum);
  console.log(apiVersion)
  return { serialNumber, partId, softwareId, softwareBuild, bootloaderMode, apiVersion };
}

export function getSerialNumber(msg){
  let bareNum;
  let serial_number = "";
  let hexStringFrmt = "00"
  for (var i = 0; i < 16; i++) {
    if (i % 4 == 0 && i > 0) {
      serial_number += "-";
    }
    bareNum = msg[3+i].toString(16);
    serial_number += hexStringFrmt.substring((bareNum).length, 2) + bareNum;
  }
  return serial_number.toUpperCase();
}

export function getSoftwareId(msg){
      let hexStringFrmt = "00"
      let binaryStringFrmt = "00000000"
      let hexSoftwareId = ""; //[20][19]
      let hexSoftwareBuild = ""
      let bareNum;

      for(var i=0; i < 2; i++){
        //console.log(msg[19-i]);
        bareNum = msg[19-i].toString(16);
        hexSoftwareId += hexStringFrmt.substring((bareNum).length, 2) + bareNum;
        //console.log(softwareId);

      }
      console.log("Software Id: ", parseInt(hexSoftwareId, 16));
      //build siftwareBuild
      bareNum = msg[21].toString(10);
      hexSoftwareBuild += hexStringFrmt.substring((bareNum).length, 2) + bareNum;
      console.log("Software Build",parseInt(hexSoftwareBuild, 16));
      var softwareId = parseInt(hexSoftwareId, 16);
      var softwareBuild = parseInt(hexSoftwareBuild, 16);
      return { softwareId, softwareBuild};
}

export function checkOBDSupport(msg){
      let hexStringFrmt = "00"
      let binaryStringFrmt = "00000000"
      let softwareId = ""; //[19][18]
      let bareNum;
      let OBDSupported;
      let result = {};

      for(var i=0; i < 2; i++){
        //console.log(msg[19-i]);
        bareNum = msg[19-i].toString(16);
        softwareId += hexStringFrmt.substring((bareNum).length, 2) + bareNum;
        //console.log(softwareId);

      }
      //console.log("Software Id",softwareId);
      //console.log("Software Id",parseInt(softwareId,16));

      //console.log("System Settings Byte 1", binaryStringFrmt.substring((msg[21].toString(2)).length, 8) + msg[21].toString(2));
      let byte_1 = binaryStringFrmt.substring((msg[21].toString(2)).length, 8) + msg[21].toString(2);


      OBDSupported = byte_1.substring(6,7); 
      //console.log("OBDSupported", OBDSupported) ;
      if(OBDSupported == "0"){
        result.isOBDSupported = true;
        result.softwareId = parseInt(softwareId,10);
      }else{
        result.isOBDSupported = false;
      }
      return result;
}

export function setCanFilterMessage(msg){
  console.log("inside setFilter", msg);
  const SET_CAN_DATA_ID = 0x90;
  let hexStringFrmt = "00000000"
  let arrayMsg = [];

  let result = hexStringFrmt.substring((msg).length, 8) + msg;
  console.log(result);
  console.log(result.match(/.{1,2}/g));
  console.log(result.match(/.{1,2}/g).map((num)=>{return parseInt(num,16);}));
  arrayMsg = arrayMsg.concat(
    result.match(/.{1,2}/g).map((num)=>{return parseInt(num,16);})
  );
  //console.log(arrayMsg.reverse());
  let reverseArray = arrayMsg.reverse();
  console.log(reverseArray);
  console.log(arrayMsg);
  reverseArray.unshift(0x00, SET_CAN_DATA_ID);
  console.log(reverseArray);
  return reverseArray;
}

export function setVehicleInfo(settings, info){
  var vehicle_make = info.vehicle_make;
  var vehicle_model = info.vehicle_model;
  settings[57] = vehicle_make.length; //store vehicle make length
  settings[58] = vehicle_model.length; // store vehicle model length
  for (var i = 0; i < vehicle_make.length; i++) {
    settings[29 + i] = vehicle_make.charCodeAt(i);
  }
  settings[29 + i] = 0; //terminate vehicle name

  for (var i = 0; i < vehicle_model.length; i++) {
    settings[43 + i] = vehicle_model.charCodeAt(i);
  }
  settings[43 + i] = 0; //terminate vehicle model

  var vihicleMake = "";
  var vihicleModel = "";
  for (var i = 0; i < settings[57]; i++) {
    vihicleMake += String.fromCharCode(settings[29+i]);
  }
  for (var i = 0; i < settings[58]; i++) {
    vihicleModel += String.fromCharCode(settings[43+i]);
  }
  //console.log(vihicleMake);
  //console.log(vihicleModel);
  let result = [];
  result[0] = 0x00;
  result[1] = 0x1B;
  for(var i = 0; i < 43; i++){
    result[2 + i] =   settings[21 + i];
  }
  //console.log(result);
  return result;
}

export function setUpPacketData(update_data){
  const SEND_PACKET_DATA = 0x04;
  //convert number to hex string num.toString(16);
  //then split in chunks of 2. string.match(/.{1,2}/g)
  let doubleStringFrmt = "0000";
  let hex;
  let result = ""
  let arrayMsg = [];
  arrayMsg.push(SEND_PACKET_DATA);
  hex = update_data.current_block.toString(16);
  result = doubleStringFrmt.substring((hex).length, 4) + hex;
  arrayMsg = arrayMsg.concat(
    result.match(/.{1,2}/g).map((num)=>{return parseInt(num,16);}).reverse()
  );
  hex = update_data.current_packet.toString(16);
  result = doubleStringFrmt.substring((hex).length, 4) + hex;
  arrayMsg = arrayMsg.concat(
    result.match(/.{1,2}/g).map((num)=>{return parseInt(num,16);}).reverse()
  );
  ////console.log("Array Data",update_data);
  ////console.log("setUpPacketData", update_data);
  arrayMsg = arrayMsg.concat(update_data.current_packet_data);
  ////console.log(arrayMsg);
  return arrayMsg;
}

export function setUpTransferData(update_data){
  //var blockSize = 256; //2 bytes
  //var totalBlocks = 500; //2 bytes
  //var packetSize = 16; //1 byte
  //var startSector = 2; //1 byte
  //var totalSectors = 20; //1 byte

  const SETUP_DATA_TRANSFER = 0x02;
  //convert number to hex string num.toString(16);
  //then split in chunks of 2. string.match(/.{1,2}/g)
  let byteStringFrmt = "00";
  let doubleStringFrmt = "0000";
  let hex;
  let result = ""
  let arrayMsg = [];
  arrayMsg.push(SETUP_DATA_TRANSFER);
  hex = update_data.block_size.toString(16);
  result = doubleStringFrmt.substring((hex).length, 4) + hex;
  //console.log(result);
  //console.log(result.match(/.{1,2}/g));
  //console.log(result.match(/.{1,2}/g).map((num)=>{return parseInt(num,16);}));
  arrayMsg = arrayMsg.concat(
    result.match(/.{1,2}/g).map((num)=>{return parseInt(num,16);}).reverse()
  );
  //console.log(arrayMsg);
  hex = update_data.blocks_count.toString(16);
  result = doubleStringFrmt.substring((hex).length, 4) + hex;
  arrayMsg = arrayMsg.concat(
    result.match(/.{1,2}/g).map((num)=>{return parseInt(num,16);}).reverse()
  );
  //console.log(arrayMsg);
  arrayMsg.push(update_data.packet_size);
  arrayMsg.push(update_data.start_sector);
  arrayMsg.push(update_data.total_secotrs);
  //console.log(arrayMsg);
  return arrayMsg;
  //ipcRenderer.send('device-write_data', arrayMsg);
}

export function setUpBulkTransferData(update_data){
  const SETUP_BULK_DATA_TRANSFER = 0x02;

  let currentSector = update_data.current_sector;
  console.log(currentSector);
  let currentSectorData = update_data.sectors_data[currentSector];
  console.log(currentSectorData);
  let totalPages = parseInt(currentSectorData.pageEnd) - parseInt(currentSectorData.pageStart) + 1; 
  let arrayMsg = [SETUP_BULK_DATA_TRANSFER, totalPages];
  return arrayMsg;

}

export function setUpBulkSectorWrite(update_data){
  const BULK_SECTOR_WRITE = 0x07;

  let currentSector = update_data.current_sector;
  console.log(currentSector);
  let currentSectorData = update_data.sectors_data[currentSector];
  console.log(currentSectorData);
  let totalPages = parseInt(currentSectorData.pageEnd) - parseInt(currentSectorData.pageStart) + 1; 
  let arrayMsg = [BULK_SECTOR_WRITE, parseInt(currentSectorData.sectorNumber), parseInt(currentSectorData.pageStart), parseInt(currentSectorData.pageEnd)];
  console.log(arrayMsg);
  return arrayMsg;

}

export function getBulkTransfterCheckSum(deviceData){
  let byteStringFrmt = "00";
  let hex;
  let res;
  let packetsum = "";
  deviceData.slice(1,5).reverse().forEach((num) =>{
    hex = num.toString(16);
    res = byteStringFrmt.substring(hex.length, 2) + hex;
    packetsum += res;
  });
  let packetSumInt = parseInt(packetsum,16);
  console.log('getBulkTransfterCheckSum sum: ', packetSumInt);
  return packetSumInt;
}
export function getBulkWriteSectorResult(deviceData){
  let writeResult = deviceData[1];
  let errorCode = deviceData[2];
  return { writeResult, errorCode };
}

export function getInputSettings(deviceData){
  
    let rear_front = "00000000".substring((deviceData[4].toString(2)).length, 8) + deviceData[4].toString(2);
    let left_right = "00000000".substring((deviceData[5].toString(2)).length, 8) + deviceData[5].toString(2);
    let rearCamera = parseInt(rear_front.substring(4), 2).toString();
    let frontCamera = parseInt(rear_front.substring(0,4), 2).toString();
    let leftCamera = parseInt(left_right.substring(4), 2).toString();
    let rightCamera = parseInt(left_right.substring(0,4), 2).toString();
    let miscSetting = "00000000".substring((deviceData[7].toString(2)).length, 8) + deviceData[7].toString(2);
    console.log(miscSetting);
    let activationWire = miscSetting.substring(5,6);
    let audioFeedback = miscSetting.substring(6,7);
    let autoSwitch = miscSetting.substring(7);
    let inputs = {rearCamera, frontCamera, leftCamera, rightCamera, autoSwitch, audioFeedback, activationWire};
    console.log(inputs);
    return inputs;
    /*
    console.log('Rear and Front: ', rf);
    console.log('Left and Right: ', lr);
    console.log('rear: ', rf.substring(4), parseInt(rf.substring(4), 2));
    console.log('front: ', rf.substring(0,4), parseInt(rf.substring(0,4), 2));
    console.log('left: ', lr.substring(4), parseInt(lr.substring(4), 2));
    console.log('right: ', lr.substring(0,4), parseInt(lr.substring(0,4), 2));  
    */
}

export function prepareInputSettings(deviceData){
  let result = [];
  let cameraBits = "0000";
  result[0] = 0x91;
  result[1] = 0x01;
  result[2] = 0xFF; // default for HDMI and Phone  alwas 255

  
  let rearCamera = parseInt(deviceData['rearCamera']).toString(2);
  console.log(rearCamera);
  let rearCameraBits = cameraBits.substring((rearCamera).length, 4) + rearCamera;
  let frontCamera = parseInt(deviceData['frontCamera']).toString(2);
  console.log(frontCamera);
  let frontCameraBits = cameraBits.substring((frontCamera).length, 4) + frontCamera;
  console.log(rearCameraBits, frontCameraBits);
  let front_rear = frontCameraBits + rearCameraBits;
  console.log (front_rear, parseInt(front_rear,2));
  result[3] = parseInt(front_rear,2);
 
  let leftCamera = parseInt(deviceData['leftCamera']).toString(2);
  console.log(leftCamera);
  let leftCameraBits = cameraBits.substring((leftCamera).length, 4) + leftCamera;
  let rightCamera = parseInt(deviceData['rightCamera']).toString(2);
  console.log(rightCamera);
  let rightCameraBits = cameraBits.substring((rightCamera).length, 4) + rightCamera;
  console.log(leftCameraBits, rightCameraBits);
  let right_left = rightCameraBits + leftCameraBits;
  console.log (right_left, parseInt(right_left,2));
  result[4] = parseInt(right_left,2);

  result[5] = 0xFF; //reserved

  let miscSetting = "11111" + deviceData['activationWire'] + deviceData['audioFeedback'] + deviceData['autoSwitch'];
  console.log('miscSetting:', miscSetting);
  result[6] = parseInt(miscSetting,2); //temp to test


  return result;
}

export function parseTransferDataResponse(data){
  //var block_size - 2 bytes
  //var total_blocks - 2 bytes
  //var packet_size - 1 byte
  //var start_sector - 1 byte
  //var total_secotrs - 1 byte

  var data_setup_response = JSON.parse(JSON.stringify(TRANSFER_SET_UP_DATA_RESPONSE));
  //convert number to hex string num.toString(16);
  //then split in chunks of 2. string.match(/.{1,2}/g)
  let byteStringFrmt = "00";
  let doubleStringFrmt = "0000";
  let hex;
  let res;
  var block_size = "";
  var total_blocks = "";
  data.slice(1,3).reverse().forEach((num) =>{
                hex = num.toString(16);
                res = byteStringFrmt.substring(hex.length, 2) + hex;
                block_size += res;
  });
  data_setup_response.block_size = parseInt(block_size,16);

  data.slice(3,5).reverse().forEach((num) =>{
                hex = num.toString(16);
                res = byteStringFrmt.substring(hex.length, 2) + hex;
                total_blocks += res;
  });

  data_setup_response.blocks_count = parseInt(total_blocks,16);
  data_setup_response.packet_size = data.slice(5,6)[0];
  data_setup_response.start_sector = data.slice(6,7)[0];
  data_setup_response.total_secotrs = data.slice(7,8)[0];
  return data_setup_response;

}

export function parsePacketDataResponse(data){
  //var block_number - 2 bytes
  //var packet_number - 2 bytes
  //var remaining_packets - 1 byte


  var data_packet_response = JSON.parse(JSON.stringify(TRANSFER_STATUS_DATA_RESPONSE));
  //convert number to hex string num.toString(16);
  //then split in chunks of 2. string.match(/.{1,2}/g)
  let byteStringFrmt = "00";
  let doubleStringFrmt = "0000";
  let hex;
  let res;
  var block_number = "";
  var packet_number = "";
  var remaining_packets = "";
  var check_sum = "";
  data.slice(1,3).reverse().forEach((num) =>{
                hex = num.toString(16);
                res = byteStringFrmt.substring(hex.length, 2) + hex;
                block_number += res;
  });
  data_packet_response.block_number = parseInt(block_number,16);

  data.slice(3,5).reverse().forEach((num) =>{
                hex = num.toString(16);
                res = byteStringFrmt.substring(hex.length, 2) + hex;
                packet_number += res;
  });
  data_packet_response.packet_number = parseInt(packet_number,16);

  data.slice(5,7).reverse().forEach((num) =>{
                hex = num.toString(16);
                res = byteStringFrmt.substring(hex.length, 2) + hex;
                remaining_packets += res;
  });
  data_packet_response.remaining_packets = parseInt(remaining_packets,16);

  if(data_packet_response.remaining_packets == 0){
    data.slice(7,11).reverse().forEach((num) =>{
                  hex = num.toString(16);
                  res = byteStringFrmt.substring(hex.length, 2) + hex;
                  check_sum += res;
    });
    data_packet_response.check_sum = parseInt(check_sum,16);
  }else{
    data_packet_response.check_sum = 0;
  }

  return data_packet_response;

}

export function parseSectorWriteResponse(data){
  let byteStringFrmt = "00";
  let doubleStringFrmt = "0000";
  let hex;
  let res;
  var write_response = "";
  data.slice(1,3).reverse().forEach((num) =>{
                hex = num.toString(16);
                res = byteStringFrmt.substring(hex.length, 2) + hex;
                write_response += res;
  });
  return parseInt(write_response,16);
}

export function setUpTransferStart(){
  let arrayMsg = [];
  const SETUP_TRANSFER_START = 0x03;
  arrayMsg.push(SETUP_TRANSFER_START);
  return arrayMsg;
}

export function setUpBlockValidateData(){
  let arrayMsg = [];
  const SETUP_BLOCK_VALIDATE = 0x05;
  arrayMsg.push(SETUP_BLOCK_VALIDATE);
  return arrayMsg;
}

export function setUpSectorWriteData(data){
  let arrayMsg = [];
  const SETUP_SECTOR_WRITE = 0x07;
  arrayMsg.push(SETUP_SECTOR_WRITE, data.current_sector);
  console.log("SETUP_SECTOR_WRITE", arrayMsg);
  return arrayMsg;
}

export function parseOBDStatus(msg){
  console.log(msg);
  var obdReadStatus;
  var obdStatus;
  obdReadStatus = msg[1];
  obdStatus = msg[2];
  console.log(msg[1]);
  console.log(msg[2]);
  return { obdReadStatus, obdStatus};
}


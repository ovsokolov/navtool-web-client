import { DEVICE_REMOVED } from '../utils/constants';


import { UPDATE_NOT_STARTED,
         FTP_LOAD_SUCCESS,
         SET_UP_BULK_TRANSFER,
         START_BULK_TRANSFER,
         BULK_UPDATE_IN_PROGRESS,
         BULK_UPDATE_SECTOR_VALIDATE,
         BULK_SECTOR_WRITE,
         BULK_SECTOR_WRITE_IN_PROGRESS,
         BULK_SECTOR_WRITE_RESULT,
         TRANSFER_COMPLETED,
         UPDATE_PROGRESS_REPORT,
         UPDATE_ERROR,
         DISPLAY_UPDATE_ERROR,
         DISPLAY_UPDATE_SETUP_ERROR } from '../utils/constants'

import { FILE_WRITE_STRUCTURE } from '../utils/structures';

import { SMALL_SECTOR_SIZE } from '../utils/constants';
import { SECTOR_WRITE_SUCCESS } from '../utils/constants';


const DEFAULT_UPDATE_STATE = { total_number_of_sectors: 0,
                               current_sector: 0,
                               software_file: '',
                               sectors_data: [],
                               file_check_sum: 0,
                               file_size: 0,
                               num_of_erorrs: 0,
                               sw_id: 0,
                               sw_build: 0,
                               vehicle_make: '',
                               vehicle_model: '',
                               progress_percent: 0,
                               update_progress_status: UPDATE_NOT_STARTED
                            };

export default function(state = DEFAULT_UPDATE_STATE, action){
  //console.log("in software update reducer");
  let new_state = {};
  let payload_data = {};
  switch (action.type){
    case FTP_LOAD_SUCCESS:
      ////console.log(action.payload);
      console.log("********* Software Update Reducer FTP_LOAD_SUCCESS !!**********");
      new_state = JSON.parse(JSON.stringify(DEFAULT_UPDATE_STATE));
      new_state.total_number_of_sectors = Math.ceil(action.payload.size / SMALL_SECTOR_SIZE);
      new_state.current_sector = 0;
      new_state.software_file = atob(action.payload.file);
      new_state.file_size = action.payload.size;
      new_state.sw_id = action.payload.sw_id;
      new_state.sw_build = action.payload.sw_build;
      new_state.vehicle_make = action.payload.vehicle_make;
      new_state.vehicle_model = action.payload.vehicle_model;
      var currentSum = 0;
      for (var i = 0; i < new_state.file_size; i++) {
        var el = new_state.software_file.charCodeAt(i);
        currentSum += el;
      }
      new_state.file_check_sum = currentSum;
      new_state.update_progress_status = FTP_LOAD_SUCCESS;
      return prepareSectorData(new_state);
    case START_BULK_TRANSFER:
      new_state = JSON.parse(JSON.stringify(state));
      new_state.update_progress_status = START_BULK_TRANSFER;
      return new_state;
    case BULK_UPDATE_IN_PROGRESS:
      new_state = JSON.parse(JSON.stringify(state));
      new_state.update_progress_status = BULK_UPDATE_IN_PROGRESS;
      return new_state;
    case BULK_UPDATE_SECTOR_VALIDATE:
      new_state = JSON.parse(JSON.stringify(state));
      var checksum = action.payload;
      let currentSector = new_state.current_sector;
      let currentSectorSum= new_state.sectors_data[currentSector].sectorSum;
      console.log('in reducer current secotr sum:', currentSectorSum);
      console.log('in reducer check sum: ', checksum);
      if(currentSectorSum != checksum){
        new_state.num_of_erorrs = new_state.num_of_erorrs  + 1;
        console.log('checksum error. count: ', new_state.num_of_erorrs);
        if(new_state.num_of_erorrs <=3){
          new_state.update_progress_status = SET_UP_BULK_TRANSFER;
        }else{
          new_state.update_progress_status = UPDATE_ERROR;
        }
      }else{
        //start sector write
        new_state.num_of_erorrs = 0;
        new_state.update_progress_status = BULK_SECTOR_WRITE;
      }
      return new_state;
    case BULK_SECTOR_WRITE:
      new_state = JSON.parse(JSON.stringify(state));
      new_state.update_progress_status = BULK_SECTOR_WRITE_IN_PROGRESS;
      return new_state;
    case UPDATE_PROGRESS_REPORT:
      new_state = JSON.parse(JSON.stringify(state));
      new_state.progress_percent = action.payload;;
      return new_state;     
    case BULK_SECTOR_WRITE_RESULT:
      console.log('in reducer BULK_SECTOR_WRITE_RESULT');
      new_state = JSON.parse(JSON.stringify(state));
      if(action.payload.writeResult == SECTOR_WRITE_SUCCESS){
        new_state.current_sector += 1;
        console.log('update current sector: ', new_state.current_sector);
        if(new_state.current_sector < new_state.total_number_of_sectors){
          new_state.update_progress_status = SET_UP_BULK_TRANSFER;
        }else{
          new_state.update_progress_status = TRANSFER_COMPLETED;
        }
      }else{
        new_state = JSON.parse(JSON.stringify(DEFAULT_UPDATE_STATE));
        new_state.update_progress_status = UPDATE_ERROR;
      }
      return new_state;
    case UPDATE_ERROR:
      new_state = JSON.parse(JSON.stringify(DEFAULT_UPDATE_STATE));
      new_state.update_progress_status = DISPLAY_UPDATE_ERROR;
      return new_state;
    case DISPLAY_UPDATE_ERROR:
      console.log('########## reset status UPDATE_NOT_STARTED #####');
      new_state = JSON.parse(JSON.stringify(DEFAULT_UPDATE_STATE));
      new_state.update_progress_status = UPDATE_NOT_STARTED;
      return new_state;
    case DISPLAY_UPDATE_SETUP_ERROR:
      console.log('########## reset status DISPLAY_UPDATE_SETUP_ERROR #####');
      new_state = JSON.parse(JSON.stringify(state));
      new_state.update_progress_status = UPDATE_ERROR;
      return new_state;
    case DEVICE_REMOVED:
        new_state = JSON.parse(JSON.stringify(DEFAULT_UPDATE_STATE));
        new_state.update_progress_status = DISPLAY_UPDATE_ERROR;
        return new_state;
  }
  return state;
}

function prepareSectorData(new_state){
  console.log('prepariong sector data');
  var tmpSectors = [];
  for (var currentSector = 0; currentSector < new_state.total_number_of_sectors; currentSector++) {
    var currentSectorSum = 0;
    var currentStart = currentSector * SMALL_SECTOR_SIZE;
    var currentEnd = currentStart + SMALL_SECTOR_SIZE;
    let tmpDataArray = new Array(SMALL_SECTOR_SIZE).fill(255);
    var j, k;
    for (j = currentStart, k=0; j < currentEnd; j++, k++) {     
      if(j < new_state.file_size){
        var el = new_state.software_file.charCodeAt(j);
        tmpDataArray[k] = el;
      }
      currentSectorSum += tmpDataArray[k];
    }
    var tmpSector = Object.assign({},FILE_WRITE_STRUCTURE.values[currentSector], {sectorData: tmpDataArray, sectorSum: currentSectorSum});
    tmpSectors.push(tmpSector);
    console.log(tmpSectors);
  }
  new_state.sectors_data = tmpSectors;
  //(currentPacket);
  //console.log(currentSum);
  //console.log(new_state.curerent_packet_sum);
  //console.log("Packet data in reducer", new_state);
  return new_state;
}
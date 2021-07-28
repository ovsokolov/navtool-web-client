import React, { Component} from 'react';
import { Tab } from 'semantic-ui-react'
import $ from 'jquery';
import DeviceInfo from  '../containers/device_info'
import SoftwareSearch from '../containers/software_search';
import { loadFTPFile } from '../actions/ftp_actions';
import {  handleDeviceDataResult,
          sendSoftwareUpdateData,
          sendBulkUpdateData,
          handleDeviceRemoved,
          saveSystemConfig,
          setSystemSetting } from '../actions/hid_actions';

import { fetchSoftware } from '../actions/get_software';
import { updateDeviceDBData } from '../actions/get_device_data';

import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {  SET_UP_TRANSFER,
          START_TRANSFER,
          UPDATE_SYSTEM_SETTINGS,
          FTP_LOAD_SUCCESS,
          SET_UP_BULK_TRANSFER,
          START_BULK_TRANSFER,
          BULK_SECTOR_WRITE,
          PACKET_SEND,
          BLOCK_VALIDATE,
          SECTOR_WRITE,
          TRANSFER_COMPLETED,
          UPDATE_IN_PROGRESS,
          UPDATE_NOT_STARTED} from '../utils/constants'; 

import {  INPUT_1_CONFIG,
          INPUT_2_CONFIG,
          INPUT_3_CONFIG,
          INPUT_4_CONFIG,
          AUTO_SWITCH_RADIO,
          AUDIO_FEEDBACK_RADIO,
          ACTIVATION_WIRE_RADIO } from '../utils/structures'; 

let devices = [];
let j = 0;

async function getDevices(){
  devices = await navigator.hid.getDevices();
  console.log(devices);
  console.log('after getDevices');
}

class Device extends Component {
  constructor(props){
    super(props);
    this.state = {device_update_status: UPDATE_NOT_STARTED }
    this.connectToDevice = this.connectToDevice.bind(this);
    this.readDeviceSettings = this.readDeviceSettings.bind(this);
    this.readInputConfig = this.readInputConfig.bind(this);
    this.saveInputConfig = this.saveInputConfig.bind(this);
    this.sendDataTest = this.sendDataTest.bind(this);
    this.installSoftware = this.installSoftware.bind(this);
    this.startBulk = this.startBulk.bind(this);
    this.sendBulk = this.sendBulk.bind(this);
    this.renderInputDropdown = this.renderInputDropdown.bind(this);
    this.renderRadioBatton = this.renderRadioBatton.bind(this);
    this.onRadioBattonChange = this.onRadioBattonChange.bind(this);
    this.setInputDropdown = this.setInputDropdown.bind(this);

    console.log('constructor')
  }

  componentDidMount(){
    navigator.hid.addEventListener('connect', ({device}) => {
      console.log(`componentDidMount HID connected: ${device.productName}`);
      getDevices();
      if(devices[0] != undefined){
        this.connectToDevice();
      }
    });
      
    navigator.hid.addEventListener('disconnect', ({device}) => {
        console.log(`HID disconnected: ${device.productName}`);
        this.setState({device_update_status: UPDATE_NOT_STARTED});
        this.props.handleDeviceRemoved();
    });
    
  }

 
  async connectToDevice() {
      console.log('connectToDevice');
      console.log(devices)
      
      if(devices[0] == undefined){
        devices = await navigator.hid.requestDevice({filters:[
          {
              //vendorId: 0xc251,
              //productId: 0x0116,
              vendorId: 0x1FC9,
              productId: 0x0081
            },
        ]});
      }

      if(devices.length > 0){
        console.log(devices.length > 0);
        console.log(devices);
        console.log(devices[0].opened);  
        console.log(navigator.hid.getDevices());
      }else{
        console.log('No device selected');
        return;
      }


      if (devices[0].opened == true){
        console.log('device already opened');
        //devices[0].sendReport(0x00, new Uint8Array([0x90, 0x00, 0x00, 0x00, 0x00, 0x00]));
        return;
      }
  
      await devices[0].open();
        if (devices[0].opened){  
          console.log("Device is open.");
          this.readDeviceSettings();
          this.readInputConfig();
        }else{  
          console.log("Device not open.");  
        }
        devices[0].oninputreport = e => {  
          console.log("###########myFunction Got input report from " + e.device.productName + " with ID " + e.reportId);
          let dataArray = new Uint8Array(e.data.buffer)
          console.log(dataArray);
          this.props.handleDeviceDataResult(dataArray);
        }
        
  }

  renderInputDropdown(option, index, value){
    ////console.log("here ", value);
    if(option.value == value){
      return (
        <option key={option.key}
                value={option.value}
                selected
                data-name={option.setting}
        >
        {option.label}
        </option>
      );
    }else {
      return (
        <option key={option.key}
                value={option.value}
                data-name={option.setting}
        >
        {option.label}
        </option>
      );
    }
  }

  renderRadioBatton(option, index){
    //console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz');
    //console.log(option.value);
    //console.log(option.setting);
    //console.log(this.state.system_settings[option.setting]);
    return (
          <div>
            <div className="inline field">
                  <input type="radio"
                        name={option.setting}
                        id={option.setting}
                        value={option.value}
                        checked={option.value == this.props.system_settings[option.setting]}                       
                        onChange={event => this.onRadioBattonChange(event.target.checked, event.target.value, option.setting)}
                  />
                  <div className="ui left pointing label">
                    {option.label}
                  </div>
                  <br/>                    
            </div>
          </div>
    );
  }

  onRadioBattonChange(checked, value, name){
    console.log(checked);
    console.log(value);
    console.log(name);
    this.props.setSystemSetting(UPDATE_SYSTEM_SETTINGS, name, value);
    //let system_settings = this.state.system_settings;
    //system_settings[name] = value;
    //this.setState({system_settings});
  }

  setInputDropdown(event){
    //let osd_settings = this.state.osd_settings;
    //osd_settings[event.target.id] = event.target.value;
    console.log(event.target.id, event.target.value);
    console.log(this.props.system_settings);
    this.props.setSystemSetting(UPDATE_SYSTEM_SETTINGS, event.target.id, event.target.value);
  }

  saveInputConfig(){
    this.props.saveSystemConfig(this.props.system_settings, devices[0]);
  }

  async readDeviceSettings() {
    //console.log('here', devices[0]);
    //let tmpArray = [];
    devices[0].sendReport(0x00, new Uint8Array([0x90, 0x00, 0x00, 0x00, 0x00, 0x00]));

  }

  async readInputConfig() {
    //console.log('here', devices[0]);
    //let tmpArray = [];
    devices[0].sendReport(0x00, new Uint8Array([0x90, 0x01, 0x00, 0x00, 0x00, 0x00]));

  }

  async startBulk() {
    //this.props.fetchSoftware('UMLG14572');
    //this.props.fetchSoftware('UM132129', null,null, null, 1);
    
    this.props.updateDeviceDBData('F50007C5-602C6D4C-AA178826-0B01F00E ', {});
    //devices[0].sendReport(0x00, new Uint8Array([0x02, 0x09, 0x00, 0x00, 0x00, 0x00]));
  }

  async sendBulk() {
    for(var j = 0; j < 9; j++){
      console.log("j=", j);
      for(var i = 0; i < 8; i++){
        console.log("i=", i);
        let tmpArray = new Array(64).fill(1);
        console.log(tmpArray);
        devices[0].sendReport(0x00, new Uint8Array(tmpArray));
      }
    }
    //devices[0].sendReport(0x00, new Uint8Array([0x02, 0x0F, 0x00, 0x00, 0x00, 0x00]));
  }


  sendDataTest(){
    //let device1 = await navigator.hid.getDevices();
    //console.log(device1);
    //console.log(device1[0]);
  
    //console.log(await navigator.hid.getDevices()[0]);
    console.log('here', devices[0]);
    let tmpArray = [];
    if(j < 128 ){
      tmpArray = [];
      for(var i = 0; i < 64; i++){
        tmpArray.push(j);
      }
      //console.log(tmpArray);
      //devices[0].sendReport(0x00, new Uint8Array(tmpArray));
    }
    //console.log(tmpArray);
    //devices[0].sendReport(0x00, new Uint8Array([0x03,0x03, 0x03]));
  
  }


  installSoftware(){
    console.log('loadftp');
    //var sw_id = 13385;
    //var sw_id = 13546; //flash2
    //var sw_id = 13556; //AR
    //this.props.loadFTPFile(sw_id);    
    var sw_id = this.props.software_search.sw_id;
    //console.log(this.props.software_search.sw_id.length);
    //console.log(this.props.software_search.sw_id);
    if(this.props.software_search.sw_id.length == 0) {
      alert("Please select software from the list");
    }else{
      console.log(sw_id);
      this.props.loadFTPFile(sw_id);     
    } 
  }


  componentDidUpdate(prevProps){
    console.log(this.state.device_update_status);
    console.log(this.props.software_update.update_progress_status);
    if(this.state.device_update_status == UPDATE_NOT_STARTED && this.props.software_update.update_progress_status == FTP_LOAD_SUCCESS){
      console.log("+++++++ componentDidUpdate SET_UP_BULK_TRANSFER  ++++++");
      this.setState({device_update_status: UPDATE_IN_PROGRESS});
      this.props.sendSoftwareUpdateData(SET_UP_BULK_TRANSFER,this.props.software_update, devices[0]);
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == START_BULK_TRANSFER){
      console.log("+++++++ componentDidUpdate START_BULK_TRANSFER  ++++++");
      this.props.sendBulkUpdateData(START_BULK_TRANSFER, this.props.software_update, devices[0]);
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == SET_UP_BULK_TRANSFER){
      console.log("+++++++ componentDidUpdate SET_UP_BULK_TRANSFER FOR NEXT SECTOR  ++++++");
      this.props.sendSoftwareUpdateData(SET_UP_BULK_TRANSFER,this.props.software_update, devices[0]);
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == BULK_SECTOR_WRITE){
      if(this.props.software_update.update_progress_status != prevProps.software_update.update_progress_status){
        console.log("++++++++ componentDidUpdate BULK_SECTOR_WRITE  ++++++++++");
        this.props.sendSoftwareUpdateData(BULK_SECTOR_WRITE, this.props.software_update, devices[0]);
      }
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == PACKET_SEND){
      console.log("Will start packet send", this.propssoftware_update);
      this.props.sendSoftwareUpdateData(PACKET_SEND, this.props.software_update, devices[0]);
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == BLOCK_VALIDATE){
      console.log("Will validate block", this.props.software_update);
      this.props.sendSoftwareUpdateData(BLOCK_VALIDATE, this.props.software_update, devices[0]);
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == SECTOR_WRITE){
      console.log("Will write sector", this.props.software_update);
      this.props.sendSoftwareUpdateData(SECTOR_WRITE, this.props.software_update, devices[0]);
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == TRANSFER_COMPLETED){
      console.log("Transfer complete in device", this.props.software_update, this.props.system_settings);
      this.props.updateDeviceDBData(this.props.system_settings.serialNumber, this.props.software_update);
      this.setState({device_update_status: UPDATE_NOT_STARTED});
    }
  }

  render(){
    /*
      const panes = [
        { menuItem: "Tab 1", render: () => <TabContent1  /> }, pass property here
        { menuItem: "Tab 2", render: () => <TabContent2 /> },
        { menuItem: "Tab 3", render: () => <TabContent3 /> }
      ]
    */

    let panes = [
      { menuItem: 'Software Search', pane: { key: 'tab1', content: <SoftwareSearch 
                                                                        onInstallClick={this.installSoftware}/>, size: 'massive' } },
      { menuItem: 'Tab 2', pane: { key: 'tab2', content: 'This tab has 2 a center aligned text', textAlign: 'center' } },
      { menuItem: 'Tab 3', pane: { key: 'tab3', content: 'This tab has 3 a center aligned text', textAlign: 'center' } }
    ];
    return (
      <div class="ui container">
        <DeviceInfo 
          deviceSettings = {this.props.system_settings}
          onDeviceSearch={this.connectToDevice}

        />
        <Tab panes={panes} renderActiveOnly = {false}/>
        <div class="ui grid">
          <div class="four wide column">
            <button className="ui compact red  icon button" onClick={this.readDeviceSettings}>
                    Read Device Settings
            </button>
          </div>
          <div class="four wide column">
            <button className="ui compact red  icon button" onClick={this.installSoftware}>
                    Load Software
            </button>
          </div>
          <div class="four wide column">
            <button className="ui compact red  icon button" onClick={this.startBulk}>
                    Test Update
            </button>
          </div> 
          <div class="four wide column">
            <button className="ui compact red  icon button" onClick={this.sendBulk}>
                    Send Bulk
            </button>
          </div>
          <div class="four wide column">
            <button className="ui compact red  icon button" onClick={this.readInputConfig}>
                    Read Input Config
            </button>
          </div>
          <div class="four wide column">
            <button className="ui compact red  icon button" onClick={this.saveInputConfig}>
                    Save Input Settings
            </button>
          </div>           

              <div className="row">
                <select onChange={this.setInputDropdown} id={INPUT_1_CONFIG["id"]} className="ui dropdown">
                  { INPUT_1_CONFIG["values"].map( (elem, index) => {return this.renderInputDropdown(elem,index,this.props.system_settings["rearCamera"]);} ) }
                </select> 
                <br ></br><br ></br>
              </div>
              
              <div className="row">
                <select onChange={this.setInputDropdown} id={INPUT_2_CONFIG["id"]} className="ui dropdown">
                  { INPUT_2_CONFIG["values"].map( (elem, index) => {return this.renderInputDropdown(elem,index,this.props.system_settings["frontCamera"]);} ) }
                </select> 
              </div>

              <div className="row">
                <select onChange={this.setInputDropdown} id={INPUT_3_CONFIG["id"]} className="ui dropdown">
                  { INPUT_3_CONFIG["values"].map( (elem, index) => {return this.renderInputDropdown(elem,index,this.props.system_settings["leftCamera"]);} ) }
                </select> 
              </div>

              <div className="row">
                <select onChange={this.setInputDropdown} id={INPUT_4_CONFIG["id"]} className="ui dropdown">
                  { INPUT_4_CONFIG["values"].map( (elem, index) => {return this.renderInputDropdown(elem,index,this.props.system_settings["rightCamera"]);} ) }
                </select> 
              </div>
              <div className="row">
                {AUTO_SWITCH_RADIO["label"]}
                { AUTO_SWITCH_RADIO["values"].map( (elem, index) => {return this.renderRadioBatton(elem,index)})}   
              </div>  
              <div className="row">
                {AUDIO_FEEDBACK_RADIO["label"]}
                { AUDIO_FEEDBACK_RADIO["values"].map( (elem, index) => {return this.renderRadioBatton(elem,index)})}   
              </div>  
              <div className="row">
                {ACTIVATION_WIRE_RADIO["label"]}
                { ACTIVATION_WIRE_RADIO["values"].map( (elem, index) => {return this.renderRadioBatton(elem,index)})}   
              </div>  
            </div>
          </div>
    );
  }
}

function mapStateToProps(state){
  return { 
           system_settings: state.system_settings,
           software_update: state.software_update,
           software_search: state.software_search,
         };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ loadFTPFile, handleDeviceDataResult, sendSoftwareUpdateData, sendBulkUpdateData,handleDeviceRemoved, setSystemSetting, saveSystemConfig, fetchSoftware, updateDeviceDBData }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Device);

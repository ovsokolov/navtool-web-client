import React, { Component} from 'react';
import { Tab, Modal, Header, Progress, Button } from 'semantic-ui-react'
import $ from 'jquery';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import DeviceInfo from  '../containers/device_info'
import SoftwareSearch from '../containers/software_search';
import InputSettings from '../containers/input_settings';
import MiscSettings from '../containers/misc_settings';
import { loadFTPFile } from '../actions/ftp_actions';
import {  handleDeviceDataResult,
          sendSoftwareUpdateData,
          sendBulkUpdateData,
          handleDeviceRemoved,
          saveSystemConfig,
          handleUpdateError,
          handleUpdateSuccess,
          setSystemSetting } from '../actions/hid_actions';

import { fetchSoftware } from '../actions/get_software';
import { updateDeviceDBData } from '../actions/get_device_data';
import { hideDialog } from '../actions/misc_actions';


import {  NO_DEVICE_STATUS,
          FTP_LOAD_SUCCESS,
          SET_UP_BULK_TRANSFER,
          START_BULK_TRANSFER,
          BULK_SECTOR_WRITE,
          PACKET_SEND,
          BLOCK_VALIDATE,
          SECTOR_WRITE,
          TRANSFER_COMPLETED,
          UPDATE_IN_PROGRESS,
          UPDATE_NOT_STARTED,
          UPDATE_ERROR} from '../utils/constants'; 

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
    this.state = {device_update_status: UPDATE_NOT_STARTED,  tabActiveIndex: 0  }
    this.connectToDevice = this.connectToDevice.bind(this);
    this.saveInputConfig = this.saveInputConfig.bind(this);  
    this.readDeviceSettings = this.readDeviceSettings.bind(this);
    this.readInputConfig = this.readInputConfig.bind(this);
    this.installSoftware = this.installSoftware.bind(this);

    this.closeModal = this.closeModal.bind(this);
    this.displayModal = this.displayModal.bind(this);

    this.selectTab = this.selectTab.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);

    //this.renderSteps = this.renderSteps.bind(this);
    this.renderTabs = this.renderTabs.bind(this);

    console.log('constructor')
  }

  renderSteps(){
    if( this.props.system_settings.bootloaderMode == NO_DEVICE_STATUS){
      return(
        <div><br /><br /><br /><br /></div>
      );
    }else{
      return(
        <div className="ui grid">
          <div className="sixteen wide column center aligned">
            <div className="ui tiny steps">
              <a className="tiny step" onClick={() => this.selectTab(0)}>
                <div className="ui red horizontal label">Step 1</div>
                Install Software
              </a>
              <a className="tiny step" onClick={() => this.selectTab(1)}>
                  <div className="ui red horizontal label">Step 2</div>
                  Configure Video Input Settings
              </a>
              <a className="tiny step" onClick={() => this.selectTab(2)}>
                  <div className="ui red horizontal label">Step 3</div>
                  Configure Device Settings (Optional)
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  renderTabs(){
    if( this.props.system_settings.bootloaderMode == NO_DEVICE_STATUS){
      return(
        <div></div>
      );
    }else{

      let panes = [
        { menuItem: 'Vehicle Search', pane: { key: 'tab1', content: <SoftwareSearch 
                                                                          onInstallClick={this.installSoftware}/>, size: 'massive' } },
        { menuItem: 'Video Input Settings', pane: { key: 'tab2', content: <InputSettings 
                                                                          onDeviceSettingsSave={this.saveInputConfig}
                                                                          onResetSettings={this.readInputConfig}/>, size: 'massive' } },
        { menuItem: 'Device Settings', pane: { key: 'tab3', content: <MiscSettings 
                                                                          onDeviceSettingsSave={this.saveInputConfig}
                                                                          onResetSettings={this.readInputConfig}/>, size: 'massive' } }
      ];
      return(
        <Tab 
          panes={panes} 
          renderActiveOnly = {false} 
          activeIndex={this.state.tabActiveIndex}
          onTabChange={this.handleTabChange}
        />
      );
    }
  }

  handleTabChange({activeIndex}){
    console.log('selectTab:', activeIndex);
    this.setState({tabActiveIndex: activeIndex});
  }

  selectTab(tabIndex){
    console.log('selectTab:', tabIndex);
    this.setState({tabActiveIndex: tabIndex});
  }

  componentDidMount(){
    if(navigator != undefined){
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
          setTimeout(this.readInputConfig,100);
          //this.readInputConfig();
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

  saveInputConfig(){
    console.log('saving settings');
    this.props.saveSystemConfig(this.props.system_settings, devices[0]);
  }

  async readDeviceSettings() {
    //console.log('readDeviceSettings', devices[0]);
    //let tmpArray = [];
    devices[0].sendReport(0x00, new Uint8Array([0x90, 0x00, 0x00, 0x00, 0x00, 0x00]));
  }

  async readInputConfig() {
    //console.log('readInputConfig', devices[0]);
    //let tmpArray = [];
    devices[0].sendReport(0x00, new Uint8Array([0x90, 0x01, 0x00, 0x00, 0x00, 0x00]));
  }

  installSoftware(){
    console.log('loadftp'); 
    var sw_id = this.props.software_search.sw_id;
    if(this.props.software_search.sw_id.length == 0) {
      alert("Please select software from the list");
    }else{
      console.log(sw_id);
      this.props.loadFTPFile(sw_id);     
    } 
  }

  displayModal(update_status){
    console.log('icon:',this.props.messages);
    return(
      <div>
        {/* Progress Modal */}
        <Modal
          open={this.state.device_update_status != UPDATE_NOT_STARTED} 
          size="large">
          <Header content='Update In Progress' />
          <Modal.Content>
            <p>
              <Progress percent={this.props.software_update.progress_percent} progress indicating autoSuccess />
            </p>
          </Modal.Content>
        </Modal>
        {/* Message Modal */}
        <Modal
          open={this.props.messages.open_modal} 
          size="large">
          <Header content={this.props.messages.message_header}  />
          <Modal.Content>
            <p> 
              <i className={`large ${this.props.messages.message_icon} icon`} />
              {this.props.messages.message_text}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button id={this.props.messages.id} color='green' onClick={() => this.closeModal()}>
              Ok
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  closeModal(){
    console.log("close modal function");
    this.props.hideDialog();
  }

  componentDidUpdate(prevProps){
    console.log(this.state.device_update_status);
    console.log(this.props.software_update.update_progress_status);
    if(this.state.device_update_status == UPDATE_NOT_STARTED && this.props.software_update.update_progress_status == FTP_LOAD_SUCCESS){
      if(this.props.software_update.update_progress_status != prevProps.software_update.update_progress_status){
        console.log("+++++++ componentDidUpdate SET_UP_BULK_TRANSFER  ++++++");
        this.setState({device_update_status: UPDATE_IN_PROGRESS});
        this.props.sendSoftwareUpdateData(SET_UP_BULK_TRANSFER,this.props.software_update, devices[0]);
      }
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == START_BULK_TRANSFER){
      if(this.props.software_update.update_progress_status != prevProps.software_update.update_progress_status){
        console.log("+++++++ componentDidUpdate START_BULK_TRANSFER  ++++++");
        this.props.sendBulkUpdateData(START_BULK_TRANSFER, this.props.software_update, devices[0]);
      }
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == SET_UP_BULK_TRANSFER){
      if(this.props.software_update.update_progress_status != prevProps.software_update.update_progress_status){
        console.log("+++++++ componentDidUpdate SET_UP_BULK_TRANSFER FOR NEXT SECTOR  ++++++");
        this.props.sendSoftwareUpdateData(SET_UP_BULK_TRANSFER,this.props.software_update, devices[0]);
      }
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == BULK_SECTOR_WRITE){
      if(this.props.software_update.update_progress_status != prevProps.software_update.update_progress_status){
        console.log("++++++++ componentDidUpdate BULK_SECTOR_WRITE  ++++++++++");
        this.props.sendSoftwareUpdateData(BULK_SECTOR_WRITE, this.props.software_update, devices[0]);
      }
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == PACKET_SEND){
      if(this.props.software_update.update_progress_status != prevProps.software_update.update_progress_status){
        console.log("Will start packet send", this.propssoftware_update);
        this.props.sendSoftwareUpdateData(PACKET_SEND, this.props.software_update, devices[0]);
      }
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == BLOCK_VALIDATE){
      if(this.props.software_update.update_progress_status != prevProps.software_update.update_progress_status){
        console.log("Will validate block", this.props.software_update);
        this.props.sendSoftwareUpdateData(BLOCK_VALIDATE, this.props.software_update, devices[0]);
      }
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == SECTOR_WRITE){
      if(this.props.software_update.update_progress_status != prevProps.software_update.update_progress_status){
        console.log("Will write sector", this.props.software_update);
        this.props.sendSoftwareUpdateData(SECTOR_WRITE, this.props.software_update, devices[0]);
      }
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == TRANSFER_COMPLETED){
      console.log("Transfer complete in device", this.props.software_update, this.props.system_settings);
      this.props.updateDeviceDBData(this.props.system_settings.serialNumber, this.props.software_update);
      console.log("Transfer complete success message");
      this.props.handleUpdateSuccess();
      this.setState({device_update_status: UPDATE_NOT_STARTED});
    }
    else if(this.state.device_update_status == UPDATE_IN_PROGRESS && this.props.software_update.update_progress_status == UPDATE_ERROR){
      if(this.props.software_update.update_progress_status != prevProps.software_update.update_progress_status){
        console.log("###################Update Error", this.props.software_update, this.props.system_settings);
        this.props.handleUpdateError();
        this.setState({device_update_status: UPDATE_NOT_STARTED});
      }
    }

  }

  render(){
    return (
        <div class="ui container">
          {this.renderSteps()}
          <DeviceInfo 
            deviceSettings = {this.props.system_settings}
            onDeviceSearch={this.connectToDevice}
            onSelectTab={this.selectTab}
          />
          <br /><br />
          {this.renderTabs()}
          {this.displayModal()}
        </div>
    );
  }
}

function mapStateToProps(state){
  return { 
           system_settings: state.system_settings,
           software_update: state.software_update,
           software_search: state.software_search,
           messages: state.messages
         };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ loadFTPFile, handleDeviceDataResult, sendSoftwareUpdateData, sendBulkUpdateData,handleDeviceRemoved, setSystemSetting, saveSystemConfig, fetchSoftware, updateDeviceDBData, handleUpdateError, handleUpdateSuccess, hideDialog }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Device);

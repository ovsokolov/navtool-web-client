import React, { Component} from 'react';


import { NO_DEVICE_STATUS, DEVICE_APP_STATUS, DEVICE_SBL_STATUS} from '../utils/constants';

var iconColor = '';

export default class DeviceInfo extends Component {

  constructor(props){
    super(props);

    this.renderDeviceStatus = this.renderDeviceStatus.bind(this);
    this.renderDeviceIcon = this.renderDeviceIcon.bind(this);
    this.renderDevice = this.renderDevice.bind(this);

    this.renderDeviceInfo = this.renderDeviceInfo.bind(this);
    this.renderSearchDevice = this.renderSearchDevice.bind(this);
    this.renderSoftwareVersion = this.renderSoftwareVersion.bind(this);
    this.renderMCU = this.renderMCU.bind(this);
    this.createCopyButton = this.createCopyButton.bind(this);
  }


  componentDidMount(){
    //const clipboard = new Clipboard('.mcu')
  }

  renderDeviceIcon(){
    iconColor = "white";
    if(this.props.deviceSettings.bootloaderMode == DEVICE_APP_STATUS){
      iconColor = "blue";
    }else if (this.props.deviceSettings.bootloaderMode == DEVICE_SBL_STATUS) {
      iconColor = "red";
    }
    return (
        <div className="two wide column">
            <i className={`huge ${iconColor} desktop icon`}></i>
            { this.renderDeviceStatus() }
        </div>
    );
}

  renderDeviceStatus(){
      var deviceStatus = "DEVICE NOT CONNECTED";
      if(this.props.deviceSettings.bootloaderMode == DEVICE_APP_STATUS){
        deviceStatus = "APPLICATION MODE";
      }else if (this.props.deviceSettings.bootloaderMode == DEVICE_SBL_STATUS) {
        deviceStatus = "UPDATE MODE";
      }
      return (
          <div className="row">
            {deviceStatus}
          </div>
      );
  }

  renderDevice(){
    if(this.props.deviceSettings.bootloaderMode == NO_DEVICE_STATUS){
      return this.renderSearchDevice();
    }else{
      return this.renderDeviceInfo();
    }
  }

  renderSearchDevice(){
    return(
        <div className="fourteen wide column">
            <button onClick={this.props.onDeviceSearch} className="ui primary button">CLICK HERE TO CONNECT DEVICE TO COMPUTER</button>
        </div>
    );
  }

  renderDeviceInfo(){
    return(
      <div className="fourteen wide column left aligned ">
          <div className="row">
              <div className={`ui ${iconColor} horizontal label`}>Vehicle Make:</div>{this.props.deviceSettings.carMake}
          </div>
          <div>&nbsp;</div>
          <div className="row">
              <div className={`ui ${iconColor} horizontal label`}>Vehicle Model:</div>{this.props.deviceSettings.carModel}
          </div>
          <div>&nbsp;</div>
          <div className="row">
              <div className={`ui ${iconColor} horizontal label`}>Vehicle Years:</div>{this.props.deviceSettings.softwareYears}
          </div>
          <div>&nbsp;</div>
          <div className="row">
              <div className={`ui ${iconColor} horizontal label`}>Software Description:</div>{this.props.deviceSettings.softwareDescription}
              <br /><br/>
          </div>
          <div className="row">
              <div className={`ui ${iconColor} horizontal label`}>Device Model:</div>{this.props.deviceSettings.mfgId}
              {this.renderSoftwareVersion()}
              {this.renderMCU()}
          </div>            
      </div>
    );
}


  renderSoftwareVersion(){
    console.log("renderSoftwareVersion")
    console.log(this.props.deviceSettings)
      if(this.props.deviceSettings.bootloaderMode != NO_DEVICE_STATUS){
        return (
          <span>
            &nbsp;&nbsp;Software: {this.props.deviceSettings.softwareId}.{this.props.deviceSettings.softwareBuild}
          </span>
        );
      }else{
        return(
          <span />
        );
      }
  }

  renderMCU(){
    console.log("renderMCU")
    console.log(this.props.deviceSettings)
      if(this.props.deviceSettings.bootloaderMode != NO_DEVICE_STATUS){
        return (
          <span>
            &nbsp;&nbsp;MCU: {this.props.deviceSettings.serialNumber}
          </span>
        );
      }else{
        return(
          <span />
        );
      }   
  }

  createCopyButton(){
       if(this.props.deviceStatus.app_status == DEVICE_APP_STATUS){
        return (
          <button className="mcu" data-clipboard-text={this.props.deviceInfo.mcu_serial}>
               <i className="copy icon"></i>CLICK HERE TO COPY SERIAL NUMBER
          </button>
        );
      }else if (this.props.deviceStatus.app_status == DEVICE_SBL_STATUS) {
        return(
          <span />
        );
      }      
  }

  render(){
    return (
        <div>
            <div className="ui center aligned page grid">
              <div className="sixteen column row">
                { this.renderDeviceIcon() }
                { this.renderDevice() }
              </div>
            </div>
        </div>
    );
  }
}
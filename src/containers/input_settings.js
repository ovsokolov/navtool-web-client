import React, { Component} from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {    INPUT_1_CONFIG,
            INPUT_2_CONFIG,
            INPUT_3_CONFIG,
            INPUT_4_CONFIG } from '../utils/structures'; 

import { UPDATE_SYSTEM_SETTINGS } from '../utils/constants'; 

import {  setSystemSetting } from '../actions/hid_actions';

class InputSettings extends Component {
  constructor(props){
    super(props);
    this.renderInputDropdown = this.renderInputDropdown.bind(this);
    this.setInputDropdown = this.setInputDropdown.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.resetSettings = this.resetSettings.bind(this);
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

  setInputDropdown(event){
    //let osd_settings = this.state.osd_settings;
    //osd_settings[event.target.id] = event.target.value;
    console.log(event.target.id, event.target.value);
    console.log(this.props.system_settings);
    this.props.setSystemSetting(UPDATE_SYSTEM_SETTINGS, event.target.id, event.target.value);
  }

  saveSettings(){
    this.props.onDeviceSettingsSave();
  }

  resetSettings(){
    this.props.onResetSettings();
  }

  render(){
    return (
        <div>
            <div class="ui stackable grid">

                <div className="row">
                    <div className="ui right pointing label">
                        Input 1
                    </div> 
                    <select onChange={this.setInputDropdown} id={INPUT_1_CONFIG["id"]} className="ui dropdown">
                    { INPUT_1_CONFIG["values"].map( (elem, index) => {return this.renderInputDropdown(elem,index,this.props.system_settings["rearCamera"]);} ) }
                    </select>
                    <br ></br><br ></br>
                </div>
                
                <div className="row">
                    <div className="ui right pointing label">
                        Input 2
                    </div> 
                    <select onChange={this.setInputDropdown} id={INPUT_2_CONFIG["id"]} className="ui dropdown">
                    { INPUT_2_CONFIG["values"].map( (elem, index) => {return this.renderInputDropdown(elem,index,this.props.system_settings["frontCamera"]);} ) }
                    </select> 
                </div>

                <div className="row">
                    <div className="ui right pointing label">
                        Input 3
                    </div> 
                    <select onChange={this.setInputDropdown} id={INPUT_3_CONFIG["id"]} className="ui dropdown">
                    { INPUT_3_CONFIG["values"].map( (elem, index) => {return this.renderInputDropdown(elem,index,this.props.system_settings["leftCamera"]);} ) }
                    </select> 
                </div>

                <div className="row">
                    <div className="ui right pointing label">
                        Input 4
                    </div> 
                    <select onChange={this.setInputDropdown} id={INPUT_4_CONFIG["id"]} className="ui dropdown">
                    { INPUT_4_CONFIG["values"].map( (elem, index) => {return this.renderInputDropdown(elem,index,this.props.system_settings["rightCamera"]);} ) }
                    </select> 
                </div>
                <div className="row">
                    <button onClick={this.resetSettings} className="ui primary button">
                        Reset
                    </button>
                    <button onClick={this.saveSettings} className="ui red button">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
  }
}


function mapStateToProps(state){
  return { system_settings: state.system_settings };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ setSystemSetting }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(InputSettings);
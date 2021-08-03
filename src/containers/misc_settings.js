import React, { Component} from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Radio } from 'semantic-ui-react'

import {  
    AUTO_SWITCH_RADIO,
    AUDIO_FEEDBACK_RADIO,
    ACTIVATION_WIRE_RADIO } from '../utils/structures'; 

import { UPDATE_SYSTEM_SETTINGS } from '../utils/constants'; 

import {  setSystemSetting } from '../actions/hid_actions';

class MiscSettings extends Component {
  constructor(props){
    super(props);
    this.saveSettings = this.saveSettings.bind(this);
    this.resetSettings = this.resetSettings.bind(this);
    this.renderRadioBatton = this.renderRadioBatton.bind(this);
    this.onRadioBattonChange = this.onRadioBattonChange.bind(this);
    this.renderToggleRadioBatton = this.renderToggleRadioBatton.bind(this);
    this.onToggleRadioBattonChange = this.onToggleRadioBattonChange.bind(this);
  }
  renderToggleRadioBatton(setting){
    console.log('renderToggleRadioBatton: ',setting );
    return (
        <div>
            <Radio 
                toggle
                value = {setting} 
                checked={1 == this.props.system_settings[setting]} 
                onChange={(event, {checked, value }) => this.onToggleRadioBattonChange(checked,value)}        
            /> 
        </div>  
    );  
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

  onToggleRadioBattonChange(checked,setting){
    console.log('onToggleRadioBattonChange');
    console.log(checked);
    console.log(setting);
    this.props.setSystemSetting(UPDATE_SYSTEM_SETTINGS, setting, checked?"1":"0");
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
                    <div className="ui label">
                        {AUTO_SWITCH_RADIO["label"]}:
                    </div> 
                    { 
                        this.renderToggleRadioBatton(AUTO_SWITCH_RADIO["id"])
                        /*AUTO_SWITCH_RADIO["values"].map( (elem, index) => {return this.renderRadioBatton(elem,index)})*/
                    }   
                </div>  
                <div className="row">
                    <div className="ui label">
                        {AUDIO_FEEDBACK_RADIO["label"]}:
                    </div> 
                    { 
                        this.renderToggleRadioBatton(AUDIO_FEEDBACK_RADIO["id"])
                        /*AUDIO_FEEDBACK_RADIO["values"].map( (elem, index) => {return this.renderRadioBatton(elem,index)})*/
                    }   
                </div>  
                <div className="row">
                    <div className="ui label">
                        {ACTIVATION_WIRE_RADIO["label"]}:
                    </div> 
                    {
                        this.renderToggleRadioBatton(ACTIVATION_WIRE_RADIO["id"])
                        /*ACTIVATION_WIRE_RADIO["values"].map( (elem, index) => {return this.renderRadioBatton(elem,index)})*/
                    }   
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

export default connect(mapStateToProps, mapDispatchToProps)(MiscSettings);
import React, { Component} from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchModel } from '../actions/get_software';
import { fetchYear, setYear } from '../actions/get_software';
import { setTransmissionType } from '../actions/get_software';
import { fetchSoftware, setSoftware, resetSearch } from '../actions/get_software';

import CarMakeList from './make_list';
import CarModelList from './model_list'
import CarYearList from './year_list'
import SoftwareList from './software_list'
import TransmissionOptionList from './transmission_option'

class SoftwareSearch extends Component {
  constructor(props){
    super(props);
    this.state = {mfg_id: '', vehicle_make: '', vehicle_model: '', vehicle_year: '', sw_id: ''};
    this.setVehicleMake = this.setVehicleMake.bind(this);
    this.setVehicleModel = this.setVehicleModel.bind(this);
    this.setVehicleYear = this.setVehicleYear.bind(this);
    this.handleTransmissionChange = this.handleTransmissionChange.bind(this);
    this.searchSoftware = this.searchSoftware.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.setSelectedSoftware = this.setSelectedSoftware.bind(this);
  }

  searchSoftware(){
    if(this.props.software_search.mfg_id.length == 0){
      alert("Please connect device first");
      return;
    }
    console.log(this.props.software_search);
    this.props.fetchSoftware(
      this.props.software_search.mfg_id,
      this.props.software_search.vehicle_make,
      this.props.software_search.vehicle_model,
      this.props.software_search.vehicle_year,
      this.props.software_search.automatic_transmission
    );
  }

  handleTransmissionChange(value){
    //this.props.setTransmissionType(event.target.value);
    this.props.setTransmissionType(value);
  }

  setVehicleMake(vehicle_make){
    this.props.fetchModel(this.props.software_search.mfg_id, vehicle_make);
  }

  setVehicleModel(vehicle_model){
    this.props.fetchYear(this.props.software_search.mfg_id,
                         this.props.software_search.vehicle_make,
                         vehicle_model);
  }

  setVehicleYear(vehicle_year){
    this.props.setYear(vehicle_year);
  }

  setSelectedSoftware(software_id){
    //console.log("Software Slected: ", software_id);
    this.props.setSoftware(software_id);
  }

  resetSearch(){
    this.props.resetSearch();
  }

  render(){
    return (
      <div>
        <div class="ui grid">
            <div class="three wide column">
                <CarMakeList
                onSelectVehicleMake={this.setVehicleMake}
                />
            </div>
            <div class="three wide column">
                <CarModelList
                 onSelectVehicleModel={this.setVehicleModel}
                />
            </div>
            <div class="three wide column">
                <CarYearList
                onSelectVehicleYear={this.setVehicleYear}
                />
            </div>
            <div class="three wide column">
                <TransmissionOptionList
                onSelectTransmissionOption={this.handleTransmissionChange}
                />
            </div>
            <div class="two wide column">
                <button className="ui blue button" onClick={this.searchSoftware} >
                    <i className="search icon"></i>
                    Search
                </button>
            </div>
            <div class="two wide column">
                <div class="row">
                    <button className="ui blue button" onClick={this.resetSearch} >
                        <i className="undo icon"></i>
                        Reset
                    </button>
                </div>
                <br /><br />
                <div className="row">
                    <button className="ui red button" onClick={this.props.onInstallClick} >
                    <i className="download icon"></i>
                        Install
                    </button>
                </div>
            </div>
        </div>
        <div className="container">
            <SoftwareList
              onSelectSoftware={this.setSelectedSoftware}
            />
        </div>
      </div>
    );
  }
}


function mapStateToProps(state){
  return { software_search: state.software_search };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchModel, fetchYear, setTransmissionType, setYear, fetchSoftware, setSoftware, resetSearch }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SoftwareSearch);
import React, { Component} from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';



class CarMakeList extends Component {
  constructor(props){
    super(props);
    this.selectMake = this.selectMake.bind(this);
    this.renderCarMake = this.renderCarMake.bind(this);
    ////console.log("in list", this.state.mfg_id);
  }

  selectMake(event){
    //console.log("inside searchModel", event.target.value);
    this.props.onSelectVehicleMake(event.target.value);
  }

  renderCarMake(carMake, index){
    if(this.props.software_search.vehicle_make == carMake.make_id){
        return (
            <option key={carMake.vehicle_make}
                    value={carMake.make_id}
                    selected
            >
                {carMake.vehicle_make}
            </option>
        );
    }else{
        return (
            <option key={carMake.vehicle_make}
                    value={carMake.make_id}
            >
            {carMake.vehicle_make}
            </option>
        );
    }
  }

  render(){
    return (
        <select className="ui dropdown compact" onChange={this.selectMake}>
          { this.props.car_make.list.map(this.renderCarMake) }
        </select>
    );
  }
}


function mapStateToProps(state){
  return { car_make: state.car_make,
           software_search: state.software_search,
        };
}


export default connect(mapStateToProps)(CarMakeList);
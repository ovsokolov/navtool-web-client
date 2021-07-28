import React, { Component} from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net';
import { connect} from 'react-redux';




class SoftwareList extends Component {
  constructor(props){
    super(props);
    this.selectSoftware = this.selectSoftware.bind(this);
    this.renderSoftware = this.renderSoftware.bind(this);
  }

  selectSoftware(value){
    console.log("inside selectSoftware", value);
    this.props.onSelectSoftware(value);
  }

  renderSoftware(software, index){
    //console.log(software);
    return (
      <tr>
        <td>{software.id}</td>
        <td>{software.vehicle_make}</td>
        <td>{software.vehicle_model}</td>
        <td>{software.vehicle_year_from} - {software.vehicle_year_to}</td>
        <td>{software.sw_description}</td>
      </tr>
    );
  }

  componentDidMount(){
    var table = $('#software-list').DataTable( {
        bDestroy: true,
        bFilter: false,
        oLanguage: {
          sEmptyTable: "Click Search Button or Contact Technical Support"
        },
        data: [],
        columns: [
            { title: "ID" },
            { title: "SW ID" },
            { title: "SW BUILD" },
            { title: "MAKE" },
            { title: "MODEL" },
            { title: "YEAR" },
            { title: "DESCRIPTION" }
        ],
        columnDefs: [
          { width: "7%", targets: [0,2] },
          { width: "13%", targets: [3,5] },
          { width: "50%", targets: [6] }
        ],
        order: [[ 3, "asc" ],[ 4, "asc" ]]
    } );
    $('#software-list thead').css("font-size", '12px');
    $('#software-list tbody').css("font-size", '10px');
    $('#software-list_info').css("font-size", '14px');
    $('#software-list_paginate').css("font-size", '14px');
    $('#software-list_length').css("font-size", '14px');
    $('#software-list tbody').off('click');
    $('#software-list tbody').on( 'click', 'tr', function (event) {
        if ( $(event.target.parentElement).hasClass('selected') ) {
            $(event.target.parentElement).removeClass('selected');
        }
        else {
            $('#software-list tr').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
  }

  componentDidUpdate(nextProps){
    var dataSet = [];
    //console.log(this.props.software_list);
    this.props.software_list.forEach(function(software){
      console.log(software);
      var row = [software.id, software.sw_id,software.sw_build,software.vehicle_make,software.vehicle_model,"".concat(software.vehicle_year_from, "-", software.vehicle_year_to), software.sw_description];
      dataSet.push(row);
     });
    console.log("dataset");
    console.log(dataSet);
    var table = $('#software-list').DataTable( {
        bDestroy: true,
        bFilter: false,
        oLanguage: {
          sEmptyTable: "Click Search Button or Contact Technical Support"
        },
        data: dataSet,
        order: [[ 3, "asc" ],[ 4, "asc" ]]
    } );

    $('#software-list thead').css("font-size", '12px');
    $('#software-list tbody').css("font-size", '10px');
    $('#software-list_info').css("font-size", '14px');
    $('#software-list_paginate').css("font-size", '14px');
    $('#software-list_length').css("font-size", '14px');

    $('#software-list tbody').off('click');
    $('#software-list tbody').on( 'click', 'tr', (event) => {
        if ( $(event.target.parentElement).hasClass('selected') ) {
            $(event.target.parentElement).removeClass('selected');
        }
        else {
            $('#software-list tr').removeClass('selected');
            $(event.target.parentElement).addClass('selected');
            var data = table.row(event.target.parentElement).data();
            console.log('row click');
            console.log(data);
            this.selectSoftware(data[0]);
        }
    }
    );
  }

  render(){
    return (
        <table id="software-list" className="display" cellSpacing="0" width="100%"></table>
    );
  }
}

function mapStateToProps(state){
  return { software_list: state.software_list };
}

export default connect(mapStateToProps)(SoftwareList);
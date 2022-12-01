import { NO_DEVICE_STATUS } from '../utils/constants';
/*
export const SYSTEM_SETTINGS = {McuNumber: '',
                                mfgID: '',
                                SoftwareId: '',
                                SoftwareBuild: '',
                                bootloaderMode: false,
                                apiVersion: '',
                                deviceSettingsType: '', 
                                deviceSwDescription: '', 
                                deviceSwYears: '',
                                SoundSupported: '',
                                ObdSupported:'',
                                ConfigSupported:'',
                                RearCameraSupported:'',
                                FrontCameraSupported:'',
                                LeftCameraSupported:'',
                                RightCameraSupported:'',
                                ReservedSupported:'',
                                SoundEnabled:'',
                                RearCameraEnabled:'',
                                FrontCameraEnabled:'',
                                LeftCameraEnabled:'',
                                RightCameraEnabled:'',
                                FactoryRearCamera:'',
                                FactoryFrontCamera:'',
                                FactoryLeftCamera:'',
                                HDMIEnabled:'',
                                RGBEnabled:'',
                                Input1Enabled:'',
                                Input2Enabled:'',
                                Input3Enabled:'',
                                Input4Enabled:'',
                                NotUsed:'',
                                FactoryRightCamera:'',
                                FrontCameraMode:'',
                                SideCameraMode:'',
                                ResrvedBits:'',
                                IsDefaultSettings: '',
                                VideoInputs: '',
                                VIMCapacity: '',
                                RGBCapacity: '',
                                HDMICapacity: '',
                                ParkingLinesDisabled: '',
                                ScreenSize: '',
                                CSyncPolarity: '',
                                SOGEnabled: '',
                                VIMEnabled: '',
                                VideoSize1: '',
                                VideoSize2: '',
                                VideoSize3: '',
                                VideoSize4: '',
                                VideoFunction1: '',
                                VideoFunction2: '',
                                VideoFunction3: '',
                                VideoFunction4: ''}
*/
export const SYSTEM_SETTINGS = {  mfgId: '',
                                  serialNumber: '',
                                  softwareId: '',  
                                  softwareBuild: '',
                                  softwareDescription: '',
                                  softwareYears: '',
                                  carMake: '',
                                  carModel: '',
                                  partId: '',
                                  apiVersion: '',
                                  bootloaderMode: NO_DEVICE_STATUS,
                                  rearCamera: 0,
                                  frontCamera: 0,
                                  leftCamera: 0,
                                  rightCamera: 0,
                                  autoSwitch: '',
                                  activationWire: '',
                                  audioFeedback: '' }


export const OSD_SETTINGS = { osd_enabled: false,
                              BackgroundColor: 16,
                              TextColor: 7,
                              HighlightColor: 112,
                              Reserved1: 255,
                              OsdCVBS1: '',
                              OsdCVBS2: '',
                              OsdCVBS3: '',
                              OsdCVBS4: '',
                              TextMenuHDMI: '',
                              TextMenuRGB: '',
                              TextMenuCh1: '',
                              TextMenuCh2: '',
                              TextMenuCh3: '',
                              TextMenuCh4: '',
                              Reserved2: '',
                              Reserved3: ''}


export const TRANSFER_SET_UP_DATA_RESPONSE = {
              block_size: '',
              blocks_count: '',
              packet_size: '',
              start_sector: '',
              total_secotrs: ''
}

export const TRANSFER_STATUS_DATA_RESPONSE = {
              sector_number: '',
              block_number: '',
              packet_number: '',
              remaining_packets: '',
              check_sum: ''
}

export const SIDE_CAMERA_DROPDOWN = { id:'SideCameraMode',
values:[
  {
    value:'001', 
    label:'LEFT/RIGHT LANE WATCH CAMERA MANUAL ACTIVATION MODE',
    key:'SC1',
    setting:'SideCameraMode',
    description: [
      'Left and Right Lane watch cameras can be only turned on manually by the user at anytime.' 
    ]
  },
  {
    value:'010', 
    label:'LEFT/RIGHT LANE WATCH CAMERA AUTOMATIC ACTIVATION MODE VIA TURN SIGNAL',
    key:'SC2',
    setting:'SideCameraMode',
    description: [
      'Manual Without Speed Check - Left and Right Lane watch cameras turn on automatically when turn signals are activated at any speed.<br/><br/>', 
      'Left and Right Lane watch cameras can be turned on manually by the user at anytime.'
    ]
  },
  {
    value:'011', 
    label:'LEFT/RIGHT LANE WATCH CAMERA AUTOMATIC ACTIVATION MODE VIA TURN SIGNAL WITH TRAVELING OVER 15 MPH',
    key:'SC3',
    setting:'SideCameraMode',
    description: [
      'Left and Right Lane watch cameras turn on automatically when turn signal are activated and vehicle is moving at speed of above 15 MP/H<br/><br/>', 
      'Left and Right Lane watch cameras can be turned on manually by the user at anytime.'
    ]
  }
]}



export const FRONT_REAR_CAMERA_DROPDOWN ={ id:'FrontCameraMode',
values:[
  {
    value:'01', 
    label:'FORWARD FACING CAMERA MANUAL ACTIVATION MODE',
    key:'FR1',
    setting:'FrontCameraMode',
    description: [
      'Rear camera turns on automatically in reverse or can be turned on manually by the user at anytime (manual camera activation is only possible with aftermarket camera, or if factory camera is re-routed via the interface).<br/><br/>',
      'Front camera can be only turned on manually by the user at anytime.'
    ]
  },
  {
    value:'11',
    label:'FORWARD FACING CAMERA AUTOMATIC ACTIVATION MODE ',
    key:'Fr2',
    setting:'FrontCameraMode',
    description: [
      'Rear camera turns on automatically in reverse or can be turned on manually by the user at anytime (manual camera activation is only possible with aftermarket camera, or if factory camera is re-routed via the interface).<br/><br/>' ,
      'Front camera is activated after vehicle is shifted in Drive out of Reverse and stay on the screen up to 10 MP/H.<br/><br/>',
      'Front camera can be turned on manually by user at anytime.'
    ]
  }
]}

export const OBD_FEATURES = { 
  obd_enabled: false,
  obd_expired: '',
  obd_count: 0,
  obd_label_idx1: '',
  obd_label_idx2: '',
  obd_label_idx3: '',
  obd_feature_idx1: '0',
  obd_feature_idx2: '0',
  obd_feature_idx3: '0',
  obd_disable_all: ''
}

export const OSD_INPUT_1_DROPDOWN ={ id:'TextMenuCh1',
values:[
  {value:'11', label:'Rear Camera',key:'CH1_0',setting:'TextMenuCh1'},
  {value:'00', label:'Input 1',key:'CH1_1',setting:'TextMenuCh1'}
]}

export const OSD_INPUT_2_DROPDOWN ={ id:'TextMenuCh2',
values:[
  {value:'11', label:'Front Camera',key:'CH2_0',setting:'TextMenuCh2'},
  {value:'00', label:'Input 2',key:'CH2_1',setting:'TextMenuCh2'}
]}

export const OSD_INPUT_3_DROPDOWN ={ id:'TextMenuCh3',
values:[
  {value:'11', label:'Left Camera',key:'CH3_0',setting:'TextMenuCh3'},
  {value:'00', label:'Input 3',key:'CH3_1',setting:'TextMenuCh3'}
]}

export const OSD_INPUT_4_DROPDOWN ={ id:'TextMenuCh4',
values:[
  {value:'11', label:'Right Camera',key:'CH4_0',setting:'TextMenuCh4'},
  {value:'00', label:'Input 4',key:'CH4_1',setting:'TextMenuCh4'}
]}

export const TRANSMISSION_TYPE_DROPDOWN ={ id:'automatic_transmission',
values:[
  {value:'1', label:'Automatic Transmission',key:'TRAN_0',setting:'automatic_transmission'},
  {value:'0', label:'Manual Transmission',key:'TRAN_1',setting:'automatic_transmission'}
]}

export const SYNC_POLARITY_DROPDOWN ={ id:'CSyncPolarity',
values:[
  {value:'01', label:'Positive',key:'SYNC_0',setting:'CSyncPolarity'},
  {value:'10', label:'Negative',key:'SYNC_1',setting:'CSyncPolarity'}
]}


export const INPUT_1_CONFIG = { id:'rearCamera',
values:[
  {value: '0', label:'Disabled',key:'IN1-0',setting:'rearCamera'},
  {value: '1', label:'Factory Rear Camera',key:'IN1-1',setting:'rearCamera'},
  {value: '2', label:'Video Input',key:'IN1-2',setting:'rearCamera'},
  {value: '3', label:'Aftermarket Rear Camera',key:'IN1-3',setting:'rearCamera'},
  {value: '4', label:'Aftermarket Rear Camera with Parking Lines',key:'IN1-4',setting:'rearCamera'}
]}

export const INPUT_2_CONFIG = { id:'frontCamera',
values:[
  {value: '0', label:'Disabled',key:'IN2-0',setting:'frontCamera'},
  {value: '1', label:'Factory Front Camera',key:'IN2-1',setting:'frontCamera'},
  {value: '2', label:'Video Input',key:'IN2-2',setting:'frontCamera'},
  {value: '3', label:'Aftermarket Front Camera',key:'IN2-3',setting:'frontCamera'},
  {value: '4', label:'Aftermarket Front Camera with Parking Lines',key:'IN2-4',setting:'frontCamera'}
]}

export const INPUT_3_CONFIG = { id:'leftCamera',
values:[
  {value: '0', label:'Disabled',key:'IN3-0',setting:'leftCamera'},
  {value: '1', label:'Factory Left Camera',key:'IN3-1',setting:'leftCamera'},
  {value: '2', label:'Video Input',key:'IN3-2',setting:'leftCamera'},
  {value: '3', label:'Aftermarket Left Camera',key:'IN3-3',setting:'leftCamera'},
  {value: '4', label:'Aftermarket Left Camera with Parking Lines',key:'IN3-4',setting:'leftCamera'}
]}

export const INPUT_4_CONFIG = { id:'rightCamera',
values:[
  {value: '0', label:'Disabled',key:'IN4-0',setting:'rightCamera'},
  {value: '1', label:'Factory Right Camera',key:'IN4-1',setting:'rightCamera'},
  {value: '2', label:'Video Input',key:'IN4-2',setting:'rightCamera'},
  {value: '3', label:'Aftermarket Right Camera',key:'IN4-3',setting:'rightCamera'},
  {value: '4', label:'Aftermarket Right Camera with Parking Lines',key:'IN4-4',setting:'rightCamera'}
]}

export const AUTO_SWITCH_RADIO = { id:'autoSwitch', label:  'APPLE CARPLAY/ANDROID AUTO(AUTO ON)',
values:[
  {value: '0', label:'OFF',key:'AU-0',setting:'autoSwitch'},
  {value: '1', label:'ON',key:'AU-1',setting:'autoSwitch'}
]}

export const ACTIVATION_WIRE_RADIO = { id:'activationWire', label:  'MANUAL ACTIVATION WIRE AS REVERSE TRIGGER',
values:[
  {value: '0', label:'OFF',key:'AW-0',setting:'activationWire'},
  {value: '1', label:'ON',key:'AW-1',setting:'activationWire'}
]}

export const AUDIO_FEEDBACK_RADIO = { id:'audioFeedback', label:  'INTERFACE AUDIO FEEDBACK',
values:[
  {value: '0', label:'OFF',key:'AF-0',setting:'audioFeedback'},
  {value: '1', label:'ON',key:'AF-1',setting:'audioFeedback'}
]}

export const FILE_WRITE_STRUCTURE={ LPC18XX : { id: 'FileWriteStracture', sector_size : 8192,
    values: [
      {sectorNumber:'2', pageStart:'0', pageEnd:'15'},
      {sectorNumber:'3', pageStart:'0', pageEnd:'15'},
      {sectorNumber:'4', pageStart:'0', pageEnd:'15'},
      {sectorNumber:'5', pageStart:'0', pageEnd:'15'},
      {sectorNumber:'6', pageStart:'0', pageEnd:'15'},
      {sectorNumber:'7', pageStart:'0', pageEnd:'15'},
      {sectorNumber:'8', pageStart:'0', pageEnd:'15'},
      {sectorNumber:'8', pageStart:'16', pageEnd:'31'},
      {sectorNumber:'8', pageStart:'32', pageEnd:'47'},
      {sectorNumber:'8', pageStart:'48', pageEnd:'63'},
      {sectorNumber:'8', pageStart:'64', pageEnd:'79'},
      {sectorNumber:'8', pageStart:'80', pageEnd:'95'},
      {sectorNumber:'8', pageStart:'96', pageEnd:'111'},
      {sectorNumber:'8', pageStart:'112', pageEnd:'127'},
      {sectorNumber:'9', pageStart:'0', pageEnd:'15'},
      {sectorNumber:'9', pageStart:'16', pageEnd:'31'},
      {sectorNumber:'9', pageStart:'32', pageEnd:'47'},
      {sectorNumber:'9', pageStart:'48', pageEnd:'63'},
      {sectorNumber:'9', pageStart:'64', pageEnd:'79'},
      {sectorNumber:'9', pageStart:'80', pageEnd:'95'},
      {sectorNumber:'9', pageStart:'96', pageEnd:'111'},
      {sectorNumber:'9', pageStart:'112', pageEnd:'127'},
      {sectorNumber:'10', pageStart:'0', pageEnd:'15'},
      {sectorNumber:'10', pageStart:'16', pageEnd:'31'},
      {sectorNumber:'10', pageStart:'32', pageEnd:'47'},
      {sectorNumber:'10', pageStart:'48', pageEnd:'63'},
      {sectorNumber:'10', pageStart:'64', pageEnd:'79'},
      {sectorNumber:'10', pageStart:'80', pageEnd:'95'},
      {sectorNumber:'10', pageStart:'96', pageEnd:'111'},
      {sectorNumber:'10', pageStart:'112', pageEnd:'127'}
    ]
  },
     LPC17XX : { id: 'FileWriteStracture', sector_size : 4096,
     values: [
      {sectorNumber:'16', pageStart:'0', pageEnd:'7'},
      {sectorNumber:'16', pageStart:'8', pageEnd:'15'},
      {sectorNumber:'16', pageStart:'16', pageEnd:'23'},
      {sectorNumber:'16', pageStart:'24', pageEnd:'31'},
      {sectorNumber:'16', pageStart:'32', pageEnd:'39'},
      {sectorNumber:'16', pageStart:'40', pageEnd:'47'},
      {sectorNumber:'16', pageStart:'48', pageEnd:'55'},
      {sectorNumber:'16', pageStart:'56', pageEnd:'63'},
      {sectorNumber:'17', pageStart:'0', pageEnd:'7'},
      {sectorNumber:'17', pageStart:'8', pageEnd:'15'},
      {sectorNumber:'17', pageStart:'16', pageEnd:'23'},
      {sectorNumber:'17', pageStart:'24', pageEnd:'31'},
      {sectorNumber:'17', pageStart:'32', pageEnd:'39'},
      {sectorNumber:'17', pageStart:'40', pageEnd:'47'},
      {sectorNumber:'17', pageStart:'48', pageEnd:'55'},
      {sectorNumber:'17', pageStart:'56', pageEnd:'63'},
      {sectorNumber:'18', pageStart:'0', pageEnd:'7'},
      {sectorNumber:'18', pageStart:'8', pageEnd:'15'},
      {sectorNumber:'18', pageStart:'16', pageEnd:'23'},
      {sectorNumber:'18', pageStart:'24', pageEnd:'31'},
      {sectorNumber:'18', pageStart:'32', pageEnd:'39'},
      {sectorNumber:'18', pageStart:'40', pageEnd:'47'},
      {sectorNumber:'18', pageStart:'48', pageEnd:'55'},
      {sectorNumber:'18', pageStart:'56', pageEnd:'63'},
      {sectorNumber:'19', pageStart:'0', pageEnd:'7'},
      {sectorNumber:'19', pageStart:'8', pageEnd:'15'},
      {sectorNumber:'19', pageStart:'16', pageEnd:'23'},
      {sectorNumber:'19', pageStart:'24', pageEnd:'31'},
      {sectorNumber:'19', pageStart:'32', pageEnd:'39'},
      {sectorNumber:'19', pageStart:'40', pageEnd:'47'},
      {sectorNumber:'19', pageStart:'48', pageEnd:'55'},
      {sectorNumber:'19', pageStart:'56', pageEnd:'63'},
      {sectorNumber:'20', pageStart:'0', pageEnd:'7'},
      {sectorNumber:'20', pageStart:'8', pageEnd:'15'},
      {sectorNumber:'20', pageStart:'16', pageEnd:'23'},
      {sectorNumber:'20', pageStart:'24', pageEnd:'31'},
      {sectorNumber:'20', pageStart:'32', pageEnd:'39'},
      {sectorNumber:'20', pageStart:'40', pageEnd:'47'},
      {sectorNumber:'20', pageStart:'48', pageEnd:'55'},
      {sectorNumber:'20', pageStart:'56', pageEnd:'63'},
      {sectorNumber:'21', pageStart:'0', pageEnd:'7'},
      {sectorNumber:'21', pageStart:'8', pageEnd:'15'},
      {sectorNumber:'21', pageStart:'16', pageEnd:'23'},
      {sectorNumber:'21', pageStart:'24', pageEnd:'31'},
      {sectorNumber:'21', pageStart:'32', pageEnd:'39'},
      {sectorNumber:'21', pageStart:'40', pageEnd:'47'},
      {sectorNumber:'21', pageStart:'48', pageEnd:'55'},
      {sectorNumber:'21', pageStart:'56', pageEnd:'63'}
    ]
  }

}
/*
export const FILE_WRITE_STRUCTURE={ id: 'FileWriteStracture',
  values: [
    {sectorNumber:'16', pageStart:'0', pageEnd:'7'},
    {sectorNumber:'16', pageStart:'8', pageEnd:'15'},
    {sectorNumber:'16', pageStart:'16', pageEnd:'23'},
    {sectorNumber:'16', pageStart:'24', pageEnd:'31'},
    {sectorNumber:'16', pageStart:'32', pageEnd:'39'},
    {sectorNumber:'16', pageStart:'40', pageEnd:'47'},
    {sectorNumber:'16', pageStart:'48', pageEnd:'55'},
    {sectorNumber:'16', pageStart:'56', pageEnd:'63'},
    {sectorNumber:'17', pageStart:'0', pageEnd:'7'},
    {sectorNumber:'17', pageStart:'8', pageEnd:'15'},
    {sectorNumber:'17', pageStart:'16', pageEnd:'23'},
    {sectorNumber:'17', pageStart:'24', pageEnd:'31'},
    {sectorNumber:'17', pageStart:'32', pageEnd:'39'},
    {sectorNumber:'17', pageStart:'40', pageEnd:'47'},
    {sectorNumber:'17', pageStart:'48', pageEnd:'55'},
    {sectorNumber:'17', pageStart:'56', pageEnd:'63'},
    {sectorNumber:'18', pageStart:'0', pageEnd:'7'},
    {sectorNumber:'18', pageStart:'8', pageEnd:'15'},
    {sectorNumber:'18', pageStart:'16', pageEnd:'23'},
    {sectorNumber:'18', pageStart:'24', pageEnd:'31'},
    {sectorNumber:'18', pageStart:'32', pageEnd:'39'},
    {sectorNumber:'18', pageStart:'40', pageEnd:'47'},
    {sectorNumber:'18', pageStart:'48', pageEnd:'55'},
    {sectorNumber:'18', pageStart:'56', pageEnd:'63'},
    {sectorNumber:'19', pageStart:'0', pageEnd:'7'},
    {sectorNumber:'19', pageStart:'8', pageEnd:'15'},
    {sectorNumber:'19', pageStart:'16', pageEnd:'23'},
    {sectorNumber:'19', pageStart:'24', pageEnd:'31'},
    {sectorNumber:'19', pageStart:'32', pageEnd:'39'},
    {sectorNumber:'19', pageStart:'40', pageEnd:'47'},
    {sectorNumber:'19', pageStart:'48', pageEnd:'55'},
    {sectorNumber:'19', pageStart:'56', pageEnd:'63'},
    {sectorNumber:'20', pageStart:'0', pageEnd:'7'},
    {sectorNumber:'20', pageStart:'8', pageEnd:'15'},
    {sectorNumber:'20', pageStart:'16', pageEnd:'23'},
    {sectorNumber:'20', pageStart:'24', pageEnd:'31'},
    {sectorNumber:'20', pageStart:'32', pageEnd:'39'},
    {sectorNumber:'20', pageStart:'40', pageEnd:'47'},
    {sectorNumber:'20', pageStart:'48', pageEnd:'55'},
    {sectorNumber:'20', pageStart:'56', pageEnd:'63'},
    {sectorNumber:'21', pageStart:'0', pageEnd:'7'},
    {sectorNumber:'21', pageStart:'8', pageEnd:'15'},
    {sectorNumber:'21', pageStart:'16', pageEnd:'23'},
    {sectorNumber:'21', pageStart:'24', pageEnd:'31'},
    {sectorNumber:'21', pageStart:'32', pageEnd:'39'},
    {sectorNumber:'21', pageStart:'40', pageEnd:'47'},
    {sectorNumber:'21', pageStart:'48', pageEnd:'55'},
    {sectorNumber:'21', pageStart:'56', pageEnd:'63'}
  ]
}
*/

export const MODAL_MESSAGES = { 
  open_modal: false,
  message_icon: '',
  message_header: '',
  message_text: ''
}


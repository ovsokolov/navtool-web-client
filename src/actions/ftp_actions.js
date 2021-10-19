import axios from 'axios';
import CryptoJS from 'crypto-js';
import {    WEB_SERVICES_URL } from '../utils/constants';
import {    FTP_LOAD_PROGRESS,
            FTP_LOAD_SUCCESS,
            FTP_LOAD_FAILURE,
            START_SOFTWARE_UPDATE }  from '../utils/constants';


//const ROOT_URL = "https://tranquil-mesa-29755.herokuapp.com/ftpload";
const ROOT_URL = WEB_SERVICES_URL + "/v1/ftpload";
//const ROOT_URL = "http://dashconnectplus.com/wp-content/themes/DashConnectPlus/dc_ftp_file_get.php"

export function loadFTPFile(sw_id){
  const url = ROOT_URL + "?sw_id=" + sw_id;
  const request = axios.get(url);

  //console.log('URL', url);
  //console.log('sw_id', sw_id);
  return (dispatch) => {
    dispatch( { type: FTP_LOAD_PROGRESS, payload: "" } );
    request.then( ({data}) =>{
      let words  = CryptoJS.enc.Base64.parse(data.file);
      let fileMD5 = CryptoJS.MD5(words).toString();
      console.log(data);
      console.log(fileMD5);
      if(fileMD5 == data.md5){
        console.log("MD5 calculation is correct");

        dispatch( { type: FTP_LOAD_SUCCESS, payload: data } );
      }else{
        console.log("MD5 calculation not correct");
        dispatch( { type: FTP_LOAD_FAILURE, payload: { message_header: 'FTP File Load', message_text: 'File load failed check sum', id: 'ftpfailed'}});
      }
    },
    error => {
      dispatch( { type: FTP_LOAD_FAILURE, payload: { message_header: 'FTP File Load', message_text: 'File load failed', id: 'ftpfailed'}});

    });

  };
}

import {    SUCCESS_SETTINGS_UPDATE,
            FAILED_SETTINGS_UPDATE,
            FTP_LOAD_FAILURE,
            DISPLAY_UPDATE_ERROR,
            DISPLAY_UPDATE_SUCCESS,
            ICON_INFO,
            ICON_ERROR,
            HIDE_MODAL } from '../utils/constants';
import { MODAL_MESSAGES } from '../utils/structures';

export default function(state = JSON.parse(JSON.stringify(MODAL_MESSAGES)), action){
    //console.log("In message reducer");
    //console.log(action.type);
    let new_state = {};
    switch (action.type){
        case SUCCESS_SETTINGS_UPDATE:
            new_state = Object.assign({}, state, action.payload, {open_modal: true, message_icon: `${ICON_INFO}`});
            return new_state;
        case DISPLAY_UPDATE_SUCCESS:
            new_state = Object.assign({}, state, action.payload, {open_modal: true, message_icon: `${ICON_INFO}`});
            return new_state;
        case FAILED_SETTINGS_UPDATE:
            new_state = Object.assign({}, state, action.payload, {open_modal: true, message_icon: `${ICON_ERROR}`});
            return new_state;
        case FTP_LOAD_FAILURE:
            new_state = Object.assign({}, state, action.payload, {open_modal: true, message_icon: `${ICON_ERROR}`});
            return new_state;
        case DISPLAY_UPDATE_ERROR:
            new_state = Object.assign({}, state, action.payload, {open_modal: true, message_icon: `${ICON_ERROR}`});
            return new_state;
        case HIDE_MODAL:
            new_state = JSON.parse(JSON.stringify(MODAL_MESSAGES));
            return new_state;
        default:
            return state;
    }
    return state;
}
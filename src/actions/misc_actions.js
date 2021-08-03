import { HIDE_MODAL } from '../utils/constants';

export function hideDialog(){  
    return {
        type: HIDE_MODAL,
        payload: ''
    };
}
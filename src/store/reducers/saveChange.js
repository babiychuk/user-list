import { SAVE_CHANGE } from '../types';

const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CHANGE: 
	    return action.payload;
	
	    default:
	    return state;
    }
}
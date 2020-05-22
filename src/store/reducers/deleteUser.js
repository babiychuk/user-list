import { DELETE_USER } from '../types';

const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_USER: 
	    return action.payload;
	
	    default:
	    return state;
    }
}
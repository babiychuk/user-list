import { EDIT_USER } from '../types';

const initialState = {name:'', surname:'', desc:''};

export default (state = initialState, action) => {
    switch (action.type) {
        case EDIT_USER: 
	    return action.payload;
	
	    default:
	    return state;
    }
}
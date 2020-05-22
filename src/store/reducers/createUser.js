import { CREATE_USER } from '../types';

const initialState = {name:'', surname:'', desc:''};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER: 
	    return action.payload;
	
	    default:
	    return state;
    }
}
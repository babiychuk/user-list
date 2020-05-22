import {combineReducers} from 'redux';
import getUsers from './getUsers';
import createUser from './createUser';
import postUser from './postUser';
import editUser from './editUser';
import saveChange from './saveChange';
import selectUser from './selectUser';
import deleteUser from './deleteUser';



export default combineReducers ({
    getUsers,
    createUser,
    postUser,
    editUser,
    saveChange,
    selectUser,
    deleteUser
});
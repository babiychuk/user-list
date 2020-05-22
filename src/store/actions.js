import axios from 'axios';

import { GET_USERS } from './types';
import { CREATE_USER } from './types';
import { POST_USER } from './types';
import { EDIT_USER } from './types';
import { SAVE_CHANGE } from './types';
import { SELECT_USER } from './types';
import { DELETE_USER } from './types';

export const getUsers = () => async dispatch => {
	const response = await axios.get('http://77.120.241.80:8911/api/users');

	dispatch({
		type: GET_USERS,
		payload: response.data
	});
};

export const createUser = (inputData, name) => async (dispatch, getState) => {

	let newUser = { ...getState().createUser };

	inputData === 'clear' ?
		newUser = { name: '', surname: '', desc: '' } :
		newUser[name] = inputData;

	await dispatch({
		type: CREATE_USER,
		payload: newUser
	});
};

export const postUser = () => async (dispatch, getState) => {
	let newUser = { ...getState().createUser };

	const url = 'http://77.120.241.80:8911/api/users';

	await axios.post(url, newUser)
		.then(function () {
			dispatch({
				type: POST_USER,
				payload: newUser
			});
		})
		.catch(function (error) {
			console.log(error);
		});
};

export const editUser = (id, inputData, name) => async (dispatch, getState) => {

	if (id === 'none') {
		let editUser = { ...getState().editUser };

		editUser[name] = inputData;
		dispatch({
			type: EDIT_USER,
			payload: editUser
		});
	} else {
		const response = await axios.get(`http://77.120.241.80:8911/api/user/${id}`);
		dispatch({
			type: EDIT_USER,
			payload: response.data
		});
	}

};

export const saveChange = (id) => async (dispatch, getState) => {

	let url = `http://77.120.241.80:8911/api/user/${id}`;
	const editUser = { ...getState().editUser };
	const response = await axios.put(url, editUser)
		.then(function () {
			dispatch({
				type: SAVE_CHANGE,
				payload: response.data
			});
		})
		.catch(function (error) {
			console.log(error);
		});
};

export const selectUser = (id) => async dispatch => {

	const response = await axios.get(`http://77.120.241.80:8911/api/user/${id}`); 
	dispatch({
		type: SELECT_USER,
		payload: response.data
	});

};

export const deleteUser = (id) => async (dispatch, getState) => {

	let url = `http://77.120.241.80:8911/api/user/${id}`;
	const selectUser = { ...getState().selectUser };
	await axios.delete(url, selectUser)
		.then(function () {
			dispatch({
				type: DELETE_USER,
				payload: selectUser
			});
		})
		.catch(function (error) {
			console.log(error);
		});

};
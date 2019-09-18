/**
 * ************************************
 *
 * @module  actions.js
 * @author Billy and Jake
 * @description Action Creators
 *
 * ************************************
 */

import * as types from './action-types';

export const updateSetName = (setName) => ({
  type: types.UPDATE_SET,
  payload: setName
});

export const addSet = (setName) => ({
  type: types.ADD_SET,
  payload: setName
});

export const updateCardName = (cardName) => ({
  type: types.UPDATE_CARD,
  payload: cardName
});

export const addCard = (cardName) => ({
  type: types.ADD_CARD,
  payload: cardName
});

export const userLogIn = (userInfo) => ({
  type: types.USER_SIGNIN,
  payload: userInfo
});

export const userSignIn = (userInfo) => ({
  type: types.USER_SIGNIN,
  payload: userInfo
});

//thunk that handles login attempt
export const userLogin = user => (dispatch, getState) => {
  fetch("/api/user/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(data => data.json())
    .then(data => dispatch(userLogIn(data)))
    .catch(error => console.error(error));
};

//thunk that handles signup attempt
export const userSignup = user => (dispatch, getState) => {
  fetch("/api/user/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(data => data.json())
    .then(data => dispatch(userSignIn(data)))
    .catch(error => console.log(error));
};

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

export const updateCardFront = (cardFront) => ({
  type: types.UPDATE_CARD_FRONT,
  payload: cardFront
});

export const updateCardBack = (cardBack) => ({
  type: types.UPDATE_CARD_BACK,
  payload: cardBack
});

export const addCard = (card) => (dispatch, getState) => {
  console.log('addCard thunked', card);
  fetch("/addCard", {
    method: "POST",
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(card)
  })
  .then(response => response.json())
  .then(data => {
    console.log('card action triggered', data);
    dispatch(addCardAction(card));
  })
  .catch(e => console.log(e));
}

export const addCardAction = (card) => ({
  type: types.ADD_CARD,
  payload: card
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
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(data => data.json())
    .then(data => {
      console.log('login success!', data);
      dispatch(userLogIn(data))
    })
    .catch(error => console.error(error));
};

//thunk that handles signup attempt
export const userSignup = user => (dispatch, getState) => {
  fetch("/createUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(data => data.json())
    .then(data => {
      console.log('post successful, here is data:', data)
      dispatch(userSignIn(data))
    })
    .catch(error => console.log(error));
};

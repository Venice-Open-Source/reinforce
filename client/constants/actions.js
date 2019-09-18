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

export const userSignIn = (userInfo) => ({
  type: types.USER_SIGNIN,
  payload: userInfo
});
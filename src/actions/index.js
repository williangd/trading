import { CLICK_UPDATE_VALUE, ERR_UPDATE_VALUE } from './actionTypes';

export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  payload: value
});

export const errUpdate = value => ({
  type: ERR_UPDATE_VALUE,
  message: value
});

import * as types from "../constants/action-types";

const initialState = {
  userEmail: "jakeory@yahoo.com",
  sets: [
    { setname: "1", cards: [{ question: answer }, { question2: answer2 }] }
  ]
};

const reinforceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN: {
      const user = {};
      const isSigned = action.payload.isSigned;
      return {
        ...state,
        user
      };
    }

    case types.USER_SIGNUP: {
      const user = {};
      const isSigned = action.payload.isSigned;
      return {
        ...state,
        user
      };
    }

    default:
      return state;
  }
};

export default reinforceReducer;

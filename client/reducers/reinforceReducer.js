import * as types from "../constants/action-types";

const initialState = {
  userEmail: "jakeory@yahoo.com",
  setName: "",
  cardFront: "",
  cardBack: "",
  sets: [
    // {
    //   setname: "", 
    //   cards: [] 
    // }
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

    case types.UPDATE_SET:
      let setName = action.payload;

      return {
        ...state,
        setName: setName
      };
    
    case types.ADD_SET: 
      console.log('action payload in add_set reducer', action.payload);
      const mySet = {
        setname: state.setName,
        cards: []
      };

      const currentSets = state.sets.slice();
      currentSets.push(mySet);

      return {
        ...state,
        sets: currentSets
      }

    default:
      return state;
  }
};

export default reinforceReducer;

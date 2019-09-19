import * as types from "../constants/action-types";

const initialState = {
  isLoggedIn: false,
  userEmail: "jakeory@yahoo.com",
  setName: "",
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

    case types.ADD_CARD: 
      console.log('action.payload in UPDATE_CARD reducer:', action.payload);
      const myCard = {
        setKey: action.payload.setKey,
        cardFront: action.payload.cardFront,
        cardBack: action.payload.cardBack
      };

      const currentSets2 = state.sets.slice();
      currentSets2.forEach((e, i) => {
        if (action.payload.setKey === i) {
          e.cards.push(myCard);
        }
      });

      return {
        ...state,
        sets: currentSets2
      }

    default:
      return state;
  }
};

export default reinforceReducer;

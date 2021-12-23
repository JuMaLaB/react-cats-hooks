const catsReducer = (state, action) => {

  // console.log(`catsReducer state =`);
  // console.log(state);
  // console.log(`catsReducer action =`);
  // console.log(action);

  switch (action.type) {
    case "addCat":
      return { ...state, catsArray: action.data };
    case 'setCats':
      return { ...state, catsArray: action.data };
    default:
      return state;
  }
};

export default catsReducer;
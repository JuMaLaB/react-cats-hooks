const catsReducer = (state, action) => {

  // console.log(`catsReducer state =`);
  // console.log(state);
  // console.log(`catsReducer action =`);
  // console.log(action);

  switch (action.type) {
    case "addCat":
      return { ...state, catsArray: action.data };
    case 'setCats':
      return { ...state, catsArray: action.data, isLoading: false, hasError: false };
    case 'errorHandler':
      return { ...state, hasError: true, error: action.error };
    default:
      return state;
  }
};

export default catsReducer;
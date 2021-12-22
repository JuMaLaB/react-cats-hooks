
const catsReducer = (state, action) => {

  switch (action.type) {
    case 'setCats':
      return { ...state, catsData: action.data };
    default:
      return state;
  }
};

export default catsReducer;
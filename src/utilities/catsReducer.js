const catsReducer = (state, action) => {

  // console.log(`catsReducer => `);

  switch (action.type) {
    case "addCat":
      return { ...state, catsArray: action.data };
    case "deleteCat":
      return { ...state, catsArray: action.data };
    case 'setSelectedCat':
      return { ...state, selectedCats: action.data };
    case 'setDeletedCat':
      return { ...state, deletedCats: action.data };
    case 'setExcludedCat':
      return { ...state, excludedCats: action.data };
    case 'errorHandler':
      return { ...state, hasError: true, error: action.error };
    default:
      return state;
  }
};

export default catsReducer;
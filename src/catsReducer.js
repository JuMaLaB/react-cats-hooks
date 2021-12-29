const catsReducer = (state, action) => {

  // console.log(`catsReducer => `);

  switch (action.type) {
    case "addCat":
      return { ...state, catsArray: action.data };
    case 'setCats':
      return { ...state, catsArray: action.data, isLoading: false, hasError: false };
    case 'setCategories':
      return { ...state, categories: action.data, hasError: false };
    case 'setSelectedCategory':
      return { ...state, selectedCategory: action.id, hasError: false };
    case 'errorHandler':
      return { ...state, hasError: true, error: action.error };
    default:
      return state;
  }
};

export default catsReducer;
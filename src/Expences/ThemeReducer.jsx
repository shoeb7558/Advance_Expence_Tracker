// themeReducer.js
const themeReducer = (state = { darkMode: false }, action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return { ...state, darkMode: !state.darkMode };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  
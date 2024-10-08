import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  destination: localStorage.getItem("destination") || undefined,
  dates: JSON.parse(localStorage.getItem("dates")) || [],
  options: JSON.parse(localStorage.getItem("options")) || {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("destination", state.destination);
    localStorage.setItem("dates", JSON.stringify(state.dates));
    localStorage.setItem("options", JSON.stringify(state.options));
  }, [state.destination, state.dates, state.options]);
  return (
    <SearchContext.Provider
      value={{
        destination: state.destination,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

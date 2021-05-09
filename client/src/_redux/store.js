import {createStore, combineReducers, applyMiddleware} from 'redux';
import { userLoginReducer } from './reducers/auth.reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';


/**
 *LOCALSTORAGE 
 */
const PERSISTENCE_STORAGE = 'persistantState';
// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem(PERSISTENCE_STORAGE, serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }
  
  // load string from localStarage and convert into an Object
  // invalid output must be undefined
  function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("persistantState");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }


/**
 * END LOCALSTORAGE
 */



const reducers = combineReducers({
    userLoginReducer    
});


const store = createStore(reducers,loadFromLocalStorage(),composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(()=>{    
    console.log("CHANGE STATE",store.getState());

    saveToLocalStorage(store.getState());
});

export {
  store, PERSISTENCE_STORAGE
};
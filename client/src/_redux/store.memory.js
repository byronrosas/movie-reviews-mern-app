import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { movieReducer } from './reducers/movie.reducer';
import { reviewReducer } from './reducers/review.reducer';

const reducer = combineReducers({
   movieReducer,
   reviewReducer
});

const storeMemory = createStore( reducer,composeWithDevTools(applyMiddleware(thunk)));

export default storeMemory;
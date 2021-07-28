import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
export const store = createStoreWithMiddleware(reducers);
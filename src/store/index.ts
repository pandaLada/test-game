import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import initialState from './state';


export default function configureStore() {
	const store = createStore(rootReducer, initialState);

	return store;
}

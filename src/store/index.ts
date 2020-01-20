import { createStore } from 'redux';
import rootReducer from './reducers/reducer';
import initialState from './state';


export default function configureStore() {
	const store = createStore(rootReducer, initialState);

	return store;
}

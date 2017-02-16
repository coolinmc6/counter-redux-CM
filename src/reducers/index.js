import { combineReducers } from 'redux';
import CountReducer from './reducer_count';

const rootReducer = combineReducers({
	count: CountReducer
});

export default rootReducer;
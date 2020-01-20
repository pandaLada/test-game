import { combineReducers } from 'redux'
import gameStatusReducer from './gameStatus.reducer';
import playerReducer from './players.reducer';
import boardReducer from './board.reducer';


export default combineReducers({
  board: boardReducer,
  players: playerReducer,
  gameStatus: gameStatusReducer
});

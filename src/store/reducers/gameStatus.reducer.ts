import { GameStatusState, default as initialState } from './../state';
import {
  defineWinner,
  isGameOver,
} from './../../components/board/services/board.service';
import { Action, Actions } from '../actions/actions';

const gameStatusReducer = (
  state: GameStatusState = initialState.gameStatus,
  action: Action
): GameStatusState => {
  switch (action.type) {
    case Actions.InitializeGame:
      return {
        ...state,
        gameStarted: action.gameStarted
      };
    case Actions.MakeStep:
      return {
        ...state,
        gameOver: isGameOver(action.size, action.filledCells)
      };
    case Actions.FinishGame:
      return {
        ...state,
        winner: defineWinner(action.cells)
      };
    case Actions.ResetSettings:
      return {
        gameOver: false,
        gameStarted: false
      };
    default:
      return state;
  }
};

export default gameStatusReducer;

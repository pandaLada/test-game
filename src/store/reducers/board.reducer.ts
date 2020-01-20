import { initializeBoardCells } from '../../components/settings/services/settings.service';
import {
  addStepOnBoard,
} from '../../components/board/services/board.service';
import { Action, Actions } from '../actions/actions';
import { BoardState, default as initialState } from '../state';

const boardReducer = (state: BoardState = initialState.board, action: Action): BoardState => {
  switch (action.type) {
    case Actions.ChangeBoardSize:
      return {
        ...state,
        cells: initializeBoardCells(action.size),
        size: action.size
      };
    case Actions.MakeStep:
      return {
        ...state,
        cells: addStepOnBoard(state.cells, action.step, action.currentPlayer),
        filledCells: state.filledCells + 1
      };
    case Actions.ResetSettings:
      return {
        size: 3,
        filledCells: 0,
        cells: initializeBoardCells(3),
      };
    default:
      return state;
  }
};

export default boardReducer;

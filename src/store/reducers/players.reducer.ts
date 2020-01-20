import {
  calculateCurrentPlayer,
} from './../../components/board/services/board.service';
import { Action, Actions } from '../actions/actions';
import { default as initialState, PlayersState } from '../state';

const playerReducer = (
  state: PlayersState = initialState.players,
  action: Action
): PlayersState => {
  switch (action.type) {
    case Actions.InitializeGame:
      return {
        ...state,
        current: 1,
        count: state.count,
      };
    case Actions.ChangePlayerCount:
      return {
        ...state,
        count: action.playersCount
      };
    case Actions.MakeStep:
      return {
        ...state,
        current: calculateCurrentPlayer(state.current!, state.count)

      };
    case Actions.ResetSettings:
      return {
        count: 2,
      };
    default:
      return state;
  }
};

export default playerReducer;

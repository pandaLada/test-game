import { calculatePlayersCounts, initializeBoardCells } from './../../components/settings/services/settings.service';
import {
	addStepOnBoard,
	calculateCurrentPlayer,
	defineWinner,
	isGameOver,
} from './../../components/board/services/board.service';
import { Action, Actions } from '../actions/actions';
import initialState, { RootState } from '../state';

const reducer = (
	state = initialState,
	action: Action
): RootState => {
	switch (action.type) {
		case Actions.ChangeBoardSize:
			return {
				...state,
				board: {
					...state.board,
					cells: initializeBoardCells(action.size),
					size: action.size
				},
				players: {
					...state.players,
					countOptions: calculatePlayersCounts(action.size)
				}
			};
		case Actions.InitializeGame:
			return {
				...state,
				gameStatus: {
					...state.gameStatus,
					gameStarted: action.gameStarted
				},
				players: {
					...state.players,
					current: 1,
					count: state.players.count ? state.players.count : state.players.countOptions[0]
				}
			};
		case Actions.ChangePlayerCount:
			return {
				...state,
				players: {
					...state.players,
					count: action.playersCount
				}
			};
		case Actions.MakeStep:
			return {
				...state,
				board: {
					...state.board,
					cells: addStepOnBoard(state.board.cells, action.step, state.players.current!),
					filledCells: state.board.filledCells + 1
				},
				players: {
					...state.players,
					current: calculateCurrentPlayer(state.players.current!, state.players.count)
				},
				gameStatus: {
					...state.gameStatus,
					gameOver: isGameOver(state.board.size, state.board.filledCells)
				}
			};
		case Actions.FinishGame:
			return {
				...state,
				gameStatus: {
					...state.gameStatus,
					winner: defineWinner(state.board.cells)
				}
			};
		default:
			return state;
	}
};

export default reducer;

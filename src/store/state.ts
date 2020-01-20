import { initializeBoardCells } from '../components/settings/services/settings.service';

export interface RootState {
	board: BoardState;
	players: PlayersState;
	gameStatus: GameStatusState;
}

export interface GameStatusState {
	gameOver: boolean;
	gameStarted: boolean;
	winner?: number | string;
}

export interface PlayersState {
	count: number;
	countOptions: number[];
	current?: number;
}

export interface BoardState {
	size: number;
	filledCells: number;
	cells: CellInfo[][];
}

export interface Coordinates {
	x: number;
	y: number;
}

export interface CellInfo {
	x: number;
	y: number;
	player?: number | null;
}

const initialState: RootState = {
	board: {
		size: 3,
		filledCells: 0,
		cells: initializeBoardCells(3),
	},
	players: {
		count: 3,
		countOptions: [3]
	},
	gameStatus: {
		gameOver: false,
		gameStarted: false
	}
};

export default initialState;
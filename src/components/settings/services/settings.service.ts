import { CellInfo } from '../../../store/state';

export const initializeBoardCells = (size: number) => {
	let board: CellInfo[][] = [];

	for (let i = 0; i < size; i++) {
		board[i] = [];

		for (let j = 0; j < size; j++) {
			board[i][j] = ({ x: i, y: j });
		}
	}

	return board;
};

export const calculatePlayersCounts = (boardSize: number) => {
	let playersCounts: number[] = [];

	for (let i = 2; i <= boardSize; i++) {
		if (boardSize % i === 0) {
			playersCounts.push(i);
		}
	}

	return playersCounts;
};
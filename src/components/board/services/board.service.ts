import { map, forEach, last, forIn } from 'lodash';
import { Coordinates, CellInfo } from '../../../store/state';

export interface Cell extends CellInfo {
	viewed?: boolean;
}

export const addStepOnBoard = (board: CellInfo[][], step: Coordinates, player: number) => {
	const newBoard = map(board, (row: CellInfo[]) => {

		return map(row, (cell: CellInfo) => {

			if (cell.x === step.x && cell.y === step.y) {
				cell.player = player;
			}

			return cell;
		})
	});

	return newBoard;
};

export const calculateCurrentPlayer = (current: number, playersCount: number) => {
	const newCurrentPlayer = current + 1;

	if (current == playersCount) {
		return 1;
	}

	return newCurrentPlayer;
};

export const isGameOver = (boardSize: number, filledCells: number) => {
	const allCells = boardSize * boardSize;
	const freeCells = allCells - filledCells - 1;

	return freeCells === 0;
};

export const defineWinner = (board: Cell[][]) => {
	let playerStats = {};
	let queue: CellInfo[] = [];

	forEach(board, (row: Cell[]) => {
		forEach(row, (cell: Cell) => {
			if (cell.viewed) return;

			let usedCount = 0;
			queue = [cell];

			while (queue.length) {
				// tool last element in queue
				const ind = last(queue);
				// neighbors of the current viewed cell
				let top = ind.y > 0 && board[ind.x][ind.y - 1];
				let bottom = ind.y < row.length - 1 && board[ind.x][ind.y + 1];
				let left = ind.x > 0 && board[ind.x - 1][ind.y];
				let right = ind.x < row.length - 1 && board[ind.x + 1][ind.y];

				queue.pop();

				// check cell for adjacency
				if (top && ind.player === top.player && !top.viewed) {
					queue.push(top);
				}

				if (bottom && ind.player === bottom.player && !bottom.viewed) {
					queue.push(bottom);
				}

				if (left && ind.player === left.player && !left.viewed) {
					queue.push(left);
				}

				if (right && ind.player === right.player && !right.viewed) {
					queue.push(right);
				}

				board[ind.x][ind.y].viewed = true;
				usedCount++;

				if (!queue.length && cell.player) {
					let previousState = playerStats[cell.player];

					playerStats[cell.player] = previousState && previousState > usedCount ? previousState : usedCount;
				}
			}
		})
	});

	return findMax(playerStats);
};

const findMax = (playerStats) => {
	let winner = 'no winners';

	let max = 0;
	forIn(playerStats, (chainLength, key) => {
		if (max === chainLength) {
			winner = 'no winner';
		}

		if (max < chainLength) {
			max = chainLength;
			winner = key;
		}
	});

	return winner;
};
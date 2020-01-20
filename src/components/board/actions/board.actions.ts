import { Action } from 'redux';
import { Coordinates, CellInfo } from '../../../store/state';

export enum BoardActions {
	MakeStep = '[Board] Make Step',
	FinishGame = '[Board Finish Game',
}

export interface MakeStep extends Action {
	type: BoardActions.MakeStep;
	step: Coordinates;
  currentPlayer: number;
  size: number;
  filledCells: number;
}

export const makeStep = (step: Coordinates, currentPlayer: number, size: number, filledCells: number): MakeStep => ({
	type: BoardActions.MakeStep,
	step,
  currentPlayer,
  size,
  filledCells
});

export interface FinishGame extends Action {
	type: BoardActions.FinishGame;
	cells: CellInfo[][];
}

export const finishGame = (cells: CellInfo[][]): FinishGame => ({
	type: BoardActions.FinishGame,
	cells,
});

export type BoardAction =  MakeStep | FinishGame;
import { Action } from 'redux';
import { Coordinates, CellInfo } from '../../../store/state';

export enum BoardActions {
	MakeStep = '[Board] Make Step',
	FinishGame = '[Board Finish Game',
}

export interface MakeStep extends Action {
	type: BoardActions.MakeStep;
	step: Coordinates;
}

export const makeStep = (step: Coordinates): MakeStep => ({
	type: BoardActions.MakeStep,
	step,
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
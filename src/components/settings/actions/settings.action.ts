import { Action } from 'redux';

export enum SettingsActions {
	ChangeBoardSize = '[Settings] Change Board Size',
	InitializeGame = '[Settings] Initialize Game',
	ChangePlayerCount = '[Settings] Change Player Count'
}

export interface ChangeBoardSizeSuccess extends Action {
	type: SettingsActions.ChangeBoardSize;
	size: number;
}

export const changeBoardSize = (size: number): ChangeBoardSizeSuccess => ({
	type: SettingsActions.ChangeBoardSize,
	size
});

export interface InitializeGame extends Action {
	type: SettingsActions.InitializeGame;
	gameStarted: boolean;
}

export const initializeGame = (): InitializeGame => ({
	type: SettingsActions.InitializeGame,
	gameStarted: true
});

export interface ChangePlayerCount extends Action {
	type: SettingsActions.ChangePlayerCount;
	playersCount: number;
}

export const changePlayerCount = (playersCount: number): ChangePlayerCount => ({
	type: SettingsActions.ChangePlayerCount,
	playersCount,
});

export type SettingsAction = ChangeBoardSizeSuccess | InitializeGame | ChangePlayerCount;
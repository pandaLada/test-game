import { BoardAction, BoardActions } from '../../components/board/actions/board.actions';
import { SettingsAction, SettingsActions } from '../../components/settings/actions/settings.action';

export type Action = BoardAction | SettingsAction;

export const Actions = {
	...BoardActions,
	...SettingsActions,
};

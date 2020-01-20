import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Action } from 'redux';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { RootState } from '../../store/state';
import { boardSizes } from '../../constants/boardConstants';
import {
	changeBoardSize,
	changePlayerCount,
	initializeGame,
} from '../settings/actions/settings.action';


const StyledFormControl = styled(FormControl)`
	width: 110px;
`;

const StyledLabel = styled(InputLabel)`
  background-color: #ffffff; 
`;

const StyledSelect = styled(Select)`
  min-width: 90px; 
  margin-bottom: 25px;

  .MuiSelect-root {
  	padding: 10px 32px;
    padding-top: 10px;
  }
`;

const SettingsTitle = styled(Typography)`
	margin-bottom: 25px;
`;

const SettingsPanel = styled(Grid)`
	border-right: 1px solid black;
	display: block;
	padding-right: 25px;
`;

interface GameSettingsProps extends DispatchProp<Action> {
	size: number;
	gameStarted: boolean;
	playersCount: number;
	playersCountOptions: number[];
}

function GameSettings(props: GameSettingsProps) {
	const { size, gameStarted, playersCount, playersCountOptions, dispatch } = props;

	function SizeSelect() {
		return (
			<StyledFormControl variant="outlined">
				<StyledLabel id="board-size">
					Board Size
				</StyledLabel>
				<StyledSelect
					labelId="board-size"
					native
					disabled={ gameStarted }
					value={ size }
					onChange={ changeSize }
				>
					{
						boardSizes.map((item: number) => {
							return (<option key={ item } value={ item }>{ item }</option>)
						})
					}
				</StyledSelect>
			</StyledFormControl>
		);
	}

	function PlayersCount() {

		return (
			<StyledFormControl variant="outlined">
				<StyledLabel id="player-count">
					Players Count
				</StyledLabel>
				<StyledSelect
					labelId="player-count"
					native
					disabled={ gameStarted }
					value={ playersCount }
					onChange={ changePlayersCount }
				>
					{
						playersCountOptions.map((item: number) => {
							return (<option key={ item } value={ item }>{ item }</option>)
						})
					}
				</StyledSelect>
			</StyledFormControl>
		);
	}

	function changeSize(event) {
		dispatch(changeBoardSize(event.target.value));
	}

	function changePlayersCount(event) {
		dispatch(changePlayerCount(event.target.value));
	}

	function startGame() {
		dispatch(initializeGame())
	}

	return (
		<>
			<SettingsPanel container>
				<SettingsTitle variant="h5">
					Game Settings
				</SettingsTitle>
				<Grid item xs={ 12 }>
					<SizeSelect/>
				</Grid>
				<Grid item xs={ 12 }>
					<PlayersCount/>
				</Grid>
				<Button disabled={ gameStarted }
								onClick={ startGame }>Start Game</Button>
			</SettingsPanel>
		</>
	);
}

const mapStateToProps = (state: RootState) => ({
	size: state.board.size,
	gameStarted: state.gameStatus.gameStarted,
	playersCount: state.players.count,
	playersCountOptions: state.players.countOptions
});

export default connect(mapStateToProps)(GameSettings);

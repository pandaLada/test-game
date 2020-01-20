import React, { useState } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Action } from 'redux';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

import { RootState } from '../../store/state';
import { boardSizes } from '../../constants/boardConstants';
import {
  changeBoardSize,
  changePlayerCount,
  initializeGame,
	resetSettings,
} from '../settings/actions/settings.action';


const StyledSelectControl = styled(FormControl)`
	width: 110px;
`;

const StyledInputControl = styled(FormControl)`
	width: 230px;
	margin-bottom: 25px;
`;

const StyledLabel = styled(InputLabel)`
  background-color: #ffffff; 
`;

const StyledInputLabel = styled(InputLabel)`
	margin-left: 10px;
	margin-top: -8px;
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
}

function GameSettings(props: GameSettingsProps) {
  const { size, gameStarted, playersCount, dispatch } = props;
  const [isError, setIsError] = useState(false);


  function SizeSelect() {
    return (
      <StyledSelectControl variant="outlined">
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
      </StyledSelectControl>
    );
  }

  function PlayersCount() {

    return (
      <StyledInputControl>
        <StyledInputLabel htmlFor="player-count">Players Count</StyledInputLabel>
        <OutlinedInput
          id="player-count"
          labelWidth={ 100 }
          type={ 'number' }
          autoFocus
          error={ isError }
          disabled={ gameStarted }
          value={ playersCount }
          onChange={ changePlayersCount }
        />
        <FormHelperText error={ isError }>Number of players can be from 2 to 10.</FormHelperText>
      </StyledInputControl>
    );
  }

  function changeSize(event) {
    dispatch(changeBoardSize(event.target.value));
  }

  function changePlayersCount(event) {
    const value = event.target.value;

    setIsError(value > 10 || value < 2);

    dispatch(changePlayerCount(value));
  }

  function startGame() {
    dispatch(initializeGame())
  }

  function resetGame() {
    dispatch(resetSettings())
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
        <Button disabled={ gameStarted || isError }
                onClick={ startGame }>Start Game</Button>
        <Button disabled={ !gameStarted }
                onClick={ resetGame }>Reset Game</Button>
      </SettingsPanel>
		</>
  );
}

const mapStateToProps = (state: RootState) => ({
  size: state.board.size,
  gameStarted: state.gameStatus.gameStarted,
  playersCount: state.players.count,
});

export default connect(mapStateToProps)(GameSettings);

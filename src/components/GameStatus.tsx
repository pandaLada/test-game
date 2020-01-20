import React from 'react';
import { connect, DispatchProp } from 'react-redux';

import Typography from '@material-ui/core/Typography';

import { RootState } from '../store/state';

interface GameStatusProps extends DispatchProp {
	currentPlayer?: number;
	winner?: number | string;
}

function GameStatus(props: GameStatusProps) {
	const { currentPlayer, winner } = props;


	return (
		<>
			<Typography variant="h5">
				{ winner && 'Winner: ' + winner }
				{ !winner && currentPlayer && 'CurrentPlayer: ' + currentPlayer }
				{ !currentPlayer && !winner && 'Game not Started' }
			</Typography>
		</>
	);
}

const mapStateToProps = (state: RootState) => ({
	currentPlayer: state.players.current,
	winner: state.gameStatus.winner
});

export default connect(mapStateToProps)(GameStatus);

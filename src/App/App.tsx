import React from 'react';
import GameStatus from '../components/GameStatus';
import GameSettings from '../components/settings/GameSettings';
import Board from '../components/board/Board';
import Grid from '@material-ui/core/Grid';


export default function App() {
	return (
		<>
			<Grid container spacing={ 2 }>
				<Grid item>
					<GameSettings/>
				</Grid>
				<Grid item xs={ 6 }>
					<GameStatus/>
					<Board/>
				</Grid>
			</Grid>
		</>
	);
}
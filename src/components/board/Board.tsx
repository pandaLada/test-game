import React, { useEffect } from 'react';
import { DispatchProp, connect } from 'react-redux';
import { map } from 'lodash';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { finishGame, makeStep } from '../board/actions/board.actions';
import { CellInfo, RootState, GameStatusState } from './../../store/state';

const BoardCell = styled(Button)`
  max-width: 48px; 
  max-height: 48px;
  min-width: 48px; 
  min-height: 48px;  
  margin: 10px;
`;

interface BoardProps extends DispatchProp {
	cells: CellInfo[][];
  gameStatus: GameStatusState;
  currentPlayer?: number;
  filledCells: number;
}

function Board(props: BoardProps) {
  const {
    cells,
    dispatch,
    gameStatus: {
      gameOver,
      gameStarted,
      winner,
    },
    currentPlayer,
    filledCells
  } = props;

	useEffect(() => {
		if (gameOver && !winner) {
			dispatch(finishGame(cells));
		}
	});

	function makeMove(cell) {
    dispatch(makeStep(cell, currentPlayer!, cells.length, filledCells));
	}

	function BoardRow(params) {
		const { row } = params;

		return (
			<>
				{
					map(row, (cell: CellInfo) => {
						return (
							<Grid key={ cell.x + cell.y } item>
								<BoardCell
                  variant="outlined"
                  disabled={ !gameStarted || gameOver || !!cell.player }
                  onClick={ () => makeMove(cell) }
								>
									{ cell.player || '' }
								</BoardCell>
							</Grid>
						);
					})
				}
			</>
		);
	}

	return (
		<>
			<Grid container>
				{
					map(cells, (row: CellInfo[], i: number) => {
						return (
							<Grid key={ i } container>
								<BoardRow row={ row }/>
							</Grid>
						);
					})
				}
			</Grid>
		</>
	);
}

const mapStateToProps = (state: RootState) => ({
	cells: state.board && state.board.cells,
  gameStatus: state.gameStatus,
  currentPlayer: state.players && state.players.current,
  filledCells: state.board && state.board.filledCells
});

export default connect(mapStateToProps)(Board);
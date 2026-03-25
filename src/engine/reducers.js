import initialState from './gameEngine'

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_TURN': {
      const nextPlayer =
        state.activePlayerId === 'p1' ? 'p2' : 'p1'

      return {
        ...state,
        turn: state.turn + 1,
        phase: 'START',
        activePlayerId: nextPlayer,
        log: [...state.log, 'Turn started']
      }
    }

    default:
      return state
  }
}
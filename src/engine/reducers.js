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
    case 'NEXT_PHASE': {
        let nextPhase = state.phase

        if (state.phase === 'START') {
            nextPhase = 'MAIN'
        }

        return {
            ...state,
            phase: nextPhase,
            log: [...state.log, `Phase changed to ${nextPhase}`]
        }
    }

    default:
      return state
  }
}
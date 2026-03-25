import initialState from './gameEngine'

function isActionAllowed(state, actionType) {
  const actionsAllowedInMain = [
    'PLACE_UNIT',
    'PLAY_CARD',
    'PLACE_FIELD_CARD',
    'PASS_ACTION'
  ]

  if (actionsAllowedInMain.includes(actionType)) {
    return state.phase === 'MAIN'
  }

  return true
}

export function gameReducer(state, action) {
  if (!isActionAllowed(state, action.type)) {
    return {
      ...state,
      log: [...state.log, `Action ${action.type} blocked in phase ${state.phase}`]
    }
  }

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
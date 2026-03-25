import initialState from './gameEngine'

const ACTION_COST = {
  PLACE_UNIT: 1,
  PLAY_CARD: 1,
  PLACE_FIELD_CARD: 1,
  PASS_ACTION: 0
}

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

function hasEnoughActionPoints(state, actionType) {
  const cost = ACTION_COST[actionType]
  if (cost === undefined) return true
  return state.actionPoints >= cost
}

function consumeActionPoints(state, actionType) {
  const cost = ACTION_COST[actionType] || 0
  return state.actionPoints - cost
}

function createUnit(ownerId) {
  return {
    id: Date.now().toString(),
    ownerId,
    basePower: 1000,
    currentPower: 1000,
    effects: []
  }
}

export function gameReducer(state, action) {
  if (!isActionAllowed(state, action.type)) {
    return {
      ...state,
      log: [...state.log, `Action ${action.type} blocked in phase ${state.phase}`]
    }
  }

  if (!hasEnoughActionPoints(state, action.type)) {
    return {
      ...state,
      log: [...state.log, `Not enough action points for ${action.type}`]
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
        actionPoints: 2,
        log: [...state.log, 'Turn started: 2 AP granted']
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

    case 'PLACE_UNIT': {
      const { slotIndex } = action.payload

      // validação de slot
      if (!state.board[slotIndex]) {
        return {
          ...state,
          log: [...state.log, 'Invalid slot']
        }
      }

      if (state.board[slotIndex].unit !== null) {
        return {
          ...state,
          log: [...state.log, 'Slot already occupied']
        }
      }

      const newUnit = createUnit(state.activePlayerId)

      const newBoard = state.board.map((slot, index) => {
        if (index === slotIndex) {
          return {
            unit: newUnit,
            ownerId: state.activePlayerId,
            confrontId: null
          }
        }
        return slot
      })

      return {
        ...state,
        board: newBoard,
        actionPoints: consumeActionPoints(state, action.type),
        log: [...state.log, `Unit placed in slot ${slotIndex}`]
      }
    }

    case 'PLAY_CARD': {
      return {
        ...state,
        actionPoints: consumeActionPoints(state, action.type),
        log: [...state.log, 'Card played']
      }
    }

    case 'PLACE_FIELD_CARD': {
      return {
        ...state,
        actionPoints: consumeActionPoints(state, action.type),
        log: [...state.log, 'Field card placed']
      }
    }

    case 'PASS_ACTION': {
      return {
        ...state,
        log: [...state.log, 'Player passed action']
      }
    }

    default:
      return state
  }
}
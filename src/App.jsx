import { useContext } from 'react'
import { GameContext } from './state/GameContext'

function App() {
  const { state, dispatch } = useContext(GameContext)

  const handleStartTurn = () => {
    dispatch({ type: 'START_TURN' })
  }
  const handleNextPhase = () => {
  dispatch({ type: 'NEXT_PHASE' })
  }

  return (
    <div>
      <h1>Game Project</h1>

      <p>Turno: {state.turn}</p>
      <p>Jogador Ativo: {state.activePlayerId}</p>
      <p>Fase: {state.phase}</p>

      <button onClick={handleStartTurn}>
        Iniciar Turno
      </button>
      <button onClick={handleNextPhase}>
        Próxima Fase
      </button>
      <button onClick={() => dispatch({ type: 'PLACE_UNIT', payload: { slotIndex: 0 } })}>
        Place Unit Slot 0
      </button>
    </div>
  )
}

export default App
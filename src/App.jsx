import { useContext } from 'react'
import { GameContext } from './state/GameContext'

function App() {
  const { state, dispatch } = useContext(GameContext)

  const handleStartTurn = () => {
    dispatch({ type: 'START_TURN' })
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
    </div>
  )
}

export default App
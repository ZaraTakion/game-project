import { createContext, useReducer } from 'react'
import { gameReducer } from '../engine/reducers'
import initialState from '../engine/gameEngine'

export const GameContext = createContext()

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}
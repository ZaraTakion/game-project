const initialState = {
  players: [
    {
      id: 'p1',
      name: 'Player 1',
      life: 4000,
      actionPoints: 0,
      deck: [],
      hand: [],
      discard: [],
      effects: []
    },
    {
      id: 'p2',
      name: 'Player 2',
      life: 4000,
      actionPoints: 0,
      deck: [],
      hand: [],
      discard: [],
      effects: []
    }
  ],

  board: [
    { unit: null, ownerId: null, confrontId: null },
    { unit: null, ownerId: null, confrontId: null },
    { unit: null, ownerId: null, confrontId: null }
  ],

  confronts: [],

  turn: 1,
  phase: 'START',
  activePlayerId: 'p1',

  actionPoints: 0,

  log: []
}

export default initialState
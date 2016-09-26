import undoable, { distinctState } from 'redux-undo'

const note = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        id: action.id,
        title: action.title,
        description: action.description,
        color: action.color,
        completed: false
      }
    case 'STORE_NOTE':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const notes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [
        ...state,
        note(undefined, action)
      ]
    case 'STORE_NOTE':
      return state.map(t =>
        note(t, action)
      )
    default:
      return state
  }
}

const undoableNotes = undoable(notes, {
  filter: distinctState()
})

export default undoableNotes
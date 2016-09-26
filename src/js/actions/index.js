let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

let nextNoteId = 0
export const addNote = (title, description,color) => ({
  type: 'ADD_NOTE',
  id: nextNoteId++,
  title,
  description,
  color
})

export const storeNote = (id) => ({
  type: 'STORE_NOTE',
  id
})
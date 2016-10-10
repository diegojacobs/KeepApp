import v4 from 'uuid-v4';
import moment from 'moment';

/*TODOS*/
export const addTodo = (todo) => ({
  type: 'ADD_TODO',
  payload: {
    id: v4(),
    text: todo,
    creation_date: moment().format('LLL'),
    modification_date: moment().format('LLL')
  }
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  payload: { 
    id: id,
    modification_date: moment().format('LLL')
  }
})

export const editTodo = (id, todo) => ({
  type: 'EDIT_TODO',
  payload: {
    id: id, 
    text: todo,
    modification_date: moment().format('LLL')
  }
})

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  payload: {
    id: id
  }
})

export const archiveTodo = (id) => ({
  type: 'ARCHIVE_TODO',
	payload: { 
		id: id,
		modification_date: moment().format('LLL')
	}
})

/*NOTES*/
export const addNote = (title, description) => ({
	type: 'ADD_NOTE',
	payload: {
	  id: v4(),
	  title: title,
	  content: description,
	  saved: true,
	  creation_date: moment().format('LLL'),
	  modification_date: moment().format('LLL')
	}
})

export const editNoteTitle = (id, title) => ({
	type: 'EDIT_NOTE_TITLE',
  payload: {
    id: id,
    title: title,
    modification_date: moment().format('LLL')
  }
})

export const editNoteDescription = (id, description) => ({
	type: 'EDIT_NOTE_DESCRIPTION',
  payload: {
    id: id,
    content: description,
    modification_date: moment().format('LLL')
  }
})

export const deleteNote = (id) => ({
	type: 'DELETE_NOTE',
  payload: {
    id: id
  }
})

export const archiveNote = (id) => ({
	type: 'ARCHIVE_NOTE',
  payload: {
    id: id,
    modification_date: moment().format('LLL')
  }
})

export const changeColorNote = (id, color) => ({
	type: 'CHANGE_COLOR_NOTE',
  payload: {
    id: id,
    color: color,
    modification_date: moment().format('LLL')
  }
})

/*TODOS LIST*/
export const addTodoList = (title, todos) => ({
  type: 'ADD_LIST_TODO',
  payload: {
    id: v4(),
    title: title,
    todos: todos,
    creation_date: moment().format('LLL'),
    modification_date: moment().format('LLL')
	}
})

export const saveTodos = (id) => ({
  type: 'SAVE_TODO',
  payload: {
    id: id
  }
})

export const editTodoList = (id, title) => ({
  type: 'EDIT_LIST_TODO',
  payload: {
    id: id, 
    title: title,
    modification_date: moment().format('LLL')
  }
})

export const changeColorTodoList = (id, color) => ({
	type: 'CHANGE_COLOR_LIST_TODO',
  payload: {
    id: id,
    color: color,
    modification_date: moment().format('LLL')
  }
})

export const archiveTodoList = (id) => ({
  type: 'ARCHIVE_LIST_TODO',
  payload: {
    id: id,
    modification_date: moment().format('LLL')
  }
})

export const deleteListTodo = (id) => ({
  type: 'DELETE_LIST_TODO',
  payload: {
    id: id
  }
})


/*FILTERS*/
export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

/*SEARCH*/
export const setSearch = (search) => ({
  type: 'SET_SEARCH_FILTER',
  payload: {
    search: search
  }
})
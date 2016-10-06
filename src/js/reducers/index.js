import { combineReducers } from 'redux'
import { todos } from './todos';
import { listTodos } from './listTodos';
import { listNotes } from './notes';
import { visibilityApp } from './visibilityApp';

const todoApp = combineReducers({
  todos,
  listTodos,
  listNotes,
  visibilityApp
});

export default todoApp
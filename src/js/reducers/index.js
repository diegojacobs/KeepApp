import { combineReducers } from 'redux'
import { todos } from './todos';
import { todosList } from './todosList';
import { notes } from './notes';
import { visibilityApp } from './visibilityApp';
import undoable from 'redux-undo';

const keepApp = combineReducers({
  todos: undoable(todos),
  todosList: undoable(todosList),
  notes: undoable(notes),
  visibilityApp: undoable(visibilityApp)
});

export default keepApp
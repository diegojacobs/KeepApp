import { combineReducers } from 'redux'
import { todos } from './todos';
import { todosList } from './todosList';
import { notes } from './notes';
import { visibilityApp } from './visibilityApp';

const keepApp = combineReducers({
  todos,
  todosList,
  notes,
  visibilityApp
});

export default keepApp
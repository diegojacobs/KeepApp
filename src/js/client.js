import { createStore, combineReducers} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import v4 from 'uuid-v4';
import '../styles/index.scss';
import {
  addNote, editNoteTitle, editNoteDescription, deleteNote, archiveNote, changeColorNote,
  addTodo, toggleTodo, editTodo, deleteTodo,
  addTodoList, saveTodos, editTodoList, changeColorTodoList
} from './actions/index';

import reducer from './reducers'
import { colors } from './containers/colors';
const { Component } = React;
import {} from './e2e/todos';
import {} from './e2e/notes';
import {} from './e2e/todosList';

const loadState = () => {
  try{
    let result = JSON.parse(localStorage.getItem('state'));
    return result ? result : undefined;
  }
  catch(err){
    return undefined;
  }
}

const saveState = (state) => {
  try{
    localStorage.setItem('state', JSON.stringify(state));
  }
  catch(err){
    console.log(err);
  }
}

const store = createStore(reducer, loadState());

class AddNotes extends Component {
  render() {
    let { notes, visibilityApp } = this.props;
    if (visibilityApp.app === 'SHOW_NOTES' || visibilityApp.app === 'SHOW_ALL') {
   
    return (
        <div class= { 'add-container' }>
          Add New Note
          <input
            placeholder = { 'Title' }
            ref = { 'note_title' }
            class = { 'title-input' }
            onKeyPress = {
              (e) => {
                if (e.key === 'Enter') {
                  if (!this.refs.note_title.value .trim()) {
                    return
                  }
                  if (!this.refs.note_content.value.trim()) {
                    return
                  }
                  store.dispatch(addNote(this.refs.note_title.value, this.refs.note_description.value));
                  this.refs.note_title.value = '';
                  this.refs.note_description.value = '';
                }
              }
            }
          />
          <textArea
            placeholder = { 'Description' }
            ref = { 'note_description' }
            class= { 'description-input' }/>
          <br/>
          <button class="btn green done"
            type="submit"
            onClick = {
              (e) => {
                if (!this.refs.note_title.value .trim()) {
                  return
                }
                if (!this.refs.note_description.value.trim()) {
                  return
                }
                store.dispatch(addNote(this.refs.note_title.value, this.refs.note_description.value));
                this.refs.note_title.value = '';
                this.refs.note_description.value = '';     
              }}>Done</button>
        </div>
    );
    } else {
      return (<div></div>);
    }
  }
}

class AddTodosLists extends Component {
  render() {
  
  let {todos, listTodo, visibilityApp } = this.props;
  if (visibilityApp.app === 'SHOW_TODOS' || visibilityApp.app === 'SHOW_ALL') {
    return (
      <div class= { 'add-container' }>
        Add New Todo List
        <input 
          placeholder={'Title'}
          class={ 'title-input' }
          ref= { "todo_title" }
          onKeyPress = {
            (e) => {
              if (e.key === 'Enter') {
                store.dispatch(addTodoList(e.target.value, getTodosInList(getUnArchived(todos), listTodo).map(t => t.id)));
                todos.map(t => { store.dispatch(saveTodos(t.id)); });
                this.refs.color_list.style.backgroundColor = '';
                this.refs.todo_title.value = '';
              }
            }
          }
        />
        <input 
          class = { 'todo-input' }
          placeholder = { 'Add todo' }
          ref= { "todo" }
          onKeyPress={
            (e) => { 
              if (e.key === 'Enter') {
                store.dispatch(addTodo(e.target.value));
                e.target.value = "";
              }
            }
          }/>
        <AddTodo 
          todos = { getUnSaved(todos) }
          listTodo = { listTodo }
          visibilityFilter = { listTodo.visibilityFilter }
          key= { 1 }/>
        <br/>
        <button class="btn green done"
        type="submit"
        onClick = {
          (e) => {
            store.dispatch(addTodoList(this.refs.todo_title.value, getTodosInList(getUnArchived(todos), listTodo).map(t => t.id)));;
            todos.map(t => { store.dispatch(saveTodos(t.id)); });
            this.refs.todo_title.value = '';
            this.refs.todo.value = '';
          }}>Done</button>
      </div>

    );
  } else {
    return (<div></div>);
  }
  }
}

class VisibleNotes extends Component {
  render() {
    let { notes, visibilityApp} = this.props;
    if (visibilityApp.app === 'SHOW_NOTES' || visibilityApp.app === 'SHOW_ALL'){
      notes = getSearchFilterNotes(notes, visibilityApp.search);
      return (
        <div>
        {
          notes.map((note, i) =>
             <div 
              ref = { 'color_list' }
              class= { 'note-todoList-container' }
              style = {{ backgroundColor: note.color }}
              key = { note.id }>
                <input 
                  class={ 'title-input' }
                  ref= { 'edit_note_title' }
                  value= {note.title}
                  onChange={
                      (e) => { 
                        store.dispatch(editNoteTitle(note.id, e.target.value));
                      }
                    }
                />
                <textArea 
                  class={ 'title-input' }
  				        ref = { 'color_list' }
                  value = { note.content }
                  onChange={
                      (e) => { 
                        store.dispatch(editNoteDescription(note.id, e.target.value));
                      }
                    }/>
                <div>
                  <div style={{float: "right", width: "24%"}} class = { 'color-container' }>
                   <ColorContainer
                     note = { note }
                     current = { 'NOTE' } >
                   </ColorContainer>
                  </div>
                  <div style={{backgroundColor: note.color, float: "left", width: "75%"}}>
                    <button
                      class={ 'btn blue size' }
                      onClick={
                        () => { 
                          store.dispatch(archiveNote(note.id));
                        }
                      }>Archive</button>
                    <button
                      class={ 'btn red size' }
                      onClick={
                        () => { 
                          store.dispatch(deleteNote(note.id));
                        }
                      }
                    >Delete</button>
                    <div>
                      Fecha de creación: { note.creation_date }
                      <br/>
                      Fecha de modificación: { note.modification_date }
                    </div>
                  </div>
                </div>
              </div>
          )
        }
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

class VisibleTodoList extends Component {
  render() {
    let { todos, todosList, visibilityApp } = this.props;
    if (typeof todosList === 'undefined') {
      todosList = [];
    }
    if (visibilityApp.app === 'SHOW_TODOS' || visibilityApp.app === 'SHOW_ALL') {
    todosList = getSearchFilter(todosList, visibilityApp.search);
    return (
        <div>
        {
          todosList.map((list, i) =>
             <div 
              ref = { 'color_list' }
              class= { 'note-todoList-container' }
              style = {
                {
                  backgroundColor: list.color
                }
              }
              key = { list.id }
            >
              <input 
                class={ 'title-input' }
                value={ list.title }
                onChange={
                  (e) => { 
                    store.dispatch(editTodoList(list.id, e.target.value));
                  }
                }
              />
              <AddTodo 
                todos = { todos }
                listTodo = { list }
                visibilityFilter = { list.visibilityFilter }
                key= { i }
              ></AddTodo>
              <div 
                class= { 'edit-div' }
              >
                <div>
                  <div style={{float: "right", width: "24%"}} class = { 'color-container' }>
                   <ColorContainer
                   listTodo = { list }
                   >
                   </ColorContainer>
                  </div>
                  <div style={{backgroundColor: list.color, float: "left", width: "75%"}}>
                    <button
                      class={ 'btn blue size' }
                      onClick={
                        () => { 
                          store.dispatch({
                            type: 'ARCHIVE_LIST_TODO',
                            payload: {
                              id: list.id,
                              modification_date: new Date()
                            }
                          });
                          list.todos.map(id =>
                            store.dispatch({
                              type: 'ARCHIVE_TODO',
                              payload: { 
                                id,
                                modification_date: new Date()
                              }
                            })
                          );
                        }
                      }
                    >Archive</button>
                    <button
                      class={ 'btn red size' }
                      onClick={
                    () => { 
                      store.dispatch({
                        type: 'DELETE_LIST_TODO',
                        payload: {
                          id: list.id
                        }
                      });
                      list.todos.map(id => 
                        store.dispatch({
                          type: 'DELETE_TODO',
                          payload: {
                            id
                          }
                        })
                      )
                    }
                  }>Delete</button>
                    <div>
                      Fecha de creación: { list.creation_date}
                      <br/>
                      Fecha de modificación: { list.modification_date}
                    </div>
                  </div>
                </div>
              </div>
              <br/>
              <div 
                  class = { 'margin-top' }
                  ref={ 'text_filter' }
                >
                <FilterTodo
                  visibilityFilter="SHOW_ALL"
                  currentVisibilityFilter = { list.visibilityFilter }
                  idList = { list.id }
                  >ALL</FilterTodo>
                  {' '}
                  <FilterTodo
                  visibilityFilter="SHOW_COMPLETED"
                  currentVisibilityFilter = { list.visibilityFilter }
                  idList = { list.id }
                  >Completed</FilterTodo>
                  {' '}
                  <FilterTodo
                  visibilityFilter="SHOW_ACTIVE"
                  currentVisibilityFilter = { list.visibilityFilter }
                  idList = { list.id }
                  >ACTIVE</FilterTodo>        
                </div>
            </div>
          )
        }
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

class AddTodo extends Component {

  render() {
  let { todos, listTodo, visibilityFilter } = this.props;
  let visibleTodos = getVisibleTodos(getNewTodos(todos, listTodo), visibilityFilter);
  return (
    <div 
      class= { 'main-container' }
    >
    {
    visibleTodos.map(
      (todo, i) => 
        <div class = { 'padding-div' } key= { i }>
            <input
            type={'checkbox'}
            onClick={
              () => { 
                store.dispatch(toggleTodo(todo.id));
              }
            } 
            value={  todo.completed ? 'checked' : '' }
          />
          <input 
            class ={ 'list-input' }
            style={
              {
              textDecoration: todo.completed ? 'line-through' : 'none',
			  background: 'transparent'
              }
            }
            onChange = {
              (e) => {
                store.dispatch(editTodo(todo.id, e.target.value));
              }
            }
            key={ todo.id }
            defaultValue={ todo.text}
        />
        <button
          class= { 'btn red' }
          onClick={
            () => { 
              store.dispatch(deleteTodo(todo.id));
            }
          } 
        >X</button>
      </div>
    )
    }
  </div>
  );
  }
}

class ColorContainer extends Component {
  render () {
    let { listTodo, note, current } = this.props;

    return (
      <div>
      {
      colors.map(
        (color, i) => 
    		<div
          key = { i }
          class = { color.class }
          onClick = {
            () => {
              if (current === 'NOTE' ){
                store.dispatch(changeColorNote(note.id, color.div_color));
              }
              else {
                store.dispatch(changeColorTodoList(listTodo.id, color.div_color));
              }
            }
          }
        >
        </div>
      )
      }
      </div>
    );
  }
}

const FilterTodo = ({visibilityFilter, currentVisibilityFilter,children, idList}) => {
  if (visibilityFilter === currentVisibilityFilter) {
    return <strong> { children } </strong>;
  }
  return <a
    href="#"
    onClick={
      (e) => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          payload: { 
            idList,
            visibilityFilter
          }
        });
      }
    }
    >
  { children } </a>
}

const FilterLink = ({visibilityFilter, currentVisibilityFilter,children}) => {
  if (visibilityFilter === currentVisibilityFilter) {
    return <strong> { children } </strong>;
  }
  return <a
    href="#"
    onClick={
      (e) => {
        e.preventDefault();
       store.dispatch({
            type: 'SET_VISIBILITY_FILTER_APP',
            payload: {
              app: visibilityFilter
            }
          });
      }
    }
    >
  { children } </a>
}

const getTodosInList = (todos, listTodo) => {
  if (listTodo.length === 0) {
    return todos;
  }
  let array = [];
  for (let todos of listTodo) { array = array.concat(todos.todos) }
  let returnValue = todos.filter(t => !array.includes(t.id));
  return returnValue;
}

const getVisibleTodos = (todos, visibilityFilter) => {
  switch(visibilityFilter) {
    case 'SHOW_ALL': 
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
}

const getNewTodos = (todos, listTodo)  => {
  if (typeof listTodo.todos !== 'undefined') {
    return listTodo.todos.map((idList) => todos.filter(v => v.id === idList)[0]).filter(f => f !== undefined);
  }
  return todos;
}

const getUnArchived = (todos) => {
  return todos.filter (t => t.archived === false);
}

const getUnSaved = (todos) => {
  return todos.filter(t => t.saved === false);
}

const getSearchFilter = (todosList, search) => {
  
  if (search !== '') {
    
    return todosList.filter(listTodo => listTodo.title.includes(search));
  }
  return todosList; 
}

const getSearchFilterNotes = (notes, search) => {
  if (search !== '') {
    return notes.filter(note => note.title.includes(search));
  }
  return notes;
}

class KeepApp extends Component {

  render() {

  let { todos, todosList, notes, visibilityApp } = this.props;
  let visibletodosList = todosList.filter(l => l.archived === false);
  let visibleNotes = notes.filter(l => l.archived === false);
  return (
    <div class="main-container">
      <AddTodosLists
        todos = { todos }
        listTodo = { visibletodosList }
        visibilityApp = { visibilityApp }>
      </AddTodosLists>
      <AddNotes
       notes = { notes }
       visibilityApp = { visibilityApp }> 
      </AddNotes>
      <VisibleTodoList
        todosList = { visibletodosList }
        todos = { todos }
        visibilityApp = { visibilityApp }>
      </VisibleTodoList>
      <VisibleNotes
        notes = { visibleNotes }
        visibilityApp = { visibilityApp }>
      </VisibleNotes>
      <FilterLink
        visibilityFilter="SHOW_ALL"
        currentVisibilityFilter = { visibilityApp }>
        SHOW ALL
      </FilterLink> 
        <FilterLink
        visibilityFilter="SHOW_TODOS"
        currentVisibilityFilter = { visibilityApp }>
        SHOW TODOS LISTS
      </FilterLink> 
      <FilterLink
        visibilityFilter="SHOW_NOTES"
        currentVisibilityFilter = { visibilityApp }>
        SHOW NOTES
      </FilterLink>  
    </div>
  );
  }
}

const render = () => {
  saveState(store.getState());
  ReactDOM.render(
    <KeepApp
      { ...store.getState() }
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
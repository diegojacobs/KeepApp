import { createStore, combineReducers, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import v4 from 'uuid-v4';
import '../styles/index.scss';
import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';


import reducer from './reducers'
import { colorConstant } from './containers/colorConstant';
const { Component } = React;
import {} from './tests/todos.spec';
import {} from './tests/notes.spec';
import {} from './tests/listTodos.spec';




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

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

const store = createStore(reducer, loadState(),applyMiddleware(logger, crashReporter));


class AddNotes extends Component {
  render() {
    let { listNotes, visibilityApp } = this.props;
    if (visibilityApp.app === 'SHOW_NOTES' || visibilityApp.app === 'SHOW_ALL') {
   
    return (
        <div class= { 'list-container' }>
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
                  store.dispatch({
                    type: 'ADD_NOTE',
                    payload: {
                      id: v4(),
                      title: this.refs.note_title.value,
                      content: this.refs.note_content.value,
                      saved: true,
                      creation_date: new Date()
                    }
                  })
                  this.refs.note_title.value = '';
                  this.refs.note_content.value = '';
                }
              }
            }
          />
          <textArea
            placeholder = { 'Description' }
            ref = { 'note_content' }
            class= { 'main-input' }/>
          <br/>
          <button class="btn green done"
            type="submit"
            onClick = {
              (e) => {
                if (!this.refs.note_title.value .trim()) {
                  return
                }
                if (!this.refs.note_content.value.trim()) {
                  return
                }
                store.dispatch({
                  type: 'ADD_NOTE',
                  payload: {
                    id: v4(),
                    title: this.refs.note_title.value,
                    content: this.refs.note_content.value,
                    saved: true,
                    creation_date: new Date()
                  }
                })
                this.refs.note_title.value = '';
                this.refs.note_content.value = '';     
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
      <div class= { 'list-container' }>
        <input 
          placeholder={'Title'}
          class={ 'title-input' }
          ref= { "todo_title" }
          onKeyPress = {
            (e) => {
              if (e.key === 'Enter') {
                store.dispatch({
                  type: 'ADD_LIST_TODO',
                  payload: {
                    id: v4(),
                    title: e.target.value,
                    todos: getTodosInList(getUnArchived(todos), listTodo).map(t => t.id),
                    creation_date: new Date()
                }
              });
              todos.map(t => {
                store.dispatch({
                  type: 'SAVE_TODO',
                  payload: {
                    id: t.id
                  }
                })
              });
              this.refs.color_list.style.backgroundColor = '';
              this.refs.todo_title.value = '';
              }
            }
          }
        />
        <input 
          class = { 'main-input' }
          placeholder = { 'Add todo' }
          onKeyPress={
            (e) => { 
              if (e.key === 'Enter') {
                store.dispatch({
                  type: 'ADD_TODO',
                  payload: {
                    id: v4(),
                    text: e.target.value,
                    creation_date: new Date()
                  }
                });
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
            store.dispatch({
              type: 'ADD_LIST_TODO',
              payload: {
                id: v4(),
                title: this.refs.todo_title.value,
                todos: getTodosInList(getUnArchived(todos), listTodo).map(t => t.id),
                creation_date: new Date()
            }
          });
          todos.map(t => {
            store.dispatch({
              type: 'SAVE_TODO',
              payload: {
                id: t.id
              }
            })
          });
          this.refs.color_list.style.backgroundColor = '';
          this.refs.todo_title.value = '';
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
    let { listNotes, visibilityApp} = this.props;
    if (visibilityApp.app === 'SHOW_NOTES' || visibilityApp.app === 'SHOW_ALL'){
      listNotes = getSearchFilterNotes(listNotes, visibilityApp.search);
      return (
        <div>
        {
          listNotes.map((note, i) =>
             <div 
              ref = { 'color_list' }
              class= { 'list-container' }
              style = {{ backgroundColor: note.color }}
              key = { note.id }>
              <div 
                class={ 'title-input' }
                ref= { 'edit_note_title' }
                onChange={
                    (e) => { 
                      store.dispatch({
                        type: 'EDIT_NOTE_TITLE',
                        payload: {
                          id: note.id,
                          title: e.target.value,
                          modification_date: new Date()
                        }
                      });
                    }
                  }
              >{ note.title }</div>
              <div 
			          ref = { 'color_list' }
                class= { 'edit-div' }>
                <div 
                  class={ 'title-input' }
  				        ref = { 'color_list' }
                  onChange={
                      (e) => { 
                        store.dispatch({
                          type: 'EDIT_NOTE_CONTENT',
                          payload: {
                            id: note.id,
                            content: e.target.value,
                            modification_date: new Date()
                          }
                        });
                      }
                    }>{ note.content }</div>
                <i onClick = { 
                    () => {
                      store.dispatch({
                        type: 'SHOW_COLOR_NOTE',
                        payload: {
                          id: note.id
                        }
                      })
                    }
                  }
                ></i>
                <div class = { 'circle-container' }>
                 <ColorContainer
                   note = { note }
                   current = { 'NOTE' } >
                 </ColorContainer>
                </div>
                </div>
                 <button
                  class={ 'btn blue size' }
                  onClick={
                    () => { 
                      store.dispatch({
                        type: 'ARCHIVE_NOTE',
                        payload: {
                          id: note.id,
                          modification_date: new Date()
                        }
                      });
                    }
                  }
                >Archive</button>
                <button
                  class={ 'btn red size' }
                  onClick={
                    () => { 
                      store.dispatch({
                        type: 'DELETE_NOTE',
                        payload: {
                          id: note.id
                        }
                      });
                     
                    }
                  }
                >Delete</button>
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
    let { todos, listTodos, visibilityApp } = this.props;
    if (typeof listTodos === 'undefined') {
      listTodos = [];
    }
    if (visibilityApp.app === 'SHOW_TODOS' || visibilityApp.app === 'SHOW_ALL') {
    listTodos = getSearchFilter(listTodos, visibilityApp.search);
    return (
        <div>
        {
          listTodos.map((list, i) =>
             <div 
              ref = { 'color_list' }
              class= { 'list-container' }
              style = {
                {
                  backgroundColor: list.color
                }
              }
              key = { list.id }
            >
              <div 
                class={ 'title-input' }
                onChange={
                  (e) => { 
                    store.dispatch({
                      type: 'EDIT_LIST_TODO',
                      payload: {
                        id: list.id,
                        title: e.target.value,
                        modification_date: new Date()
                      }
                    });
                  }
                }
              >{ list.title }</div>
              <AddTodo 
                todos = { todos }
                listTodo = { list }
                visibilityFilter = { list.visibilityFilter }
                key= { i }
              ></AddTodo>
              <div 
                class= { 'edit-div' }
              >
                <i onClick = { 
                    () => {
                      store.dispatch({
                        type: 'SHOW_COLORS',
                        payload: {
                          id: list.id
                        }
                      })
                    }
                  }
                ></i>
                <div class = { 'circle-container' }>
                 <ColorContainer
                   listTodo = { list }
                 >
                 </ColorContainer>
                 </div>
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
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  payload: {
                    id: todo.id,
                    modification_date: new Date()
                  }
                });
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
                store.dispatch({
                  type: 'EDIT_TODO',
                  payload: {
                    text: e.target.value,
                    id: todo.id,
                    modification_date: new Date()
                  }
                })
              }
            }
            key={ todo.id }
            defaultValue={ todo.text}
        />
        <button
          class= { 'btn red' }
          onClick={
            () => { 
              store.dispatch({
                type: 'DELETE_TODO',
                payload: {
                  id: todo.id
                }
              });
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
      colorConstant.map(
        (color, i) => 
    		<div
          key = { i }
          class = { color.class }
          onClick = {
            () => {
              if (current === 'NOTE' ){
                store.dispatch({
                  type: 'CHANGE_COLOR_NOTE',
                  payload: {
                    id: note.id,
                    color: color.div_color,
                    modification_date: new Date()
                  }
                })
              }
              else {
                store.dispatch({
                  type: 'CHANGE_COLOR_LIST_TODO',
                  payload: {
                    id: listTodo.id,
                    color: color.div_color,
                    modification_date: new Date()
                  }
                })
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

const getUnSaved = (todos) => {
  return todos.filter(t => t.saved === false);
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

const getSearchFilter = (listTodos, search) => {
  
  if (search !== '') {
    
    return listTodos.filter(listTodo => listTodo.title.includes(search));
  }
  return listTodos; 
}
const getSearchFilterNotes = (listNotes, search) => {
  if (search !== '') {
    return listNotes.filter(note => note.title.includes(search));
  }
  return listNotes;
}

class TodosApp extends Component {

  render() {

  let { todos, listTodos, listNotes, visibilityApp } = this.props;
  let visibleListTodos = listTodos.filter(l => l.archived === false);
  return (
    <div class="main-container">
      <AddTodosLists
        todos = { todos }
        listTodo = { visibleListTodos }
        visibilityApp = { visibilityApp }
      >
      </AddTodosLists>
      <AddNotes
       listNotes = { listNotes }
       visibilityApp = { visibilityApp }
      > 
      </AddNotes>
      <VisibleTodoList
        listTodos = { visibleListTodos }
        todos = { todos }
        visibilityApp = { visibilityApp }
      >
      </VisibleTodoList>
      <VisibleNotes
        listNotes = { listNotes }
        visibilityApp = { visibilityApp }
      >
      </VisibleNotes>
      <FilterLink
        visibilityFilter="SHOW_ALL"
        currentVisibilityFilter = { visibilityApp }
        >SHOW ALL</FilterLink> 
        <FilterLink
        visibilityFilter="SHOW_TODOS"
        currentVisibilityFilter = { visibilityApp }
        >SHOW TODOS LISTS</FilterLink> 
      <FilterLink
        visibilityFilter="SHOW_NOTES"
        currentVisibilityFilter = { visibilityApp }
        >SHOW NOTES</FilterLink>  
    </div>
  );
  }
}



const render = () => {
  saveState(store.getState());
  ReactDOM.render(
    <TodosApp
      { ...store.getState() }
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
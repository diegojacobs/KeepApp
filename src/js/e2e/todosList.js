import { todosList } from '../reducers/todosList';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testAddListTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_LIST_TODO',
    payload: {
      id: 0,
      title: 'Hacer el almuerzo'
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Hacer el almuerzo',
    archived: false,
    show_color: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todosList(stateBefore, action)
  ).toEqual(stateAfter);
}

const testEditListTodo = () => {
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    modification_date: ''
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    modification_date: ''
  }];
  const action = {
    type: 'EDIT_LIST_TODO',
    payload: {
      id: 1,
      title: 'Hacer el almuerzo',
      modification_date: ''
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    modification_date: ''
  },
  {
    id: 1,
    title: 'Hacer el almuerzo',
    archived: false,
    show_color: false,
    modification_date: ''
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todosList(stateBefore, action)
  ).toEqual(stateAfter);
}
const testChangeColorListTodo = () => {
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    modification_date: ''
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    modification_date: ''
  }];
  const action = {
    type: 'CHANGE_COLOR_LIST_TODO',
    payload: {
      id: 1,
      color: 'blue',
    modification_date: ''
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    modification_date: ''
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    color: 'blue',
    modification_date: ''
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todosList(stateBefore, action)
  ).toEqual(stateAfter);
}
const testArchiveListTodo = () => {
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false
  }];
  const action = {
    type: 'ARCHIVE_LIST_TODO',
    payload: {
      id: 1
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false
  },
  {
    id: 1,
    title: 'LIST',
    archived: true,
    show_color: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todosList(stateBefore, action)
  ).toEqual(stateAfter);
}

const testShowColor = () => {
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false
  }];
  const action = {
    type: 'SHOW_COLORS',
    payload: {
      id: 1
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: true
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todosList(stateBefore, action)
  ).toEqual(stateAfter);
}

const testVisibilityFilter = () => {
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
  }];
  const action = {
    type: 'SET_VISIBILITY_FILTER',
    payload: {
      idList: 1,
      visibilityFilter: 'SHOW_ALL'
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    visibilityFilter: 'SHOW_ALL'
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todosList(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddListTodo();
testEditListTodo();
testChangeColorListTodo();
testArchiveListTodo();
testShowColor();
testVisibilityFilter();


console.log("TodosList tests passed!");
export {  };
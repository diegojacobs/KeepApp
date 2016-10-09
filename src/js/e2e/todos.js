import { todos } from '../reducers/todos';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testAddTodo = () => {
  const stateBefore = [];

  const action = {
    type: 'ADD_TODO',
    payload: {
      id: 0,
      text: 'Hacer el almuerzo'
    }
  }

  const stateAfter = [{
    id: 0,
    text: 'Hacer el almuerzo',
    completed: false,
    saved: false,
    archived: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      completed: false
    },
    {
      id: 1,
      text: 'Limpiar',
      completed: false
    }
  ];

  const action = {
    type: 'TOGGLE_TODO',
    payload: {
      id: 1
    }
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      completed: false
    },
    {
      id: 1,
      text: 'Limpiar',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testSaveTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      saved: false
    },
    {
      id: 1,
      text: 'Limpiar',
      saved: false
    }
  ];

  const action = {
    type: 'SAVE_TODO',
    payload: {
      id: 1
    }
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      saved: false
    },
    {
      id: 1,
      text: 'Limpiar',
      saved: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

}

const testEditTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      completed: false
    },
    {
      id: 1,
      text: 'Limpiar',
      completed: false
    }
  ];

  const action = {
    type: 'EDIT_TODO',
    payload: {
      id: 1,
      text: 'EDITED'
    }
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      completed: false
    },
    {
      id: 1,
      text: 'EDITED',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testArchiveTodo = () => {
  const date = new Date();
  const stateBefore = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      archived: false
    },
    {
      id: 1,
      text: 'Limpiar',
      archived: false
    }
  ];

  const action = {
    type: 'ARCHIVE_TODO',
    payload: {
      id: 1
    }
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      archived: false
    },
    {
      id: 1,
      text: 'Limpiar',
      archived: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testDeleteTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      completed: false
    },
    {
      id: 1,
      text: 'Limpiar',
      completed: false
    }
  ];

  const action = {
    type: 'DELETE_TODO',
    payload: {
      id: 1
    }
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Hacer el almuerzo',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}


testAddTodo();
testToggleTodo();
testSaveTodo();
testEditTodo();
testArchiveTodo();
testDeleteTodo();
console.log("All todo tests passed!");
export {  };
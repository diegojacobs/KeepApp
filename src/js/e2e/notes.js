import { notes } from '../reducers/notes';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testAddNote = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_NOTE',
    payload: {
      id: 0,
      title: 'Limpiar mi casa',
      description: 'Limpiar mi cuarto'
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}
const testEditNoteTitle = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false
  }];
  const action = {
    type: 'EDIT_NOTE_TITLE',
    payload: {
      id: 1,
      title: 'Estudiar sistos'
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Estudiar sistos',
    description: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}
const testEditdescriptionNote = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false
  }];
  const action = {
    type: 'EDIT_NOTE_description',
    payload: {
      id: 1,
      description: 'Saque 0'
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Saque 0',
    saved: false,
    archived: false,
    show_color: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}

const testChangeColorNote = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false
  }];
  const action = {
    type: 'CHANGE_COLOR_NOTE',
    payload: {
      id: 1,
      color: 'blue'
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false,
    color: 'blue',
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}
const testArchiveNote = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false
  }];
  const action = {
    type: 'ARCHIVE_NOTE',
    payload: {
      id: 1,
      archived: true
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Google Keep',
    saved: false,
    archived: true,
    show_color: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}
const testShowColorNote = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false
  }];
  const action = {
    type: 'SHOW_COLOR_NOTE',
    payload: {
      id: 1
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Google Keep',
    saved: false,
    archived: false,
    show_color: true
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}
const testDeleteNote = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  },{
    id: 1,
    title: 'Terminar proyecto',
    description: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false
  }];
  const action = {
    type: 'DELETE_NOTE',
    payload: {
      id: 1
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    description: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddNote();
testEditNoteTitle();
testEditdescriptionNote();
testChangeColorNote();
testArchiveNote();
testShowColorNote();
testDeleteNote();

console.log("All notes tests passed!");
export {  };
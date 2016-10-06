import { notes } from '../reducers/notes';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testAddNote = () => {
  const stateBefore = [];
  const date = new Date();
  const action = {
    type: 'ADD_NOTE',
    payload: {
      id: 0,
      title: 'Limpiar mi casa',
      content: 'Limpiar mi cuarto',
      creation_date: date
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
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
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  }];
  const action = {
    type: 'EDIT_NOTE_TITLE',
    payload: {
      id: 1,
      title: 'Estudiar sistos',
      modification_date: date
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Estudiar sistos',
    content: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date,
    modification_date: date
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}
const testEditContentNote = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'Limpiar mi casa',
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  }];
  const action = {
    type: 'EDIT_NOTE_CONTENT',
    payload: {
      id: 1,
      content: 'Saque 0',
      modification_date: date
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Saque 0',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date,
    modification_date: date
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
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  }];
  const action = {
    type: 'CHANGE_COLOR_NOTE',
    payload: {
      id: 1,
      color: 'blue',
      modification_date: date
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false,
    color: 'blue',
    creation_date: date,
    modification_date: date
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
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  }];
  const action = {
    type: 'ARCHIVE_NOTE',
    payload: {
      id: 1,
      archived: true,
      modification_date: date
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Google Keep',
    saved: false,
    archived: true,
    show_color: false,
    creation_date: date,
    modification_date: date
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
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
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
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Google Keep',
    saved: false,
    archived: false,
    show_color: true,
    creation_date: date
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
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  },{
    id: 1,
    title: 'Terminar proyecto',
    content: 'Google Keep',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
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
    content: 'Limpiar mi cuarto',
    saved: false,
    archived: false,
    show_color: false,
    creation_date: date
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddNote();
testEditNoteTitle();
testEditContentNote();
testChangeColorNote();
testArchiveNote();
testShowColorNote();
testDeleteNote();

console.log("All notes tests passed!");
export {  };
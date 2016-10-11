import visibilityFilter from '../reducers/visibilityFilter';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testSetVisibilityFilter = () => {
  const stateBefore = 'ALL';

  const action = {
    type: 'SET_VISIBILITY_FILTER',
    payload: {
      visibilityFilter: 'HIDE_COMPLETED'
    }
  }

  const stateAfter = 'HIDE_COMPLETED';

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    visibilityFilter(stateBefore, action)
  ).toEqual(stateAfter);
}

testSetVisibilityFilter();
console.log("Visibility filter tests passed.");
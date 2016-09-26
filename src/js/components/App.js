import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import AddNote from '../containers/AddNote'
import VisibleNotes from '../containers/VisibleNotes'
import UndoRedo from '../containers/UndoRedo'


const App = () => (
  <div>
	  <div>
	  	<AddNote />
	  	<VisibleNotes />
	  </div>
		<div>
	    <AddTodo />
	    <VisibleTodoList />
	    <Footer />
    </div>
    <UndoRedo />
  </div>
)

export default App

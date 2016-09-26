import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import Notes from '../components/Notes'

const getVisibleNotes = (notes, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return notes
    case 'SHOW_COMPLETED':
      return notes.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return notes.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  notes: getVisibleNotes(state.notes.present, state.visibilityFilter)
})

const VisibleNotes = connect(
  mapStateToProps
)(Notes)

export default VisibleNotes
import React, { PropTypes } from 'react'
import Note from './Note'

const Notes = ({ notes }) => (
  <div>
    {notes.map(note =>
      <Note
        key={note.id}
        {...note}
      />
    )}
  </div>
)

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired
}

export default Notes
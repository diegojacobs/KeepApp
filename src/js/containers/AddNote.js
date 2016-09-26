import React from 'react'
import { connect } from 'react-redux'
import { addNote } from '../actions'

let AddNote = ({ dispatch }) => {
  let title
  let description
  let color

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!title.value.trim()) {
          return
        }
        if (!description.value.trim()) {
          return
        }

        dispatch(addNote(title.value, description.value, color.value))
        title.value = ''
        description.value = ''
      }}>
      <input ref={node => {
          title = node
        }} />
        <input ref={node => {
          description = node
        }} />
        <select ref={node => {
          color = node
        }}>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
        </select>
        <button type="submit">
          Add Note
        </button>
      </form>
    </div>
  )
}
AddNote = connect()(AddNote)

export default AddNote

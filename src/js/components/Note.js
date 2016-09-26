import React, { PropTypes } from 'react'

const Note = ({ title, description, color }) => (
  <div style={{background: color}}>
    <h1>{title}</h1>
    {description}
  </div>
)

Note.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}

export default Note
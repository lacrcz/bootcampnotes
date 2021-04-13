import React from 'react'

const Person = ({ name, number, id, eliminar }) => {
  return (
    <li className="note">{name} {number} : <button onClick={(event) => eliminar(event, id, name)}>Delete</button></li>
  )
}

export default Person
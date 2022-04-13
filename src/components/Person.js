import React from 'react'

const Person = ({ person, deletePerson }) => {
  const label = 'Poista'
  return (
    <li>{person.name} {person.number}
      <button onClick={deletePerson}>{label}</button>
    </li>
  )
}

export default Person
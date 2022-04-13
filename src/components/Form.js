import React from 'react'

const Form = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        Nimi: <input value={props.newName}
          onChange={props.handleName} />
      </div>
      <div>
        Numero: <input value={props.newNumber}
          onChange={props.handleNumber} />
      </div>
      <button type="submit">Lisää</button>
    </form>
  )
}

export default Form
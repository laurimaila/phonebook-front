import React from 'react'
import Person from './components/Person'
import Form from './components/Form'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
    }
  }

  deletePerson = (id, name) => {

    return () => {
      if (window.confirm(`Poistetaanko ${name}?`)) {
        const url = `http://localhost:3001/api/persons/${id}`

        axios
          .delete(url)
          .then(response => {
            console.log('Poisto suoritettu')
            this.componentDidMount()
          })
      }
    }

  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
    }

    if (this.state.persons.some(e => e.name === this.state.newName)) { alert("Kyseinen nimi on jo lisätty"); }
    else {
      axios
        .post('http://localhost:3001/api/persons', personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: ''
          })
        })
    }

  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  render() {

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          <Form addPerson={this.addPerson} newName={this.state.newName} handleName={this.handleNameChange}
            newNumber={this.state.newNumber} handleNumber={this.handleNumberChange} />
        </div>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <Person key={person.id} person={person} deletePerson={this.deletePerson(person.id, person.name)} />)}
        </ul>

      </div>
    )
  }
}



export default App
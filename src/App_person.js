import React, { useState, useEffect } from 'react'
import PersonService from './services/person'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  // Consultar
  const persons_fetch = () => {
    console.log('effect')
    PersonService
    .getAll()
    .then(initialPerson => {
      setPersons(initialPerson)
    })
  }
  useEffect(persons_fetch, [])
  // Agregar
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone
    }
    const found = persons.find(person => person.name === newName);
     if(found === undefined){
       return PersonService
       .create(personObject)
       .then(returnedPerson => {
         setPersons(persons.concat(returnedPerson))
         setNewName('')
         setNewPhone('')
       })
    } else {
      if(window.confirm(`Desea modificar el numero de ${personObject.name}`)) {
        updName(found.id)
      }
    }
  }
  // Modificar
  const updName = (id) => {
    const found = persons.find(person => person.id === id);
    const personObject = {
      name: found.name,
      number: newPhone
    }
    PersonService
    .update(id, personObject)
    .then(returnedPerson => {
      setPersons(persons.map(note => note.id !== id ? note : returnedPerson))
      setNewName('')
      setNewPhone('')
    })
  }

  // Eliminar
  const deleteName = (event, id, name) => {
    event.preventDefault();
    if(window.confirm(`Delete ${name}`)) {
      PersonService
      .eliminar(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch(err => {
        console.log('Error al eliminar')
      })
      
    }
  }
  // // // // // // // // // //
  const handlePersonChange = (event) => { setNewName(event.target.value) }
  const handlePhoneChange = (event) => { setNewPhone(event.target.value) }
  const handleFilterChange = (event) => { setFilter(event.target.value) }
  const personsToShow = filter === ''
  ? persons
  : persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>AddNew</h2>
        <div>Filter: <input onChange={handleFilterChange} value={filter}/></div>
      <h2>AddNew</h2>
      <form>
        <div>name: <input onChange={handlePersonChange} value={newName}/></div>
        <div>number: <input onChange={handlePhoneChange} value={newPhone}/></div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
          <Person key={person.name} id={person.id} name={person.name} number={person.number} eliminar={deleteName}/>
      ) }
    </div>
  )
}

export default App
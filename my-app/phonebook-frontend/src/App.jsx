import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {
  addNewPerson,
  deletePerson,
  getAll,
  updatePerson,
} from './services/persons'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getAll()
      .then((initialState) => setPersons(initialState))
      .catch((err) => {
        alert('Error retrieving data')
        console.log(err)
      })
  }, [])

  function handleSetPersons(e) {
    e.preventDefault()

    if (persons.some((person) => person.person === newName)) {
      let person = persons.find((person) => person.person === newName)
      handleUpdatePersons(person)
    } else {
      const newPersonObject = {
        person: newName,
        number: newNumber,
      }

      addNewPerson(newPersonObject)
        .then((returnedData) => {
          console.log(returnedData)
          setPersons([...persons, returnedData])
          setNewName('')
          setNewNumber('')
          setMessage(`${returnedData.person} has been added`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
        .catch((err) => {
          console.log(err)
          setErrorMessage(`Error: ${err.response.data.error}`)
          console.log(err.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
    }
  }

  function handleUpdatePersons(person) {
    const updatedPerson = {
      ...person,
      number: newNumber,
    }

    if (
      window.confirm(
        `${newName} is already added to the phonebook.  Would you like to update ${newName}'s phone number?`
      )
    )
      updatePerson(person.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          )
          setMessage(`${returnedPerson.person}'s number has been updated`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
        .catch((err) => {
          setErrorMessage(`Error: ${err.response.data.error}`)
          console.log(err.response.data.error)
          alert('This person has already been deleted').then(
            (deletedPerson) => {
              setPersons(
                persons.map((person) => person.id !== deletedPerson.id)
              )
            }
          )
        })
  }

  function handleDelete(person) {
    if (confirm(`Delete ${person.person}`)) {
      deletePerson(person.id)
        .then((returnedPerson) => {
          console.log(returnedPerson)
          setMessage(`${returnedPerson.person} has been successfully deleted`)
          setPersons(
            persons.filter((person) => returnedPerson.id !== person.id)
          )
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
        .catch((err) => {
          setErrorMessage(`${person.person} has already been deleted`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
          setPersons(persons.filter((p) => p.id !== person.id))
          console.log(err)
        })
    } else return
  }

  let searchedNames = persons.filter((person) =>
    person?.person?.includes(searchQuery)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={message} />
      <ErrorNotification message={errorMessage} />
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h2>Add a new person</h2>
      <PersonForm
        handleSetPersons={handleSetPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons searchedNames={searchedNames} handleDelete={handleDelete} />
    </div>
  )
}

export default App

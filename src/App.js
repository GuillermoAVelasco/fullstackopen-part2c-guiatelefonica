import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import FormPerson from './components/FormPerson'
import FilterPersons from './components/FilterPersons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ personsFind, setPersonsFind ]=useState([]); 
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsFind(persons);
      })
  }, [])
  console.log('render', persons.length, 'persons')
  
  const setNewNameTel=(e)=>{
    setNewName(e.target.value)
  }

  const setNewNumberTel=(e)=>{
    setNewNumber(e.target.value)
  }

  const setFindFilterName=(e)=>{
    setFilterName(e.target.value)
  }

  const addPerson=(e)=>{
    e.preventDefault()
    if(persons.find(element=> element.name.trim().toUpperCase()===newName.trim().toUpperCase())){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson={
      name:newName,
      number:newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  } //2.6 paso 1

  const handleNewName=(e)=>{
    setNewNameTel(e)
  }
  const handleNewNumber=(e)=>{
    setNewNumberTel(e)
  }

  useEffect(()=>{
    console.log('busqueda')
    setPersonsFind(filterName===''
    ? persons
    : persons.filter(person => person.name.toUpperCase().indexOf(filterName.toUpperCase()) !== -1))
    console.log('filter',personsFind)
  },[filterName])


 
//console.log(personsFind)
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons persons={personsFind} filterName={filterName} setFindFilterName={setFindFilterName} />
      
      <h2>Add a New</h2>
      <FormPerson persons={personsFind }  addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={personsFind} />
    </div>
  )
}

export default App

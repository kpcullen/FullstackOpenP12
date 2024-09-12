function Person({ person, handleDelete }) {
  return (
    <li key={person.id}>
      {person.person}: {person.number}
      <button onClick={() => handleDelete(person)}>Delete</button>
    </li>
  )
}

export default Person

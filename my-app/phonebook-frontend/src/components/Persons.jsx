import Person from "./Person";

function Persons({ searchedNames, handleDelete }) {
  return (
    <ul>
      {searchedNames.map((person) => (
        <Person person={person} key={person.id} handleDelete={handleDelete} />
      ))}
    </ul>
  );
}

export default Persons;

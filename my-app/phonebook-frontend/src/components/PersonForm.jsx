function PersonForm({
  handleSetPersons,
  newName,
  setNewName,
  setNewNumber,
  newNumber,
}) {
  return (
    <div>
      <form onSubmit={handleSetPersons}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;

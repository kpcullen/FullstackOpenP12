function Filter({ searchQuery, setSearchQuery }) {
  return (
    <div>
      find a name:{" "}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default Filter;

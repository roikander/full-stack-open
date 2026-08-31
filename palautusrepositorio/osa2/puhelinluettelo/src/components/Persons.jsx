const Persons = ({ personToShow }) => {
  return (
    <div>
      {personToShow.map(person =>
        <div key={person.name}>{person.name} {person.number} </div>
      )}
    </div>
  )
}

export default Persons

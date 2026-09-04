const Person = ({ personToShow, removePerson }) => {
  return (
    <div>
      {personToShow.map(person =>
        <div key={person.id}>{person.name} {person.number}
          <button onClick={() => removePerson(person.id, person.name)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Person

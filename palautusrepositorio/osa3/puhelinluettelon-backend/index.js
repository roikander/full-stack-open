require("dotenv").config()
const express = require("express")
const Person = require("./models/person")
const morgan = require("morgan")

const app = express()

let persons = []

const errorHandler = (error, request, response, next) => {
  console.error("Virheinfoa:", error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.static("dist"))
app.use(express.json())
app.use(morgan("tiny"))

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error, request))
})

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
  })
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body
  console.log(body)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    })
  } else if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then((result) => {
    response.status(204).end()
  })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on portti ${PORT}`)
})

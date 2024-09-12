require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log(error.errors)
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors)
      .map((err) => err.message)
      .join(' ')
    return response.status(400).send({
      error: messages,
    })
  }
  next(error)
}

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//morgan middleware

morgan.token('body', (req) => JSON.stringify(req.body))
const tiny =
  ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(tiny))

app.get('/info', (request, response) => {
  Person.find({}).then((persons) =>
    response.send(
      `<p>Phonebook has info for ${persons.length} people<p>${new Date()}</p>`
    )
  )
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons))
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.json(result).status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  const body = request.body

  const person = new Person({
    person: body.person,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { person, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { person, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

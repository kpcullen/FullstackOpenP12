const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { getAsync } = require('./redis')

const indexRouter = require('./routes/index')
const todosRouter = require('./routes/todos')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:8080', // Adjust as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(logger('dev'))
app.use(express.json())

app.get('/statistics', async (req, res) => {
  const addedTodos = await getAsync('added_todos')

  res.json({ added_todos: addedTodos ? parseInt(addedTodos) : 0 })
})

app.use('/', indexRouter)

app.use('/todos', todosRouter)

module.exports = app

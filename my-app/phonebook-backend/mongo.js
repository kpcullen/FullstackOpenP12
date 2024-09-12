const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kpcullen:${password}@cluster0.c0u7ztc.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0
`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  person: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    person: String(process.argv[3]),
    number: String(process.argv[4]),
  })

  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  console.log('phonebook')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.person, person.number)
    })
    mongoose.connection.close()
  })
}

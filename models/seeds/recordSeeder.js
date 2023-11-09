const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({ 
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for (let i = 0; i < 10; i++) {
        Record.create({ name: `name-${i}`, amount: i*10, userId, categoryId: 1 })
      }
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const bcrypt = require('bcryptjs')

const User = require('../user')
const db = require('../../config/mongoose')

const SEED_PASSWORD = '12345678'
const SEED_USER = [
    {
    name: 'root',
    email: 'root@example.com'
  },
  {
    name: 'user1',
    email: 'user1@example.com'
  },
  {
    name: 'user2',
    email: 'user2@example.com'
  },
]

db.once('open', () => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_PASSWORD, salt))
      .then(hash => 
        SEED_USER.map( user => 
            User.create({
            name: user.name,
            email: user.email,
            password: hash
          }))
        )
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })

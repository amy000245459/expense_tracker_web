if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => {
      return Promise.all([
        User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
          }),
          Category.findOne()
      ])
    })
    .then(([user,category]) => {
      const temp = Array.from({length: 10}, (_, i) => i + 1)
      return Promise.all(
        temp.map((value, _index) => {
          return Record.create({ name: `name-${value}`, amount: value*10, userId:user._id, categoryId:category._id })
        })
      )
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
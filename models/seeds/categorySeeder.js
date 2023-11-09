if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const Category = require('../user')
const db = require('../../config/mongoose')

const SEED_Category = ['家居物業','交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', () => {
    SEED_Category.map( category =>
        Category.create({
            name: category
        })
    )
    console.log('done')
    process.exit()
  })

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const Category = require('../category')
const db = require('../../config/mongoose')
const category = require('../category')

const SEED_Category = ['家居物業','交通出行', '休閒娛樂', '餐飲食品', '其他']
db.once('open', () => {
  Promise.all(
    SEED_Category.map((category, _index) => {
      return Category.create({
        name: category
    })
    })).then(()=>{
    console.log("Done")
    process.exit()

  }) 
})


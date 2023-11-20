const Record = require('../models/record')
const Category = require('../models/category')
const User = require('../models/user')

recordController = {
    getRecords: (req, res, next) => {
        //const userId = req.user._id //變數設定
        Record.find()
        .populate('categoryId')
        .lean()
        .sort({ _id: 'asc' }) // desc
        .then(records => {
          res.render('index', { records })

        })
        .catch(err =>  next(err))
      },
    addRecord: (req, res, next) => {
      Category.find()
      .lean()
      .then( categories => res.render('new', { categories })
      )
      .catch(err => next(err))
      
    },
    postRecord: (req, res, next) => {
      User.findOne()
        .lean()
        .then(user => {
          const { name, date, amount, category } = req.body
          if (!name) throw new Error('User name is required!')
          Record.create({ name, date, amount, category, user:user._id })
        })
      .then(() => res.redirect('/records'))
      .catch(err => next(err))
    }
}

module.exports = recordController
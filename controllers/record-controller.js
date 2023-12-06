const Record = require('../models/record')
const Category = require('../models/category')
const User = require('../models/user')
const moment = require('moment')

recordController = {
    getRecords: (req, res, next) => {
        //const userId = req.user._id //變數設定
        Record.find()
        .populate('categoryId')
        .lean()
        .sort({ _id: 'asc' }) // desc
        .then(records => {
          records = records.map(({date,...rest}) => {return {...rest,date: moment(date).format("YYYY MMM DD")}})
          res.render('index', { records })
        })
        .catch(err =>  next(err))
      },
    addRecord: (req, res, next) => {
      const defaultDate = moment(Date.now()).format('YYYY-MM-DD')
      Category.find()
      .lean()
      .then( categories => res.render('new', { categories, defaultDate })
      )
      .catch(err => next(err))
      
    },
    postRecord: (req, res, next) => {
      User.findOne()
        .lean()
        .then(user => {
          const { name, date, amount, categoryId } = req.body
          if (!name) throw new Error('User name is required!')
          Record.create({ name, date, amount, categoryId, user:user._id })
        })
      .then(() => {
        req.flash('success_msg', `A record has been added`)
        res.redirect('/records')
      })
      .catch(err => next(err))
    },
    getRecord: (req, res, next) => {
      return Promise.all([
        Record.findById(req.params.id)
      .populate('userId')
      .populate('categoryId')
      .lean(),
          Category.find().lean()
      ])
      .then(([record, categories])=> {
        record['date'] = moment(record['date']).format("YYYY-MM-DD")
        res.render('edit', {record,categories})
      })
      .catch(err => next(err))
    },
    putRecord: (req, res, next) => {
      const { name, date, amount, categoryId } = req.body
      Record.findById(req.params.id)
      .then( record =>{
        return record.update({ name, date, amount, categoryId })
      })
      .then(() => {
        req.flash('success_msg', `A record has been updated`)
        res.redirect('/records')
      })
      .catch(err => next(err))
    },
    deleteRecord: (req, res, next) => {
      const _id = req.params.id
      return  Record.findOneAndDelete({ _id })
        .then(record => {
          req.flash('success_msg', `A record has been removed`)
          res.redirect('/records')
          })
        .catch(error => next(error))
    },
}

module.exports = recordController
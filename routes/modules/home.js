const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
    //const userId = req.user._id //變數設定
    Record.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
  })

module.exports = router
const express = require('express')
const router = express.Router()
const recordController = require('../controllers/record-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const users = require('./modules/users')
const records = require('./modules/records')

router.use('/users', users)
router.use('/records', records)
router.use('/', (req, res) => res.redirect('/records'))
router.use('/', generalErrorHandler)


module.exports = router
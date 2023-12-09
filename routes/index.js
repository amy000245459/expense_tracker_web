const express = require('express')
const router = express.Router()
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticator } = require('../middleware/auth')
const users = require('./modules/users')
const records = require('./modules/records')

router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/', (req, res) => res.redirect('/records'))
router.use('/', generalErrorHandler)


module.exports = router
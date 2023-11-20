const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expense-controller')
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/records', expenseController.getExpense)
router.use('/', (req, res) => res.redirect('/records'))
router.use('/', generalErrorHandler)


module.exports = router
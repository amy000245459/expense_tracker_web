const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expense-controller')


router.get('/records', expenseController.getExpense)
router.use('/', (req, res) => res.redirect('/records'))


module.exports = router
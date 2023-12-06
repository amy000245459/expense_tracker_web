const express = require('express')
const router = express.Router()
const recordController = require('../controllers/record-controller')
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/records/new', recordController.addRecord)
router.put('/records/:id', recordController.putRecord)
router.get('/records/:id', recordController.getRecord)
router.delete('/records/:id', recordController.deleteRecord)
router.post('/records', recordController.postRecord)
router.get('/records', recordController.getRecords)
router.use('/', (req, res) => res.redirect('/records'))
router.use('/', generalErrorHandler)


module.exports = router
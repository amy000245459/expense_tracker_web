const express = require('express')
const router = express.Router()
const recordController = require('../../controllers/record-controller')

router.get('/new', recordController.addRecord)
router.put('/:id', recordController.putRecord)
router.get('/:id', recordController.getRecord)
router.delete('/:id', recordController.deleteRecord)
router.post('/', recordController.postRecord)
router.get('/', recordController.getRecords)

module.exports = router
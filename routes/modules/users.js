const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.get('/signin', userController.signInPage)
router.post('/signin', userController.signIn)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)


module.exports = router
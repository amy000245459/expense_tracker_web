const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const { generalErrorHandler } = require('../../middleware/error-handler')

const passport = require('passport')
router.get('/signin', userController.signInPage)
//router.post('/signin', userController.signIn)
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin'
  }))
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/logout', userController.logout)
router.use('/', generalErrorHandler)

module.exports = router
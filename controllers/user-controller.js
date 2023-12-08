const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

userController = {
    signInPage: (req, res, next) => { 
        res.render('signin')
    },
    signIn: (req, res, next) => { 
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/users/signin'
          })
    },
    signUpPage: (req, res, next) => { 
        res.render('signup')
    },
    signUp: (req, res, next) => {
        const { name, email, password, confirmPassword } = req.body
        if (!name || !email || !password || !confirmPassword) {
            throw new Error('所有欄位都是必填。')
            //errors.push({ message: '所有欄位都是必填。' })
          }
        // 如果兩次輸入的密碼不同，就建立一個 Error 物件並拋出
        if (password !== confirmPassword) throw new Error('Passwords do not match!')
        // 檢查使用者是否已經註冊
        User.findOne({ email }).then(user => {
          // 如果已經註冊：退回原本畫面
            if (user) throw new Error('Email already exists!')
            // 如果還沒註冊：寫入資料庫
            //return bcrypt.hash(req.body.password, 10) // 前面加 return
            return bcrypt
                   .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
                   .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
                   .then(hash => User.create({ name, email, password: hash // 用雜湊值取代原本的使用者密碼
        }))
        .then(() => {
            req.flash('success_msg', `${name} has registered successfully`)
            res.redirect('/')
        })
        .catch(err => next(err))
        }) 
        },
    logout:(req, res, next) => {
        // Passport.js 提供的函式，會清除 session
        req.logout()
        req.flash('success_msg', '你已經成功登出。')
        res.redirect('/users/login')
      }
    }

module.exports = userController


   
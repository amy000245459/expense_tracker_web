const User = require('../models/user')

userController = {
    signInPage: (req, res, next) => { 
        res.render('signin')
    },
    signIn: (req, res, next) => { 
        pass
    },
    signUpPage: (req, res, next) => { 
        res.render('signup')
    },
    signUp: (req, res, next) => {
        const { name, email, password, confirmPassword } = req.body
        // 如果兩次輸入的密碼不同，就建立一個 Error 物件並拋出
        if (password !== confirmPassword) throw new Error('Passwords do not match!')
        // 檢查使用者是否已經註冊
        User.findOne({ email }).then(user => {
          // 如果已經註冊：退回原本畫面
          if (user) {
            if (user) throw new Error('Email already exists!')
            // 如果還沒註冊：寫入資料庫
            //return bcrypt.hash(req.body.password, 10) // 前面加 return
            return password
          }})
          .then(hash => User.create({ name, email, password: hash}))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
        }
      }

module.exports = userController


   
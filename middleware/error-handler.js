module.exports = {
    // 網頁版本的錯誤是顯示在 flash message
    generalErrorHandler (err, req, res, next) {
      if (err instanceof Error) {
        req.flash('error_messages', `${err.name}: ${err.message}`)
      } else {
        req.flash('error_messages', `${err}`)
      }
      res.redirect('back')
      next(err)
    }
  }
  
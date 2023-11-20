const Record = require('../models/record')
const Category = require('../models/category')

expenseController = {
    getExpense: (req, res) => {
        //const userId = req.user._id //變數設定
        Record.find()
        .populate('categoryId')
        .lean()
        .sort({ _id: 'asc' }) // desc
        .then(records => {
          res.render('index', { records })

        })
        .catch(error => console.error(error))
      }
}

module.exports = expenseController
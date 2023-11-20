if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT 

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
//app.use(flash())
app.use(routes)

app.listen(PORT, () => {
    console.log('App is running on http://localhost:3000')
  })
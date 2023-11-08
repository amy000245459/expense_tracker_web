const express = require('express')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
const db = require('./config/mongoose')


const app = express()


app.get('/', (req, res) => { res.send('hellow world') })

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
  })
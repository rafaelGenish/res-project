// import the lib
const express = require('express')

const cors = require('cors')

// config the env variables
require('dotenv').config()

// create server
const app = express()

// import the router files
const ordersRouteFile = require('./orders')

// middleweres
app.use(cors())
app.use(express.json())
app.use('/orders', ordersRouteFile)

// root route
app.get('/', (req, res) => {
	res.send('welcome to my app =)')
})

// run the server
app.listen(1001, () => console.log('hey from orders server on port 1001'))

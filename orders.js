// import the lib
const express = require('express')

// import the DB
const { menu, tables, waiters } = require('./database')

// inport the verify middlewere
const { onlyRegisteredWaiter } = require('./vt')

// create router instance
const router = express.Router()

router.get('/menu', (req, res) => {
	res.json(menu)
})

router.get('/tables', (req, res) => {
	// reduce
	res.json(tables)
})

router.get('/tables/:id', (req, res) => {
	res.json({
		orders: tables[req.params.id].orders,
		total: tables[req.params.id].total,
	})
})

router.post('/tables/:id', onlyRegisteredWaiter, (req, res) => {
	const { count, notes, dish_name } = req.body
	let dish = menu.find((d) => d.name == dish_name)
	let waiter = waiters.find((w) => w.id == req.waiter.id)
	tables[req.params.id].orders.push({ notes, count, dish, waiter })
	tables[req.params.id].total += count * dish.price
	res.json(tables[req.params.id].orders)
})

router.delete('/payment/:id', (req, res) => {
	tables[req.params.id].orders = []
	tables[req.params.id].total = 0
	res.send()
})

// export the middlewere
module.exports = router

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { waiters } = require('./database')

router.post('/register', (req, res) => {
	const { name, username, password } = req.body
	if (!waiters.find((w) => w.username == username)) {
		if (name && username && password) {
			bcrypt.genSalt(10, (err, salt) => {
				if (err)
					return res.status(500).json({ error: true, msg: 'bcrypt error' })
				bcrypt.hash(password, salt, (err, hash) => {
					if (err)
						return res
							.status(500)
							.json({ error: true, msg: 'bcrypt error' })
					waiters.push({
						id: waiters.length,
						name,
						username,
						password: hash,
					})
					res.status(201).json({
						error: false,
						msg: 'waiter added successfully',
					})
				})
			})
		} else {
			res.status(400).json({ error: true, msg: 'missing some info' })
		}
	} else {
		res.status(400).json({ error: true, msg: 'user already exist' })
	}
})

router.post('/login', (req, res) => {
	const { username, password } = req.body
	const waiter = waiters.find((w) => w.username == username)
	if (waiter) {
		if (bcrypt.compareSync(password, waiter.password)) {
			// tokens
			let token = jwt.sign({ id: waiter.id, name: waiter.name }, process.env.JWT_SECRET, {
                expiresIn: process.env.TOKEN_EXP
            })
			res.json({ error: false, token})
		} else {
			res.status(400).json({ error: true, msg: 'wrong password' })
		}
	} else {
		res.status(400).json({ error: true, msg: 'waiter not found' })
	}
})

router.get('/', (req, res) => res.json(waiters))

module.exports = router




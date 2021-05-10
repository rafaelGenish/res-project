const jwt = require('jsonwebtoken')

const onlyRegisteredWaiter = (req, res, next) => {
	jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			res.status(401).json({ error: true, msg: err })
		} else {
			req.waiter = decoded
			next()
		}
	})
}

module.exports = { onlyRegisteredWaiter }

const menu = [
	{ name: 'Pizza', price: 45 },
	{ name: 'Pasta', price: 59 },
	{ name: 'Salad', price: 85 },
	{ name: 'Bacon', price: 12 },
]

const waiters = [
	{ id: 0, neme: 'Johnny', username: 'jj', password: '123' },
	{ id: 1, neme: 'Jenny', username: 'je', password: '123' },
	{ id: 2, neme: 'Jonnia', username: 'ja', password: '123' },
]

const tables = [
	{
		id: 0,
		orders: [{ count: 2, notes: '', dish: menu[1], waiter: waiters[1] }],
		total: 59 * 2,
	},
	{ id: 1, orders: [], total: 0 },
	{
		id: 2,
		orders: [{ count: 1, notes: 'blah', dish: menu[0], waiter: waiters[0] }],
		total: 45,
	},
	{ id: 3, orders: [], total: 0 },
	{
		id: 4,
		orders: [
			{ count: 2, notes: '', dish: menu[2], waiter: waiters[2] },
			{ count: 1, notes: '', dish: menu[3], waiter: waiters[2] },
		],
		total: 58 * 2 + 12,
	},
]

module.exports = {
	menu,
    tables,
    waiters
}

const swag = require('../models/swag');

module.exports = {
	add: (req, res) => {
		const {id} = req.params;
		let {user} = req.session;
		if (!user.cart.find(id)) {
			res.status(200).send(user);
		}
	},
	delete: (req, res) => {
		const {id} = req.params;
	},
	checkout: (req, res) => {
		const {user} = req.session;
		user.cart = [];
		user.total = 0;
		res.status(200).send(user);
	}
}
const swag = require('../models/swag');

module.exports = {
	add: (req, res) => {
		const {id} = req.params;
		let {user} = req.session;
		if (user.cart.find(swag => swag.id == id)) {
			res.status(200).send(user);
		}
		else {
			let item = swag.find(swag => swag.id == id);
			user.cart.push(item);
			user.total += item.price;
			res.status(200).send(user);
		}
	},
	delete: (req, res) => {
		const {id} = req.params;
		let {user} = req.session;
		let index = user.cart.findIndex(swag => swag.id == id);
		user.cart.splice(index, 1);
		user.total -= user.cart[index].price;
		res.status(200).send(user);
	},
	checkout: (req, res) => {
		const {user} = req.session;
		user.cart = [];
		user.total = 0;
		res.status(200).send(user);
	}
}
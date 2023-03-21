const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	quantity: {
		type: Number,
		default: 1
	},
	price: Number,
});

const cartSchema = new mongoose.Schema({
	items: [cartItemSchema],
	total: {
		type: Number,
		default: 0
	},
});

module.exports = mongoose.model('Cart', cartSchema);
const Product = require('../models/Product');


const createProducts = async (products) => {
	for (let i = 0; i < products.length; i++) {
		const product = new Product(products[i]);

		try {
			await product.save();
		} catch (error) {
			console.log(error);
		}
	}
};

module.exports = {
	createProducts,
};
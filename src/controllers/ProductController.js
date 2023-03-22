const moment = require("moment");
const formatCurrency = require("../lib/formatCurrency");
const Product = require("../models/Product");
const productService = require('../services/productService');

class ProductController {
	create(req, res) {
		return res.render("product/register");
	}

	createProducts = async (req, res) => {
		const products = [{
				name: 'Feijão',
				barcode: '436325343',
				amount: 10,
				salePrice: 9.99,
				expirationDate: new Date('2023-12-31'),
			},
			{
				name: 'Arroz',
				barcode: '345513334',
				amount: 5,
				salePrice: 4.99,
				expirationDate: new Date('2022-10-15'),
			},
			{
				name: 'Picanha',
				barcode: '0987654321',
				amount: 54,
				salePrice: 199,
				expirationDate: new Date('2022-10-15'),
			},
			{
				name: 'Calabresa',
				barcode: '098324321',
				amount: 29,
				salePrice: 9.99,
				expirationDate: new Date('2022-10-15'),
			},
			{
				name: 'Massa',
				barcode: 'F343rfdfs344',
				amount: 5,
				salePrice: 2.99,
				expirationDate: new Date('2022-10-15'),
			},
			{
				name: 'Suco',
				barcode: '0987654321',
				amount: 53,
				salePrice: 6.99,
				expirationDate: new Date('2022-10-15'),
			},
			{
				name: 'Amora',
				barcode: '0987654321',
				amount: 59,
				salePrice: 0.99,
				expirationDate: new Date('2022-10-15'),
			},
		];


		try {
			await productService.createProducts(products);

			res.render('product/templateSuccess')
		} catch (error) {
			res.status(500).send('Erro ao criar os produtos');
		}
	};

	createUpdate(req, res) {
		return res.render("product/updateproduct");
	}

	async index(req, res) {
		const filters = {};
		let filterActive = false;

		if (req.body.nome) {
			let products = await Product.find({
				name: new RegExp(req.body.nome, "i"),
			});

			const getProductsPromise = products.map(async (product) => {
				product.formattedExpirationDate = moment(product.expirationDate).format(
					"DD-MM-YYYY"
				);

				return product;
			});

			products = await Promise.all(getProductsPromise);

			filterActive = true;

			return res.render("product/list", {
				products: products,
				filterActive,
			});
		}

		if (req.body.searchBarcode) {
			let products = await Product.find({
				barcode: req.body.searchBarcode,
			});

			if (products.length <= 0) {
				return res.redirect("/productslist");
			}

			const getProductsPromise = products.map(async (product) => {
				product.formattedExpirationDate = moment(product.expirationDate).format(
					"DD-MM-YYYY"
				);

				product.formattedSalePrice = formatCurrency.brl(product.salePrice);

				return product;
			});

			products = await Promise.all(getProductsPromise);

			filterActive = true;

			return res.render("product/list", {
				products: products,
				searchBarcode: req.body.searchBarcode,
				filterActive,
			});
		}

		let products = await Product.paginate(filters, {
			limit: parseInt(req.query.limit_page) || 2000,
			sort: "-createdAt",
		});

		const getProductsPromise = products.docs.map(async (product) => {
			product.formattedExpirationDate = moment(product.expirationDate).format(
				"DD-MM-YYYY"
			);
			product.formattedPrice = formatCurrency.brl(product.price);
			product.formattedSalePrice = formatCurrency.brl(product.salePrice);
			return product;
		});

		products = await Promise.all(getProductsPromise);

		return res.render("product/list", {
			products: products,
		});
	}

	async APIlist(req, res) {
		const filters = {};
		
		let products = await Product.paginate(filters, {
			limit: parseInt(req.query.limit_page) || 2000,
			sort: "-createdAt",
		});
	
		const getProductsPromise = products.docs.map(async (product) => {
			product.formattedExpirationDate = moment(product.expirationDate).format(
				"DD-MM-YYYY"
			);
			product.formattedPrice = formatCurrency.brl(product.price);
			product.formattedSalePrice = formatCurrency.brl(product.salePrice);
			return product;
		});
	
		products.docs = await Promise.all(getProductsPromise);
	
		return res.json(products);
	}
	
	
	async store(req, res) {
		const {
			name,
			salePrice,
			amount,
			expirationDate,
			barcode
		} = req.body;

		if (!name || !salePrice || !amount) {
			let products = await Product.find();

			const getProductsPromise = products.map(async (product) => {
				product.formattedExpirationDate = moment(product.expirationDate).format(
					"DD-MM-YYYY"
				);
				product.formattedPrice = formatCurrency.brl(product.price);
				product.formattedSalePrice = formatCurrency.brl(product.salePrice);
				return product;
			});

			products = await Promise.all(getProductsPromise);

			return res.render("product/list", {
				name,
				salePrice,
				amount,
				barcode,
				products: products,
				expirationDate: moment(expirationDate).format("YYYY-MM-DD"),
				message: "Preencha os campos obrigatórios (*) para continuar!",
			});
		}

		await Product.create({
			...req.body,
			expirationDate: !req.body.expirationDate ?
				null :
				moment(req.body.expirationDate).format(),
		});

		return res.redirect("/productslist");
	}

	async edit(req, res) {
		const {
			id
		} = req.params;

		let product = await Product.findById(id);

		product.formattedExpirationDate = moment(product.expirationDate).format(
			"YYYY-MM-DD"
		);

		return res.render("product/update", {
			product: product,
		});
	}

	async update(req, res) {
		const {
			id
		} = req.params;
		const {
			name,
			salePrice,
			amount
		} = req.body;

		if (!name || !salePrice || !amount) {
			let product = await Product.findById(id);

			product.formattedExpirationDate = moment(product.expirationDate).format(
				"YYYY-MM-DD"
			);

			return res.render("product/update", {
				product: product,
				message: "Preencha os campos obrigatórios (*) para continuar!",
			});
		}

		await Product.findByIdAndUpdate(
			id, {
				...req.body,
				expirationDate: !req.body.expirationDate ?
					null :
					moment(req.body.expirationDate).format(),
			}, {
				new: true
			}
		);

		return res.redirect("/productslist");
	}

	async destroy(req, res) {
		const {
			id
		} = req.params;

		await Product.findByIdAndRemove(id);

		return res.redirect("/productslist");
	}
	
	async APIstore(req, res) {
		const {
		  name,
		  salePrice,
		  amount,
		  expirationDate,
		  barcode,
		} = req.body;
	  
		if (!name || !salePrice || !amount) {
		  return res.status(400).json({
			message: "Preencha os campos obrigatórios (*) para continuar!",
		  });
		}
	  
		const existingProduct = await Product.findOne({
		  barcode: barcode,
		});
	  
		if (existingProduct) {
		  return res.status(409).json({
			message: "Produto já cadastrado com este código de barras.",
		  });
		}
	  
		const newProduct = await Product.create({
		  ...req.body,
		  expirationDate: !expirationDate ? null : moment(expirationDate).format(),
		});
	  
		return res.status(201).json({
		  message: "Produto adicionado com sucesso!",
		  product: newProduct,
		});
	  }
	  
}

module.exports = new ProductController();
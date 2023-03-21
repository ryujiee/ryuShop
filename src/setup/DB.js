const mongoose = require('mongoose');

// CONEXÃO COM O MONGODB

function connect() {
	mongoose.connect('mongodb://127.0.0.1:27017/ryuShop', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(() => {
		console.log("Mongo conectado com sucesso.")
	}).catch((error) => {
		console.error("Falha ao conectar o banco. Motivo: " + error)
	})
}

module.exports = {
	connect
};
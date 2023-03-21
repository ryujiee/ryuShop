const User = require("../models/User");
const bcrypt = require("bcryptjs");

class DefaultUserController {
	async createDefaultUser() {
		try {
			const user = await User.findOne({
				email: "admin@ryushop.com"
			});

			if (!user) {
				const name = 'admin';
				const password = 'admin';
				await User.create({
					name: name,
					email: "admin@ryushop.com",
					password: password,
				});
				console.log("Usuário padrão criado com sucesso.");
			}

		} catch (err) {
			console.error("Erro ao criar usuário padrão: ", err);
		}
	}
}

module.exports = new DefaultUserController();
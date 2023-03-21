const User = require("../models/User");
const mongoose = require('mongoose');

class UserController {
	create(req, res) {
		return res.render("user/register");
	}

	createUpdate(req, res) {
		return res.render("user/updateuser");
	}

	async index(req, res) {
		const users = await User.find();
		return res.render("user/list", {
			users
		});
	}

	async store(req, res) {
		await User.create(req.body);

		return res.redirect("/userslist");
	}

	async edit(req, res) {
		const {
			id
		} = req.params;

		const user = await User.findById(id);

		return res.render("user/update", {
			user: user
		});
	}

	async update(req, res) {
		const {
			id
		} = req.params;
		const {
			name,
			email,
			password
		} = req.body;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).send('ID inválido');
		}

		if (id === 'admin') {
			await User.findByIdAndUpdate(id, {
				password
			}, {
				new: true
			});
			return res.redirect('/userslist');
		}

		const user = await User.findById(id);

		if (!user) {
			return res.status(404).send('Usuário não encontrado');
		}

		if (email !== user.email) {
			const emailExists = await User.findOne({
				email
			});
			if (emailExists) {
				return res.status(400).send('Este e-mail já está em uso');
			}
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.password = password || user.password;

		await user.save();

		return res.redirect('/userslist');
	}

	async destroy(req, res) {
		const {
			id
		} = req.params;

		const currentUser = req.user;

		const userToDelete = await User.findById(id);

		if (userToDelete.name === 'admin') {
			return res.send("<script>alert('Você não pode remover o usuário administrador.');window.location.href='/userslist';</script>");
		}

		if (userToDelete._id.equals(currentUser._id)) {
			return res.send("<script>alert('Você não pode remover o seu próprio usuário.'); window.location.href='/userslist';</script>");
		}

		await User.findByIdAndRemove(id);

		return res.redirect("/userslist");
	}
	
	async APIstore(req, res) {
		const { name, email, password } = req.body;
	
		try {
		  const user = await User.create({ name, email, password });
		  return res.status(201).send('Usuário criado com sucesso!');
		} catch (err) {
		  return res.status(500).send('Não foi possível criar o usuário');
		}
	  }
}

module.exports = new UserController();
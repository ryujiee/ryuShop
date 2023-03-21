const passport = require('../config/passport');
const User = require('../models/User');

class AuthController {
	async loginForm(req, res) {
		const info = req.flash('error');
		res.render('login', {
			info
		});
	}

	async login(req, res, next) {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				info.message = 'E-mail ou senha inválidos';
				return res.render('login', {
					info
				});
			}
			req.logIn(user, (err) => {
				if (err) {
					return next(err);
				}
				return res.redirect('/home');
			});
		})(req, res, next);
	};



	async logout(req, res) {
		req.logout((err) => {
			if (err) {
				return next(err);
			}
			res.redirect('/login');
		});
	}

	async wannaLogout(req, res) {
		res.render('logout');
	}
}

module.exports = new AuthController();
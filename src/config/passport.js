const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	async (email, password, done) => {

		try {
			const user = await User.findOne({
				email
			});
			if (!user) {
				return done(null, false, {
					message: 'Usuário ou senha inválidos'
				});
			}
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return done(null, false, {
					message: 'Usuário ou senha inválidos'
				});
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});

module.exports = passport;
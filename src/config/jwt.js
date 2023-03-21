const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/User');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: '%f7qbk)MET*t0z=LGV_vGQJ!$w/SX(NV(.xujTqp=6^hpQlz)$RUT*U9e$g;V'
};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
  UserModel.findById(payload.id, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

function generateToken(user) {
  const payload = { id: user._id };
  const options = { expiresIn: '1d' };
  const token = jwt.sign(payload, jwtOptions.secretOrKey, options);
  return token;
}

module.exports = {
  jwtOptions,
  generateToken
};

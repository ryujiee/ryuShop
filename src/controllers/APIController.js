const jwt = require('jsonwebtoken');
const tokenList = [];


class APIController {
	async index(req, res) {
		res.render('api/index',  { tokens: tokenList });
	}

    async gerarToken(req,res) {
        const token = jwt.sign({ userId: req.user.id }, '%f7qbk)MET*t0z=LGV_vGQJ!$w/SX(NV(.xujTqp=6^hpQlz)$RUT*U9e$g;V', { expiresIn: '1h' });
        tokenList.push(token);
        res.redirect('/api');
    }

    async listarTokens(req, res) {
        res.json({ tokens: tokenList });
    }
}

module.exports = new APIController();
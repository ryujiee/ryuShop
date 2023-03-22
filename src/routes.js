// CONSTANTES

const express = require("express");
const app = express();
const routes = express.Router();
const authMiddleware = require('./middlewares/auth');
const tokenMiddleware = require('./middlewares/token');
const passport = require("./config/passport");

// CONFIGURAÇÃO FLASH

const flash = require('connect-flash');
app.use(flash());

// CONFIGURAÇÃO DOS COOKIES

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// CONTROLLERS
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");
const CartController = require("./controllers/CartController");
const SaleController = require("./controllers/SaleController");
const ExitController = require("./controllers/ExitController");
const EntranceController = require("./controllers/EntranceController");
const EntranceAndExitController = require("./controllers/EntranceAndExitController");
const AuthController = require("./controllers/authController");
const APIController = require('./controllers/APIController');

// adiciona o middleware de passport.session() aqui
routes.use(passport.initialize());
routes.use(passport.session());

// ROTAS PADRÃO

routes.get("/", authMiddleware, (req, res) => {
	res.redirect("/home");
});

routes.get("/home", authMiddleware, (req, res) => {
	return res.render('home/index')
})

// ROTAS DE LOGIN E LOGOUT

routes.get('/login', AuthController.loginForm);
routes.post('/login', AuthController.login);
routes.get('/logout', authMiddleware, AuthController.wannaLogout);
routes.post('/logout', authMiddleware, AuthController.logout);

// ROTAS DOS USUÁRIOS

routes.get("/userslist", authMiddleware, UserController.index);
routes.get("/users", authMiddleware, UserController.create);
routes.post("/users", authMiddleware, UserController.store);
routes.get("/users/edit/:id", authMiddleware, UserController.edit);
routes.put("/users/edit/:id", authMiddleware, UserController.update);
routes.delete("/users/delete/:id", authMiddleware, UserController.destroy);

// ROTAS DE PRODUTOS

routes.get("/productslist", authMiddleware, ProductController.index);
routes.post("/productslist", authMiddleware, ProductController.index);
routes.get("/products", authMiddleware, ProductController.create);
routes.post("/products", authMiddleware, ProductController.store);
routes.get("/products/edit/:id", authMiddleware, ProductController.edit);
routes.put("/products/edit/:id", authMiddleware, ProductController.update);
routes.delete("/products/delete/:id", authMiddleware, ProductController.destroy);
routes.post('/products/createTemplate', authMiddleware, ProductController.createProducts)

// ROTAS DOS CARRINHOS

routes.get("/cart", authMiddleware, CartController.index);
routes.post("/cart", authMiddleware, CartController.index);
routes.get("/cart/list", authMiddleware, CartController.indexList);
routes.post("/cart/list", authMiddleware, CartController.indexList);
routes.post("/cart/add-one/:id", authMiddleware, CartController.addOne);
routes.post("/cart/remove-one/:id", authMiddleware, CartController.removeOne);
routes.post("/cart/delete/:id", authMiddleware, CartController.delete);

// ROTAS DAS VENDAS

routes.post("/sales", authMiddleware, SaleController.store);
routes.get("/sales", authMiddleware, SaleController.index);
routes.post("/salesdates", authMiddleware, SaleController.index);
routes.delete("/sales/delete/:id", authMiddleware, SaleController.destroy);
routes.delete("/sales/deleteall", authMiddleware, SaleController.destroyAll);

// ROTAS DAS SAÍDAS DE CAPITAL

routes.get("/exits", authMiddleware, ExitController.index);
routes.post("/exitsdates", authMiddleware, ExitController.index);
routes.post('/createExit', ExitController.createExit);
routes.get("/exits", authMiddleware, ExitController.index);
routes.post("/exits", authMiddleware, ExitController.store);
routes.get("/exits/edit/:id", authMiddleware, ExitController.edit);
routes.put("/exits/edit/:id", authMiddleware, ExitController.update);
routes.delete("/exits/delete/:id", authMiddleware, ExitController.destroy);

// ROTAS DAS ENTRADAS DE CAPITAL

routes.get("/entrances", authMiddleware, EntranceController.index);
routes.post("/entrancesdate", authMiddleware, EntranceController.index);

// ROTAS DOS RELATÓRIOS

routes.get("/entrancesandexitsdatails", authMiddleware, EntranceAndExitController.index);
routes.post("/entrancesandexitsdatailsdates", authMiddleware, EntranceAndExitController.index);
routes.get("/entrancesandexits", authMiddleware, (req, res) => {
	return res.render("entranceandexit/list");
});

// ROTAS API

routes.get("/api", authMiddleware, APIController.index);
routes.post("/api/gerarToken", authMiddleware, APIController.gerarToken);
routes.post("/api/createUser", tokenMiddleware, UserController.APIstore);
routes.get("/api/listTokens", tokenMiddleware, APIController.listarTokens);
routes.post('/api/products/createTemplate', tokenMiddleware, ProductController.createProducts)
routes.get('/api/products/list', tokenMiddleware, ProductController.APIlist)
routes.post('/api/products/add', tokenMiddleware, ProductController.APIstore)



module.exports = routes;
const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");

function init_routes(app) {
    app.get("/", homeController().index)
    app.get('/cart', cartController().index);
    app.get('/register', authController().register);
    app.get('/login', authController().login);
}

module.exports = init_routes;
const guest = require("../app/http/middlewares/guest");
const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");

function init_routes(app) {
    app.get("/", homeController().index)

    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);

    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);

    app.post('/logout', authController().logout);

}

module.exports = init_routes;
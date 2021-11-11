const Menu = require('../../models/menu');

function homeController() {
    return {
        async index(req, res) {

            const pizzas = await Menu.find({});
            return res.render('home', { pizzas });

            /*
            Menu.find({}, function (err, pizzas) {
                console.log(pizzas);
                return res.render('home', { pizzas });
            });
            */
        },
    };
}

module.exports = homeController;
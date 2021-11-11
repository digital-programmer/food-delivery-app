function cartController() {
    return {
        index: function (req, res) {
            return res.render("./customers/cart");
        }
    };
}


module.exports = cartController;
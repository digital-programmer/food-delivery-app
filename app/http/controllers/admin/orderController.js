const Order = require('../../../models/order');

function orderController() {
    return {
        index(req, res) {
            Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } })
                .populate('customerId', '-password')
                .exec((err, orders) => {
                    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
                        return res.json(orders);
                    } else {
                        return res.render('admin/orders');
                    }
                })
        },
    }
}

module.exports = orderController;
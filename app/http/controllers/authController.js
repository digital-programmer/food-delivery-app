const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController() {
    return {
        login(req, res) {
            return res.render("./auth/login");
        },
        register(req, res) {
            return res.render("./auth/register");
        },

        async postRegister(req, res) {

            const { name, email, password } = req.body;

            // Validate request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            // check if email exists
            User.exists({ email: email }, (err, result) => {
                if (result || err) {
                    req.flash('error', 'Email Already exists');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }
            });

            // Hash Password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = new User({
                name,
                email,
                password: hashedPassword
            });

            user.save().then((user) => {
                // Login
                return res.redirect('/');
            }).catch(err => {
                req.flash('error', 'Something went wrong! Try again..');
                return res.redirect('/register');
            });

        },

        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }

                if (!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }

                req.login(user, (err, user) => {
                    if (err) {
                        req.flash('error', info.message);
                        return next(err);
                    }

                    return res.redirect('/');
                });

            })(req, res, next);
        },

        logout(req, res) {
            req.logout();
            return res.redirect('/');
        }
    };
}

module.exports = authController;
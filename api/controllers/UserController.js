/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

if (!process.env.USERNAME || !process.env.PASSWORD) throw 'USERNAME and/or PASSWORD not defined';

var username = process.env.USERNAME;
var password = process.env.PASSWORD;

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {},


  signin : function(req, res, next) {
    if (!req.param('username') || !req.param('password')) {

      req.flash('error', 'Username and/or password missing');

      return res.redirect('/');
    }

    if (req.param('username') !== username || req.param('password') !== password) {
      req.flash('error', 'Invalid username and/or password');
      return res.redirect('/');
    }

    req.session.authenticated = true;

    res.redirect('/');
  }
};

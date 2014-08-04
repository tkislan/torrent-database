/**
 * TorrentController
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
   * (specific to TorrentController)
   */
  _config: {},

  add: function(req, res, next) {
    if (!req.param('magnet')) {
      req.flash('error', 'Magnet link param missing');
      return res.redirect('/');
    }

    if (!req.session.authenticated) {
      req.flash('error', 'Unauthorized');
      return res.redirect('/');
    }

    sails.db.run('INSERT INTO torrents (magnet, time_added) VALUES (?1, CURRENT_TIMESTAMP)', req.param('magnet'), function(err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }

      req.flash('ok', 'Torrent added');
      res.redirect('/');
    });
  },

  get: function(req, res, next) {
    Torrents.get(function(err, torrents) {
      if (err) return res.badRequest(err);

      res.send(torrents);
    });
  },

  remove: function(req, res, next) {
    if (!req.param('username') || !req.param('password')) {
      return res.badRequest('Username and/or password missing');
    }

    if (req.param('username') !== username || req.param('password') !== password) {
      return res.badRequest('Invalid username and/or password');
    }

    if (!req.param('id')) {
      return res.badRequest('Id missing');
    }

    sails.db.run('DELETE FROM torrents WHERE ROWID = ?1', req.param('id'), function(err) {
      if (err) return res.serverError(err);

      res.send('OK');
    });
  }
};

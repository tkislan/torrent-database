/**
 * IndexController
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

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to IndexController)
   */
  _config: {},


  index: function(req, res, next) {
    // sails.db.all('SELECT ROWID, magnet, time_added FROM torrents ORDER BY time_added DESC', function(err, torrents) {
    Torrents.get(function(err, torrents) {
      if (err) {
        req.flash('error', err);
        return res.view('home/index');
      }

      sails.log(torrents);

      res.view('home/index', {
        torrents: torrents
      });
    });
  }

  
};

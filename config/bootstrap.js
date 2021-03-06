/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

var sqlite = require('sqlite3');

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  // cb();

  sails.db = new sqlite.Database('torrent.db', function(err) {
    if (err) {
      sails.log.error(err);
      return cb(err);
    }

    sails.db.run('CREATE TABLE IF NOT EXISTS torrents (magnet TEXT, time_added TIMESTAMP);', function(err) {
      if (err) {
        sails.log.error(err);
        return cb(err);
      }

      cb();
    });
  }); 
};
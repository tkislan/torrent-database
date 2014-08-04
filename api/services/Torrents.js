exports.get = function(cb) {
  sails.db.all('SELECT ROWID, magnet, time_added FROM torrents ORDER BY time_added DESC', function(err, torrents) {
    cb(err, torrents);
  });
}

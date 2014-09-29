var magneturi = require('magnet-uri');

exports.get = function(cb) {
  sails.db.all('SELECT ROWID, magnet, time_added FROM torrents ORDER BY time_added DESC', function(err, torrents) {
    if (err) return cb(err);

    torrents.forEach(function(torrent) {
      torrent['name'] = magneturi(torrent.magnet).name;
    });

    cb(null, torrents);
  });
}

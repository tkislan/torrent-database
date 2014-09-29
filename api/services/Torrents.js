var magneturi = require('magnet-uri');

exports.get = function(cb) {
  sails.db.all('SELECT ROWID, magnet, time_added FROM torrents ORDER BY time_added DESC', function(err, torrents) {
    if (err) return cb(err);

    for (var i = 0; i < torrents.length; i++) {
      torrents[i]['name'] = magneturi(torrents[i].magnet).name;
    }

    cb(null, torrents);
  });
}

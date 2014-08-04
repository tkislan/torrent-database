import httplib, urllib, json, os
from subprocess import call

conn = httplib.HTTPConnection("torrent-database.herokuapp.com")

conn.request("GET", "/torrents")

res = conn.getresponse()

torrents = json.loads(res.read())

# print(torrents)

for torrent in torrents:
  print(torrent['rowid'])
  print(torrent['magnet'])

  command = [ 'transmission-remote', '-a', torrent['magnet'] ]

  print(command)

  call(command)

  params = urllib.urlencode({
    'username': os.environ.get('USERNAME'),
    'password': os.environ.get('PASSWORD'),
    'id': torrent['rowid']
  });
  headers = {"Content-type": "application/x-www-form-urlencoded" }
  conn.request("POST", "/removetorrent", params, headers)
  res = conn.getresponse()
  print(res.status, res.reason)
  print(res.read())


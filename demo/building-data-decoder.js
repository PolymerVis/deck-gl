importScripts('./util.js');
var FLUSH_LIMIT = 20000;
var result = [];
var count = 0;
var triangleCount = 0;

makeRequest('./data/building-data.txt', decode);

function decode(text) {
  var lines = text.split('\n');

  lines.forEach(function(line) {
    if (!line) return;
    var parts = line.split('\x01');

    var feature = {
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: parts.slice(1).map(function(str) {
          var coords = decodePolyline(str);
          triangleCount += coords.length * 3 - 2;
          coords.push(coords[0]);
          return [coords];
        })
      },
      properties: {
        height: decodeNumber(parts[0], 90, 32)
      }
    };

    result.push(feature);
    count++;

    if (result.length >= FLUSH_LIMIT) {
      flush();
    }
  });

  flush();
};

function flush() {
  postMessage({
    action: 'add',
    data: [{
      type: 'FeatureCollection',
      features: result
    }],
    meta: {buildings: count, triangles: triangleCount}
  });
  result = [];
}

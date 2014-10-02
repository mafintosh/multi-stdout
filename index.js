var through = require('through2')
var cyclist = require('cyclist')
var os = require('os')

var split = function(buf) {
  var result = []
  while (true) {
    var nl = Array.prototype.indexOf.call(buf, 10)
    if (nl === -1) break
    result.push(buf.slice(0, nl+1))
    buf = buf.slice(nl+1)
  }
  result.push(buf)
  return result
}

var buffer = cyclist(512)
var top = 0

var line = function(data) {
  var idx = top++

  buffer.put(idx, top)

  var output = function(data) {
    write.buffer = data
    process.stdout.write(data)
    if (data[data.length-1] !== 10) process.stdout.write(os.EOL)
  }

  var write = function(data) {
    var offset = buffer.get(top-1) - buffer.get(idx) + 1
    process.stdout.moveCursor(-process.columns, -offset)
    output(data)
    process.stdout.moveCursor(-process.columns, offset-1)
  }

  output(data || new Buffer(0))

  return write
}

module.exports = function() {
  var ln

  var write = function(data) {
    if (!ln) ln = line()
    if (ln.buffer) data = Buffer.concat([ln.buffer, data])
    ln(data)
  }

  return through(function(data, enc, cb) {
    var lines = split(data)

    for (var i = 0; i < lines.length; i++) {
      write(lines[i])
      if (i < lines.length-1) ln = null
    }

    cb()
  })
}
var mstdout = require('./')

var loop = function(ch, wait) {
  var inc = 0
  var stream = mstdout()

  setInterval(function() {
    stream.write(ch)
    if (++inc % 80 === 0) stream.write('\n')
  }, wait)
}

loop('a', 500)
loop('b', 1000)
loop('c', 1500)
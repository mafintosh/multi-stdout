# multi-stdout

Pipe out multiple streams to stdout in parallel without messing up the output

```
npm install multi-stdout
```

## Usage

``` js
var mstdout = require('multi-stdout')

var a = mstdout()
var b = mstdout()
var c = mstdout()

setInterval(function() {
  a.write('a')
}, 500)

setInterval(function() {
  b.write('b')
}, 1000)

setInterval(function() {
  c.write('c')
}, 1500)
```

Running the above program for 10s will produce the following output

```
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
bbbbbbbbbbbbbbb
cccccccccc
```

## License

MIT

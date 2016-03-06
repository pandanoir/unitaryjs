# UnitaryJS

[![Build Status](https://travis-ci.org/pandanoir/unitaryjs.svg?branch=master)](https://travis-ci.org/pandanoir/unitaryjs)

![logo.png](logo.png)

UnitaryJS is a library for handling canvas with objects.

Demo: [Demo](http://pandanoir.web.fc2.com/UnitaryJS/sample.html)

## Wiki
[wiki](http://pandanoir.github.io/unitaryjs)


## Quick Example

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>Sample</title>
    <script src="./unitary.js"></script>
    <script src="./canvas.js"></script>
    <script>
    window.addEventListener('load', function(){
      for (var key in Unitary) {
        window[key] = Unitary[key];
      }
      var A = new Point(30,30),
          B = new Point(90,90),
          C = new Point(90,40),
          ABC = new Triangle(A, B, C),
          circumcircleABC = ABC.getCircumcircle(),
          incircleABC = ABC.getIncircle(),
          canvas = new Canvas('canvas');

      canvas.add(ABC);
      canvas.add(circumcircleABC);
      canvas.add(incircleABC);
      canvas.draw();
    });
    </script>
  </head>
  <body>
    <canvas id="canvas" width="200" height="200"></canvas>
  </body>
</html>
```

## Getting started

```
npm install unitaryjs
```

and require unitaryjs.

```js
var Unitary = require('unitaryjs');
Unitary.Vector(1, 1);
```

## Browser

download [./dist/unitary.browser.js](./dist/unitary.browser.js) and load it.


```html
<script src="unitary.browser.js"></script>
```

## Classes

* Circle
* Graph
* Group
* Image
* Line
* Point
* Polygon
* Quadrilateral
* Rect
* Segment
* Text
* Triangle
* Vector

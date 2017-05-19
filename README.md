# UnitaryJS

[![Build Status](https://travis-ci.org/pandanoir/unitaryjs.svg?branch=master)](https://travis-ci.org/pandanoir/unitaryjs)

![logo.png](logo.png)

UnitaryJS is a library for handling canvas with objects.

Demo: [Demo](http://pandanoir.net/unitaryjs/sample.html)

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
    const {Point, Triangle} = Unitary;
    const A = new Point(30,30),
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
const Unitary = require('unitaryjs');
new Unitary.Vector(1, 1);
```

## Browser
download [./dist/unitary.js](./dist/unitary.js) and load it.


```html
<script src="unitary.js"></script>
```

## Classes

* BezierCurve
* Circle
* CircularSector
* Doughnut
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

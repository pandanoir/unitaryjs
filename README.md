# UnitaryJS

[![Build Status](https://travis-ci.org/pandanoir/unitaryjs.svg?branch=master)](https://travis-ci.org/pandanoir/unitaryjs)

![logo.png](logo.png)

UnitaryJS is a library for handling canvas with objects.

Demo: [Demo](http://pandanoir.web.fc2.com/UnitaryJS/sample.html)


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

### Point
Point has two constructors.

```js
var A1 = new Point(0, 0);
var A2 = new Point.fromVector(new Vector(0, 0));
```

A1 and A2 are same Point.

### Vector
Vector aren't drawn on canvas. Vector has two constructors.

* `.add(n)` vector addition.
* `.minus(n)` vector subtraction.
* `.multiple(k)` multiple vector.
* `.product(v)` inner product of this with v.
* `.abs()` vector absolute value.


```js
var vectorA = new Vector(10, 10);
var vectorOA = new Vector.from(new Point(10, 10), new Point(0, 0));
```

vectorA and vectorOA are same vector.

### Line
This Line isn't segment.

```js
var A = new Point(10,20);
var B = new Point(30,40);
var AB = new Line(A, B);
```

### Segment
This Segment isn't Line.

  * .has(P) return whether P is on this segment or not.

```js
var A = new Point(10,20);
var B = new Point(30,40);
var segmentAB = new Segment(A, B);
```

### Circle

```js
var O = new Point(30,30);
var C = new Circle(O, 30);
```

### Polygon
Polygon accepts more than two arguments. These arguments are vertices of the polygon.

```js
var ABCDE = new Polygon(
    new Point(Math.cos(2 * Math.PI * (1/5) + Math.PI / 2) * 30 + 30, Math.sin(2 * Math.PI * (1/5) + Math.PI / 2) * 30 + 30),
    new Point(Math.cos(2 * Math.PI * (2/5) + Math.PI / 2) * 30 + 30, Math.sin(2 * Math.PI * (2/5) + Math.PI / 2) * 30 + 30),
    new Point(Math.cos(2 * Math.PI * (3/5) + Math.PI / 2) * 30 + 30, Math.sin(2 * Math.PI * (3/5) + Math.PI / 2) * 30 + 30),
    new Point(Math.cos(2 * Math.PI * (4/5) + Math.PI / 2) * 30 + 30, Math.sin(2 * Math.PI * (4/5) + Math.PI / 2) * 30 + 30),
    new Point(Math.cos(2 * Math.PI * (5/5) + Math.PI / 2) * 30 + 30, Math.sin(2 * Math.PI * (5/5) + Math.PI / 2) * 30 + 30)
)
```

### Quadrilateral
This constructor accepts four arguments. The argumetns are vertices of the quadrilateral.

```js
var ABCD = new Quadrilateral(
    new Point(30,30),
    new Point(90,90),
    new Point(90,40),
    new Point(60,20)
);
```

### Triangle
This constructor accpects three arguments. The arguments are vertices of the triangle.

```js
var ABCD = new Quadrilateral(
    new Point(30,30),
    new Point(90,90),
    new Point(90,40)
);
```

* `.getCircumcircle()` return its circumcircle.
* `.getIncircle()` return its incircle.
* `.getArea()` return area.

### Rect
This constructor accepts two arguments. First argument is upper-left corner of this rect. The other is bottom-right corner of this rect.

```js
var ABCD = new Quadrilateral(
    new Point(30,30),
    new Point(90,90)
);
```

### Text

* `.strokeOutline()` Outline of the text aren't drawn if you don't call this method.
* `.setOutlineColor(color)` set outline color.
* `.setFillColor(color)` set fill color.
* `.setBaseline()` set baseline.

```js
var circleC = new Circle(new Point(30, 30), 30),
var text = new Text('O', circleC.Origin));
```

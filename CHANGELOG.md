# 0.1.0

## Features

* call .setStyle() to retain its styles.
* support lineDash, lineCap, lineDashOffset, lineJoin and lineWidth.
* add .push() to Group.
* add .clone() to Image, Circle, CircularSector and Ellipse.
* some methods return itself if there is no changes.
* Canvas.fn.add() now accepts some objects.
* add Ellipse class.
* add Curve class.
* Canvas will create canvas element if there is no elements that has the given id.
* Canvas listens basic events.
  Now you don't need to write the code such as `canvas.listen('click')`.

## Breaking Changes

* rename .substract to .subtract()

## Bug Fixes

* fix not drawing the part of line that isn't in first quadrant
* fix  the algorithm of .rotate() of Point.

# 0.0.8

## Features

* add .has() to Line.
* add setAnticlockwise() to Circle and CircularSector.
* add Doughnut class.
* add r and theta property to Vector.

## Bug Fixes

* Segment.fn.has() and Segment.fn.intersects() returned wrong value.

## Breaking Changes

* change default step of BezierCurve.
* change property, fillColor and strokeColor to fillStyle and strokeStyle.
* Canvas.draw() will fill objects before stroking them.

# 0.0.7
From this version, dist/unitary.browser.js is an alias of dist/unitary.js. You should load dist/unitary.js in browser.

## Features

* creating Canvas instance, you doesn't need to wait window's load event.
* add .move() method to Group.
* add BezierCurve class.
* add Line.fromVector() function
* add toVector() method to Point.
* add toPoint() method to Vector.
* add getNormalVector() method to Line.
* add normalize() method to BaseVector.
* add isParalelTo() method to Line.
* add isPerpendcularTo() method to Line.
* change the line painting algorithm to more efficient one.

## Bug Fixes

* intersects() method of Segment sometimes has returned a wrong value.

## Breaking Changes

* simplify properties a, b and c of Line class. This change may cause changing a, b and c of your existing Line instance.

# 0.0.6
UnitaryJS now controls events! You can handle objects, such as triangle, circle or rect, as DOM Elements! Your game's parts are no longer &lt;div&gt; or &lt;span&gt;! It's objects drawn in canvas!

## Features

* add CircularSector class.
* add center property to Circle and CircularSector.
* add .has() method to Circle, CircularSector, Group and UnitaryObject. UnitaryObject.fn.has() always returns false.
* load an image once and cache it. If you create Image objects that has same source, Image will use a cache.
* add Canvas.preload(). If you don't use Canvas.preload() and load image, Image instance isn't load until Canvas.fn.draw() is called.
* Group constructor now accepts the array of UnitaryObject.
* UnitaryObject can listen events. If you click the triangle, it feels it was clicked!

## Breaking Changes

* Image.fn.trim() and Image.fn.resize() return new Image object that contain changes. These methods changed itself instead of returning new object before.

# 0.0.5
0.0.5 includes many bugfixes.

## Features

* add VERSION property to Unitary.
* rename .minus() .substract().
* canvas.draw() returns Promise. So you can write `canvas.draw().then(function() {canvas.toDataURL();})`.

## Bug Fixes

* throw context.drawImage() Image object.(f6835ee6dd047e2559b9fddd1fba58192d70f2a9)
* replace obj.maxWidth with obj.style.maxWidth. (6369d8d6c8dd16ff5e9b22de8f842f1a7a4e96b9)
* fill Rect in normal mode.(6443d950440b5abb3aa63d016eff0e5340f1ff3b)
* properly draw Rect in normal mode.(7b4baa6a73977537d7e4bca32e5ba63db7a9a06b)

# 0.0.4
interpret all scripts into TypeScript.

## Features

* add Vector3D class.
* add BaseVector. this class is a parent of Vector and Vector3D.
* add removeAllObjects() to Canvas. removeAllObjects() removes all objects which were added by Canvas.prototype.add() method.
* add clear() to Canvas. this method clears &lt;canvas&gt;.
* canvas.prototype.draw() behaves more naturally when it was thrown NaN.
* add style property. properties, such as font, fillColor, align, are put into style property.
* add getEquation() method to Line class.
* add getEquation() method to Circle class.
* add Group class.
* add getCenter() to Triangle class.
* add rotate() to Polygon.

## Bug Fixes

* Polygon.fn.move() doesn't work,

# 0.0.3

## Features

* add x axis and y axis.
* overload Vector constructor. Vector can accept Vector as argument.
* add .has() to Polygon. this method judge whether the point given as argument is in the polygon or not.
* change scale property of Graph.

# 0.0.2

this version has no change because I edited only .npmignore.

# 0.0.1

## Features

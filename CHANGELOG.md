#0.0.4

interpret all scripts into TypeScript.

##Features

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

##Bug Fixes

* Polygon.fn.move() doesn't work,

#0.0.3

##Features

* add x axis and y axis.
* overload Vector constructor. Vector can accept Vector as argument.
* add .has() to Polygon. this method judge whether the point given as argument is in the polygon or not.
* change scale property of Graph.

#0.0.2

this version has no change because I edited only .npmignore.

#0.0.1

##Features

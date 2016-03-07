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

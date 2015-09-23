"use strict"
distance = (A, B) -># {{{
  if (A instanceof Point and B instanceof Point)
    return Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y))
  if (A instanceof Point and B instanceof Line)
    res = B.a * A.x + B.b * A.y + B.c
    res *= -1 if res < 0
    res /= Math.sqrt(B.a * B.a + B.b * B.b)
    return res
  if (A instanceof Line and B instanceof Point)
    return distance(B, A)# }}}
equals = (A, B) -># {{{
  if (A.name() != B.name())
    return false
  if (A.name() == 'Point')
    return A.x == B.x && A.y == B.y
  if (A.name() == 'Line')
    return A.a == B.a && A.b == B.b && A.c == B.c# }}}

class Point# {{{
  constructor: (x, y) ->
    if (not (@ instanceof Point))
      throw new Error('Constructor cannot be called as a function.')
    @.x = x
    @.y = y

  @fromVector: ((c) ->
    c.prototype = Point.prototype
    return c
  )((A) ->
    @.x = A.x
    @.y = A.y
  )
  moveTo: (x, y) ->
    return new Point(x, y)
  move: (dx, dy) ->
    return new Point(@.x + dx, @.y + dy)
  moveX: (dx) ->
    return new Point(@.x + dx, @.y)
  moveY: (dy) ->
    return new Point(@.x, @.y + dy)
  toString: () ->
    return '(' + @.x + ', ' + @.y + ')'
  inspect: () ->
    return '(' + @.x + ', ' + @.y + ')'
  name: () -> 'Point'
# }}}
class Vector# {{{
  constructor: (x, y) ->
    @.x = x
    @.y = y
  @from: ((c) ->
    c.prototype = Vector.prototype
    return c
  )((A, B) ->
    @.x = B.x - A.x
    @.y = B.y - A.y
  )
  add: (CD) ->
    return new Vector(@.x + CD.x, @.y + CD.y)
  minus: (CD) ->
    return new Vector(@.x - CD.x, @.y - CD.y)
  product: (CD) ->
    return @.x * CD.x + @.y * CD.y
  multiple: (k) ->
    return new Vector(@.x * k, @.y * k)
  abs: () ->
    return Math.sqrt(@.x ** 2 + @.y ** 2)
# }}}
class Line# {{{
  constructor: (A, B) ->
    if (not (@ instanceof Line))
      throw new Error('Constructor cannot be called as a function.')
    gcd = (m, n) ->
      if m < n
        return gcd(n, m)
      if m < 0
        return gcd(-m, n)
      if n < 0
        return gcd(m, -n)
      if n is 0
        return m
      return gcd(n, m % n)
    @.points = [A, B]
    @.a = B.y - A.y
    @.b = A.x - B.x
    @.c = A.x * (A.y - B.y) - A.y * (A.x - B.x)
    g = gcd(gcd(@.a, @.b), @.c)
    @.a /= g
    @.b /= g
    @.c /= g
  move: (dx, dy) ->
    return new Line(@.points[0].move(x + dx, y + dy), @.points[1].move(x + dx, y + dy))
  moveX: (dx) ->
    return new Line(@.points[0].move(x + dx, y), @.points[1].move(x + dx, y))
  moveY: (dy) ->
    return new Line(@.points[0].move(x, y + dy), @.points[1].move(x, y + dy))
  toString: () ->
  inspect: () ->
    res = ''
    if (@.a > 0 and @.a isnt 1) then res += '+' + @.a + 'x'
    if (@.a is 1) then res += '+x'
    if (@.a < 0 and @.a isnt -1) then res += '-' + -@.a + 'x'
    if (@.a is -1) then res += '-x'

    if (@.b > 0 and @.b isnt 1) then res += '+' + @.b + 'y'
    if (@.b is 1) then res += '+y'
    if (@.b < 0 and @.b isnt -1) then res += '-' + -@.b + 'y'
    if (@.b is -1) then res += '-y'

    if (@.c > 0) then res += '+' + @.c
    if (@.c < 0) then res += '-' + -@.c

    if res.charAt(0) is '+' then res = res.slice(1)

    return res + '=0'
  name: () -> 'Line'
# }}}
class Segment# {{{
  constructor: (A, B) ->
    if (not (@ instanceof Segment))
      throw new Error('Constructor cannot be called as a function.')
    if A.x > B.x
      @.points = [B, A]
    else
      @.points = [A, B]
    @.length = Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)
  move: (dx, dy) ->
    return new Segment(@.points[0].move(x + dx, y + dy), @.points[1].move(x + dx, y + dy))
  moveX: (dx) ->
    return new Segment(@.points[0].move(x + dx, y), @.points[1].move(x + dx, y))
  moveY: (dy) ->
    return new Segment(@.points[0].move(x, y + dy), @.points[1].move(x, y + dy))
  has: (P) ->
    A = @.points[0]
    B = @.points[1]
    if A.x <= P.x <= B.x
      if A.y <= B.y and A.y <= P.y <= B.y or A.y >= B.y and A.y >= P.y >= B.y
        if (A.y - B.y) / (A.x - B.x) * P.x is P.y
          return true
    return false
  name: () -> 'Segment'
# }}}
class Circle# {{{
  constructor: (O, radius) ->
    if (not (@ instanceof Circle))
      throw new Error('Constructor cannot be called as a function.')
    @.Origin = O
    @.r = radius
  moveTo: (x, y) ->
    return new Circle(@.Origin.moveTo(x, y), @.r)
  move: (dx, dy) ->
    return new Circle(@.Origin.move(dx, dy), @.r)
  moveX: (dx) ->
    return new Circle(@.Origin.moveX(dx), @.r)
  moveY: (dy) ->
    return new Circle(@.Origin.moveY(dy), @.r)
  name: () -> 'Circle'
# }}}
class Polygon# {{{
  constructor: (points...) ->
    if (not (@ instanceof Polygon))
      throw new Error('Constructor cannot be called as a function.')
    @.points = points
  name: () -> 'Polygon'
# }}}
class Quadrilateral extends Polygon# {{{
  constructor: (A, B, C, D) ->
    if (not (@ instanceof Quadrilateral))
      throw new Error('Constructor cannot be called as a function.')
    super(A, B, C, D)
  name: () -> 'Quadrilateral'
# }}}
class Triangle extends Polygon# {{{
  constructor: (A, B, C) ->
    if (not (@ instanceof Triangle))
      throw new Error('Constructor cannot be called as a function.')
    if (not A? || not B? || not C?)
      throw new Error('Triangle must have three vertices.')
    if (equals(A, B) || equals(B, C) || equals(A, C))
      throw new Error('Triangle must have three vertices.')
    super(A, B, C)
  getCircumcircle: () ->
    A = @.points[0]
    B = @.points[1]
    C = @.points[2]
    AB = new Segment(A, B)
    BC = new Segment(B, C)
    CA = new Segment(C, A)
    S = @.getArea()
    vA = new Vector(A.x, A.y)
    vB = new Vector(B.x, B.y)
    vC = new Vector(C.x, C.y)
    a = BC.length ** 2
    b = CA.length ** 2
    c = AB.length ** 2
    vO = new Vector(0,0)
      .add(vA.multiple(a * (b + c - a)))
      .add(vB.multiple(b * (c + a - b)))
      .add(vC.multiple(c * (a + b - c)))
      .multiple(1 / (16 * (S ** 2)))
    O = new Point.fromVector(vO)
    cosA = vB.minus(vA).product(vC.minus(vA)) / (AB.length * CA.length)
    sinA = Math.sqrt(1 - cosA ** 2)
    R = BC.length / sinA / 2
    return new Circle(O, R)
  getIncircle: () ->
    vA = new Vector(@.points[0].x, @.points[0].y)
    vB = new Vector(@.points[1].x, @.points[1].y)
    vC = new Vector(@.points[2].x, @.points[2].y)
    a = vC.minus(vB).abs()
    b = vC.minus(vA).abs()
    c = vB.minus(vA).abs()
    vO = new Vector(0, 0)
      .add(vA.multiple(a / (a + b + c)))
      .add(vB.multiple(b / (a + b + c)))
      .add(vC.multiple(c / (a + b + c)))
    O = new Point.fromVector(vO)
    r = 2 * @.getArea() / (a + b + c)
    return new Circle(O, r)
  getArea: () ->
    A = @.points[0]
    B = @.points[1]
    C = @.points[2]
    AB = new Segment(A, B)
    AC = new Segment(A, C)
    vAB = new Vector.from(A, B)
    vAC = new Vector.from(A, C)
    cosA = vAB.product(vAC) / (AB.length * AC.length)
    sinA = Math.sqrt(1 - cosA ** 2)
    S = AB.length * AC.length * sinA / 2
    return S
  name: () -> 'Triangle'
# }}}
class Rect extends Polygon# {{{
  constructor: (A, B) ->
    if (not (@ instanceof Rect))
      throw new Error('Constructor cannot be called as a function.')
    super(A, B)
  name: () -> 'Rect'
# }}}
class Text_# {{{
  # Text コンストラクタが既にブラウザに存在しているためText_とした
  constructor: (str, P, align = 'left', maxWidth = null) ->
    if (not (@ instanceof Text_))
      throw new Error('Constructor cannot be called as a function.')
    @.x = P.x
    @.y = P.y
    @.P = P
    @.string = str
    @.text = str
    @.align = align
    @.maxWidth = maxWidth
    @.strokesOutline = false
    @.fillColor = '#000'
    @.outlineColor = '#000'
    @.baseline = 'alphabetic'
    @.font = null
  strokeOutline: () ->
    @.strokesOutline = true
  setOutlineColor: (color) ->
    @.outlineColor = color
  setFillColor: (color) ->
    @.fillColor = color
  setBaseline: (base) ->
    @.baseline = base
  setFont: (font) ->
    @.font = font
  name: () -> 'Text'
# }}}
class Image_# {{{
  # Imageコンストラクタが既にブラウザに存在しているためImage_とした
  constructor: (src, startPoint) ->
    if (not (@ instanceof Image_))
      throw new Error('Constructor cannot be called as a function.')
    @.src = src
    @.dx = startPoint.x
    @.dy = startPoint.y
    @.dw = null
    @.dh = null
    @.sw = null
    @.sh = null
    @.sx = null
    @.sy = null
  trim: (startPoint, sw, sh, dw, dh) ->
    if (not dw?)
      dw = sw
    if (not dh?)
      dh = sh
    @.sx = startPoint.x
    @.sy = startPoint.y
    @.sw = sw
    @.sh = sh
    @.dw = dw
    @.dh = dh

  resize: (dw, dh) ->
    @.dw = dw
    @.dh = dh
  name: () -> 'Image'# }}}


WORLD = {
  ORIGIN: new Point(0, 0)
}
_global = (@ || 0).self || global
Module = {
  Point: Point
  Vector: Vector
  Line: Line
  Segment: Segment
  Circle: Circle
  Polygon: Polygon
  Quadrilateral: Quadrilateral
  Triangle: Triangle
  Rect: Rect
  Text: Text_
  Image: Image_
  distance: distance
  WORLD: WORLD
}
if ('process' of _global)
  module.exports = Module
_global['Unitary'] = Module

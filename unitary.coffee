"use strict"
gcd = (m, n) -># {{{
  if m < n
    return gcd(n, m)
  if m < 0
    return gcd(-m, n)
  if n < 0
    return gcd(m, -n)
  if n is 0
    return m
  return gcd(n, m % n)# }}}
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

class UnitaryObject# {{{
  constructor: () ->
    @.fillColor = null
    @.strokeColor = null
  equals: (B) ->
    return @.name() == B.name()
  setFillColor: (color) ->
    @.fillColor = color
    return @
  setStrokeColor: (color) ->
    @.strokeColor = color
    return @
  moveX: (dx) ->
    return @.move(dx, 0)
  moveY: (dy) ->
    return @.move(0, dy)
  name: () -> 'UnitaryObject'# }}}
class Point extends UnitaryObject# {{{
  constructor: (x, y) ->
    if (not (@ instanceof Point))
      throw new Error('Constructor cannot be called as a function.')
    @.x = x
    @.y = y

  moveTo: (x, y) ->
    return new Point(x, y).setStrokeColor(@.strokeColor).setFillColor(@.fillColor)
  move: (dx, dy) ->
    return new Point(@.x + dx, @.y + dy).setStrokeColor(@.strokeColor).setFillColor(@.fillColor)
  toString: () ->
    return '(' + @.x + ', ' + @.y + ')'
  inspect: () ->
    return '(' + @.x + ', ' + @.y + ')'
  equals: (B) ->
    if (!super(B))
      return false
    return @.x == B.x && @.y == B.y
  name: () -> 'Point'
# }}}
class Vector extends UnitaryObject# {{{
  constructor: (x, y) ->
    super()
    @.x = x
    @.y = y
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
  equals: (B) ->
    if (!super(B))
      return false
    return @.x == B.x && @.y == B.y
  move: (dx, dy) ->
    return new Vector(@.x + dx, @.y + dy)
  name: () -> 'Vector'
# }}}
class Line extends UnitaryObject# {{{
  constructor: (A, B) ->
    if (not (@ instanceof Line))
      throw new Error('Constructor cannot be called as a function.')
    if (A.equals(B))
      throw new Error('A equals B. So AB couldn\'t construct line.')
    super()
    @.points = [A, B]
    @.a = B.y - A.y
    @.b = A.x - B.x
    @.c = A.x * (A.y - B.y) - A.y * (A.x - B.x)
    g = gcd(gcd(@.a, @.b), @.c)
    @.a /= g
    @.b /= g
    @.c /= g
    if (@.a == 0)
      # @.b != 0
      @.c /= @.b
      @.b = 1
    if (@.b == 0)
      # @.a != 0
      @.c /= @.a
      @.a = 1
  move: (dx, dy) ->
    return new Line(@.points[0].move(dx, dy), @.points[1].move(dx, dy)).setStrokeColor(@.strokeColor).setFillColor(@.fillColor)
  toString: () ->
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
  getIntersection: (CD) ->
    if (@.a == CD.a && @.b == CD.b)
      return false
    y = (CD.a * @.c - @.a * CD.c) / (@.a * CD.b - CD.a * @.b)
    x = -1 * (@.b * y + @.c) / (@.a)
    return new Point(x, y)
  equals: (CD) ->
    if (!super(CD))
      return false
    return @.a == CD.a && @.b == CD.b && @.c == CD.c
  name: () -> 'Line'
# }}}
class Segment extends UnitaryObject# {{{
  constructor: (A, B) ->
    if (not (@ instanceof Segment))
      throw new Error('Constructor cannot be called as a function.')
    if A.x > B.x
      @.points = [B, A]
    else
      @.points = [A, B]
    super()
    @.length = Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)
  move: (dx, dy) ->
    return new Segment(@.points[0].move(dx, dy), @.points[1].move(dx, dy)).setStrokeColor(@.strokeColor).setFillColor(@.fillColor)
  has: (P) ->
    A = @.points[0]
    B = @.points[1]
    if A.x <= P.x <= B.x
      if A.y <= B.y and A.y <= P.y <= B.y or A.y >= B.y and A.y >= P.y >= B.y
        if (A.y - B.y) / (A.x - B.x) * P.x is P.y
          return true
    return false
  intersects: (CD) ->
    intersection = @.toLine().getIntersection(CD.toLine())
    if (intersection == false)
      return false
    if (@.points[0].x <= intersection.x <= @.points[1].x)
      return true
    return false
  toLine: () ->
    return new Line(@.points[0], @.points[1])
  equals: (CD) ->
    if (!super(CD))
      return false
    return @.points[0].equals(CD.points[0]) && @.points[1].equals(CD.points[1])
  name: () -> 'Segment'
# }}}
class Circle extends UnitaryObject# {{{
  constructor: (O, radius) ->
    if (not (@ instanceof Circle))
      throw new Error('Constructor cannot be called as a function.')
    super()
    @.Origin = O
    @.r = radius
  moveTo: (x, y) ->
    return new Circle(@.Origin.moveTo(x, y), @.r).setStrokeColor(@.strokeColor).setFillColor(@.fillColor)
  move: (dx, dy) ->
    return new Circle(@.Origin.move(dx, dy), @.r).setStrokeColor(@.strokeColor).setFillColor(@.fillColor)
  equals: (C) ->
    if (!super(C))
      return false
    return @.Origin.equals(C.Origin) && @.r == C.r
  name: () -> 'Circle'
# }}}
class Polygon extends UnitaryObject# {{{
  constructor: (points...) ->
    if (not (@ instanceof Polygon))
      throw new Error('Constructor cannot be called as a function.')
    super()
    if (Object.prototype.toString.call(points[0]) == '[object Array]')
      @.points = points[0]
    else
      @.points = points
  equals: () -> false
  move: (dx, dy) ->
    points = []
    length = 0
    for val in @.points
      points[length] = val.move(dx, dy)
      length = 0|length+1
    return new Polygon(points).setStrokeColor(@.strokeColor).setFillColor(@.fillColor)
  name: () -> 'Polygon'
# }}}
class Quadrilateral extends Polygon# {{{
  constructor: (A, B, C, D) ->
    if (not (@ instanceof Quadrilateral))
      throw new Error('Constructor cannot be called as a function.')
    if (new Segment(A, D).intersects(new Segment(B, C)))
      throw new Error('ABCD is not a quadrilateral.')
    if (A.equals(B) || A.equals(C) || A.equals(D) || B.equals(C) || B.equals(D) || C.equals(D))
      throw new Error('ABCD is not a quadrilateral.')
    super(A, B, C, D)
  getArea: () ->
    [A, B, C, D] = @.points
    S1 = new Triangle(A, B, C).getArea()
    S2 = new Triangle(A, C, D).getArea()
    return S1 + S2
  name: () -> 'Quadrilateral'
# }}}
class Triangle extends Polygon# {{{
  constructor: (A, B, C) ->
    if (not (@ instanceof Triangle))
      throw new Error('Constructor cannot be called as a function.')
    if (not A? || not B? || not C?)
      throw new Error('Triangle must have three vertices.')
    if (A.equals(B) || B.equals(C) || A.equals(C))
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
    O = new Point(vO.x, vO.y)
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
    O = new Point(vO.x, vO.y)
    r = 2 * @.getArea() / (a + b + c)
    return new Circle(O, r)
  getArea: () ->
    A = @.points[0]
    B = @.points[1]
    C = @.points[2]
    AB = new Segment(A, B)
    AC = new Segment(A, C)
    vAB = new Vector(B.x - A.x, B.y - A.y)
    vAC = new Vector(C.x - A.x, C.y - A.y)
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
class Text_ extends UnitaryObject# {{{
  # Text コンストラクタが既にブラウザに存在しているためText_とした
  constructor: (str, P, align = 'left', maxWidth = null) ->
    if (not (@ instanceof Text_))
      throw new Error('Constructor cannot be called as a function.')
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
    return @
  setAlign: (align) ->
    @.align = align
    return @
  setOutlineColor: (color) ->
    @.outlineColor = color
    return @
  setBaseline: (base) ->
    @.baseline = base
    return @
  setFont: (font) ->
    @.font = font
    return @
  move: (dx, dy) ->
    return new Text_(@.str, @.P.move(dx, dy), @.align, @.maxWidth).setStrokeColor(@.strokeColor).setFillColor(@.fillColor).setOutlineColor(@.outlineColor).setBaseline(@.baseline).setFont(@.font)
  name: () -> 'Text'
# }}}
class Image_ extends UnitaryObject# {{{
  # Imageコンストラクタが既にブラウザに存在しているためImage_とした
  constructor: (src, startPoint) ->
    if (not (@ instanceof Image_))
      throw new Error('Constructor cannot be called as a function.')
    @.src = src
    @.startPoint = startPoint
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
  equals: (B) ->
    if (!super(B))
      return false
    return @.src == B.src && @.dx == B.dx && @.dy == B.dy && @.dw == B.dw && @.dh == B.dh && @.sw == B.sw && @.sh == B.sh && @.sx == B.sx && @.sy == B.sy
  move: (dx, dy) ->
    newImage = new Image_(@.src, @.startPoint.move(dx, dy))
    if (@.sx != null)
      newImage.trim(new Point(@.sx, @.sy), @.sw, @.sh, @.dw, @.dh)
    return newImage
  name: () -> 'Image'
# }}}
class Graph extends UnitaryObject# {{{
  constructor: (f, scale) ->
    super()
    @.f = f
    @.scale = scale
    @.start = null
    @.end = null
  setRange: (start, end) ->
    @.start = start
    @.end = end
    return @
  equals: () -> false
  moveX: undefined
  moveY: undefined
  name: () -> 'Graph'# }}}

WORLD = {
  ORIGIN: new Point(0, 0)
}
_global = (@ || 0).self || global
Module = {
  UnitaryObject: UnitaryObject
  Circle: Circle
  Graph: Graph
  Image: Image_
  Line: Line
  Point: Point
  Polygon: Polygon
  Quadrilateral: Quadrilateral
  Rect: Rect
  Segment: Segment
  Text: Text_
  Triangle: Triangle
  Vector: Vector
  distance: distance
  WORLD: WORLD
}
if ('process' of _global)
  module.exports = Module
_global['Unitary'] = Module

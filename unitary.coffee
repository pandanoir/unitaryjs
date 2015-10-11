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
    if (not (@ instanceof UnitaryObject))
      throw new Error('Constructor cannot be called as a function.')
    @.style = {
      fillColor: null
      strokeColor: null
    }
  equals: (B) ->
    return @.name() == B.name()
  setFillColor: (color) ->
    @.style.fillColor = color
    return @
  setStrokeColor: (color) ->
    @.style.strokeColor = color
    return @
  setStyle: (style) ->
    @.style = {}
    for key of style
      @.style[key] = style[key]
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
    super()
    @.x = x
    @.y = y

  moveTo: (x, y) ->
    return new Point(x, y).setStyle(@.style)
  move: (dx, dy) ->
    return new Point(@.x + dx, @.y + dy).setStyle(@.style)
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
class BaseVector extends UnitaryObject# {{{
  constructor: () ->
    super()
    if (arguments.length == 1 && Object.prototype.toString.call(arguments[0]) == '[object Array]')
      @.component = new Array(arguments[0].length)
      i = 0
      _i = arguments[0].length
      while i < _i
        @.component[i] = arguments[0][i]
        i = 0|i+1
    else
      @.component = new Array(arguments.length)
      i = 0
      _i = arguments.length
      while i < _i
        @.component[i] = arguments[i]
        i = 0|i+1
  add: (CD) ->
    if (@.component.length != CD.component.length)
      throw new Error('dimention of each vector are different.')
    component = new Array(@.component.length)
    for val, i in @.component
      component[i] = val + CD.component[i]
    return new BaseVector(component)
  minus: (CD) ->
    return @.add(CD.multiple(-1))
  product: (CD) ->
    if (@.component.length != CD.component.length)
      throw new Error('dimention of each vector are different.')
    product = 0
    for val, i in @.component
      product += val * CD.component[i]
    return product
  multiple: (k) ->
    component = (k * n for n in @.component)
    return new BaseVector(component)
  abs: () ->
    component = (n * n for n in @.component)
    res = 0
    res += n for n in component
    return Math.sqrt(res)
  equals: (B) ->
    if (@.component.length != B.component.length)
      return false
    for val, i in @.component
      if (val != B.component[i])
        return false
    return true
  move: () ->
    arr = new Array(arguments.length)
    for val, i in arguments
      arr[i] = val
    return @.add.apply(@, new BaseVector(arr))
  name: () -> 'BaseVector'
# }}}
class Vector extends BaseVector# {{{
  constructor: () ->
    if (not (@ instanceof Vector))
      throw new Error('Constructor cannot be called as a function.')
    if (arguments.length == 2)
      super(arguments[0], arguments[1])
      @.x = arguments[0]
      @.y = arguments[1]
    else if (arguments.length == 1)
      super(arguments[0].x, arguments[0].y)
      @.x = arguments[0].x
      @.y = arguments[0].y
  add: (CD) ->
    newVector = super(CD)
    return new Vector(newVector.component[0], newVector.component[1])
  minus: (CD) ->
    newVector = super(CD)
    return new Vector(newVector.component[0], newVector.component[1])
  multiple: (k) ->
    newVector = super(k)
    return new Vector(newVector.component[0], newVector.component[1])
  move: (dx, dy) ->
    return new Vector(@.x + dx, @.y + dy)
  name: () -> 'Vector'
# }}}
class Vector3D extends BaseVector# {{{
  constructor: () ->
    if (not (@ instanceof Vector3D))
      throw new Error('Constructor cannot be called as a function.')
    if (arguments.length == 3)
      super(arguments[0], arguments[1], arguments[2])
      @.x = arguments[0]
      @.y = arguments[1]
      @.z = arguments[2]
    else if (arguments.length == 1)
      super(arguments[0].x, arguments[0].y, arguments[0].z)
      @.x = arguments[0].x
      @.y = arguments[0].y
      @.z = arguments[0].z
  add: (CD) ->
    newVector = super(CD)
    return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2])
  minus: (CD) ->
    newVector = super(CD)
    return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2])
  multiple: (k) ->
    newVector = super(k)
    return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2])
  move: (dx, dy, dz) ->
    return new Vector3D(@.x + dx, @.y + dy, @.z + dz)
  name: () -> 'Vector3D'
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
    return new Line(@.points[0].move(dx, dy), @.points[1].move(dx, dy)).setStyle(@.style)
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
    return new Segment(@.points[0].move(dx, dy), @.points[1].move(dx, dy)).setStyle(@.style)
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
    return new Circle(@.Origin.moveTo(x, y), @.r).setStyle(@.style)
  move: (dx, dy) ->
    return new Circle(@.Origin.move(dx, dy), @.r).setStyle(@.style)
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
    return new Polygon(points).setStyle(@.style)
  has: (P) ->
    before_v = @.points[@.points.length - 1]
    rad = 0
    for v in @.points
      a = new Vector(v).minus(new Vector(P))
      b = new Vector(before_v).minus(new Vector(P))
      cos = a.product(b) / (a.abs() * b.abs())
      rad += Math.acos(cos)
      before_v = v
    return Math.round(rad / (2 * Math.PI) * 360) == 360
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
  has: (P) ->
    A = @.points[0]
    B = @.points[1]
    return (A.x - P.x) * (B.x - P.x) <= 0 && (A.y - P.y) * (B.y - P.y) <= 0
  name: () -> 'Rect'
# }}}
class Text_ extends UnitaryObject# {{{
  # Text コンストラクタが既にブラウザに存在しているためText_とした
  constructor: (str, P, align = 'left', maxWidth = null) ->
    if (not (@ instanceof Text_))
      throw new Error('Constructor cannot be called as a function.')
    super()
    @.P = P
    @.string = str
    @.text = str
    @.strokesOutline = false
    @.style.align = align
    @.style.maxWidth = maxWidth
    @.style.fillColor = '#000'
    @.style.outlineColor = '#000'
    @.style.baseline = 'alphabetic'
    @.style.font = null
  strokeOutline: () ->
    @.strokesOutline = true
    return @
  setAlign: (align) ->
    @.style.align = align
    return @
  setOutlineColor: (color) ->
    @.style.outlineColor = color
    return @
  setBaseline: (base) ->
    @.style.baseline = base
    return @
  setFont: (font) ->
    @.style.font = font
    return @
  move: (dx, dy) ->
    newText = new Text_(@.str, @.P.move(dx, dy), @.align, @.maxWidth).setStyle(@.style)
    if (@.strokesOutline)
      newText.strokeOutline()
    return newText
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
XAxis = new Line(new Point(0, 0), new Point(1, 0))
YAxis = new Line(new Point(0, 0), new Point(0, 1))

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
  Vector3D: Vector3D
  XAxis:XAxis
  YAxis:YAxis
  distance: distance
}
if ('process' of _global)
  module.exports = Module
_global['Unitary'] = Module

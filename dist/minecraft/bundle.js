(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var size = require('element-size')

module.exports = fit

var scratch = new Float32Array(2)

function fit(canvas, parent, scale) {
  var isSVG = canvas.nodeName.toUpperCase() === 'SVG'

  canvas.style.position = canvas.style.position || 'absolute'
  canvas.style.top = 0
  canvas.style.left = 0

  resize.scale  = parseFloat(scale || 1)
  resize.parent = parent

  return resize()

  function resize() {
    var p = resize.parent || canvas.parentNode
    if (typeof p === 'function') {
      var dims   = p(scratch) || scratch
      var width  = dims[0]
      var height = dims[1]
    } else
    if (p && p !== document.body) {
      var psize  = size(p)
      var width  = psize[0]|0
      var height = psize[1]|0
    } else {
      var width  = window.innerWidth
      var height = window.innerHeight
    }

    if (isSVG) {
      canvas.setAttribute('width', width * resize.scale + 'px')
      canvas.setAttribute('height', height * resize.scale + 'px')
    } else {
      canvas.width = width * resize.scale
      canvas.height = height * resize.scale
    }

    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    return resize
  }
}

},{"element-size":3}],2:[function(require,module,exports){
var createCamera = require('orbit-camera')
var createScroll = require('scroll-speed')
var mp = require('mouse-position')
var mb = require('mouse-pressed')
var key = require('key-pressed')

var panSpeed = 1

module.exports = attachCamera

function attachCamera(canvas, opts) {
  opts = opts || {}
  opts.pan = opts.pan !== false
  opts.scale = opts.scale !== false
  opts.rotate = opts.rotate !== false

  var scroll = createScroll(canvas, opts.scale)
  var mbut = mb(canvas, opts.rotate)
  var mpos = mp(canvas)
  var camera = createCamera(
      [0, 10, 30]
    , [0, 0, 0]
    , [0, 1, 0]
  )

  camera.tick = tick

  return camera

  function tick() {
    var ctrl = key('<control>') || key('<alt>')
    var alt = key('<shift>')
    var height = canvas.height
    var width = canvas.width

    if (opts.rotate && mbut.left && !ctrl && !alt) {
      camera.rotate(
          [ mpos.x / width - 0.5, mpos.y / height - 0.5 ]
        , [ mpos.prevX / width - 0.5, mpos.prevY / height - 0.5 ]
      )
    }

    if (opts.pan && mbut.right || (mbut.left && ctrl && !alt)) {
      camera.pan([
          panSpeed * (mpos.x - mpos.prevX) / width
        , panSpeed * (mpos.y - mpos.prevY) / height
      ])
    }

    if (opts.scale && scroll[1]) {
      camera.distance *= Math.exp(scroll[1] / height)
    }

    if (opts.scale && (mbut.middle || (mbut.left && !ctrl && alt))) {
      var d = mpos.y - mpos.prevY
      if (!d) return;

      camera.distance *= Math.exp(d / height)
    }

    scroll.flush()
    mpos.flush()
  }
}

},{"key-pressed":34,"mouse-position":35,"mouse-pressed":37,"orbit-camera":40,"scroll-speed":44}],3:[function(require,module,exports){
module.exports = getSize

function getSize(element) {
  // Handle cases where the element is not already
  // attached to the DOM by briefly appending it
  // to document.body, and removing it again later.
  if (element === window || element === document.body) {
    return [window.innerWidth, window.innerHeight]
  }

  if (!element.parentNode) {
    var temporary = true
    document.body.appendChild(element)
  }

  var bounds = element.getBoundingClientRect()
  var styles = getComputedStyle(element)
  var height = (bounds.height|0)
    + parse(styles.getPropertyValue('margin-top'))
    + parse(styles.getPropertyValue('margin-bottom'))
  var width  = (bounds.width|0)
    + parse(styles.getPropertyValue('margin-left'))
    + parse(styles.getPropertyValue('margin-right'))

  if (temporary) {
    document.body.removeChild(element)
  }

  return [width, height]
}

function parse(prop) {
  return parseFloat(prop) || 0
}

},{}],4:[function(require,module,exports){
module.exports = adjoint;

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};
},{}],5:[function(require,module,exports){
module.exports = clone;

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],6:[function(require,module,exports){
module.exports = copy;

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],7:[function(require,module,exports){
module.exports = create;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],8:[function(require,module,exports){
module.exports = determinant;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};
},{}],9:[function(require,module,exports){
module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};
},{}],10:[function(require,module,exports){
module.exports = fromRotation

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotate(dest, dest, rad, axis)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function fromRotation(out, rad, axis) {
  var s, c, t
  var x = axis[0]
  var y = axis[1]
  var z = axis[2]
  var len = Math.sqrt(x * x + y * y + z * z)

  if (Math.abs(len) < 0.000001) {
    return null
  }

  len = 1 / len
  x *= len
  y *= len
  z *= len

  s = Math.sin(rad)
  c = Math.cos(rad)
  t = 1 - c

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c
  out[1] = y * x * t + z * s
  out[2] = z * x * t - y * s
  out[3] = 0
  out[4] = x * y * t - z * s
  out[5] = y * y * t + c
  out[6] = z * y * t + x * s
  out[7] = 0
  out[8] = x * z * t + y * s
  out[9] = y * z * t - x * s
  out[10] = z * z * t + c
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

},{}],11:[function(require,module,exports){
module.exports = fromRotationTranslation;

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};
},{}],12:[function(require,module,exports){
module.exports = fromScaling

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.scale(dest, dest, vec)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
function fromScaling(out, v) {
  out[0] = v[0]
  out[1] = 0
  out[2] = 0
  out[3] = 0
  out[4] = 0
  out[5] = v[1]
  out[6] = 0
  out[7] = 0
  out[8] = 0
  out[9] = 0
  out[10] = v[2]
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

},{}],13:[function(require,module,exports){
module.exports = fromTranslation

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.translate(dest, dest, vec)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromTranslation(out, v) {
  out[0] = 1
  out[1] = 0
  out[2] = 0
  out[3] = 0
  out[4] = 0
  out[5] = 1
  out[6] = 0
  out[7] = 0
  out[8] = 0
  out[9] = 0
  out[10] = 1
  out[11] = 0
  out[12] = v[0]
  out[13] = v[1]
  out[14] = v[2]
  out[15] = 1
  return out
}

},{}],14:[function(require,module,exports){
module.exports = fromXRotation

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateX(dest, dest, rad)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromXRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    out[0] = 1
    out[1] = 0
    out[2] = 0
    out[3] = 0
    out[4] = 0
    out[5] = c
    out[6] = s
    out[7] = 0
    out[8] = 0
    out[9] = -s
    out[10] = c
    out[11] = 0
    out[12] = 0
    out[13] = 0
    out[14] = 0
    out[15] = 1
    return out
}
},{}],15:[function(require,module,exports){
module.exports = fromYRotation

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateY(dest, dest, rad)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromYRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    out[0] = c
    out[1] = 0
    out[2] = -s
    out[3] = 0
    out[4] = 0
    out[5] = 1
    out[6] = 0
    out[7] = 0
    out[8] = s
    out[9] = 0
    out[10] = c
    out[11] = 0
    out[12] = 0
    out[13] = 0
    out[14] = 0
    out[15] = 1
    return out
}
},{}],16:[function(require,module,exports){
module.exports = fromZRotation

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateZ(dest, dest, rad)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromZRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    out[0] = c
    out[1] = s
    out[2] = 0
    out[3] = 0
    out[4] = -s
    out[5] = c
    out[6] = 0
    out[7] = 0
    out[8] = 0
    out[9] = 0
    out[10] = 1
    out[11] = 0
    out[12] = 0
    out[13] = 0
    out[14] = 0
    out[15] = 1
    return out
}
},{}],17:[function(require,module,exports){
module.exports = frustum;

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};
},{}],18:[function(require,module,exports){
module.exports = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],19:[function(require,module,exports){
module.exports = {
  create: require('./create')
  , clone: require('./clone')
  , copy: require('./copy')
  , identity: require('./identity')
  , transpose: require('./transpose')
  , invert: require('./invert')
  , adjoint: require('./adjoint')
  , determinant: require('./determinant')
  , multiply: require('./multiply')
  , translate: require('./translate')
  , scale: require('./scale')
  , rotate: require('./rotate')
  , rotateX: require('./rotateX')
  , rotateY: require('./rotateY')
  , rotateZ: require('./rotateZ')
  , fromRotation: require('./fromRotation')
  , fromRotationTranslation: require('./fromRotationTranslation')
  , fromScaling: require('./fromScaling')
  , fromTranslation: require('./fromTranslation')
  , fromXRotation: require('./fromXRotation')
  , fromYRotation: require('./fromYRotation')
  , fromZRotation: require('./fromZRotation')
  , fromQuat: require('./fromQuat')
  , frustum: require('./frustum')
  , perspective: require('./perspective')
  , perspectiveFromFieldOfView: require('./perspectiveFromFieldOfView')
  , ortho: require('./ortho')
  , lookAt: require('./lookAt')
  , str: require('./str')
}

},{"./adjoint":4,"./clone":5,"./copy":6,"./create":7,"./determinant":8,"./fromQuat":9,"./fromRotation":10,"./fromRotationTranslation":11,"./fromScaling":12,"./fromTranslation":13,"./fromXRotation":14,"./fromYRotation":15,"./fromZRotation":16,"./frustum":17,"./identity":18,"./invert":20,"./lookAt":21,"./multiply":22,"./ortho":23,"./perspective":24,"./perspectiveFromFieldOfView":25,"./rotate":26,"./rotateX":27,"./rotateY":28,"./rotateZ":29,"./scale":30,"./str":31,"./translate":32,"./transpose":33}],20:[function(require,module,exports){
module.exports = invert;

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};
},{}],21:[function(require,module,exports){
var identity = require('./identity');

module.exports = lookAt;

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < 0.000001 &&
        Math.abs(eyey - centery) < 0.000001 &&
        Math.abs(eyez - centerz) < 0.000001) {
        return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};
},{"./identity":18}],22:[function(require,module,exports){
module.exports = multiply;

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};
},{}],23:[function(require,module,exports){
module.exports = ortho;

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};
},{}],24:[function(require,module,exports){
module.exports = perspective;

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};
},{}],25:[function(require,module,exports){
module.exports = perspectiveFromFieldOfView;

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}


},{}],26:[function(require,module,exports){
module.exports = rotate;

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < 0.000001) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};
},{}],27:[function(require,module,exports){
module.exports = rotateX;

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};
},{}],28:[function(require,module,exports){
module.exports = rotateY;

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};
},{}],29:[function(require,module,exports){
module.exports = rotateZ;

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};
},{}],30:[function(require,module,exports){
module.exports = scale;

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],31:[function(require,module,exports){
module.exports = str;

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};
},{}],32:[function(require,module,exports){
module.exports = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};
},{}],33:[function(require,module,exports){
module.exports = transpose;

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};
},{}],34:[function(require,module,exports){
(function (process){(function (){
var keys = require('vkey')
var list = Object.keys(keys)
var down = {}

reset()

module.exports = pressed

if (process.browser) {
  window.addEventListener('keydown', keydown, false)
  window.addEventListener('keyup', keyup, false)
  window.addEventListener('blur', reset, false)
}

function pressed(key) {
  return key
    ? down[key]
    : down
}

function reset() {
  list.forEach(function(code) {
    down[keys[code]] = false
  })
}

function keyup(e) {
  down[keys[e.keyCode]] = false
}

function keydown(e) {
  down[keys[e.keyCode]] = true
}

}).call(this)}).call(this,require('_process'))
},{"_process":41,"vkey":46}],35:[function(require,module,exports){
var Emitter = require('events/')

module.exports = attach

function attach(element, listener) {
  var position = new Emitter

  position.x = 0
  position.y = 0
  position.prevX = 0
  position.prevY = 0
  position.flush = flush

  if (typeof window === 'undefined') {
    return position
  }

  listener = listener || element || window
  element  = element  || document.body
  listener.addEventListener('mousemove', (
       element === document.body
    || element === window
  ) ? function(e) {
      position.prevX = position.x
      position.prevY = position.y
      position.x = e.clientX
      position.y = e.clientY
      position.emit('move', e)
    }
    : function(e) {
      position.prevX = position.x
      position.prevY = position.y
      var bounds = element.getBoundingClientRect()
      position.x = e.clientX - bounds.left
      position.y = e.clientY - bounds.top
      position.emit('move', e)
    }
  , false)

  return position

  function flush() {
    this.prevX = this.x
    this.prevY = this.y
  }
}

},{"events/":36}],36:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],37:[function(require,module,exports){
var Emitter = require('events/')
var map = [
    'left'
  , 'middle'
  , 'right'
]

module.exports = pressed

function pressed(element, preventDefault) {
  var mouse = new Emitter

  mouse.left = false
  mouse.right = false
  mouse.middle = false

  if (typeof window !== 'undefined') {
    element = element || window
    element.addEventListener('mousedown', mousedown, false)
    element.addEventListener('mouseup', mouseup, false)

    if (preventDefault) {
      element.addEventListener('contextmenu', function(e) {
        return e.preventDefault && e.preventDefault() && false
      }, false)
    }
  }

  return mouse

  function mousedown(e) {
    mouse.right = false
    mouse[map[e.button]] = true
    mouse.emit('down', e)

    if (!preventDefault) return
    if (!e.preventDefault) return false
    e.preventDefault()
    e.stopPropagation()
  }

  function mouseup(e) {
    mouse.right = false
    mouse[map[e.button]] = false
    mouse.emit('up', e)

    if (!preventDefault) return
    if (!e.preventDefault) return
    e.preventDefault()
    e.stopPropagation()
  }
}

},{"events/":38}],38:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],39:[function(require,module,exports){
/*!
@fileoverview gl-matrix - High performance matrix and vector operations
@author Brandon Jones
@author Colin MacKenzie IV
@version 2.7.0

Copyright (c) 2015-2018, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var r=n();for(var a in r)("object"==typeof exports?exports:t)[a]=r[a]}}("undefined"!=typeof self?self:this,function(){return function(t){var n={};function r(a){if(n[a])return n[a].exports;var e=n[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,r),e.l=!0,e.exports}return r.m=t,r.c=n,r.d=function(t,n,a){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)r.d(a,e,function(n){return t[n]}.bind(null,e));return a},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=10)}([function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.setMatrixArrayType=function(t){n.ARRAY_TYPE=t},n.toRadian=function(t){return t*e},n.equals=function(t,n){return Math.abs(t-n)<=a*Math.max(1,Math.abs(t),Math.abs(n))};var a=n.EPSILON=1e-6;n.ARRAY_TYPE="undefined"!=typeof Float32Array?Float32Array:Array,n.RANDOM=Math.random;var e=Math.PI/180},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.forEach=n.sqrLen=n.len=n.sqrDist=n.dist=n.div=n.mul=n.sub=void 0,n.create=e,n.clone=function(t){var n=new a.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},n.fromValues=function(t,n,r,e){var u=new a.ARRAY_TYPE(4);return u[0]=t,u[1]=n,u[2]=r,u[3]=e,u},n.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},n.set=function(t,n,r,a,e){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t},n.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t},n.subtract=u,n.multiply=o,n.divide=i,n.ceil=function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t},n.floor=function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t},n.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t[3]=Math.min(n[3],r[3]),t},n.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t[3]=Math.max(n[3],r[3]),t},n.round=function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t},n.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t},n.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t},n.distance=s,n.squaredDistance=c,n.length=f,n.squaredLength=M,n.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},n.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t},n.normalize=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u;o>0&&(o=1/Math.sqrt(o),t[0]=r*o,t[1]=a*o,t[2]=e*o,t[3]=u*o);return t},n.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]},n.lerp=function(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t[3]=i+a*(r[3]-i),t},n.random=function(t,n){var r,e,u,o,i,s;n=n||1;do{r=2*a.RANDOM()-1,e=2*a.RANDOM()-1,i=r*r+e*e}while(i>=1);do{u=2*a.RANDOM()-1,o=2*a.RANDOM()-1,s=u*u+o*o}while(s>=1);var c=Math.sqrt((1-i)/s);return t[0]=n*r,t[1]=n*e,t[2]=n*u*c,t[3]=n*o*c,t},n.transformMat4=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3];return t[0]=r[0]*a+r[4]*e+r[8]*u+r[12]*o,t[1]=r[1]*a+r[5]*e+r[9]*u+r[13]*o,t[2]=r[2]*a+r[6]*e+r[10]*u+r[14]*o,t[3]=r[3]*a+r[7]*e+r[11]*u+r[15]*o,t},n.transformQuat=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],s=r[2],c=r[3],f=c*a+i*u-s*e,M=c*e+s*a-o*u,h=c*u+o*e-i*a,l=-o*a-i*e-s*u;return t[0]=f*c+l*-o+M*-s-h*-i,t[1]=M*c+l*-i+h*-o-f*-s,t[2]=h*c+l*-s+f*-i-M*-o,t[3]=n[3],t},n.str=function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},n.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]},n.equals=function(t,n){var r=t[0],e=t[1],u=t[2],o=t[3],i=n[0],s=n[1],c=n[2],f=n[3];return Math.abs(r-i)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(e-s)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(s))&&Math.abs(u-c)<=a.EPSILON*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(o-f)<=a.EPSILON*Math.max(1,Math.abs(o),Math.abs(f))};var a=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(r(0));function e(){var t=new a.ARRAY_TYPE(4);return a.ARRAY_TYPE!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}function u(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t}function o(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t[3]=n[3]*r[3],t}function i(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t[3]=n[3]/r[3],t}function s(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return Math.sqrt(r*r+a*a+e*e+u*u)}function c(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return r*r+a*a+e*e+u*u}function f(t){var n=t[0],r=t[1],a=t[2],e=t[3];return Math.sqrt(n*n+r*r+a*a+e*e)}function M(t){var n=t[0],r=t[1],a=t[2],e=t[3];return n*n+r*r+a*a+e*e}n.sub=u,n.mul=o,n.div=i,n.dist=s,n.sqrDist=c,n.len=f,n.sqrLen=M,n.forEach=function(){var t=e();return function(n,r,a,e,u,o){var i=void 0,s=void 0;for(r||(r=4),a||(a=0),s=e?Math.min(e*r+a,n.length):n.length,i=a;i<s;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],t[3]=n[i+3],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2],n[i+3]=t[3];return n}}()},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.forEach=n.sqrLen=n.len=n.sqrDist=n.dist=n.div=n.mul=n.sub=void 0,n.create=e,n.clone=function(t){var n=new a.ARRAY_TYPE(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n},n.length=u,n.fromValues=o,n.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t},n.set=function(t,n,r,a){return t[0]=n,t[1]=r,t[2]=a,t},n.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t},n.subtract=i,n.multiply=s,n.divide=c,n.ceil=function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t},n.floor=function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t},n.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t},n.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t},n.round=function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t},n.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t},n.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t},n.distance=f,n.squaredDistance=M,n.squaredLength=h,n.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},n.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t},n.normalize=l,n.dot=v,n.cross=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],s=r[2];return t[0]=e*s-u*i,t[1]=u*o-a*s,t[2]=a*i-e*o,t},n.lerp=function(t,n,r,a){var e=n[0],u=n[1],o=n[2];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t},n.hermite=function(t,n,r,a,e,u){var o=u*u,i=o*(2*u-3)+1,s=o*(u-2)+u,c=o*(u-1),f=o*(3-2*u);return t[0]=n[0]*i+r[0]*s+a[0]*c+e[0]*f,t[1]=n[1]*i+r[1]*s+a[1]*c+e[1]*f,t[2]=n[2]*i+r[2]*s+a[2]*c+e[2]*f,t},n.bezier=function(t,n,r,a,e,u){var o=1-u,i=o*o,s=u*u,c=i*o,f=3*u*i,M=3*s*o,h=s*u;return t[0]=n[0]*c+r[0]*f+a[0]*M+e[0]*h,t[1]=n[1]*c+r[1]*f+a[1]*M+e[1]*h,t[2]=n[2]*c+r[2]*f+a[2]*M+e[2]*h,t},n.random=function(t,n){n=n||1;var r=2*a.RANDOM()*Math.PI,e=2*a.RANDOM()-1,u=Math.sqrt(1-e*e)*n;return t[0]=Math.cos(r)*u,t[1]=Math.sin(r)*u,t[2]=e*n,t},n.transformMat4=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[3]*a+r[7]*e+r[11]*u+r[15];return o=o||1,t[0]=(r[0]*a+r[4]*e+r[8]*u+r[12])/o,t[1]=(r[1]*a+r[5]*e+r[9]*u+r[13])/o,t[2]=(r[2]*a+r[6]*e+r[10]*u+r[14])/o,t},n.transformMat3=function(t,n,r){var a=n[0],e=n[1],u=n[2];return t[0]=a*r[0]+e*r[3]+u*r[6],t[1]=a*r[1]+e*r[4]+u*r[7],t[2]=a*r[2]+e*r[5]+u*r[8],t},n.transformQuat=function(t,n,r){var a=r[0],e=r[1],u=r[2],o=r[3],i=n[0],s=n[1],c=n[2],f=e*c-u*s,M=u*i-a*c,h=a*s-e*i,l=e*h-u*M,v=u*f-a*h,d=a*M-e*f,b=2*o;return f*=b,M*=b,h*=b,l*=2,v*=2,d*=2,t[0]=i+f+l,t[1]=s+M+v,t[2]=c+h+d,t},n.rotateX=function(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0],u[1]=e[1]*Math.cos(a)-e[2]*Math.sin(a),u[2]=e[1]*Math.sin(a)+e[2]*Math.cos(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},n.rotateY=function(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[2]*Math.sin(a)+e[0]*Math.cos(a),u[1]=e[1],u[2]=e[2]*Math.cos(a)-e[0]*Math.sin(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},n.rotateZ=function(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0]*Math.cos(a)-e[1]*Math.sin(a),u[1]=e[0]*Math.sin(a)+e[1]*Math.cos(a),u[2]=e[2],t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},n.angle=function(t,n){var r=o(t[0],t[1],t[2]),a=o(n[0],n[1],n[2]);l(r,r),l(a,a);var e=v(r,a);return e>1?0:e<-1?Math.PI:Math.acos(e)},n.str=function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},n.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]},n.equals=function(t,n){var r=t[0],e=t[1],u=t[2],o=n[0],i=n[1],s=n[2];return Math.abs(r-o)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(e-i)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(i))&&Math.abs(u-s)<=a.EPSILON*Math.max(1,Math.abs(u),Math.abs(s))};var a=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(r(0));function e(){var t=new a.ARRAY_TYPE(3);return a.ARRAY_TYPE!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function u(t){var n=t[0],r=t[1],a=t[2];return Math.sqrt(n*n+r*r+a*a)}function o(t,n,r){var e=new a.ARRAY_TYPE(3);return e[0]=t,e[1]=n,e[2]=r,e}function i(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t}function s(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t}function c(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t}function f(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return Math.sqrt(r*r+a*a+e*e)}function M(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return r*r+a*a+e*e}function h(t){var n=t[0],r=t[1],a=t[2];return n*n+r*r+a*a}function l(t,n){var r=n[0],a=n[1],e=n[2],u=r*r+a*a+e*e;return u>0&&(u=1/Math.sqrt(u),t[0]=n[0]*u,t[1]=n[1]*u,t[2]=n[2]*u),t}function v(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}n.sub=i,n.mul=s,n.div=c,n.dist=f,n.sqrDist=M,n.len=u,n.sqrLen=h,n.forEach=function(){var t=e();return function(n,r,a,e,u,o){var i=void 0,s=void 0;for(r||(r=3),a||(a=0),s=e?Math.min(e*r+a,n.length):n.length,i=a;i<s;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2];return n}}()},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.setAxes=n.sqlerp=n.rotationTo=n.equals=n.exactEquals=n.normalize=n.sqrLen=n.squaredLength=n.len=n.length=n.lerp=n.dot=n.scale=n.mul=n.add=n.set=n.copy=n.fromValues=n.clone=void 0,n.create=s,n.identity=function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},n.setAxisAngle=c,n.getAxisAngle=function(t,n){var r=2*Math.acos(n[3]),e=Math.sin(r/2);e>a.EPSILON?(t[0]=n[0]/e,t[1]=n[1]/e,t[2]=n[2]/e):(t[0]=1,t[1]=0,t[2]=0);return r},n.multiply=f,n.rotateX=function(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s+o*i,t[1]=e*s+u*i,t[2]=u*s-e*i,t[3]=o*s-a*i,t},n.rotateY=function(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s-u*i,t[1]=e*s+o*i,t[2]=u*s+a*i,t[3]=o*s-e*i,t},n.rotateZ=function(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s+e*i,t[1]=e*s-a*i,t[2]=u*s+o*i,t[3]=o*s-u*i,t},n.calculateW=function(t,n){var r=n[0],a=n[1],e=n[2];return t[0]=r,t[1]=a,t[2]=e,t[3]=Math.sqrt(Math.abs(1-r*r-a*a-e*e)),t},n.slerp=M,n.random=function(t){var n=a.RANDOM(),r=a.RANDOM(),e=a.RANDOM(),u=Math.sqrt(1-n),o=Math.sqrt(n);return t[0]=u*Math.sin(2*Math.PI*r),t[1]=u*Math.cos(2*Math.PI*r),t[2]=o*Math.sin(2*Math.PI*e),t[3]=o*Math.cos(2*Math.PI*e),t},n.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u,i=o?1/o:0;return t[0]=-r*i,t[1]=-a*i,t[2]=-e*i,t[3]=u*i,t},n.conjugate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t},n.fromMat3=h,n.fromEuler=function(t,n,r,a){var e=.5*Math.PI/180;n*=e,r*=e,a*=e;var u=Math.sin(n),o=Math.cos(n),i=Math.sin(r),s=Math.cos(r),c=Math.sin(a),f=Math.cos(a);return t[0]=u*s*f-o*i*c,t[1]=o*i*f+u*s*c,t[2]=o*s*c-u*i*f,t[3]=o*s*f+u*i*c,t},n.str=function(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"};var a=i(r(0)),e=i(r(5)),u=i(r(2)),o=i(r(1));function i(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}function s(){var t=new a.ARRAY_TYPE(4);return a.ARRAY_TYPE!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}function c(t,n,r){r*=.5;var a=Math.sin(r);return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=Math.cos(r),t}function f(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1],c=r[2],f=r[3];return t[0]=a*f+o*i+e*c-u*s,t[1]=e*f+o*s+u*i-a*c,t[2]=u*f+o*c+a*s-e*i,t[3]=o*f-a*i-e*s-u*c,t}function M(t,n,r,e){var u=n[0],o=n[1],i=n[2],s=n[3],c=r[0],f=r[1],M=r[2],h=r[3],l=void 0,v=void 0,d=void 0,b=void 0,m=void 0;return(v=u*c+o*f+i*M+s*h)<0&&(v=-v,c=-c,f=-f,M=-M,h=-h),1-v>a.EPSILON?(l=Math.acos(v),d=Math.sin(l),b=Math.sin((1-e)*l)/d,m=Math.sin(e*l)/d):(b=1-e,m=e),t[0]=b*u+m*c,t[1]=b*o+m*f,t[2]=b*i+m*M,t[3]=b*s+m*h,t}function h(t,n){var r=n[0]+n[4]+n[8],a=void 0;if(r>0)a=Math.sqrt(r+1),t[3]=.5*a,a=.5/a,t[0]=(n[5]-n[7])*a,t[1]=(n[6]-n[2])*a,t[2]=(n[1]-n[3])*a;else{var e=0;n[4]>n[0]&&(e=1),n[8]>n[3*e+e]&&(e=2);var u=(e+1)%3,o=(e+2)%3;a=Math.sqrt(n[3*e+e]-n[3*u+u]-n[3*o+o]+1),t[e]=.5*a,a=.5/a,t[3]=(n[3*u+o]-n[3*o+u])*a,t[u]=(n[3*u+e]+n[3*e+u])*a,t[o]=(n[3*o+e]+n[3*e+o])*a}return t}n.clone=o.clone,n.fromValues=o.fromValues,n.copy=o.copy,n.set=o.set,n.add=o.add,n.mul=f,n.scale=o.scale,n.dot=o.dot,n.lerp=o.lerp;var l=n.length=o.length,v=(n.len=l,n.squaredLength=o.squaredLength),d=(n.sqrLen=v,n.normalize=o.normalize);n.exactEquals=o.exactEquals,n.equals=o.equals,n.rotationTo=function(){var t=u.create(),n=u.fromValues(1,0,0),r=u.fromValues(0,1,0);return function(a,e,o){var i=u.dot(e,o);return i<-.999999?(u.cross(t,n,e),u.len(t)<1e-6&&u.cross(t,r,e),u.normalize(t,t),c(a,t,Math.PI),a):i>.999999?(a[0]=0,a[1]=0,a[2]=0,a[3]=1,a):(u.cross(t,e,o),a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=1+i,d(a,a))}}(),n.sqlerp=function(){var t=s(),n=s();return function(r,a,e,u,o,i){return M(t,a,o,i),M(n,e,u,i),M(r,t,n,2*i*(1-i)),r}}(),n.setAxes=function(){var t=e.create();return function(n,r,a,e){return t[0]=a[0],t[3]=a[1],t[6]=a[2],t[1]=e[0],t[4]=e[1],t[7]=e[2],t[2]=-r[0],t[5]=-r[1],t[8]=-r[2],d(n,h(n,t))}}()},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=function(){var t=new a.ARRAY_TYPE(16);a.ARRAY_TYPE!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0);return t[0]=1,t[5]=1,t[10]=1,t[15]=1,t},n.clone=function(t){var n=new a.ARRAY_TYPE(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n},n.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},n.fromValues=function(t,n,r,e,u,o,i,s,c,f,M,h,l,v,d,b){var m=new a.ARRAY_TYPE(16);return m[0]=t,m[1]=n,m[2]=r,m[3]=e,m[4]=u,m[5]=o,m[6]=i,m[7]=s,m[8]=c,m[9]=f,m[10]=M,m[11]=h,m[12]=l,m[13]=v,m[14]=d,m[15]=b,m},n.set=function(t,n,r,a,e,u,o,i,s,c,f,M,h,l,v,d,b){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=s,t[8]=c,t[9]=f,t[10]=M,t[11]=h,t[12]=l,t[13]=v,t[14]=d,t[15]=b,t},n.identity=e,n.transpose=function(t,n){if(t===n){var r=n[1],a=n[2],e=n[3],u=n[6],o=n[7],i=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=r,t[6]=n[9],t[7]=n[13],t[8]=a,t[9]=u,t[11]=n[14],t[12]=e,t[13]=o,t[14]=i}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t},n.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=n[9],h=n[10],l=n[11],v=n[12],d=n[13],b=n[14],m=n[15],p=r*i-a*o,P=r*s-e*o,A=r*c-u*o,E=a*s-e*i,O=a*c-u*i,R=e*c-u*s,y=f*d-M*v,q=f*b-h*v,x=f*m-l*v,_=M*b-h*d,Y=M*m-l*d,L=h*m-l*b,S=p*L-P*Y+A*_+E*x-O*q+R*y;if(!S)return null;return S=1/S,t[0]=(i*L-s*Y+c*_)*S,t[1]=(e*Y-a*L-u*_)*S,t[2]=(d*R-b*O+m*E)*S,t[3]=(h*O-M*R-l*E)*S,t[4]=(s*x-o*L-c*q)*S,t[5]=(r*L-e*x+u*q)*S,t[6]=(b*A-v*R-m*P)*S,t[7]=(f*R-h*A+l*P)*S,t[8]=(o*Y-i*x+c*y)*S,t[9]=(a*x-r*Y-u*y)*S,t[10]=(v*O-d*A+m*p)*S,t[11]=(M*A-f*O-l*p)*S,t[12]=(i*q-o*_-s*y)*S,t[13]=(r*_-a*q+e*y)*S,t[14]=(d*P-v*E-b*p)*S,t[15]=(f*E-M*P+h*p)*S,t},n.adjoint=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=n[9],h=n[10],l=n[11],v=n[12],d=n[13],b=n[14],m=n[15];return t[0]=i*(h*m-l*b)-M*(s*m-c*b)+d*(s*l-c*h),t[1]=-(a*(h*m-l*b)-M*(e*m-u*b)+d*(e*l-u*h)),t[2]=a*(s*m-c*b)-i*(e*m-u*b)+d*(e*c-u*s),t[3]=-(a*(s*l-c*h)-i*(e*l-u*h)+M*(e*c-u*s)),t[4]=-(o*(h*m-l*b)-f*(s*m-c*b)+v*(s*l-c*h)),t[5]=r*(h*m-l*b)-f*(e*m-u*b)+v*(e*l-u*h),t[6]=-(r*(s*m-c*b)-o*(e*m-u*b)+v*(e*c-u*s)),t[7]=r*(s*l-c*h)-o*(e*l-u*h)+f*(e*c-u*s),t[8]=o*(M*m-l*d)-f*(i*m-c*d)+v*(i*l-c*M),t[9]=-(r*(M*m-l*d)-f*(a*m-u*d)+v*(a*l-u*M)),t[10]=r*(i*m-c*d)-o*(a*m-u*d)+v*(a*c-u*i),t[11]=-(r*(i*l-c*M)-o*(a*l-u*M)+f*(a*c-u*i)),t[12]=-(o*(M*b-h*d)-f*(i*b-s*d)+v*(i*h-s*M)),t[13]=r*(M*b-h*d)-f*(a*b-e*d)+v*(a*h-e*M),t[14]=-(r*(i*b-s*d)-o*(a*b-e*d)+v*(a*s-e*i)),t[15]=r*(i*h-s*M)-o*(a*h-e*M)+f*(a*s-e*i),t},n.determinant=function(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],s=t[7],c=t[8],f=t[9],M=t[10],h=t[11],l=t[12],v=t[13],d=t[14],b=t[15];return(n*o-r*u)*(M*b-h*d)-(n*i-a*u)*(f*b-h*v)+(n*s-e*u)*(f*d-M*v)+(r*i-a*o)*(c*b-h*l)-(r*s-e*o)*(c*d-M*l)+(a*s-e*i)*(c*v-f*l)},n.multiply=u,n.translate=function(t,n,r){var a=r[0],e=r[1],u=r[2],o=void 0,i=void 0,s=void 0,c=void 0,f=void 0,M=void 0,h=void 0,l=void 0,v=void 0,d=void 0,b=void 0,m=void 0;n===t?(t[12]=n[0]*a+n[4]*e+n[8]*u+n[12],t[13]=n[1]*a+n[5]*e+n[9]*u+n[13],t[14]=n[2]*a+n[6]*e+n[10]*u+n[14],t[15]=n[3]*a+n[7]*e+n[11]*u+n[15]):(o=n[0],i=n[1],s=n[2],c=n[3],f=n[4],M=n[5],h=n[6],l=n[7],v=n[8],d=n[9],b=n[10],m=n[11],t[0]=o,t[1]=i,t[2]=s,t[3]=c,t[4]=f,t[5]=M,t[6]=h,t[7]=l,t[8]=v,t[9]=d,t[10]=b,t[11]=m,t[12]=o*a+f*e+v*u+n[12],t[13]=i*a+M*e+d*u+n[13],t[14]=s*a+h*e+b*u+n[14],t[15]=c*a+l*e+m*u+n[15]);return t},n.scale=function(t,n,r){var a=r[0],e=r[1],u=r[2];return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*e,t[5]=n[5]*e,t[6]=n[6]*e,t[7]=n[7]*e,t[8]=n[8]*u,t[9]=n[9]*u,t[10]=n[10]*u,t[11]=n[11]*u,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},n.rotate=function(t,n,r,e){var u=e[0],o=e[1],i=e[2],s=Math.sqrt(u*u+o*o+i*i),c=void 0,f=void 0,M=void 0,h=void 0,l=void 0,v=void 0,d=void 0,b=void 0,m=void 0,p=void 0,P=void 0,A=void 0,E=void 0,O=void 0,R=void 0,y=void 0,q=void 0,x=void 0,_=void 0,Y=void 0,L=void 0,S=void 0,w=void 0,I=void 0;if(s<a.EPSILON)return null;u*=s=1/s,o*=s,i*=s,c=Math.sin(r),f=Math.cos(r),M=1-f,h=n[0],l=n[1],v=n[2],d=n[3],b=n[4],m=n[5],p=n[6],P=n[7],A=n[8],E=n[9],O=n[10],R=n[11],y=u*u*M+f,q=o*u*M+i*c,x=i*u*M-o*c,_=u*o*M-i*c,Y=o*o*M+f,L=i*o*M+u*c,S=u*i*M+o*c,w=o*i*M-u*c,I=i*i*M+f,t[0]=h*y+b*q+A*x,t[1]=l*y+m*q+E*x,t[2]=v*y+p*q+O*x,t[3]=d*y+P*q+R*x,t[4]=h*_+b*Y+A*L,t[5]=l*_+m*Y+E*L,t[6]=v*_+p*Y+O*L,t[7]=d*_+P*Y+R*L,t[8]=h*S+b*w+A*I,t[9]=l*S+m*w+E*I,t[10]=v*S+p*w+O*I,t[11]=d*S+P*w+R*I,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]);return t},n.rotateX=function(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[4],o=n[5],i=n[6],s=n[7],c=n[8],f=n[9],M=n[10],h=n[11];n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]);return t[4]=u*e+c*a,t[5]=o*e+f*a,t[6]=i*e+M*a,t[7]=s*e+h*a,t[8]=c*e-u*a,t[9]=f*e-o*a,t[10]=M*e-i*a,t[11]=h*e-s*a,t},n.rotateY=function(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],s=n[3],c=n[8],f=n[9],M=n[10],h=n[11];n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]);return t[0]=u*e-c*a,t[1]=o*e-f*a,t[2]=i*e-M*a,t[3]=s*e-h*a,t[8]=u*a+c*e,t[9]=o*a+f*e,t[10]=i*a+M*e,t[11]=s*a+h*e,t},n.rotateZ=function(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],s=n[3],c=n[4],f=n[5],M=n[6],h=n[7];n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]);return t[0]=u*e+c*a,t[1]=o*e+f*a,t[2]=i*e+M*a,t[3]=s*e+h*a,t[4]=c*e-u*a,t[5]=f*e-o*a,t[6]=M*e-i*a,t[7]=h*e-s*a,t},n.fromTranslation=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t},n.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},n.fromRotation=function(t,n,r){var e=r[0],u=r[1],o=r[2],i=Math.sqrt(e*e+u*u+o*o),s=void 0,c=void 0,f=void 0;if(i<a.EPSILON)return null;return e*=i=1/i,u*=i,o*=i,s=Math.sin(n),c=Math.cos(n),f=1-c,t[0]=e*e*f+c,t[1]=u*e*f+o*s,t[2]=o*e*f-u*s,t[3]=0,t[4]=e*u*f-o*s,t[5]=u*u*f+c,t[6]=o*u*f+e*s,t[7]=0,t[8]=e*o*f+u*s,t[9]=u*o*f-e*s,t[10]=o*o*f+c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},n.fromXRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},n.fromYRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},n.fromZRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},n.fromRotationTranslation=o,n.fromQuat2=function(t,n){var r=new a.ARRAY_TYPE(3),e=-n[0],u=-n[1],i=-n[2],s=n[3],c=n[4],f=n[5],M=n[6],h=n[7],l=e*e+u*u+i*i+s*s;l>0?(r[0]=2*(c*s+h*e+f*i-M*u)/l,r[1]=2*(f*s+h*u+M*e-c*i)/l,r[2]=2*(M*s+h*i+c*u-f*e)/l):(r[0]=2*(c*s+h*e+f*i-M*u),r[1]=2*(f*s+h*u+M*e-c*i),r[2]=2*(M*s+h*i+c*u-f*e));return o(t,n,r),t},n.getTranslation=function(t,n){return t[0]=n[12],t[1]=n[13],t[2]=n[14],t},n.getScaling=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[4],o=n[5],i=n[6],s=n[8],c=n[9],f=n[10];return t[0]=Math.sqrt(r*r+a*a+e*e),t[1]=Math.sqrt(u*u+o*o+i*i),t[2]=Math.sqrt(s*s+c*c+f*f),t},n.getRotation=function(t,n){var r=n[0]+n[5]+n[10],a=0;r>0?(a=2*Math.sqrt(r+1),t[3]=.25*a,t[0]=(n[6]-n[9])/a,t[1]=(n[8]-n[2])/a,t[2]=(n[1]-n[4])/a):n[0]>n[5]&&n[0]>n[10]?(a=2*Math.sqrt(1+n[0]-n[5]-n[10]),t[3]=(n[6]-n[9])/a,t[0]=.25*a,t[1]=(n[1]+n[4])/a,t[2]=(n[8]+n[2])/a):n[5]>n[10]?(a=2*Math.sqrt(1+n[5]-n[0]-n[10]),t[3]=(n[8]-n[2])/a,t[0]=(n[1]+n[4])/a,t[1]=.25*a,t[2]=(n[6]+n[9])/a):(a=2*Math.sqrt(1+n[10]-n[0]-n[5]),t[3]=(n[1]-n[4])/a,t[0]=(n[8]+n[2])/a,t[1]=(n[6]+n[9])/a,t[2]=.25*a);return t},n.fromRotationTranslationScale=function(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3],s=e+e,c=u+u,f=o+o,M=e*s,h=e*c,l=e*f,v=u*c,d=u*f,b=o*f,m=i*s,p=i*c,P=i*f,A=a[0],E=a[1],O=a[2];return t[0]=(1-(v+b))*A,t[1]=(h+P)*A,t[2]=(l-p)*A,t[3]=0,t[4]=(h-P)*E,t[5]=(1-(M+b))*E,t[6]=(d+m)*E,t[7]=0,t[8]=(l+p)*O,t[9]=(d-m)*O,t[10]=(1-(M+v))*O,t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t},n.fromRotationTranslationScaleOrigin=function(t,n,r,a,e){var u=n[0],o=n[1],i=n[2],s=n[3],c=u+u,f=o+o,M=i+i,h=u*c,l=u*f,v=u*M,d=o*f,b=o*M,m=i*M,p=s*c,P=s*f,A=s*M,E=a[0],O=a[1],R=a[2],y=e[0],q=e[1],x=e[2],_=(1-(d+m))*E,Y=(l+A)*E,L=(v-P)*E,S=(l-A)*O,w=(1-(h+m))*O,I=(b+p)*O,N=(v+P)*R,g=(b-p)*R,T=(1-(h+d))*R;return t[0]=_,t[1]=Y,t[2]=L,t[3]=0,t[4]=S,t[5]=w,t[6]=I,t[7]=0,t[8]=N,t[9]=g,t[10]=T,t[11]=0,t[12]=r[0]+y-(_*y+S*q+N*x),t[13]=r[1]+q-(Y*y+w*q+g*x),t[14]=r[2]+x-(L*y+I*q+T*x),t[15]=1,t},n.fromQuat=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,s=e+e,c=r*o,f=a*o,M=a*i,h=e*o,l=e*i,v=e*s,d=u*o,b=u*i,m=u*s;return t[0]=1-M-v,t[1]=f+m,t[2]=h-b,t[3]=0,t[4]=f-m,t[5]=1-c-v,t[6]=l+d,t[7]=0,t[8]=h+b,t[9]=l-d,t[10]=1-c-M,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},n.frustum=function(t,n,r,a,e,u,o){var i=1/(r-n),s=1/(e-a),c=1/(u-o);return t[0]=2*u*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*u*s,t[6]=0,t[7]=0,t[8]=(r+n)*i,t[9]=(e+a)*s,t[10]=(o+u)*c,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*u*2*c,t[15]=0,t},n.perspective=function(t,n,r,a,e){var u=1/Math.tan(n/2),o=void 0;t[0]=u/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=e&&e!==1/0?(o=1/(a-e),t[10]=(e+a)*o,t[14]=2*e*a*o):(t[10]=-1,t[14]=-2*a);return t},n.perspectiveFromFieldOfView=function(t,n,r,a){var e=Math.tan(n.upDegrees*Math.PI/180),u=Math.tan(n.downDegrees*Math.PI/180),o=Math.tan(n.leftDegrees*Math.PI/180),i=Math.tan(n.rightDegrees*Math.PI/180),s=2/(o+i),c=2/(e+u);return t[0]=s,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=c,t[6]=0,t[7]=0,t[8]=-(o-i)*s*.5,t[9]=(e-u)*c*.5,t[10]=a/(r-a),t[11]=-1,t[12]=0,t[13]=0,t[14]=a*r/(r-a),t[15]=0,t},n.ortho=function(t,n,r,a,e,u,o){var i=1/(n-r),s=1/(a-e),c=1/(u-o);return t[0]=-2*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(n+r)*i,t[13]=(e+a)*s,t[14]=(o+u)*c,t[15]=1,t},n.lookAt=function(t,n,r,u){var o=void 0,i=void 0,s=void 0,c=void 0,f=void 0,M=void 0,h=void 0,l=void 0,v=void 0,d=void 0,b=n[0],m=n[1],p=n[2],P=u[0],A=u[1],E=u[2],O=r[0],R=r[1],y=r[2];if(Math.abs(b-O)<a.EPSILON&&Math.abs(m-R)<a.EPSILON&&Math.abs(p-y)<a.EPSILON)return e(t);h=b-O,l=m-R,v=p-y,d=1/Math.sqrt(h*h+l*l+v*v),o=A*(v*=d)-E*(l*=d),i=E*(h*=d)-P*v,s=P*l-A*h,(d=Math.sqrt(o*o+i*i+s*s))?(o*=d=1/d,i*=d,s*=d):(o=0,i=0,s=0);c=l*s-v*i,f=v*o-h*s,M=h*i-l*o,(d=Math.sqrt(c*c+f*f+M*M))?(c*=d=1/d,f*=d,M*=d):(c=0,f=0,M=0);return t[0]=o,t[1]=c,t[2]=h,t[3]=0,t[4]=i,t[5]=f,t[6]=l,t[7]=0,t[8]=s,t[9]=M,t[10]=v,t[11]=0,t[12]=-(o*b+i*m+s*p),t[13]=-(c*b+f*m+M*p),t[14]=-(h*b+l*m+v*p),t[15]=1,t},n.targetTo=function(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=a[0],s=a[1],c=a[2],f=e-r[0],M=u-r[1],h=o-r[2],l=f*f+M*M+h*h;l>0&&(l=1/Math.sqrt(l),f*=l,M*=l,h*=l);var v=s*h-c*M,d=c*f-i*h,b=i*M-s*f;(l=v*v+d*d+b*b)>0&&(l=1/Math.sqrt(l),v*=l,d*=l,b*=l);return t[0]=v,t[1]=d,t[2]=b,t[3]=0,t[4]=M*b-h*d,t[5]=h*v-f*b,t[6]=f*d-M*v,t[7]=0,t[8]=f,t[9]=M,t[10]=h,t[11]=0,t[12]=e,t[13]=u,t[14]=o,t[15]=1,t},n.str=function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},n.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2)+Math.pow(t[9],2)+Math.pow(t[10],2)+Math.pow(t[11],2)+Math.pow(t[12],2)+Math.pow(t[13],2)+Math.pow(t[14],2)+Math.pow(t[15],2))},n.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t[6]=n[6]+r[6],t[7]=n[7]+r[7],t[8]=n[8]+r[8],t[9]=n[9]+r[9],t[10]=n[10]+r[10],t[11]=n[11]+r[11],t[12]=n[12]+r[12],t[13]=n[13]+r[13],t[14]=n[14]+r[14],t[15]=n[15]+r[15],t},n.subtract=i,n.multiplyScalar=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=n[7]*r,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=n[11]*r,t[12]=n[12]*r,t[13]=n[13]*r,t[14]=n[14]*r,t[15]=n[15]*r,t},n.multiplyScalarAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t[4]=n[4]+r[4]*a,t[5]=n[5]+r[5]*a,t[6]=n[6]+r[6]*a,t[7]=n[7]+r[7]*a,t[8]=n[8]+r[8]*a,t[9]=n[9]+r[9]*a,t[10]=n[10]+r[10]*a,t[11]=n[11]+r[11]*a,t[12]=n[12]+r[12]*a,t[13]=n[13]+r[13]*a,t[14]=n[14]+r[14]*a,t[15]=n[15]+r[15]*a,t},n.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]&&t[9]===n[9]&&t[10]===n[10]&&t[11]===n[11]&&t[12]===n[12]&&t[13]===n[13]&&t[14]===n[14]&&t[15]===n[15]},n.equals=function(t,n){var r=t[0],e=t[1],u=t[2],o=t[3],i=t[4],s=t[5],c=t[6],f=t[7],M=t[8],h=t[9],l=t[10],v=t[11],d=t[12],b=t[13],m=t[14],p=t[15],P=n[0],A=n[1],E=n[2],O=n[3],R=n[4],y=n[5],q=n[6],x=n[7],_=n[8],Y=n[9],L=n[10],S=n[11],w=n[12],I=n[13],N=n[14],g=n[15];return Math.abs(r-P)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(P))&&Math.abs(e-A)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(A))&&Math.abs(u-E)<=a.EPSILON*Math.max(1,Math.abs(u),Math.abs(E))&&Math.abs(o-O)<=a.EPSILON*Math.max(1,Math.abs(o),Math.abs(O))&&Math.abs(i-R)<=a.EPSILON*Math.max(1,Math.abs(i),Math.abs(R))&&Math.abs(s-y)<=a.EPSILON*Math.max(1,Math.abs(s),Math.abs(y))&&Math.abs(c-q)<=a.EPSILON*Math.max(1,Math.abs(c),Math.abs(q))&&Math.abs(f-x)<=a.EPSILON*Math.max(1,Math.abs(f),Math.abs(x))&&Math.abs(M-_)<=a.EPSILON*Math.max(1,Math.abs(M),Math.abs(_))&&Math.abs(h-Y)<=a.EPSILON*Math.max(1,Math.abs(h),Math.abs(Y))&&Math.abs(l-L)<=a.EPSILON*Math.max(1,Math.abs(l),Math.abs(L))&&Math.abs(v-S)<=a.EPSILON*Math.max(1,Math.abs(v),Math.abs(S))&&Math.abs(d-w)<=a.EPSILON*Math.max(1,Math.abs(d),Math.abs(w))&&Math.abs(b-I)<=a.EPSILON*Math.max(1,Math.abs(b),Math.abs(I))&&Math.abs(m-N)<=a.EPSILON*Math.max(1,Math.abs(m),Math.abs(N))&&Math.abs(p-g)<=a.EPSILON*Math.max(1,Math.abs(p),Math.abs(g))};var a=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(r(0));function e(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function u(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=n[9],l=n[10],v=n[11],d=n[12],b=n[13],m=n[14],p=n[15],P=r[0],A=r[1],E=r[2],O=r[3];return t[0]=P*a+A*i+E*M+O*d,t[1]=P*e+A*s+E*h+O*b,t[2]=P*u+A*c+E*l+O*m,t[3]=P*o+A*f+E*v+O*p,P=r[4],A=r[5],E=r[6],O=r[7],t[4]=P*a+A*i+E*M+O*d,t[5]=P*e+A*s+E*h+O*b,t[6]=P*u+A*c+E*l+O*m,t[7]=P*o+A*f+E*v+O*p,P=r[8],A=r[9],E=r[10],O=r[11],t[8]=P*a+A*i+E*M+O*d,t[9]=P*e+A*s+E*h+O*b,t[10]=P*u+A*c+E*l+O*m,t[11]=P*o+A*f+E*v+O*p,P=r[12],A=r[13],E=r[14],O=r[15],t[12]=P*a+A*i+E*M+O*d,t[13]=P*e+A*s+E*h+O*b,t[14]=P*u+A*c+E*l+O*m,t[15]=P*o+A*f+E*v+O*p,t}function o(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=a+a,s=e+e,c=u+u,f=a*i,M=a*s,h=a*c,l=e*s,v=e*c,d=u*c,b=o*i,m=o*s,p=o*c;return t[0]=1-(l+d),t[1]=M+p,t[2]=h-m,t[3]=0,t[4]=M-p,t[5]=1-(f+d),t[6]=v+b,t[7]=0,t[8]=h+m,t[9]=v-b,t[10]=1-(f+l),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}function i(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t[6]=n[6]-r[6],t[7]=n[7]-r[7],t[8]=n[8]-r[8],t[9]=n[9]-r[9],t[10]=n[10]-r[10],t[11]=n[11]-r[11],t[12]=n[12]-r[12],t[13]=n[13]-r[13],t[14]=n[14]-r[14],t[15]=n[15]-r[15],t}n.mul=u,n.sub=i},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=function(){var t=new a.ARRAY_TYPE(9);a.ARRAY_TYPE!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0);return t[0]=1,t[4]=1,t[8]=1,t},n.fromMat4=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[4],t[4]=n[5],t[5]=n[6],t[6]=n[8],t[7]=n[9],t[8]=n[10],t},n.clone=function(t){var n=new a.ARRAY_TYPE(9);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n},n.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},n.fromValues=function(t,n,r,e,u,o,i,s,c){var f=new a.ARRAY_TYPE(9);return f[0]=t,f[1]=n,f[2]=r,f[3]=e,f[4]=u,f[5]=o,f[6]=i,f[7]=s,f[8]=c,f},n.set=function(t,n,r,a,e,u,o,i,s,c){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=s,t[8]=c,t},n.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},n.transpose=function(t,n){if(t===n){var r=n[1],a=n[2],e=n[5];t[1]=n[3],t[2]=n[6],t[3]=r,t[5]=n[7],t[6]=a,t[7]=e}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t},n.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=f*o-i*c,h=-f*u+i*s,l=c*u-o*s,v=r*M+a*h+e*l;if(!v)return null;return v=1/v,t[0]=M*v,t[1]=(-f*a+e*c)*v,t[2]=(i*a-e*o)*v,t[3]=h*v,t[4]=(f*r-e*s)*v,t[5]=(-i*r+e*u)*v,t[6]=l*v,t[7]=(-c*r+a*s)*v,t[8]=(o*r-a*u)*v,t},n.adjoint=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8];return t[0]=o*f-i*c,t[1]=e*c-a*f,t[2]=a*i-e*o,t[3]=i*s-u*f,t[4]=r*f-e*s,t[5]=e*u-r*i,t[6]=u*c-o*s,t[7]=a*s-r*c,t[8]=r*o-a*u,t},n.determinant=function(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],s=t[7],c=t[8];return n*(c*u-o*s)+r*(-c*e+o*i)+a*(s*e-u*i)},n.multiply=e,n.translate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=r[0],l=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=i,t[5]=s,t[6]=h*a+l*o+c,t[7]=h*e+l*i+f,t[8]=h*u+l*s+M,t},n.rotate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=Math.sin(r),l=Math.cos(r);return t[0]=l*a+h*o,t[1]=l*e+h*i,t[2]=l*u+h*s,t[3]=l*o-h*a,t[4]=l*i-h*e,t[5]=l*s-h*u,t[6]=c,t[7]=f,t[8]=M,t},n.scale=function(t,n,r){var a=r[0],e=r[1];return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=e*n[3],t[4]=e*n[4],t[5]=e*n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},n.fromTranslation=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=n[0],t[7]=n[1],t[8]=1,t},n.fromRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=-r,t[4]=a,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},n.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=n[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},n.fromMat2d=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=0,t[3]=n[2],t[4]=n[3],t[5]=0,t[6]=n[4],t[7]=n[5],t[8]=1,t},n.fromQuat=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,s=e+e,c=r*o,f=a*o,M=a*i,h=e*o,l=e*i,v=e*s,d=u*o,b=u*i,m=u*s;return t[0]=1-M-v,t[3]=f-m,t[6]=h+b,t[1]=f+m,t[4]=1-c-v,t[7]=l-d,t[2]=h-b,t[5]=l+d,t[8]=1-c-M,t},n.normalFromMat4=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=n[9],h=n[10],l=n[11],v=n[12],d=n[13],b=n[14],m=n[15],p=r*i-a*o,P=r*s-e*o,A=r*c-u*o,E=a*s-e*i,O=a*c-u*i,R=e*c-u*s,y=f*d-M*v,q=f*b-h*v,x=f*m-l*v,_=M*b-h*d,Y=M*m-l*d,L=h*m-l*b,S=p*L-P*Y+A*_+E*x-O*q+R*y;if(!S)return null;return S=1/S,t[0]=(i*L-s*Y+c*_)*S,t[1]=(s*x-o*L-c*q)*S,t[2]=(o*Y-i*x+c*y)*S,t[3]=(e*Y-a*L-u*_)*S,t[4]=(r*L-e*x+u*q)*S,t[5]=(a*x-r*Y-u*y)*S,t[6]=(d*R-b*O+m*E)*S,t[7]=(b*A-v*R-m*P)*S,t[8]=(v*O-d*A+m*p)*S,t},n.projection=function(t,n,r){return t[0]=2/n,t[1]=0,t[2]=0,t[3]=0,t[4]=-2/r,t[5]=0,t[6]=-1,t[7]=1,t[8]=1,t},n.str=function(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"},n.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2))},n.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t[6]=n[6]+r[6],t[7]=n[7]+r[7],t[8]=n[8]+r[8],t},n.subtract=u,n.multiplyScalar=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=n[7]*r,t[8]=n[8]*r,t},n.multiplyScalarAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t[4]=n[4]+r[4]*a,t[5]=n[5]+r[5]*a,t[6]=n[6]+r[6]*a,t[7]=n[7]+r[7]*a,t[8]=n[8]+r[8]*a,t},n.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]},n.equals=function(t,n){var r=t[0],e=t[1],u=t[2],o=t[3],i=t[4],s=t[5],c=t[6],f=t[7],M=t[8],h=n[0],l=n[1],v=n[2],d=n[3],b=n[4],m=n[5],p=n[6],P=n[7],A=n[8];return Math.abs(r-h)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(h))&&Math.abs(e-l)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(l))&&Math.abs(u-v)<=a.EPSILON*Math.max(1,Math.abs(u),Math.abs(v))&&Math.abs(o-d)<=a.EPSILON*Math.max(1,Math.abs(o),Math.abs(d))&&Math.abs(i-b)<=a.EPSILON*Math.max(1,Math.abs(i),Math.abs(b))&&Math.abs(s-m)<=a.EPSILON*Math.max(1,Math.abs(s),Math.abs(m))&&Math.abs(c-p)<=a.EPSILON*Math.max(1,Math.abs(c),Math.abs(p))&&Math.abs(f-P)<=a.EPSILON*Math.max(1,Math.abs(f),Math.abs(P))&&Math.abs(M-A)<=a.EPSILON*Math.max(1,Math.abs(M),Math.abs(A))};var a=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(r(0));function e(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=r[0],l=r[1],v=r[2],d=r[3],b=r[4],m=r[5],p=r[6],P=r[7],A=r[8];return t[0]=h*a+l*o+v*c,t[1]=h*e+l*i+v*f,t[2]=h*u+l*s+v*M,t[3]=d*a+b*o+m*c,t[4]=d*e+b*i+m*f,t[5]=d*u+b*s+m*M,t[6]=p*a+P*o+A*c,t[7]=p*e+P*i+A*f,t[8]=p*u+P*s+A*M,t}function u(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t[6]=n[6]-r[6],t[7]=n[7]-r[7],t[8]=n[8]-r[8],t}n.mul=e,n.sub=u},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.forEach=n.sqrLen=n.sqrDist=n.dist=n.div=n.mul=n.sub=n.len=void 0,n.create=e,n.clone=function(t){var n=new a.ARRAY_TYPE(2);return n[0]=t[0],n[1]=t[1],n},n.fromValues=function(t,n){var r=new a.ARRAY_TYPE(2);return r[0]=t,r[1]=n,r},n.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t},n.set=function(t,n,r){return t[0]=n,t[1]=r,t},n.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t},n.subtract=u,n.multiply=o,n.divide=i,n.ceil=function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t},n.floor=function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t},n.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t},n.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t},n.round=function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t},n.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t},n.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t},n.distance=s,n.squaredDistance=c,n.length=f,n.squaredLength=M,n.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t},n.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t},n.normalize=function(t,n){var r=n[0],a=n[1],e=r*r+a*a;e>0&&(e=1/Math.sqrt(e),t[0]=n[0]*e,t[1]=n[1]*e);return t},n.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]},n.cross=function(t,n,r){var a=n[0]*r[1]-n[1]*r[0];return t[0]=t[1]=0,t[2]=a,t},n.lerp=function(t,n,r,a){var e=n[0],u=n[1];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t},n.random=function(t,n){n=n||1;var r=2*a.RANDOM()*Math.PI;return t[0]=Math.cos(r)*n,t[1]=Math.sin(r)*n,t},n.transformMat2=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e,t[1]=r[1]*a+r[3]*e,t},n.transformMat2d=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e+r[4],t[1]=r[1]*a+r[3]*e+r[5],t},n.transformMat3=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[3]*e+r[6],t[1]=r[1]*a+r[4]*e+r[7],t},n.transformMat4=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[4]*e+r[12],t[1]=r[1]*a+r[5]*e+r[13],t},n.rotate=function(t,n,r,a){var e=n[0]-r[0],u=n[1]-r[1],o=Math.sin(a),i=Math.cos(a);return t[0]=e*i-u*o+r[0],t[1]=e*o+u*i+r[1],t},n.angle=function(t,n){var r=t[0],a=t[1],e=n[0],u=n[1],o=r*r+a*a;o>0&&(o=1/Math.sqrt(o));var i=e*e+u*u;i>0&&(i=1/Math.sqrt(i));var s=(r*e+a*u)*o*i;return s>1?0:s<-1?Math.PI:Math.acos(s)},n.str=function(t){return"vec2("+t[0]+", "+t[1]+")"},n.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]},n.equals=function(t,n){var r=t[0],e=t[1],u=n[0],o=n[1];return Math.abs(r-u)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(u))&&Math.abs(e-o)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(o))};var a=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(r(0));function e(){var t=new a.ARRAY_TYPE(2);return a.ARRAY_TYPE!=Float32Array&&(t[0]=0,t[1]=0),t}function u(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t}function o(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t}function i(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t}function s(t,n){var r=n[0]-t[0],a=n[1]-t[1];return Math.sqrt(r*r+a*a)}function c(t,n){var r=n[0]-t[0],a=n[1]-t[1];return r*r+a*a}function f(t){var n=t[0],r=t[1];return Math.sqrt(n*n+r*r)}function M(t){var n=t[0],r=t[1];return n*n+r*r}n.len=f,n.sub=u,n.mul=o,n.div=i,n.dist=s,n.sqrDist=c,n.sqrLen=M,n.forEach=function(){var t=e();return function(n,r,a,e,u,o){var i=void 0,s=void 0;for(r||(r=2),a||(a=0),s=e?Math.min(e*r+a,n.length):n.length,i=a;i<s;i+=r)t[0]=n[i],t[1]=n[i+1],u(t,t,o),n[i]=t[0],n[i+1]=t[1];return n}}()},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sqrLen=n.squaredLength=n.len=n.length=n.dot=n.mul=n.setReal=n.getReal=void 0,n.create=function(){var t=new a.ARRAY_TYPE(8);a.ARRAY_TYPE!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0);return t[3]=1,t},n.clone=function(t){var n=new a.ARRAY_TYPE(8);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n},n.fromValues=function(t,n,r,e,u,o,i,s){var c=new a.ARRAY_TYPE(8);return c[0]=t,c[1]=n,c[2]=r,c[3]=e,c[4]=u,c[5]=o,c[6]=i,c[7]=s,c},n.fromRotationTranslationValues=function(t,n,r,e,u,o,i){var s=new a.ARRAY_TYPE(8);s[0]=t,s[1]=n,s[2]=r,s[3]=e;var c=.5*u,f=.5*o,M=.5*i;return s[4]=c*e+f*r-M*n,s[5]=f*e+M*t-c*r,s[6]=M*e+c*n-f*t,s[7]=-c*t-f*n-M*r,s},n.fromRotationTranslation=i,n.fromTranslation=function(t,n){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t[4]=.5*n[0],t[5]=.5*n[1],t[6]=.5*n[2],t[7]=0,t},n.fromRotation=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=0,t[5]=0,t[6]=0,t[7]=0,t},n.fromMat4=function(t,n){var r=e.create();u.getRotation(r,n);var o=new a.ARRAY_TYPE(3);return u.getTranslation(o,n),i(t,r,o),t},n.copy=s,n.identity=function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t},n.set=function(t,n,r,a,e,u,o,i,s){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=s,t},n.getDual=function(t,n){return t[0]=n[4],t[1]=n[5],t[2]=n[6],t[3]=n[7],t},n.setDual=function(t,n){return t[4]=n[0],t[5]=n[1],t[6]=n[2],t[7]=n[3],t},n.getTranslation=function(t,n){var r=n[4],a=n[5],e=n[6],u=n[7],o=-n[0],i=-n[1],s=-n[2],c=n[3];return t[0]=2*(r*c+u*o+a*s-e*i),t[1]=2*(a*c+u*i+e*o-r*s),t[2]=2*(e*c+u*s+r*i-a*o),t},n.translate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=.5*r[0],s=.5*r[1],c=.5*r[2],f=n[4],M=n[5],h=n[6],l=n[7];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=o*i+e*c-u*s+f,t[5]=o*s+u*i-a*c+M,t[6]=o*c+a*s-e*i+h,t[7]=-a*i-e*s-u*c+l,t},n.rotateX=function(t,n,r){var a=-n[0],u=-n[1],o=-n[2],i=n[3],s=n[4],c=n[5],f=n[6],M=n[7],h=s*i+M*a+c*o-f*u,l=c*i+M*u+f*a-s*o,v=f*i+M*o+s*u-c*a,d=M*i-s*a-c*u-f*o;return e.rotateX(t,n,r),a=t[0],u=t[1],o=t[2],i=t[3],t[4]=h*i+d*a+l*o-v*u,t[5]=l*i+d*u+v*a-h*o,t[6]=v*i+d*o+h*u-l*a,t[7]=d*i-h*a-l*u-v*o,t},n.rotateY=function(t,n,r){var a=-n[0],u=-n[1],o=-n[2],i=n[3],s=n[4],c=n[5],f=n[6],M=n[7],h=s*i+M*a+c*o-f*u,l=c*i+M*u+f*a-s*o,v=f*i+M*o+s*u-c*a,d=M*i-s*a-c*u-f*o;return e.rotateY(t,n,r),a=t[0],u=t[1],o=t[2],i=t[3],t[4]=h*i+d*a+l*o-v*u,t[5]=l*i+d*u+v*a-h*o,t[6]=v*i+d*o+h*u-l*a,t[7]=d*i-h*a-l*u-v*o,t},n.rotateZ=function(t,n,r){var a=-n[0],u=-n[1],o=-n[2],i=n[3],s=n[4],c=n[5],f=n[6],M=n[7],h=s*i+M*a+c*o-f*u,l=c*i+M*u+f*a-s*o,v=f*i+M*o+s*u-c*a,d=M*i-s*a-c*u-f*o;return e.rotateZ(t,n,r),a=t[0],u=t[1],o=t[2],i=t[3],t[4]=h*i+d*a+l*o-v*u,t[5]=l*i+d*u+v*a-h*o,t[6]=v*i+d*o+h*u-l*a,t[7]=d*i-h*a-l*u-v*o,t},n.rotateByQuatAppend=function(t,n,r){var a=r[0],e=r[1],u=r[2],o=r[3],i=n[0],s=n[1],c=n[2],f=n[3];return t[0]=i*o+f*a+s*u-c*e,t[1]=s*o+f*e+c*a-i*u,t[2]=c*o+f*u+i*e-s*a,t[3]=f*o-i*a-s*e-c*u,i=n[4],s=n[5],c=n[6],f=n[7],t[4]=i*o+f*a+s*u-c*e,t[5]=s*o+f*e+c*a-i*u,t[6]=c*o+f*u+i*e-s*a,t[7]=f*o-i*a-s*e-c*u,t},n.rotateByQuatPrepend=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1],c=r[2],f=r[3];return t[0]=a*f+o*i+e*c-u*s,t[1]=e*f+o*s+u*i-a*c,t[2]=u*f+o*c+a*s-e*i,t[3]=o*f-a*i-e*s-u*c,i=r[4],s=r[5],c=r[6],f=r[7],t[4]=a*f+o*i+e*c-u*s,t[5]=e*f+o*s+u*i-a*c,t[6]=u*f+o*c+a*s-e*i,t[7]=o*f-a*i-e*s-u*c,t},n.rotateAroundAxis=function(t,n,r,e){if(Math.abs(e)<a.EPSILON)return s(t,n);var u=Math.sqrt(r[0]*r[0]+r[1]*r[1]+r[2]*r[2]);e*=.5;var o=Math.sin(e),i=o*r[0]/u,c=o*r[1]/u,f=o*r[2]/u,M=Math.cos(e),h=n[0],l=n[1],v=n[2],d=n[3];t[0]=h*M+d*i+l*f-v*c,t[1]=l*M+d*c+v*i-h*f,t[2]=v*M+d*f+h*c-l*i,t[3]=d*M-h*i-l*c-v*f;var b=n[4],m=n[5],p=n[6],P=n[7];return t[4]=b*M+P*i+m*f-p*c,t[5]=m*M+P*c+p*i-b*f,t[6]=p*M+P*f+b*c-m*i,t[7]=P*M-b*i-m*c-p*f,t},n.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t[6]=n[6]+r[6],t[7]=n[7]+r[7],t},n.multiply=c,n.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=n[7]*r,t},n.lerp=function(t,n,r,a){var e=1-a;f(n,r)<0&&(a=-a);return t[0]=n[0]*e+r[0]*a,t[1]=n[1]*e+r[1]*a,t[2]=n[2]*e+r[2]*a,t[3]=n[3]*e+r[3]*a,t[4]=n[4]*e+r[4]*a,t[5]=n[5]*e+r[5]*a,t[6]=n[6]*e+r[6]*a,t[7]=n[7]*e+r[7]*a,t},n.invert=function(t,n){var r=h(n);return t[0]=-n[0]/r,t[1]=-n[1]/r,t[2]=-n[2]/r,t[3]=n[3]/r,t[4]=-n[4]/r,t[5]=-n[5]/r,t[6]=-n[6]/r,t[7]=n[7]/r,t},n.conjugate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t[4]=-n[4],t[5]=-n[5],t[6]=-n[6],t[7]=n[7],t},n.normalize=function(t,n){var r=h(n);if(r>0){r=Math.sqrt(r);var a=n[0]/r,e=n[1]/r,u=n[2]/r,o=n[3]/r,i=n[4],s=n[5],c=n[6],f=n[7],M=a*i+e*s+u*c+o*f;t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=(i-a*M)/r,t[5]=(s-e*M)/r,t[6]=(c-u*M)/r,t[7]=(f-o*M)/r}return t},n.str=function(t){return"quat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+")"},n.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]},n.equals=function(t,n){var r=t[0],e=t[1],u=t[2],o=t[3],i=t[4],s=t[5],c=t[6],f=t[7],M=n[0],h=n[1],l=n[2],v=n[3],d=n[4],b=n[5],m=n[6],p=n[7];return Math.abs(r-M)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(M))&&Math.abs(e-h)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(h))&&Math.abs(u-l)<=a.EPSILON*Math.max(1,Math.abs(u),Math.abs(l))&&Math.abs(o-v)<=a.EPSILON*Math.max(1,Math.abs(o),Math.abs(v))&&Math.abs(i-d)<=a.EPSILON*Math.max(1,Math.abs(i),Math.abs(d))&&Math.abs(s-b)<=a.EPSILON*Math.max(1,Math.abs(s),Math.abs(b))&&Math.abs(c-m)<=a.EPSILON*Math.max(1,Math.abs(c),Math.abs(m))&&Math.abs(f-p)<=a.EPSILON*Math.max(1,Math.abs(f),Math.abs(p))};var a=o(r(0)),e=o(r(3)),u=o(r(4));function o(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}function i(t,n,r){var a=.5*r[0],e=.5*r[1],u=.5*r[2],o=n[0],i=n[1],s=n[2],c=n[3];return t[0]=o,t[1]=i,t[2]=s,t[3]=c,t[4]=a*c+e*s-u*i,t[5]=e*c+u*o-a*s,t[6]=u*c+a*i-e*o,t[7]=-a*o-e*i-u*s,t}function s(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t}n.getReal=e.copy;n.setReal=e.copy;function c(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[4],s=r[5],c=r[6],f=r[7],M=n[4],h=n[5],l=n[6],v=n[7],d=r[0],b=r[1],m=r[2],p=r[3];return t[0]=a*p+o*d+e*m-u*b,t[1]=e*p+o*b+u*d-a*m,t[2]=u*p+o*m+a*b-e*d,t[3]=o*p-a*d-e*b-u*m,t[4]=a*f+o*i+e*c-u*s+M*p+v*d+h*m-l*b,t[5]=e*f+o*s+u*i-a*c+h*p+v*b+l*d-M*m,t[6]=u*f+o*c+a*s-e*i+l*p+v*m+M*b-h*d,t[7]=o*f-a*i-e*s-u*c+v*p-M*d-h*b-l*m,t}n.mul=c;var f=n.dot=e.dot;var M=n.length=e.length,h=(n.len=M,n.squaredLength=e.squaredLength);n.sqrLen=h},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=function(){var t=new a.ARRAY_TYPE(6);a.ARRAY_TYPE!=Float32Array&&(t[1]=0,t[2]=0,t[4]=0,t[5]=0);return t[0]=1,t[3]=1,t},n.clone=function(t){var n=new a.ARRAY_TYPE(6);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n},n.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t},n.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},n.fromValues=function(t,n,r,e,u,o){var i=new a.ARRAY_TYPE(6);return i[0]=t,i[1]=n,i[2]=r,i[3]=e,i[4]=u,i[5]=o,i},n.set=function(t,n,r,a,e,u,o){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t},n.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=r*u-a*e;if(!s)return null;return s=1/s,t[0]=u*s,t[1]=-a*s,t[2]=-e*s,t[3]=r*s,t[4]=(e*i-u*o)*s,t[5]=(a*o-r*i)*s,t},n.determinant=function(t){return t[0]*t[3]-t[1]*t[2]},n.multiply=e,n.rotate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=Math.sin(r),f=Math.cos(r);return t[0]=a*f+u*c,t[1]=e*f+o*c,t[2]=a*-c+u*f,t[3]=e*-c+o*f,t[4]=i,t[5]=s,t},n.scale=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=r[0],f=r[1];return t[0]=a*c,t[1]=e*c,t[2]=u*f,t[3]=o*f,t[4]=i,t[5]=s,t},n.translate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=r[0],f=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=a*c+u*f+i,t[5]=e*c+o*f+s,t},n.fromRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t[4]=0,t[5]=0,t},n.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t[4]=0,t[5]=0,t},n.fromTranslation=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=n[0],t[5]=n[1],t},n.str=function(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"},n.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+1)},n.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t},n.subtract=u,n.multiplyScalar=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t},n.multiplyScalarAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t[4]=n[4]+r[4]*a,t[5]=n[5]+r[5]*a,t},n.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]},n.equals=function(t,n){var r=t[0],e=t[1],u=t[2],o=t[3],i=t[4],s=t[5],c=n[0],f=n[1],M=n[2],h=n[3],l=n[4],v=n[5];return Math.abs(r-c)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(c))&&Math.abs(e-f)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(f))&&Math.abs(u-M)<=a.EPSILON*Math.max(1,Math.abs(u),Math.abs(M))&&Math.abs(o-h)<=a.EPSILON*Math.max(1,Math.abs(o),Math.abs(h))&&Math.abs(i-l)<=a.EPSILON*Math.max(1,Math.abs(i),Math.abs(l))&&Math.abs(s-v)<=a.EPSILON*Math.max(1,Math.abs(s),Math.abs(v))};var a=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(r(0));function e(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=r[0],f=r[1],M=r[2],h=r[3],l=r[4],v=r[5];return t[0]=a*c+u*f,t[1]=e*c+o*f,t[2]=a*M+u*h,t[3]=e*M+o*h,t[4]=a*l+u*v+i,t[5]=e*l+o*v+s,t}function u(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t}n.mul=e,n.sub=u},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=function(){var t=new a.ARRAY_TYPE(4);a.ARRAY_TYPE!=Float32Array&&(t[1]=0,t[2]=0);return t[0]=1,t[3]=1,t},n.clone=function(t){var n=new a.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},n.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},n.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},n.fromValues=function(t,n,r,e){var u=new a.ARRAY_TYPE(4);return u[0]=t,u[1]=n,u[2]=r,u[3]=e,u},n.set=function(t,n,r,a,e){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t},n.transpose=function(t,n){if(t===n){var r=n[1];t[1]=n[2],t[2]=r}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t},n.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*u-e*a;if(!o)return null;return o=1/o,t[0]=u*o,t[1]=-a*o,t[2]=-e*o,t[3]=r*o,t},n.adjoint=function(t,n){var r=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=r,t},n.determinant=function(t){return t[0]*t[3]-t[2]*t[1]},n.multiply=e,n.rotate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s+u*i,t[1]=e*s+o*i,t[2]=a*-i+u*s,t[3]=e*-i+o*s,t},n.scale=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1];return t[0]=a*i,t[1]=e*i,t[2]=u*s,t[3]=o*s,t},n.fromRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t},n.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t},n.str=function(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},n.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2))},n.LDU=function(t,n,r,a){return t[2]=a[2]/a[0],r[0]=a[0],r[1]=a[1],r[3]=a[3]-t[2]*r[1],[t,n,r]},n.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t},n.subtract=u,n.exactEquals=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]},n.equals=function(t,n){var r=t[0],e=t[1],u=t[2],o=t[3],i=n[0],s=n[1],c=n[2],f=n[3];return Math.abs(r-i)<=a.EPSILON*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(e-s)<=a.EPSILON*Math.max(1,Math.abs(e),Math.abs(s))&&Math.abs(u-c)<=a.EPSILON*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(o-f)<=a.EPSILON*Math.max(1,Math.abs(o),Math.abs(f))},n.multiplyScalar=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t},n.multiplyScalarAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t};var a=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(r(0));function e(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1],c=r[2],f=r[3];return t[0]=a*i+u*s,t[1]=e*i+o*s,t[2]=a*c+u*f,t[3]=e*c+o*f,t}function u(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t}n.mul=e,n.sub=u},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.vec4=n.vec3=n.vec2=n.quat2=n.quat=n.mat4=n.mat3=n.mat2d=n.mat2=n.glMatrix=void 0;var a=l(r(0)),e=l(r(9)),u=l(r(8)),o=l(r(5)),i=l(r(4)),s=l(r(3)),c=l(r(7)),f=l(r(6)),M=l(r(2)),h=l(r(1));function l(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}n.glMatrix=a,n.mat2=e,n.mat2d=u,n.mat3=o,n.mat4=i,n.quat=s,n.quat2=c,n.vec2=f,n.vec3=M,n.vec4=h}])});
},{}],40:[function(require,module,exports){
"use strict"

var glm = require("gl-matrix")
var vec3 = glm.vec3
var mat3 = glm.mat3
var mat4 = glm.mat4
var quat = glm.quat

//Scratch variables
var scratch0 = new Float32Array(16)
var scratch1 = new Float32Array(16)

function OrbitCamera(rotation, center, distance) {
  this.rotation = rotation
  this.center   = center
  this.distance = distance
}

var proto = OrbitCamera.prototype

proto.view = function(out) {
  if(!out) {
    out = mat4.create()
  }
  scratch1[0] = scratch1[1] = 0.0
  scratch1[2] = -this.distance
  mat4.fromRotationTranslation(out,
    quat.conjugate(scratch0, this.rotation),
    scratch1)
  mat4.translate(out, out, vec3.negate(scratch0, this.center))
  return out
}

proto.lookAt = function(eye, center, up) {
  mat4.lookAt(scratch0, eye, center, up)
  mat3.fromMat4(scratch0, scratch0)
  quat.fromMat3(this.rotation, scratch0)
  vec3.copy(this.center, center)
  this.distance = vec3.distance(eye, center)
}

proto.pan = function(dpan) {
  var d = this.distance
  scratch0[0] = -d*(dpan[0]||0)
  scratch0[1] =  d*(dpan[1]||0)
  scratch0[2] =  d*(dpan[2]||0)
  vec3.transformQuat(scratch0, scratch0, this.rotation)
  vec3.add(this.center, this.center, scratch0)
}

proto.zoom = function(d) {
  this.distance += d
  if(this.distance < 0.0) {
    this.distance = 0.0
  }
}

function quatFromVec(out, da) {
  var x = da[0]
  var y = da[1]
  var z = da[2]
  var s = x*x + y*y
  if(s > 1.0) {
    s = 1.0
  }
  out[0] = -da[0]
  out[1] =  da[1]
  out[2] =  da[2] || Math.sqrt(1.0 - s)
  out[3] =  0.0
}

proto.rotate = function(da, db) {
  quatFromVec(scratch0, da)
  quatFromVec(scratch1, db)
  quat.invert(scratch1, scratch1)
  quat.multiply(scratch0, scratch0, scratch1)
  if(quat.length(scratch0) < 1e-6) {
    return
  }
  quat.multiply(this.rotation, this.rotation, scratch0)
  quat.normalize(this.rotation, this.rotation)
}

function createOrbitCamera(eye, target, up) {
  eye     = eye     || [0,0,-1]
  target  = target  || [0,0,0]
  up      = up      || [0,1,0]
  var camera = new OrbitCamera(quat.create(), vec3.create(), 1.0)
  camera.lookAt(eye, target, up)
  return camera
}

module.exports = createOrbitCamera

},{"gl-matrix":39}],41:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],42:[function(require,module,exports){
(function(Z,ka){"object"===typeof exports&&"undefined"!==typeof module?module.exports=ka():"function"===typeof define&&define.amd?define(ka):Z.createREGL=ka()})(this,function(){function Z(a,b){this.id=Db++;this.type=a;this.data=b}function ka(a){if(0===a.length)return[];var b=a.charAt(0),c=a.charAt(a.length-1);if(1<a.length&&b===c&&('"'===b||"'"===b))return['"'+a.substr(1,a.length-2).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];if(b=/\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(a))return ka(a.substr(0,
b.index)).concat(ka(b[1])).concat(ka(a.substr(b.index+b[0].length)));b=a.split(".");if(1===b.length)return['"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];a=[];for(c=0;c<b.length;++c)a=a.concat(ka(b[c]));return a}function cb(a){return"["+ka(a).join("][")+"]"}function db(a,b){if("function"===typeof a)return new Z(0,a);if("number"===typeof a||"boolean"===typeof a)return new Z(5,a);if(Array.isArray(a))return new Z(6,a.map(function(a,e){return db(a,b+"["+e+"]")}));if(a instanceof Z)return a}function Eb(){var a=
{"":0},b=[""];return{id:function(c){var e=a[c];if(e)return e;e=a[c]=b.length;b.push(c);return e},str:function(a){return b[a]}}}function Fb(a,b,c){function e(){var b=window.innerWidth,e=window.innerHeight;a!==document.body&&(e=f.getBoundingClientRect(),b=e.right-e.left,e=e.bottom-e.top);f.width=c*b;f.height=c*e}var f=document.createElement("canvas");L(f.style,{border:0,margin:0,padding:0,top:0,left:0,width:"100%",height:"100%"});a.appendChild(f);a===document.body&&(f.style.position="absolute",L(a.style,
{margin:0,padding:0}));var d;a!==document.body&&"function"===typeof ResizeObserver?(d=new ResizeObserver(function(){setTimeout(e)}),d.observe(a)):window.addEventListener("resize",e,!1);e();return{canvas:f,onDestroy:function(){d?d.disconnect():window.removeEventListener("resize",e);a.removeChild(f)}}}function Gb(a,b){function c(c){try{return a.getContext(c,b)}catch(f){return null}}return c("webgl")||c("experimental-webgl")||c("webgl-experimental")}function eb(a){return"string"===typeof a?a.split():
a}function fb(a){return"string"===typeof a?document.querySelector(a):a}function Hb(a){var b=a||{},c,e,f,d;a={};var q=[],n=[],v="undefined"===typeof window?1:window.devicePixelRatio,k=!1,u=function(a){},m=function(){};"string"===typeof b?c=document.querySelector(b):"object"===typeof b&&("string"===typeof b.nodeName&&"function"===typeof b.appendChild&&"function"===typeof b.getBoundingClientRect?c=b:"function"===typeof b.drawArrays||"function"===typeof b.drawElements?(d=b,f=d.canvas):("gl"in b?d=b.gl:
"canvas"in b?f=fb(b.canvas):"container"in b&&(e=fb(b.container)),"attributes"in b&&(a=b.attributes),"extensions"in b&&(q=eb(b.extensions)),"optionalExtensions"in b&&(n=eb(b.optionalExtensions)),"onDone"in b&&(u=b.onDone),"profile"in b&&(k=!!b.profile),"pixelRatio"in b&&(v=+b.pixelRatio)));c&&("canvas"===c.nodeName.toLowerCase()?f=c:e=c);if(!d){if(!f){c=Fb(e||document.body,u,v);if(!c)return null;f=c.canvas;m=c.onDestroy}void 0===a.premultipliedAlpha&&(a.premultipliedAlpha=!0);d=Gb(f,a)}return d?{gl:d,
canvas:f,container:e,extensions:q,optionalExtensions:n,pixelRatio:v,profile:k,onDone:u,onDestroy:m}:(m(),u("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"),null)}function Ib(a,b){function c(b){b=b.toLowerCase();var c;try{c=e[b]=a.getExtension(b)}catch(f){}return!!c}for(var e={},f=0;f<b.extensions.length;++f){var d=b.extensions[f];if(!c(d))return b.onDestroy(),b.onDone('"'+d+'" extension is not supported by the current WebGL context, try upgrading your system or a different browser'),
null}b.optionalExtensions.forEach(c);return{extensions:e,restore:function(){Object.keys(e).forEach(function(a){if(e[a]&&!c(a))throw Error("(regl): error restoring extension "+a);})}}}function R(a,b){for(var c=Array(a),e=0;e<a;++e)c[e]=b(e);return c}function gb(a){var b,c;b=(65535<a)<<4;a>>>=b;c=(255<a)<<3;a>>>=c;b|=c;c=(15<a)<<2;a>>>=c;b|=c;c=(3<a)<<1;return b|c|a>>>c>>1}function hb(){function a(a){a:{for(var b=16;268435456>=b;b*=16)if(a<=b){a=b;break a}a=0}b=c[gb(a)>>2];return 0<b.length?b.pop():
new ArrayBuffer(a)}function b(a){c[gb(a.byteLength)>>2].push(a)}var c=R(8,function(){return[]});return{alloc:a,free:b,allocType:function(b,c){var d=null;switch(b){case 5120:d=new Int8Array(a(c),0,c);break;case 5121:d=new Uint8Array(a(c),0,c);break;case 5122:d=new Int16Array(a(2*c),0,c);break;case 5123:d=new Uint16Array(a(2*c),0,c);break;case 5124:d=new Int32Array(a(4*c),0,c);break;case 5125:d=new Uint32Array(a(4*c),0,c);break;case 5126:d=new Float32Array(a(4*c),0,c);break;default:return null}return d.length!==
c?d.subarray(0,c):d},freeType:function(a){b(a.buffer)}}}function la(a){return!!a&&"object"===typeof a&&Array.isArray(a.shape)&&Array.isArray(a.stride)&&"number"===typeof a.offset&&a.shape.length===a.stride.length&&(Array.isArray(a.data)||O(a.data))}function ib(a,b,c,e,f,d){for(var q=0;q<b;++q)for(var n=a[q],v=0;v<c;++v)for(var k=n[v],u=0;u<e;++u)f[d++]=k[u]}function jb(a,b,c,e,f){for(var d=1,q=c+1;q<b.length;++q)d*=b[q];var n=b[c];if(4===b.length-c){var v=b[c+1],k=b[c+2];b=b[c+3];for(q=0;q<n;++q)ib(a[q],
v,k,b,e,f),f+=d}else for(q=0;q<n;++q)jb(a[q],b,c+1,e,f),f+=d}function Ha(a){return Ia[Object.prototype.toString.call(a)]|0}function kb(a,b){for(var c=0;c<b.length;++c)a[c]=b[c]}function lb(a,b,c,e,f,d,q){for(var n=0,v=0;v<c;++v)for(var k=0;k<e;++k)a[n++]=b[f*v+d*k+q]}function Jb(a,b,c,e){function f(b){this.id=v++;this.buffer=a.createBuffer();this.type=b;this.usage=35044;this.byteLength=0;this.dimension=1;this.dtype=5121;this.persistentData=null;c.profile&&(this.stats={size:0})}function d(b,c,l){b.byteLength=
c.byteLength;a.bufferData(b.type,c,l)}function q(a,b,c,g,h,r){a.usage=c;if(Array.isArray(b)){if(a.dtype=g||5126,0<b.length)if(Array.isArray(b[0])){h=mb(b);for(var p=g=1;p<h.length;++p)g*=h[p];a.dimension=g;b=Ua(b,h,a.dtype);d(a,b,c);r?a.persistentData=b:G.freeType(b)}else"number"===typeof b[0]?(a.dimension=h,h=G.allocType(a.dtype,b.length),kb(h,b),d(a,h,c),r?a.persistentData=h:G.freeType(h)):O(b[0])&&(a.dimension=b[0].length,a.dtype=g||Ha(b[0])||5126,b=Ua(b,[b.length,b[0].length],a.dtype),d(a,b,c),
r?a.persistentData=b:G.freeType(b))}else if(O(b))a.dtype=g||Ha(b),a.dimension=h,d(a,b,c),r&&(a.persistentData=new Uint8Array(new Uint8Array(b.buffer)));else if(la(b)){h=b.shape;var e=b.stride,p=b.offset,t=0,ma=0,f=0,k=0;1===h.length?(t=h[0],ma=1,f=e[0],k=0):2===h.length&&(t=h[0],ma=h[1],f=e[0],k=e[1]);a.dtype=g||Ha(b.data)||5126;a.dimension=ma;h=G.allocType(a.dtype,t*ma);lb(h,b.data,t,ma,f,k,p);d(a,h,c);r?a.persistentData=h:G.freeType(h)}else b instanceof ArrayBuffer&&(a.dtype=5121,a.dimension=h,
d(a,b,c),r&&(a.persistentData=new Uint8Array(new Uint8Array(b))))}function n(c){b.bufferCount--;e(c);a.deleteBuffer(c.buffer);c.buffer=null;delete k[c.id]}var v=0,k={};f.prototype.bind=function(){a.bindBuffer(this.type,this.buffer)};f.prototype.destroy=function(){n(this)};var u=[];c.profile&&(b.getTotalBufferSize=function(){var a=0;Object.keys(k).forEach(function(b){a+=k[b].stats.size});return a});return{create:function(m,e,d,g){function h(b){var e=35044,t=null,d=0,m=0,f=1;Array.isArray(b)||O(b)||
la(b)||b instanceof ArrayBuffer?t=b:"number"===typeof b?d=b|0:b&&("data"in b&&(t=b.data),"usage"in b&&(e=nb[b.usage]),"type"in b&&(m=Ja[b.type]),"dimension"in b&&(f=b.dimension|0),"length"in b&&(d=b.length|0));r.bind();t?q(r,t,e,m,f,g):(d&&a.bufferData(r.type,d,e),r.dtype=m||5121,r.usage=e,r.dimension=f,r.byteLength=d);c.profile&&(r.stats.size=r.byteLength*na[r.dtype]);return h}b.bufferCount++;var r=new f(e);k[r.id]=r;d||h(m);h._reglType="buffer";h._buffer=r;h.subdata=function(b,c){var t=(c||0)|0,
d;r.bind();if(O(b)||b instanceof ArrayBuffer)a.bufferSubData(r.type,t,b);else if(Array.isArray(b)){if(0<b.length)if("number"===typeof b[0]){var e=G.allocType(r.dtype,b.length);kb(e,b);a.bufferSubData(r.type,t,e);G.freeType(e)}else if(Array.isArray(b[0])||O(b[0]))d=mb(b),e=Ua(b,d,r.dtype),a.bufferSubData(r.type,t,e),G.freeType(e)}else if(la(b)){d=b.shape;var m=b.stride,g=e=0,f=0,y=0;1===d.length?(e=d[0],g=1,f=m[0],y=0):2===d.length&&(e=d[0],g=d[1],f=m[0],y=m[1]);d=Array.isArray(b.data)?r.dtype:Ha(b.data);
d=G.allocType(d,e*g);lb(d,b.data,e,g,f,y,b.offset);a.bufferSubData(r.type,t,d);G.freeType(d)}return h};c.profile&&(h.stats=r.stats);h.destroy=function(){n(r)};return h},createStream:function(a,b){var c=u.pop();c||(c=new f(a));c.bind();q(c,b,35040,0,1,!1);return c},destroyStream:function(a){u.push(a)},clear:function(){I(k).forEach(n);u.forEach(n)},getBuffer:function(a){return a&&a._buffer instanceof f?a._buffer:null},restore:function(){I(k).forEach(function(b){b.buffer=a.createBuffer();a.bindBuffer(b.type,
b.buffer);a.bufferData(b.type,b.persistentData||b.byteLength,b.usage)})},_initBuffer:q}}function Kb(a,b,c,e){function f(a){this.id=v++;n[this.id]=this;this.buffer=a;this.primType=4;this.type=this.vertCount=0}function d(d,e,f,g,h,r,p){d.buffer.bind();var k;e?((k=p)||O(e)&&(!la(e)||O(e.data))||(k=b.oes_element_index_uint?5125:5123),c._initBuffer(d.buffer,e,f,k,3)):(a.bufferData(34963,r,f),d.buffer.dtype=k||5121,d.buffer.usage=f,d.buffer.dimension=3,d.buffer.byteLength=r);k=p;if(!p){switch(d.buffer.dtype){case 5121:case 5120:k=
5121;break;case 5123:case 5122:k=5123;break;case 5125:case 5124:k=5125}d.buffer.dtype=k}d.type=k;e=h;0>e&&(e=d.buffer.byteLength,5123===k?e>>=1:5125===k&&(e>>=2));d.vertCount=e;e=g;0>g&&(e=4,g=d.buffer.dimension,1===g&&(e=0),2===g&&(e=1),3===g&&(e=4));d.primType=e}function q(a){e.elementsCount--;delete n[a.id];a.buffer.destroy();a.buffer=null}var n={},v=0,k={uint8:5121,uint16:5123};b.oes_element_index_uint&&(k.uint32=5125);f.prototype.bind=function(){this.buffer.bind()};var u=[];return{create:function(a,
b){function l(a){if(a)if("number"===typeof a)g(a),h.primType=4,h.vertCount=a|0,h.type=5121;else{var b=null,c=35044,e=-1,f=-1,m=0,n=0;if(Array.isArray(a)||O(a)||la(a))b=a;else if("data"in a&&(b=a.data),"usage"in a&&(c=nb[a.usage]),"primitive"in a&&(e=Ka[a.primitive]),"count"in a&&(f=a.count|0),"type"in a&&(n=k[a.type]),"length"in a)m=a.length|0;else if(m=f,5123===n||5122===n)m*=2;else if(5125===n||5124===n)m*=4;d(h,b,c,e,f,m,n)}else g(),h.primType=4,h.vertCount=0,h.type=5121;return l}var g=c.create(null,
34963,!0),h=new f(g._buffer);e.elementsCount++;l(a);l._reglType="elements";l._elements=h;l.subdata=function(a,b){g.subdata(a,b);return l};l.destroy=function(){q(h)};return l},createStream:function(a){var b=u.pop();b||(b=new f(c.create(null,34963,!0,!1)._buffer));d(b,a,35040,-1,-1,0,0);return b},destroyStream:function(a){u.push(a)},getElements:function(a){return"function"===typeof a&&a._elements instanceof f?a._elements:null},clear:function(){I(n).forEach(q)}}}function ob(a){for(var b=G.allocType(5123,
a.length),c=0;c<a.length;++c)if(isNaN(a[c]))b[c]=65535;else if(Infinity===a[c])b[c]=31744;else if(-Infinity===a[c])b[c]=64512;else{pb[0]=a[c];var e=Lb[0],f=e>>>31<<15,d=(e<<1>>>24)-127,e=e>>13&1023;b[c]=-24>d?f:-14>d?f+(e+1024>>-14-d):15<d?f+31744:f+(d+15<<10)+e}return b}function ra(a){return Array.isArray(a)||O(a)}function sa(a){return"[object "+a+"]"}function qb(a){return Array.isArray(a)&&(0===a.length||"number"===typeof a[0])}function rb(a){return Array.isArray(a)&&0!==a.length&&ra(a[0])?!0:!1}
function aa(a){return Object.prototype.toString.call(a)}function Va(a){if(!a)return!1;var b=aa(a);return 0<=Mb.indexOf(b)?!0:qb(a)||rb(a)||la(a)}function sb(a,b){36193===a.type?(a.data=ob(b),G.freeType(b)):a.data=b}function La(a,b,c,e,f,d){a="undefined"!==typeof C[a]?C[a]:U[a]*za[b];d&&(a*=6);if(f){for(e=0;1<=c;)e+=a*c*c,c/=2;return e}return a*c*e}function Nb(a,b,c,e,f,d,q){function n(){this.format=this.internalformat=6408;this.type=5121;this.flipY=this.premultiplyAlpha=this.compressed=!1;this.unpackAlignment=
1;this.colorSpace=37444;this.channels=this.height=this.width=0}function v(a,b){a.internalformat=b.internalformat;a.format=b.format;a.type=b.type;a.compressed=b.compressed;a.premultiplyAlpha=b.premultiplyAlpha;a.flipY=b.flipY;a.unpackAlignment=b.unpackAlignment;a.colorSpace=b.colorSpace;a.width=b.width;a.height=b.height;a.channels=b.channels}function k(a,b){if("object"===typeof b&&b){"premultiplyAlpha"in b&&(a.premultiplyAlpha=b.premultiplyAlpha);"flipY"in b&&(a.flipY=b.flipY);"alignment"in b&&(a.unpackAlignment=
b.alignment);"colorSpace"in b&&(a.colorSpace=Ob[b.colorSpace]);"type"in b&&(a.type=N[b.type]);var c=a.width,e=a.height,d=a.channels,f=!1;"shape"in b?(c=b.shape[0],e=b.shape[1],3===b.shape.length&&(d=b.shape[2],f=!0)):("radius"in b&&(c=e=b.radius),"width"in b&&(c=b.width),"height"in b&&(e=b.height),"channels"in b&&(d=b.channels,f=!0));a.width=c|0;a.height=e|0;a.channels=d|0;c=!1;"format"in b&&(c=b.format,e=a.internalformat=E[c],a.format=V[e],c in N&&!("type"in b)&&(a.type=N[c]),c in ga&&(a.compressed=
!0),c=!0);!f&&c?a.channels=U[a.format]:f&&!c&&a.channels!==Oa[a.format]&&(a.format=a.internalformat=Oa[a.channels])}}function u(b){a.pixelStorei(37440,b.flipY);a.pixelStorei(37441,b.premultiplyAlpha);a.pixelStorei(37443,b.colorSpace);a.pixelStorei(3317,b.unpackAlignment)}function m(){n.call(this);this.yOffset=this.xOffset=0;this.data=null;this.needsFree=!1;this.element=null;this.needsCopy=!1}function x(a,b){var c=null;Va(b)?c=b:b&&(k(a,b),"x"in b&&(a.xOffset=b.x|0),"y"in b&&(a.yOffset=b.y|0),Va(b.data)&&
(c=b.data));if(b.copy){var e=f.viewportWidth,d=f.viewportHeight;a.width=a.width||e-a.xOffset;a.height=a.height||d-a.yOffset;a.needsCopy=!0}else if(!c)a.width=a.width||1,a.height=a.height||1,a.channels=a.channels||4;else if(O(c))a.channels=a.channels||4,a.data=c,"type"in b||5121!==a.type||(a.type=Ia[Object.prototype.toString.call(c)]|0);else if(qb(c)){a.channels=a.channels||4;e=c;d=e.length;switch(a.type){case 5121:case 5123:case 5125:case 5126:d=G.allocType(a.type,d);d.set(e);a.data=d;break;case 36193:a.data=
ob(e)}a.alignment=1;a.needsFree=!0}else if(la(c)){e=c.data;Array.isArray(e)||5121!==a.type||(a.type=Ia[Object.prototype.toString.call(e)]|0);var d=c.shape,h=c.stride,y,t,g,p;3===d.length?(g=d[2],p=h[2]):p=g=1;y=d[0];t=d[1];d=h[0];h=h[1];a.alignment=1;a.width=y;a.height=t;a.channels=g;a.format=a.internalformat=Oa[g];a.needsFree=!0;y=p;c=c.offset;g=a.width;p=a.height;t=a.channels;for(var z=G.allocType(36193===a.type?5126:a.type,g*p*t),B=0,ha=0;ha<p;++ha)for(var oa=0;oa<g;++oa)for(var Wa=0;Wa<t;++Wa)z[B++]=
e[d*oa+h*ha+y*Wa+c];sb(a,z)}else if(aa(c)===Xa||aa(c)===Ya||aa(c)===ub)aa(c)===Xa||aa(c)===Ya?a.element=c:a.element=c.canvas,a.width=a.element.width,a.height=a.element.height,a.channels=4;else if(aa(c)===vb)a.element=c,a.width=c.width,a.height=c.height,a.channels=4;else if(aa(c)===wb)a.element=c,a.width=c.naturalWidth,a.height=c.naturalHeight,a.channels=4;else if(aa(c)===xb)a.element=c,a.width=c.videoWidth,a.height=c.videoHeight,a.channels=4;else if(rb(c)){e=a.width||c[0].length;d=a.height||c.length;
h=a.channels;h=ra(c[0][0])?h||c[0][0].length:h||1;y=Qa.shape(c);g=1;for(p=0;p<y.length;++p)g*=y[p];g=G.allocType(36193===a.type?5126:a.type,g);Qa.flatten(c,y,"",g);sb(a,g);a.alignment=1;a.width=e;a.height=d;a.channels=h;a.format=a.internalformat=Oa[h];a.needsFree=!0}}function l(b,c,d,h,g){var y=b.element,f=b.data,p=b.internalformat,t=b.format,k=b.type,z=b.width,B=b.height;u(b);y?a.texSubImage2D(c,g,d,h,t,k,y):b.compressed?a.compressedTexSubImage2D(c,g,d,h,p,z,B,f):b.needsCopy?(e(),a.copyTexSubImage2D(c,
g,d,h,b.xOffset,b.yOffset,z,B)):a.texSubImage2D(c,g,d,h,z,B,t,k,f)}function g(){return R.pop()||new m}function h(a){a.needsFree&&G.freeType(a.data);m.call(a);R.push(a)}function r(){n.call(this);this.genMipmaps=!1;this.mipmapHint=4352;this.mipmask=0;this.images=Array(16)}function p(a,b,c){var d=a.images[0]=g();a.mipmask=1;d.width=a.width=b;d.height=a.height=c;d.channels=a.channels=4}function P(a,b){var c=null;if(Va(b))c=a.images[0]=g(),v(c,a),x(c,b),a.mipmask=1;else if(k(a,b),Array.isArray(b.mipmap))for(var d=
b.mipmap,e=0;e<d.length;++e)c=a.images[e]=g(),v(c,a),c.width>>=e,c.height>>=e,x(c,d[e]),a.mipmask|=1<<e;else c=a.images[0]=g(),v(c,a),x(c,b),a.mipmask=1;v(a,a.images[0])}function t(b,c){for(var d=b.images,h=0;h<d.length&&d[h];++h){var g=d[h],y=c,f=h,p=g.element,t=g.data,k=g.internalformat,z=g.format,B=g.type,ha=g.width,oa=g.height;u(g);p?a.texImage2D(y,f,z,z,B,p):g.compressed?a.compressedTexImage2D(y,f,k,ha,oa,0,t):g.needsCopy?(e(),a.copyTexImage2D(y,f,z,g.xOffset,g.yOffset,ha,oa,0)):a.texImage2D(y,
f,z,ha,oa,0,z,B,t||null)}}function ma(){var a=Y.pop()||new r;n.call(a);for(var b=a.mipmask=0;16>b;++b)a.images[b]=null;return a}function ya(a){for(var b=a.images,c=0;c<b.length;++c)b[c]&&h(b[c]),b[c]=null;Y.push(a)}function w(){this.magFilter=this.minFilter=9728;this.wrapT=this.wrapS=33071;this.anisotropic=1;this.genMipmaps=!1;this.mipmapHint=4352}function H(a,b){"min"in b&&(a.minFilter=Aa[b.min],0<=Pb.indexOf(a.minFilter)&&!("faces"in b)&&(a.genMipmaps=!0));"mag"in b&&(a.magFilter=S[b.mag]);var c=
a.wrapS,d=a.wrapT;if("wrap"in b){var e=b.wrap;"string"===typeof e?c=d=ia[e]:Array.isArray(e)&&(c=ia[e[0]],d=ia[e[1]])}else"wrapS"in b&&(c=ia[b.wrapS]),"wrapT"in b&&(d=ia[b.wrapT]);a.wrapS=c;a.wrapT=d;"anisotropic"in b&&(a.anisotropic=b.anisotropic);if("mipmap"in b){c=!1;switch(typeof b.mipmap){case "string":a.mipmapHint=A[b.mipmap];c=a.genMipmaps=!0;break;case "boolean":c=a.genMipmaps=b.mipmap;break;case "object":a.genMipmaps=!1,c=!0}!c||"min"in b||(a.minFilter=9984)}}function M(c,d){a.texParameteri(d,
10241,c.minFilter);a.texParameteri(d,10240,c.magFilter);a.texParameteri(d,10242,c.wrapS);a.texParameteri(d,10243,c.wrapT);b.ext_texture_filter_anisotropic&&a.texParameteri(d,34046,c.anisotropic);c.genMipmaps&&(a.hint(33170,c.mipmapHint),a.generateMipmap(d))}function y(b){n.call(this);this.mipmask=0;this.internalformat=6408;this.id=Qb++;this.refCount=1;this.target=b;this.texture=a.createTexture();this.unit=-1;this.bindCount=0;this.texInfo=new w;q.profile&&(this.stats={size:0})}function T(b){a.activeTexture(33984);
a.bindTexture(b.target,b.texture)}function wa(){var b=W[0];b?a.bindTexture(b.target,b.texture):a.bindTexture(3553,null)}function F(b){var c=b.texture,e=b.unit,g=b.target;0<=e&&(a.activeTexture(33984+e),a.bindTexture(g,null),W[e]=null);a.deleteTexture(c);b.texture=null;b.params=null;b.pixels=null;b.refCount=0;delete ea[b.id];d.textureCount--}var A={"don't care":4352,"dont care":4352,nice:4354,fast:4353},ia={repeat:10497,clamp:33071,mirror:33648},S={nearest:9728,linear:9729},Aa=L({mipmap:9987,"nearest mipmap nearest":9984,
"linear mipmap nearest":9985,"nearest mipmap linear":9986,"linear mipmap linear":9987},S),Ob={none:0,browser:37444},N={uint8:5121,rgba4:32819,rgb565:33635,"rgb5 a1":32820},E={alpha:6406,luminance:6409,"luminance alpha":6410,rgb:6407,rgba:6408,rgba4:32854,"rgb5 a1":32855,rgb565:36194},ga={};b.ext_srgb&&(E.srgb=35904,E.srgba=35906);b.oes_texture_float&&(N.float32=N["float"]=5126);b.oes_texture_half_float&&(N.float16=N["half float"]=36193);b.webgl_depth_texture&&(L(E,{depth:6402,"depth stencil":34041}),
L(N,{uint16:5123,uint32:5125,"depth stencil":34042}));b.webgl_compressed_texture_s3tc&&L(ga,{"rgb s3tc dxt1":33776,"rgba s3tc dxt1":33777,"rgba s3tc dxt3":33778,"rgba s3tc dxt5":33779});b.webgl_compressed_texture_atc&&L(ga,{"rgb atc":35986,"rgba atc explicit alpha":35987,"rgba atc interpolated alpha":34798});b.webgl_compressed_texture_pvrtc&&L(ga,{"rgb pvrtc 4bppv1":35840,"rgb pvrtc 2bppv1":35841,"rgba pvrtc 4bppv1":35842,"rgba pvrtc 2bppv1":35843});b.webgl_compressed_texture_etc1&&(ga["rgb etc1"]=
36196);var J=Array.prototype.slice.call(a.getParameter(34467));Object.keys(ga).forEach(function(a){var b=ga[a];0<=J.indexOf(b)&&(E[a]=b)});var C=Object.keys(E);c.textureFormats=C;var ca=[];Object.keys(E).forEach(function(a){ca[E[a]]=a});var K=[];Object.keys(N).forEach(function(a){K[N[a]]=a});var Fa=[];Object.keys(S).forEach(function(a){Fa[S[a]]=a});var pa=[];Object.keys(Aa).forEach(function(a){pa[Aa[a]]=a});var qa=[];Object.keys(ia).forEach(function(a){qa[ia[a]]=a});var V=C.reduce(function(a,c){var d=
E[c];6409===d||6406===d||6409===d||6410===d||6402===d||34041===d||b.ext_srgb&&(35904===d||35906===d)?a[d]=d:32855===d||0<=c.indexOf("rgba")?a[d]=6408:a[d]=6407;return a},{}),R=[],Y=[],Qb=0,ea={},fa=c.maxTextureUnits,W=Array(fa).map(function(){return null});L(y.prototype,{bind:function(){this.bindCount+=1;var b=this.unit;if(0>b){for(var c=0;c<fa;++c){var e=W[c];if(e){if(0<e.bindCount)continue;e.unit=-1}W[c]=this;b=c;break}q.profile&&d.maxTextureUnits<b+1&&(d.maxTextureUnits=b+1);this.unit=b;a.activeTexture(33984+
b);a.bindTexture(this.target,this.texture)}return b},unbind:function(){--this.bindCount},decRef:function(){0>=--this.refCount&&F(this)}});q.profile&&(d.getTotalTextureSize=function(){var a=0;Object.keys(ea).forEach(function(b){a+=ea[b].stats.size});return a});return{create2D:function(b,c){function e(a,b){var c=f.texInfo;w.call(c);var d=ma();"number"===typeof a?"number"===typeof b?p(d,a|0,b|0):p(d,a|0,a|0):a?(H(c,a),P(d,a)):p(d,1,1);c.genMipmaps&&(d.mipmask=(d.width<<1)-1);f.mipmask=d.mipmask;v(f,
d);f.internalformat=d.internalformat;e.width=d.width;e.height=d.height;T(f);t(d,3553);M(c,3553);wa();ya(d);q.profile&&(f.stats.size=La(f.internalformat,f.type,d.width,d.height,c.genMipmaps,!1));e.format=ca[f.internalformat];e.type=K[f.type];e.mag=Fa[c.magFilter];e.min=pa[c.minFilter];e.wrapS=qa[c.wrapS];e.wrapT=qa[c.wrapT];return e}var f=new y(3553);ea[f.id]=f;d.textureCount++;e(b,c);e.subimage=function(a,b,c,d){b|=0;c|=0;d|=0;var y=g();v(y,f);y.width=0;y.height=0;x(y,a);y.width=y.width||(f.width>>
d)-b;y.height=y.height||(f.height>>d)-c;T(f);l(y,3553,b,c,d);wa();h(y);return e};e.resize=function(b,c){var d=b|0,g=c|0||d;if(d===f.width&&g===f.height)return e;e.width=f.width=d;e.height=f.height=g;T(f);for(var y=0;f.mipmask>>y;++y){var h=d>>y,z=g>>y;if(!h||!z)break;a.texImage2D(3553,y,f.format,h,z,0,f.format,f.type,null)}wa();q.profile&&(f.stats.size=La(f.internalformat,f.type,d,g,!1,!1));return e};e._reglType="texture2d";e._texture=f;q.profile&&(e.stats=f.stats);e.destroy=function(){f.decRef()};
return e},createCube:function(b,c,e,f,n,r){function m(a,b,c,d,e,f){var g,da=A.texInfo;w.call(da);for(g=0;6>g;++g)F[g]=ma();if("number"===typeof a||!a)for(a=a|0||1,g=0;6>g;++g)p(F[g],a,a);else if("object"===typeof a)if(b)P(F[0],a),P(F[1],b),P(F[2],c),P(F[3],d),P(F[4],e),P(F[5],f);else if(H(da,a),k(A,a),"faces"in a)for(a=a.faces,g=0;6>g;++g)v(F[g],A),P(F[g],a[g]);else for(g=0;6>g;++g)P(F[g],a);v(A,F[0]);A.mipmask=da.genMipmaps?(F[0].width<<1)-1:F[0].mipmask;A.internalformat=F[0].internalformat;m.width=
F[0].width;m.height=F[0].height;T(A);for(g=0;6>g;++g)t(F[g],34069+g);M(da,34067);wa();q.profile&&(A.stats.size=La(A.internalformat,A.type,m.width,m.height,da.genMipmaps,!0));m.format=ca[A.internalformat];m.type=K[A.type];m.mag=Fa[da.magFilter];m.min=pa[da.minFilter];m.wrapS=qa[da.wrapS];m.wrapT=qa[da.wrapT];for(g=0;6>g;++g)ya(F[g]);return m}var A=new y(34067);ea[A.id]=A;d.cubeCount++;var F=Array(6);m(b,c,e,f,n,r);m.subimage=function(a,b,c,d,e){c|=0;d|=0;e|=0;var f=g();v(f,A);f.width=0;f.height=0;
x(f,b);f.width=f.width||(A.width>>e)-c;f.height=f.height||(A.height>>e)-d;T(A);l(f,34069+a,c,d,e);wa();h(f);return m};m.resize=function(b){b|=0;if(b!==A.width){m.width=A.width=b;m.height=A.height=b;T(A);for(var c=0;6>c;++c)for(var d=0;A.mipmask>>d;++d)a.texImage2D(34069+c,d,A.format,b>>d,b>>d,0,A.format,A.type,null);wa();q.profile&&(A.stats.size=La(A.internalformat,A.type,m.width,m.height,!1,!0));return m}};m._reglType="textureCube";m._texture=A;q.profile&&(m.stats=A.stats);m.destroy=function(){A.decRef()};
return m},clear:function(){for(var b=0;b<fa;++b)a.activeTexture(33984+b),a.bindTexture(3553,null),W[b]=null;I(ea).forEach(F);d.cubeCount=0;d.textureCount=0},getTexture:function(a){return null},restore:function(){for(var b=0;b<fa;++b){var c=W[b];c&&(c.bindCount=0,c.unit=-1,W[b]=null)}I(ea).forEach(function(b){b.texture=a.createTexture();a.bindTexture(b.target,b.texture);for(var c=0;32>c;++c)if(0!==(b.mipmask&1<<c))if(3553===b.target)a.texImage2D(3553,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,
b.type,null);else for(var d=0;6>d;++d)a.texImage2D(34069+d,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,b.type,null);M(b.texInfo,b.target)})},refresh:function(){for(var b=0;b<fa;++b){var c=W[b];c&&(c.bindCount=0,c.unit=-1,W[b]=null);a.activeTexture(33984+b);a.bindTexture(3553,null);a.bindTexture(34067,null)}}}}function Rb(a,b,c,e,f,d){function q(a,b,c){this.target=a;this.texture=b;this.renderbuffer=c;var d=a=0;b?(a=b.width,d=b.height):c&&(a=c.width,d=c.height);this.width=a;this.height=
d}function n(a){a&&(a.texture&&a.texture._texture.decRef(),a.renderbuffer&&a.renderbuffer._renderbuffer.decRef())}function v(a,b,c){a&&(a.texture?a.texture._texture.refCount+=1:a.renderbuffer._renderbuffer.refCount+=1)}function k(b,c){c&&(c.texture?a.framebufferTexture2D(36160,b,c.target,c.texture._texture.texture,0):a.framebufferRenderbuffer(36160,b,36161,c.renderbuffer._renderbuffer.renderbuffer))}function u(a){var b=3553,c=null,d=null,e=a;"object"===typeof a&&(e=a.data,"target"in a&&(b=a.target|
0));a=e._reglType;"texture2d"===a?c=e:"textureCube"===a?c=e:"renderbuffer"===a&&(d=e,b=36161);return new q(b,c,d)}function m(a,b,c,d,g){if(c)return a=e.create2D({width:a,height:b,format:d,type:g}),a._texture.refCount=0,new q(3553,a,null);a=f.create({width:a,height:b,format:d});a._renderbuffer.refCount=0;return new q(36161,null,a)}function x(a){return a&&(a.texture||a.renderbuffer)}function l(a,b,c){a&&(a.texture?a.texture.resize(b,c):a.renderbuffer&&a.renderbuffer.resize(b,c),a.width=b,a.height=c)}
function g(){this.id=H++;M[this.id]=this;this.framebuffer=a.createFramebuffer();this.height=this.width=0;this.colorAttachments=[];this.depthStencilAttachment=this.stencilAttachment=this.depthAttachment=null}function h(a){a.colorAttachments.forEach(n);n(a.depthAttachment);n(a.stencilAttachment);n(a.depthStencilAttachment)}function r(b){a.deleteFramebuffer(b.framebuffer);b.framebuffer=null;d.framebufferCount--;delete M[b.id]}function p(b){var d;a.bindFramebuffer(36160,b.framebuffer);var e=b.colorAttachments;
for(d=0;d<e.length;++d)k(36064+d,e[d]);for(d=e.length;d<c.maxColorAttachments;++d)a.framebufferTexture2D(36160,36064+d,3553,null,0);a.framebufferTexture2D(36160,33306,3553,null,0);a.framebufferTexture2D(36160,36096,3553,null,0);a.framebufferTexture2D(36160,36128,3553,null,0);k(36096,b.depthAttachment);k(36128,b.stencilAttachment);k(33306,b.depthStencilAttachment);a.checkFramebufferStatus(36160);a.isContextLost();a.bindFramebuffer(36160,t.next?t.next.framebuffer:null);t.cur=t.next;a.getError()}function P(a,
b){function c(a,b){var d,g=0,f=0,t=!0,k=!0;d=null;var l=!0,n="rgba",r="uint8",y=1,q=null,P=null,pa=null,M=!1;if("number"===typeof a)g=a|0,f=b|0||g;else if(a){"shape"in a?(f=a.shape,g=f[0],f=f[1]):("radius"in a&&(g=f=a.radius),"width"in a&&(g=a.width),"height"in a&&(f=a.height));if("color"in a||"colors"in a)d=a.color||a.colors,Array.isArray(d);if(!d){"colorCount"in a&&(y=a.colorCount|0);"colorTexture"in a&&(l=!!a.colorTexture,n="rgba4");if("colorType"in a&&(r=a.colorType,!l))if("half float"===r||"float16"===
r)n="rgba16f";else if("float"===r||"float32"===r)n="rgba32f";"colorFormat"in a&&(n=a.colorFormat,0<=ma.indexOf(n)?l=!0:0<=ya.indexOf(n)&&(l=!1))}if("depthTexture"in a||"depthStencilTexture"in a)M=!(!a.depthTexture&&!a.depthStencilTexture);"depth"in a&&("boolean"===typeof a.depth?t=a.depth:(q=a.depth,k=!1));"stencil"in a&&("boolean"===typeof a.stencil?k=a.stencil:(P=a.stencil,t=!1));"depthStencil"in a&&("boolean"===typeof a.depthStencil?t=k=a.depthStencil:(pa=a.depthStencil,k=t=!1))}else g=f=1;var V=
null,H=null,T=null,w=null;if(Array.isArray(d))V=d.map(u);else if(d)V=[u(d)];else for(V=Array(y),d=0;d<y;++d)V[d]=m(g,f,l,n,r);g=g||V[0].width;f=f||V[0].height;q?H=u(q):t&&!k&&(H=m(g,f,M,"depth","uint32"));P?T=u(P):k&&!t&&(T=m(g,f,!1,"stencil","uint8"));pa?w=u(pa):!q&&!P&&k&&t&&(w=m(g,f,M,"depth stencil","depth stencil"));t=null;for(d=0;d<V.length;++d)v(V[d],g,f),V[d]&&V[d].texture&&(k=Za[V[d].texture._texture.format]*Ra[V[d].texture._texture.type],null===t&&(t=k));v(H,g,f);v(T,g,f);v(w,g,f);h(e);
e.width=g;e.height=f;e.colorAttachments=V;e.depthAttachment=H;e.stencilAttachment=T;e.depthStencilAttachment=w;c.color=V.map(x);c.depth=x(H);c.stencil=x(T);c.depthStencil=x(w);c.width=e.width;c.height=e.height;p(e);return c}var e=new g;d.framebufferCount++;c(a,b);return L(c,{resize:function(a,b){var d=Math.max(a|0,1),g=Math.max(b|0||d,1);if(d===e.width&&g===e.height)return c;for(var f=e.colorAttachments,h=0;h<f.length;++h)l(f[h],d,g);l(e.depthAttachment,d,g);l(e.stencilAttachment,d,g);l(e.depthStencilAttachment,
d,g);e.width=c.width=d;e.height=c.height=g;p(e);return c},_reglType:"framebuffer",_framebuffer:e,destroy:function(){r(e);h(e)},use:function(a){t.setFBO({framebuffer:c},a)}})}var t={cur:null,next:null,dirty:!1,setFBO:null},ma=["rgba"],ya=["rgba4","rgb565","rgb5 a1"];b.ext_srgb&&ya.push("srgba");b.ext_color_buffer_half_float&&ya.push("rgba16f","rgb16f");b.webgl_color_buffer_float&&ya.push("rgba32f");var w=["uint8"];b.oes_texture_half_float&&w.push("half float","float16");b.oes_texture_float&&w.push("float",
"float32");var H=0,M={};return L(t,{getFramebuffer:function(a){return"function"===typeof a&&"framebuffer"===a._reglType&&(a=a._framebuffer,a instanceof g)?a:null},create:P,createCube:function(a){function b(a){var d,g={color:null},f=0,h=null;d="rgba";var t="uint8",p=1;if("number"===typeof a)f=a|0;else if(a){"shape"in a?f=a.shape[0]:("radius"in a&&(f=a.radius|0),"width"in a?f=a.width|0:"height"in a&&(f=a.height|0));if("color"in a||"colors"in a)h=a.color||a.colors,Array.isArray(h);h||("colorCount"in
a&&(p=a.colorCount|0),"colorType"in a&&(t=a.colorType),"colorFormat"in a&&(d=a.colorFormat));"depth"in a&&(g.depth=a.depth);"stencil"in a&&(g.stencil=a.stencil);"depthStencil"in a&&(g.depthStencil=a.depthStencil)}else f=1;if(h)if(Array.isArray(h))for(a=[],d=0;d<h.length;++d)a[d]=h[d];else a=[h];else for(a=Array(p),h={radius:f,format:d,type:t},d=0;d<p;++d)a[d]=e.createCube(h);g.color=Array(a.length);for(d=0;d<a.length;++d)p=a[d],f=f||p.width,g.color[d]={target:34069,data:a[d]};for(d=0;6>d;++d){for(p=
0;p<a.length;++p)g.color[p].target=34069+d;0<d&&(g.depth=c[0].depth,g.stencil=c[0].stencil,g.depthStencil=c[0].depthStencil);if(c[d])c[d](g);else c[d]=P(g)}return L(b,{width:f,height:f,color:a})}var c=Array(6);b(a);return L(b,{faces:c,resize:function(a){var d=a|0;if(d===b.width)return b;var e=b.color;for(a=0;a<e.length;++a)e[a].resize(d);for(a=0;6>a;++a)c[a].resize(d);b.width=b.height=d;return b},_reglType:"framebufferCube",destroy:function(){c.forEach(function(a){a.destroy()})}})},clear:function(){I(M).forEach(r)},
restore:function(){t.cur=null;t.next=null;t.dirty=!0;I(M).forEach(function(b){b.framebuffer=a.createFramebuffer();p(b)})}})}function $a(){this.w=this.z=this.y=this.x=this.state=0;this.buffer=null;this.size=0;this.normalized=!1;this.type=5126;this.divisor=this.stride=this.offset=0}function Sb(a,b,c,e,f,d,q){function n(a){if(a!==r.currentVAO){var c=b.oes_vertex_array_object;a?c.bindVertexArrayOES(a.vao):c.bindVertexArrayOES(null);r.currentVAO=a}}function v(c){if(c!==r.currentVAO){if(c)c.bindAttrs();
else{for(var d=b.angle_instanced_arrays,e=0;e<l.length;++e){var g=l[e];g.buffer?(a.enableVertexAttribArray(e),g.buffer.bind(),a.vertexAttribPointer(e,g.size,g.type,g.normalized,g.stride,g.offfset),d&&g.divisor&&d.vertexAttribDivisorANGLE(e,g.divisor)):(a.disableVertexAttribArray(e),a.vertexAttrib4f(e,g.x,g.y,g.z,g.w))}q.elements?a.bindBuffer(34963,q.elements.buffer.buffer):a.bindBuffer(34963,null)}r.currentVAO=c}}function k(){I(h).forEach(function(a){a.destroy()})}function u(){this.id=++g;this.attributes=
[];this.elements=null;this.ownsElements=!1;this.offset=this.count=0;this.instances=-1;this.primitive=4;var a=b.oes_vertex_array_object;this.vao=a?a.createVertexArrayOES():null;h[this.id]=this;this.buffers=[]}function m(){b.oes_vertex_array_object&&I(h).forEach(function(a){a.refresh()})}var x=c.maxAttributes,l=Array(x);for(c=0;c<x;++c)l[c]=new $a;var g=0,h={},r={Record:$a,scope:{},state:l,currentVAO:null,targetVAO:null,restore:b.oes_vertex_array_object?m:function(){},createVAO:function(a){function b(a){var e;
Array.isArray(a)?(e=a,c.elements&&c.ownsElements&&c.elements.destroy(),c.elements=null,c.ownsElements=!1,c.offset=0,c.count=0,c.instances=-1,c.primitive=4):(a.elements?(e=a.elements,c.ownsElements?("function"===typeof e&&"elements"===e._reglType?c.elements.destroy():c.elements(e),c.ownsElements=!1):d.getElements(a.elements)?(c.elements=a.elements,c.ownsElements=!1):(c.elements=d.create(a.elements),c.ownsElements=!0)):(c.elements=null,c.ownsElements=!1),e=a.attributes,c.offset=0,c.count=-1,c.instances=
-1,c.primitive=4,c.elements&&(c.count=c.elements._elements.vertCount,c.primitive=c.elements._elements.primType),"offset"in a&&(c.offset=a.offset|0),"count"in a&&(c.count=a.count|0),"instances"in a&&(c.instances=a.instances|0),"primitive"in a&&(c.primitive=Ka[a.primitive]));a={};var g=c.attributes;g.length=e.length;for(var h=0;h<e.length;++h){var p=e[h],k=g[h]=new $a,m=p.data||p;if(Array.isArray(m)||O(m)||la(m)){var l;c.buffers[h]&&(l=c.buffers[h],O(m)&&l._buffer.byteLength>=m.byteLength?l.subdata(m):
(l.destroy(),c.buffers[h]=null));c.buffers[h]||(l=c.buffers[h]=f.create(p,34962,!1,!0));k.buffer=f.getBuffer(l);k.size=k.buffer.dimension|0;k.normalized=!1;k.type=k.buffer.dtype;k.offset=0;k.stride=0;k.divisor=0;k.state=1;a[h]=1}else f.getBuffer(p)?(k.buffer=f.getBuffer(p),k.size=k.buffer.dimension|0,k.normalized=!1,k.type=k.buffer.dtype,k.offset=0,k.stride=0,k.divisor=0,k.state=1):f.getBuffer(p.buffer)?(k.buffer=f.getBuffer(p.buffer),k.size=(+p.size||k.buffer.dimension)|0,k.normalized=!!p.normalized||
!1,k.type="type"in p?Ja[p.type]:k.buffer.dtype,k.offset=(p.offset||0)|0,k.stride=(p.stride||0)|0,k.divisor=(p.divisor||0)|0,k.state=1):"x"in p&&(k.x=+p.x||0,k.y=+p.y||0,k.z=+p.z||0,k.w=+p.w||0,k.state=2)}for(l=0;l<c.buffers.length;++l)!a[l]&&c.buffers[l]&&(c.buffers[l].destroy(),c.buffers[l]=null);c.refresh();return b}var c=new u;e.vaoCount+=1;b.destroy=function(){for(var a=0;a<c.buffers.length;++a)c.buffers[a]&&c.buffers[a].destroy();c.buffers.length=0;c.ownsElements&&(c.elements.destroy(),c.elements=
null,c.ownsElements=!1);c.destroy()};b._vao=c;b._reglType="vao";return b(a)},getVAO:function(a){return"function"===typeof a&&a._vao?a._vao:null},destroyBuffer:function(b){for(var c=0;c<l.length;++c){var d=l[c];d.buffer===b&&(a.disableVertexAttribArray(c),d.buffer=null)}},setVAO:b.oes_vertex_array_object?n:v,clear:b.oes_vertex_array_object?k:function(){}};u.prototype.bindAttrs=function(){for(var c=b.angle_instanced_arrays,e=this.attributes,g=0;g<e.length;++g){var f=e[g];f.buffer?(a.enableVertexAttribArray(g),
a.bindBuffer(34962,f.buffer.buffer),a.vertexAttribPointer(g,f.size,f.type,f.normalized,f.stride,f.offset),c&&f.divisor&&c.vertexAttribDivisorANGLE(g,f.divisor)):(a.disableVertexAttribArray(g),a.vertexAttrib4f(g,f.x,f.y,f.z,f.w))}for(c=e.length;c<x;++c)a.disableVertexAttribArray(c);(c=d.getElements(this.elements))?a.bindBuffer(34963,c.buffer.buffer):a.bindBuffer(34963,null)};u.prototype.refresh=function(){var a=b.oes_vertex_array_object;a&&(a.bindVertexArrayOES(this.vao),this.bindAttrs(),r.currentVAO=
null,a.bindVertexArrayOES(null))};u.prototype.destroy=function(){if(this.vao){var a=b.oes_vertex_array_object;this===r.currentVAO&&(r.currentVAO=null,a.bindVertexArrayOES(null));a.deleteVertexArrayOES(this.vao);this.vao=null}this.ownsElements&&(this.elements.destroy(),this.elements=null,this.ownsElements=!1);h[this.id]&&(delete h[this.id],--e.vaoCount)};return r}function Tb(a,b,c,e){function f(a,b,c,d){this.name=a;this.id=b;this.location=c;this.info=d}function d(a,b){for(var c=0;c<a.length;++c)if(a[c].id===
b.id){a[c].location=b.location;return}a.push(b)}function q(c,d,e){e=35632===c?k:u;var f=e[d];if(!f){var m=b.str(d),f=a.createShader(c);a.shaderSource(f,m);a.compileShader(f);e[d]=f}return f}function n(a,b){this.id=l++;this.fragId=a;this.vertId=b;this.program=null;this.uniforms=[];this.attributes=[];this.refCount=1;e.profile&&(this.stats={uniformsCount:0,attributesCount:0})}function v(c,h,k){var m;m=q(35632,c.fragId);var l=q(35633,c.vertId);h=c.program=a.createProgram();a.attachShader(h,m);a.attachShader(h,
l);if(k)for(m=0;m<k.length;++m)l=k[m],a.bindAttribLocation(h,l[0],l[1]);a.linkProgram(h);l=a.getProgramParameter(h,35718);e.profile&&(c.stats.uniformsCount=l);var n=c.uniforms;for(m=0;m<l;++m)if(k=a.getActiveUniform(h,m)){if(1<k.size)for(var v=0;v<k.size;++v){var u=k.name.replace("[0]","["+v+"]");d(n,new f(u,b.id(u),a.getUniformLocation(h,u),k))}v=k.name;1<k.size&&(v=v.replace("[0]",""));d(n,new f(v,b.id(v),a.getUniformLocation(h,v),k))}l=a.getProgramParameter(h,35721);e.profile&&(c.stats.attributesCount=
l);c=c.attributes;for(m=0;m<l;++m)(k=a.getActiveAttrib(h,m))&&d(c,new f(k.name,b.id(k.name),a.getAttribLocation(h,k.name),k))}var k={},u={},m={},x=[],l=0;e.profile&&(c.getMaxUniformsCount=function(){var a=0;x.forEach(function(b){b.stats.uniformsCount>a&&(a=b.stats.uniformsCount)});return a},c.getMaxAttributesCount=function(){var a=0;x.forEach(function(b){b.stats.attributesCount>a&&(a=b.stats.attributesCount)});return a});return{clear:function(){var b=a.deleteShader.bind(a);I(k).forEach(b);k={};I(u).forEach(b);
u={};x.forEach(function(b){a.deleteProgram(b.program)});x.length=0;m={};c.shaderCount=0},program:function(b,d,e,f){var l=m[d];l||(l=m[d]={});var q=l[b];if(q&&(q.refCount++,!f))return q;var w=new n(d,b);c.shaderCount++;v(w,e,f);q||(l[b]=w);x.push(w);return L(w,{destroy:function(){w.refCount--;if(0>=w.refCount){a.deleteProgram(w.program);var b=x.indexOf(w);x.splice(b,1);c.shaderCount--}0>=l[w.vertId].refCount&&(a.deleteShader(u[w.vertId]),delete u[w.vertId],delete m[w.fragId][w.vertId]);Object.keys(m[w.fragId]).length||
(a.deleteShader(k[w.fragId]),delete k[w.fragId],delete m[w.fragId])}})},restore:function(){k={};u={};for(var a=0;a<x.length;++a)v(x[a],null,x[a].attributes.map(function(a){return[a.location,a.name]}))},shader:q,frag:-1,vert:-1}}function Ub(a,b,c,e,f,d,q){function n(d){var f;f=null===b.next?5121:b.next.colorAttachments[0].texture._texture.type;var m=0,n=0,l=e.framebufferWidth,g=e.framebufferHeight,h=null;O(d)?h=d:d&&(m=d.x|0,n=d.y|0,l=(d.width||e.framebufferWidth-m)|0,g=(d.height||e.framebufferHeight-
n)|0,h=d.data||null);c();d=l*g*4;h||(5121===f?h=new Uint8Array(d):5126===f&&(h=h||new Float32Array(d)));a.pixelStorei(3333,4);a.readPixels(m,n,l,g,6408,f,h);return h}function v(a){var c;b.setFBO({framebuffer:a.framebuffer},function(){c=n(a)});return c}return function(a){return a&&"framebuffer"in a?v(a):n(a)}}function Ba(a){return Array.prototype.slice.call(a)}function Ca(a){return Ba(a).join("")}function Vb(){function a(){var a=[],b=[];return L(function(){a.push.apply(a,Ba(arguments))},{def:function(){var d=
"v"+c++;b.push(d);0<arguments.length&&(a.push(d,"="),a.push.apply(a,Ba(arguments)),a.push(";"));return d},toString:function(){return Ca([0<b.length?"var "+b.join(",")+";":"",Ca(a)])}})}function b(){function b(a,e){d(a,e,"=",c.def(a,e),";")}var c=a(),d=a(),e=c.toString,f=d.toString;return L(function(){c.apply(c,Ba(arguments))},{def:c.def,entry:c,exit:d,save:b,set:function(a,d,e){b(a,d);c(a,d,"=",e,";")},toString:function(){return e()+f()}})}var c=0,e=[],f=[],d=a(),q={};return{global:d,link:function(a){for(var b=
0;b<f.length;++b)if(f[b]===a)return e[b];b="g"+c++;e.push(b);f.push(a);return b},block:a,proc:function(a,c){function d(){var a="a"+e.length;e.push(a);return a}var e=[];c=c||0;for(var f=0;f<c;++f)d();var f=b(),x=f.toString;return q[a]=L(f,{arg:d,toString:function(){return Ca(["function(",e.join(),"){",x(),"}"])}})},scope:b,cond:function(){var a=Ca(arguments),c=b(),d=b(),e=c.toString,f=d.toString;return L(c,{then:function(){c.apply(c,Ba(arguments));return this},"else":function(){d.apply(d,Ba(arguments));
return this},toString:function(){var b=f();b&&(b="else{"+b+"}");return Ca(["if(",a,"){",e(),"}",b])}})},compile:function(){var a=['"use strict";',d,"return {"];Object.keys(q).forEach(function(b){a.push('"',b,'":',q[b].toString(),",")});a.push("}");var b=Ca(a).replace(/;/g,";\n").replace(/}/g,"}\n").replace(/{/g,"{\n");return Function.apply(null,e.concat(b)).apply(null,f)}}}function Sa(a){return Array.isArray(a)||O(a)||la(a)}function yb(a){return a.sort(function(a,c){return"viewport"===a?-1:"viewport"===
c?1:a<c?-1:1})}function J(a,b,c,e){this.thisDep=a;this.contextDep=b;this.propDep=c;this.append=e}function xa(a){return a&&!(a.thisDep||a.contextDep||a.propDep)}function w(a){return new J(!1,!1,!1,a)}function K(a,b){var c=a.type;if(0===c)return c=a.data.length,new J(!0,1<=c,2<=c,b);if(4===c)return c=a.data,new J(c.thisDep,c.contextDep,c.propDep,b);if(5===c)return new J(!1,!1,!1,b);if(6===c){for(var e=c=!1,f=!1,d=0;d<a.data.length;++d){var q=a.data[d];1===q.type?f=!0:2===q.type?e=!0:3===q.type?c=!0:
0===q.type?(c=!0,q=q.data,1<=q&&(e=!0),2<=q&&(f=!0)):4===q.type&&(c=c||q.data.thisDep,e=e||q.data.contextDep,f=f||q.data.propDep)}return new J(c,e,f,b)}return new J(3===c,2===c,1===c,b)}function Wb(a,b,c,e,f,d,q,n,v,k,u,m,x,l,g){function h(a){return a.replace(".","_")}function r(a,b,c){var d=h(a);Na.push(a);Ea[d]=ta[d]=!!c;ua[d]=b}function p(a,b,c){var d=h(a);Na.push(a);Array.isArray(c)?(ta[d]=c.slice(),Ea[d]=c.slice()):ta[d]=Ea[d]=c;va[d]=b}function P(){var a=Vb(),c=a.link,d=a.global;a.id=sa++;a.batchId=
"0";var e=c(tb),f=a.shared={props:"a0"};Object.keys(tb).forEach(function(a){f[a]=d.def(e,".",a)});var g=a.next={},da=a.current={};Object.keys(va).forEach(function(a){Array.isArray(ta[a])&&(g[a]=d.def(f.next,".",a),da[a]=d.def(f.current,".",a))});var D=a.constants={};Object.keys(Pa).forEach(function(a){D[a]=d.def(JSON.stringify(Pa[a]))});a.invoke=function(b,d){switch(d.type){case 0:var e=["this",f.context,f.props,a.batchId];return b.def(c(d.data),".call(",e.slice(0,Math.max(d.data.length+1,4)),")");
case 1:return b.def(f.props,d.data);case 2:return b.def(f.context,d.data);case 3:return b.def("this",d.data);case 4:return d.data.append(a,b),d.data.ref;case 5:return d.data.toString();case 6:return d.data.map(function(c){return a.invoke(b,c)})}};a.attribCache={};var ba={};a.scopeAttrib=function(a){a=b.id(a);if(a in ba)return ba[a];var d=k.scope[a];d||(d=k.scope[a]=new ea);return ba[a]=c(d)};return a}function t(a){var b=a["static"];a=a.dynamic;var c;if("profile"in b){var d=!!b.profile;c=w(function(a,
b){return d});c.enable=d}else if("profile"in a){var e=a.profile;c=K(e,function(a,b){return a.invoke(b,e)})}return c}function G(a,b){var c=a["static"],d=a.dynamic;if("framebuffer"in c){var e=c.framebuffer;return e?(e=n.getFramebuffer(e),w(function(a,b){var c=a.link(e),d=a.shared;b.set(d.framebuffer,".next",c);d=d.context;b.set(d,".framebufferWidth",c+".width");b.set(d,".framebufferHeight",c+".height");return c})):w(function(a,b){var c=a.shared;b.set(c.framebuffer,".next","null");c=c.context;b.set(c,
".framebufferWidth",c+".drawingBufferWidth");b.set(c,".framebufferHeight",c+".drawingBufferHeight");return"null"})}if("framebuffer"in d){var f=d.framebuffer;return K(f,function(a,b){var c=a.invoke(b,f),d=a.shared,e=d.framebuffer,c=b.def(e,".getFramebuffer(",c,")");b.set(e,".next",c);d=d.context;b.set(d,".framebufferWidth",c+"?"+c+".width:"+d+".drawingBufferWidth");b.set(d,".framebufferHeight",c+"?"+c+".height:"+d+".drawingBufferHeight");return c})}return null}function C(a,b,c){function d(a){if(a in
e){var c=e[a];a=!0;var z=c.x|0,g=c.y|0,h,da;"width"in c?h=c.width|0:a=!1;"height"in c?da=c.height|0:a=!1;return new J(!a&&b&&b.thisDep,!a&&b&&b.contextDep,!a&&b&&b.propDep,function(a,b){var d=a.shared.context,e=h;"width"in c||(e=b.def(d,".","framebufferWidth","-",z));var f=da;"height"in c||(f=b.def(d,".","framebufferHeight","-",g));return[z,g,e,f]})}if(a in f){var ha=f[a];a=K(ha,function(a,b){var c=a.invoke(b,ha),d=a.shared.context,e=b.def(c,".x|0"),f=b.def(c,".y|0"),z=b.def('"width" in ',c,"?",c,
".width|0:","(",d,".","framebufferWidth","-",e,")"),c=b.def('"height" in ',c,"?",c,".height|0:","(",d,".","framebufferHeight","-",f,")");return[e,f,z,c]});b&&(a.thisDep=a.thisDep||b.thisDep,a.contextDep=a.contextDep||b.contextDep,a.propDep=a.propDep||b.propDep);return a}return b?new J(b.thisDep,b.contextDep,b.propDep,function(a,b){var c=a.shared.context;return[0,0,b.def(c,".","framebufferWidth"),b.def(c,".","framebufferHeight")]}):null}var e=a["static"],f=a.dynamic;if(a=d("viewport")){var g=a;a=new J(a.thisDep,
a.contextDep,a.propDep,function(a,b){var c=g.append(a,b),d=a.shared.context;b.set(d,".viewportWidth",c[2]);b.set(d,".viewportHeight",c[3]);return c})}return{viewport:a,scissor_box:d("scissor.box")}}function O(a,b){var c=a["static"];if("string"===typeof c.frag&&"string"===typeof c.vert){if(0<Object.keys(b.dynamic).length)return null;var c=b["static"],d=Object.keys(c);if(0<d.length&&"number"===typeof c[d[0]]){for(var e=[],f=0;f<d.length;++f)e.push([c[d[f]]|0,d[f]]);return e}}return null}function H(a,
c,d){function e(a){if(a in f){var c=b.id(f[a]);a=w(function(){return c});a.id=c;return a}if(a in g){var d=g[a];return K(d,function(a,b){var c=a.invoke(b,d);return b.def(a.shared.strings,".id(",c,")")})}return null}var f=a["static"],g=a.dynamic,h=e("frag"),D=e("vert"),ba=null;xa(h)&&xa(D)?(ba=u.program(D.id,h.id,null,d),a=w(function(a,b){return a.link(ba)})):a=new J(h&&h.thisDep||D&&D.thisDep,h&&h.contextDep||D&&D.contextDep,h&&h.propDep||D&&D.propDep,function(a,b){var c=a.shared.shader,d;d=h?h.append(a,
b):b.def(c,".","frag");var e;e=D?D.append(a,b):b.def(c,".","vert");return b.def(c+".program("+e+","+d+")")});return{frag:h,vert:D,progVar:a,program:ba}}function M(a,b){function c(a,b){if(a in e){var d=e[a]|0;b?g.offset=d:g.instances=d;return w(function(a,c){b&&(a.OFFSET=d);return d})}if(a in f){var z=f[a];return K(z,function(a,c){var d=a.invoke(c,z);b&&(a.OFFSET=d);return d})}if(b){if(ba)return w(function(a,b){return a.OFFSET=0});if(h)return new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao+
".currentVAO?"+a.shared.vao+".currentVAO.offset:0")})}else if(h)return new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao+".currentVAO?"+a.shared.vao+".currentVAO.instances:-1")});return null}var e=a["static"],f=a.dynamic,g={},h=!1,D=function(){if("vao"in e){var a=e.vao;null!==a&&null===k.getVAO(a)&&(a=k.createVAO(a));h=!0;g.vao=a;return w(function(b){var c=k.getVAO(a);return c?b.link(c):"null"})}if("vao"in f){h=!0;var b=f.vao;return K(b,function(a,c){var d=a.invoke(c,
b);return c.def(a.shared.vao+".getVAO("+d+")")})}return null}(),ba=!1,X=function(){if("elements"in e){var a=e.elements;g.elements=a;if(Sa(a)){var b=g.elements=d.create(a,!0),a=d.getElements(b);ba=!0}else a&&(a=d.getElements(a),ba=!0);b=w(function(b,c){if(a){var d=b.link(a);return b.ELEMENTS=d}return b.ELEMENTS=null});b.value=a;return b}if("elements"in f){ba=!0;var c=f.elements;return K(c,function(a,b){var d=a.shared,e=d.isBufferArgs,d=d.elements,f=a.invoke(b,c),z=b.def("null"),e=b.def(e,"(",f,")"),
f=a.cond(e).then(z,"=",d,".createStream(",f,");")["else"](z,"=",d,".getElements(",f,");");b.entry(f);b.exit(a.cond(e).then(d,".destroyStream(",z,");"));return a.ELEMENTS=z})}return h?new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao+".currentVAO?"+a.shared.elements+".getElements("+a.shared.vao+".currentVAO.elements):null")}):null}(),ja=c("offset",!0),m=function(){if("primitive"in e){var a=e.primitive;g.primitive=a;return w(function(b,c){return Ka[a]})}if("primitive"in
f){var b=f.primitive;return K(b,function(a,c){var d=a.constants.primTypes,e=a.invoke(c,b);return c.def(d,"[",e,"]")})}return ba?xa(X)?X.value?w(function(a,b){return b.def(a.ELEMENTS,".primType")}):w(function(){return 4}):new J(X.thisDep,X.contextDep,X.propDep,function(a,b){var c=a.ELEMENTS;return b.def(c,"?",c,".primType:",4)}):h?new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao+".currentVAO?"+a.shared.vao+".currentVAO.primitive:4")}):null}(),l=function(){if("count"in
e){var a=e.count|0;g.count=a;return w(function(){return a})}if("count"in f){var b=f.count;return K(b,function(a,c){return a.invoke(c,b)})}return ba?xa(X)?X?ja?new J(ja.thisDep,ja.contextDep,ja.propDep,function(a,b){return b.def(a.ELEMENTS,".vertCount-",a.OFFSET)}):w(function(a,b){return b.def(a.ELEMENTS,".vertCount")}):w(function(){return-1}):new J(X.thisDep||ja.thisDep,X.contextDep||ja.contextDep,X.propDep||ja.propDep,function(a,b){var c=a.ELEMENTS;return a.OFFSET?b.def(c,"?",c,".vertCount-",a.OFFSET,
":-1"):b.def(c,"?",c,".vertCount:-1")}):h?new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao,".currentVAO?",a.shared.vao,".currentVAO.count:-1")}):null}(),p=c("instances",!1);return{elements:X,primitive:m,count:l,instances:p,offset:ja,vao:D,vaoActive:h,elementsActive:ba,"static":g}}function y(a,b){var c=a["static"],d=a.dynamic,e={};Na.forEach(function(a){function b(z,g){if(a in c){var B=z(c[a]);e[f]=w(function(){return B})}else if(a in d){var h=d[a];e[f]=K(h,function(a,
b){return g(a,b,a.invoke(b,h))})}}var f=h(a);switch(a){case "cull.enable":case "blend.enable":case "dither":case "stencil.enable":case "depth.enable":case "scissor.enable":case "polygonOffset.enable":case "sample.alpha":case "sample.enable":case "depth.mask":return b(function(a){return a},function(a,b,c){return c});case "depth.func":return b(function(a){return ab[a]},function(a,b,c){return b.def(a.constants.compareFuncs,"[",c,"]")});case "depth.range":return b(function(a){return a},function(a,b,c){a=
b.def("+",c,"[0]");b=b.def("+",c,"[1]");return[a,b]});case "blend.func":return b(function(a){return[Ga["srcRGB"in a?a.srcRGB:a.src],Ga["dstRGB"in a?a.dstRGB:a.dst],Ga["srcAlpha"in a?a.srcAlpha:a.src],Ga["dstAlpha"in a?a.dstAlpha:a.dst]]},function(a,b,c){function d(a,e){return b.def('"',a,e,'" in ',c,"?",c,".",a,e,":",c,".",a)}a=a.constants.blendFuncs;var e=d("src","RGB"),f=d("dst","RGB"),e=b.def(a,"[",e,"]"),z=b.def(a,"[",d("src","Alpha"),"]"),f=b.def(a,"[",f,"]");a=b.def(a,"[",d("dst","Alpha"),"]");
return[e,f,z,a]});case "blend.equation":return b(function(a){if("string"===typeof a)return[fa[a],fa[a]];if("object"===typeof a)return[fa[a.rgb],fa[a.alpha]]},function(a,b,c){var d=a.constants.blendEquations,e=b.def(),f=b.def();a=a.cond("typeof ",c,'==="string"');a.then(e,"=",f,"=",d,"[",c,"];");a["else"](e,"=",d,"[",c,".rgb];",f,"=",d,"[",c,".alpha];");b(a);return[e,f]});case "blend.color":return b(function(a){return R(4,function(b){return+a[b]})},function(a,b,c){return R(4,function(a){return b.def("+",
c,"[",a,"]")})});case "stencil.mask":return b(function(a){return a|0},function(a,b,c){return b.def(c,"|0")});case "stencil.func":return b(function(a){return[ab[a.cmp||"keep"],a.ref||0,"mask"in a?a.mask:-1]},function(a,b,c){a=b.def('"cmp" in ',c,"?",a.constants.compareFuncs,"[",c,".cmp]",":",7680);var d=b.def(c,".ref|0");b=b.def('"mask" in ',c,"?",c,".mask|0:-1");return[a,d,b]});case "stencil.opFront":case "stencil.opBack":return b(function(b){return["stencil.opBack"===a?1029:1028,Ta[b.fail||"keep"],
Ta[b.zfail||"keep"],Ta[b.zpass||"keep"]]},function(b,c,d){function e(a){return c.def('"',a,'" in ',d,"?",f,"[",d,".",a,"]:",7680)}var f=b.constants.stencilOps;return["stencil.opBack"===a?1029:1028,e("fail"),e("zfail"),e("zpass")]});case "polygonOffset.offset":return b(function(a){return[a.factor|0,a.units|0]},function(a,b,c){a=b.def(c,".factor|0");b=b.def(c,".units|0");return[a,b]});case "cull.face":return b(function(a){var b=0;"front"===a?b=1028:"back"===a&&(b=1029);return b},function(a,b,c){return b.def(c,
'==="front"?',1028,":",1029)});case "lineWidth":return b(function(a){return a},function(a,b,c){return c});case "frontFace":return b(function(a){return zb[a]},function(a,b,c){return b.def(c+'==="cw"?2304:2305')});case "colorMask":return b(function(a){return a.map(function(a){return!!a})},function(a,b,c){return R(4,function(a){return"!!"+c+"["+a+"]"})});case "sample.coverage":return b(function(a){return["value"in a?a.value:1,!!a.invert]},function(a,b,c){a=b.def('"value" in ',c,"?+",c,".value:1");b=
b.def("!!",c,".invert");return[a,b]})}});return e}function T(a,b){var c=a["static"],d=a.dynamic,e={};Object.keys(c).forEach(function(a){var b=c[a],d;if("number"===typeof b||"boolean"===typeof b)d=w(function(){return b});else if("function"===typeof b){var f=b._reglType;if("texture2d"===f||"textureCube"===f)d=w(function(a){return a.link(b)});else if("framebuffer"===f||"framebufferCube"===f)d=w(function(a){return a.link(b.color[0])})}else ra(b)&&(d=w(function(a){return a.global.def("[",R(b.length,function(a){return b[a]}),
"]")}));d.value=b;e[a]=d});Object.keys(d).forEach(function(a){var b=d[a];e[a]=K(b,function(a,c){return a.invoke(c,b)})});return e}function wa(a,c){var d=a["static"],e=a.dynamic,g={};Object.keys(d).forEach(function(a){var c=d[a],e=b.id(a),z=new ea;if(Sa(c))z.state=1,z.buffer=f.getBuffer(f.create(c,34962,!1,!0)),z.type=0;else{var B=f.getBuffer(c);if(B)z.state=1,z.buffer=B,z.type=0;else if("constant"in c){var h=c.constant;z.buffer="null";z.state=2;"number"===typeof h?z.x=h:Da.forEach(function(a,b){b<
h.length&&(z[a]=h[b])})}else{var B=Sa(c.buffer)?f.getBuffer(f.create(c.buffer,34962,!1,!0)):f.getBuffer(c.buffer),k=c.offset|0,m=c.stride|0,l=c.size|0,oa=!!c.normalized,p=0;"type"in c&&(p=Ja[c.type]);c=c.divisor|0;z.buffer=B;z.state=1;z.size=l;z.normalized=oa;z.type=p||B.dtype;z.offset=k;z.stride=m;z.divisor=c}}g[a]=w(function(a,b){var c=a.attribCache;if(e in c)return c[e];var d={isStream:!1};Object.keys(z).forEach(function(a){d[a]=z[a]});z.buffer&&(d.buffer=a.link(z.buffer),d.type=d.type||d.buffer+
".dtype");return c[e]=d})});Object.keys(e).forEach(function(a){var b=e[a];g[a]=K(b,function(a,c){function d(a){c(B[a],"=",e,".",a,"|0;")}var e=a.invoke(c,b),f=a.shared,z=a.constants,g=f.isBufferArgs,f=f.buffer,B={isStream:c.def(!1)},h=new ea;h.state=1;Object.keys(h).forEach(function(a){B[a]=c.def(""+h[a])});var k=B.buffer,m=B.type;c("if(",g,"(",e,")){",B.isStream,"=true;",k,"=",f,".createStream(",34962,",",e,");",m,"=",k,".dtype;","}else{",k,"=",f,".getBuffer(",e,");","if(",k,"){",m,"=",k,".dtype;",
'}else if("constant" in ',e,"){",B.state,"=",2,";","if(typeof "+e+'.constant === "number"){',B[Da[0]],"=",e,".constant;",Da.slice(1).map(function(a){return B[a]}).join("="),"=0;","}else{",Da.map(function(a,b){return B[a]+"="+e+".constant.length>"+b+"?"+e+".constant["+b+"]:0;"}).join(""),"}}else{","if(",g,"(",e,".buffer)){",k,"=",f,".createStream(",34962,",",e,".buffer);","}else{",k,"=",f,".getBuffer(",e,".buffer);","}",m,'="type" in ',e,"?",z.glTypes,"[",e,".type]:",k,".dtype;",B.normalized,"=!!",
e,".normalized;");d("size");d("offset");d("stride");d("divisor");c("}}");c.exit("if(",B.isStream,"){",f,".destroyStream(",k,");","}");return B})});return g}function F(a){var b=a["static"],c=a.dynamic,d={};Object.keys(b).forEach(function(a){var c=b[a];d[a]=w(function(a,b){return"number"===typeof c||"boolean"===typeof c?""+c:a.link(c)})});Object.keys(c).forEach(function(a){var b=c[a];d[a]=K(b,function(a,c){return a.invoke(c,b)})});return d}function A(a,b,d,e,f){function g(a){var b=p[a];b&&(ja[a]=b)}
var m=O(a,b),l=G(a,f),p=C(a,l,f),X=M(a,f),ja=y(a,f),q=H(a,f,m);g("viewport");g(h("scissor.box"));var n=0<Object.keys(ja).length,l={framebuffer:l,draw:X,shader:q,state:ja,dirty:n,scopeVAO:null,drawVAO:null,useVAO:!1,attributes:{}};l.profile=t(a,f);l.uniforms=T(d,f);l.drawVAO=l.scopeVAO=X.vao;if(!l.drawVAO&&q.program&&!m&&c.angle_instanced_arrays&&X["static"].elements){var r=!0;a=q.program.attributes.map(function(a){a=b["static"][a];r=r&&!!a;return a});if(r&&0<a.length){var u=k.getVAO(k.createVAO({attributes:a,
elements:X["static"].elements}));l.drawVAO=new J(null,null,null,function(a,b){return a.link(u)});l.useVAO=!0}}m?l.useVAO=!0:l.attributes=wa(b,f);l.context=F(e,f);return l}function ia(a,b,c){var d=a.shared.context,e=a.scope();Object.keys(c).forEach(function(f){b.save(d,"."+f);var g=c[f].append(a,b);Array.isArray(g)?e(d,".",f,"=[",g.join(),"];"):e(d,".",f,"=",g,";")});b(e)}function S(a,b,c,d){var e=a.shared,f=e.gl,g=e.framebuffer,h;Ma&&(h=b.def(e.extensions,".webgl_draw_buffers"));var k=a.constants,
e=k.drawBuffer,k=k.backBuffer;a=c?c.append(a,b):b.def(g,".next");d||b("if(",a,"!==",g,".cur){");b("if(",a,"){",f,".bindFramebuffer(",36160,",",a,".framebuffer);");Ma&&b(h,".drawBuffersWEBGL(",e,"[",a,".colorAttachments.length]);");b("}else{",f,".bindFramebuffer(",36160,",null);");Ma&&b(h,".drawBuffersWEBGL(",k,");");b("}",g,".cur=",a,";");d||b("}")}function Aa(a,b,c){var d=a.shared,e=d.gl,f=a.current,g=a.next,k=d.current,l=d.next,m=a.cond(k,".dirty");Na.forEach(function(b){b=h(b);if(!(b in c.state)){var d,
B;if(b in g){d=g[b];B=f[b];var p=R(ta[b].length,function(a){return m.def(d,"[",a,"]")});m(a.cond(p.map(function(a,b){return a+"!=="+B+"["+b+"]"}).join("||")).then(e,".",va[b],"(",p,");",p.map(function(a,b){return B+"["+b+"]="+a}).join(";"),";"))}else d=m.def(l,".",b),p=a.cond(d,"!==",k,".",b),m(p),b in ua?p(a.cond(d).then(e,".enable(",ua[b],");")["else"](e,".disable(",ua[b],");"),k,".",b,"=",d,";"):p(e,".",va[b],"(",d,");",k,".",b,"=",d,";")}});0===Object.keys(c.state).length&&m(k,".dirty=false;");
b(m)}function I(a,b,c,d){var e=a.shared,f=a.current,g=e.current,h=e.gl;yb(Object.keys(c)).forEach(function(e){var k=c[e];if(!d||d(k)){var m=k.append(a,b);if(ua[e]){var l=ua[e];xa(k)?m?b(h,".enable(",l,");"):b(h,".disable(",l,");"):b(a.cond(m).then(h,".enable(",l,");")["else"](h,".disable(",l,");"));b(g,".",e,"=",m,";")}else if(ra(m)){var p=f[e];b(h,".",va[e],"(",m,");",m.map(function(a,b){return p+"["+b+"]="+a}).join(";"),";")}else b(h,".",va[e],"(",m,");",g,".",e,"=",m,";")}})}function N(a,b){W&&
(a.instancing=b.def(a.shared.extensions,".angle_instanced_arrays"))}function E(a,b,c,d,e){function f(){return"undefined"===typeof performance?"Date.now()":"performance.now()"}function g(a){r=b.def();a(r,"=",f(),";");"string"===typeof e?a(p,".count+=",e,";"):a(p,".count++;");l&&(d?(u=b.def(),a(u,"=",n,".getNumPendingQueries();")):a(n,".beginQuery(",p,");"))}function h(a){a(p,".cpuTime+=",f(),"-",r,";");l&&(d?a(n,".pushScopeStats(",u,",",n,".getNumPendingQueries(),",p,");"):a(n,".endQuery();"))}function k(a){var c=
b.def(q,".profile");b(q,".profile=",a,";");b.exit(q,".profile=",c,";")}var m=a.shared,p=a.stats,q=m.current,n=m.timer;c=c.profile;var r,u;if(c){if(xa(c)){c.enable?(g(b),h(b.exit),k("true")):k("false");return}c=c.append(a,b);k(c)}else c=b.def(q,".profile");m=a.block();g(m);b("if(",c,"){",m,"}");a=a.block();h(a);b.exit("if(",c,"){",a,"}")}function ga(a,b,c,d,e){function f(a){switch(a){case 35664:case 35667:case 35671:return 2;case 35665:case 35668:case 35672:return 3;case 35666:case 35669:case 35673:return 4;
default:return 1}}function g(c,d,e){function f(){b("if(!",p,".buffer){",m,".enableVertexAttribArray(",l,");}");var c=e.type,g;g=e.size?b.def(e.size,"||",d):d;b("if(",p,".type!==",c,"||",p,".size!==",g,"||",n.map(function(a){return p+"."+a+"!=="+e[a]}).join("||"),"){",m,".bindBuffer(",34962,",",ha,".buffer);",m,".vertexAttribPointer(",[l,g,c,e.normalized,e.stride,e.offset],");",p,".type=",c,";",p,".size=",g,";",n.map(function(a){return p+"."+a+"="+e[a]+";"}).join(""),"}");W&&(c=e.divisor,b("if(",p,
".divisor!==",c,"){",a.instancing,".vertexAttribDivisorANGLE(",[l,c],");",p,".divisor=",c,";}"))}function k(){b("if(",p,".buffer){",m,".disableVertexAttribArray(",l,");",p,".buffer=null;","}if(",Da.map(function(a,b){return p+"."+a+"!=="+q[b]}).join("||"),"){",m,".vertexAttrib4f(",l,",",q,");",Da.map(function(a,b){return p+"."+a+"="+q[b]+";"}).join(""),"}")}var m=h.gl,l=b.def(c,".location"),p=b.def(h.attributes,"[",l,"]");c=e.state;var ha=e.buffer,q=[e.x,e.y,e.z,e.w],n=["buffer","normalized","offset",
"stride"];1===c?f():2===c?k():(b("if(",c,"===",1,"){"),f(),b("}else{"),k(),b("}"))}var h=a.shared;d.forEach(function(d){var h=d.name,k=c.attributes[h],m;if(k){if(!e(k))return;m=k.append(a,b)}else{if(!e(Ab))return;var l=a.scopeAttrib(h);m={};Object.keys(new ea).forEach(function(a){m[a]=b.def(l,".",a)})}g(a.link(d),f(d.info.type),m)})}function Q(a,c,d,e,f,g){for(var h=a.shared,k=h.gl,m={},l,p=0;p<e.length;++p){var q=e[p],n=q.name,r=q.info.type,u=q.info.size,t=d.uniforms[n];if(1<u){if(!t)continue;var v=
n.replace("[0]","");if(m[v])continue;m[v]=1}var q=a.link(q)+".location",x;if(t){if(!f(t))continue;if(xa(t)){n=t.value;if(35678===r||35680===r)r=a.link(n._texture||n.color[0]._texture),c(k,".uniform1i(",q,",",r+".bind());"),c.exit(r,".unbind();");else if(35674===r||35675===r||35676===r)u=a.global.def("new Float32Array(["+Array.prototype.slice.call(n)+"])"),n=2,35675===r?n=3:35676===r&&(n=4),c(k,".uniformMatrix",n,"fv(",q,",false,",u,");");else{switch(r){case 5126:l="1f";break;case 35664:l="2f";break;
case 35665:l="3f";break;case 35666:l="4f";break;case 35670:l="1i";break;case 5124:l="1i";break;case 35671:l="2i";break;case 35667:l="2i";break;case 35672:l="3i";break;case 35668:l="3i";break;case 35673:l="4i";break;case 35669:l="4i"}1<u?(l+="v",n=a.global.def("["+Array.prototype.slice.call(n)+"]")):n=ra(n)?Array.prototype.slice.call(n):n;c(k,".uniform",l,"(",q,",",n,");")}continue}else x=t.append(a,c)}else{if(!f(Ab))continue;x=c.def(h.uniforms,"[",b.id(n),"]")}35678===r?c("if(",x,"&&",x,'._reglType==="framebuffer"){',
x,"=",x,".color[0];","}"):35680===r&&c("if(",x,"&&",x,'._reglType==="framebufferCube"){',x,"=",x,".color[0];","}");n=1;switch(r){case 35678:case 35680:r=c.def(x,"._texture");c(k,".uniform1i(",q,",",r,".bind());");c.exit(r,".unbind();");continue;case 5124:case 35670:l="1i";break;case 35667:case 35671:l="2i";n=2;break;case 35668:case 35672:l="3i";n=3;break;case 35669:case 35673:l="4i";n=4;break;case 5126:l="1f";break;case 35664:l="2f";n=2;break;case 35665:l="3f";n=3;break;case 35666:l="4f";n=4;break;
case 35674:l="Matrix2fv";break;case 35675:l="Matrix3fv";break;case 35676:l="Matrix4fv"}-1===l.indexOf("Matrix")&&1<u&&(l+="v",n=1);if("M"===l.charAt(0)){c(k,".uniform",l,"(",q,",");var q=Math.pow(r-35674+2,2),y=a.global.def("new Float32Array(",q,")");Array.isArray(x)?c("false,(",R(q,function(a){return y+"["+a+"]="+x[a]}),",",y,")"):c("false,(Array.isArray(",x,")||",x," instanceof Float32Array)?",x,":(",R(q,function(a){return y+"["+a+"]="+x+"["+a+"]"}),",",y,")");c(");")}else{if(1<n){for(var r=[],
w=[],u=0;u<n;++u)Array.isArray(x)?w.push(x[u]):w.push(c.def(x+"["+u+"]")),g&&r.push(c.def());g&&c("if(!",a.batchId,"||",r.map(function(a,b){return a+"!=="+w[b]}).join("||"),"){",r.map(function(a,b){return a+"="+w[b]+";"}).join(""));c(k,".uniform",l,"(",q,",",w.join(","),");")}else g&&(r=c.def(),c("if(!",a.batchId,"||",r,"!==",x,"){",r,"=",x,";")),c(k,".uniform",l,"(",q,",",x,");");g&&c("}")}}}function U(a,b,c,d){function e(f){var g=m[f];return g?g.contextDep&&d.contextDynamic||g.propDep?g.append(a,
c):g.append(a,b):b.def(k,".",f)}function f(){function a(){c(t,".drawElementsInstancedANGLE(",[n,r,x,q+"<<(("+x+"-5121)>>1)",u],");")}function b(){c(t,".drawArraysInstancedANGLE(",[n,q,r,u],");")}p&&"null"!==p?v?a():(c("if(",p,"){"),a(),c("}else{"),b(),c("}")):b()}function g(){function a(){c(l+".drawElements("+[n,r,x,q+"<<(("+x+"-5121)>>1)"]+");")}function b(){c(l+".drawArrays("+[n,q,r]+");")}p&&"null"!==p?v?a():(c("if(",p,"){"),a(),c("}else{"),b(),c("}")):b()}var h=a.shared,l=h.gl,k=h.draw,m=d.draw,
p=function(){var e=m.elements,f=b;if(e){if(e.contextDep&&d.contextDynamic||e.propDep)f=c;e=e.append(a,f);m.elementsActive&&f("if("+e+")"+l+".bindBuffer(34963,"+e+".buffer.buffer);")}else e=f.def(),f(e,"=",k,".","elements",";","if(",e,"){",l,".bindBuffer(",34963,",",e,".buffer.buffer);}","else if(",h.vao,".currentVAO){",e,"=",a.shared.elements+".getElements("+h.vao,".currentVAO.elements);",na?"":"if("+e+")"+l+".bindBuffer(34963,"+e+".buffer.buffer);","}");return e}(),n=e("primitive"),q=e("offset"),
r=function(){var e=m.count,f=b;if(e){if(e.contextDep&&d.contextDynamic||e.propDep)f=c;e=e.append(a,f)}else e=f.def(k,".","count");return e}();if("number"===typeof r){if(0===r)return}else c("if(",r,"){"),c.exit("}");var u,t;W&&(u=e("instances"),t=a.instancing);var x=p+".type",v=m.elements&&xa(m.elements)&&!m.vaoActive;W&&("number"!==typeof u||0<=u)?"string"===typeof u?(c("if(",u,">0){"),f(),c("}else if(",u,"<0){"),g(),c("}")):f():g()}function ca(a,b,c,d,e){b=P();e=b.proc("body",e);W&&(b.instancing=
e.def(b.shared.extensions,".angle_instanced_arrays"));a(b,e,c,d);return b.compile().body}function Z(a,b,c,d){N(a,b);c.useVAO?c.drawVAO?b(a.shared.vao,".setVAO(",c.drawVAO.append(a,b),");"):b(a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);"):(b(a.shared.vao,".setVAO(null);"),ga(a,b,c,d.attributes,function(){return!0}));Q(a,b,c,d.uniforms,function(){return!0},!1);U(a,b,b,c)}function Fa(a,b){var c=a.proc("draw",1);N(a,c);ia(a,c,b.context);S(a,c,b.framebuffer);Aa(a,c,b);I(a,c,b.state);E(a,c,b,!1,!0);
var d=b.shader.progVar.append(a,c);c(a.shared.gl,".useProgram(",d,".program);");if(b.shader.program)Z(a,c,b,b.shader.program);else{c(a.shared.vao,".setVAO(null);");var e=a.global.def("{}"),f=c.def(d,".id"),g=c.def(e,"[",f,"]");c(a.cond(g).then(g,".call(this,a0);")["else"](g,"=",e,"[",f,"]=",a.link(function(c){return ca(Z,a,b,c,1)}),"(",d,");",g,".call(this,a0);"))}0<Object.keys(b.state).length&&c(a.shared.current,".dirty=true;");a.shared.vao&&c(a.shared.vao,".setVAO(null);")}function pa(a,b,c,d){function e(){return!0}
a.batchId="a1";N(a,b);ga(a,b,c,d.attributes,e);Q(a,b,c,d.uniforms,e,!1);U(a,b,b,c)}function qa(a,b,c,d){function e(a){return a.contextDep&&g||a.propDep}function f(a){return!e(a)}N(a,b);var g=c.contextDep,h=b.def(),l=b.def();a.shared.props=l;a.batchId=h;var k=a.scope(),m=a.scope();b(k.entry,"for(",h,"=0;",h,"<","a1",";++",h,"){",l,"=","a0","[",h,"];",m,"}",k.exit);c.needsContext&&ia(a,m,c.context);c.needsFramebuffer&&S(a,m,c.framebuffer);I(a,m,c.state,e);c.profile&&e(c.profile)&&E(a,m,c,!1,!0);d?(c.useVAO?
c.drawVAO?e(c.drawVAO)?m(a.shared.vao,".setVAO(",c.drawVAO.append(a,m),");"):k(a.shared.vao,".setVAO(",c.drawVAO.append(a,k),");"):k(a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);"):(k(a.shared.vao,".setVAO(null);"),ga(a,k,c,d.attributes,f),ga(a,m,c,d.attributes,e)),Q(a,k,c,d.uniforms,f,!1),Q(a,m,c,d.uniforms,e,!0),U(a,k,m,c)):(b=a.global.def("{}"),d=c.shader.progVar.append(a,m),l=m.def(d,".id"),k=m.def(b,"[",l,"]"),m(a.shared.gl,".useProgram(",d,".program);","if(!",k,"){",k,"=",b,"[",l,"]=",
a.link(function(b){return ca(pa,a,c,b,2)}),"(",d,");}",k,".call(this,a0[",h,"],",h,");"))}function V(a,b){function c(a){return a.contextDep&&e||a.propDep}var d=a.proc("batch",2);a.batchId="0";N(a,d);var e=!1,f=!0;Object.keys(b.context).forEach(function(a){e=e||b.context[a].propDep});e||(ia(a,d,b.context),f=!1);var g=b.framebuffer,h=!1;g?(g.propDep?e=h=!0:g.contextDep&&e&&(h=!0),h||S(a,d,g)):S(a,d,null);b.state.viewport&&b.state.viewport.propDep&&(e=!0);Aa(a,d,b);I(a,d,b.state,function(a){return!c(a)});
b.profile&&c(b.profile)||E(a,d,b,!1,"a1");b.contextDep=e;b.needsContext=f;b.needsFramebuffer=h;f=b.shader.progVar;if(f.contextDep&&e||f.propDep)qa(a,d,b,null);else if(f=f.append(a,d),d(a.shared.gl,".useProgram(",f,".program);"),b.shader.program)qa(a,d,b,b.shader.program);else{d(a.shared.vao,".setVAO(null);");var g=a.global.def("{}"),h=d.def(f,".id"),l=d.def(g,"[",h,"]");d(a.cond(l).then(l,".call(this,a0,a1);")["else"](l,"=",g,"[",h,"]=",a.link(function(c){return ca(qa,a,b,c,2)}),"(",f,");",l,".call(this,a0,a1);"))}0<
Object.keys(b.state).length&&d(a.shared.current,".dirty=true;");a.shared.vao&&d(a.shared.vao,".setVAO(null);")}function ka(a,c){function d(b){var g=c.shader[b];g&&e.set(f.shader,"."+b,g.append(a,e))}var e=a.proc("scope",3);a.batchId="a2";var f=a.shared,g=f.current;ia(a,e,c.context);c.framebuffer&&c.framebuffer.append(a,e);yb(Object.keys(c.state)).forEach(function(b){var d=c.state[b].append(a,e);ra(d)?d.forEach(function(c,d){e.set(a.next[b],"["+d+"]",c)}):e.set(f.next,"."+b,d)});E(a,e,c,!0,!0);["elements",
"offset","count","instances","primitive"].forEach(function(b){var d=c.draw[b];d&&e.set(f.draw,"."+b,""+d.append(a,e))});Object.keys(c.uniforms).forEach(function(d){var g=c.uniforms[d].append(a,e);Array.isArray(g)&&(g="["+g.join()+"]");e.set(f.uniforms,"["+b.id(d)+"]",g)});Object.keys(c.attributes).forEach(function(b){var d=c.attributes[b].append(a,e),f=a.scopeAttrib(b);Object.keys(new ea).forEach(function(a){e.set(f,"."+a,d[a])})});c.scopeVAO&&e.set(f.vao,".targetVAO",c.scopeVAO.append(a,e));d("vert");
d("frag");0<Object.keys(c.state).length&&(e(g,".dirty=true;"),e.exit(g,".dirty=true;"));e("a1(",a.shared.context,",a0,",a.batchId,");")}function la(a){if("object"===typeof a&&!ra(a)){for(var b=Object.keys(a),c=0;c<b.length;++c)if(Y.isDynamic(a[b[c]]))return!0;return!1}}function aa(a,b,c){function d(a,b){g.forEach(function(c){var d=e[c];Y.isDynamic(d)&&(d=a.invoke(b,d),b(m,".",c,"=",d,";"))})}var e=b["static"][c];if(e&&la(e)){var f=a.global,g=Object.keys(e),h=!1,l=!1,k=!1,m=a.global.def("{}");g.forEach(function(b){var c=
e[b];if(Y.isDynamic(c))"function"===typeof c&&(c=e[b]=Y.unbox(c)),b=K(c,null),h=h||b.thisDep,k=k||b.propDep,l=l||b.contextDep;else{f(m,".",b,"=");switch(typeof c){case "number":f(c);break;case "string":f('"',c,'"');break;case "object":Array.isArray(c)&&f("[",c.join(),"]");break;default:f(a.link(c))}f(";")}});b.dynamic[c]=new Y.DynamicVariable(4,{thisDep:h,contextDep:l,propDep:k,ref:m,append:d});delete b["static"][c]}}var ea=k.Record,fa={add:32774,subtract:32778,"reverse subtract":32779};c.ext_blend_minmax&&
(fa.min=32775,fa.max=32776);var W=c.angle_instanced_arrays,Ma=c.webgl_draw_buffers,na=c.oes_vertex_array_object,ta={dirty:!0,profile:g.profile},Ea={},Na=[],ua={},va={};r("dither",3024);r("blend.enable",3042);p("blend.color","blendColor",[0,0,0,0]);p("blend.equation","blendEquationSeparate",[32774,32774]);p("blend.func","blendFuncSeparate",[1,0,1,0]);r("depth.enable",2929,!0);p("depth.func","depthFunc",513);p("depth.range","depthRange",[0,1]);p("depth.mask","depthMask",!0);p("colorMask","colorMask",
[!0,!0,!0,!0]);r("cull.enable",2884);p("cull.face","cullFace",1029);p("frontFace","frontFace",2305);p("lineWidth","lineWidth",1);r("polygonOffset.enable",32823);p("polygonOffset.offset","polygonOffset",[0,0]);r("sample.alpha",32926);r("sample.enable",32928);p("sample.coverage","sampleCoverage",[1,!1]);r("stencil.enable",2960);p("stencil.mask","stencilMask",-1);p("stencil.func","stencilFunc",[519,0,-1]);p("stencil.opFront","stencilOpSeparate",[1028,7680,7680,7680]);p("stencil.opBack","stencilOpSeparate",
[1029,7680,7680,7680]);r("scissor.enable",3089);p("scissor.box","scissor",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);p("viewport","viewport",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);var tb={gl:a,context:x,strings:b,next:Ea,current:ta,draw:m,elements:d,buffer:f,shader:u,attributes:k.state,vao:k,uniforms:v,framebuffer:n,extensions:c,timer:l,isBufferArgs:Sa},Pa={primTypes:Ka,compareFuncs:ab,blendFuncs:Ga,blendEquations:fa,stencilOps:Ta,glTypes:Ja,orientationType:zb};Ma&&(Pa.backBuffer=
[1029],Pa.drawBuffer=R(e.maxDrawbuffers,function(a){return 0===a?[0]:R(a,function(a){return 36064+a})}));var sa=0;return{next:Ea,current:ta,procs:function(){var a=P(),b=a.proc("poll"),d=a.proc("refresh"),f=a.block();b(f);d(f);var g=a.shared,h=g.gl,l=g.next,k=g.current;f(k,".dirty=false;");S(a,b);S(a,d,null,!0);var m;W&&(m=a.link(W));c.oes_vertex_array_object&&d(a.link(c.oes_vertex_array_object),".bindVertexArrayOES(null);");for(var p=0;p<e.maxAttributes;++p){var n=d.def(g.attributes,"[",p,"]"),q=
a.cond(n,".buffer");q.then(h,".enableVertexAttribArray(",p,");",h,".bindBuffer(",34962,",",n,".buffer.buffer);",h,".vertexAttribPointer(",p,",",n,".size,",n,".type,",n,".normalized,",n,".stride,",n,".offset);")["else"](h,".disableVertexAttribArray(",p,");",h,".vertexAttrib4f(",p,",",n,".x,",n,".y,",n,".z,",n,".w);",n,".buffer=null;");d(q);W&&d(m,".vertexAttribDivisorANGLE(",p,",",n,".divisor);")}d(a.shared.vao,".currentVAO=null;",a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);");Object.keys(ua).forEach(function(c){var e=
ua[c],g=f.def(l,".",c),m=a.block();m("if(",g,"){",h,".enable(",e,")}else{",h,".disable(",e,")}",k,".",c,"=",g,";");d(m);b("if(",g,"!==",k,".",c,"){",m,"}")});Object.keys(va).forEach(function(c){var e=va[c],g=ta[c],m,p,n=a.block();n(h,".",e,"(");ra(g)?(e=g.length,m=a.global.def(l,".",c),p=a.global.def(k,".",c),n(R(e,function(a){return m+"["+a+"]"}),");",R(e,function(a){return p+"["+a+"]="+m+"["+a+"];"}).join("")),b("if(",R(e,function(a){return m+"["+a+"]!=="+p+"["+a+"]"}).join("||"),"){",n,"}")):(m=
f.def(l,".",c),p=f.def(k,".",c),n(m,");",k,".",c,"=",m,";"),b("if(",m,"!==",p,"){",n,"}"));d(n)});return a.compile()}(),compile:function(a,b,c,d,e){var f=P();f.stats=f.link(e);Object.keys(b["static"]).forEach(function(a){aa(f,b,a)});Xb.forEach(function(b){aa(f,a,b)});var g=A(a,b,c,d,f);Fa(f,g);ka(f,g);V(f,g);return L(f.compile(),{destroy:function(){g.shader.program.destroy()}})}}}function Bb(a,b){for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}var L=function(a,b){for(var c=Object.keys(b),
e=0;e<c.length;++e)a[c[e]]=b[c[e]];return a},Db=0,Y={DynamicVariable:Z,define:function(a,b){return new Z(a,cb(b+""))},isDynamic:function(a){return"function"===typeof a&&!a._reglType||a instanceof Z},unbox:db,accessor:cb},bb={next:"function"===typeof requestAnimationFrame?function(a){return requestAnimationFrame(a)}:function(a){return setTimeout(a,16)},cancel:"function"===typeof cancelAnimationFrame?function(a){return cancelAnimationFrame(a)}:clearTimeout},Cb="undefined"!==typeof performance&&performance.now?
function(){return performance.now()}:function(){return+new Date},G=hb();G.zero=hb();var Yb=function(a,b){var c=1;b.ext_texture_filter_anisotropic&&(c=a.getParameter(34047));var e=1,f=1;b.webgl_draw_buffers&&(e=a.getParameter(34852),f=a.getParameter(36063));var d=!!b.oes_texture_float;if(d){d=a.createTexture();a.bindTexture(3553,d);a.texImage2D(3553,0,6408,1,1,0,6408,5126,null);var q=a.createFramebuffer();a.bindFramebuffer(36160,q);a.framebufferTexture2D(36160,36064,3553,d,0);a.bindTexture(3553,null);
if(36053!==a.checkFramebufferStatus(36160))d=!1;else{a.viewport(0,0,1,1);a.clearColor(1,0,0,1);a.clear(16384);var n=G.allocType(5126,4);a.readPixels(0,0,1,1,6408,5126,n);a.getError()?d=!1:(a.deleteFramebuffer(q),a.deleteTexture(d),d=1===n[0]);G.freeType(n)}}n=!0;"undefined"!==typeof navigator&&(/MSIE/.test(navigator.userAgent)||/Trident\//.test(navigator.appVersion)||/Edge/.test(navigator.userAgent))||(n=a.createTexture(),q=G.allocType(5121,36),a.activeTexture(33984),a.bindTexture(34067,n),a.texImage2D(34069,
0,6408,3,3,0,6408,5121,q),G.freeType(q),a.bindTexture(34067,null),a.deleteTexture(n),n=!a.getError());return{colorBits:[a.getParameter(3410),a.getParameter(3411),a.getParameter(3412),a.getParameter(3413)],depthBits:a.getParameter(3414),stencilBits:a.getParameter(3415),subpixelBits:a.getParameter(3408),extensions:Object.keys(b).filter(function(a){return!!b[a]}),maxAnisotropic:c,maxDrawbuffers:e,maxColorAttachments:f,pointSizeDims:a.getParameter(33901),lineWidthDims:a.getParameter(33902),maxViewportDims:a.getParameter(3386),
maxCombinedTextureUnits:a.getParameter(35661),maxCubeMapSize:a.getParameter(34076),maxRenderbufferSize:a.getParameter(34024),maxTextureUnits:a.getParameter(34930),maxTextureSize:a.getParameter(3379),maxAttributes:a.getParameter(34921),maxVertexUniforms:a.getParameter(36347),maxVertexTextureUnits:a.getParameter(35660),maxVaryingVectors:a.getParameter(36348),maxFragmentUniforms:a.getParameter(36349),glsl:a.getParameter(35724),renderer:a.getParameter(7937),vendor:a.getParameter(7936),version:a.getParameter(7938),
readFloat:d,npotTextureCube:n}},O=function(a){return a instanceof Uint8Array||a instanceof Uint16Array||a instanceof Uint32Array||a instanceof Int8Array||a instanceof Int16Array||a instanceof Int32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof Uint8ClampedArray},I=function(a){return Object.keys(a).map(function(b){return a[b]})},Qa={shape:function(a){for(var b=[];a.length;a=a[0])b.push(a.length);return b},flatten:function(a,b,c,e){var f=1;if(b.length)for(var d=0;d<b.length;++d)f*=
b[d];else f=0;c=e||G.allocType(c,f);switch(b.length){case 0:break;case 1:e=b[0];for(b=0;b<e;++b)c[b]=a[b];break;case 2:e=b[0];b=b[1];for(d=f=0;d<e;++d)for(var q=a[d],n=0;n<b;++n)c[f++]=q[n];break;case 3:ib(a,b[0],b[1],b[2],c,0);break;default:jb(a,b,0,c,0)}return c}},Ia={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,
"[object ArrayBuffer]":5121},Ja={int8:5120,int16:5122,int32:5124,uint8:5121,uint16:5123,uint32:5125,"float":5126,float32:5126},nb={dynamic:35048,stream:35040,"static":35044},Ua=Qa.flatten,mb=Qa.shape,na=[];na[5120]=1;na[5122]=2;na[5124]=4;na[5121]=1;na[5123]=2;na[5125]=4;na[5126]=4;var Ka={points:0,point:0,lines:1,line:1,triangles:4,triangle:4,"line loop":2,"line strip":3,"triangle strip":5,"triangle fan":6},pb=new Float32Array(1),Lb=new Uint32Array(pb.buffer),Pb=[9984,9986,9985,9987],Oa=[0,6409,
6410,6407,6408],U={};U[6409]=U[6406]=U[6402]=1;U[34041]=U[6410]=2;U[6407]=U[35904]=3;U[6408]=U[35906]=4;var Xa=sa("HTMLCanvasElement"),Ya=sa("OffscreenCanvas"),ub=sa("CanvasRenderingContext2D"),vb=sa("ImageBitmap"),wb=sa("HTMLImageElement"),xb=sa("HTMLVideoElement"),Mb=Object.keys(Ia).concat([Xa,Ya,ub,vb,wb,xb]),za=[];za[5121]=1;za[5126]=4;za[36193]=2;za[5123]=2;za[5125]=4;var C=[];C[32854]=2;C[32855]=2;C[36194]=2;C[34041]=4;C[33776]=.5;C[33777]=.5;C[33778]=1;C[33779]=1;C[35986]=.5;C[35987]=1;C[34798]=
1;C[35840]=.5;C[35841]=.25;C[35842]=.5;C[35843]=.25;C[36196]=.5;var Q=[];Q[32854]=2;Q[32855]=2;Q[36194]=2;Q[33189]=2;Q[36168]=1;Q[34041]=4;Q[35907]=4;Q[34836]=16;Q[34842]=8;Q[34843]=6;var Zb=function(a,b,c,e,f){function d(a){this.id=k++;this.refCount=1;this.renderbuffer=a;this.format=32854;this.height=this.width=0;f.profile&&(this.stats={size:0})}function q(b){var c=b.renderbuffer;a.bindRenderbuffer(36161,null);a.deleteRenderbuffer(c);b.renderbuffer=null;b.refCount=0;delete u[b.id];e.renderbufferCount--}
var n={rgba4:32854,rgb565:36194,"rgb5 a1":32855,depth:33189,stencil:36168,"depth stencil":34041};b.ext_srgb&&(n.srgba=35907);b.ext_color_buffer_half_float&&(n.rgba16f=34842,n.rgb16f=34843);b.webgl_color_buffer_float&&(n.rgba32f=34836);var v=[];Object.keys(n).forEach(function(a){v[n[a]]=a});var k=0,u={};d.prototype.decRef=function(){0>=--this.refCount&&q(this)};f.profile&&(e.getTotalRenderbufferSize=function(){var a=0;Object.keys(u).forEach(function(b){a+=u[b].stats.size});return a});return{create:function(b,
c){function l(b,c){var d=0,e=0,k=32854;"object"===typeof b&&b?("shape"in b?(e=b.shape,d=e[0]|0,e=e[1]|0):("radius"in b&&(d=e=b.radius|0),"width"in b&&(d=b.width|0),"height"in b&&(e=b.height|0)),"format"in b&&(k=n[b.format])):"number"===typeof b?(d=b|0,e="number"===typeof c?c|0:d):b||(d=e=1);if(d!==g.width||e!==g.height||k!==g.format)return l.width=g.width=d,l.height=g.height=e,g.format=k,a.bindRenderbuffer(36161,g.renderbuffer),a.renderbufferStorage(36161,k,d,e),f.profile&&(g.stats.size=Q[g.format]*
g.width*g.height),l.format=v[g.format],l}var g=new d(a.createRenderbuffer());u[g.id]=g;e.renderbufferCount++;l(b,c);l.resize=function(b,c){var d=b|0,e=c|0||d;if(d===g.width&&e===g.height)return l;l.width=g.width=d;l.height=g.height=e;a.bindRenderbuffer(36161,g.renderbuffer);a.renderbufferStorage(36161,g.format,d,e);f.profile&&(g.stats.size=Q[g.format]*g.width*g.height);return l};l._reglType="renderbuffer";l._renderbuffer=g;f.profile&&(l.stats=g.stats);l.destroy=function(){g.decRef()};return l},clear:function(){I(u).forEach(q)},
restore:function(){I(u).forEach(function(b){b.renderbuffer=a.createRenderbuffer();a.bindRenderbuffer(36161,b.renderbuffer);a.renderbufferStorage(36161,b.format,b.width,b.height)});a.bindRenderbuffer(36161,null)}}},Za=[];Za[6408]=4;Za[6407]=3;var Ra=[];Ra[5121]=1;Ra[5126]=4;Ra[36193]=2;var Da=["x","y","z","w"],Xb="blend.func blend.equation stencil.func stencil.opFront stencil.opBack sample.coverage viewport scissor.box polygonOffset.offset".split(" "),Ga={0:0,1:1,zero:0,one:1,"src color":768,"one minus src color":769,
"src alpha":770,"one minus src alpha":771,"dst color":774,"one minus dst color":775,"dst alpha":772,"one minus dst alpha":773,"constant color":32769,"one minus constant color":32770,"constant alpha":32771,"one minus constant alpha":32772,"src alpha saturate":776},ab={never:512,less:513,"<":513,equal:514,"=":514,"==":514,"===":514,lequal:515,"<=":515,greater:516,">":516,notequal:517,"!=":517,"!==":517,gequal:518,">=":518,always:519},Ta={0:0,zero:0,keep:7680,replace:7681,increment:7682,decrement:7683,
"increment wrap":34055,"decrement wrap":34056,invert:5386},zb={cw:2304,ccw:2305},Ab=new J(!1,!1,!1,function(){}),$b=function(a,b){function c(){this.endQueryIndex=this.startQueryIndex=-1;this.sum=0;this.stats=null}function e(a,b,d){var e=q.pop()||new c;e.startQueryIndex=a;e.endQueryIndex=b;e.sum=0;e.stats=d;n.push(e)}if(!b.ext_disjoint_timer_query)return null;var f=[],d=[],q=[],n=[],v=[],k=[];return{beginQuery:function(a){var c=f.pop()||b.ext_disjoint_timer_query.createQueryEXT();b.ext_disjoint_timer_query.beginQueryEXT(35007,
c);d.push(c);e(d.length-1,d.length,a)},endQuery:function(){b.ext_disjoint_timer_query.endQueryEXT(35007)},pushScopeStats:e,update:function(){var a,c;a=d.length;if(0!==a){k.length=Math.max(k.length,a+1);v.length=Math.max(v.length,a+1);v[0]=0;var e=k[0]=0;for(c=a=0;c<d.length;++c){var l=d[c];b.ext_disjoint_timer_query.getQueryObjectEXT(l,34919)?(e+=b.ext_disjoint_timer_query.getQueryObjectEXT(l,34918),f.push(l)):d[a++]=l;v[c+1]=e;k[c+1]=a}d.length=a;for(c=a=0;c<n.length;++c){var e=n[c],g=e.startQueryIndex,
l=e.endQueryIndex;e.sum+=v[l]-v[g];g=k[g];l=k[l];l===g?(e.stats.gpuTime+=e.sum/1E6,q.push(e)):(e.startQueryIndex=g,e.endQueryIndex=l,n[a++]=e)}n.length=a}},getNumPendingQueries:function(){return d.length},clear:function(){f.push.apply(f,d);for(var a=0;a<f.length;a++)b.ext_disjoint_timer_query.deleteQueryEXT(f[a]);d.length=0;f.length=0},restore:function(){d.length=0;f.length=0}}};return function(a){function b(){if(0===E.length)t&&t.update(),ca=null;else{ca=bb.next(b);u();for(var a=E.length-1;0<=a;--a){var c=
E[a];c&&c(H,null,0)}l.flush();t&&t.update()}}function c(){!ca&&0<E.length&&(ca=bb.next(b))}function e(){ca&&(bb.cancel(b),ca=null)}function f(a){a.preventDefault();e();R.forEach(function(a){a()})}function d(a){l.getError();h.restore();F.restore();y.restore();A.restore();O.restore();S.restore();K.restore();t&&t.restore();I.procs.refresh();c();U.forEach(function(a){a()})}function q(a){function b(a,c){var d={},e={};Object.keys(a).forEach(function(b){var f=a[b];if(Y.isDynamic(f))e[b]=Y.unbox(f,b);else{if(c&&
Array.isArray(f))for(var g=0;g<f.length;++g)if(Y.isDynamic(f[g])){e[b]=Y.unbox(f,b);return}d[b]=f}});return{dynamic:e,"static":d}}function c(a){for(;n.length<a;)n.push(null);return n}var d=b(a.context||{},!0),e=b(a.uniforms||{},!0),f=b(a.attributes||{},!1);a=b(function(a){function b(a){if(a in c){var d=c[a];delete c[a];Object.keys(d).forEach(function(b){c[a+"."+b]=d[b]})}}var c=L({},a);delete c.uniforms;delete c.attributes;delete c.context;delete c.vao;"stencil"in c&&c.stencil.op&&(c.stencil.opBack=
c.stencil.opFront=c.stencil.op,delete c.stencil.op);b("blend");b("depth");b("cull");b("stencil");b("polygonOffset");b("scissor");b("sample");"vao"in a&&(c.vao=a.vao);return c}(a),!1);var g={gpuTime:0,cpuTime:0,count:0},h=I.compile(a,f,e,d,g),k=h.draw,l=h.batch,m=h.scope,n=[];return L(function(a,b){var d;if("function"===typeof a)return m.call(this,null,a,0);if("function"===typeof b)if("number"===typeof a)for(d=0;d<a;++d)m.call(this,null,b,d);else if(Array.isArray(a))for(d=0;d<a.length;++d)m.call(this,
a[d],b,d);else return m.call(this,a,b,0);else if("number"===typeof a){if(0<a)return l.call(this,c(a|0),a|0)}else if(Array.isArray(a)){if(a.length)return l.call(this,a,a.length)}else return k.call(this,a)},{stats:g,destroy:function(){h.destroy()}})}function n(a,b){var c=0;I.procs.poll();var d=b.color;d&&(l.clearColor(+d[0]||0,+d[1]||0,+d[2]||0,+d[3]||0),c|=16384);"depth"in b&&(l.clearDepth(+b.depth),c|=256);"stencil"in b&&(l.clearStencil(b.stencil|0),c|=1024);l.clear(c)}function v(a){E.push(a);c();
return{cancel:function(){function b(){var a=Bb(E,b);E[a]=E[E.length-1];--E.length;0>=E.length&&e()}var c=Bb(E,a);E[c]=b}}}function k(){var a=Q.viewport,b=Q.scissor_box;a[0]=a[1]=b[0]=b[1]=0;H.viewportWidth=H.framebufferWidth=H.drawingBufferWidth=a[2]=b[2]=l.drawingBufferWidth;H.viewportHeight=H.framebufferHeight=H.drawingBufferHeight=a[3]=b[3]=l.drawingBufferHeight}function u(){H.tick+=1;H.time=x();k();I.procs.poll()}function m(){A.refresh();k();I.procs.refresh();t&&t.update()}function x(){return(Cb()-
G)/1E3}a=Hb(a);if(!a)return null;var l=a.gl,g=l.getContextAttributes();l.isContextLost();var h=Ib(l,a);if(!h)return null;var r=Eb(),p={vaoCount:0,bufferCount:0,elementsCount:0,framebufferCount:0,shaderCount:0,textureCount:0,cubeCount:0,renderbufferCount:0,maxTextureUnits:0},w=h.extensions,t=$b(l,w),G=Cb(),C=l.drawingBufferWidth,J=l.drawingBufferHeight,H={tick:0,time:0,viewportWidth:C,viewportHeight:J,framebufferWidth:C,framebufferHeight:J,drawingBufferWidth:C,drawingBufferHeight:J,pixelRatio:a.pixelRatio},
C={elements:null,primitive:4,count:-1,offset:0,instances:-1},M=Yb(l,w),y=Jb(l,p,a,function(a){return K.destroyBuffer(a)}),T=Kb(l,w,y,p),K=Sb(l,w,M,p,y,T,C),F=Tb(l,r,p,a),A=Nb(l,w,M,function(){I.procs.poll()},H,p,a),O=Zb(l,w,M,p,a),S=Rb(l,w,M,A,O,p),I=Wb(l,r,w,M,y,T,A,S,{},K,F,C,H,t,a),r=Ub(l,S,I.procs.poll,H,g,w,M),Q=I.next,N=l.canvas,E=[],R=[],U=[],Z=[a.onDestroy],ca=null;N&&(N.addEventListener("webglcontextlost",f,!1),N.addEventListener("webglcontextrestored",d,!1));var aa=S.setFBO=q({framebuffer:Y.define.call(null,
1,"framebuffer")});m();g=L(q,{clear:function(a){if("framebuffer"in a)if(a.framebuffer&&"framebufferCube"===a.framebuffer_reglType)for(var b=0;6>b;++b)aa(L({framebuffer:a.framebuffer.faces[b]},a),n);else aa(a,n);else n(null,a)},prop:Y.define.bind(null,1),context:Y.define.bind(null,2),"this":Y.define.bind(null,3),draw:q({}),buffer:function(a){return y.create(a,34962,!1,!1)},elements:function(a){return T.create(a,!1)},texture:A.create2D,cube:A.createCube,renderbuffer:O.create,framebuffer:S.create,framebufferCube:S.createCube,
vao:K.createVAO,attributes:g,frame:v,on:function(a,b){var c;switch(a){case "frame":return v(b);case "lost":c=R;break;case "restore":c=U;break;case "destroy":c=Z}c.push(b);return{cancel:function(){for(var a=0;a<c.length;++a)if(c[a]===b){c[a]=c[c.length-1];c.pop();break}}}},limits:M,hasExtension:function(a){return 0<=M.extensions.indexOf(a.toLowerCase())},read:r,destroy:function(){E.length=0;e();N&&(N.removeEventListener("webglcontextlost",f),N.removeEventListener("webglcontextrestored",d));F.clear();
S.clear();O.clear();K.clear();A.clear();T.clear();y.clear();t&&t.clear();Z.forEach(function(a){a()})},_gl:l,_refresh:m,poll:function(){u();t&&t.update()},now:x,stats:p});a.onDone(null,g);return g}});

},{}],43:[function(require,module,exports){
/* global XMLHttpRequest */
var configParameters = [
  'manifest',
  'onDone',
  'onProgress',
  'onError'
]

var manifestParameters = [
  'type',
  'src',
  'stream',
  'credentials',
  'parser'
]

var parserParameters = [
  'onData',
  'onDone'
]

var STATE_ERROR = -1
var STATE_DATA = 0
var STATE_COMPLETE = 1

function raise (message) {
  throw new Error('resl: ' + message)
}

function checkType (object, parameters, name) {
  Object.keys(object).forEach(function (param) {
    if (parameters.indexOf(param) < 0) {
      raise('invalid parameter "' + param + '" in ' + name)
    }
  })
}

function Loader (name, cancel) {
  this.state = STATE_DATA
  this.ready = false
  this.progress = 0
  this.name = name
  this.cancel = cancel
}

module.exports = function resl (config) {
  if (typeof config !== 'object' || !config) {
    raise('invalid or missing configuration')
  }

  checkType(config, configParameters, 'config')

  var manifest = config.manifest
  if (typeof manifest !== 'object' || !manifest) {
    raise('missing manifest')
  }

  function getFunction (name, dflt) {
    if (name in config) {
      var func = config[name]
      if (typeof func !== 'function') {
        raise('invalid callback "' + name + '"')
      }
      return func
    }
    return null
  }

  var onDone = getFunction('onDone')
  if (!onDone) {
    raise('missing onDone() callback')
  }

  var onProgress = getFunction('onProgress')
  var onError = getFunction('onError')

  var assets = {}

  var state = STATE_DATA

  function loadXHR (request) {
    var name = request.name
    var stream = request.stream
    var binary = request.type === 'binary'
    var parser = request.parser

    var xhr = new XMLHttpRequest()
    var asset = null

    var loader = new Loader(name, cancel)

    if (stream) {
      xhr.onreadystatechange = onReadyStateChange
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          onReadyStateChange()
        }
      }
    }

    if (binary) {
      xhr.responseType = 'arraybuffer'
    }

    function onReadyStateChange () {
      if (xhr.readyState < 2 ||
          loader.state === STATE_COMPLETE ||
          loader.state === STATE_ERROR) {
        return
      }
      if (xhr.status !== 200) {
        return abort('error loading resource "' + request.name + '"')
      }
      if (xhr.readyState > 2 && loader.state === STATE_DATA) {
        var response
        if (request.type === 'binary') {
          response = xhr.response
        } else {
          response = xhr.responseText
        }
        if (parser.data) {
          try {
            asset = parser.data(response)
          } catch (e) {
            return abort(e)
          }
        } else {
          asset = response
        }
      }
      if (xhr.readyState > 3 && loader.state === STATE_DATA) {
        if (parser.done) {
          try {
            asset = parser.done()
          } catch (e) {
            return abort(e)
          }
        }
        loader.state = STATE_COMPLETE
      }
      assets[name] = asset
      loader.progress = 0.75 * loader.progress + 0.25
      loader.ready =
        (request.stream && !!asset) ||
        loader.state === STATE_COMPLETE
      notifyProgress()
    }

    function cancel () {
      if (loader.state === STATE_COMPLETE || loader.state === STATE_ERROR) {
        return
      }
      xhr.onreadystatechange = null
      xhr.abort()
      loader.state = STATE_ERROR
    }

    // set up request
    if (request.credentials) {
      xhr.withCredentials = true
    }
    xhr.open('GET', request.src, true)
    xhr.send()

    return loader
  }

  function loadElement (request, element) {
    var name = request.name
    var parser = request.parser

    var loader = new Loader(name, cancel)
    var asset = element

    function handleProgress () {
      if (loader.state === STATE_DATA) {
        if (parser.data) {
          try {
            asset = parser.data(element)
          } catch (e) {
            return abort(e)
          }
        } else {
          asset = element
        }
      }
    }

    function onProgress (e) {
      handleProgress()
      assets[name] = asset
      if (e.lengthComputable) {
        loader.progress = Math.max(loader.progress, e.loaded / e.total)
      } else {
        loader.progress = 0.75 * loader.progress + 0.25
      }
      notifyProgress(name)
    }

    function onComplete () {
      handleProgress()
      if (loader.state === STATE_DATA) {
        if (parser.done) {
          try {
            asset = parser.done()
          } catch (e) {
            return abort(e)
          }
        }
        loader.state = STATE_COMPLETE
      }
      loader.progress = 1
      loader.ready = true
      assets[name] = asset
      removeListeners()
      notifyProgress('finish ' + name)
    }

    function onError () {
      abort('error loading asset "' + name + '"')
    }

    if (request.stream) {
      element.addEventListener('progress', onProgress)
    }
    if (request.type === 'image') {
      element.addEventListener('load', onComplete)
    } else {
      var canPlay = false
      var loadedMetaData = false
      element.addEventListener('loadedmetadata', function () {
        loadedMetaData = true
        if (canPlay) {
          onComplete()
        }
      })
      element.addEventListener('canplay', function () {
        canPlay = true
        if (loadedMetaData) {
          onComplete()
        }
      })
    }
    element.addEventListener('error', onError)

    function removeListeners () {
      if (request.stream) {
        element.removeEventListener('progress', onProgress)
      }
      if (request.type === 'image') {
        element.addEventListener('load', onComplete)
      } else {
        element.addEventListener('canplay', onComplete)
      }
      element.removeEventListener('error', onError)
    }

    function cancel () {
      if (loader.state === STATE_COMPLETE || loader.state === STATE_ERROR) {
        return
      }
      loader.state = STATE_ERROR
      removeListeners()
      element.src = ''
    }

    // set up request
    if (request.credentials) {
      element.crossOrigin = 'use-credentials'
    } else {
      element.crossOrigin = 'anonymous'
    }
    element.src = request.src

    return loader
  }

  var loaders = {
    text: loadXHR,
    binary: function (request) {
      // TODO use fetch API for streaming if supported
      return loadXHR(request)
    },
    image: function (request) {
      return loadElement(request, document.createElement('img'))
    },
    video: function (request) {
      return loadElement(request, document.createElement('video'))
    },
    audio: function (request) {
      return loadElement(request, document.createElement('audio'))
    }
  }

  // First we parse all objects in order to verify that all type information
  // is correct
  var pending = Object.keys(manifest).map(function (name) {
    var request = manifest[name]
    if (typeof request === 'string') {
      request = {
        src: request
      }
    } else if (typeof request !== 'object' || !request) {
      raise('invalid asset definition "' + name + '"')
    }

    checkType(request, manifestParameters, 'asset "' + name + '"')

    function getParameter (prop, accepted, init) {
      var value = init
      if (prop in request) {
        value = request[prop]
      }
      if (accepted.indexOf(value) < 0) {
        raise('invalid ' + prop + ' "' + value + '" for asset "' + name + '", possible values: ' + accepted)
      }
      return value
    }

    function getString (prop, required, init) {
      var value = init
      if (prop in request) {
        value = request[prop]
      } else if (required) {
        raise('missing ' + prop + ' for asset "' + name + '"')
      }
      if (typeof value !== 'string') {
        raise('invalid ' + prop + ' for asset "' + name + '", must be a string')
      }
      return value
    }

    function getParseFunc (name, dflt) {
      if (name in request.parser) {
        var result = request.parser[name]
        if (typeof result !== 'function') {
          raise('invalid parser callback ' + name + ' for asset "' + name + '"')
        }
        return result
      } else {
        return dflt
      }
    }

    var parser = {}
    if ('parser' in request) {
      if (typeof request.parser === 'function') {
        parser = {
          data: request.parser
        }
      } else if (typeof request.parser === 'object' && request.parser) {
        checkType(parser, parserParameters, 'parser for asset "' + name + '"')
        if (!('onData' in parser)) {
          raise('missing onData callback for parser in asset "' + name + '"')
        }
        parser = {
          data: getParseFunc('onData'),
          done: getParseFunc('onDone')
        }
      } else {
        raise('invalid parser for asset "' + name + '"')
      }
    }

    return {
      name: name,
      type: getParameter('type', Object.keys(loaders), 'text'),
      stream: !!request.stream,
      credentials: !!request.credentials,
      src: getString('src', true, ''),
      parser: parser
    }
  }).map(function (request) {
    return (loaders[request.type])(request)
  })

  function abort (message) {
    if (state === STATE_ERROR || state === STATE_COMPLETE) {
      return
    }
    state = STATE_ERROR
    pending.forEach(function (loader) {
      loader.cancel()
    })
    if (onError) {
      if (typeof message === 'string') {
        onError(new Error('resl: ' + message))
      } else {
        onError(message)
      }
    } else {
      console.error('resl error:', message)
    }
  }

  function notifyProgress (message) {
    if (state === STATE_ERROR || state === STATE_COMPLETE) {
      return
    }

    var progress = 0
    var numReady = 0
    pending.forEach(function (loader) {
      if (loader.ready) {
        numReady += 1
      }
      progress += loader.progress
    })

    if (numReady === pending.length) {
      state = STATE_COMPLETE
      onDone(assets)
    } else {
      if (onProgress) {
        onProgress(progress / pending.length, message)
      }
    }
  }

  if (pending.length === 0) {
    setTimeout(function () {
      notifyProgress('done')
    }, 1)
  }
}

},{}],44:[function(require,module,exports){
var Emitter = require('events/')
var wheel = require('wheel')

module.exports = getScroller

function getScroller(element, preventDefault) {
  var scroll = new Emitter

  scroll.flush = flush
  flush()

  if (typeof window === 'undefined') {
    return scroll
  }

  element = element || window
  wheel(element, onscroll, false)

  return scroll

  function flush() {
    scroll[0] =
    scroll[1] =
    scroll[2] = 0
  }

  function onscroll(e) {
    // Normal/Line scrolling
    var scale = e.deltaMode === 1 ? 12 : 1

    scroll[0] += scale * (e.deltaX || 0)
    scroll[1] += scale * (e.deltaY || 0)
    scroll[2] += scale * (e.deltaZ || 0)
    scroll.emit('scroll', scroll)

    if (!preventDefault) return
    if (!e.preventDefault) return

    e.preventDefault()
    if (e.stopPropagation) e.stopPropagation()
  }
}

},{"events/":45,"wheel":47}],45:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],46:[function(require,module,exports){
var ua = typeof window !== 'undefined' ? window.navigator.userAgent : ''
  , isOSX = /OS X/.test(ua)
  , isOpera = /Opera/.test(ua)
  , maybeFirefox = !/like Gecko/.test(ua) && !isOpera

var i, output = module.exports = {
  0:  isOSX ? '<menu>' : '<UNK>'
, 1:  '<mouse 1>'
, 2:  '<mouse 2>'
, 3:  '<break>'
, 4:  '<mouse 3>'
, 5:  '<mouse 4>'
, 6:  '<mouse 5>'
, 8:  '<backspace>'
, 9:  '<tab>'
, 12: '<clear>'
, 13: '<enter>'
, 16: '<shift>'
, 17: '<control>'
, 18: '<alt>'
, 19: '<pause>'
, 20: '<caps-lock>'
, 21: '<ime-hangul>'
, 23: '<ime-junja>'
, 24: '<ime-final>'
, 25: '<ime-kanji>'
, 27: '<escape>'
, 28: '<ime-convert>'
, 29: '<ime-nonconvert>'
, 30: '<ime-accept>'
, 31: '<ime-mode-change>'
, 27: '<escape>'
, 32: '<space>'
, 33: '<page-up>'
, 34: '<page-down>'
, 35: '<end>'
, 36: '<home>'
, 37: '<left>'
, 38: '<up>'
, 39: '<right>'
, 40: '<down>'
, 41: '<select>'
, 42: '<print>'
, 43: '<execute>'
, 44: '<snapshot>'
, 45: '<insert>'
, 46: '<delete>'
, 47: '<help>'
, 91: '<meta>'  // meta-left -- no one handles left and right properly, so we coerce into one.
, 92: '<meta>'  // meta-right
, 93: isOSX ? '<meta>' : '<menu>'      // chrome,opera,safari all report this for meta-right (osx mbp).
, 95: '<sleep>'
, 106: '<num-*>'
, 107: '<num-+>'
, 108: '<num-enter>'
, 109: '<num-->'
, 110: '<num-.>'
, 111: '<num-/>'
, 144: '<num-lock>'
, 145: '<scroll-lock>'
, 160: '<shift-left>'
, 161: '<shift-right>'
, 162: '<control-left>'
, 163: '<control-right>'
, 164: '<alt-left>'
, 165: '<alt-right>'
, 166: '<browser-back>'
, 167: '<browser-forward>'
, 168: '<browser-refresh>'
, 169: '<browser-stop>'
, 170: '<browser-search>'
, 171: '<browser-favorites>'
, 172: '<browser-home>'

  // ff/osx reports '<volume-mute>' for '-'
, 173: isOSX && maybeFirefox ? '-' : '<volume-mute>'
, 174: '<volume-down>'
, 175: '<volume-up>'
, 176: '<next-track>'
, 177: '<prev-track>'
, 178: '<stop>'
, 179: '<play-pause>'
, 180: '<launch-mail>'
, 181: '<launch-media-select>'
, 182: '<launch-app 1>'
, 183: '<launch-app 2>'
, 186: ';'
, 187: '='
, 188: ','
, 189: '-'
, 190: '.'
, 191: '/'
, 192: '`'
, 219: '['
, 220: '\\'
, 221: ']'
, 222: "'"
, 223: '<meta>'
, 224: '<meta>'       // firefox reports meta here.
, 226: '<alt-gr>'
, 229: '<ime-process>'
, 231: isOpera ? '`' : '<unicode>'
, 246: '<attention>'
, 247: '<crsel>'
, 248: '<exsel>'
, 249: '<erase-eof>'
, 250: '<play>'
, 251: '<zoom>'
, 252: '<no-name>'
, 253: '<pa-1>'
, 254: '<clear>'
}

for(i = 58; i < 65; ++i) {
  output[i] = String.fromCharCode(i)
}

// 0-9
for(i = 48; i < 58; ++i) {
  output[i] = (i - 48)+''
}

// A-Z
for(i = 65; i < 91; ++i) {
  output[i] = String.fromCharCode(i)
}

// num0-9
for(i = 96; i < 106; ++i) {
  output[i] = '<num-'+(i - 96)+'>'
}

// F1-F24
for(i = 112; i < 136; ++i) {
  output[i] = 'F'+(i-111)
}

},{}],47:[function(require,module,exports){
/**
 * This module unifies handling of mouse whee event accross different browsers
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel?redirectlocale=en-US&redirectslug=DOM%2FMozilla_event_reference%2Fwheel
 * for more details
 *
 * Usage:
 *  var addWheelListener = require('wheel');
 *  addWheelListener(domElement, function (e) {
 *    // mouse wheel event
 *  });
 */
module.exports = addWheelListener;

var prefix = "", _addEventListener, onwheel, support;

// detect event model
if ( window.addEventListener ) {
    _addEventListener = "addEventListener";
} else {
    _addEventListener = "attachEvent";
    prefix = "on";
}

// detect available wheel event
support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
          "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

function addWheelListener( elem, callback, useCapture ) {
    _addWheelListener( elem, support, callback, useCapture );

    // handle MozMousePixelScroll in older Firefox
    if( support == "DOMMouseScroll" ) {
        _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
    }
};

function _addWheelListener( elem, eventName, callback, useCapture ) {
  elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
    !originalEvent && ( originalEvent = window.event );

    // create a normalized event object
    var event = {
      // keep a ref to the original event object
      originalEvent: originalEvent,
      target: originalEvent.target || originalEvent.srcElement,
      type: "wheel",
      deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
      deltaX: 0,
      delatZ: 0,
      preventDefault: function() {
        originalEvent.preventDefault ?
            originalEvent.preventDefault() :
            originalEvent.returnValue = false;
      }
    };

    // calculate deltaY (and deltaX) according to the event
    if ( support == "mousewheel" ) {
      event.deltaY = - 1/40 * originalEvent.wheelDelta;
      // Webkit also support wheelDeltaX
      originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
    } else {
      event.deltaY = originalEvent.detail;
    }

    // it's time to fire the callback
    return callback( event );

  }, useCapture || false );
}

},{}],48:[function(require,module,exports){
/*
  tags: basic

  <p>This example shows how you can implement a simple Minecraft renderer in regl.</p>
 */

const canvas = document.body.appendChild(document.createElement('canvas'));
const fit = require('canvas-fit');
const regl = require('regl')(canvas);
const mat4 = require('gl-mat4');
const camera = require('canvas-orbit-camera')(canvas);
window.addEventListener('resize', fit(canvas), false);

// configure intial camera view.
camera.rotate([0.0, 0.0], [0.0, -0.4]);
camera.zoom(15.0);

// all the positions of a single block.
var blockPosition = [
// side faces
[[-0.5, +0.5, +0.5], [+0.5, +0.5, +0.5], [+0.5, -0.5, +0.5], [-0.5, -0.5, +0.5]],
// positive z face.
[[+0.5, +0.5, +0.5], [+0.5, +0.5, -0.5], [+0.5, -0.5, -0.5], [+0.5, -0.5, +0.5]],
// positive x face
[[+0.5, +0.5, -0.5], [-0.5, +0.5, -0.5], [-0.5, -0.5, -0.5], [+0.5, -0.5, -0.5]],
// negative z face
[[-0.5, +0.5, -0.5], [-0.5, +0.5, +0.5], [-0.5, -0.5, +0.5], [-0.5, -0.5, -0.5]],
// negative x face.
// top faces
[[-0.5, +0.5, -0.5], [+0.5, +0.5, -0.5], [+0.5, +0.5, +0.5], [-0.5, +0.5, +0.5]]];

// all the uvs of a single block.
var blockUv = [
// side faces
[[0.0, 0.5], [0.5, 0.5], [0.5, 1.0], [0.0, 1.0]], [[0.0, 0.5], [0.5, 0.5], [0.5, 1.0], [0.0, 1.0]], [[0.0, 0.5], [0.5, 0.5], [0.5, 1.0], [0.0, 1.0]], [[0.0, 0.5], [0.5, 0.5], [0.5, 1.0], [0.0, 1.0]],
// top
[[0.0, 0.0], [0.5, 0.0], [0.5, 0.5], [0.0, 0.5]]];

// all the normals of a single block.
var blockNormal = [
// side faces
[[0.0, 0.0, +1.0], [0.0, 0.0, +1.0], [0.0, 0.0, +1.0], [0.0, 0.0, +1.0]], [[+1.0, 0.0, 0.0], [+1.0, 0.0, 0.0], [+1.0, 0.0, 0.0], [+1.0, 0.0, 0.0]], [[0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 0.0, -1.0]], [[-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0]],
// top
[[0.0, +1.0, 0.0], [0.0, +1.0, 0.0], [0.0, +1.0, 0.0], [0.0, +1.0, 0.0]]];

// the terrain is just described by some sine functions.
var evalHeight = (x, z) => {
  var freq = 30.0;
  return Math.round(2.0 * Math.sin(freq * 1.0 * 3.14 * x) * Math.sin(freq * 2.0 * 3.14 * z) + 3.0 * Math.cos(freq * 4.0 * 3.14 * x + 2.1) * Math.sin(freq * 5.0 * 3.14 * z + 0.9) + 1.0 * Math.cos(freq * 8.0 * 3.14 * x + 43.43) * Math.cos(freq * 3.0 * 3.14 * z + 34.3));
};

// these contains all the geometry of the world.
// you can add blocks to these arrays by calling addBlock()
var uv = [];
var elements = [];
var position = [];
var normal = [];
var addBlock = (x, y, z) => {
  var index = position.length;
  for (var i = 0; i < 5; i++) {
    if (i === 0 && y <= evalHeight(x, z + 1)) {
      // positive z face
      continue; // not visible, skip
    }

    if (i === 1 && y <= evalHeight(x + 1, z)) {
      // positive x face
      continue; // not visible, skip
    }

    if (i === 2 && y <= evalHeight(x, z - 1)) {
      // negative z face
      continue; // not visible, skip
    }

    if (i === 3 && y <= evalHeight(x - 1, z)) {
      // negative x face
      continue; // not visible, skip
    }

    var j;

    // add positions.
    for (j = 0; j < blockPosition[i].length; j++) {
      var p = blockPosition[i][j];
      position.push([p[0] + x, p[1] + y, p[2] + z]);
    }

    // add normals.
    for (j = 0; j < blockNormal[i].length; j++) {
      var n = blockNormal[i][j];
      normal.push([n[0], n[1], n[2]]);
    }

    // add uvs.
    for (j = 0; j < blockUv[i].length; j++) {
      var a = blockUv[i][j];
      uv.push([a[0], a[1]]);
    }

    // add quad face.
    elements.push([2 + index, 1 + index, 0 + index]);
    elements.push([2 + index, 0 + index, 3 + index]);
    index += 4; // next quad.
  }
};

const S = 40; // world size.

// create world:
for (var x = -S; x <= S; x++) {
  for (var z = -S; z <= S; z++) {
    var y = evalHeight(x, z);
    addBlock(x, y, z);
  }
}

// now the world has been created. Now create the draw call.
const drawWorld = regl({
  cull: {
    enable: true,
    face: 'back'
  },
  context: {
    view: () => camera.view()
  },
  frag: `
  precision mediump float;

  varying vec2 vUv;
  varying vec3 vNormal;

  uniform sampler2D atlas;

  void main () {

    vec3 lightDir = normalize(vec3(0.4, 0.9, 0.3));
    vec3 tex = texture2D(atlas, vUv).rgb;
    vec3 ambient = 0.3 * tex;
    vec3 diffuse = 0.7 * tex * clamp( dot(vNormal, lightDir ), 0.0, 1.0 );

    gl_FragColor = vec4(ambient + diffuse, 1.0);
  }`,
  vert: `
  precision mediump float;

  attribute vec3 position, normal;
  attribute vec2 uv;

  varying vec2 vUv;
  varying vec3 vNormal;

  uniform mat4 projection, view;

  void main() {
    vUv = uv;
    vNormal = normal;
    gl_Position = projection * view * vec4(position, 1);
  }`,
  uniforms: {
    view: regl.context('view'),
    projection: ({
      viewportWidth,
      viewportHeight
    }) => mat4.perspective([], Math.PI / 4, viewportWidth / viewportHeight, 0.01, 1000),
    atlas: regl.prop('atlas')
  },
  attributes: {
    position: regl.prop('position'),
    uv: regl.prop('uv'),
    normal: regl.prop('normal')
  },
  elements: regl.prop('elements')
});
require('resl')({
  manifest: {
    atlas: {
      type: 'image',
      src: 'atlas.png',
      parser: data => regl.texture({
        mag: 'nearest',
        mipmap: true,
        min: 'linear mipmap linear',
        data: data
      })
    }
  },
  onDone: ({
    atlas
  }) => {
    regl.frame(() => {
      drawWorld({
        position,
        elements,
        uv,
        normal,
        atlas
      });
      camera.tick();
    });
  }
});

},{"canvas-fit":1,"canvas-orbit-camera":2,"gl-mat4":19,"regl":42,"resl":43}]},{},[48]);

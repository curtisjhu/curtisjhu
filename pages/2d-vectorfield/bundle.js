import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.1/dist/tweakpane.min.js";

const pane = new Pane({
    title: "2d vector fields",
});

const btn = pane.addButton({
  title: 'refresh',
});

btn.on('click', () => {
	document.location.reload();
});

let noise = octave(perlin2, 2);
const plot = Plot.plot({
  inset: 6,
  width: window.innerWidth,
  height: window.innerHeight,
  aspectRatio: 1,
  axis: null,
  marks: [
    Plot.vector(poisson([0, 0, 2, 2], {n: 1000}), {
      length: ([x, y]) => (noise(x + 2, y) + 0.5) * 24,
      rotate: ([x, y]) => noise(x, y) * 360
    })
  ]
});

const div = document.querySelector("#app");
div.append(plot);





// UTILITIES

function* poisson([x0, y0, x1, y1], {n, k = 30, random = Math.random} = {}) {
  const width = x1 - x0;
  const height = y1 - y0;
  const radius2 = width * height / (n * 1.5);
  const radius = Math.sqrt(radius2);
  const radius2_3 = 3 * radius2;
  const cellSize = radius * Math.SQRT1_2;
  const gridWidth = Math.ceil(width / cellSize);
  const gridHeight = Math.ceil(height / cellSize);
  const grid = new Array(gridWidth * gridHeight);
  const queue = [];

  // Pick the first sample.
  yield sample(width / 2 + random() * radius, height / 2 + random() * radius);

  // Pick a random existing sample from the queue.
  pick: while (queue.length) {
    const i = random() * queue.length | 0;
    const parent = queue[i];

    // Make a new candidate between [radius, 2 * radius] from the existing sample.
    for (let j = 0; j < k; ++j) {
      const a = 2 * Math.PI * random();
      const r = Math.sqrt(random() * radius2_3 + radius2);
      const x = parent[0] + r * Math.cos(a);
      const y = parent[1] + r * Math.sin(a);

      // and farther than 2 * radius to all existing samples.
      if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
        yield sample(x, y);
        continue pick;
      }
    }

    // If none of k candidates were accepted, remove it from the queue.
    const r = queue.pop();
    if (i < queue.length) queue[i] = r;
  }

  function far(x, y) {
    const i = x / cellSize | 0;
    const j = y / cellSize | 0;
    const i0 = Math.max(i - 2, 0);
    const j0 = Math.max(j - 2, 0);
    const i1 = Math.min(i + 3, gridWidth);
    const j1 = Math.min(j + 3, gridHeight);
    for (let j = j0; j < j1; ++j) {
      const o = j * gridWidth;
      for (let i = i0; i < i1; ++i) {
        const s = grid[o + i];
        if (s) {
          const dx = s[0] - x;
          const dy = s[1] - y;
          if (dx * dx + dy * dy < radius2) return false;
        }
      }
    }
    return true;
  }

  function sample(x, y, parent) {
    queue.push(grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = [x, y]);
    return [x + x0, y + y0];
  }
}

function octave(noise, octaves) {
  return function(x, y, z) {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let value = 0;
    for (let i = 0; i < octaves; ++i) {
      value += noise(x * frequency, y * frequency, z * frequency) * amplitude;
      total += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value / total;
  };
}

function perlin2(x, y) {
	var P = Uint8Array.of(151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180)
	var p = new Uint8Array(512);
	for (let i = 0; i < 256; ++i) {
		p[i] = P[i];
		p[i + 256] = P[i];
	}
  const xi = Math.floor(x), yi = Math.floor(y);
  const X = xi & 255, Y = yi & 255;
  const u = fade(x -= xi), v = fade(y -= yi);
  const A = p[X] + Y, B = p[X + 1] + Y;
  return lerp(
    v,
    lerp(u, grad2(p[A], x, y), grad2(p[B], x - 1, y)),
    lerp(u, grad2(p[A + 1], x, y - 1), grad2(p[B + 1], x - 1, y - 1))
  );
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t, a, b) {
  return a + t * (b - a);
}

function grad2(i, x, y) {
  const v = i & 1 ? y : x;
  return i & 2 ? -v : v;
}

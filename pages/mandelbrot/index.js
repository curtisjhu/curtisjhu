const regl = require("regl")();
const tweakpane = require("tweakpane");

const PARAMS = {
    primary: { r: 0, g: 0.6, b: 1 },
    lock: false,
};

const pane = new tweakpane.Pane({
    title: "Mandelbrot",
});

pane.addInput(PARAMS, "primary", { color: { type: "float" } });
pane.addInput(PARAMS, "lock");

const draw = regl({
    frag: `
    precision mediump float;
    varying vec2 fragCoord;
    uniform float iTime;
    uniform vec3 iResolution;
    uniform vec3 primary;

    #define AA 2

  float mandelbrot( in vec2 c )
  {
      #if 1
      {
          float c2 = dot(c, c);
          // skip computation inside M1 - https://iquilezles.org/articles/mset1bulb
          if( 256.0*c2*c2 - 96.0*c2 + 32.0*c.x - 3.0 < 0.0 ) return 0.0;
          // skip computation inside M2 - https://iquilezles.org/articles/mset2bulb
          if( 16.0*(c2+2.0*c.x+1.0) - 1.0 < 0.0 ) return 0.0;
      }
      #endif


      const float B = 256.0;
      float l = 0.0;
      vec2 z  = vec2(0.0);
      for( int i=0; i<512; i++ )
      {
          z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c;
          if( dot(z,z)>(B*B) ) break;
          l += 1.0;
      }

      if( l>511.0 ) return 0.0;
      
      // ------------------------------------------------------
      // smooth interation count
      //float sl = l - log(log(length(z))/log(B))/log(2.0);

      // equivalent optimized smooth interation count
      float sl = l - log2(log2(dot(z,z))) + 4.0;

      float al = smoothstep( -0.1, 0.0, sin(0.5*6.2831*iTime ) );
      l = mix( l, sl, al );

      return l;
    }

    void main() {

      vec3 col = vec3(0.0);
      
    #if AA>1
      for( int m=0; m<AA; m++ )
      for( int n=0; n<AA; n++ )
      {
        vec2 p = (-iResolution.xy + 2.0*(fragCoord.xy+vec2(float(m),float(n))/float(AA)))/iResolution.y;
        p = fragCoord;
        float w = float(AA*m+n);
        float time = iTime + 0.5*(1.0/24.0)*w/float(AA*AA);
    #else    
        vec2 p = (2.0*fragCoord.xy - iResolution.xy)/iResolution.y;
        float time = iTime;
    #endif
      
        // zoom in and out motion
        float zoo = 0.62 + 0.42*cos(.1*time);

        // rotating angles
        float coa = cos( 0.15*(1.0-zoo)*time );
        float sia = sin( 0.15*(1.0-zoo)*time );

        zoo = pow(zoo, 7.0);
        vec2 xy = vec2( p.x*coa-p.y*sia, p.x*sia+p.y*coa);

        // special position
        vec2 c = vec2(-.745,.186) + xy*zoo;

        float l = mandelbrot(c);

        col += 0.5 + 0.5*cos( 3.0 + l*0.15 + primary);
    #if AA>1
      }
      col /= float(AA*AA);
    #endif

      gl_FragColor = vec4( col, 1.0 );
    }`,

    vert: `
    precision mediump float;
    attribute vec2 position;
	  varying vec2 fragCoord;

    void main() {
		  fragCoord = position;
    	gl_Position = vec4(position, 0, 1);
    }`,

    attributes: {
        position: regl.buffer([
            [-1, -1],
            [1, 1],
            [-1, 1],
            [1, 1],
            [-1, -1],
            [1, -1],
        ]),
    },

    uniforms: {
        iTime: (ctx) => ctx.time,
        iResolution: (ctx) => [ctx.viewportWidth, ctx.viewportHeight, 0],
        primary: regl.prop("primary"),
    },

    count: 6,
});

regl.frame(({ time }) => {
    if (!PARAMS.lock) {
        draw({
            primary: Object.values(PARAMS.primary),
        });
    }
});

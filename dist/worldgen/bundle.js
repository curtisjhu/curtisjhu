(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).TweakpaneLatexPlugin={})}(this,(function(e){"use strict";function t(e){return null==e}function r(e){return null!==e&&"object"==typeof e}function n(e){return null!==e&&"object"==typeof e}function i(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function s(e,t){return Array.from(new Set([...Object.keys(e),...Object.keys(t)])).reduce(((r,i)=>{const a=e[i],o=t[i];return n(a)&&n(o)?Object.assign(Object.assign({},r),{[i]:s(a,o)}):Object.assign(Object.assign({},r),{[i]:i in t?o:a})}),{})}const a={alreadydisposed:()=>"View has been already disposed",invalidparams:e=>`Invalid parameters for '${e.name}'`,nomatchingcontroller:e=>`No matching controller for '${e.key}'`,nomatchingview:e=>`No matching view for '${JSON.stringify(e.params)}'`,notbindable:()=>"Value is not bindable",notcompatible:e=>`Not compatible with  plugin '${e.id}'`,propertynotfound:e=>`Property '${e.name}' not found`,shouldneverhappen:()=>"This error should never happen"};class o{static alreadyDisposed(){return new o({type:"alreadydisposed"})}static notBindable(){return new o({type:"notbindable"})}static notCompatible(e,t){return new o({type:"notcompatible",context:{id:`${e}.${t}`}})}static propertyNotFound(e){return new o({type:"propertynotfound",context:{name:e}})}static shouldNeverHappen(){return new o({type:"shouldneverhappen"})}constructor(e){var t;this.message=null!==(t=a[e.type](e.context))&&void 0!==t?t:"Unexpected error",this.name=this.constructor.name,this.stack=new Error(this.message).stack,this.type=e.type}toString(){return this.message}}class l{constructor(e,t){this.obj_=e,this.key=t}static isBindable(e){return null!==e&&("object"==typeof e||"function"==typeof e)}read(){return this.obj_[this.key]}write(e){this.obj_[this.key]=e}writeProperty(e,t){const r=this.read();if(!l.isBindable(r))throw o.notBindable();if(!(e in r))throw o.propertyNotFound(e);r[e]=t}}class h{constructor(){this.observers_={}}on(e,t,r){var n;let i=this.observers_[e];return i||(i=this.observers_[e]=[]),i.push({handler:t,key:null!==(n=null==r?void 0:r.key)&&void 0!==n?n:t}),this}off(e,t){const r=this.observers_[e];return r&&(this.observers_[e]=r.filter((e=>e.key!==t))),this}emit(e,t){const r=this.observers_[e];r&&r.forEach((e=>{e.handler(t)}))}}class c{constructor(e,t){var r;this.constraint_=null==t?void 0:t.constraint,this.equals_=null!==(r=null==t?void 0:t.equals)&&void 0!==r?r:(e,t)=>e===t,this.emitter=new h,this.rawValue_=e}get constraint(){return this.constraint_}get rawValue(){return this.rawValue_}set rawValue(e){this.setRawValue(e,{forceEmit:!1,last:!0})}setRawValue(e,t){const r=null!=t?t:{forceEmit:!1,last:!0},n=this.constraint_?this.constraint_.constrain(e):e,i=this.rawValue_;(!this.equals_(i,n)||r.forceEmit)&&(this.emitter.emit("beforechange",{sender:this}),this.rawValue_=n,this.emitter.emit("change",{options:r,previousRawValue:i,rawValue:n,sender:this}))}}class p{constructor(e){this.emitter=new h,this.value_=e}get rawValue(){return this.value_}set rawValue(e){this.setRawValue(e,{forceEmit:!1,last:!0})}setRawValue(e,t){const r=null!=t?t:{forceEmit:!1,last:!0},n=this.value_;(n!==e||r.forceEmit)&&(this.emitter.emit("beforechange",{sender:this}),this.value_=e,this.emitter.emit("change",{options:r,previousRawValue:n,rawValue:this.value_,sender:this}))}}class u{constructor(e){this.emitter=new h,this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.value_=e,this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_)}get rawValue(){return this.value_.rawValue}onValueBeforeChange_(e){this.emitter.emit("beforechange",Object.assign(Object.assign({},e),{sender:this}))}onValueChange_(e){this.emitter.emit("change",Object.assign(Object.assign({},e),{sender:this}))}}function d(e,t){const r=null==t?void 0:t.constraint,n=null==t?void 0:t.equals;return r||n?new c(e,t):new p(e)}class m{constructor(e){this.emitter=new h,this.valMap_=e;for(const e in this.valMap_){this.valMap_[e].emitter.on("change",(()=>{this.emitter.emit("change",{key:e,sender:this})}))}}static createCore(e){return Object.keys(e).reduce(((t,r)=>Object.assign(t,{[r]:d(e[r])})),{})}static fromObject(e){const t=this.createCore(e);return new m(t)}get(e){return this.valMap_[e].rawValue}set(e,t){this.valMap_[e].rawValue=t}value(e){return this.valMap_[e]}}class g{constructor(e){this.values=m.fromObject({max:e.max,min:e.min})}constrain(e){const t=this.values.get("max"),r=this.values.get("min");return Math.min(Math.max(e,r),t)}}class f{constructor(e){this.values=m.fromObject({max:e.max,min:e.min})}constrain(e){const r=this.values.get("max"),n=this.values.get("min");let i=e;return t(n)||(i=Math.max(i,n)),t(r)||(i=Math.min(i,r)),i}}class v{constructor(e,t=0){this.step=e,this.origin=t}constrain(e){const t=this.origin%this.step;return t+Math.round((e-t)/this.step)*this.step}}class b{constructor(e){this.text=e}evaluate(){return Number(this.text)}toString(){return this.text}}const w={"**":(e,t)=>Math.pow(e,t),"*":(e,t)=>e*t,"/":(e,t)=>e/t,"%":(e,t)=>e%t,"+":(e,t)=>e+t,"-":(e,t)=>e-t,"<<":(e,t)=>e<<t,">>":(e,t)=>e>>t,">>>":(e,t)=>e>>>t,"&":(e,t)=>e&t,"^":(e,t)=>e^t,"|":(e,t)=>e|t};class y{constructor(e,t,r){this.left=t,this.operator=e,this.right=r}evaluate(){const e=w[this.operator];if(!e)throw new Error(`unexpected binary operator: '${this.operator}`);return e(this.left.evaluate(),this.right.evaluate())}toString(){return["b(",this.left.toString(),this.operator,this.right.toString(),")"].join(" ")}}const x={"+":e=>e,"-":e=>-e,"~":e=>~e};class k{constructor(e,t){this.operator=e,this.expression=t}evaluate(){const e=x[this.operator];if(!e)throw new Error(`unexpected unary operator: '${this.operator}`);return e(this.expression.evaluate())}toString(){return["u(",this.operator,this.expression.toString(),")"].join(" ")}}function _(e){return(t,r)=>{for(let n=0;n<e.length;n++){const i=e[n](t,r);if(""!==i)return i}return""}}function S(e,t){var r;const n=e.substr(t).match(/^\s+/);return null!==(r=n&&n[0])&&void 0!==r?r:""}function C(e,t){var r;const n=e.substr(t).match(/^[0-9]+/);return null!==(r=n&&n[0])&&void 0!==r?r:""}function M(e,t){const r=e.substr(t,1);if(t+=1,"e"!==r.toLowerCase())return"";const n=function(e,t){const r=C(e,t);if(""!==r)return r;const n=e.substr(t,1);if("-"!==n&&"+"!==n)return"";const i=C(e,t+=1);return""===i?"":n+i}(e,t);return""===n?"":r+n}function P(e,t){const r=e.substr(t,1);if("0"===r)return r;const n=function(e,t){const r=e.substr(t,1);return r.match(/^[1-9]$/)?r:""}(e,t);return t+=n.length,""===n?"":n+C(e,t)}const z=_([function(e,t){const r=P(e,t);if(t+=r.length,""===r)return"";const n=e.substr(t,1);if(t+=n.length,"."!==n)return"";const i=C(e,t);return r+n+i+M(e,t+=i.length)},function(e,t){const r=e.substr(t,1);if(t+=r.length,"."!==r)return"";const n=C(e,t);return t+=n.length,""===n?"":r+n+M(e,t)},function(e,t){const r=P(e,t);return t+=r.length,""===r?"":r+M(e,t)}]);const A=_([function(e,t){const r=e.substr(t,2);if(t+=r.length,"0b"!==r.toLowerCase())return"";const n=function(e,t){var r;const n=e.substr(t).match(/^[01]+/);return null!==(r=n&&n[0])&&void 0!==r?r:""}(e,t);return""===n?"":r+n},function(e,t){const r=e.substr(t,2);if(t+=r.length,"0o"!==r.toLowerCase())return"";const n=function(e,t){var r;const n=e.substr(t).match(/^[0-7]+/);return null!==(r=n&&n[0])&&void 0!==r?r:""}(e,t);return""===n?"":r+n},function(e,t){const r=e.substr(t,2);if(t+=r.length,"0x"!==r.toLowerCase())return"";const n=function(e,t){var r;const n=e.substr(t).match(/^[0-9a-f]+/i);return null!==(r=n&&n[0])&&void 0!==r?r:""}(e,t);return""===n?"":r+n}]),E=_([A,z]);function T(e,t){var r;return null!==(r=function(e,t){const r=E(e,t);return t+=r.length,""===r?null:{evaluable:new b(r),cursor:t}}(e,t))&&void 0!==r?r:function(e,t){const r=e.substr(t,1);if(t+=r.length,"("!==r)return null;const n=L(e,t);if(!n)return null;t=n.cursor,t+=S(e,t).length;const i=e.substr(t,1);return t+=i.length,")"!==i?null:{evaluable:n.evaluable,cursor:t}}(e,t)}function V(e,t,r){r+=S(t,r).length;const n=e.filter((e=>t.startsWith(e,r)))[0];return n?(r+=n.length,{cursor:r+=S(t,r).length,operator:n}):null}const B=[["**"],["*","/","%"],["+","-"],["<<",">>>",">>"],["&"],["^"],["|"]].reduce(((e,t)=>function(e,t){return(r,n)=>{const i=e(r,n);if(!i)return null;n=i.cursor;let s=i.evaluable;for(;;){const i=V(t,r,n);if(!i)break;n=i.cursor;const a=e(r,n);if(!a)return null;n=a.cursor,s=new y(i.operator,s,a.evaluable)}return s?{cursor:n,evaluable:s}:null}}(e,t)),(function e(t,r){const n=T(t,r);if(n)return n;const i=t.substr(r,1);if(r+=i.length,"+"!==i&&"-"!==i&&"~"!==i)return null;const s=e(t,r);return s?{cursor:r=s.cursor,evaluable:new k(i,s.evaluable)}:null}));function L(e,t){return t+=S(e,t).length,B(e,t)}function N(e){var t;const r=function(e){const t=L(e,0);return t?t.cursor+S(e,t.cursor).length!==e.length?null:t.evaluable:null}(e);return null!==(t=null==r?void 0:r.evaluate())&&void 0!==t?t:null}function R(e){if("number"==typeof e)return e;if("string"==typeof e){const r=N(e);if(!t(r))return r}return 0}function q(e){return t=>t.toFixed(Math.max(Math.min(e,20),0))}function O(e,t,r,n,i){return n+(e-t)/(r-t)*(i-n)}function I(e){return String(e.toFixed(10)).split(".")[1].replace(/0+$/,"").length}function D(e,t,r){return Math.min(Math.max(e,t),r)}function H(e,t){return(e%t+t)%t}function $(e,r){return t(e.step)?Math.max(I(r),2):I(e.step)}function j(e){var t;return null!==(t=e.step)&&void 0!==t?t:1}function F(e,t){var r;const n=Math.abs(null!==(r=e.step)&&void 0!==r?r:t);return 0===n?.1:Math.pow(10,Math.floor(Math.log10(n))-1)}function U(e,r){return t(e.step)?null:new v(e.step,r)}function G(e){return t(e.max)||t(e.min)?t(e.max)&&t(e.min)?null:new f({max:e.max,min:e.min}):new g({max:e.max,min:e.min})}function K(e,t){var r,n,i;return{formatter:null!==(r=e.format)&&void 0!==r?r:q($(e,t)),keyScale:null!==(n=e.keyScale)&&void 0!==n?n:j(e),pointerScale:null!==(i=e.pointerScale)&&void 0!==i?i:F(e,t)}}function Y(e){return{format:e.optional.function,keyScale:e.optional.number,max:e.optional.number,min:e.optional.number,pointerScale:e.optional.number,step:e.optional.number}}function X(e){return{constraint:e.constraint,textProps:m.fromObject(K(e.params,e.initialValue))}}class W{constructor(e){this.controller=e}get element(){return this.controller.view.element}get disabled(){return this.controller.viewProps.get("disabled")}set disabled(e){this.controller.viewProps.set("disabled",e)}get hidden(){return this.controller.viewProps.get("hidden")}set hidden(e){this.controller.viewProps.set("hidden",e)}dispose(){this.controller.viewProps.set("disposed",!0)}importState(e){return this.controller.importState(e)}exportState(){return this.controller.exportState()}}class Z{constructor(e){this.target=e}}class Q extends Z{constructor(e,t,r){super(e),this.value=t,this.last=null==r||r}}class J extends Z{constructor(e,t){super(e),this.expanded=t}}class ee extends Z{constructor(e,t){super(e),this.index=t}}class te extends Z{constructor(e,t){super(e),this.native=t}}class re extends W{constructor(e){super(e),this.onValueChange_=this.onValueChange_.bind(this),this.emitter_=new h,this.controller.value.emitter.on("change",this.onValueChange_)}get label(){return this.controller.labelController.props.get("label")}set label(e){this.controller.labelController.props.set("label",e)}get key(){return this.controller.value.binding.target.key}get tag(){return this.controller.tag}set tag(e){this.controller.tag=e}on(e,t){const r=t.bind(this);return this.emitter_.on(e,(e=>{r(e)}),{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}refresh(){this.controller.value.fetch()}onValueChange_(e){const t=this.controller.value;this.emitter_.emit("change",new Q(this,t.binding.target.read(),e.options.last))}}function ne(e){return t=>r=>{if(!t&&void 0===r)return{succeeded:!1,value:void 0};if(t&&void 0===r)return{succeeded:!0,value:void 0};const n=e(r);return void 0!==n?{succeeded:!0,value:n}:{succeeded:!1,value:void 0}}}function ie(e){return{custom:t=>ne(t)(e),boolean:ne((e=>"boolean"==typeof e?e:void 0))(e),number:ne((e=>"number"==typeof e?e:void 0))(e),string:ne((e=>"string"==typeof e?e:void 0))(e),function:ne((e=>"function"==typeof e?e:void 0))(e),constant:t=>ne((e=>e===t?t:void 0))(e),raw:ne((e=>e))(e),object:t=>ne((e=>{var r;if(null!==(r=e)&&"object"==typeof r)return function(e,t){return Object.keys(t).reduce(((r,n)=>{if(void 0===r)return;const i=(0,t[n])(e[n]);return i.succeeded?Object.assign(Object.assign({},r),{[n]:i.value}):void 0}),{})}(e,t)}))(e),array:t=>ne((e=>{var r;if(Array.isArray(e))return r=t,e.reduce(((e,t)=>{if(void 0===e)return;const n=r(t);return n.succeeded&&void 0!==n.value?[...e,n.value]:void 0}),[])}))(e)}}const se={optional:ie(!0),required:ie(!1)};function ae(e,t){const r=t(se),n=se.required.object(r)(e);return n.succeeded?n.value:void 0}function oe(e,t,r,n){if(t&&!t(e))return!1;const i=ae(e,r);return!!i&&n(i)}function le(e,t){var r;return s(null!==(r=null==e?void 0:e())&&void 0!==r?r:{},t)}function he(e){return"value"in e}function ce(e){if(!r(e)||!("binding"in e))return!1;const t=e.binding;return!!r(n=t)&&"target"in n;var n}const pe="http://www.w3.org/2000/svg";function ue(e){e.offsetHeight}function de(e){return void 0!==e.ontouchstart}const me={check:'<path d="M2 8l4 4l8 -8"/>',dropdown:'<path d="M5 7h6l-3 3 z"/>',p2dpad:'<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'};function ge(e,t){const r=e.createElementNS(pe,"svg");return r.innerHTML=me[t],r}function fe(e,t,r){e.insertBefore(t,e.children[r])}function ve(e){e.parentElement&&e.parentElement.removeChild(e)}function be(e){for(;e.children.length>0;)e.removeChild(e.children[0])}function we(e){return e.relatedTarget?e.relatedTarget:"explicitOriginalTarget"in e?e.explicitOriginalTarget:null}function ye(e,t){e.emitter.on("change",(e=>{t(e.rawValue)})),t(e.rawValue)}function xe(e,t,r){ye(e.value(t),r)}const ke="tp";function _e(e){return(t,r)=>[ke,"-",e,"v",t?`_${t}`:"",r?`-${r}`:""].join("")}const Se=_e("lbl");class Ce{constructor(e,r){this.element=e.createElement("div"),this.element.classList.add(Se()),r.viewProps.bindClassModifiers(this.element);const n=e.createElement("div");n.classList.add(Se("l")),xe(r.props,"label",(r=>{t(r)?this.element.classList.add(Se(void 0,"nol")):(this.element.classList.remove(Se(void 0,"nol")),function(e){for(;e.childNodes.length>0;)e.removeChild(e.childNodes[0])}(n),n.appendChild(function(e,t){const r=e.createDocumentFragment();return t.split("\n").map((t=>e.createTextNode(t))).forEach(((t,n)=>{n>0&&r.appendChild(e.createElement("br")),r.appendChild(t)})),r}(e,r)))})),this.element.appendChild(n),this.labelElement=n;const i=e.createElement("div");i.classList.add(Se("v")),this.element.appendChild(i),this.valueElement=i}}class Me{constructor(e,t){this.props=t.props,this.valueController=t.valueController,this.viewProps=t.valueController.viewProps,this.view=new Ce(e,{props:t.props,viewProps:this.viewProps}),this.view.valueElement.appendChild(this.valueController.view.element)}importProps(e){return oe(e,null,(e=>({label:e.optional.string})),(e=>(this.props.set("label",e.label),!0)))}exportProps(){return le(null,{label:this.props.get("label")})}}const Pe=_e(""),ze={veryfirst:"vfst",first:"fst",last:"lst",verylast:"vlst"};class Ae{constructor(e){this.parent_=null,this.blade=e.blade,this.view=e.view,this.viewProps=e.viewProps;const t=this.view.element;this.blade.value("positions").emitter.on("change",(()=>{["veryfirst","first","last","verylast"].forEach((e=>{t.classList.remove(Pe(void 0,ze[e]))})),this.blade.get("positions").forEach((e=>{t.classList.add(Pe(void 0,ze[e]))}))})),this.viewProps.handleDispose((()=>{ve(t)}))}get parent(){return this.parent_}set parent(e){this.parent_=e,this.viewProps.set("parent",this.parent_?this.parent_.viewProps:null)}importState(e){return oe(e,null,(e=>({disabled:e.required.boolean,hidden:e.required.boolean})),(e=>(this.viewProps.importState(e),!0)))}exportState(){return le(null,Object.assign({},this.viewProps.exportState()))}}class Ee extends W{get label(){return this.controller.labelController.props.get("label")}set label(e){this.controller.labelController.props.set("label",e)}get title(){var e;return null!==(e=this.controller.buttonController.props.get("title"))&&void 0!==e?e:""}set title(e){this.controller.buttonController.props.set("title",e)}on(e,t){const r=t.bind(this);return this.controller.buttonController.emitter.on(e,(e=>{r(new te(this,e.nativeEvent))})),this}off(e,t){return this.controller.buttonController.emitter.off(e,t),this}}function Te(e,t){return r=>{!function(e,t,r){r?e.classList.add(t):e.classList.remove(t)}(e,t,r)}}function Ve(e,t){ye(e,(e=>{t.textContent=null!=e?e:""}))}const Be=_e("btn");class Le{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(Be()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("button");r.classList.add(Be("b")),t.viewProps.bindDisabled(r),this.element.appendChild(r),this.buttonElement=r;const n=e.createElement("div");n.classList.add(Be("t")),Ve(t.props.value("title"),n),this.buttonElement.appendChild(n)}}class Ne{constructor(e,t){this.emitter=new h,this.onClick_=this.onClick_.bind(this),this.props=t.props,this.viewProps=t.viewProps,this.view=new Le(e,{props:this.props,viewProps:this.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}importProps(e){return oe(e,null,(e=>({title:e.optional.string})),(e=>(this.props.set("title",e.title),!0)))}exportProps(){return le(null,{title:this.props.get("title")})}onClick_(e){this.emitter.emit("click",{nativeEvent:e,sender:this})}}class Re extends Ae{constructor(e,t){const r=new Ne(e,{props:t.buttonProps,viewProps:t.viewProps}),n=new Me(e,{blade:t.blade,props:t.labelProps,valueController:r});super({blade:t.blade,view:n.view,viewProps:t.viewProps}),this.buttonController=r,this.labelController=n}importState(e){return oe(e,(e=>super.importState(e)&&this.buttonController.importProps(e)&&this.labelController.importProps(e)),(()=>({})),(()=>!0))}exportState(){return le((()=>super.exportState()),Object.assign(Object.assign({},this.buttonController.exportProps()),this.labelController.exportProps()))}}const qe=new class{constructor(e){const[t,r]=e.split("-"),n=t.split(".");this.major=parseInt(n[0],10),this.minor=parseInt(n[1],10),this.patch=parseInt(n[2],10),this.prerelease=null!=r?r:null}toString(){const e=[this.major,this.minor,this.patch].join(".");return null!==this.prerelease?[e,this.prerelease].join("-"):e}}("2.0.4");function Oe(e){return Object.assign({core:qe},e)}Oe({id:"button",type:"blade",accept(e){const t=ae(e,(e=>({title:e.required.string,view:e.required.constant("button"),label:e.optional.string})));return t?{params:t}:null},controller:e=>new Re(e.document,{blade:e.blade,buttonProps:m.fromObject({title:e.params.title}),labelProps:m.fromObject({label:e.params.label}),viewProps:e.viewProps}),api:e=>e.controller instanceof Re?new Ee(e.controller):null});class Ie{constructor(e,t){this.onRackValueChange_=this.onRackValueChange_.bind(this),this.controller_=e,this.emitter_=new h,this.pool_=t;this.controller_.rack.emitter.on("valuechange",this.onRackValueChange_)}get children(){return this.controller_.rack.children.map((e=>this.pool_.createApi(e)))}addBinding(e,t,r){const n=null!=r?r:{},i=this.controller_.element.ownerDocument,s=this.pool_.createBinding(i,function(e,t){if(!l.isBindable(e))throw o.notBindable();return new l(e,t)}(e,t),n),a=this.pool_.createBindingApi(s);return this.add(a,n.index)}addFolder(e){return function(e,t){return e.addBlade(Object.assign(Object.assign({},t),{view:"folder"}))}(this,e)}addButton(e){return function(e,t){return e.addBlade(Object.assign(Object.assign({},t),{view:"button"}))}(this,e)}addTab(e){return function(e,t){return e.addBlade(Object.assign(Object.assign({},t),{view:"tab"}))}(this,e)}add(e,t){const r=e.controller;return this.controller_.rack.add(r,t),e}remove(e){this.controller_.rack.remove(e.controller)}addBlade(e){const t=this.controller_.element.ownerDocument,r=this.pool_.createBlade(t,e),n=this.pool_.createApi(r);return this.add(n,e.index)}on(e,t){const r=t.bind(this);return this.emitter_.on(e,(e=>{r(e)}),{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}refresh(){this.children.forEach((e=>{var t;r(t=e)&&"refresh"in t&&"function"==typeof t.refresh&&e.refresh()}))}onRackValueChange_(e){const t=e.bladeController,r=this.pool_.createApi(t),n=ce(t.value)?t.value.binding:null;this.emitter_.emit("change",new Q(r,n?n.target.read():t.value.rawValue,e.options.last))}}class De extends W{constructor(e,t){super(e),this.rackApi_=new Ie(e.rackController,t)}refresh(){this.rackApi_.refresh()}}class He extends Ae{constructor(e){super({blade:e.blade,view:e.view,viewProps:e.rackController.viewProps}),this.rackController=e.rackController}importState(e){return oe(e,(e=>super.importState(e)),(e=>({children:e.required.array(e.required.raw)})),(e=>this.rackController.rack.children.every(((t,r)=>t.importState(e.children[r])))))}exportState(){return le((()=>super.exportState()),{children:this.rackController.rack.children.map((e=>e.exportState()))})}}function $e(e){return"rackController"in e}class je{constructor(e){this.emitter=new h,this.items_=[],this.cache_=new Set,this.onSubListAdd_=this.onSubListAdd_.bind(this),this.onSubListRemove_=this.onSubListRemove_.bind(this),this.extract_=e}get items(){return this.items_}allItems(){return Array.from(this.cache_)}find(e){for(const t of this.allItems())if(e(t))return t;return null}includes(e){return this.cache_.has(e)}add(e,t){if(this.includes(e))throw o.shouldNeverHappen();const r=void 0!==t?t:this.items_.length;this.items_.splice(r,0,e),this.cache_.add(e);const n=this.extract_(e);n&&(n.emitter.on("add",this.onSubListAdd_),n.emitter.on("remove",this.onSubListRemove_),n.allItems().forEach((e=>{this.cache_.add(e)}))),this.emitter.emit("add",{index:r,item:e,root:this,target:this})}remove(e){const t=this.items_.indexOf(e);if(t<0)return;this.items_.splice(t,1),this.cache_.delete(e);const r=this.extract_(e);r&&(r.allItems().forEach((e=>{this.cache_.delete(e)})),r.emitter.off("add",this.onSubListAdd_),r.emitter.off("remove",this.onSubListRemove_)),this.emitter.emit("remove",{index:t,item:e,root:this,target:this})}onSubListAdd_(e){this.cache_.add(e.item),this.emitter.emit("add",{index:e.index,item:e.item,root:this,target:e.target})}onSubListRemove_(e){this.cache_.delete(e.item),this.emitter.emit("remove",{index:e.index,item:e.item,root:this,target:e.target})}}function Fe(e){return $e(e)?e.rackController.rack.bcSet_:null}class Ue{constructor(e){var t,r;this.emitter=new h,this.onBladePositionsChange_=this.onBladePositionsChange_.bind(this),this.onSetAdd_=this.onSetAdd_.bind(this),this.onSetRemove_=this.onSetRemove_.bind(this),this.onChildDispose_=this.onChildDispose_.bind(this),this.onChildPositionsChange_=this.onChildPositionsChange_.bind(this),this.onChildValueChange_=this.onChildValueChange_.bind(this),this.onChildViewPropsChange_=this.onChildViewPropsChange_.bind(this),this.onRackLayout_=this.onRackLayout_.bind(this),this.onRackValueChange_=this.onRackValueChange_.bind(this),this.blade_=null!==(t=e.blade)&&void 0!==t?t:null,null===(r=this.blade_)||void 0===r||r.value("positions").emitter.on("change",this.onBladePositionsChange_),this.viewProps=e.viewProps,this.bcSet_=new je(Fe),this.bcSet_.emitter.on("add",this.onSetAdd_),this.bcSet_.emitter.on("remove",this.onSetRemove_)}get children(){return this.bcSet_.items}add(e,t){var r;null===(r=e.parent)||void 0===r||r.remove(e),e.parent=this,this.bcSet_.add(e,t)}remove(e){e.parent=null,this.bcSet_.remove(e)}find(e){return this.bcSet_.allItems().filter(e)}onSetAdd_(e){this.updatePositions_();const t=e.target===e.root;if(this.emitter.emit("add",{bladeController:e.item,index:e.index,root:t,sender:this}),!t)return;const r=e.item;if(r.viewProps.emitter.on("change",this.onChildViewPropsChange_),r.blade.value("positions").emitter.on("change",this.onChildPositionsChange_),r.viewProps.handleDispose(this.onChildDispose_),he(r))r.value.emitter.on("change",this.onChildValueChange_);else if($e(r)){const e=r.rackController.rack;if(e){const t=e.emitter;t.on("layout",this.onRackLayout_),t.on("valuechange",this.onRackValueChange_)}}}onSetRemove_(e){this.updatePositions_();const t=e.target===e.root;if(this.emitter.emit("remove",{bladeController:e.item,root:t,sender:this}),!t)return;const r=e.item;if(he(r))r.value.emitter.off("change",this.onChildValueChange_);else if($e(r)){const e=r.rackController.rack;if(e){const t=e.emitter;t.off("layout",this.onRackLayout_),t.off("valuechange",this.onRackValueChange_)}}}updatePositions_(){const e=this.bcSet_.items.filter((e=>!e.viewProps.get("hidden"))),t=e[0],r=e[e.length-1];this.bcSet_.items.forEach((e=>{const n=[];e===t&&(n.push("first"),this.blade_&&!this.blade_.get("positions").includes("veryfirst")||n.push("veryfirst")),e===r&&(n.push("last"),this.blade_&&!this.blade_.get("positions").includes("verylast")||n.push("verylast")),e.blade.set("positions",n)}))}onChildPositionsChange_(){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildViewPropsChange_(e){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildDispose_(){this.bcSet_.items.filter((e=>e.viewProps.get("disposed"))).forEach((e=>{this.bcSet_.remove(e)}))}onChildValueChange_(e){const t=function(e,t){for(let r=0;r<e.length;r++){const n=e[r];if(he(n)&&n.value===t)return n}return null}(this.find(he),e.sender);if(!t)throw o.alreadyDisposed();this.emitter.emit("valuechange",{bladeController:t,options:e.options,sender:this})}onRackLayout_(e){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onRackValueChange_(e){this.emitter.emit("valuechange",{bladeController:e.bladeController,options:e.options,sender:this})}onBladePositionsChange_(){this.updatePositions_()}}class Ge{constructor(e){this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this),this.element=e.element,this.viewProps=e.viewProps;const t=new Ue({blade:e.root?void 0:e.blade,viewProps:e.viewProps});t.emitter.on("add",this.onRackAdd_),t.emitter.on("remove",this.onRackRemove_),this.rack=t,this.viewProps.handleDispose((()=>{for(let e=this.rack.children.length-1;e>=0;e--){this.rack.children[e].viewProps.set("disposed",!0)}}))}onRackAdd_(e){e.root&&fe(this.element,e.bladeController.view.element,e.index)}onRackRemove_(e){e.root&&ve(e.bladeController.view.element)}}function Ke(){return new m({positions:d([],{equals:i})})}class Ye extends m{constructor(e){super(e)}static create(e){const t={completed:!0,expanded:e,expandedHeight:null,shouldFixHeight:!1,temporaryExpanded:null},r=m.createCore(t);return new Ye(r)}get styleExpanded(){var e;return null!==(e=this.get("temporaryExpanded"))&&void 0!==e?e:this.get("expanded")}get styleHeight(){if(!this.styleExpanded)return"0";const e=this.get("expandedHeight");return this.get("shouldFixHeight")&&!t(e)?`${e}px`:"auto"}bindExpandedClass(e,t){const r=()=>{this.styleExpanded?e.classList.add(t):e.classList.remove(t)};xe(this,"expanded",r),xe(this,"temporaryExpanded",r)}cleanUpTransition(){this.set("shouldFixHeight",!1),this.set("expandedHeight",null),this.set("completed",!0)}}function Xe(e,t){t.style.height=e.styleHeight}function We(e,r){e.value("expanded").emitter.on("beforechange",(()=>{if(e.set("completed",!1),t(e.get("expandedHeight"))){const t=function(e,t){let r=0;return function(e,t){const r=e.style.transition;e.style.transition="none",t(),e.style.transition=r}(t,(()=>{e.set("expandedHeight",null),e.set("temporaryExpanded",!0),ue(t),r=t.clientHeight,e.set("temporaryExpanded",null),ue(t)})),r}(e,r);t>0&&e.set("expandedHeight",t)}e.set("shouldFixHeight",!0),ue(r)})),e.emitter.on("change",(()=>{Xe(e,r)})),Xe(e,r),r.addEventListener("transitionend",(t=>{"height"===t.propertyName&&e.cleanUpTransition()}))}class Ze extends De{constructor(e,t){super(e,t),this.emitter_=new h,this.controller.foldable.value("expanded").emitter.on("change",(e=>{this.emitter_.emit("fold",new J(this,e.sender.rawValue))})),this.rackApi_.on("change",(e=>{this.emitter_.emit("change",e)}))}get expanded(){return this.controller.foldable.get("expanded")}set expanded(e){this.controller.foldable.set("expanded",e)}get title(){return this.controller.props.get("title")}set title(e){this.controller.props.set("title",e)}get children(){return this.rackApi_.children}addBinding(e,t,r){return this.rackApi_.addBinding(e,t,r)}addFolder(e){return this.rackApi_.addFolder(e)}addButton(e){return this.rackApi_.addButton(e)}addTab(e){return this.rackApi_.addTab(e)}add(e,t){return this.rackApi_.add(e,t)}remove(e){this.rackApi_.remove(e)}addBlade(e){return this.rackApi_.addBlade(e)}on(e,t){const r=t.bind(this);return this.emitter_.on(e,(e=>{r(e)}),{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}}const Qe=_e("cnt");class Je{constructor(e,r){var n;this.className_=_e(null!==(n=r.viewName)&&void 0!==n?n:"fld"),this.element=e.createElement("div"),this.element.classList.add(this.className_(),Qe()),r.viewProps.bindClassModifiers(this.element),this.foldable_=r.foldable,this.foldable_.bindExpandedClass(this.element,this.className_(void 0,"expanded")),xe(this.foldable_,"completed",Te(this.element,this.className_(void 0,"cpl")));const i=e.createElement("button");i.classList.add(this.className_("b")),xe(r.props,"title",(e=>{t(e)?this.element.classList.add(this.className_(void 0,"not")):this.element.classList.remove(this.className_(void 0,"not"))})),r.viewProps.bindDisabled(i),this.element.appendChild(i),this.buttonElement=i;const s=e.createElement("div");s.classList.add(this.className_("i")),this.element.appendChild(s);const a=e.createElement("div");a.classList.add(this.className_("t")),Ve(r.props.value("title"),a),this.buttonElement.appendChild(a),this.titleElement=a;const o=e.createElement("div");o.classList.add(this.className_("m")),this.buttonElement.appendChild(o);const l=e.createElement("div");l.classList.add(this.className_("c")),this.element.appendChild(l),this.containerElement=l}}class et extends He{constructor(e,t){var r;const n=Ye.create(null===(r=t.expanded)||void 0===r||r),i=new Je(e,{foldable:n,props:t.props,viewName:t.root?"rot":void 0,viewProps:t.viewProps});super(Object.assign(Object.assign({},t),{rackController:new Ge({blade:t.blade,element:i.containerElement,root:t.root,viewProps:t.viewProps}),view:i})),this.onTitleClick_=this.onTitleClick_.bind(this),this.props=t.props,this.foldable=n,We(this.foldable,this.view.containerElement),this.rackController.rack.emitter.on("add",(()=>{this.foldable.cleanUpTransition()})),this.rackController.rack.emitter.on("remove",(()=>{this.foldable.cleanUpTransition()})),this.view.buttonElement.addEventListener("click",this.onTitleClick_)}get document(){return this.view.element.ownerDocument}importState(e){return oe(e,(e=>super.importState(e)),(e=>({expanded:e.required.boolean,title:e.optional.string})),(e=>(this.foldable.set("expanded",e.expanded),this.props.set("title",e.title),!0)))}exportState(){return le((()=>super.exportState()),{expanded:this.foldable.get("expanded"),title:this.props.get("title")})}onTitleClick_(){this.foldable.set("expanded",!this.foldable.get("expanded"))}}Oe({id:"folder",type:"blade",accept(e){const t=ae(e,(e=>({title:e.required.string,view:e.required.constant("folder"),expanded:e.optional.boolean})));return t?{params:t}:null},controller:e=>new et(e.document,{blade:e.blade,expanded:e.params.expanded,props:m.fromObject({title:e.params.title}),viewProps:e.viewProps}),api:e=>e.controller instanceof et?new Ze(e.controller,e.pool):null});const tt=_e("");function rt(e,t){return Te(e,tt(void 0,t))}class nt extends m{constructor(e){var t,r;super(e),this.onDisabledChange_=this.onDisabledChange_.bind(this),this.onParentChange_=this.onParentChange_.bind(this),this.onParentGlobalDisabledChange_=this.onParentGlobalDisabledChange_.bind(this),[this.globalDisabled_,this.setGlobalDisabled_]=(r=d(this.getGlobalDisabled_()),[new u(r),(e,t)=>{r.setRawValue(e,t)}]),this.value("disabled").emitter.on("change",this.onDisabledChange_),this.value("parent").emitter.on("change",this.onParentChange_),null===(t=this.get("parent"))||void 0===t||t.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_)}static create(e){var t,r,n;const i=null!=e?e:{};return new nt(m.createCore({disabled:null!==(t=i.disabled)&&void 0!==t&&t,disposed:!1,hidden:null!==(r=i.hidden)&&void 0!==r&&r,parent:null!==(n=i.parent)&&void 0!==n?n:null}))}get globalDisabled(){return this.globalDisabled_}bindClassModifiers(e){ye(this.globalDisabled_,rt(e,"disabled")),xe(this,"hidden",rt(e,"hidden"))}bindDisabled(e){ye(this.globalDisabled_,(t=>{e.disabled=t}))}bindTabIndex(e){ye(this.globalDisabled_,(t=>{e.tabIndex=t?-1:0}))}handleDispose(e){this.value("disposed").emitter.on("change",(t=>{t&&e()}))}importState(e){this.set("disabled",e.disabled),this.set("hidden",e.hidden)}exportState(){return{disabled:this.get("disabled"),hidden:this.get("hidden")}}getGlobalDisabled_(){const e=this.get("parent");return!!e&&e.globalDisabled.rawValue||this.get("disabled")}updateGlobalDisabled_(){this.setGlobalDisabled_(this.getGlobalDisabled_())}onDisabledChange_(){this.updateGlobalDisabled_()}onParentGlobalDisabledChange_(){this.updateGlobalDisabled_()}onParentChange_(e){var t;const r=e.previousRawValue;null==r||r.globalDisabled.emitter.off("change",this.onParentGlobalDisabledChange_),null===(t=this.get("parent"))||void 0===t||t.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_),this.updateGlobalDisabled_()}}const it=_e("tbp");class st{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(it()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("div");r.classList.add(it("c")),this.element.appendChild(r),this.containerElement=r}}const at=_e("tbi");class ot{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(at()),t.viewProps.bindClassModifiers(this.element),xe(t.props,"selected",(e=>{e?this.element.classList.add(at(void 0,"sel")):this.element.classList.remove(at(void 0,"sel"))}));const r=e.createElement("button");r.classList.add(at("b")),t.viewProps.bindDisabled(r),this.element.appendChild(r),this.buttonElement=r;const n=e.createElement("div");n.classList.add(at("t")),Ve(t.props.value("title"),n),this.buttonElement.appendChild(n),this.titleElement=n}}class lt{constructor(e,t){this.emitter=new h,this.onClick_=this.onClick_.bind(this),this.props=t.props,this.viewProps=t.viewProps,this.view=new ot(e,{props:t.props,viewProps:t.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}onClick_(){this.emitter.emit("click",{sender:this})}}class ht extends He{constructor(e,t){const r=new st(e,{viewProps:t.viewProps});super(Object.assign(Object.assign({},t),{rackController:new Ge({blade:t.blade,element:r.containerElement,viewProps:t.viewProps}),view:r})),this.onItemClick_=this.onItemClick_.bind(this),this.ic_=new lt(e,{props:t.itemProps,viewProps:nt.create()}),this.ic_.emitter.on("click",this.onItemClick_),this.props=t.props,xe(this.props,"selected",(e=>{this.itemController.props.set("selected",e),this.viewProps.set("hidden",!e)}))}get itemController(){return this.ic_}importState(e){return oe(e,(e=>super.importState(e)),(e=>({selected:e.required.boolean,title:e.required.string})),(e=>(this.ic_.props.set("selected",e.selected),this.ic_.props.set("title",e.title),!0)))}exportState(){return le((()=>super.exportState()),{selected:this.ic_.props.get("selected"),title:this.ic_.props.get("title")})}onItemClick_(){this.props.set("selected",!0)}}class ct extends De{constructor(e,t){super(e,t),this.emitter_=new h,this.onSelect_=this.onSelect_.bind(this),this.pool_=t,this.rackApi_.on("change",(e=>{this.emitter_.emit("change",e)})),this.controller.tab.selectedIndex.emitter.on("change",this.onSelect_)}get pages(){return this.rackApi_.children}addPage(e){const t=this.controller.view.element.ownerDocument,r=new ht(t,{blade:Ke(),itemProps:m.fromObject({selected:!1,title:e.title}),props:m.fromObject({selected:!1}),viewProps:nt.create()}),n=this.pool_.createApi(r);return this.rackApi_.add(n,e.index)}removePage(e){this.rackApi_.remove(this.rackApi_.children[e])}on(e,t){const r=t.bind(this);return this.emitter_.on(e,(e=>{r(e)}),{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}onSelect_(e){this.emitter_.emit("select",new ee(this,e.rawValue))}}class pt extends De{get title(){var e;return null!==(e=this.controller.itemController.props.get("title"))&&void 0!==e?e:""}set title(e){this.controller.itemController.props.set("title",e)}get selected(){return this.controller.props.get("selected")}set selected(e){this.controller.props.set("selected",e)}get children(){return this.rackApi_.children}addButton(e){return this.rackApi_.addButton(e)}addFolder(e){return this.rackApi_.addFolder(e)}addTab(e){return this.rackApi_.addTab(e)}add(e,t){this.rackApi_.add(e,t)}remove(e){this.rackApi_.remove(e)}addBinding(e,t,r){return this.rackApi_.addBinding(e,t,r)}addBlade(e){return this.rackApi_.addBlade(e)}}class ut{constructor(){this.onItemSelectedChange_=this.onItemSelectedChange_.bind(this),this.empty=d(!0),this.selectedIndex=d(-1),this.items_=[]}add(e,t){const r=null!=t?t:this.items_.length;this.items_.splice(r,0,e),e.emitter.on("change",this.onItemSelectedChange_),this.keepSelection_()}remove(e){const t=this.items_.indexOf(e);t<0||(this.items_.splice(t,1),e.emitter.off("change",this.onItemSelectedChange_),this.keepSelection_())}keepSelection_(){if(0===this.items_.length)return this.selectedIndex.rawValue=-1,void(this.empty.rawValue=!0);const e=this.items_.findIndex((e=>e.rawValue));e<0?(this.items_.forEach(((e,t)=>{e.rawValue=0===t})),this.selectedIndex.rawValue=0):(this.items_.forEach(((t,r)=>{t.rawValue=r===e})),this.selectedIndex.rawValue=e),this.empty.rawValue=!1}onItemSelectedChange_(e){if(e.rawValue){const t=this.items_.findIndex((t=>t===e.sender));this.items_.forEach(((e,r)=>{e.rawValue=r===t})),this.selectedIndex.rawValue=t}else this.keepSelection_()}}const dt=_e("tab");class mt{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(dt(),Qe()),t.viewProps.bindClassModifiers(this.element),ye(t.empty,Te(this.element,dt(void 0,"nop")));const r=e.createElement("div");r.classList.add(dt("t")),this.element.appendChild(r),this.itemsElement=r;const n=e.createElement("div");n.classList.add(dt("i")),this.element.appendChild(n);const i=e.createElement("div");i.classList.add(dt("c")),this.element.appendChild(i),this.contentsElement=i}}class gt extends He{constructor(e,t){const r=new ut,n=new mt(e,{empty:r.empty,viewProps:t.viewProps});super({blade:t.blade,rackController:new Ge({blade:t.blade,element:n.contentsElement,viewProps:t.viewProps}),view:n}),this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this);const i=this.rackController.rack;i.emitter.on("add",this.onRackAdd_),i.emitter.on("remove",this.onRackRemove_),this.tab=r}add(e,t){this.rackController.rack.add(e,t)}remove(e){this.rackController.rack.remove(this.rackController.rack.children[e])}onRackAdd_(e){if(!e.root)return;const t=e.bladeController;fe(this.view.itemsElement,t.itemController.view.element,e.index),t.itemController.viewProps.set("parent",this.viewProps),this.tab.add(t.props.value("selected"))}onRackRemove_(e){if(!e.root)return;const t=e.bladeController;ve(t.itemController.view.element),t.itemController.viewProps.set("parent",null),this.tab.remove(t.props.value("selected"))}}Oe({id:"tab",type:"blade",accept(e){const t=ae(e,(e=>({pages:e.required.array(e.required.object({title:e.required.string})),view:e.required.constant("tab")})));return t&&0!==t.pages.length?{params:t}:null},controller(e){const t=new gt(e.document,{blade:e.blade,viewProps:e.viewProps});return e.params.pages.forEach((r=>{const n=new ht(e.document,{blade:Ke(),itemProps:m.fromObject({selected:!1,title:r.title}),props:m.fromObject({selected:!1}),viewProps:nt.create()});t.add(n)})),t},api:e=>e.controller instanceof gt?new ct(e.controller,e.pool):e.controller instanceof ht?new pt(e.controller,e.pool):null});class ft extends re{get options(){return this.controller.valueController.props.get("options")}set options(e){this.controller.valueController.props.set("options",e)}}class vt{constructor(e){this.constraints=e}constrain(e){return this.constraints.reduce(((e,t)=>t.constrain(e)),e)}}function bt(e,t){if(e instanceof t)return e;if(e instanceof vt){const r=e.constraints.reduce(((e,r)=>e||(r instanceof t?r:null)),null);if(r)return r}return null}class wt{constructor(e){this.values=m.fromObject({options:e})}constrain(e){const t=this.values.get("options");if(0===t.length)return e;return t.filter((t=>t.value===e)).length>0?e:t[0].value}}function yt(e){var t;const r=se;return Array.isArray(e)?null===(t=ae({items:e},(e=>({items:e.required.array(e.required.object({text:e.required.string,value:e.required.raw}))}))))||void 0===t?void 0:t.items:"object"==typeof e?r.required.raw(e).value:void 0}function xt(e){if(Array.isArray(e))return e;const t=[];return Object.keys(e).forEach((r=>{t.push({text:r,value:e[r]})})),t}function kt(e){return t(e)?null:new wt(xt(e))}const _t=_e("lst");class St{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.props_=t.props,this.element=e.createElement("div"),this.element.classList.add(_t()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("select");r.classList.add(_t("s")),t.viewProps.bindDisabled(r),this.element.appendChild(r),this.selectElement=r;const n=e.createElement("div");n.classList.add(_t("m")),n.appendChild(ge(e,"dropdown")),this.element.appendChild(n),t.value.emitter.on("change",this.onValueChange_),this.value_=t.value,xe(this.props_,"options",(t=>{be(this.selectElement),t.forEach((t=>{const r=e.createElement("option");r.textContent=t.text,this.selectElement.appendChild(r)})),this.update_()}))}update_(){const e=this.props_.get("options").map((e=>e.value));this.selectElement.selectedIndex=e.indexOf(this.value_.rawValue)}onValueChange_(){this.update_()}}class Ct{constructor(e,t){this.onSelectChange_=this.onSelectChange_.bind(this),this.props=t.props,this.value=t.value,this.viewProps=t.viewProps,this.view=new St(e,{props:this.props,value:this.value,viewProps:this.viewProps}),this.view.selectElement.addEventListener("change",this.onSelectChange_)}onSelectChange_(e){const t=e.currentTarget;this.value.rawValue=this.props.get("options")[t.selectedIndex].value}importProps(e){return oe(e,null,(e=>({options:e.required.custom(yt)})),(e=>(this.props.set("options",xt(e.options)),!0)))}exportProps(){return le(null,{options:this.props.get("options")})}}const Mt=_e("pop");class Pt{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(Mt()),t.viewProps.bindClassModifiers(this.element),ye(t.shows,Te(this.element,Mt(void 0,"v")))}}class zt{constructor(e,t){this.shows=d(!1),this.viewProps=t.viewProps,this.view=new Pt(e,{shows:this.shows,viewProps:this.viewProps})}}const At=_e("txt");class Et{constructor(e,t){this.onChange_=this.onChange_.bind(this),this.element=e.createElement("div"),this.element.classList.add(At()),t.viewProps.bindClassModifiers(this.element),this.props_=t.props,this.props_.emitter.on("change",this.onChange_);const r=e.createElement("input");r.classList.add(At("i")),r.type="text",t.viewProps.bindDisabled(r),this.element.appendChild(r),this.inputElement=r,t.value.emitter.on("change",this.onChange_),this.value_=t.value,this.refresh()}refresh(){const e=this.props_.get("formatter");this.inputElement.value=e(this.value_.rawValue)}onChange_(){this.refresh()}}class Tt{constructor(e,t){this.onInputChange_=this.onInputChange_.bind(this),this.parser_=t.parser,this.props=t.props,this.value=t.value,this.viewProps=t.viewProps,this.view=new Et(e,{props:t.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_)}onInputChange_(e){const r=e.currentTarget.value,n=this.parser_(r);t(n)||(this.value.rawValue=n),this.view.refresh()}}function Vt(e){return"false"!==e&&!!e}function Bt(e){return function(e){return String(e)}(e)}const Lt=q(0);function Nt(e){return Lt(e)+"%"}function Rt(e){return String(e)}function qt(e){return e}function Ot({primary:e,secondary:t,forward:r,backward:n}){let i=!1;function s(e){i||(i=!0,e(),i=!1)}e.emitter.on("change",(n=>{s((()=>{t.setRawValue(r(e.rawValue,t.rawValue),n.options)}))})),t.emitter.on("change",(i=>{s((()=>{e.setRawValue(n(e.rawValue,t.rawValue),i.options)})),s((()=>{t.setRawValue(r(e.rawValue,t.rawValue),i.options)}))})),s((()=>{t.setRawValue(r(e.rawValue,t.rawValue),{forceEmit:!1,last:!0})}))}function It(e,t){const r=e*(t.altKey?.1:1)*(t.shiftKey?10:1);return t.upKey?+r:t.downKey?-r:0}function Dt(e){return{altKey:e.altKey,downKey:"ArrowDown"===e.key,shiftKey:e.shiftKey,upKey:"ArrowUp"===e.key}}function Ht(e){return{altKey:e.altKey,downKey:"ArrowLeft"===e.key,shiftKey:e.shiftKey,upKey:"ArrowRight"===e.key}}function $t(e){return function(e){return"ArrowUp"===e||"ArrowDown"===e}(e)||"ArrowLeft"===e||"ArrowRight"===e}function jt(e,t){var r,n;const i=t.ownerDocument.defaultView,s=t.getBoundingClientRect();return{x:e.pageX-((null!==(r=i&&i.scrollX)&&void 0!==r?r:0)+s.left),y:e.pageY-((null!==(n=i&&i.scrollY)&&void 0!==n?n:0)+s.top)}}class Ft{constructor(e){this.lastTouch_=null,this.onDocumentMouseMove_=this.onDocumentMouseMove_.bind(this),this.onDocumentMouseUp_=this.onDocumentMouseUp_.bind(this),this.onMouseDown_=this.onMouseDown_.bind(this),this.onTouchEnd_=this.onTouchEnd_.bind(this),this.onTouchMove_=this.onTouchMove_.bind(this),this.onTouchStart_=this.onTouchStart_.bind(this),this.elem_=e,this.emitter=new h,e.addEventListener("touchstart",this.onTouchStart_,{passive:!1}),e.addEventListener("touchmove",this.onTouchMove_,{passive:!0}),e.addEventListener("touchend",this.onTouchEnd_),e.addEventListener("mousedown",this.onMouseDown_)}computePosition_(e){const t=this.elem_.getBoundingClientRect();return{bounds:{width:t.width,height:t.height},point:e?{x:e.x,y:e.y}:null}}onMouseDown_(e){var t;e.preventDefault(),null===(t=e.currentTarget)||void 0===t||t.focus();const r=this.elem_.ownerDocument;r.addEventListener("mousemove",this.onDocumentMouseMove_),r.addEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("down",{altKey:e.altKey,data:this.computePosition_(jt(e,this.elem_)),sender:this,shiftKey:e.shiftKey})}onDocumentMouseMove_(e){this.emitter.emit("move",{altKey:e.altKey,data:this.computePosition_(jt(e,this.elem_)),sender:this,shiftKey:e.shiftKey})}onDocumentMouseUp_(e){const t=this.elem_.ownerDocument;t.removeEventListener("mousemove",this.onDocumentMouseMove_),t.removeEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("up",{altKey:e.altKey,data:this.computePosition_(jt(e,this.elem_)),sender:this,shiftKey:e.shiftKey})}onTouchStart_(e){e.preventDefault();const t=e.targetTouches.item(0),r=this.elem_.getBoundingClientRect();this.emitter.emit("down",{altKey:e.altKey,data:this.computePosition_(t?{x:t.clientX-r.left,y:t.clientY-r.top}:void 0),sender:this,shiftKey:e.shiftKey}),this.lastTouch_=t}onTouchMove_(e){const t=e.targetTouches.item(0),r=this.elem_.getBoundingClientRect();this.emitter.emit("move",{altKey:e.altKey,data:this.computePosition_(t?{x:t.clientX-r.left,y:t.clientY-r.top}:void 0),sender:this,shiftKey:e.shiftKey}),this.lastTouch_=t}onTouchEnd_(e){var t;const r=null!==(t=e.targetTouches.item(0))&&void 0!==t?t:this.lastTouch_,n=this.elem_.getBoundingClientRect();this.emitter.emit("up",{altKey:e.altKey,data:this.computePosition_(r?{x:r.clientX-n.left,y:r.clientY-n.top}:void 0),sender:this,shiftKey:e.shiftKey})}}const Ut=_e("txt");class Gt{constructor(e,t){this.onChange_=this.onChange_.bind(this),this.props_=t.props,this.props_.emitter.on("change",this.onChange_),this.element=e.createElement("div"),this.element.classList.add(Ut(),Ut(void 0,"num")),t.arrayPosition&&this.element.classList.add(Ut(void 0,t.arrayPosition)),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("input");r.classList.add(Ut("i")),r.type="text",t.viewProps.bindDisabled(r),this.element.appendChild(r),this.inputElement=r,this.onDraggingChange_=this.onDraggingChange_.bind(this),this.dragging_=t.dragging,this.dragging_.emitter.on("change",this.onDraggingChange_),this.element.classList.add(Ut()),this.inputElement.classList.add(Ut("i"));const n=e.createElement("div");n.classList.add(Ut("k")),this.element.appendChild(n),this.knobElement=n;const i=e.createElementNS(pe,"svg");i.classList.add(Ut("g")),this.knobElement.appendChild(i);const s=e.createElementNS(pe,"path");s.classList.add(Ut("gb")),i.appendChild(s),this.guideBodyElem_=s;const a=e.createElementNS(pe,"path");a.classList.add(Ut("gh")),i.appendChild(a),this.guideHeadElem_=a;const o=e.createElement("div");o.classList.add(_e("tt")()),this.knobElement.appendChild(o),this.tooltipElem_=o,t.value.emitter.on("change",this.onChange_),this.value=t.value,this.refresh()}onDraggingChange_(e){if(null===e.rawValue)return void this.element.classList.remove(Ut(void 0,"drg"));this.element.classList.add(Ut(void 0,"drg"));const t=e.rawValue/this.props_.get("pointerScale"),r=t+(t>0?-1:t<0?1:0),n=D(-r,-4,4);this.guideHeadElem_.setAttributeNS(null,"d",[`M ${r+n},0 L${r},4 L${r+n},8`,`M ${t},-1 L${t},9`].join(" ")),this.guideBodyElem_.setAttributeNS(null,"d",`M 0,4 L${t},4`);const i=this.props_.get("formatter");this.tooltipElem_.textContent=i(this.value.rawValue),this.tooltipElem_.style.left=`${t}px`}refresh(){const e=this.props_.get("formatter");this.inputElement.value=e(this.value.rawValue)}onChange_(){this.refresh()}}class Kt{constructor(e,t){var r;this.originRawValue_=0,this.onInputChange_=this.onInputChange_.bind(this),this.onInputKeyDown_=this.onInputKeyDown_.bind(this),this.onInputKeyUp_=this.onInputKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.parser_=t.parser,this.props=t.props,this.sliderProps_=null!==(r=t.sliderProps)&&void 0!==r?r:null,this.value=t.value,this.viewProps=t.viewProps,this.dragging_=d(null),this.view=new Gt(e,{arrayPosition:t.arrayPosition,dragging:this.dragging_,props:this.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.inputElement.addEventListener("keydown",this.onInputKeyDown_),this.view.inputElement.addEventListener("keyup",this.onInputKeyUp_);const n=new Ft(this.view.knobElement);n.emitter.on("down",this.onPointerDown_),n.emitter.on("move",this.onPointerMove_),n.emitter.on("up",this.onPointerUp_)}constrainValue_(e){var t,r;const n=null===(t=this.sliderProps_)||void 0===t?void 0:t.get("min"),i=null===(r=this.sliderProps_)||void 0===r?void 0:r.get("max");let s=e;return void 0!==n&&(s=Math.max(s,n)),void 0!==i&&(s=Math.min(s,i)),s}onInputChange_(e){const r=e.currentTarget.value,n=this.parser_(r);t(n)||(this.value.rawValue=this.constrainValue_(n)),this.view.refresh()}onInputKeyDown_(e){const t=It(this.props.get("keyScale"),Dt(e));0!==t&&this.value.setRawValue(this.constrainValue_(this.value.rawValue+t),{forceEmit:!1,last:!1})}onInputKeyUp_(e){0!==It(this.props.get("keyScale"),Dt(e))&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}onPointerDown_(){this.originRawValue_=this.value.rawValue,this.dragging_.rawValue=0}computeDraggingValue_(e){if(!e.point)return null;const t=e.point.x-e.bounds.width/2;return this.constrainValue_(this.originRawValue_+t*this.props.get("pointerScale"))}onPointerMove_(e){const t=this.computeDraggingValue_(e.data);null!==t&&(this.value.setRawValue(t,{forceEmit:!1,last:!1}),this.dragging_.rawValue=this.value.rawValue-this.originRawValue_)}onPointerUp_(e){const t=this.computeDraggingValue_(e.data);null!==t&&(this.value.setRawValue(t,{forceEmit:!0,last:!0}),this.dragging_.rawValue=null)}}const Yt=_e("sld");class Xt{constructor(e,t){this.onChange_=this.onChange_.bind(this),this.props_=t.props,this.props_.emitter.on("change",this.onChange_),this.element=e.createElement("div"),this.element.classList.add(Yt()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("div");r.classList.add(Yt("t")),t.viewProps.bindTabIndex(r),this.element.appendChild(r),this.trackElement=r;const n=e.createElement("div");n.classList.add(Yt("k")),this.trackElement.appendChild(n),this.knobElement=n,t.value.emitter.on("change",this.onChange_),this.value=t.value,this.update_()}update_(){const e=D(O(this.value.rawValue,this.props_.get("min"),this.props_.get("max"),0,100),0,100);this.knobElement.style.width=`${e}%`}onChange_(){this.update_()}}class Wt{constructor(e,t){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDownOrMove_=this.onPointerDownOrMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.props=t.props,this.view=new Xt(e,{props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ft(this.view.trackElement),this.ptHandler_.emitter.on("down",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("move",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.trackElement.addEventListener("keydown",this.onKeyDown_),this.view.trackElement.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(e,t){e.point&&this.value.setRawValue(O(D(e.point.x,0,e.bounds.width),0,e.bounds.width,this.props.get("min"),this.props.get("max")),t)}onPointerDownOrMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onKeyDown_(e){const t=It(this.props.get("keyScale"),Ht(e));0!==t&&this.value.setRawValue(this.value.rawValue+t,{forceEmit:!1,last:!1})}onKeyUp_(e){0!==It(this.props.get("keyScale"),Ht(e))&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const Zt=_e("sldtxt");class Qt{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(Zt());const r=e.createElement("div");r.classList.add(Zt("s")),this.sliderView_=t.sliderView,r.appendChild(this.sliderView_.element),this.element.appendChild(r);const n=e.createElement("div");n.classList.add(Zt("t")),this.textView_=t.textView,n.appendChild(this.textView_.element),this.element.appendChild(n)}}class Jt{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.sliderC_=new Wt(e,{props:t.sliderProps,value:t.value,viewProps:this.viewProps}),this.textC_=new Kt(e,{parser:t.parser,props:t.textProps,sliderProps:t.sliderProps,value:t.value,viewProps:t.viewProps}),this.view=new Qt(e,{sliderView:this.sliderC_.view,textView:this.textC_.view})}get sliderController(){return this.sliderC_}get textController(){return this.textC_}importProps(e){return oe(e,null,(e=>({max:e.required.number,min:e.required.number})),(e=>{const t=this.sliderC_.props;return t.set("max",e.max),t.set("min",e.min),!0}))}exportProps(){const e=this.sliderC_.props;return le(null,{max:e.get("max"),min:e.get("min")})}}const er={containerUnitSize:"cnt-usz"};function tr(e){return`--${er[e]}`}function rr(e){return Y(e)}function nr(e){if(n(e))return ae(e,rr)}function ir(e,t){if(!e)return;const r=[],n=U(e,t);n&&r.push(n);const i=G(e);return i&&r.push(i),new vt(r)}function sr(e){if("inline"===e||"popup"===e)return e}function ar(e,t){e.write(t)}const or=_e("ckb");class lr{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.element=e.createElement("div"),this.element.classList.add(or()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("label");r.classList.add(or("l")),this.element.appendChild(r),this.labelElement=r;const n=e.createElement("input");n.classList.add(or("i")),n.type="checkbox",this.labelElement.appendChild(n),this.inputElement=n,t.viewProps.bindDisabled(this.inputElement);const i=e.createElement("div");i.classList.add(or("w")),this.labelElement.appendChild(i);const s=ge(e,"check");i.appendChild(s),t.value.emitter.on("change",this.onValueChange_),this.value=t.value,this.update_()}update_(){this.inputElement.checked=this.value.rawValue}onValueChange_(){this.update_()}}class hr{constructor(e,t){this.onInputChange_=this.onInputChange_.bind(this),this.onLabelMouseDown_=this.onLabelMouseDown_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.view=new lr(e,{value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.labelElement.addEventListener("mousedown",this.onLabelMouseDown_)}onInputChange_(e){const t=e.currentTarget;this.value.rawValue=t.checked,e.preventDefault(),e.stopPropagation()}onLabelMouseDown_(e){e.preventDefault()}}Oe({id:"input-bool",type:"input",accept:(e,t)=>{if("boolean"!=typeof e)return null;const r=ae(t,(e=>({options:e.optional.custom(yt),readonly:e.optional.constant(!1)})));return r?{initialValue:e,params:r}:null},binding:{reader:e=>Vt,constraint:e=>function(e){const t=[],r=kt(e.options);return r&&t.push(r),new vt(t)}(e.params),writer:e=>ar},controller:e=>{const t=e.document,r=e.value,n=e.constraint,i=n&&bt(n,wt);return i?new Ct(t,{props:new m({options:i.values.value("options")}),value:r,viewProps:e.viewProps}):new hr(t,{value:r,viewProps:e.viewProps})},api:e=>"boolean"!=typeof e.controller.value.rawValue?null:e.controller.valueController instanceof Ct?new ft(e.controller):null});const cr=_e("col");class pr{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(cr()),t.foldable.bindExpandedClass(this.element,cr(void 0,"expanded")),xe(t.foldable,"completed",Te(this.element,cr(void 0,"cpl")));const r=e.createElement("div");r.classList.add(cr("h")),this.element.appendChild(r);const n=e.createElement("div");n.classList.add(cr("s")),r.appendChild(n),this.swatchElement=n;const i=e.createElement("div");if(i.classList.add(cr("t")),r.appendChild(i),this.textElement=i,"inline"===t.pickerLayout){const t=e.createElement("div");t.classList.add(cr("p")),this.element.appendChild(t),this.pickerElement=t}else this.pickerElement=null}}function ur(e,t,r){const n=H(e,360),i=D(t/100,0,1),s=D(r/100,0,1),a=s*i,o=a*(1-Math.abs(n/60%2-1)),l=s-a;let h,c,p;return[h,c,p]=n>=0&&n<60?[a,o,0]:n>=60&&n<120?[o,a,0]:n>=120&&n<180?[0,a,o]:n>=180&&n<240?[0,o,a]:n>=240&&n<300?[o,0,a]:[a,0,o],[255*(h+l),255*(c+l),255*(p+l)]}function dr(e){return[e[0],e[1],e[2]]}function mr(e,t){return[e[0],e[1],e[2],t]}const gr={hsl:{hsl:(e,t,r)=>[e,t,r],hsv:function(e,t,r){const n=r+t*(100-Math.abs(2*r-100))/200;return[e,0!==n?t*(100-Math.abs(2*r-100))/n:0,r+t*(100-Math.abs(2*r-100))/200]},rgb:function(e,t,r){const n=(e%360+360)%360,i=D(t/100,0,1),s=D(r/100,0,1),a=(1-Math.abs(2*s-1))*i,o=a*(1-Math.abs(n/60%2-1)),l=s-a/2;let h,c,p;return[h,c,p]=n>=0&&n<60?[a,o,0]:n>=60&&n<120?[o,a,0]:n>=120&&n<180?[0,a,o]:n>=180&&n<240?[0,o,a]:n>=240&&n<300?[o,0,a]:[a,0,o],[255*(h+l),255*(c+l),255*(p+l)]}},hsv:{hsl:function(e,t,r){const n=100-Math.abs(r*(200-t)/100-100);return[e,0!==n?t*r/n:0,r*(200-t)/200]},hsv:(e,t,r)=>[e,t,r],rgb:ur},rgb:{hsl:function(e,t,r){const n=D(e/255,0,1),i=D(t/255,0,1),s=D(r/255,0,1),a=Math.max(n,i,s),o=Math.min(n,i,s),l=a-o;let h=0,c=0;const p=(o+a)/2;return 0!==l&&(c=l/(1-Math.abs(a+o-1)),h=n===a?(i-s)/l:i===a?2+(s-n)/l:4+(n-i)/l,h=h/6+(h<0?1:0)),[360*h,100*c,100*p]},hsv:function(e,t,r){const n=D(e/255,0,1),i=D(t/255,0,1),s=D(r/255,0,1),a=Math.max(n,i,s),o=a-Math.min(n,i,s);let l;return l=0===o?0:a===n?((i-s)/o%6+6)%6*60:a===i?60*((s-n)/o+2):60*((n-i)/o+4),[l,100*(0===a?0:o/a),100*a]},rgb:(e,t,r)=>[e,t,r]}};function fr(e,t){return["float"===t?1:"rgb"===e?255:360,"float"===t?1:"rgb"===e?255:100,"float"===t?1:"rgb"===e?255:100]}function vr(e,t,r){var n;const i=fr(t,r);return["rgb"===t?D(e[0],0,i[0]):(s=e[0],a=i[0],s===a?a:H(s,a)),D(e[1],0,i[1]),D(e[2],0,i[2]),D(null!==(n=e[3])&&void 0!==n?n:1,0,1)];var s,a}function br(e,t,r,n){const i=fr(t,r),s=fr(t,n);return e.map(((e,t)=>e/i[t]*s[t]))}function wr(e,t,r){const n=br(e,t.mode,t.type,"int");return br(gr[t.mode][r.mode](...n),r.mode,"int",r.type)}class yr{static black(){return new yr([0,0,0],"rgb")}constructor(e,t){this.type="int",this.mode=t,this.comps_=vr(e,t,this.type)}getComponents(e){return mr(wr(dr(this.comps_),{mode:this.mode,type:this.type},{mode:null!=e?e:this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){const e=this.getComponents("rgb");return{r:e[0],g:e[1],b:e[2],a:e[3]}}}const xr=_e("colp");class kr{constructor(e,t){this.alphaViews_=null,this.element=e.createElement("div"),this.element.classList.add(xr()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("div");r.classList.add(xr("hsv"));const n=e.createElement("div");n.classList.add(xr("sv")),this.svPaletteView_=t.svPaletteView,n.appendChild(this.svPaletteView_.element),r.appendChild(n);const i=e.createElement("div");i.classList.add(xr("h")),this.hPaletteView_=t.hPaletteView,i.appendChild(this.hPaletteView_.element),r.appendChild(i),this.element.appendChild(r);const s=e.createElement("div");if(s.classList.add(xr("rgb")),this.textsView_=t.textsView,s.appendChild(this.textsView_.element),this.element.appendChild(s),t.alphaViews){this.alphaViews_={palette:t.alphaViews.palette,text:t.alphaViews.text};const r=e.createElement("div");r.classList.add(xr("a"));const n=e.createElement("div");n.classList.add(xr("ap")),n.appendChild(this.alphaViews_.palette.element),r.appendChild(n);const i=e.createElement("div");i.classList.add(xr("at")),i.appendChild(this.alphaViews_.text.element),r.appendChild(i),this.element.appendChild(r)}}get allFocusableElements(){const e=[this.svPaletteView_.element,this.hPaletteView_.element,this.textsView_.modeSelectElement,...this.textsView_.inputViews.map((e=>e.inputElement))];return this.alphaViews_&&e.push(this.alphaViews_.palette.element,this.alphaViews_.text.inputElement),e}}function _r(e){return"int"===e?"int":"float"===e?"float":void 0}function Sr(e){return ae(e,(e=>({color:e.optional.object({alpha:e.optional.boolean,type:e.optional.custom(_r)}),expanded:e.optional.boolean,picker:e.optional.custom(sr),readonly:e.optional.constant(!1)})))}function Cr(e){return e?.1:1}function Mr(e){var t;return null===(t=e.color)||void 0===t?void 0:t.type}class Pr{constructor(e,t){this.type="float",this.mode=t,this.comps_=vr(e,t,this.type)}getComponents(e){return mr(wr(dr(this.comps_),{mode:this.mode,type:this.type},{mode:null!=e?e:this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){const e=this.getComponents("rgb");return{r:e[0],g:e[1],b:e[2],a:e[3]}}}const zr={int:(e,t)=>new yr(e,t),float:(e,t)=>new Pr(e,t)};function Ar(e,t,r){return zr[r](e,t)}function Er(e,t){if(e.type===t)return e;if(function(e){return"int"===e.type}(e)&&"float"===t)return function(e){const t=e.getComponents(),r=fr(e.mode,"int");return new Pr([O(t[0],0,r[0],0,1),O(t[1],0,r[1],0,1),O(t[2],0,r[2],0,1),t[3]],e.mode)}(e);if(function(e){return"float"===e.type}(e)&&"int"===t)return function(e){const t=e.getComponents(),r=fr(e.mode,"int");return new yr([Math.round(O(t[0],0,1,0,r[0])),Math.round(O(t[1],0,1,0,r[1])),Math.round(O(t[2],0,1,0,r[2])),t[3]],e.mode)}(e);throw o.shouldNeverHappen()}function Tr(e,t){const r=e.match(/^(.+)%$/);return r?Math.min(.01*parseFloat(r[1])*t,t):Math.min(parseFloat(e),t)}const Vr={deg:e=>e,grad:e=>360*e/400,rad:e=>360*e/(2*Math.PI),turn:e=>360*e};function Br(e){const t=e.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);if(!t)return parseFloat(e);const r=parseFloat(t[1]),n=t[2];return Vr[n](r)}function Lr(e){const t=e.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const r=[Tr(t[1],255),Tr(t[2],255),Tr(t[3],255)];return isNaN(r[0])||isNaN(r[1])||isNaN(r[2])?null:r}function Nr(e){const t=Lr(e);return t?new yr(t,"rgb"):null}function Rr(e){const t=e.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const r=[Tr(t[1],255),Tr(t[2],255),Tr(t[3],255),Tr(t[4],1)];return isNaN(r[0])||isNaN(r[1])||isNaN(r[2])||isNaN(r[3])?null:r}function qr(e){const t=Rr(e);return t?new yr(t,"rgb"):null}function Or(e){const t=e.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const r=[Br(t[1]),Tr(t[2],100),Tr(t[3],100)];return isNaN(r[0])||isNaN(r[1])||isNaN(r[2])?null:r}function Ir(e){const t=Or(e);return t?new yr(t,"hsl"):null}function Dr(e){const t=e.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const r=[Br(t[1]),Tr(t[2],100),Tr(t[3],100),Tr(t[4],1)];return isNaN(r[0])||isNaN(r[1])||isNaN(r[2])||isNaN(r[3])?null:r}function Hr(e){const t=Dr(e);return t?new yr(t,"hsl"):null}function $r(e){const t=e.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)];const r=e.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return r?[parseInt(r[1],16),parseInt(r[2],16),parseInt(r[3],16)]:null}function jr(e){const t=$r(e);return t?new yr(t,"rgb"):null}function Fr(e){const t=e.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16),O(parseInt(t[4]+t[4],16),0,255,0,1)];const r=e.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return r?[parseInt(r[1],16),parseInt(r[2],16),parseInt(r[3],16),O(parseInt(r[4],16),0,255,0,1)]:null}function Ur(e){const t=Fr(e);return t?new yr(t,"rgb"):null}function Gr(e){const t=e.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!t)return null;const r=[parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3])];return isNaN(r[0])||isNaN(r[1])||isNaN(r[2])?null:r}function Kr(e){return t=>{const r=Gr(t);return r?Ar(r,"rgb",e):null}}function Yr(e){const t=e.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!t)return null;const r=[parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3]),parseFloat(t[4])];return isNaN(r[0])||isNaN(r[1])||isNaN(r[2])||isNaN(r[3])?null:r}function Xr(e){return t=>{const r=Yr(t);return r?Ar(r,"rgb",e):null}}const Wr=[{parser:$r,result:{alpha:!1,mode:"rgb",notation:"hex"}},{parser:Fr,result:{alpha:!0,mode:"rgb",notation:"hex"}},{parser:Lr,result:{alpha:!1,mode:"rgb",notation:"func"}},{parser:Rr,result:{alpha:!0,mode:"rgb",notation:"func"}},{parser:Or,result:{alpha:!1,mode:"hsl",notation:"func"}},{parser:Dr,result:{alpha:!0,mode:"hsl",notation:"func"}},{parser:Gr,result:{alpha:!1,mode:"rgb",notation:"object"}},{parser:Yr,result:{alpha:!0,mode:"rgb",notation:"object"}}];function Zr(e,t="int"){const r=function(e){return Wr.reduce(((t,{parser:r,result:n})=>t||(r(e)?n:null)),null)}(e);return r?"hex"===r.notation&&"float"!==t?Object.assign(Object.assign({},r),{type:"int"}):"func"===r.notation?Object.assign(Object.assign({},r),{type:t}):null:null}function Qr(e){const t=[jr,Ur,Nr,qr,Ir,Hr];"int"===e&&t.push(Kr("int"),Xr("int")),"float"===e&&t.push(Kr("float"),Xr("float"));const r=function(e){return t=>e.reduce(((e,r)=>null!==e?e:r(t)),null)}(t);return t=>{const n=r(t);return n?Er(n,e):null}}function Jr(e){const t=Qr("int");if("string"!=typeof e)return yr.black();const r=t(e);return null!=r?r:yr.black()}function en(e){const t=D(Math.floor(e),0,255).toString(16);return 1===t.length?`0${t}`:t}function tn(e,t="#"){return`${t}${dr(e.getComponents("rgb")).map(en).join("")}`}function rn(e,t="#"){const r=e.getComponents("rgb");return`${t}${[r[0],r[1],r[2],255*r[3]].map(en).join("")}`}function nn(e){const t=q(0);return`rgb(${dr(Er(e,"int").getComponents("rgb")).map((e=>t(e))).join(", ")})`}function sn(e){const t=q(2),r=q(0);return`rgba(${Er(e,"int").getComponents("rgb").map(((e,n)=>(3===n?t:r)(e))).join(", ")})`}function an(e,t){const r=q("float"===t?2:0),n=["r","g","b"];return`{${dr(Er(e,t).getComponents("rgb")).map(((e,t)=>`${n[t]}: ${r(e)}`)).join(", ")}}`}function on(e){return t=>an(t,e)}function ln(e,t){const r=q(2),n=q("float"===t?2:0),i=["r","g","b","a"];return`{${Er(e,t).getComponents("rgb").map(((e,t)=>`${i[t]}: ${(3===t?r:n)(e)}`)).join(", ")}}`}function hn(e){return t=>ln(t,e)}const cn=[{format:{alpha:!1,mode:"rgb",notation:"hex",type:"int"},stringifier:tn},{format:{alpha:!0,mode:"rgb",notation:"hex",type:"int"},stringifier:rn},{format:{alpha:!1,mode:"rgb",notation:"func",type:"int"},stringifier:nn},{format:{alpha:!0,mode:"rgb",notation:"func",type:"int"},stringifier:sn},{format:{alpha:!1,mode:"hsl",notation:"func",type:"int"},stringifier:function(e){const t=[q(0),Nt,Nt];return`hsl(${dr(Er(e,"int").getComponents("hsl")).map(((e,r)=>t[r](e))).join(", ")})`}},{format:{alpha:!0,mode:"hsl",notation:"func",type:"int"},stringifier:function(e){const t=[q(0),Nt,Nt,q(2)];return`hsla(${Er(e,"int").getComponents("hsl").map(((e,r)=>t[r](e))).join(", ")})`}},...["int","float"].reduce(((e,t)=>[...e,{format:{alpha:!1,mode:"rgb",notation:"object",type:t},stringifier:on(t)},{format:{alpha:!0,mode:"rgb",notation:"object",type:t},stringifier:hn(t)}]),[])];function pn(e){return cn.reduce(((t,r)=>{return t||(n=r.format,i=e,n.alpha===i.alpha&&n.mode===i.mode&&n.notation===i.notation&&n.type===i.type?r.stringifier:null);var n,i}),null)}const un=_e("apl");class dn{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.value=t.value,this.value.emitter.on("change",this.onValueChange_),this.element=e.createElement("div"),this.element.classList.add(un()),t.viewProps.bindClassModifiers(this.element),t.viewProps.bindTabIndex(this.element);const r=e.createElement("div");r.classList.add(un("b")),this.element.appendChild(r);const n=e.createElement("div");n.classList.add(un("c")),r.appendChild(n),this.colorElem_=n;const i=e.createElement("div");i.classList.add(un("m")),this.element.appendChild(i),this.markerElem_=i;const s=e.createElement("div");s.classList.add(un("p")),this.markerElem_.appendChild(s),this.previewElem_=s,this.update_()}update_(){const e=this.value.rawValue,t=e.getComponents("rgb"),r=new yr([t[0],t[1],t[2],0],"rgb"),n=new yr([t[0],t[1],t[2],255],"rgb"),i=["to right",sn(r),sn(n)];this.colorElem_.style.background=`linear-gradient(${i.join(",")})`,this.previewElem_.style.backgroundColor=sn(e);const s=O(t[3],0,1,0,100);this.markerElem_.style.left=`${s}%`}onValueChange_(){this.update_()}}class mn{constructor(e,t){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.view=new dn(e,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ft(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(e,t){if(!e.point)return;const r=e.point.x/e.bounds.width,n=this.value.rawValue,[i,s,a]=n.getComponents("hsv");this.value.setRawValue(new yr([i,s,a,r],"hsv"),t)}onPointerDown_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onKeyDown_(e){const t=It(Cr(!0),Ht(e));if(0===t)return;const r=this.value.rawValue,[n,i,s,a]=r.getComponents("hsv");this.value.setRawValue(new yr([n,i,s,a+t],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(e){0!==It(Cr(!0),Ht(e))&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const gn=_e("coltxt");class fn{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(gn()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("div");r.classList.add(gn("m")),this.modeElem_=function(e){const t=e.createElement("select");return t.appendChild([{text:"RGB",value:"rgb"},{text:"HSL",value:"hsl"},{text:"HSV",value:"hsv"},{text:"HEX",value:"hex"}].reduce(((t,r)=>{const n=e.createElement("option");return n.textContent=r.text,n.value=r.value,t.appendChild(n),t}),e.createDocumentFragment())),t}(e),this.modeElem_.classList.add(gn("ms")),r.appendChild(this.modeSelectElement),t.viewProps.bindDisabled(this.modeElem_);const n=e.createElement("div");n.classList.add(gn("mm")),n.appendChild(ge(e,"dropdown")),r.appendChild(n),this.element.appendChild(r);const i=e.createElement("div");i.classList.add(gn("w")),this.element.appendChild(i),this.inputsElem_=i,this.inputViews_=t.inputViews,this.applyInputViews_(),ye(t.mode,(e=>{this.modeElem_.value=e}))}get modeSelectElement(){return this.modeElem_}get inputViews(){return this.inputViews_}set inputViews(e){this.inputViews_=e,this.applyInputViews_()}applyInputViews_(){be(this.inputsElem_);const e=this.element.ownerDocument;this.inputViews_.forEach((t=>{const r=e.createElement("div");r.classList.add(gn("c")),r.appendChild(t.element),this.inputsElem_.appendChild(r)}))}}function vn(e,t,r){const n=fr(e,t)[r];return new g({min:0,max:n})}function bn(e,t){const r={colorMode:t.colorMode,colorType:t.colorType,parser:N,viewProps:t.viewProps};return[0,1,2].map((n=>{const i=function(e,t,r){return new Kt(e,{arrayPosition:0===r?"fst":2===r?"lst":"mid",parser:t.parser,props:m.fromObject({formatter:(n=t.colorType,q("float"===n?2:0)),keyScale:Cr(!1),pointerScale:"float"===t.colorType?.01:1}),value:d(0,{constraint:vn(t.colorMode,t.colorType,r)}),viewProps:t.viewProps});var n}(e,r,n);return Ot({primary:t.value,secondary:i.value,forward:e=>Er(e,t.colorType).getComponents(t.colorMode)[n],backward(e,r){const i=t.colorMode,s=Er(e,t.colorType).getComponents(i);s[n]=r;return Er(Ar(mr(dr(s),s[3]),i,t.colorType),"int")}}),i}))}class wn{constructor(e,t){this.onModeSelectChange_=this.onModeSelectChange_.bind(this),this.colorType_=t.colorType,this.value=t.value,this.viewProps=t.viewProps,this.colorMode=d(this.value.rawValue.mode),this.ccs_=this.createComponentControllers_(e),this.view=new fn(e,{mode:this.colorMode,inputViews:[this.ccs_[0].view,this.ccs_[1].view,this.ccs_[2].view],viewProps:this.viewProps}),this.view.modeSelectElement.addEventListener("change",this.onModeSelectChange_)}createComponentControllers_(e){const t=this.colorMode.rawValue;return function(e){return"hex"!==e}(t)?bn(e,{colorMode:t,colorType:this.colorType_,value:this.value,viewProps:this.viewProps}):function(e,t){const r=new Tt(e,{parser:Qr("int"),props:m.fromObject({formatter:tn}),value:d(yr.black()),viewProps:t.viewProps});return Ot({primary:t.value,secondary:r.value,forward:e=>new yr(dr(e.getComponents()),e.mode),backward:(e,t)=>new yr(mr(dr(t.getComponents(e.mode)),e.getComponents()[3]),e.mode)}),[r]}(e,{value:this.value,viewProps:this.viewProps})}onModeSelectChange_(e){const t=e.currentTarget;this.colorMode.rawValue=t.value,this.ccs_=this.createComponentControllers_(this.view.element.ownerDocument),this.view.inputViews=this.ccs_.map((e=>e.view))}}const yn=_e("hpl");class xn{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.value=t.value,this.value.emitter.on("change",this.onValueChange_),this.element=e.createElement("div"),this.element.classList.add(yn()),t.viewProps.bindClassModifiers(this.element),t.viewProps.bindTabIndex(this.element);const r=e.createElement("div");r.classList.add(yn("c")),this.element.appendChild(r);const n=e.createElement("div");n.classList.add(yn("m")),this.element.appendChild(n),this.markerElem_=n,this.update_()}update_(){const e=this.value.rawValue,[t]=e.getComponents("hsv");this.markerElem_.style.backgroundColor=nn(new yr([t,100,100],"hsv"));const r=O(t,0,360,0,100);this.markerElem_.style.left=`${r}%`}onValueChange_(){this.update_()}}class kn{constructor(e,t){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.view=new xn(e,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ft(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(e,t){if(!e.point)return;const r=O(D(e.point.x,0,e.bounds.width),0,e.bounds.width,0,360),n=this.value.rawValue,[,i,s,a]=n.getComponents("hsv");this.value.setRawValue(new yr([r,i,s,a],"hsv"),t)}onPointerDown_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onKeyDown_(e){const t=It(Cr(!1),Ht(e));if(0===t)return;const r=this.value.rawValue,[n,i,s,a]=r.getComponents("hsv");this.value.setRawValue(new yr([n+t,i,s,a],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(e){0!==It(Cr(!1),Ht(e))&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const _n=_e("svp");class Sn{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.value=t.value,this.value.emitter.on("change",this.onValueChange_),this.element=e.createElement("div"),this.element.classList.add(_n()),t.viewProps.bindClassModifiers(this.element),t.viewProps.bindTabIndex(this.element);const r=e.createElement("canvas");r.height=64,r.width=64,r.classList.add(_n("c")),this.element.appendChild(r),this.canvasElement=r;const n=e.createElement("div");n.classList.add(_n("m")),this.element.appendChild(n),this.markerElem_=n,this.update_()}update_(){const e=function(e){const t=e.ownerDocument.defaultView;return t&&"document"in t?e.getContext("2d",{willReadFrequently:!0}):null}(this.canvasElement);if(!e)return;const t=this.value.rawValue.getComponents("hsv"),r=this.canvasElement.width,n=this.canvasElement.height,i=e.getImageData(0,0,r,n),s=i.data;for(let e=0;e<n;e++)for(let i=0;i<r;i++){const a=O(i,0,r,0,100),o=O(e,0,n,100,0),l=ur(t[0],a,o),h=4*(e*r+i);s[h]=l[0],s[h+1]=l[1],s[h+2]=l[2],s[h+3]=255}e.putImageData(i,0,0);const a=O(t[1],0,100,0,100);this.markerElem_.style.left=`${a}%`;const o=O(t[2],0,100,100,0);this.markerElem_.style.top=`${o}%`}onValueChange_(){this.update_()}}class Cn{constructor(e,t){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.view=new Sn(e,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ft(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(e,t){if(!e.point)return;const r=O(e.point.x,0,e.bounds.width,0,100),n=O(e.point.y,0,e.bounds.height,100,0),[i,,,s]=this.value.rawValue.getComponents("hsv");this.value.setRawValue(new yr([i,r,n,s],"hsv"),t)}onPointerDown_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onKeyDown_(e){$t(e.key)&&e.preventDefault();const[t,r,n,i]=this.value.rawValue.getComponents("hsv"),s=Cr(!1),a=It(s,Ht(e)),o=It(s,Dt(e));0===a&&0===o||this.value.setRawValue(new yr([t,r+a,n+o,i],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(e){const t=Cr(!1),r=It(t,Ht(e)),n=It(t,Dt(e));0===r&&0===n||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class Mn{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.hPaletteC_=new kn(e,{value:this.value,viewProps:this.viewProps}),this.svPaletteC_=new Cn(e,{value:this.value,viewProps:this.viewProps}),this.alphaIcs_=t.supportsAlpha?{palette:new mn(e,{value:this.value,viewProps:this.viewProps}),text:new Kt(e,{parser:N,props:m.fromObject({pointerScale:.01,keyScale:.1,formatter:q(2)}),value:d(0,{constraint:new g({min:0,max:1})}),viewProps:this.viewProps})}:null,this.alphaIcs_&&Ot({primary:this.value,secondary:this.alphaIcs_.text.value,forward:e=>e.getComponents()[3],backward:(e,t)=>{const r=e.getComponents();return r[3]=t,new yr(r,e.mode)}}),this.textsC_=new wn(e,{colorType:t.colorType,value:this.value,viewProps:this.viewProps}),this.view=new kr(e,{alphaViews:this.alphaIcs_?{palette:this.alphaIcs_.palette.view,text:this.alphaIcs_.text.view}:null,hPaletteView:this.hPaletteC_.view,supportsAlpha:t.supportsAlpha,svPaletteView:this.svPaletteC_.view,textsView:this.textsC_.view,viewProps:this.viewProps})}get textsController(){return this.textsC_}}const Pn=_e("colsw");class zn{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),t.value.emitter.on("change",this.onValueChange_),this.value=t.value,this.element=e.createElement("div"),this.element.classList.add(Pn()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("div");r.classList.add(Pn("sw")),this.element.appendChild(r),this.swatchElem_=r;const n=e.createElement("button");n.classList.add(Pn("b")),t.viewProps.bindDisabled(n),this.element.appendChild(n),this.buttonElement=n,this.update_()}update_(){const e=this.value.rawValue;this.swatchElem_.style.backgroundColor=rn(e)}onValueChange_(){this.update_()}}class An{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.view=new zn(e,{value:this.value,viewProps:this.viewProps})}}class En{constructor(e,t){this.onButtonBlur_=this.onButtonBlur_.bind(this),this.onButtonClick_=this.onButtonClick_.bind(this),this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.foldable_=Ye.create(t.expanded),this.swatchC_=new An(e,{value:this.value,viewProps:this.viewProps});const r=this.swatchC_.view.buttonElement;r.addEventListener("blur",this.onButtonBlur_),r.addEventListener("click",this.onButtonClick_),this.textC_=new Tt(e,{parser:t.parser,props:m.fromObject({formatter:t.formatter}),value:this.value,viewProps:this.viewProps}),this.view=new pr(e,{foldable:this.foldable_,pickerLayout:t.pickerLayout}),this.view.swatchElement.appendChild(this.swatchC_.view.element),this.view.textElement.appendChild(this.textC_.view.element),this.popC_="popup"===t.pickerLayout?new zt(e,{viewProps:this.viewProps}):null;const n=new Mn(e,{colorType:t.colorType,supportsAlpha:t.supportsAlpha,value:this.value,viewProps:this.viewProps});n.view.allFocusableElements.forEach((e=>{e.addEventListener("blur",this.onPopupChildBlur_),e.addEventListener("keydown",this.onPopupChildKeydown_)})),this.pickerC_=n,this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(n.view.element),Ot({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:e=>e,backward:(e,t)=>t})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),We(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onButtonBlur_(e){if(!this.popC_)return;const t=this.view.element,r=e.relatedTarget;r&&t.contains(r)||(this.popC_.shows.rawValue=!1)}onButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(e){if(!this.popC_)return;const t=this.popC_.view.element,r=we(e);r&&t.contains(r)||r&&r===this.swatchC_.view.buttonElement&&!de(t.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(e){this.popC_?"Escape"===e.key&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&"Escape"===e.key&&this.swatchC_.view.buttonElement.focus()}}function Tn(e){return dr(e.getComponents("rgb")).reduce(((e,t)=>e<<8|255&Math.floor(t)),0)}function Vn(e){return e.getComponents("rgb").reduce(((e,t,r)=>e<<8|255&Math.floor(3===r?255*t:t)),0)>>>0}function Bn(e){return"number"!=typeof e?yr.black():new yr([(t=e)>>16&255,t>>8&255,255&t],"rgb");var t}function Ln(e){return"number"!=typeof e?yr.black():new yr([(t=e)>>24&255,t>>16&255,t>>8&255,O(255&t,0,255,0,1)],"rgb");var t}function Nn(e,r){return"object"==typeof e&&!t(e)&&(r in e&&"number"==typeof e[r])}function Rn(e){return Nn(e,"r")&&Nn(e,"g")&&Nn(e,"b")}function qn(e){return Rn(e)&&Nn(e,"a")}function On(e){return Rn(e)}function In(e,t){if(e.mode!==t.mode)return!1;if(e.type!==t.type)return!1;const r=e.getComponents(),n=t.getComponents();for(let e=0;e<r.length;e++)if(r[e]!==n[e])return!1;return!0}function Dn(e){return"a"in e?[e.r,e.g,e.b,e.a]:[e.r,e.g,e.b]}function Hn(e,t){return(r,n)=>{e?function(e,t,r){const n=Er(t,r).toRgbaObject();e.writeProperty("r",n.r),e.writeProperty("g",n.g),e.writeProperty("b",n.b),e.writeProperty("a",n.a)}(r,n,t):function(e,t,r){const n=Er(t,r).toRgbaObject();e.writeProperty("r",n.r),e.writeProperty("g",n.g),e.writeProperty("b",n.b)}(r,n,t)}}function $n(e){return t=>{const r=function(e,t){if(!On(e))return Er(yr.black(),t);if("int"===t){const t=Dn(e);return new yr(t,"rgb")}if("float"===t){const t=Dn(e);return new Pr(t,"rgb")}return Er(yr.black(),"int")}(t,e);return Er(r,"int")}}function jn(e,t){return r=>e?ln(r,t):an(r,t)}Oe({id:"input-color-number",type:"input",accept:(e,t)=>{if("number"!=typeof e)return null;if(!function(e){return"color"in e||"color"===e.view}(t))return null;const r=Sr(t);return r?{initialValue:e,params:Object.assign(Object.assign({},r),{supportsAlpha:(n=t,!!(null===(i=null==n?void 0:n.color)||void 0===i?void 0:i.alpha))})}:null;var n,i},binding:{reader:e=>e.params.supportsAlpha?Ln:Bn,equals:In,writer:e=>function(e){const t=e?Vn:Tn;return(e,r)=>{ar(e,t(r))}}(e.params.supportsAlpha)},controller:e=>{var t,r,n;return new En(e.document,{colorType:"int",expanded:null!==(t=e.params.expanded)&&void 0!==t&&t,formatter:(n=e.params.supportsAlpha,n?e=>rn(e,"0x"):e=>tn(e,"0x")),parser:Qr("int"),pickerLayout:null!==(r=e.params.picker)&&void 0!==r?r:"popup",supportsAlpha:e.params.supportsAlpha,value:e.value,viewProps:e.viewProps})}}),Oe({id:"input-color-object",type:"input",accept:(e,t)=>{var r;if(!On(e))return null;const n=Sr(t);return n?{initialValue:e,params:Object.assign(Object.assign({},n),{colorType:null!==(r=Mr(t))&&void 0!==r?r:"int"})}:null},binding:{reader:e=>$n(e.params.colorType),equals:In,writer:e=>Hn(qn(e.initialValue),e.params.colorType)},controller:e=>{var t,r;const n=qn(e.initialValue);return new En(e.document,{colorType:e.params.colorType,expanded:null!==(t=e.params.expanded)&&void 0!==t&&t,formatter:jn(n,e.params.colorType),parser:Qr("int"),pickerLayout:null!==(r=e.params.picker)&&void 0!==r?r:"popup",supportsAlpha:n,value:e.value,viewProps:e.viewProps})}}),Oe({id:"input-color-string",type:"input",accept:(e,t)=>{if("string"!=typeof e)return null;if("text"===t.view)return null;const r=Zr(e,Mr(t));if(!r)return null;const n=pn(r);if(!n)return null;const i=Sr(t);return i?{initialValue:e,params:Object.assign(Object.assign({},i),{format:r,stringifier:n})}:null},binding:{reader:()=>Jr,equals:In,writer:e=>{const t=function(e){const t=pn(e);return t?(e,r)=>{ar(e,t(r))}:null}(e.params.format);if(!t)throw o.notBindable();return t}},controller:e=>{var t,r;return new En(e.document,{colorType:e.params.format.type,expanded:null!==(t=e.params.expanded)&&void 0!==t&&t,formatter:e.params.stringifier,parser:Qr("int"),pickerLayout:null!==(r=e.params.picker)&&void 0!==r?r:"popup",supportsAlpha:e.params.format.alpha,value:e.value,viewProps:e.viewProps})}});class Fn{constructor(e){this.components=e.components,this.asm_=e.assembly}constrain(e){const t=this.asm_.toComponents(e).map(((e,t)=>{var r,n;return null!==(n=null===(r=this.components[t])||void 0===r?void 0:r.constrain(e))&&void 0!==n?n:e}));return this.asm_.fromComponents(t)}}const Un=_e("pndtxt");class Gn{constructor(e,t){this.textViews=t.textViews,this.element=e.createElement("div"),this.element.classList.add(Un()),this.textViews.forEach((t=>{const r=e.createElement("div");r.classList.add(Un("a")),r.appendChild(t.element),this.element.appendChild(r)}))}}class Kn{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.acs_=t.axes.map(((r,n)=>function(e,t,r){return new Kt(e,{arrayPosition:0===r?"fst":r===t.axes.length-1?"lst":"mid",parser:t.parser,props:t.axes[r].textProps,value:d(0,{constraint:t.axes[r].constraint}),viewProps:t.viewProps})}(e,t,n))),this.acs_.forEach(((e,r)=>{Ot({primary:this.value,secondary:e.value,forward:e=>t.assembly.toComponents(e)[r],backward:(e,n)=>{const i=t.assembly.toComponents(e);return i[r]=n,t.assembly.fromComponents(i)}})})),this.view=new Gn(e,{textViews:this.acs_.map((e=>e.view))})}get textControllers(){return this.acs_}}class Yn extends re{get max(){return this.controller.valueController.sliderController.props.get("max")}set max(e){this.controller.valueController.sliderController.props.set("max",e)}get min(){return this.controller.valueController.sliderController.props.get("min")}set min(e){this.controller.valueController.sliderController.props.set("min",e)}}Oe({id:"input-number",type:"input",accept:(e,t)=>{if("number"!=typeof e)return null;const r=ae(t,(e=>Object.assign(Object.assign({},Y(e)),{options:e.optional.custom(yt),readonly:e.optional.constant(!1)})));return r?{initialValue:e,params:r}:null},binding:{reader:e=>R,constraint:e=>function(e,t){const r=[],n=U(e,t);n&&r.push(n);const i=G(e);i&&r.push(i);const s=kt(e.options);return s&&r.push(s),new vt(r)}(e.params,e.initialValue),writer:e=>ar},controller:e=>{const t=e.value,r=e.constraint,n=r&&bt(r,wt);if(n)return new Ct(e.document,{props:new m({options:n.values.value("options")}),value:t,viewProps:e.viewProps});const i=K(e.params,t.rawValue),s=r&&bt(r,g);return s?new Jt(e.document,Object.assign(Object.assign({},(a=Object.assign(Object.assign({},i),{keyScale:d(i.keyScale),max:s.values.value("max"),min:s.values.value("min")}),{sliderProps:new m({keyScale:a.keyScale,max:a.max,min:a.min}),textProps:new m({formatter:d(a.formatter),keyScale:a.keyScale,pointerScale:d(a.pointerScale)})})),{parser:N,value:t,viewProps:e.viewProps})):new Kt(e.document,{parser:N,props:m.fromObject(i),value:t,viewProps:e.viewProps});var a},api:e=>"number"!=typeof e.controller.value.rawValue?null:e.controller.valueController instanceof Jt?new Yn(e.controller):e.controller.valueController instanceof Ct?new ft(e.controller):null});class Xn{constructor(e=0,t=0){this.x=e,this.y=t}getComponents(){return[this.x,this.y]}static isObject(e){if(t(e))return!1;const r=e.x,n=e.y;return"number"==typeof r&&"number"==typeof n}static equals(e,t){return e.x===t.x&&e.y===t.y}toObject(){return{x:this.x,y:this.y}}}const Wn={toComponents:e=>e.getComponents(),fromComponents:e=>new Xn(...e)},Zn=_e("p2d");class Qn{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(Zn()),t.viewProps.bindClassModifiers(this.element),ye(t.expanded,Te(this.element,Zn(void 0,"expanded")));const r=e.createElement("div");r.classList.add(Zn("h")),this.element.appendChild(r);const n=e.createElement("button");n.classList.add(Zn("b")),n.appendChild(ge(e,"p2dpad")),t.viewProps.bindDisabled(n),r.appendChild(n),this.buttonElement=n;const i=e.createElement("div");if(i.classList.add(Zn("t")),r.appendChild(i),this.textElement=i,"inline"===t.pickerLayout){const t=e.createElement("div");t.classList.add(Zn("p")),this.element.appendChild(t),this.pickerElement=t}else this.pickerElement=null}}const Jn=_e("p2dp");class ei{constructor(e,t){this.onFoldableChange_=this.onFoldableChange_.bind(this),this.onPropsChange_=this.onPropsChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.props_=t.props,this.props_.emitter.on("change",this.onPropsChange_),this.element=e.createElement("div"),this.element.classList.add(Jn()),"popup"===t.layout&&this.element.classList.add(Jn(void 0,"p")),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("div");r.classList.add(Jn("p")),t.viewProps.bindTabIndex(r),this.element.appendChild(r),this.padElement=r;const n=e.createElementNS(pe,"svg");n.classList.add(Jn("g")),this.padElement.appendChild(n),this.svgElem_=n;const i=e.createElementNS(pe,"line");i.classList.add(Jn("ax")),i.setAttributeNS(null,"x1","0"),i.setAttributeNS(null,"y1","50%"),i.setAttributeNS(null,"x2","100%"),i.setAttributeNS(null,"y2","50%"),this.svgElem_.appendChild(i);const s=e.createElementNS(pe,"line");s.classList.add(Jn("ax")),s.setAttributeNS(null,"x1","50%"),s.setAttributeNS(null,"y1","0"),s.setAttributeNS(null,"x2","50%"),s.setAttributeNS(null,"y2","100%"),this.svgElem_.appendChild(s);const a=e.createElementNS(pe,"line");a.classList.add(Jn("l")),a.setAttributeNS(null,"x1","50%"),a.setAttributeNS(null,"y1","50%"),this.svgElem_.appendChild(a),this.lineElem_=a;const o=e.createElement("div");o.classList.add(Jn("m")),this.padElement.appendChild(o),this.markerElem_=o,t.value.emitter.on("change",this.onValueChange_),this.value=t.value,this.update_()}get allFocusableElements(){return[this.padElement]}update_(){const[e,t]=this.value.rawValue.getComponents(),r=this.props_.get("max"),n=O(e,-r,+r,0,100),i=O(t,-r,+r,0,100),s=this.props_.get("invertsY")?100-i:i;this.lineElem_.setAttributeNS(null,"x2",`${n}%`),this.lineElem_.setAttributeNS(null,"y2",`${s}%`),this.markerElem_.style.left=`${n}%`,this.markerElem_.style.top=`${s}%`}onValueChange_(){this.update_()}onPropsChange_(){this.update_()}onFoldableChange_(){this.update_()}}function ti(e,t,r){return[It(t[0],Ht(e)),It(t[1],Dt(e))*(r?1:-1)]}class ri{constructor(e,t){this.onPadKeyDown_=this.onPadKeyDown_.bind(this),this.onPadKeyUp_=this.onPadKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.props=t.props,this.value=t.value,this.viewProps=t.viewProps,this.view=new ei(e,{layout:t.layout,props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ft(this.view.padElement),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.padElement.addEventListener("keydown",this.onPadKeyDown_),this.view.padElement.addEventListener("keyup",this.onPadKeyUp_)}handlePointerEvent_(e,t){if(!e.point)return;const r=this.props.get("max"),n=O(e.point.x,0,e.bounds.width,-r,+r),i=O(this.props.get("invertsY")?e.bounds.height-e.point.y:e.point.y,0,e.bounds.height,-r,+r);this.value.setRawValue(new Xn(n,i),t)}onPointerDown_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onPadKeyDown_(e){$t(e.key)&&e.preventDefault();const[t,r]=ti(e,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));0===t&&0===r||this.value.setRawValue(new Xn(this.value.rawValue.x+t,this.value.rawValue.y+r),{forceEmit:!1,last:!1})}onPadKeyUp_(e){const[t,r]=ti(e,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));0===t&&0===r||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class ni{constructor(e,t){var r,n;this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.onPadButtonBlur_=this.onPadButtonBlur_.bind(this),this.onPadButtonClick_=this.onPadButtonClick_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.foldable_=Ye.create(t.expanded),this.popC_="popup"===t.pickerLayout?new zt(e,{viewProps:this.viewProps}):null;const i=new ri(e,{layout:t.pickerLayout,props:new m({invertsY:d(t.invertsY),max:d(t.max),xKeyScale:t.axes[0].textProps.value("keyScale"),yKeyScale:t.axes[1].textProps.value("keyScale")}),value:this.value,viewProps:this.viewProps});i.view.allFocusableElements.forEach((e=>{e.addEventListener("blur",this.onPopupChildBlur_),e.addEventListener("keydown",this.onPopupChildKeydown_)})),this.pickerC_=i,this.textC_=new Kn(e,{assembly:Wn,axes:t.axes,parser:t.parser,value:this.value,viewProps:this.viewProps}),this.view=new Qn(e,{expanded:this.foldable_.value("expanded"),pickerLayout:t.pickerLayout,viewProps:this.viewProps}),this.view.textElement.appendChild(this.textC_.view.element),null===(r=this.view.buttonElement)||void 0===r||r.addEventListener("blur",this.onPadButtonBlur_),null===(n=this.view.buttonElement)||void 0===n||n.addEventListener("click",this.onPadButtonClick_),this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(this.pickerC_.view.element),Ot({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:e=>e,backward:(e,t)=>t})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),We(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onPadButtonBlur_(e){if(!this.popC_)return;const t=this.view.element,r=e.relatedTarget;r&&t.contains(r)||(this.popC_.shows.rawValue=!1)}onPadButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(e){if(!this.popC_)return;const t=this.popC_.view.element,r=we(e);r&&t.contains(r)||r&&r===this.view.buttonElement&&!de(t.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(e){this.popC_?"Escape"===e.key&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&"Escape"===e.key&&this.view.buttonElement.focus()}}function ii(e){return Xn.isObject(e)?new Xn(e.x,e.y):new Xn}function si(e,t){e.writeProperty("x",t.x),e.writeProperty("y",t.y)}function ai(e,r){var n,i;if(!t(e.min)||!t(e.max))return Math.max(Math.abs(null!==(n=e.min)&&void 0!==n?n:0),Math.abs(null!==(i=e.max)&&void 0!==i?i:0));const s=j(e);return Math.max(10*Math.abs(s),10*Math.abs(r))}function oi(e,t){var r,n;const i=ai(s(e,null!==(r=e.x)&&void 0!==r?r:{}),t.x),a=ai(s(e,null!==(n=e.y)&&void 0!==n?n:{}),t.y);return Math.max(i,a)}function li(e){if(!("y"in e))return!1;const t=e.y;return!!t&&("inverted"in t&&!!t.inverted)}Oe({id:"input-point2d",type:"input",accept:(e,t)=>{if(!Xn.isObject(e))return null;const r=ae(t,(e=>Object.assign(Object.assign({},rr(e)),{expanded:e.optional.boolean,picker:e.optional.custom(sr),readonly:e.optional.constant(!1),x:e.optional.custom(nr),y:e.optional.object(Object.assign(Object.assign({},rr(e)),{inverted:e.optional.boolean}))})));return r?{initialValue:e,params:r}:null},binding:{reader:()=>ii,constraint:e=>{return t=e.params,r=e.initialValue,new Fn({assembly:Wn,components:[ir(Object.assign(Object.assign({},t),t.x),r.x),ir(Object.assign(Object.assign({},t),t.y),r.y)]});var t,r},equals:Xn.equals,writer:()=>si},controller:e=>{var t,r;const n=e.document,i=e.value,a=e.constraint,o=[e.params.x,e.params.y];return new ni(n,{axes:i.rawValue.getComponents().map(((t,r)=>{var n;return X({constraint:a.components[r],initialValue:t,params:s(e.params,null!==(n=o[r])&&void 0!==n?n:{})})})),expanded:null!==(t=e.params.expanded)&&void 0!==t&&t,invertsY:li(e.params),max:oi(e.params,i.rawValue),parser:N,pickerLayout:null!==(r=e.params.picker)&&void 0!==r?r:"popup",value:i,viewProps:e.viewProps})}});class hi{constructor(e=0,t=0,r=0){this.x=e,this.y=t,this.z=r}getComponents(){return[this.x,this.y,this.z]}static isObject(e){if(t(e))return!1;const r=e.x,n=e.y,i=e.z;return"number"==typeof r&&"number"==typeof n&&"number"==typeof i}static equals(e,t){return e.x===t.x&&e.y===t.y&&e.z===t.z}toObject(){return{x:this.x,y:this.y,z:this.z}}}const ci={toComponents:e=>e.getComponents(),fromComponents:e=>new hi(...e)};function pi(e){return hi.isObject(e)?new hi(e.x,e.y,e.z):new hi}function ui(e,t){e.writeProperty("x",t.x),e.writeProperty("y",t.y),e.writeProperty("z",t.z)}Oe({id:"input-point3d",type:"input",accept:(e,t)=>{if(!hi.isObject(e))return null;const r=ae(t,(e=>Object.assign(Object.assign({},rr(e)),{readonly:e.optional.constant(!1),x:e.optional.custom(nr),y:e.optional.custom(nr),z:e.optional.custom(nr)})));return r?{initialValue:e,params:r}:null},binding:{reader:e=>pi,constraint:e=>{return t=e.params,r=e.initialValue,new Fn({assembly:ci,components:[ir(Object.assign(Object.assign({},t),t.x),r.x),ir(Object.assign(Object.assign({},t),t.y),r.y),ir(Object.assign(Object.assign({},t),t.z),r.z)]});var t,r},equals:hi.equals,writer:e=>ui},controller:e=>{const t=e.value,r=e.constraint,n=[e.params.x,e.params.y,e.params.z];return new Kn(e.document,{assembly:ci,axes:t.rawValue.getComponents().map(((t,i)=>{var a;return X({constraint:r.components[i],initialValue:t,params:s(e.params,null!==(a=n[i])&&void 0!==a?a:{})})})),parser:N,value:t,viewProps:e.viewProps})}});class di{constructor(e=0,t=0,r=0,n=0){this.x=e,this.y=t,this.z=r,this.w=n}getComponents(){return[this.x,this.y,this.z,this.w]}static isObject(e){if(t(e))return!1;const r=e.x,n=e.y,i=e.z,s=e.w;return"number"==typeof r&&"number"==typeof n&&"number"==typeof i&&"number"==typeof s}static equals(e,t){return e.x===t.x&&e.y===t.y&&e.z===t.z&&e.w===t.w}toObject(){return{x:this.x,y:this.y,z:this.z,w:this.w}}}const mi={toComponents:e=>e.getComponents(),fromComponents:e=>new di(...e)};function gi(e){return di.isObject(e)?new di(e.x,e.y,e.z,e.w):new di}function fi(e,t){e.writeProperty("x",t.x),e.writeProperty("y",t.y),e.writeProperty("z",t.z),e.writeProperty("w",t.w)}Oe({id:"input-point4d",type:"input",accept:(e,t)=>{if(!di.isObject(e))return null;const r=ae(t,(e=>Object.assign(Object.assign({},rr(e)),{readonly:e.optional.constant(!1),w:e.optional.custom(nr),x:e.optional.custom(nr),y:e.optional.custom(nr),z:e.optional.custom(nr)})));return r?{initialValue:e,params:r}:null},binding:{reader:e=>gi,constraint:e=>{return t=e.params,r=e.initialValue,new Fn({assembly:mi,components:[ir(Object.assign(Object.assign({},t),t.x),r.x),ir(Object.assign(Object.assign({},t),t.y),r.y),ir(Object.assign(Object.assign({},t),t.z),r.z),ir(Object.assign(Object.assign({},t),t.w),r.w)]});var t,r},equals:di.equals,writer:e=>fi},controller:e=>{const t=e.value,r=e.constraint,n=[e.params.x,e.params.y,e.params.z,e.params.w];return new Kn(e.document,{assembly:mi,axes:t.rawValue.getComponents().map(((t,i)=>{var a;return X({constraint:r.components[i],initialValue:t,params:s(e.params,null!==(a=n[i])&&void 0!==a?a:{})})})),parser:N,value:t,viewProps:e.viewProps})}}),Oe({id:"input-string",type:"input",accept:(e,t)=>{if("string"!=typeof e)return null;const r=ae(t,(e=>({readonly:e.optional.constant(!1),options:e.optional.custom(yt)})));return r?{initialValue:e,params:r}:null},binding:{reader:e=>Rt,constraint:e=>function(e){const t=[],r=kt(e.options);return r&&t.push(r),new vt(t)}(e.params),writer:e=>ar},controller:e=>{const t=e.document,r=e.value,n=e.constraint,i=n&&bt(n,wt);return i?new Ct(t,{props:new m({options:i.values.value("options")}),value:r,viewProps:e.viewProps}):new Tt(t,{parser:e=>e,props:m.fromObject({formatter:qt}),value:r,viewProps:e.viewProps})},api:e=>"string"!=typeof e.controller.value.rawValue?null:e.controller.valueController instanceof Ct?new ft(e.controller):null});const vi={defaultInterval:200,defaultRows:3},bi=_e("mll");class wi{constructor(e,t){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=t.formatter,this.element=e.createElement("div"),this.element.classList.add(bi()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("textarea");r.classList.add(bi("i")),r.style.height=`calc(var(${tr("containerUnitSize")}) * ${t.rows})`,r.readOnly=!0,t.viewProps.bindDisabled(r),this.element.appendChild(r),this.textareaElem_=r,t.value.emitter.on("change",this.onValueUpdate_),this.value=t.value,this.update_()}update_(){const e=this.textareaElem_,t=e.scrollTop===e.scrollHeight-e.clientHeight,r=[];this.value.rawValue.forEach((e=>{void 0!==e&&r.push(this.formatter_(e))})),e.textContent=r.join("\n"),t&&(e.scrollTop=e.scrollHeight)}onValueUpdate_(){this.update_()}}class yi{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.view=new wi(e,{formatter:t.formatter,rows:t.rows,value:this.value,viewProps:this.viewProps})}}const xi=_e("sgl");class ki{constructor(e,t){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=t.formatter,this.element=e.createElement("div"),this.element.classList.add(xi()),t.viewProps.bindClassModifiers(this.element);const r=e.createElement("input");r.classList.add(xi("i")),r.readOnly=!0,r.type="text",t.viewProps.bindDisabled(r),this.element.appendChild(r),this.inputElement=r,t.value.emitter.on("change",this.onValueUpdate_),this.value=t.value,this.update_()}update_(){const e=this.value.rawValue,t=e[e.length-1];this.inputElement.value=void 0!==t?this.formatter_(t):""}onValueUpdate_(){this.update_()}}class _i{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.view=new ki(e,{formatter:t.formatter,value:this.value,viewProps:this.viewProps})}}Oe({id:"monitor-bool",type:"monitor",accept:(e,t)=>{if("boolean"!=typeof e)return null;const r=ae(t,(e=>({readonly:e.required.constant(!0),rows:e.optional.number})));return r?{initialValue:e,params:r}:null},binding:{reader:e=>Vt},controller:e=>{var t;return 1===e.value.rawValue.length?new _i(e.document,{formatter:Bt,value:e.value,viewProps:e.viewProps}):new yi(e.document,{formatter:Bt,rows:null!==(t=e.params.rows)&&void 0!==t?t:vi.defaultRows,value:e.value,viewProps:e.viewProps})}});class Si extends re{get max(){return this.controller.valueController.props.get("max")}set max(e){this.controller.valueController.props.set("max",e)}get min(){return this.controller.valueController.props.get("min")}set min(e){this.controller.valueController.props.set("min",e)}}const Ci=_e("grl");class Mi{constructor(e,t){this.onCursorChange_=this.onCursorChange_.bind(this),this.onValueUpdate_=this.onValueUpdate_.bind(this),this.element=e.createElement("div"),this.element.classList.add(Ci()),t.viewProps.bindClassModifiers(this.element),this.formatter_=t.formatter,this.props_=t.props,this.cursor_=t.cursor,this.cursor_.emitter.on("change",this.onCursorChange_);const r=e.createElementNS(pe,"svg");r.classList.add(Ci("g")),r.style.height=`calc(var(${tr("containerUnitSize")}) * ${t.rows})`,this.element.appendChild(r),this.svgElem_=r;const n=e.createElementNS(pe,"polyline");this.svgElem_.appendChild(n),this.lineElem_=n;const i=e.createElement("div");i.classList.add(Ci("t"),_e("tt")()),this.element.appendChild(i),this.tooltipElem_=i,t.value.emitter.on("change",this.onValueUpdate_),this.value=t.value,this.update_()}get graphElement(){return this.svgElem_}update_(){const{clientWidth:e,clientHeight:t}=this.element,r=this.value.rawValue.length-1,n=this.props_.get("min"),i=this.props_.get("max"),s=[];this.value.rawValue.forEach(((a,o)=>{if(void 0===a)return;const l=O(o,0,r,0,e),h=O(a,n,i,t,0);s.push([l,h].join(","))})),this.lineElem_.setAttributeNS(null,"points",s.join(" "));const a=this.tooltipElem_,o=this.value.rawValue[this.cursor_.rawValue];if(void 0===o)return void a.classList.remove(Ci("t","a"));const l=O(this.cursor_.rawValue,0,r,0,e),h=O(o,n,i,t,0);a.style.left=`${l}px`,a.style.top=`${h}px`,a.textContent=`${this.formatter_(o)}`,a.classList.contains(Ci("t","a"))||(a.classList.add(Ci("t","a"),Ci("t","in")),ue(a),a.classList.remove(Ci("t","in")))}onValueUpdate_(){this.update_()}onCursorChange_(){this.update_()}}class Pi{constructor(e,t){if(this.onGraphMouseMove_=this.onGraphMouseMove_.bind(this),this.onGraphMouseLeave_=this.onGraphMouseLeave_.bind(this),this.onGraphPointerDown_=this.onGraphPointerDown_.bind(this),this.onGraphPointerMove_=this.onGraphPointerMove_.bind(this),this.onGraphPointerUp_=this.onGraphPointerUp_.bind(this),this.props=t.props,this.value=t.value,this.viewProps=t.viewProps,this.cursor_=d(-1),this.view=new Mi(e,{cursor:this.cursor_,formatter:t.formatter,rows:t.rows,props:this.props,value:this.value,viewProps:this.viewProps}),de(e)){const e=new Ft(this.view.element);e.emitter.on("down",this.onGraphPointerDown_),e.emitter.on("move",this.onGraphPointerMove_),e.emitter.on("up",this.onGraphPointerUp_)}else this.view.element.addEventListener("mousemove",this.onGraphMouseMove_),this.view.element.addEventListener("mouseleave",this.onGraphMouseLeave_)}importProps(e){return oe(e,null,(e=>({max:e.required.number,min:e.required.number})),(e=>(this.props.set("max",e.max),this.props.set("min",e.min),!0)))}exportProps(){return le(null,{max:this.props.get("max"),min:this.props.get("min")})}onGraphMouseLeave_(){this.cursor_.rawValue=-1}onGraphMouseMove_(e){const{clientWidth:t}=this.view.element;this.cursor_.rawValue=Math.floor(O(e.offsetX,0,t,0,this.value.rawValue.length))}onGraphPointerDown_(e){this.onGraphPointerMove_(e)}onGraphPointerMove_(e){e.data.point?this.cursor_.rawValue=Math.floor(O(e.data.point.x,0,e.data.bounds.width,0,this.value.rawValue.length)):this.cursor_.rawValue=-1}onGraphPointerUp_(){this.cursor_.rawValue=-1}}function zi(e){return t(e.format)?q(2):e.format}function Ai(e){return"graph"===e.view}Oe({id:"monitor-number",type:"monitor",accept:(e,t)=>{if("number"!=typeof e)return null;const r=ae(t,(e=>({format:e.optional.function,max:e.optional.number,min:e.optional.number,readonly:e.required.constant(!0),rows:e.optional.number,view:e.optional.string})));return r?{initialValue:e,params:r}:null},binding:{defaultBufferSize:e=>Ai(e)?64:1,reader:e=>R},controller:e=>Ai(e.params)?function(e){var t,r,n;return new Pi(e.document,{formatter:zi(e.params),rows:null!==(t=e.params.rows)&&void 0!==t?t:vi.defaultRows,props:m.fromObject({max:null!==(r=e.params.max)&&void 0!==r?r:100,min:null!==(n=e.params.min)&&void 0!==n?n:0}),value:e.value,viewProps:e.viewProps})}(e):function(e){var t;return 1===e.value.rawValue.length?new _i(e.document,{formatter:zi(e.params),value:e.value,viewProps:e.viewProps}):new yi(e.document,{formatter:zi(e.params),rows:null!==(t=e.params.rows)&&void 0!==t?t:vi.defaultRows,value:e.value,viewProps:e.viewProps})}(e),api:e=>e.controller.valueController instanceof Pi?new Si(e.controller):null}),Oe({id:"monitor-string",type:"monitor",accept:(e,t)=>{if("string"!=typeof e)return null;const r=ae(t,(e=>({multiline:e.optional.boolean,readonly:e.required.constant(!0),rows:e.optional.number})));return r?{initialValue:e,params:r}:null},binding:{reader:e=>Rt},controller:e=>{var t;const r=e.value;return r.rawValue.length>1||e.params.multiline?new yi(e.document,{formatter:qt,rows:null!==(t=e.params.rows)&&void 0!==t?t:vi.defaultRows,value:r,viewProps:e.viewProps}):new _i(e.document,{formatter:qt,value:r,viewProps:e.viewProps})}});class Ei{constructor(e,t,r){this.lexer=void 0,this.start=void 0,this.end=void 0,this.lexer=e,this.start=t,this.end=r}static range(e,t){return t?e&&e.loc&&t.loc&&e.loc.lexer===t.loc.lexer?new Ei(e.loc.lexer,e.loc.start,t.loc.end):null:e&&e.loc}}class Ti{constructor(e,t){this.text=void 0,this.loc=void 0,this.noexpand=void 0,this.treatAsRelax=void 0,this.text=e,this.loc=t}range(e,t){return new Ti(t,Ei.range(this,e))}}class Vi{constructor(e,t){this.name=void 0,this.position=void 0,this.length=void 0,this.rawMessage=void 0;var r,n,i="KaTeX parse error: "+e,s=t&&t.loc;if(s&&s.start<=s.end){var a=s.lexer.input;r=s.start,n=s.end,r===a.length?i+=" at end of input: ":i+=" at position "+(r+1)+": ";var o=a.slice(r,n).replace(/[^]/g,"$&̲");i+=(r>15?"…"+a.slice(r-15,r):a.slice(0,r))+o+(n+15<a.length?a.slice(n,n+15)+"…":a.slice(n))}var l=new Error(i);return l.name="ParseError",l.__proto__=Vi.prototype,l.position=r,null!=r&&null!=n&&(l.length=n-r),l.rawMessage=e,l}}Vi.prototype.__proto__=Error.prototype;var Bi=/([A-Z])/g,Li={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"},Ni=/[&><"']/g;var Ri=function e(t){return"ordgroup"===t.type||"color"===t.type?1===t.body.length?e(t.body[0]):t:"font"===t.type?e(t.body):t},qi={contains:function(e,t){return-1!==e.indexOf(t)},deflt:function(e,t){return void 0===e?t:e},escape:function(e){return String(e).replace(Ni,(e=>Li[e]))},hyphenate:function(e){return e.replace(Bi,"-$1").toLowerCase()},getBaseElem:Ri,isCharacterBox:function(e){var t=Ri(e);return"mathord"===t.type||"textord"===t.type||"atom"===t.type},protocolFromUrl:function(e){var t=/^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e);return t?":"!==t[2]?null:/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(t[1])?t[1].toLowerCase():null:"_relative"}},Oi={displayMode:{type:"boolean",description:"Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",cli:"-d, --display-mode"},output:{type:{enum:["htmlAndMathml","html","mathml"]},description:"Determines the markup language of the output.",cli:"-F, --format <type>"},leqno:{type:"boolean",description:"Render display math in leqno style (left-justified tags)."},fleqn:{type:"boolean",description:"Render display math flush left."},throwOnError:{type:"boolean",default:!0,cli:"-t, --no-throw-on-error",cliDescription:"Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."},errorColor:{type:"string",default:"#cc0000",cli:"-c, --error-color <color>",cliDescription:"A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",cliProcessor:e=>"#"+e},macros:{type:"object",cli:"-m, --macro <def>",cliDescription:"Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",cliDefault:[],cliProcessor:(e,t)=>(t.push(e),t)},minRuleThickness:{type:"number",description:"Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",processor:e=>Math.max(0,e),cli:"--min-rule-thickness <size>",cliProcessor:parseFloat},colorIsTextColor:{type:"boolean",description:"Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",cli:"-b, --color-is-text-color"},strict:{type:[{enum:["warn","ignore","error"]},"boolean","function"],description:"Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",cli:"-S, --strict",cliDefault:!1},trust:{type:["boolean","function"],description:"Trust the input, enabling all HTML features such as \\url.",cli:"-T, --trust"},maxSize:{type:"number",default:1/0,description:"If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",processor:e=>Math.max(0,e),cli:"-s, --max-size <n>",cliProcessor:parseInt},maxExpand:{type:"number",default:1e3,description:"Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",processor:e=>Math.max(0,e),cli:"-e, --max-expand <n>",cliProcessor:e=>"Infinity"===e?1/0:parseInt(e)},globalGroup:{type:"boolean",cli:!1}};function Ii(e){if(e.default)return e.default;var t=e.type,r=Array.isArray(t)?t[0]:t;if("string"!=typeof r)return r.enum[0];switch(r){case"boolean":return!1;case"string":return"";case"number":return 0;case"object":return{}}}class Di{constructor(e){for(var t in this.displayMode=void 0,this.output=void 0,this.leqno=void 0,this.fleqn=void 0,this.throwOnError=void 0,this.errorColor=void 0,this.macros=void 0,this.minRuleThickness=void 0,this.colorIsTextColor=void 0,this.strict=void 0,this.trust=void 0,this.maxSize=void 0,this.maxExpand=void 0,this.globalGroup=void 0,e=e||{},Oi)if(Oi.hasOwnProperty(t)){var r=Oi[t];this[t]=void 0!==e[t]?r.processor?r.processor(e[t]):e[t]:Ii(r)}}reportNonstrict(e,t,r){var n=this.strict;if("function"==typeof n&&(n=n(e,t,r)),n&&"ignore"!==n){if(!0===n||"error"===n)throw new Vi("LaTeX-incompatible input and strict mode is set to 'error': "+t+" ["+e+"]",r);"warn"===n?"undefined"!=typeof console&&console.warn("LaTeX-incompatible input and strict mode is set to 'warn': "+t+" ["+e+"]"):"undefined"!=typeof console&&console.warn("LaTeX-incompatible input and strict mode is set to unrecognized '"+n+"': "+t+" ["+e+"]")}}useStrictBehavior(e,t,r){var n=this.strict;if("function"==typeof n)try{n=n(e,t,r)}catch(e){n="error"}return!(!n||"ignore"===n)&&(!0===n||"error"===n||("warn"===n?("undefined"!=typeof console&&console.warn("LaTeX-incompatible input and strict mode is set to 'warn': "+t+" ["+e+"]"),!1):("undefined"!=typeof console&&console.warn("LaTeX-incompatible input and strict mode is set to unrecognized '"+n+"': "+t+" ["+e+"]"),!1)))}isTrusted(e){if(e.url&&!e.protocol){var t=qi.protocolFromUrl(e.url);if(null==t)return!1;e.protocol=t}var r="function"==typeof this.trust?this.trust(e):this.trust;return Boolean(r)}}class Hi{constructor(e,t,r){this.id=void 0,this.size=void 0,this.cramped=void 0,this.id=e,this.size=t,this.cramped=r}sup(){return $i[ji[this.id]]}sub(){return $i[Fi[this.id]]}fracNum(){return $i[Ui[this.id]]}fracDen(){return $i[Gi[this.id]]}cramp(){return $i[Ki[this.id]]}text(){return $i[Yi[this.id]]}isTight(){return this.size>=2}}var $i=[new Hi(0,0,!1),new Hi(1,0,!0),new Hi(2,1,!1),new Hi(3,1,!0),new Hi(4,2,!1),new Hi(5,2,!0),new Hi(6,3,!1),new Hi(7,3,!0)],ji=[4,5,4,5,6,7,6,7],Fi=[5,5,5,5,7,7,7,7],Ui=[2,3,4,5,6,7,6,7],Gi=[3,3,5,5,7,7,7,7],Ki=[1,1,3,3,5,5,7,7],Yi=[0,1,2,3,2,3,2,3],Xi={DISPLAY:$i[0],TEXT:$i[2],SCRIPT:$i[4],SCRIPTSCRIPT:$i[6]},Wi=[{name:"latin",blocks:[[256,591],[768,879]]},{name:"cyrillic",blocks:[[1024,1279]]},{name:"armenian",blocks:[[1328,1423]]},{name:"brahmic",blocks:[[2304,4255]]},{name:"georgian",blocks:[[4256,4351]]},{name:"cjk",blocks:[[12288,12543],[19968,40879],[65280,65376]]},{name:"hangul",blocks:[[44032,55215]]}];var Zi=[];function Qi(e){for(var t=0;t<Zi.length;t+=2)if(e>=Zi[t]&&e<=Zi[t+1])return!0;return!1}Wi.forEach((e=>e.blocks.forEach((e=>Zi.push(...e)))));var Ji=80,es={doubleleftarrow:"M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",doublerightarrow:"M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",leftarrow:"M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",leftbrace:"M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",leftbraceunder:"M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",leftgroup:"M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",leftgroupunder:"M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",leftharpoon:"M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",leftharpoonplus:"M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",leftharpoondown:"M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",leftharpoondownplus:"M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",lefthook:"M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",leftlinesegment:"M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",leftmapsto:"M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",leftToFrom:"M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",longequal:"M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",midbrace:"M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",midbraceunder:"M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",oiintSize1:"M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",oiintSize2:"M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",oiiintSize1:"M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",oiiintSize2:"M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",rightarrow:"M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",rightbrace:"M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",rightbraceunder:"M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",rightgroup:"M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",rightgroupunder:"M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",rightharpoon:"M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",rightharpoonplus:"M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",rightharpoondown:"M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",rightharpoondownplus:"M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",righthook:"M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",rightlinesegment:"M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",rightToFrom:"M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",twoheadleftarrow:"M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",twoheadrightarrow:"M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",tilde1:"M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",tilde2:"M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",tilde3:"M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",tilde4:"M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",vec:"M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",widehat1:"M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",widehat2:"M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",widehat3:"M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",widehat4:"M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",widecheck1:"M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",widecheck2:"M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",widecheck3:"M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",widecheck4:"M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",baraboveleftarrow:"M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",rightarrowabovebar:"M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",baraboveshortleftharpoon:"M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",rightharpoonaboveshortbar:"M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",shortbaraboveleftharpoon:"M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",shortrightharpoonabovebar:"M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"};class ts{constructor(e){this.children=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.maxFontSize=void 0,this.style=void 0,this.children=e,this.classes=[],this.height=0,this.depth=0,this.maxFontSize=0,this.style={}}hasClass(e){return qi.contains(this.classes,e)}toNode(){for(var e=document.createDocumentFragment(),t=0;t<this.children.length;t++)e.appendChild(this.children[t].toNode());return e}toMarkup(){for(var e="",t=0;t<this.children.length;t++)e+=this.children[t].toMarkup();return e}toText(){return this.children.map((e=>e.toText())).join("")}}var rs={"AMS-Regular":{32:[0,0,0,0,.25],65:[0,.68889,0,0,.72222],66:[0,.68889,0,0,.66667],67:[0,.68889,0,0,.72222],68:[0,.68889,0,0,.72222],69:[0,.68889,0,0,.66667],70:[0,.68889,0,0,.61111],71:[0,.68889,0,0,.77778],72:[0,.68889,0,0,.77778],73:[0,.68889,0,0,.38889],74:[.16667,.68889,0,0,.5],75:[0,.68889,0,0,.77778],76:[0,.68889,0,0,.66667],77:[0,.68889,0,0,.94445],78:[0,.68889,0,0,.72222],79:[.16667,.68889,0,0,.77778],80:[0,.68889,0,0,.61111],81:[.16667,.68889,0,0,.77778],82:[0,.68889,0,0,.72222],83:[0,.68889,0,0,.55556],84:[0,.68889,0,0,.66667],85:[0,.68889,0,0,.72222],86:[0,.68889,0,0,.72222],87:[0,.68889,0,0,1],88:[0,.68889,0,0,.72222],89:[0,.68889,0,0,.72222],90:[0,.68889,0,0,.66667],107:[0,.68889,0,0,.55556],160:[0,0,0,0,.25],165:[0,.675,.025,0,.75],174:[.15559,.69224,0,0,.94666],240:[0,.68889,0,0,.55556],295:[0,.68889,0,0,.54028],710:[0,.825,0,0,2.33334],732:[0,.9,0,0,2.33334],770:[0,.825,0,0,2.33334],771:[0,.9,0,0,2.33334],989:[.08167,.58167,0,0,.77778],1008:[0,.43056,.04028,0,.66667],8245:[0,.54986,0,0,.275],8463:[0,.68889,0,0,.54028],8487:[0,.68889,0,0,.72222],8498:[0,.68889,0,0,.55556],8502:[0,.68889,0,0,.66667],8503:[0,.68889,0,0,.44445],8504:[0,.68889,0,0,.66667],8513:[0,.68889,0,0,.63889],8592:[-.03598,.46402,0,0,.5],8594:[-.03598,.46402,0,0,.5],8602:[-.13313,.36687,0,0,1],8603:[-.13313,.36687,0,0,1],8606:[.01354,.52239,0,0,1],8608:[.01354,.52239,0,0,1],8610:[.01354,.52239,0,0,1.11111],8611:[.01354,.52239,0,0,1.11111],8619:[0,.54986,0,0,1],8620:[0,.54986,0,0,1],8621:[-.13313,.37788,0,0,1.38889],8622:[-.13313,.36687,0,0,1],8624:[0,.69224,0,0,.5],8625:[0,.69224,0,0,.5],8630:[0,.43056,0,0,1],8631:[0,.43056,0,0,1],8634:[.08198,.58198,0,0,.77778],8635:[.08198,.58198,0,0,.77778],8638:[.19444,.69224,0,0,.41667],8639:[.19444,.69224,0,0,.41667],8642:[.19444,.69224,0,0,.41667],8643:[.19444,.69224,0,0,.41667],8644:[.1808,.675,0,0,1],8646:[.1808,.675,0,0,1],8647:[.1808,.675,0,0,1],8648:[.19444,.69224,0,0,.83334],8649:[.1808,.675,0,0,1],8650:[.19444,.69224,0,0,.83334],8651:[.01354,.52239,0,0,1],8652:[.01354,.52239,0,0,1],8653:[-.13313,.36687,0,0,1],8654:[-.13313,.36687,0,0,1],8655:[-.13313,.36687,0,0,1],8666:[.13667,.63667,0,0,1],8667:[.13667,.63667,0,0,1],8669:[-.13313,.37788,0,0,1],8672:[-.064,.437,0,0,1.334],8674:[-.064,.437,0,0,1.334],8705:[0,.825,0,0,.5],8708:[0,.68889,0,0,.55556],8709:[.08167,.58167,0,0,.77778],8717:[0,.43056,0,0,.42917],8722:[-.03598,.46402,0,0,.5],8724:[.08198,.69224,0,0,.77778],8726:[.08167,.58167,0,0,.77778],8733:[0,.69224,0,0,.77778],8736:[0,.69224,0,0,.72222],8737:[0,.69224,0,0,.72222],8738:[.03517,.52239,0,0,.72222],8739:[.08167,.58167,0,0,.22222],8740:[.25142,.74111,0,0,.27778],8741:[.08167,.58167,0,0,.38889],8742:[.25142,.74111,0,0,.5],8756:[0,.69224,0,0,.66667],8757:[0,.69224,0,0,.66667],8764:[-.13313,.36687,0,0,.77778],8765:[-.13313,.37788,0,0,.77778],8769:[-.13313,.36687,0,0,.77778],8770:[-.03625,.46375,0,0,.77778],8774:[.30274,.79383,0,0,.77778],8776:[-.01688,.48312,0,0,.77778],8778:[.08167,.58167,0,0,.77778],8782:[.06062,.54986,0,0,.77778],8783:[.06062,.54986,0,0,.77778],8785:[.08198,.58198,0,0,.77778],8786:[.08198,.58198,0,0,.77778],8787:[.08198,.58198,0,0,.77778],8790:[0,.69224,0,0,.77778],8791:[.22958,.72958,0,0,.77778],8796:[.08198,.91667,0,0,.77778],8806:[.25583,.75583,0,0,.77778],8807:[.25583,.75583,0,0,.77778],8808:[.25142,.75726,0,0,.77778],8809:[.25142,.75726,0,0,.77778],8812:[.25583,.75583,0,0,.5],8814:[.20576,.70576,0,0,.77778],8815:[.20576,.70576,0,0,.77778],8816:[.30274,.79383,0,0,.77778],8817:[.30274,.79383,0,0,.77778],8818:[.22958,.72958,0,0,.77778],8819:[.22958,.72958,0,0,.77778],8822:[.1808,.675,0,0,.77778],8823:[.1808,.675,0,0,.77778],8828:[.13667,.63667,0,0,.77778],8829:[.13667,.63667,0,0,.77778],8830:[.22958,.72958,0,0,.77778],8831:[.22958,.72958,0,0,.77778],8832:[.20576,.70576,0,0,.77778],8833:[.20576,.70576,0,0,.77778],8840:[.30274,.79383,0,0,.77778],8841:[.30274,.79383,0,0,.77778],8842:[.13597,.63597,0,0,.77778],8843:[.13597,.63597,0,0,.77778],8847:[.03517,.54986,0,0,.77778],8848:[.03517,.54986,0,0,.77778],8858:[.08198,.58198,0,0,.77778],8859:[.08198,.58198,0,0,.77778],8861:[.08198,.58198,0,0,.77778],8862:[0,.675,0,0,.77778],8863:[0,.675,0,0,.77778],8864:[0,.675,0,0,.77778],8865:[0,.675,0,0,.77778],8872:[0,.69224,0,0,.61111],8873:[0,.69224,0,0,.72222],8874:[0,.69224,0,0,.88889],8876:[0,.68889,0,0,.61111],8877:[0,.68889,0,0,.61111],8878:[0,.68889,0,0,.72222],8879:[0,.68889,0,0,.72222],8882:[.03517,.54986,0,0,.77778],8883:[.03517,.54986,0,0,.77778],8884:[.13667,.63667,0,0,.77778],8885:[.13667,.63667,0,0,.77778],8888:[0,.54986,0,0,1.11111],8890:[.19444,.43056,0,0,.55556],8891:[.19444,.69224,0,0,.61111],8892:[.19444,.69224,0,0,.61111],8901:[0,.54986,0,0,.27778],8903:[.08167,.58167,0,0,.77778],8905:[.08167,.58167,0,0,.77778],8906:[.08167,.58167,0,0,.77778],8907:[0,.69224,0,0,.77778],8908:[0,.69224,0,0,.77778],8909:[-.03598,.46402,0,0,.77778],8910:[0,.54986,0,0,.76042],8911:[0,.54986,0,0,.76042],8912:[.03517,.54986,0,0,.77778],8913:[.03517,.54986,0,0,.77778],8914:[0,.54986,0,0,.66667],8915:[0,.54986,0,0,.66667],8916:[0,.69224,0,0,.66667],8918:[.0391,.5391,0,0,.77778],8919:[.0391,.5391,0,0,.77778],8920:[.03517,.54986,0,0,1.33334],8921:[.03517,.54986,0,0,1.33334],8922:[.38569,.88569,0,0,.77778],8923:[.38569,.88569,0,0,.77778],8926:[.13667,.63667,0,0,.77778],8927:[.13667,.63667,0,0,.77778],8928:[.30274,.79383,0,0,.77778],8929:[.30274,.79383,0,0,.77778],8934:[.23222,.74111,0,0,.77778],8935:[.23222,.74111,0,0,.77778],8936:[.23222,.74111,0,0,.77778],8937:[.23222,.74111,0,0,.77778],8938:[.20576,.70576,0,0,.77778],8939:[.20576,.70576,0,0,.77778],8940:[.30274,.79383,0,0,.77778],8941:[.30274,.79383,0,0,.77778],8994:[.19444,.69224,0,0,.77778],8995:[.19444,.69224,0,0,.77778],9416:[.15559,.69224,0,0,.90222],9484:[0,.69224,0,0,.5],9488:[0,.69224,0,0,.5],9492:[0,.37788,0,0,.5],9496:[0,.37788,0,0,.5],9585:[.19444,.68889,0,0,.88889],9586:[.19444,.74111,0,0,.88889],9632:[0,.675,0,0,.77778],9633:[0,.675,0,0,.77778],9650:[0,.54986,0,0,.72222],9651:[0,.54986,0,0,.72222],9654:[.03517,.54986,0,0,.77778],9660:[0,.54986,0,0,.72222],9661:[0,.54986,0,0,.72222],9664:[.03517,.54986,0,0,.77778],9674:[.11111,.69224,0,0,.66667],9733:[.19444,.69224,0,0,.94445],10003:[0,.69224,0,0,.83334],10016:[0,.69224,0,0,.83334],10731:[.11111,.69224,0,0,.66667],10846:[.19444,.75583,0,0,.61111],10877:[.13667,.63667,0,0,.77778],10878:[.13667,.63667,0,0,.77778],10885:[.25583,.75583,0,0,.77778],10886:[.25583,.75583,0,0,.77778],10887:[.13597,.63597,0,0,.77778],10888:[.13597,.63597,0,0,.77778],10889:[.26167,.75726,0,0,.77778],10890:[.26167,.75726,0,0,.77778],10891:[.48256,.98256,0,0,.77778],10892:[.48256,.98256,0,0,.77778],10901:[.13667,.63667,0,0,.77778],10902:[.13667,.63667,0,0,.77778],10933:[.25142,.75726,0,0,.77778],10934:[.25142,.75726,0,0,.77778],10935:[.26167,.75726,0,0,.77778],10936:[.26167,.75726,0,0,.77778],10937:[.26167,.75726,0,0,.77778],10938:[.26167,.75726,0,0,.77778],10949:[.25583,.75583,0,0,.77778],10950:[.25583,.75583,0,0,.77778],10955:[.28481,.79383,0,0,.77778],10956:[.28481,.79383,0,0,.77778],57350:[.08167,.58167,0,0,.22222],57351:[.08167,.58167,0,0,.38889],57352:[.08167,.58167,0,0,.77778],57353:[0,.43056,.04028,0,.66667],57356:[.25142,.75726,0,0,.77778],57357:[.25142,.75726,0,0,.77778],57358:[.41951,.91951,0,0,.77778],57359:[.30274,.79383,0,0,.77778],57360:[.30274,.79383,0,0,.77778],57361:[.41951,.91951,0,0,.77778],57366:[.25142,.75726,0,0,.77778],57367:[.25142,.75726,0,0,.77778],57368:[.25142,.75726,0,0,.77778],57369:[.25142,.75726,0,0,.77778],57370:[.13597,.63597,0,0,.77778],57371:[.13597,.63597,0,0,.77778]},"Caligraphic-Regular":{32:[0,0,0,0,.25],65:[0,.68333,0,.19445,.79847],66:[0,.68333,.03041,.13889,.65681],67:[0,.68333,.05834,.13889,.52653],68:[0,.68333,.02778,.08334,.77139],69:[0,.68333,.08944,.11111,.52778],70:[0,.68333,.09931,.11111,.71875],71:[.09722,.68333,.0593,.11111,.59487],72:[0,.68333,.00965,.11111,.84452],73:[0,.68333,.07382,0,.54452],74:[.09722,.68333,.18472,.16667,.67778],75:[0,.68333,.01445,.05556,.76195],76:[0,.68333,0,.13889,.68972],77:[0,.68333,0,.13889,1.2009],78:[0,.68333,.14736,.08334,.82049],79:[0,.68333,.02778,.11111,.79611],80:[0,.68333,.08222,.08334,.69556],81:[.09722,.68333,0,.11111,.81667],82:[0,.68333,0,.08334,.8475],83:[0,.68333,.075,.13889,.60556],84:[0,.68333,.25417,0,.54464],85:[0,.68333,.09931,.08334,.62583],86:[0,.68333,.08222,0,.61278],87:[0,.68333,.08222,.08334,.98778],88:[0,.68333,.14643,.13889,.7133],89:[.09722,.68333,.08222,.08334,.66834],90:[0,.68333,.07944,.13889,.72473],160:[0,0,0,0,.25]},"Fraktur-Regular":{32:[0,0,0,0,.25],33:[0,.69141,0,0,.29574],34:[0,.69141,0,0,.21471],38:[0,.69141,0,0,.73786],39:[0,.69141,0,0,.21201],40:[.24982,.74947,0,0,.38865],41:[.24982,.74947,0,0,.38865],42:[0,.62119,0,0,.27764],43:[.08319,.58283,0,0,.75623],44:[0,.10803,0,0,.27764],45:[.08319,.58283,0,0,.75623],46:[0,.10803,0,0,.27764],47:[.24982,.74947,0,0,.50181],48:[0,.47534,0,0,.50181],49:[0,.47534,0,0,.50181],50:[0,.47534,0,0,.50181],51:[.18906,.47534,0,0,.50181],52:[.18906,.47534,0,0,.50181],53:[.18906,.47534,0,0,.50181],54:[0,.69141,0,0,.50181],55:[.18906,.47534,0,0,.50181],56:[0,.69141,0,0,.50181],57:[.18906,.47534,0,0,.50181],58:[0,.47534,0,0,.21606],59:[.12604,.47534,0,0,.21606],61:[-.13099,.36866,0,0,.75623],63:[0,.69141,0,0,.36245],65:[0,.69141,0,0,.7176],66:[0,.69141,0,0,.88397],67:[0,.69141,0,0,.61254],68:[0,.69141,0,0,.83158],69:[0,.69141,0,0,.66278],70:[.12604,.69141,0,0,.61119],71:[0,.69141,0,0,.78539],72:[.06302,.69141,0,0,.7203],73:[0,.69141,0,0,.55448],74:[.12604,.69141,0,0,.55231],75:[0,.69141,0,0,.66845],76:[0,.69141,0,0,.66602],77:[0,.69141,0,0,1.04953],78:[0,.69141,0,0,.83212],79:[0,.69141,0,0,.82699],80:[.18906,.69141,0,0,.82753],81:[.03781,.69141,0,0,.82699],82:[0,.69141,0,0,.82807],83:[0,.69141,0,0,.82861],84:[0,.69141,0,0,.66899],85:[0,.69141,0,0,.64576],86:[0,.69141,0,0,.83131],87:[0,.69141,0,0,1.04602],88:[0,.69141,0,0,.71922],89:[.18906,.69141,0,0,.83293],90:[.12604,.69141,0,0,.60201],91:[.24982,.74947,0,0,.27764],93:[.24982,.74947,0,0,.27764],94:[0,.69141,0,0,.49965],97:[0,.47534,0,0,.50046],98:[0,.69141,0,0,.51315],99:[0,.47534,0,0,.38946],100:[0,.62119,0,0,.49857],101:[0,.47534,0,0,.40053],102:[.18906,.69141,0,0,.32626],103:[.18906,.47534,0,0,.5037],104:[.18906,.69141,0,0,.52126],105:[0,.69141,0,0,.27899],106:[0,.69141,0,0,.28088],107:[0,.69141,0,0,.38946],108:[0,.69141,0,0,.27953],109:[0,.47534,0,0,.76676],110:[0,.47534,0,0,.52666],111:[0,.47534,0,0,.48885],112:[.18906,.52396,0,0,.50046],113:[.18906,.47534,0,0,.48912],114:[0,.47534,0,0,.38919],115:[0,.47534,0,0,.44266],116:[0,.62119,0,0,.33301],117:[0,.47534,0,0,.5172],118:[0,.52396,0,0,.5118],119:[0,.52396,0,0,.77351],120:[.18906,.47534,0,0,.38865],121:[.18906,.47534,0,0,.49884],122:[.18906,.47534,0,0,.39054],160:[0,0,0,0,.25],8216:[0,.69141,0,0,.21471],8217:[0,.69141,0,0,.21471],58112:[0,.62119,0,0,.49749],58113:[0,.62119,0,0,.4983],58114:[.18906,.69141,0,0,.33328],58115:[.18906,.69141,0,0,.32923],58116:[.18906,.47534,0,0,.50343],58117:[0,.69141,0,0,.33301],58118:[0,.62119,0,0,.33409],58119:[0,.47534,0,0,.50073]},"Main-Bold":{32:[0,0,0,0,.25],33:[0,.69444,0,0,.35],34:[0,.69444,0,0,.60278],35:[.19444,.69444,0,0,.95833],36:[.05556,.75,0,0,.575],37:[.05556,.75,0,0,.95833],38:[0,.69444,0,0,.89444],39:[0,.69444,0,0,.31944],40:[.25,.75,0,0,.44722],41:[.25,.75,0,0,.44722],42:[0,.75,0,0,.575],43:[.13333,.63333,0,0,.89444],44:[.19444,.15556,0,0,.31944],45:[0,.44444,0,0,.38333],46:[0,.15556,0,0,.31944],47:[.25,.75,0,0,.575],48:[0,.64444,0,0,.575],49:[0,.64444,0,0,.575],50:[0,.64444,0,0,.575],51:[0,.64444,0,0,.575],52:[0,.64444,0,0,.575],53:[0,.64444,0,0,.575],54:[0,.64444,0,0,.575],55:[0,.64444,0,0,.575],56:[0,.64444,0,0,.575],57:[0,.64444,0,0,.575],58:[0,.44444,0,0,.31944],59:[.19444,.44444,0,0,.31944],60:[.08556,.58556,0,0,.89444],61:[-.10889,.39111,0,0,.89444],62:[.08556,.58556,0,0,.89444],63:[0,.69444,0,0,.54305],64:[0,.69444,0,0,.89444],65:[0,.68611,0,0,.86944],66:[0,.68611,0,0,.81805],67:[0,.68611,0,0,.83055],68:[0,.68611,0,0,.88194],69:[0,.68611,0,0,.75555],70:[0,.68611,0,0,.72361],71:[0,.68611,0,0,.90416],72:[0,.68611,0,0,.9],73:[0,.68611,0,0,.43611],74:[0,.68611,0,0,.59444],75:[0,.68611,0,0,.90138],76:[0,.68611,0,0,.69166],77:[0,.68611,0,0,1.09166],78:[0,.68611,0,0,.9],79:[0,.68611,0,0,.86388],80:[0,.68611,0,0,.78611],81:[.19444,.68611,0,0,.86388],82:[0,.68611,0,0,.8625],83:[0,.68611,0,0,.63889],84:[0,.68611,0,0,.8],85:[0,.68611,0,0,.88472],86:[0,.68611,.01597,0,.86944],87:[0,.68611,.01597,0,1.18888],88:[0,.68611,0,0,.86944],89:[0,.68611,.02875,0,.86944],90:[0,.68611,0,0,.70277],91:[.25,.75,0,0,.31944],92:[.25,.75,0,0,.575],93:[.25,.75,0,0,.31944],94:[0,.69444,0,0,.575],95:[.31,.13444,.03194,0,.575],97:[0,.44444,0,0,.55902],98:[0,.69444,0,0,.63889],99:[0,.44444,0,0,.51111],100:[0,.69444,0,0,.63889],101:[0,.44444,0,0,.52708],102:[0,.69444,.10903,0,.35139],103:[.19444,.44444,.01597,0,.575],104:[0,.69444,0,0,.63889],105:[0,.69444,0,0,.31944],106:[.19444,.69444,0,0,.35139],107:[0,.69444,0,0,.60694],108:[0,.69444,0,0,.31944],109:[0,.44444,0,0,.95833],110:[0,.44444,0,0,.63889],111:[0,.44444,0,0,.575],112:[.19444,.44444,0,0,.63889],113:[.19444,.44444,0,0,.60694],114:[0,.44444,0,0,.47361],115:[0,.44444,0,0,.45361],116:[0,.63492,0,0,.44722],117:[0,.44444,0,0,.63889],118:[0,.44444,.01597,0,.60694],119:[0,.44444,.01597,0,.83055],120:[0,.44444,0,0,.60694],121:[.19444,.44444,.01597,0,.60694],122:[0,.44444,0,0,.51111],123:[.25,.75,0,0,.575],124:[.25,.75,0,0,.31944],125:[.25,.75,0,0,.575],126:[.35,.34444,0,0,.575],160:[0,0,0,0,.25],163:[0,.69444,0,0,.86853],168:[0,.69444,0,0,.575],172:[0,.44444,0,0,.76666],176:[0,.69444,0,0,.86944],177:[.13333,.63333,0,0,.89444],184:[.17014,0,0,0,.51111],198:[0,.68611,0,0,1.04166],215:[.13333,.63333,0,0,.89444],216:[.04861,.73472,0,0,.89444],223:[0,.69444,0,0,.59722],230:[0,.44444,0,0,.83055],247:[.13333,.63333,0,0,.89444],248:[.09722,.54167,0,0,.575],305:[0,.44444,0,0,.31944],338:[0,.68611,0,0,1.16944],339:[0,.44444,0,0,.89444],567:[.19444,.44444,0,0,.35139],710:[0,.69444,0,0,.575],711:[0,.63194,0,0,.575],713:[0,.59611,0,0,.575],714:[0,.69444,0,0,.575],715:[0,.69444,0,0,.575],728:[0,.69444,0,0,.575],729:[0,.69444,0,0,.31944],730:[0,.69444,0,0,.86944],732:[0,.69444,0,0,.575],733:[0,.69444,0,0,.575],915:[0,.68611,0,0,.69166],916:[0,.68611,0,0,.95833],920:[0,.68611,0,0,.89444],923:[0,.68611,0,0,.80555],926:[0,.68611,0,0,.76666],928:[0,.68611,0,0,.9],931:[0,.68611,0,0,.83055],933:[0,.68611,0,0,.89444],934:[0,.68611,0,0,.83055],936:[0,.68611,0,0,.89444],937:[0,.68611,0,0,.83055],8211:[0,.44444,.03194,0,.575],8212:[0,.44444,.03194,0,1.14999],8216:[0,.69444,0,0,.31944],8217:[0,.69444,0,0,.31944],8220:[0,.69444,0,0,.60278],8221:[0,.69444,0,0,.60278],8224:[.19444,.69444,0,0,.51111],8225:[.19444,.69444,0,0,.51111],8242:[0,.55556,0,0,.34444],8407:[0,.72444,.15486,0,.575],8463:[0,.69444,0,0,.66759],8465:[0,.69444,0,0,.83055],8467:[0,.69444,0,0,.47361],8472:[.19444,.44444,0,0,.74027],8476:[0,.69444,0,0,.83055],8501:[0,.69444,0,0,.70277],8592:[-.10889,.39111,0,0,1.14999],8593:[.19444,.69444,0,0,.575],8594:[-.10889,.39111,0,0,1.14999],8595:[.19444,.69444,0,0,.575],8596:[-.10889,.39111,0,0,1.14999],8597:[.25,.75,0,0,.575],8598:[.19444,.69444,0,0,1.14999],8599:[.19444,.69444,0,0,1.14999],8600:[.19444,.69444,0,0,1.14999],8601:[.19444,.69444,0,0,1.14999],8636:[-.10889,.39111,0,0,1.14999],8637:[-.10889,.39111,0,0,1.14999],8640:[-.10889,.39111,0,0,1.14999],8641:[-.10889,.39111,0,0,1.14999],8656:[-.10889,.39111,0,0,1.14999],8657:[.19444,.69444,0,0,.70277],8658:[-.10889,.39111,0,0,1.14999],8659:[.19444,.69444,0,0,.70277],8660:[-.10889,.39111,0,0,1.14999],8661:[.25,.75,0,0,.70277],8704:[0,.69444,0,0,.63889],8706:[0,.69444,.06389,0,.62847],8707:[0,.69444,0,0,.63889],8709:[.05556,.75,0,0,.575],8711:[0,.68611,0,0,.95833],8712:[.08556,.58556,0,0,.76666],8715:[.08556,.58556,0,0,.76666],8722:[.13333,.63333,0,0,.89444],8723:[.13333,.63333,0,0,.89444],8725:[.25,.75,0,0,.575],8726:[.25,.75,0,0,.575],8727:[-.02778,.47222,0,0,.575],8728:[-.02639,.47361,0,0,.575],8729:[-.02639,.47361,0,0,.575],8730:[.18,.82,0,0,.95833],8733:[0,.44444,0,0,.89444],8734:[0,.44444,0,0,1.14999],8736:[0,.69224,0,0,.72222],8739:[.25,.75,0,0,.31944],8741:[.25,.75,0,0,.575],8743:[0,.55556,0,0,.76666],8744:[0,.55556,0,0,.76666],8745:[0,.55556,0,0,.76666],8746:[0,.55556,0,0,.76666],8747:[.19444,.69444,.12778,0,.56875],8764:[-.10889,.39111,0,0,.89444],8768:[.19444,.69444,0,0,.31944],8771:[.00222,.50222,0,0,.89444],8773:[.027,.638,0,0,.894],8776:[.02444,.52444,0,0,.89444],8781:[.00222,.50222,0,0,.89444],8801:[.00222,.50222,0,0,.89444],8804:[.19667,.69667,0,0,.89444],8805:[.19667,.69667,0,0,.89444],8810:[.08556,.58556,0,0,1.14999],8811:[.08556,.58556,0,0,1.14999],8826:[.08556,.58556,0,0,.89444],8827:[.08556,.58556,0,0,.89444],8834:[.08556,.58556,0,0,.89444],8835:[.08556,.58556,0,0,.89444],8838:[.19667,.69667,0,0,.89444],8839:[.19667,.69667,0,0,.89444],8846:[0,.55556,0,0,.76666],8849:[.19667,.69667,0,0,.89444],8850:[.19667,.69667,0,0,.89444],8851:[0,.55556,0,0,.76666],8852:[0,.55556,0,0,.76666],8853:[.13333,.63333,0,0,.89444],8854:[.13333,.63333,0,0,.89444],8855:[.13333,.63333,0,0,.89444],8856:[.13333,.63333,0,0,.89444],8857:[.13333,.63333,0,0,.89444],8866:[0,.69444,0,0,.70277],8867:[0,.69444,0,0,.70277],8868:[0,.69444,0,0,.89444],8869:[0,.69444,0,0,.89444],8900:[-.02639,.47361,0,0,.575],8901:[-.02639,.47361,0,0,.31944],8902:[-.02778,.47222,0,0,.575],8968:[.25,.75,0,0,.51111],8969:[.25,.75,0,0,.51111],8970:[.25,.75,0,0,.51111],8971:[.25,.75,0,0,.51111],8994:[-.13889,.36111,0,0,1.14999],8995:[-.13889,.36111,0,0,1.14999],9651:[.19444,.69444,0,0,1.02222],9657:[-.02778,.47222,0,0,.575],9661:[.19444,.69444,0,0,1.02222],9667:[-.02778,.47222,0,0,.575],9711:[.19444,.69444,0,0,1.14999],9824:[.12963,.69444,0,0,.89444],9825:[.12963,.69444,0,0,.89444],9826:[.12963,.69444,0,0,.89444],9827:[.12963,.69444,0,0,.89444],9837:[0,.75,0,0,.44722],9838:[.19444,.69444,0,0,.44722],9839:[.19444,.69444,0,0,.44722],10216:[.25,.75,0,0,.44722],10217:[.25,.75,0,0,.44722],10815:[0,.68611,0,0,.9],10927:[.19667,.69667,0,0,.89444],10928:[.19667,.69667,0,0,.89444],57376:[.19444,.69444,0,0,0]},"Main-BoldItalic":{32:[0,0,0,0,.25],33:[0,.69444,.11417,0,.38611],34:[0,.69444,.07939,0,.62055],35:[.19444,.69444,.06833,0,.94444],37:[.05556,.75,.12861,0,.94444],38:[0,.69444,.08528,0,.88555],39:[0,.69444,.12945,0,.35555],40:[.25,.75,.15806,0,.47333],41:[.25,.75,.03306,0,.47333],42:[0,.75,.14333,0,.59111],43:[.10333,.60333,.03306,0,.88555],44:[.19444,.14722,0,0,.35555],45:[0,.44444,.02611,0,.41444],46:[0,.14722,0,0,.35555],47:[.25,.75,.15806,0,.59111],48:[0,.64444,.13167,0,.59111],49:[0,.64444,.13167,0,.59111],50:[0,.64444,.13167,0,.59111],51:[0,.64444,.13167,0,.59111],52:[.19444,.64444,.13167,0,.59111],53:[0,.64444,.13167,0,.59111],54:[0,.64444,.13167,0,.59111],55:[.19444,.64444,.13167,0,.59111],56:[0,.64444,.13167,0,.59111],57:[0,.64444,.13167,0,.59111],58:[0,.44444,.06695,0,.35555],59:[.19444,.44444,.06695,0,.35555],61:[-.10889,.39111,.06833,0,.88555],63:[0,.69444,.11472,0,.59111],64:[0,.69444,.09208,0,.88555],65:[0,.68611,0,0,.86555],66:[0,.68611,.0992,0,.81666],67:[0,.68611,.14208,0,.82666],68:[0,.68611,.09062,0,.87555],69:[0,.68611,.11431,0,.75666],70:[0,.68611,.12903,0,.72722],71:[0,.68611,.07347,0,.89527],72:[0,.68611,.17208,0,.8961],73:[0,.68611,.15681,0,.47166],74:[0,.68611,.145,0,.61055],75:[0,.68611,.14208,0,.89499],76:[0,.68611,0,0,.69777],77:[0,.68611,.17208,0,1.07277],78:[0,.68611,.17208,0,.8961],79:[0,.68611,.09062,0,.85499],80:[0,.68611,.0992,0,.78721],81:[.19444,.68611,.09062,0,.85499],82:[0,.68611,.02559,0,.85944],83:[0,.68611,.11264,0,.64999],84:[0,.68611,.12903,0,.7961],85:[0,.68611,.17208,0,.88083],86:[0,.68611,.18625,0,.86555],87:[0,.68611,.18625,0,1.15999],88:[0,.68611,.15681,0,.86555],89:[0,.68611,.19803,0,.86555],90:[0,.68611,.14208,0,.70888],91:[.25,.75,.1875,0,.35611],93:[.25,.75,.09972,0,.35611],94:[0,.69444,.06709,0,.59111],95:[.31,.13444,.09811,0,.59111],97:[0,.44444,.09426,0,.59111],98:[0,.69444,.07861,0,.53222],99:[0,.44444,.05222,0,.53222],100:[0,.69444,.10861,0,.59111],101:[0,.44444,.085,0,.53222],102:[.19444,.69444,.21778,0,.4],103:[.19444,.44444,.105,0,.53222],104:[0,.69444,.09426,0,.59111],105:[0,.69326,.11387,0,.35555],106:[.19444,.69326,.1672,0,.35555],107:[0,.69444,.11111,0,.53222],108:[0,.69444,.10861,0,.29666],109:[0,.44444,.09426,0,.94444],110:[0,.44444,.09426,0,.64999],111:[0,.44444,.07861,0,.59111],112:[.19444,.44444,.07861,0,.59111],113:[.19444,.44444,.105,0,.53222],114:[0,.44444,.11111,0,.50167],115:[0,.44444,.08167,0,.48694],116:[0,.63492,.09639,0,.385],117:[0,.44444,.09426,0,.62055],118:[0,.44444,.11111,0,.53222],119:[0,.44444,.11111,0,.76777],120:[0,.44444,.12583,0,.56055],121:[.19444,.44444,.105,0,.56166],122:[0,.44444,.13889,0,.49055],126:[.35,.34444,.11472,0,.59111],160:[0,0,0,0,.25],168:[0,.69444,.11473,0,.59111],176:[0,.69444,0,0,.94888],184:[.17014,0,0,0,.53222],198:[0,.68611,.11431,0,1.02277],216:[.04861,.73472,.09062,0,.88555],223:[.19444,.69444,.09736,0,.665],230:[0,.44444,.085,0,.82666],248:[.09722,.54167,.09458,0,.59111],305:[0,.44444,.09426,0,.35555],338:[0,.68611,.11431,0,1.14054],339:[0,.44444,.085,0,.82666],567:[.19444,.44444,.04611,0,.385],710:[0,.69444,.06709,0,.59111],711:[0,.63194,.08271,0,.59111],713:[0,.59444,.10444,0,.59111],714:[0,.69444,.08528,0,.59111],715:[0,.69444,0,0,.59111],728:[0,.69444,.10333,0,.59111],729:[0,.69444,.12945,0,.35555],730:[0,.69444,0,0,.94888],732:[0,.69444,.11472,0,.59111],733:[0,.69444,.11472,0,.59111],915:[0,.68611,.12903,0,.69777],916:[0,.68611,0,0,.94444],920:[0,.68611,.09062,0,.88555],923:[0,.68611,0,0,.80666],926:[0,.68611,.15092,0,.76777],928:[0,.68611,.17208,0,.8961],931:[0,.68611,.11431,0,.82666],933:[0,.68611,.10778,0,.88555],934:[0,.68611,.05632,0,.82666],936:[0,.68611,.10778,0,.88555],937:[0,.68611,.0992,0,.82666],8211:[0,.44444,.09811,0,.59111],8212:[0,.44444,.09811,0,1.18221],8216:[0,.69444,.12945,0,.35555],8217:[0,.69444,.12945,0,.35555],8220:[0,.69444,.16772,0,.62055],8221:[0,.69444,.07939,0,.62055]},"Main-Italic":{32:[0,0,0,0,.25],33:[0,.69444,.12417,0,.30667],34:[0,.69444,.06961,0,.51444],35:[.19444,.69444,.06616,0,.81777],37:[.05556,.75,.13639,0,.81777],38:[0,.69444,.09694,0,.76666],39:[0,.69444,.12417,0,.30667],40:[.25,.75,.16194,0,.40889],41:[.25,.75,.03694,0,.40889],42:[0,.75,.14917,0,.51111],43:[.05667,.56167,.03694,0,.76666],44:[.19444,.10556,0,0,.30667],45:[0,.43056,.02826,0,.35778],46:[0,.10556,0,0,.30667],47:[.25,.75,.16194,0,.51111],48:[0,.64444,.13556,0,.51111],49:[0,.64444,.13556,0,.51111],50:[0,.64444,.13556,0,.51111],51:[0,.64444,.13556,0,.51111],52:[.19444,.64444,.13556,0,.51111],53:[0,.64444,.13556,0,.51111],54:[0,.64444,.13556,0,.51111],55:[.19444,.64444,.13556,0,.51111],56:[0,.64444,.13556,0,.51111],57:[0,.64444,.13556,0,.51111],58:[0,.43056,.0582,0,.30667],59:[.19444,.43056,.0582,0,.30667],61:[-.13313,.36687,.06616,0,.76666],63:[0,.69444,.1225,0,.51111],64:[0,.69444,.09597,0,.76666],65:[0,.68333,0,0,.74333],66:[0,.68333,.10257,0,.70389],67:[0,.68333,.14528,0,.71555],68:[0,.68333,.09403,0,.755],69:[0,.68333,.12028,0,.67833],70:[0,.68333,.13305,0,.65277],71:[0,.68333,.08722,0,.77361],72:[0,.68333,.16389,0,.74333],73:[0,.68333,.15806,0,.38555],74:[0,.68333,.14028,0,.525],75:[0,.68333,.14528,0,.76888],76:[0,.68333,0,0,.62722],77:[0,.68333,.16389,0,.89666],78:[0,.68333,.16389,0,.74333],79:[0,.68333,.09403,0,.76666],80:[0,.68333,.10257,0,.67833],81:[.19444,.68333,.09403,0,.76666],82:[0,.68333,.03868,0,.72944],83:[0,.68333,.11972,0,.56222],84:[0,.68333,.13305,0,.71555],85:[0,.68333,.16389,0,.74333],86:[0,.68333,.18361,0,.74333],87:[0,.68333,.18361,0,.99888],88:[0,.68333,.15806,0,.74333],89:[0,.68333,.19383,0,.74333],90:[0,.68333,.14528,0,.61333],91:[.25,.75,.1875,0,.30667],93:[.25,.75,.10528,0,.30667],94:[0,.69444,.06646,0,.51111],95:[.31,.12056,.09208,0,.51111],97:[0,.43056,.07671,0,.51111],98:[0,.69444,.06312,0,.46],99:[0,.43056,.05653,0,.46],100:[0,.69444,.10333,0,.51111],101:[0,.43056,.07514,0,.46],102:[.19444,.69444,.21194,0,.30667],103:[.19444,.43056,.08847,0,.46],104:[0,.69444,.07671,0,.51111],105:[0,.65536,.1019,0,.30667],106:[.19444,.65536,.14467,0,.30667],107:[0,.69444,.10764,0,.46],108:[0,.69444,.10333,0,.25555],109:[0,.43056,.07671,0,.81777],110:[0,.43056,.07671,0,.56222],111:[0,.43056,.06312,0,.51111],112:[.19444,.43056,.06312,0,.51111],113:[.19444,.43056,.08847,0,.46],114:[0,.43056,.10764,0,.42166],115:[0,.43056,.08208,0,.40889],116:[0,.61508,.09486,0,.33222],117:[0,.43056,.07671,0,.53666],118:[0,.43056,.10764,0,.46],119:[0,.43056,.10764,0,.66444],120:[0,.43056,.12042,0,.46389],121:[.19444,.43056,.08847,0,.48555],122:[0,.43056,.12292,0,.40889],126:[.35,.31786,.11585,0,.51111],160:[0,0,0,0,.25],168:[0,.66786,.10474,0,.51111],176:[0,.69444,0,0,.83129],184:[.17014,0,0,0,.46],198:[0,.68333,.12028,0,.88277],216:[.04861,.73194,.09403,0,.76666],223:[.19444,.69444,.10514,0,.53666],230:[0,.43056,.07514,0,.71555],248:[.09722,.52778,.09194,0,.51111],338:[0,.68333,.12028,0,.98499],339:[0,.43056,.07514,0,.71555],710:[0,.69444,.06646,0,.51111],711:[0,.62847,.08295,0,.51111],713:[0,.56167,.10333,0,.51111],714:[0,.69444,.09694,0,.51111],715:[0,.69444,0,0,.51111],728:[0,.69444,.10806,0,.51111],729:[0,.66786,.11752,0,.30667],730:[0,.69444,0,0,.83129],732:[0,.66786,.11585,0,.51111],733:[0,.69444,.1225,0,.51111],915:[0,.68333,.13305,0,.62722],916:[0,.68333,0,0,.81777],920:[0,.68333,.09403,0,.76666],923:[0,.68333,0,0,.69222],926:[0,.68333,.15294,0,.66444],928:[0,.68333,.16389,0,.74333],931:[0,.68333,.12028,0,.71555],933:[0,.68333,.11111,0,.76666],934:[0,.68333,.05986,0,.71555],936:[0,.68333,.11111,0,.76666],937:[0,.68333,.10257,0,.71555],8211:[0,.43056,.09208,0,.51111],8212:[0,.43056,.09208,0,1.02222],8216:[0,.69444,.12417,0,.30667],8217:[0,.69444,.12417,0,.30667],8220:[0,.69444,.1685,0,.51444],8221:[0,.69444,.06961,0,.51444],8463:[0,.68889,0,0,.54028]},"Main-Regular":{32:[0,0,0,0,.25],33:[0,.69444,0,0,.27778],34:[0,.69444,0,0,.5],35:[.19444,.69444,0,0,.83334],36:[.05556,.75,0,0,.5],37:[.05556,.75,0,0,.83334],38:[0,.69444,0,0,.77778],39:[0,.69444,0,0,.27778],40:[.25,.75,0,0,.38889],41:[.25,.75,0,0,.38889],42:[0,.75,0,0,.5],43:[.08333,.58333,0,0,.77778],44:[.19444,.10556,0,0,.27778],45:[0,.43056,0,0,.33333],46:[0,.10556,0,0,.27778],47:[.25,.75,0,0,.5],48:[0,.64444,0,0,.5],49:[0,.64444,0,0,.5],50:[0,.64444,0,0,.5],51:[0,.64444,0,0,.5],52:[0,.64444,0,0,.5],53:[0,.64444,0,0,.5],54:[0,.64444,0,0,.5],55:[0,.64444,0,0,.5],56:[0,.64444,0,0,.5],57:[0,.64444,0,0,.5],58:[0,.43056,0,0,.27778],59:[.19444,.43056,0,0,.27778],60:[.0391,.5391,0,0,.77778],61:[-.13313,.36687,0,0,.77778],62:[.0391,.5391,0,0,.77778],63:[0,.69444,0,0,.47222],64:[0,.69444,0,0,.77778],65:[0,.68333,0,0,.75],66:[0,.68333,0,0,.70834],67:[0,.68333,0,0,.72222],68:[0,.68333,0,0,.76389],69:[0,.68333,0,0,.68056],70:[0,.68333,0,0,.65278],71:[0,.68333,0,0,.78472],72:[0,.68333,0,0,.75],73:[0,.68333,0,0,.36111],74:[0,.68333,0,0,.51389],75:[0,.68333,0,0,.77778],76:[0,.68333,0,0,.625],77:[0,.68333,0,0,.91667],78:[0,.68333,0,0,.75],79:[0,.68333,0,0,.77778],80:[0,.68333,0,0,.68056],81:[.19444,.68333,0,0,.77778],82:[0,.68333,0,0,.73611],83:[0,.68333,0,0,.55556],84:[0,.68333,0,0,.72222],85:[0,.68333,0,0,.75],86:[0,.68333,.01389,0,.75],87:[0,.68333,.01389,0,1.02778],88:[0,.68333,0,0,.75],89:[0,.68333,.025,0,.75],90:[0,.68333,0,0,.61111],91:[.25,.75,0,0,.27778],92:[.25,.75,0,0,.5],93:[.25,.75,0,0,.27778],94:[0,.69444,0,0,.5],95:[.31,.12056,.02778,0,.5],97:[0,.43056,0,0,.5],98:[0,.69444,0,0,.55556],99:[0,.43056,0,0,.44445],100:[0,.69444,0,0,.55556],101:[0,.43056,0,0,.44445],102:[0,.69444,.07778,0,.30556],103:[.19444,.43056,.01389,0,.5],104:[0,.69444,0,0,.55556],105:[0,.66786,0,0,.27778],106:[.19444,.66786,0,0,.30556],107:[0,.69444,0,0,.52778],108:[0,.69444,0,0,.27778],109:[0,.43056,0,0,.83334],110:[0,.43056,0,0,.55556],111:[0,.43056,0,0,.5],112:[.19444,.43056,0,0,.55556],113:[.19444,.43056,0,0,.52778],114:[0,.43056,0,0,.39167],115:[0,.43056,0,0,.39445],116:[0,.61508,0,0,.38889],117:[0,.43056,0,0,.55556],118:[0,.43056,.01389,0,.52778],119:[0,.43056,.01389,0,.72222],120:[0,.43056,0,0,.52778],121:[.19444,.43056,.01389,0,.52778],122:[0,.43056,0,0,.44445],123:[.25,.75,0,0,.5],124:[.25,.75,0,0,.27778],125:[.25,.75,0,0,.5],126:[.35,.31786,0,0,.5],160:[0,0,0,0,.25],163:[0,.69444,0,0,.76909],167:[.19444,.69444,0,0,.44445],168:[0,.66786,0,0,.5],172:[0,.43056,0,0,.66667],176:[0,.69444,0,0,.75],177:[.08333,.58333,0,0,.77778],182:[.19444,.69444,0,0,.61111],184:[.17014,0,0,0,.44445],198:[0,.68333,0,0,.90278],215:[.08333,.58333,0,0,.77778],216:[.04861,.73194,0,0,.77778],223:[0,.69444,0,0,.5],230:[0,.43056,0,0,.72222],247:[.08333,.58333,0,0,.77778],248:[.09722,.52778,0,0,.5],305:[0,.43056,0,0,.27778],338:[0,.68333,0,0,1.01389],339:[0,.43056,0,0,.77778],567:[.19444,.43056,0,0,.30556],710:[0,.69444,0,0,.5],711:[0,.62847,0,0,.5],713:[0,.56778,0,0,.5],714:[0,.69444,0,0,.5],715:[0,.69444,0,0,.5],728:[0,.69444,0,0,.5],729:[0,.66786,0,0,.27778],730:[0,.69444,0,0,.75],732:[0,.66786,0,0,.5],733:[0,.69444,0,0,.5],915:[0,.68333,0,0,.625],916:[0,.68333,0,0,.83334],920:[0,.68333,0,0,.77778],923:[0,.68333,0,0,.69445],926:[0,.68333,0,0,.66667],928:[0,.68333,0,0,.75],931:[0,.68333,0,0,.72222],933:[0,.68333,0,0,.77778],934:[0,.68333,0,0,.72222],936:[0,.68333,0,0,.77778],937:[0,.68333,0,0,.72222],8211:[0,.43056,.02778,0,.5],8212:[0,.43056,.02778,0,1],8216:[0,.69444,0,0,.27778],8217:[0,.69444,0,0,.27778],8220:[0,.69444,0,0,.5],8221:[0,.69444,0,0,.5],8224:[.19444,.69444,0,0,.44445],8225:[.19444,.69444,0,0,.44445],8230:[0,.123,0,0,1.172],8242:[0,.55556,0,0,.275],8407:[0,.71444,.15382,0,.5],8463:[0,.68889,0,0,.54028],8465:[0,.69444,0,0,.72222],8467:[0,.69444,0,.11111,.41667],8472:[.19444,.43056,0,.11111,.63646],8476:[0,.69444,0,0,.72222],8501:[0,.69444,0,0,.61111],8592:[-.13313,.36687,0,0,1],8593:[.19444,.69444,0,0,.5],8594:[-.13313,.36687,0,0,1],8595:[.19444,.69444,0,0,.5],8596:[-.13313,.36687,0,0,1],8597:[.25,.75,0,0,.5],8598:[.19444,.69444,0,0,1],8599:[.19444,.69444,0,0,1],8600:[.19444,.69444,0,0,1],8601:[.19444,.69444,0,0,1],8614:[.011,.511,0,0,1],8617:[.011,.511,0,0,1.126],8618:[.011,.511,0,0,1.126],8636:[-.13313,.36687,0,0,1],8637:[-.13313,.36687,0,0,1],8640:[-.13313,.36687,0,0,1],8641:[-.13313,.36687,0,0,1],8652:[.011,.671,0,0,1],8656:[-.13313,.36687,0,0,1],8657:[.19444,.69444,0,0,.61111],8658:[-.13313,.36687,0,0,1],8659:[.19444,.69444,0,0,.61111],8660:[-.13313,.36687,0,0,1],8661:[.25,.75,0,0,.61111],8704:[0,.69444,0,0,.55556],8706:[0,.69444,.05556,.08334,.5309],8707:[0,.69444,0,0,.55556],8709:[.05556,.75,0,0,.5],8711:[0,.68333,0,0,.83334],8712:[.0391,.5391,0,0,.66667],8715:[.0391,.5391,0,0,.66667],8722:[.08333,.58333,0,0,.77778],8723:[.08333,.58333,0,0,.77778],8725:[.25,.75,0,0,.5],8726:[.25,.75,0,0,.5],8727:[-.03472,.46528,0,0,.5],8728:[-.05555,.44445,0,0,.5],8729:[-.05555,.44445,0,0,.5],8730:[.2,.8,0,0,.83334],8733:[0,.43056,0,0,.77778],8734:[0,.43056,0,0,1],8736:[0,.69224,0,0,.72222],8739:[.25,.75,0,0,.27778],8741:[.25,.75,0,0,.5],8743:[0,.55556,0,0,.66667],8744:[0,.55556,0,0,.66667],8745:[0,.55556,0,0,.66667],8746:[0,.55556,0,0,.66667],8747:[.19444,.69444,.11111,0,.41667],8764:[-.13313,.36687,0,0,.77778],8768:[.19444,.69444,0,0,.27778],8771:[-.03625,.46375,0,0,.77778],8773:[-.022,.589,0,0,.778],8776:[-.01688,.48312,0,0,.77778],8781:[-.03625,.46375,0,0,.77778],8784:[-.133,.673,0,0,.778],8801:[-.03625,.46375,0,0,.77778],8804:[.13597,.63597,0,0,.77778],8805:[.13597,.63597,0,0,.77778],8810:[.0391,.5391,0,0,1],8811:[.0391,.5391,0,0,1],8826:[.0391,.5391,0,0,.77778],8827:[.0391,.5391,0,0,.77778],8834:[.0391,.5391,0,0,.77778],8835:[.0391,.5391,0,0,.77778],8838:[.13597,.63597,0,0,.77778],8839:[.13597,.63597,0,0,.77778],8846:[0,.55556,0,0,.66667],8849:[.13597,.63597,0,0,.77778],8850:[.13597,.63597,0,0,.77778],8851:[0,.55556,0,0,.66667],8852:[0,.55556,0,0,.66667],8853:[.08333,.58333,0,0,.77778],8854:[.08333,.58333,0,0,.77778],8855:[.08333,.58333,0,0,.77778],8856:[.08333,.58333,0,0,.77778],8857:[.08333,.58333,0,0,.77778],8866:[0,.69444,0,0,.61111],8867:[0,.69444,0,0,.61111],8868:[0,.69444,0,0,.77778],8869:[0,.69444,0,0,.77778],8872:[.249,.75,0,0,.867],8900:[-.05555,.44445,0,0,.5],8901:[-.05555,.44445,0,0,.27778],8902:[-.03472,.46528,0,0,.5],8904:[.005,.505,0,0,.9],8942:[.03,.903,0,0,.278],8943:[-.19,.313,0,0,1.172],8945:[-.1,.823,0,0,1.282],8968:[.25,.75,0,0,.44445],8969:[.25,.75,0,0,.44445],8970:[.25,.75,0,0,.44445],8971:[.25,.75,0,0,.44445],8994:[-.14236,.35764,0,0,1],8995:[-.14236,.35764,0,0,1],9136:[.244,.744,0,0,.412],9137:[.244,.745,0,0,.412],9651:[.19444,.69444,0,0,.88889],9657:[-.03472,.46528,0,0,.5],9661:[.19444,.69444,0,0,.88889],9667:[-.03472,.46528,0,0,.5],9711:[.19444,.69444,0,0,1],9824:[.12963,.69444,0,0,.77778],9825:[.12963,.69444,0,0,.77778],9826:[.12963,.69444,0,0,.77778],9827:[.12963,.69444,0,0,.77778],9837:[0,.75,0,0,.38889],9838:[.19444,.69444,0,0,.38889],9839:[.19444,.69444,0,0,.38889],10216:[.25,.75,0,0,.38889],10217:[.25,.75,0,0,.38889],10222:[.244,.744,0,0,.412],10223:[.244,.745,0,0,.412],10229:[.011,.511,0,0,1.609],10230:[.011,.511,0,0,1.638],10231:[.011,.511,0,0,1.859],10232:[.024,.525,0,0,1.609],10233:[.024,.525,0,0,1.638],10234:[.024,.525,0,0,1.858],10236:[.011,.511,0,0,1.638],10815:[0,.68333,0,0,.75],10927:[.13597,.63597,0,0,.77778],10928:[.13597,.63597,0,0,.77778],57376:[.19444,.69444,0,0,0]},"Math-BoldItalic":{32:[0,0,0,0,.25],48:[0,.44444,0,0,.575],49:[0,.44444,0,0,.575],50:[0,.44444,0,0,.575],51:[.19444,.44444,0,0,.575],52:[.19444,.44444,0,0,.575],53:[.19444,.44444,0,0,.575],54:[0,.64444,0,0,.575],55:[.19444,.44444,0,0,.575],56:[0,.64444,0,0,.575],57:[.19444,.44444,0,0,.575],65:[0,.68611,0,0,.86944],66:[0,.68611,.04835,0,.8664],67:[0,.68611,.06979,0,.81694],68:[0,.68611,.03194,0,.93812],69:[0,.68611,.05451,0,.81007],70:[0,.68611,.15972,0,.68889],71:[0,.68611,0,0,.88673],72:[0,.68611,.08229,0,.98229],73:[0,.68611,.07778,0,.51111],74:[0,.68611,.10069,0,.63125],75:[0,.68611,.06979,0,.97118],76:[0,.68611,0,0,.75555],77:[0,.68611,.11424,0,1.14201],78:[0,.68611,.11424,0,.95034],79:[0,.68611,.03194,0,.83666],80:[0,.68611,.15972,0,.72309],81:[.19444,.68611,0,0,.86861],82:[0,.68611,.00421,0,.87235],83:[0,.68611,.05382,0,.69271],84:[0,.68611,.15972,0,.63663],85:[0,.68611,.11424,0,.80027],86:[0,.68611,.25555,0,.67778],87:[0,.68611,.15972,0,1.09305],88:[0,.68611,.07778,0,.94722],89:[0,.68611,.25555,0,.67458],90:[0,.68611,.06979,0,.77257],97:[0,.44444,0,0,.63287],98:[0,.69444,0,0,.52083],99:[0,.44444,0,0,.51342],100:[0,.69444,0,0,.60972],101:[0,.44444,0,0,.55361],102:[.19444,.69444,.11042,0,.56806],103:[.19444,.44444,.03704,0,.5449],104:[0,.69444,0,0,.66759],105:[0,.69326,0,0,.4048],106:[.19444,.69326,.0622,0,.47083],107:[0,.69444,.01852,0,.6037],108:[0,.69444,.0088,0,.34815],109:[0,.44444,0,0,1.0324],110:[0,.44444,0,0,.71296],111:[0,.44444,0,0,.58472],112:[.19444,.44444,0,0,.60092],113:[.19444,.44444,.03704,0,.54213],114:[0,.44444,.03194,0,.5287],115:[0,.44444,0,0,.53125],116:[0,.63492,0,0,.41528],117:[0,.44444,0,0,.68102],118:[0,.44444,.03704,0,.56666],119:[0,.44444,.02778,0,.83148],120:[0,.44444,0,0,.65903],121:[.19444,.44444,.03704,0,.59028],122:[0,.44444,.04213,0,.55509],160:[0,0,0,0,.25],915:[0,.68611,.15972,0,.65694],916:[0,.68611,0,0,.95833],920:[0,.68611,.03194,0,.86722],923:[0,.68611,0,0,.80555],926:[0,.68611,.07458,0,.84125],928:[0,.68611,.08229,0,.98229],931:[0,.68611,.05451,0,.88507],933:[0,.68611,.15972,0,.67083],934:[0,.68611,0,0,.76666],936:[0,.68611,.11653,0,.71402],937:[0,.68611,.04835,0,.8789],945:[0,.44444,0,0,.76064],946:[.19444,.69444,.03403,0,.65972],947:[.19444,.44444,.06389,0,.59003],948:[0,.69444,.03819,0,.52222],949:[0,.44444,0,0,.52882],950:[.19444,.69444,.06215,0,.50833],951:[.19444,.44444,.03704,0,.6],952:[0,.69444,.03194,0,.5618],953:[0,.44444,0,0,.41204],954:[0,.44444,0,0,.66759],955:[0,.69444,0,0,.67083],956:[.19444,.44444,0,0,.70787],957:[0,.44444,.06898,0,.57685],958:[.19444,.69444,.03021,0,.50833],959:[0,.44444,0,0,.58472],960:[0,.44444,.03704,0,.68241],961:[.19444,.44444,0,0,.6118],962:[.09722,.44444,.07917,0,.42361],963:[0,.44444,.03704,0,.68588],964:[0,.44444,.13472,0,.52083],965:[0,.44444,.03704,0,.63055],966:[.19444,.44444,0,0,.74722],967:[.19444,.44444,0,0,.71805],968:[.19444,.69444,.03704,0,.75833],969:[0,.44444,.03704,0,.71782],977:[0,.69444,0,0,.69155],981:[.19444,.69444,0,0,.7125],982:[0,.44444,.03194,0,.975],1009:[.19444,.44444,0,0,.6118],1013:[0,.44444,0,0,.48333],57649:[0,.44444,0,0,.39352],57911:[.19444,.44444,0,0,.43889]},"Math-Italic":{32:[0,0,0,0,.25],48:[0,.43056,0,0,.5],49:[0,.43056,0,0,.5],50:[0,.43056,0,0,.5],51:[.19444,.43056,0,0,.5],52:[.19444,.43056,0,0,.5],53:[.19444,.43056,0,0,.5],54:[0,.64444,0,0,.5],55:[.19444,.43056,0,0,.5],56:[0,.64444,0,0,.5],57:[.19444,.43056,0,0,.5],65:[0,.68333,0,.13889,.75],66:[0,.68333,.05017,.08334,.75851],67:[0,.68333,.07153,.08334,.71472],68:[0,.68333,.02778,.05556,.82792],69:[0,.68333,.05764,.08334,.7382],70:[0,.68333,.13889,.08334,.64306],71:[0,.68333,0,.08334,.78625],72:[0,.68333,.08125,.05556,.83125],73:[0,.68333,.07847,.11111,.43958],74:[0,.68333,.09618,.16667,.55451],75:[0,.68333,.07153,.05556,.84931],76:[0,.68333,0,.02778,.68056],77:[0,.68333,.10903,.08334,.97014],78:[0,.68333,.10903,.08334,.80347],79:[0,.68333,.02778,.08334,.76278],80:[0,.68333,.13889,.08334,.64201],81:[.19444,.68333,0,.08334,.79056],82:[0,.68333,.00773,.08334,.75929],83:[0,.68333,.05764,.08334,.6132],84:[0,.68333,.13889,.08334,.58438],85:[0,.68333,.10903,.02778,.68278],86:[0,.68333,.22222,0,.58333],87:[0,.68333,.13889,0,.94445],88:[0,.68333,.07847,.08334,.82847],89:[0,.68333,.22222,0,.58056],90:[0,.68333,.07153,.08334,.68264],97:[0,.43056,0,0,.52859],98:[0,.69444,0,0,.42917],99:[0,.43056,0,.05556,.43276],100:[0,.69444,0,.16667,.52049],101:[0,.43056,0,.05556,.46563],102:[.19444,.69444,.10764,.16667,.48959],103:[.19444,.43056,.03588,.02778,.47697],104:[0,.69444,0,0,.57616],105:[0,.65952,0,0,.34451],106:[.19444,.65952,.05724,0,.41181],107:[0,.69444,.03148,0,.5206],108:[0,.69444,.01968,.08334,.29838],109:[0,.43056,0,0,.87801],110:[0,.43056,0,0,.60023],111:[0,.43056,0,.05556,.48472],112:[.19444,.43056,0,.08334,.50313],113:[.19444,.43056,.03588,.08334,.44641],114:[0,.43056,.02778,.05556,.45116],115:[0,.43056,0,.05556,.46875],116:[0,.61508,0,.08334,.36111],117:[0,.43056,0,.02778,.57246],118:[0,.43056,.03588,.02778,.48472],119:[0,.43056,.02691,.08334,.71592],120:[0,.43056,0,.02778,.57153],121:[.19444,.43056,.03588,.05556,.49028],122:[0,.43056,.04398,.05556,.46505],160:[0,0,0,0,.25],915:[0,.68333,.13889,.08334,.61528],916:[0,.68333,0,.16667,.83334],920:[0,.68333,.02778,.08334,.76278],923:[0,.68333,0,.16667,.69445],926:[0,.68333,.07569,.08334,.74236],928:[0,.68333,.08125,.05556,.83125],931:[0,.68333,.05764,.08334,.77986],933:[0,.68333,.13889,.05556,.58333],934:[0,.68333,0,.08334,.66667],936:[0,.68333,.11,.05556,.61222],937:[0,.68333,.05017,.08334,.7724],945:[0,.43056,.0037,.02778,.6397],946:[.19444,.69444,.05278,.08334,.56563],947:[.19444,.43056,.05556,0,.51773],948:[0,.69444,.03785,.05556,.44444],949:[0,.43056,0,.08334,.46632],950:[.19444,.69444,.07378,.08334,.4375],951:[.19444,.43056,.03588,.05556,.49653],952:[0,.69444,.02778,.08334,.46944],953:[0,.43056,0,.05556,.35394],954:[0,.43056,0,0,.57616],955:[0,.69444,0,0,.58334],956:[.19444,.43056,0,.02778,.60255],957:[0,.43056,.06366,.02778,.49398],958:[.19444,.69444,.04601,.11111,.4375],959:[0,.43056,0,.05556,.48472],960:[0,.43056,.03588,0,.57003],961:[.19444,.43056,0,.08334,.51702],962:[.09722,.43056,.07986,.08334,.36285],963:[0,.43056,.03588,0,.57141],964:[0,.43056,.1132,.02778,.43715],965:[0,.43056,.03588,.02778,.54028],966:[.19444,.43056,0,.08334,.65417],967:[.19444,.43056,0,.05556,.62569],968:[.19444,.69444,.03588,.11111,.65139],969:[0,.43056,.03588,0,.62245],977:[0,.69444,0,.08334,.59144],981:[.19444,.69444,0,.08334,.59583],982:[0,.43056,.02778,0,.82813],1009:[.19444,.43056,0,.08334,.51702],1013:[0,.43056,0,.05556,.4059],57649:[0,.43056,0,.02778,.32246],57911:[.19444,.43056,0,.08334,.38403]},"SansSerif-Bold":{32:[0,0,0,0,.25],33:[0,.69444,0,0,.36667],34:[0,.69444,0,0,.55834],35:[.19444,.69444,0,0,.91667],36:[.05556,.75,0,0,.55],37:[.05556,.75,0,0,1.02912],38:[0,.69444,0,0,.83056],39:[0,.69444,0,0,.30556],40:[.25,.75,0,0,.42778],41:[.25,.75,0,0,.42778],42:[0,.75,0,0,.55],43:[.11667,.61667,0,0,.85556],44:[.10556,.13056,0,0,.30556],45:[0,.45833,0,0,.36667],46:[0,.13056,0,0,.30556],47:[.25,.75,0,0,.55],48:[0,.69444,0,0,.55],49:[0,.69444,0,0,.55],50:[0,.69444,0,0,.55],51:[0,.69444,0,0,.55],52:[0,.69444,0,0,.55],53:[0,.69444,0,0,.55],54:[0,.69444,0,0,.55],55:[0,.69444,0,0,.55],56:[0,.69444,0,0,.55],57:[0,.69444,0,0,.55],58:[0,.45833,0,0,.30556],59:[.10556,.45833,0,0,.30556],61:[-.09375,.40625,0,0,.85556],63:[0,.69444,0,0,.51945],64:[0,.69444,0,0,.73334],65:[0,.69444,0,0,.73334],66:[0,.69444,0,0,.73334],67:[0,.69444,0,0,.70278],68:[0,.69444,0,0,.79445],69:[0,.69444,0,0,.64167],70:[0,.69444,0,0,.61111],71:[0,.69444,0,0,.73334],72:[0,.69444,0,0,.79445],73:[0,.69444,0,0,.33056],74:[0,.69444,0,0,.51945],75:[0,.69444,0,0,.76389],76:[0,.69444,0,0,.58056],77:[0,.69444,0,0,.97778],78:[0,.69444,0,0,.79445],79:[0,.69444,0,0,.79445],80:[0,.69444,0,0,.70278],81:[.10556,.69444,0,0,.79445],82:[0,.69444,0,0,.70278],83:[0,.69444,0,0,.61111],84:[0,.69444,0,0,.73334],85:[0,.69444,0,0,.76389],86:[0,.69444,.01528,0,.73334],87:[0,.69444,.01528,0,1.03889],88:[0,.69444,0,0,.73334],89:[0,.69444,.0275,0,.73334],90:[0,.69444,0,0,.67223],91:[.25,.75,0,0,.34306],93:[.25,.75,0,0,.34306],94:[0,.69444,0,0,.55],95:[.35,.10833,.03056,0,.55],97:[0,.45833,0,0,.525],98:[0,.69444,0,0,.56111],99:[0,.45833,0,0,.48889],100:[0,.69444,0,0,.56111],101:[0,.45833,0,0,.51111],102:[0,.69444,.07639,0,.33611],103:[.19444,.45833,.01528,0,.55],104:[0,.69444,0,0,.56111],105:[0,.69444,0,0,.25556],106:[.19444,.69444,0,0,.28611],107:[0,.69444,0,0,.53056],108:[0,.69444,0,0,.25556],109:[0,.45833,0,0,.86667],110:[0,.45833,0,0,.56111],111:[0,.45833,0,0,.55],112:[.19444,.45833,0,0,.56111],113:[.19444,.45833,0,0,.56111],114:[0,.45833,.01528,0,.37222],115:[0,.45833,0,0,.42167],116:[0,.58929,0,0,.40417],117:[0,.45833,0,0,.56111],118:[0,.45833,.01528,0,.5],119:[0,.45833,.01528,0,.74445],120:[0,.45833,0,0,.5],121:[.19444,.45833,.01528,0,.5],122:[0,.45833,0,0,.47639],126:[.35,.34444,0,0,.55],160:[0,0,0,0,.25],168:[0,.69444,0,0,.55],176:[0,.69444,0,0,.73334],180:[0,.69444,0,0,.55],184:[.17014,0,0,0,.48889],305:[0,.45833,0,0,.25556],567:[.19444,.45833,0,0,.28611],710:[0,.69444,0,0,.55],711:[0,.63542,0,0,.55],713:[0,.63778,0,0,.55],728:[0,.69444,0,0,.55],729:[0,.69444,0,0,.30556],730:[0,.69444,0,0,.73334],732:[0,.69444,0,0,.55],733:[0,.69444,0,0,.55],915:[0,.69444,0,0,.58056],916:[0,.69444,0,0,.91667],920:[0,.69444,0,0,.85556],923:[0,.69444,0,0,.67223],926:[0,.69444,0,0,.73334],928:[0,.69444,0,0,.79445],931:[0,.69444,0,0,.79445],933:[0,.69444,0,0,.85556],934:[0,.69444,0,0,.79445],936:[0,.69444,0,0,.85556],937:[0,.69444,0,0,.79445],8211:[0,.45833,.03056,0,.55],8212:[0,.45833,.03056,0,1.10001],8216:[0,.69444,0,0,.30556],8217:[0,.69444,0,0,.30556],8220:[0,.69444,0,0,.55834],8221:[0,.69444,0,0,.55834]},"SansSerif-Italic":{32:[0,0,0,0,.25],33:[0,.69444,.05733,0,.31945],34:[0,.69444,.00316,0,.5],35:[.19444,.69444,.05087,0,.83334],36:[.05556,.75,.11156,0,.5],37:[.05556,.75,.03126,0,.83334],38:[0,.69444,.03058,0,.75834],39:[0,.69444,.07816,0,.27778],40:[.25,.75,.13164,0,.38889],41:[.25,.75,.02536,0,.38889],42:[0,.75,.11775,0,.5],43:[.08333,.58333,.02536,0,.77778],44:[.125,.08333,0,0,.27778],45:[0,.44444,.01946,0,.33333],46:[0,.08333,0,0,.27778],47:[.25,.75,.13164,0,.5],48:[0,.65556,.11156,0,.5],49:[0,.65556,.11156,0,.5],50:[0,.65556,.11156,0,.5],51:[0,.65556,.11156,0,.5],52:[0,.65556,.11156,0,.5],53:[0,.65556,.11156,0,.5],54:[0,.65556,.11156,0,.5],55:[0,.65556,.11156,0,.5],56:[0,.65556,.11156,0,.5],57:[0,.65556,.11156,0,.5],58:[0,.44444,.02502,0,.27778],59:[.125,.44444,.02502,0,.27778],61:[-.13,.37,.05087,0,.77778],63:[0,.69444,.11809,0,.47222],64:[0,.69444,.07555,0,.66667],65:[0,.69444,0,0,.66667],66:[0,.69444,.08293,0,.66667],67:[0,.69444,.11983,0,.63889],68:[0,.69444,.07555,0,.72223],69:[0,.69444,.11983,0,.59722],70:[0,.69444,.13372,0,.56945],71:[0,.69444,.11983,0,.66667],72:[0,.69444,.08094,0,.70834],73:[0,.69444,.13372,0,.27778],74:[0,.69444,.08094,0,.47222],75:[0,.69444,.11983,0,.69445],76:[0,.69444,0,0,.54167],77:[0,.69444,.08094,0,.875],78:[0,.69444,.08094,0,.70834],79:[0,.69444,.07555,0,.73611],80:[0,.69444,.08293,0,.63889],81:[.125,.69444,.07555,0,.73611],82:[0,.69444,.08293,0,.64584],83:[0,.69444,.09205,0,.55556],84:[0,.69444,.13372,0,.68056],85:[0,.69444,.08094,0,.6875],86:[0,.69444,.1615,0,.66667],87:[0,.69444,.1615,0,.94445],88:[0,.69444,.13372,0,.66667],89:[0,.69444,.17261,0,.66667],90:[0,.69444,.11983,0,.61111],91:[.25,.75,.15942,0,.28889],93:[.25,.75,.08719,0,.28889],94:[0,.69444,.0799,0,.5],95:[.35,.09444,.08616,0,.5],97:[0,.44444,.00981,0,.48056],98:[0,.69444,.03057,0,.51667],99:[0,.44444,.08336,0,.44445],100:[0,.69444,.09483,0,.51667],101:[0,.44444,.06778,0,.44445],102:[0,.69444,.21705,0,.30556],103:[.19444,.44444,.10836,0,.5],104:[0,.69444,.01778,0,.51667],105:[0,.67937,.09718,0,.23889],106:[.19444,.67937,.09162,0,.26667],107:[0,.69444,.08336,0,.48889],108:[0,.69444,.09483,0,.23889],109:[0,.44444,.01778,0,.79445],110:[0,.44444,.01778,0,.51667],111:[0,.44444,.06613,0,.5],112:[.19444,.44444,.0389,0,.51667],113:[.19444,.44444,.04169,0,.51667],114:[0,.44444,.10836,0,.34167],115:[0,.44444,.0778,0,.38333],116:[0,.57143,.07225,0,.36111],117:[0,.44444,.04169,0,.51667],118:[0,.44444,.10836,0,.46111],119:[0,.44444,.10836,0,.68334],120:[0,.44444,.09169,0,.46111],121:[.19444,.44444,.10836,0,.46111],122:[0,.44444,.08752,0,.43472],126:[.35,.32659,.08826,0,.5],160:[0,0,0,0,.25],168:[0,.67937,.06385,0,.5],176:[0,.69444,0,0,.73752],184:[.17014,0,0,0,.44445],305:[0,.44444,.04169,0,.23889],567:[.19444,.44444,.04169,0,.26667],710:[0,.69444,.0799,0,.5],711:[0,.63194,.08432,0,.5],713:[0,.60889,.08776,0,.5],714:[0,.69444,.09205,0,.5],715:[0,.69444,0,0,.5],728:[0,.69444,.09483,0,.5],729:[0,.67937,.07774,0,.27778],730:[0,.69444,0,0,.73752],732:[0,.67659,.08826,0,.5],733:[0,.69444,.09205,0,.5],915:[0,.69444,.13372,0,.54167],916:[0,.69444,0,0,.83334],920:[0,.69444,.07555,0,.77778],923:[0,.69444,0,0,.61111],926:[0,.69444,.12816,0,.66667],928:[0,.69444,.08094,0,.70834],931:[0,.69444,.11983,0,.72222],933:[0,.69444,.09031,0,.77778],934:[0,.69444,.04603,0,.72222],936:[0,.69444,.09031,0,.77778],937:[0,.69444,.08293,0,.72222],8211:[0,.44444,.08616,0,.5],8212:[0,.44444,.08616,0,1],8216:[0,.69444,.07816,0,.27778],8217:[0,.69444,.07816,0,.27778],8220:[0,.69444,.14205,0,.5],8221:[0,.69444,.00316,0,.5]},"SansSerif-Regular":{32:[0,0,0,0,.25],33:[0,.69444,0,0,.31945],34:[0,.69444,0,0,.5],35:[.19444,.69444,0,0,.83334],36:[.05556,.75,0,0,.5],37:[.05556,.75,0,0,.83334],38:[0,.69444,0,0,.75834],39:[0,.69444,0,0,.27778],40:[.25,.75,0,0,.38889],41:[.25,.75,0,0,.38889],42:[0,.75,0,0,.5],43:[.08333,.58333,0,0,.77778],44:[.125,.08333,0,0,.27778],45:[0,.44444,0,0,.33333],46:[0,.08333,0,0,.27778],47:[.25,.75,0,0,.5],48:[0,.65556,0,0,.5],49:[0,.65556,0,0,.5],50:[0,.65556,0,0,.5],51:[0,.65556,0,0,.5],52:[0,.65556,0,0,.5],53:[0,.65556,0,0,.5],54:[0,.65556,0,0,.5],55:[0,.65556,0,0,.5],56:[0,.65556,0,0,.5],57:[0,.65556,0,0,.5],58:[0,.44444,0,0,.27778],59:[.125,.44444,0,0,.27778],61:[-.13,.37,0,0,.77778],63:[0,.69444,0,0,.47222],64:[0,.69444,0,0,.66667],65:[0,.69444,0,0,.66667],66:[0,.69444,0,0,.66667],67:[0,.69444,0,0,.63889],68:[0,.69444,0,0,.72223],69:[0,.69444,0,0,.59722],70:[0,.69444,0,0,.56945],71:[0,.69444,0,0,.66667],72:[0,.69444,0,0,.70834],73:[0,.69444,0,0,.27778],74:[0,.69444,0,0,.47222],75:[0,.69444,0,0,.69445],76:[0,.69444,0,0,.54167],77:[0,.69444,0,0,.875],78:[0,.69444,0,0,.70834],79:[0,.69444,0,0,.73611],80:[0,.69444,0,0,.63889],81:[.125,.69444,0,0,.73611],82:[0,.69444,0,0,.64584],83:[0,.69444,0,0,.55556],84:[0,.69444,0,0,.68056],85:[0,.69444,0,0,.6875],86:[0,.69444,.01389,0,.66667],87:[0,.69444,.01389,0,.94445],88:[0,.69444,0,0,.66667],89:[0,.69444,.025,0,.66667],90:[0,.69444,0,0,.61111],91:[.25,.75,0,0,.28889],93:[.25,.75,0,0,.28889],94:[0,.69444,0,0,.5],95:[.35,.09444,.02778,0,.5],97:[0,.44444,0,0,.48056],98:[0,.69444,0,0,.51667],99:[0,.44444,0,0,.44445],100:[0,.69444,0,0,.51667],101:[0,.44444,0,0,.44445],102:[0,.69444,.06944,0,.30556],103:[.19444,.44444,.01389,0,.5],104:[0,.69444,0,0,.51667],105:[0,.67937,0,0,.23889],106:[.19444,.67937,0,0,.26667],107:[0,.69444,0,0,.48889],108:[0,.69444,0,0,.23889],109:[0,.44444,0,0,.79445],110:[0,.44444,0,0,.51667],111:[0,.44444,0,0,.5],112:[.19444,.44444,0,0,.51667],113:[.19444,.44444,0,0,.51667],114:[0,.44444,.01389,0,.34167],115:[0,.44444,0,0,.38333],116:[0,.57143,0,0,.36111],117:[0,.44444,0,0,.51667],118:[0,.44444,.01389,0,.46111],119:[0,.44444,.01389,0,.68334],120:[0,.44444,0,0,.46111],121:[.19444,.44444,.01389,0,.46111],122:[0,.44444,0,0,.43472],126:[.35,.32659,0,0,.5],160:[0,0,0,0,.25],168:[0,.67937,0,0,.5],176:[0,.69444,0,0,.66667],184:[.17014,0,0,0,.44445],305:[0,.44444,0,0,.23889],567:[.19444,.44444,0,0,.26667],710:[0,.69444,0,0,.5],711:[0,.63194,0,0,.5],713:[0,.60889,0,0,.5],714:[0,.69444,0,0,.5],715:[0,.69444,0,0,.5],728:[0,.69444,0,0,.5],729:[0,.67937,0,0,.27778],730:[0,.69444,0,0,.66667],732:[0,.67659,0,0,.5],733:[0,.69444,0,0,.5],915:[0,.69444,0,0,.54167],916:[0,.69444,0,0,.83334],920:[0,.69444,0,0,.77778],923:[0,.69444,0,0,.61111],926:[0,.69444,0,0,.66667],928:[0,.69444,0,0,.70834],931:[0,.69444,0,0,.72222],933:[0,.69444,0,0,.77778],934:[0,.69444,0,0,.72222],936:[0,.69444,0,0,.77778],937:[0,.69444,0,0,.72222],8211:[0,.44444,.02778,0,.5],8212:[0,.44444,.02778,0,1],8216:[0,.69444,0,0,.27778],8217:[0,.69444,0,0,.27778],8220:[0,.69444,0,0,.5],8221:[0,.69444,0,0,.5]},"Script-Regular":{32:[0,0,0,0,.25],65:[0,.7,.22925,0,.80253],66:[0,.7,.04087,0,.90757],67:[0,.7,.1689,0,.66619],68:[0,.7,.09371,0,.77443],69:[0,.7,.18583,0,.56162],70:[0,.7,.13634,0,.89544],71:[0,.7,.17322,0,.60961],72:[0,.7,.29694,0,.96919],73:[0,.7,.19189,0,.80907],74:[.27778,.7,.19189,0,1.05159],75:[0,.7,.31259,0,.91364],76:[0,.7,.19189,0,.87373],77:[0,.7,.15981,0,1.08031],78:[0,.7,.3525,0,.9015],79:[0,.7,.08078,0,.73787],80:[0,.7,.08078,0,1.01262],81:[0,.7,.03305,0,.88282],82:[0,.7,.06259,0,.85],83:[0,.7,.19189,0,.86767],84:[0,.7,.29087,0,.74697],85:[0,.7,.25815,0,.79996],86:[0,.7,.27523,0,.62204],87:[0,.7,.27523,0,.80532],88:[0,.7,.26006,0,.94445],89:[0,.7,.2939,0,.70961],90:[0,.7,.24037,0,.8212],160:[0,0,0,0,.25]},"Size1-Regular":{32:[0,0,0,0,.25],40:[.35001,.85,0,0,.45834],41:[.35001,.85,0,0,.45834],47:[.35001,.85,0,0,.57778],91:[.35001,.85,0,0,.41667],92:[.35001,.85,0,0,.57778],93:[.35001,.85,0,0,.41667],123:[.35001,.85,0,0,.58334],125:[.35001,.85,0,0,.58334],160:[0,0,0,0,.25],710:[0,.72222,0,0,.55556],732:[0,.72222,0,0,.55556],770:[0,.72222,0,0,.55556],771:[0,.72222,0,0,.55556],8214:[-99e-5,.601,0,0,.77778],8593:[1e-5,.6,0,0,.66667],8595:[1e-5,.6,0,0,.66667],8657:[1e-5,.6,0,0,.77778],8659:[1e-5,.6,0,0,.77778],8719:[.25001,.75,0,0,.94445],8720:[.25001,.75,0,0,.94445],8721:[.25001,.75,0,0,1.05556],8730:[.35001,.85,0,0,1],8739:[-.00599,.606,0,0,.33333],8741:[-.00599,.606,0,0,.55556],8747:[.30612,.805,.19445,0,.47222],8748:[.306,.805,.19445,0,.47222],8749:[.306,.805,.19445,0,.47222],8750:[.30612,.805,.19445,0,.47222],8896:[.25001,.75,0,0,.83334],8897:[.25001,.75,0,0,.83334],8898:[.25001,.75,0,0,.83334],8899:[.25001,.75,0,0,.83334],8968:[.35001,.85,0,0,.47222],8969:[.35001,.85,0,0,.47222],8970:[.35001,.85,0,0,.47222],8971:[.35001,.85,0,0,.47222],9168:[-99e-5,.601,0,0,.66667],10216:[.35001,.85,0,0,.47222],10217:[.35001,.85,0,0,.47222],10752:[.25001,.75,0,0,1.11111],10753:[.25001,.75,0,0,1.11111],10754:[.25001,.75,0,0,1.11111],10756:[.25001,.75,0,0,.83334],10758:[.25001,.75,0,0,.83334]},"Size2-Regular":{32:[0,0,0,0,.25],40:[.65002,1.15,0,0,.59722],41:[.65002,1.15,0,0,.59722],47:[.65002,1.15,0,0,.81111],91:[.65002,1.15,0,0,.47222],92:[.65002,1.15,0,0,.81111],93:[.65002,1.15,0,0,.47222],123:[.65002,1.15,0,0,.66667],125:[.65002,1.15,0,0,.66667],160:[0,0,0,0,.25],710:[0,.75,0,0,1],732:[0,.75,0,0,1],770:[0,.75,0,0,1],771:[0,.75,0,0,1],8719:[.55001,1.05,0,0,1.27778],8720:[.55001,1.05,0,0,1.27778],8721:[.55001,1.05,0,0,1.44445],8730:[.65002,1.15,0,0,1],8747:[.86225,1.36,.44445,0,.55556],8748:[.862,1.36,.44445,0,.55556],8749:[.862,1.36,.44445,0,.55556],8750:[.86225,1.36,.44445,0,.55556],8896:[.55001,1.05,0,0,1.11111],8897:[.55001,1.05,0,0,1.11111],8898:[.55001,1.05,0,0,1.11111],8899:[.55001,1.05,0,0,1.11111],8968:[.65002,1.15,0,0,.52778],8969:[.65002,1.15,0,0,.52778],8970:[.65002,1.15,0,0,.52778],8971:[.65002,1.15,0,0,.52778],10216:[.65002,1.15,0,0,.61111],10217:[.65002,1.15,0,0,.61111],10752:[.55001,1.05,0,0,1.51112],10753:[.55001,1.05,0,0,1.51112],10754:[.55001,1.05,0,0,1.51112],10756:[.55001,1.05,0,0,1.11111],10758:[.55001,1.05,0,0,1.11111]},"Size3-Regular":{32:[0,0,0,0,.25],40:[.95003,1.45,0,0,.73611],41:[.95003,1.45,0,0,.73611],47:[.95003,1.45,0,0,1.04445],91:[.95003,1.45,0,0,.52778],92:[.95003,1.45,0,0,1.04445],93:[.95003,1.45,0,0,.52778],123:[.95003,1.45,0,0,.75],125:[.95003,1.45,0,0,.75],160:[0,0,0,0,.25],710:[0,.75,0,0,1.44445],732:[0,.75,0,0,1.44445],770:[0,.75,0,0,1.44445],771:[0,.75,0,0,1.44445],8730:[.95003,1.45,0,0,1],8968:[.95003,1.45,0,0,.58334],8969:[.95003,1.45,0,0,.58334],8970:[.95003,1.45,0,0,.58334],8971:[.95003,1.45,0,0,.58334],10216:[.95003,1.45,0,0,.75],10217:[.95003,1.45,0,0,.75]},"Size4-Regular":{32:[0,0,0,0,.25],40:[1.25003,1.75,0,0,.79167],41:[1.25003,1.75,0,0,.79167],47:[1.25003,1.75,0,0,1.27778],91:[1.25003,1.75,0,0,.58334],92:[1.25003,1.75,0,0,1.27778],93:[1.25003,1.75,0,0,.58334],123:[1.25003,1.75,0,0,.80556],125:[1.25003,1.75,0,0,.80556],160:[0,0,0,0,.25],710:[0,.825,0,0,1.8889],732:[0,.825,0,0,1.8889],770:[0,.825,0,0,1.8889],771:[0,.825,0,0,1.8889],8730:[1.25003,1.75,0,0,1],8968:[1.25003,1.75,0,0,.63889],8969:[1.25003,1.75,0,0,.63889],8970:[1.25003,1.75,0,0,.63889],8971:[1.25003,1.75,0,0,.63889],9115:[.64502,1.155,0,0,.875],9116:[1e-5,.6,0,0,.875],9117:[.64502,1.155,0,0,.875],9118:[.64502,1.155,0,0,.875],9119:[1e-5,.6,0,0,.875],9120:[.64502,1.155,0,0,.875],9121:[.64502,1.155,0,0,.66667],9122:[-99e-5,.601,0,0,.66667],9123:[.64502,1.155,0,0,.66667],9124:[.64502,1.155,0,0,.66667],9125:[-99e-5,.601,0,0,.66667],9126:[.64502,1.155,0,0,.66667],9127:[1e-5,.9,0,0,.88889],9128:[.65002,1.15,0,0,.88889],9129:[.90001,0,0,0,.88889],9130:[0,.3,0,0,.88889],9131:[1e-5,.9,0,0,.88889],9132:[.65002,1.15,0,0,.88889],9133:[.90001,0,0,0,.88889],9143:[.88502,.915,0,0,1.05556],10216:[1.25003,1.75,0,0,.80556],10217:[1.25003,1.75,0,0,.80556],57344:[-.00499,.605,0,0,1.05556],57345:[-.00499,.605,0,0,1.05556],57680:[0,.12,0,0,.45],57681:[0,.12,0,0,.45],57682:[0,.12,0,0,.45],57683:[0,.12,0,0,.45]},"Typewriter-Regular":{32:[0,0,0,0,.525],33:[0,.61111,0,0,.525],34:[0,.61111,0,0,.525],35:[0,.61111,0,0,.525],36:[.08333,.69444,0,0,.525],37:[.08333,.69444,0,0,.525],38:[0,.61111,0,0,.525],39:[0,.61111,0,0,.525],40:[.08333,.69444,0,0,.525],41:[.08333,.69444,0,0,.525],42:[0,.52083,0,0,.525],43:[-.08056,.53055,0,0,.525],44:[.13889,.125,0,0,.525],45:[-.08056,.53055,0,0,.525],46:[0,.125,0,0,.525],47:[.08333,.69444,0,0,.525],48:[0,.61111,0,0,.525],49:[0,.61111,0,0,.525],50:[0,.61111,0,0,.525],51:[0,.61111,0,0,.525],52:[0,.61111,0,0,.525],53:[0,.61111,0,0,.525],54:[0,.61111,0,0,.525],55:[0,.61111,0,0,.525],56:[0,.61111,0,0,.525],57:[0,.61111,0,0,.525],58:[0,.43056,0,0,.525],59:[.13889,.43056,0,0,.525],60:[-.05556,.55556,0,0,.525],61:[-.19549,.41562,0,0,.525],62:[-.05556,.55556,0,0,.525],63:[0,.61111,0,0,.525],64:[0,.61111,0,0,.525],65:[0,.61111,0,0,.525],66:[0,.61111,0,0,.525],67:[0,.61111,0,0,.525],68:[0,.61111,0,0,.525],69:[0,.61111,0,0,.525],70:[0,.61111,0,0,.525],71:[0,.61111,0,0,.525],72:[0,.61111,0,0,.525],73:[0,.61111,0,0,.525],74:[0,.61111,0,0,.525],75:[0,.61111,0,0,.525],76:[0,.61111,0,0,.525],77:[0,.61111,0,0,.525],78:[0,.61111,0,0,.525],79:[0,.61111,0,0,.525],80:[0,.61111,0,0,.525],81:[.13889,.61111,0,0,.525],82:[0,.61111,0,0,.525],83:[0,.61111,0,0,.525],84:[0,.61111,0,0,.525],85:[0,.61111,0,0,.525],86:[0,.61111,0,0,.525],87:[0,.61111,0,0,.525],88:[0,.61111,0,0,.525],89:[0,.61111,0,0,.525],90:[0,.61111,0,0,.525],91:[.08333,.69444,0,0,.525],92:[.08333,.69444,0,0,.525],93:[.08333,.69444,0,0,.525],94:[0,.61111,0,0,.525],95:[.09514,0,0,0,.525],96:[0,.61111,0,0,.525],97:[0,.43056,0,0,.525],98:[0,.61111,0,0,.525],99:[0,.43056,0,0,.525],100:[0,.61111,0,0,.525],101:[0,.43056,0,0,.525],102:[0,.61111,0,0,.525],103:[.22222,.43056,0,0,.525],104:[0,.61111,0,0,.525],105:[0,.61111,0,0,.525],106:[.22222,.61111,0,0,.525],107:[0,.61111,0,0,.525],108:[0,.61111,0,0,.525],109:[0,.43056,0,0,.525],110:[0,.43056,0,0,.525],111:[0,.43056,0,0,.525],112:[.22222,.43056,0,0,.525],113:[.22222,.43056,0,0,.525],114:[0,.43056,0,0,.525],115:[0,.43056,0,0,.525],116:[0,.55358,0,0,.525],117:[0,.43056,0,0,.525],118:[0,.43056,0,0,.525],119:[0,.43056,0,0,.525],120:[0,.43056,0,0,.525],121:[.22222,.43056,0,0,.525],122:[0,.43056,0,0,.525],123:[.08333,.69444,0,0,.525],124:[.08333,.69444,0,0,.525],125:[.08333,.69444,0,0,.525],126:[0,.61111,0,0,.525],127:[0,.61111,0,0,.525],160:[0,0,0,0,.525],176:[0,.61111,0,0,.525],184:[.19445,0,0,0,.525],305:[0,.43056,0,0,.525],567:[.22222,.43056,0,0,.525],711:[0,.56597,0,0,.525],713:[0,.56555,0,0,.525],714:[0,.61111,0,0,.525],715:[0,.61111,0,0,.525],728:[0,.61111,0,0,.525],730:[0,.61111,0,0,.525],770:[0,.61111,0,0,.525],771:[0,.61111,0,0,.525],776:[0,.61111,0,0,.525],915:[0,.61111,0,0,.525],916:[0,.61111,0,0,.525],920:[0,.61111,0,0,.525],923:[0,.61111,0,0,.525],926:[0,.61111,0,0,.525],928:[0,.61111,0,0,.525],931:[0,.61111,0,0,.525],933:[0,.61111,0,0,.525],934:[0,.61111,0,0,.525],936:[0,.61111,0,0,.525],937:[0,.61111,0,0,.525],8216:[0,.61111,0,0,.525],8217:[0,.61111,0,0,.525],8242:[0,.61111,0,0,.525],9251:[.11111,.21944,0,0,.525]}},ns={slant:[.25,.25,.25],space:[0,0,0],stretch:[0,0,0],shrink:[0,0,0],xHeight:[.431,.431,.431],quad:[1,1.171,1.472],extraSpace:[0,0,0],num1:[.677,.732,.925],num2:[.394,.384,.387],num3:[.444,.471,.504],denom1:[.686,.752,1.025],denom2:[.345,.344,.532],sup1:[.413,.503,.504],sup2:[.363,.431,.404],sup3:[.289,.286,.294],sub1:[.15,.143,.2],sub2:[.247,.286,.4],supDrop:[.386,.353,.494],subDrop:[.05,.071,.1],delim1:[2.39,1.7,1.98],delim2:[1.01,1.157,1.42],axisHeight:[.25,.25,.25],defaultRuleThickness:[.04,.049,.049],bigOpSpacing1:[.111,.111,.111],bigOpSpacing2:[.166,.166,.166],bigOpSpacing3:[.2,.2,.2],bigOpSpacing4:[.6,.611,.611],bigOpSpacing5:[.1,.143,.143],sqrtRuleThickness:[.04,.04,.04],ptPerEm:[10,10,10],doubleRuleSep:[.2,.2,.2],arrayRuleWidth:[.04,.04,.04],fboxsep:[.3,.3,.3],fboxrule:[.04,.04,.04]},is={"Å":"A","Ð":"D","Þ":"o","å":"a","ð":"d","þ":"o","А":"A","Б":"B","В":"B","Г":"F","Д":"A","Е":"E","Ж":"K","З":"3","И":"N","Й":"N","К":"K","Л":"N","М":"M","Н":"H","О":"O","П":"N","Р":"P","С":"C","Т":"T","У":"y","Ф":"O","Х":"X","Ц":"U","Ч":"h","Ш":"W","Щ":"W","Ъ":"B","Ы":"X","Ь":"B","Э":"3","Ю":"X","Я":"R","а":"a","б":"b","в":"a","г":"r","д":"y","е":"e","ж":"m","з":"e","и":"n","й":"n","к":"n","л":"n","м":"m","н":"n","о":"o","п":"n","р":"p","с":"c","т":"o","у":"y","ф":"b","х":"x","ц":"n","ч":"n","ш":"w","щ":"w","ъ":"a","ы":"m","ь":"a","э":"e","ю":"m","я":"r"};function ss(e,t,r){if(!rs[t])throw new Error("Font metrics not found for font: "+t+".");var n=e.charCodeAt(0),i=rs[t][n];if(!i&&e[0]in is&&(n=is[e[0]].charCodeAt(0),i=rs[t][n]),i||"text"!==r||Qi(n)&&(i=rs[t][77]),i)return{depth:i[0],height:i[1],italic:i[2],skew:i[3],width:i[4]}}var as={};var os=[[1,1,1],[2,1,1],[3,1,1],[4,2,1],[5,2,1],[6,3,1],[7,4,2],[8,6,3],[9,7,6],[10,8,7],[11,10,9]],ls=[.5,.6,.7,.8,.9,1,1.2,1.44,1.728,2.074,2.488],hs=function(e,t){return t.size<2?e:os[e-1][t.size-1]};class cs{constructor(e){this.style=void 0,this.color=void 0,this.size=void 0,this.textSize=void 0,this.phantom=void 0,this.font=void 0,this.fontFamily=void 0,this.fontWeight=void 0,this.fontShape=void 0,this.sizeMultiplier=void 0,this.maxSize=void 0,this.minRuleThickness=void 0,this._fontMetrics=void 0,this.style=e.style,this.color=e.color,this.size=e.size||cs.BASESIZE,this.textSize=e.textSize||this.size,this.phantom=!!e.phantom,this.font=e.font||"",this.fontFamily=e.fontFamily||"",this.fontWeight=e.fontWeight||"",this.fontShape=e.fontShape||"",this.sizeMultiplier=ls[this.size-1],this.maxSize=e.maxSize,this.minRuleThickness=e.minRuleThickness,this._fontMetrics=void 0}extend(e){var t={style:this.style,size:this.size,textSize:this.textSize,color:this.color,phantom:this.phantom,font:this.font,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontShape:this.fontShape,maxSize:this.maxSize,minRuleThickness:this.minRuleThickness};for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return new cs(t)}havingStyle(e){return this.style===e?this:this.extend({style:e,size:hs(this.textSize,e)})}havingCrampedStyle(){return this.havingStyle(this.style.cramp())}havingSize(e){return this.size===e&&this.textSize===e?this:this.extend({style:this.style.text(),size:e,textSize:e,sizeMultiplier:ls[e-1]})}havingBaseStyle(e){e=e||this.style.text();var t=hs(cs.BASESIZE,e);return this.size===t&&this.textSize===cs.BASESIZE&&this.style===e?this:this.extend({style:e,size:t})}havingBaseSizing(){var e;switch(this.style.id){case 4:case 5:e=3;break;case 6:case 7:e=1;break;default:e=6}return this.extend({style:this.style.text(),size:e})}withColor(e){return this.extend({color:e})}withPhantom(){return this.extend({phantom:!0})}withFont(e){return this.extend({font:e})}withTextFontFamily(e){return this.extend({fontFamily:e,font:""})}withTextFontWeight(e){return this.extend({fontWeight:e,font:""})}withTextFontShape(e){return this.extend({fontShape:e,font:""})}sizingClasses(e){return e.size!==this.size?["sizing","reset-size"+e.size,"size"+this.size]:[]}baseSizingClasses(){return this.size!==cs.BASESIZE?["sizing","reset-size"+this.size,"size"+cs.BASESIZE]:[]}fontMetrics(){return this._fontMetrics||(this._fontMetrics=function(e){var t;if(!as[t=e>=5?0:e>=3?1:2]){var r=as[t]={cssEmPerMu:ns.quad[t]/18};for(var n in ns)ns.hasOwnProperty(n)&&(r[n]=ns[n][t])}return as[t]}(this.size)),this._fontMetrics}getColor(){return this.phantom?"transparent":this.color}}cs.BASESIZE=6;var ps={pt:1,mm:7227/2540,cm:7227/254,in:72.27,bp:1.00375,pc:12,dd:1238/1157,cc:14856/1157,nd:685/642,nc:1370/107,sp:1/65536,px:1.00375},us={ex:!0,em:!0,mu:!0},ds=function(e){return"string"!=typeof e&&(e=e.unit),e in ps||e in us||"ex"===e},ms=function(e,t){var r;if(e.unit in ps)r=ps[e.unit]/t.fontMetrics().ptPerEm/t.sizeMultiplier;else if("mu"===e.unit)r=t.fontMetrics().cssEmPerMu;else{var n;if(n=t.style.isTight()?t.havingStyle(t.style.text()):t,"ex"===e.unit)r=n.fontMetrics().xHeight;else{if("em"!==e.unit)throw new Vi("Invalid unit: '"+e.unit+"'");r=n.fontMetrics().quad}n!==t&&(r*=n.sizeMultiplier/t.sizeMultiplier)}return Math.min(e.number*r,t.maxSize)},gs=function(e){return+e.toFixed(4)+"em"},fs=function(e){return e.filter((e=>e)).join(" ")},vs=function(e,t,r){if(this.classes=e||[],this.attributes={},this.height=0,this.depth=0,this.maxFontSize=0,this.style=r||{},t){t.style.isTight()&&this.classes.push("mtight");var n=t.getColor();n&&(this.style.color=n)}},bs=function(e){var t=document.createElement(e);for(var r in t.className=fs(this.classes),this.style)this.style.hasOwnProperty(r)&&(t.style[r]=this.style[r]);for(var n in this.attributes)this.attributes.hasOwnProperty(n)&&t.setAttribute(n,this.attributes[n]);for(var i=0;i<this.children.length;i++)t.appendChild(this.children[i].toNode());return t},ws=function(e){var t="<"+e;this.classes.length&&(t+=' class="'+qi.escape(fs(this.classes))+'"');var r="";for(var n in this.style)this.style.hasOwnProperty(n)&&(r+=qi.hyphenate(n)+":"+this.style[n]+";");for(var i in r&&(t+=' style="'+qi.escape(r)+'"'),this.attributes)this.attributes.hasOwnProperty(i)&&(t+=" "+i+'="'+qi.escape(this.attributes[i])+'"');t+=">";for(var s=0;s<this.children.length;s++)t+=this.children[s].toMarkup();return t+="</"+e+">"};class ys{constructor(e,t,r,n){this.children=void 0,this.attributes=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.width=void 0,this.maxFontSize=void 0,this.style=void 0,vs.call(this,e,r,n),this.children=t||[]}setAttribute(e,t){this.attributes[e]=t}hasClass(e){return qi.contains(this.classes,e)}toNode(){return bs.call(this,"span")}toMarkup(){return ws.call(this,"span")}}class xs{constructor(e,t,r,n){this.children=void 0,this.attributes=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.maxFontSize=void 0,this.style=void 0,vs.call(this,t,n),this.children=r||[],this.setAttribute("href",e)}setAttribute(e,t){this.attributes[e]=t}hasClass(e){return qi.contains(this.classes,e)}toNode(){return bs.call(this,"a")}toMarkup(){return ws.call(this,"a")}}class ks{constructor(e,t,r){this.src=void 0,this.alt=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.maxFontSize=void 0,this.style=void 0,this.alt=t,this.src=e,this.classes=["mord"],this.style=r}hasClass(e){return qi.contains(this.classes,e)}toNode(){var e=document.createElement("img");for(var t in e.src=this.src,e.alt=this.alt,e.className="mord",this.style)this.style.hasOwnProperty(t)&&(e.style[t]=this.style[t]);return e}toMarkup(){var e='<img src="'+qi.escape(this.src)+'" alt="'+qi.escape(this.alt)+'"',t="";for(var r in this.style)this.style.hasOwnProperty(r)&&(t+=qi.hyphenate(r)+":"+this.style[r]+";");return t&&(e+=' style="'+qi.escape(t)+'"'),e+="'/>"}}var _s={"î":"ı̂","ï":"ı̈","í":"ı́","ì":"ı̀"};class Ss{constructor(e,t,r,n,i,s,a,o){this.text=void 0,this.height=void 0,this.depth=void 0,this.italic=void 0,this.skew=void 0,this.width=void 0,this.maxFontSize=void 0,this.classes=void 0,this.style=void 0,this.text=e,this.height=t||0,this.depth=r||0,this.italic=n||0,this.skew=i||0,this.width=s||0,this.classes=a||[],this.style=o||{},this.maxFontSize=0;var l=function(e){for(var t=0;t<Wi.length;t++)for(var r=Wi[t],n=0;n<r.blocks.length;n++){var i=r.blocks[n];if(e>=i[0]&&e<=i[1])return r.name}return null}(this.text.charCodeAt(0));l&&this.classes.push(l+"_fallback"),/[îïíì]/.test(this.text)&&(this.text=_s[this.text])}hasClass(e){return qi.contains(this.classes,e)}toNode(){var e=document.createTextNode(this.text),t=null;for(var r in this.italic>0&&((t=document.createElement("span")).style.marginRight=gs(this.italic)),this.classes.length>0&&((t=t||document.createElement("span")).className=fs(this.classes)),this.style)this.style.hasOwnProperty(r)&&((t=t||document.createElement("span")).style[r]=this.style[r]);return t?(t.appendChild(e),t):e}toMarkup(){var e=!1,t="<span";this.classes.length&&(e=!0,t+=' class="',t+=qi.escape(fs(this.classes)),t+='"');var r="";for(var n in this.italic>0&&(r+="margin-right:"+this.italic+"em;"),this.style)this.style.hasOwnProperty(n)&&(r+=qi.hyphenate(n)+":"+this.style[n]+";");r&&(e=!0,t+=' style="'+qi.escape(r)+'"');var i=qi.escape(this.text);return e?(t+=">",t+=i,t+="</span>"):i}}class Cs{constructor(e,t){this.children=void 0,this.attributes=void 0,this.children=e||[],this.attributes=t||{}}toNode(){var e=document.createElementNS("http://www.w3.org/2000/svg","svg");for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&e.setAttribute(t,this.attributes[t]);for(var r=0;r<this.children.length;r++)e.appendChild(this.children[r].toNode());return e}toMarkup(){var e='<svg xmlns="http://www.w3.org/2000/svg"';for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&(e+=" "+t+'="'+qi.escape(this.attributes[t])+'"');e+=">";for(var r=0;r<this.children.length;r++)e+=this.children[r].toMarkup();return e+="</svg>"}}class Ms{constructor(e,t){this.pathName=void 0,this.alternate=void 0,this.pathName=e,this.alternate=t}toNode(){var e=document.createElementNS("http://www.w3.org/2000/svg","path");return this.alternate?e.setAttribute("d",this.alternate):e.setAttribute("d",es[this.pathName]),e}toMarkup(){return this.alternate?'<path d="'+qi.escape(this.alternate)+'"/>':'<path d="'+qi.escape(es[this.pathName])+'"/>'}}class Ps{constructor(e){this.attributes=void 0,this.attributes=e||{}}toNode(){var e=document.createElementNS("http://www.w3.org/2000/svg","line");for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&e.setAttribute(t,this.attributes[t]);return e}toMarkup(){var e="<line";for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&(e+=" "+t+'="'+qi.escape(this.attributes[t])+'"');return e+="/>"}}function zs(e){if(e instanceof Ss)return e;throw new Error("Expected symbolNode but got "+String(e)+".")}var As={bin:1,close:1,inner:1,open:1,punct:1,rel:1},Es={"accent-token":1,mathord:1,"op-token":1,spacing:1,textord:1},Ts={math:{},text:{}};function Vs(e,t,r,n,i,s){Ts[e][i]={font:t,group:r,replace:n},s&&n&&(Ts[e][n]=Ts[e][i])}var Bs="math",Ls="text",Ns="main",Rs="ams",qs="accent-token",Os="bin",Is="close",Ds="inner",Hs="mathord",$s="op-token",js="open",Fs="punct",Us="rel",Gs="spacing",Ks="textord";Vs(Bs,Ns,Us,"≡","\\equiv",!0),Vs(Bs,Ns,Us,"≺","\\prec",!0),Vs(Bs,Ns,Us,"≻","\\succ",!0),Vs(Bs,Ns,Us,"∼","\\sim",!0),Vs(Bs,Ns,Us,"⊥","\\perp"),Vs(Bs,Ns,Us,"⪯","\\preceq",!0),Vs(Bs,Ns,Us,"⪰","\\succeq",!0),Vs(Bs,Ns,Us,"≃","\\simeq",!0),Vs(Bs,Ns,Us,"∣","\\mid",!0),Vs(Bs,Ns,Us,"≪","\\ll",!0),Vs(Bs,Ns,Us,"≫","\\gg",!0),Vs(Bs,Ns,Us,"≍","\\asymp",!0),Vs(Bs,Ns,Us,"∥","\\parallel"),Vs(Bs,Ns,Us,"⋈","\\bowtie",!0),Vs(Bs,Ns,Us,"⌣","\\smile",!0),Vs(Bs,Ns,Us,"⊑","\\sqsubseteq",!0),Vs(Bs,Ns,Us,"⊒","\\sqsupseteq",!0),Vs(Bs,Ns,Us,"≐","\\doteq",!0),Vs(Bs,Ns,Us,"⌢","\\frown",!0),Vs(Bs,Ns,Us,"∋","\\ni",!0),Vs(Bs,Ns,Us,"∝","\\propto",!0),Vs(Bs,Ns,Us,"⊢","\\vdash",!0),Vs(Bs,Ns,Us,"⊣","\\dashv",!0),Vs(Bs,Ns,Us,"∋","\\owns"),Vs(Bs,Ns,Fs,".","\\ldotp"),Vs(Bs,Ns,Fs,"⋅","\\cdotp"),Vs(Bs,Ns,Ks,"#","\\#"),Vs(Ls,Ns,Ks,"#","\\#"),Vs(Bs,Ns,Ks,"&","\\&"),Vs(Ls,Ns,Ks,"&","\\&"),Vs(Bs,Ns,Ks,"ℵ","\\aleph",!0),Vs(Bs,Ns,Ks,"∀","\\forall",!0),Vs(Bs,Ns,Ks,"ℏ","\\hbar",!0),Vs(Bs,Ns,Ks,"∃","\\exists",!0),Vs(Bs,Ns,Ks,"∇","\\nabla",!0),Vs(Bs,Ns,Ks,"♭","\\flat",!0),Vs(Bs,Ns,Ks,"ℓ","\\ell",!0),Vs(Bs,Ns,Ks,"♮","\\natural",!0),Vs(Bs,Ns,Ks,"♣","\\clubsuit",!0),Vs(Bs,Ns,Ks,"℘","\\wp",!0),Vs(Bs,Ns,Ks,"♯","\\sharp",!0),Vs(Bs,Ns,Ks,"♢","\\diamondsuit",!0),Vs(Bs,Ns,Ks,"ℜ","\\Re",!0),Vs(Bs,Ns,Ks,"♡","\\heartsuit",!0),Vs(Bs,Ns,Ks,"ℑ","\\Im",!0),Vs(Bs,Ns,Ks,"♠","\\spadesuit",!0),Vs(Bs,Ns,Ks,"§","\\S",!0),Vs(Ls,Ns,Ks,"§","\\S"),Vs(Bs,Ns,Ks,"¶","\\P",!0),Vs(Ls,Ns,Ks,"¶","\\P"),Vs(Bs,Ns,Ks,"†","\\dag"),Vs(Ls,Ns,Ks,"†","\\dag"),Vs(Ls,Ns,Ks,"†","\\textdagger"),Vs(Bs,Ns,Ks,"‡","\\ddag"),Vs(Ls,Ns,Ks,"‡","\\ddag"),Vs(Ls,Ns,Ks,"‡","\\textdaggerdbl"),Vs(Bs,Ns,Is,"⎱","\\rmoustache",!0),Vs(Bs,Ns,js,"⎰","\\lmoustache",!0),Vs(Bs,Ns,Is,"⟯","\\rgroup",!0),Vs(Bs,Ns,js,"⟮","\\lgroup",!0),Vs(Bs,Ns,Os,"∓","\\mp",!0),Vs(Bs,Ns,Os,"⊖","\\ominus",!0),Vs(Bs,Ns,Os,"⊎","\\uplus",!0),Vs(Bs,Ns,Os,"⊓","\\sqcap",!0),Vs(Bs,Ns,Os,"∗","\\ast"),Vs(Bs,Ns,Os,"⊔","\\sqcup",!0),Vs(Bs,Ns,Os,"◯","\\bigcirc",!0),Vs(Bs,Ns,Os,"∙","\\bullet",!0),Vs(Bs,Ns,Os,"‡","\\ddagger"),Vs(Bs,Ns,Os,"≀","\\wr",!0),Vs(Bs,Ns,Os,"⨿","\\amalg"),Vs(Bs,Ns,Os,"&","\\And"),Vs(Bs,Ns,Us,"⟵","\\longleftarrow",!0),Vs(Bs,Ns,Us,"⇐","\\Leftarrow",!0),Vs(Bs,Ns,Us,"⟸","\\Longleftarrow",!0),Vs(Bs,Ns,Us,"⟶","\\longrightarrow",!0),Vs(Bs,Ns,Us,"⇒","\\Rightarrow",!0),Vs(Bs,Ns,Us,"⟹","\\Longrightarrow",!0),Vs(Bs,Ns,Us,"↔","\\leftrightarrow",!0),Vs(Bs,Ns,Us,"⟷","\\longleftrightarrow",!0),Vs(Bs,Ns,Us,"⇔","\\Leftrightarrow",!0),Vs(Bs,Ns,Us,"⟺","\\Longleftrightarrow",!0),Vs(Bs,Ns,Us,"↦","\\mapsto",!0),Vs(Bs,Ns,Us,"⟼","\\longmapsto",!0),Vs(Bs,Ns,Us,"↗","\\nearrow",!0),Vs(Bs,Ns,Us,"↩","\\hookleftarrow",!0),Vs(Bs,Ns,Us,"↪","\\hookrightarrow",!0),Vs(Bs,Ns,Us,"↘","\\searrow",!0),Vs(Bs,Ns,Us,"↼","\\leftharpoonup",!0),Vs(Bs,Ns,Us,"⇀","\\rightharpoonup",!0),Vs(Bs,Ns,Us,"↙","\\swarrow",!0),Vs(Bs,Ns,Us,"↽","\\leftharpoondown",!0),Vs(Bs,Ns,Us,"⇁","\\rightharpoondown",!0),Vs(Bs,Ns,Us,"↖","\\nwarrow",!0),Vs(Bs,Ns,Us,"⇌","\\rightleftharpoons",!0),Vs(Bs,Rs,Us,"≮","\\nless",!0),Vs(Bs,Rs,Us,"","\\@nleqslant"),Vs(Bs,Rs,Us,"","\\@nleqq"),Vs(Bs,Rs,Us,"⪇","\\lneq",!0),Vs(Bs,Rs,Us,"≨","\\lneqq",!0),Vs(Bs,Rs,Us,"","\\@lvertneqq"),Vs(Bs,Rs,Us,"⋦","\\lnsim",!0),Vs(Bs,Rs,Us,"⪉","\\lnapprox",!0),Vs(Bs,Rs,Us,"⊀","\\nprec",!0),Vs(Bs,Rs,Us,"⋠","\\npreceq",!0),Vs(Bs,Rs,Us,"⋨","\\precnsim",!0),Vs(Bs,Rs,Us,"⪹","\\precnapprox",!0),Vs(Bs,Rs,Us,"≁","\\nsim",!0),Vs(Bs,Rs,Us,"","\\@nshortmid"),Vs(Bs,Rs,Us,"∤","\\nmid",!0),Vs(Bs,Rs,Us,"⊬","\\nvdash",!0),Vs(Bs,Rs,Us,"⊭","\\nvDash",!0),Vs(Bs,Rs,Us,"⋪","\\ntriangleleft"),Vs(Bs,Rs,Us,"⋬","\\ntrianglelefteq",!0),Vs(Bs,Rs,Us,"⊊","\\subsetneq",!0),Vs(Bs,Rs,Us,"","\\@varsubsetneq"),Vs(Bs,Rs,Us,"⫋","\\subsetneqq",!0),Vs(Bs,Rs,Us,"","\\@varsubsetneqq"),Vs(Bs,Rs,Us,"≯","\\ngtr",!0),Vs(Bs,Rs,Us,"","\\@ngeqslant"),Vs(Bs,Rs,Us,"","\\@ngeqq"),Vs(Bs,Rs,Us,"⪈","\\gneq",!0),Vs(Bs,Rs,Us,"≩","\\gneqq",!0),Vs(Bs,Rs,Us,"","\\@gvertneqq"),Vs(Bs,Rs,Us,"⋧","\\gnsim",!0),Vs(Bs,Rs,Us,"⪊","\\gnapprox",!0),Vs(Bs,Rs,Us,"⊁","\\nsucc",!0),Vs(Bs,Rs,Us,"⋡","\\nsucceq",!0),Vs(Bs,Rs,Us,"⋩","\\succnsim",!0),Vs(Bs,Rs,Us,"⪺","\\succnapprox",!0),Vs(Bs,Rs,Us,"≆","\\ncong",!0),Vs(Bs,Rs,Us,"","\\@nshortparallel"),Vs(Bs,Rs,Us,"∦","\\nparallel",!0),Vs(Bs,Rs,Us,"⊯","\\nVDash",!0),Vs(Bs,Rs,Us,"⋫","\\ntriangleright"),Vs(Bs,Rs,Us,"⋭","\\ntrianglerighteq",!0),Vs(Bs,Rs,Us,"","\\@nsupseteqq"),Vs(Bs,Rs,Us,"⊋","\\supsetneq",!0),Vs(Bs,Rs,Us,"","\\@varsupsetneq"),Vs(Bs,Rs,Us,"⫌","\\supsetneqq",!0),Vs(Bs,Rs,Us,"","\\@varsupsetneqq"),Vs(Bs,Rs,Us,"⊮","\\nVdash",!0),Vs(Bs,Rs,Us,"⪵","\\precneqq",!0),Vs(Bs,Rs,Us,"⪶","\\succneqq",!0),Vs(Bs,Rs,Us,"","\\@nsubseteqq"),Vs(Bs,Rs,Os,"⊴","\\unlhd"),Vs(Bs,Rs,Os,"⊵","\\unrhd"),Vs(Bs,Rs,Us,"↚","\\nleftarrow",!0),Vs(Bs,Rs,Us,"↛","\\nrightarrow",!0),Vs(Bs,Rs,Us,"⇍","\\nLeftarrow",!0),Vs(Bs,Rs,Us,"⇏","\\nRightarrow",!0),Vs(Bs,Rs,Us,"↮","\\nleftrightarrow",!0),Vs(Bs,Rs,Us,"⇎","\\nLeftrightarrow",!0),Vs(Bs,Rs,Us,"△","\\vartriangle"),Vs(Bs,Rs,Ks,"ℏ","\\hslash"),Vs(Bs,Rs,Ks,"▽","\\triangledown"),Vs(Bs,Rs,Ks,"◊","\\lozenge"),Vs(Bs,Rs,Ks,"Ⓢ","\\circledS"),Vs(Bs,Rs,Ks,"®","\\circledR"),Vs(Ls,Rs,Ks,"®","\\circledR"),Vs(Bs,Rs,Ks,"∡","\\measuredangle",!0),Vs(Bs,Rs,Ks,"∄","\\nexists"),Vs(Bs,Rs,Ks,"℧","\\mho"),Vs(Bs,Rs,Ks,"Ⅎ","\\Finv",!0),Vs(Bs,Rs,Ks,"⅁","\\Game",!0),Vs(Bs,Rs,Ks,"‵","\\backprime"),Vs(Bs,Rs,Ks,"▲","\\blacktriangle"),Vs(Bs,Rs,Ks,"▼","\\blacktriangledown"),Vs(Bs,Rs,Ks,"■","\\blacksquare"),Vs(Bs,Rs,Ks,"⧫","\\blacklozenge"),Vs(Bs,Rs,Ks,"★","\\bigstar"),Vs(Bs,Rs,Ks,"∢","\\sphericalangle",!0),Vs(Bs,Rs,Ks,"∁","\\complement",!0),Vs(Bs,Rs,Ks,"ð","\\eth",!0),Vs(Ls,Ns,Ks,"ð","ð"),Vs(Bs,Rs,Ks,"╱","\\diagup"),Vs(Bs,Rs,Ks,"╲","\\diagdown"),Vs(Bs,Rs,Ks,"□","\\square"),Vs(Bs,Rs,Ks,"□","\\Box"),Vs(Bs,Rs,Ks,"◊","\\Diamond"),Vs(Bs,Rs,Ks,"¥","\\yen",!0),Vs(Ls,Rs,Ks,"¥","\\yen",!0),Vs(Bs,Rs,Ks,"✓","\\checkmark",!0),Vs(Ls,Rs,Ks,"✓","\\checkmark"),Vs(Bs,Rs,Ks,"ℶ","\\beth",!0),Vs(Bs,Rs,Ks,"ℸ","\\daleth",!0),Vs(Bs,Rs,Ks,"ℷ","\\gimel",!0),Vs(Bs,Rs,Ks,"ϝ","\\digamma",!0),Vs(Bs,Rs,Ks,"ϰ","\\varkappa"),Vs(Bs,Rs,js,"┌","\\@ulcorner",!0),Vs(Bs,Rs,Is,"┐","\\@urcorner",!0),Vs(Bs,Rs,js,"└","\\@llcorner",!0),Vs(Bs,Rs,Is,"┘","\\@lrcorner",!0),Vs(Bs,Rs,Us,"≦","\\leqq",!0),Vs(Bs,Rs,Us,"⩽","\\leqslant",!0),Vs(Bs,Rs,Us,"⪕","\\eqslantless",!0),Vs(Bs,Rs,Us,"≲","\\lesssim",!0),Vs(Bs,Rs,Us,"⪅","\\lessapprox",!0),Vs(Bs,Rs,Us,"≊","\\approxeq",!0),Vs(Bs,Rs,Os,"⋖","\\lessdot"),Vs(Bs,Rs,Us,"⋘","\\lll",!0),Vs(Bs,Rs,Us,"≶","\\lessgtr",!0),Vs(Bs,Rs,Us,"⋚","\\lesseqgtr",!0),Vs(Bs,Rs,Us,"⪋","\\lesseqqgtr",!0),Vs(Bs,Rs,Us,"≑","\\doteqdot"),Vs(Bs,Rs,Us,"≓","\\risingdotseq",!0),Vs(Bs,Rs,Us,"≒","\\fallingdotseq",!0),Vs(Bs,Rs,Us,"∽","\\backsim",!0),Vs(Bs,Rs,Us,"⋍","\\backsimeq",!0),Vs(Bs,Rs,Us,"⫅","\\subseteqq",!0),Vs(Bs,Rs,Us,"⋐","\\Subset",!0),Vs(Bs,Rs,Us,"⊏","\\sqsubset",!0),Vs(Bs,Rs,Us,"≼","\\preccurlyeq",!0),Vs(Bs,Rs,Us,"⋞","\\curlyeqprec",!0),Vs(Bs,Rs,Us,"≾","\\precsim",!0),Vs(Bs,Rs,Us,"⪷","\\precapprox",!0),Vs(Bs,Rs,Us,"⊲","\\vartriangleleft"),Vs(Bs,Rs,Us,"⊴","\\trianglelefteq"),Vs(Bs,Rs,Us,"⊨","\\vDash",!0),Vs(Bs,Rs,Us,"⊪","\\Vvdash",!0),Vs(Bs,Rs,Us,"⌣","\\smallsmile"),Vs(Bs,Rs,Us,"⌢","\\smallfrown"),Vs(Bs,Rs,Us,"≏","\\bumpeq",!0),Vs(Bs,Rs,Us,"≎","\\Bumpeq",!0),Vs(Bs,Rs,Us,"≧","\\geqq",!0),Vs(Bs,Rs,Us,"⩾","\\geqslant",!0),Vs(Bs,Rs,Us,"⪖","\\eqslantgtr",!0),Vs(Bs,Rs,Us,"≳","\\gtrsim",!0),Vs(Bs,Rs,Us,"⪆","\\gtrapprox",!0),Vs(Bs,Rs,Os,"⋗","\\gtrdot"),Vs(Bs,Rs,Us,"⋙","\\ggg",!0),Vs(Bs,Rs,Us,"≷","\\gtrless",!0),Vs(Bs,Rs,Us,"⋛","\\gtreqless",!0),Vs(Bs,Rs,Us,"⪌","\\gtreqqless",!0),Vs(Bs,Rs,Us,"≖","\\eqcirc",!0),Vs(Bs,Rs,Us,"≗","\\circeq",!0),Vs(Bs,Rs,Us,"≜","\\triangleq",!0),Vs(Bs,Rs,Us,"∼","\\thicksim"),Vs(Bs,Rs,Us,"≈","\\thickapprox"),Vs(Bs,Rs,Us,"⫆","\\supseteqq",!0),Vs(Bs,Rs,Us,"⋑","\\Supset",!0),Vs(Bs,Rs,Us,"⊐","\\sqsupset",!0),Vs(Bs,Rs,Us,"≽","\\succcurlyeq",!0),Vs(Bs,Rs,Us,"⋟","\\curlyeqsucc",!0),Vs(Bs,Rs,Us,"≿","\\succsim",!0),Vs(Bs,Rs,Us,"⪸","\\succapprox",!0),Vs(Bs,Rs,Us,"⊳","\\vartriangleright"),Vs(Bs,Rs,Us,"⊵","\\trianglerighteq"),Vs(Bs,Rs,Us,"⊩","\\Vdash",!0),Vs(Bs,Rs,Us,"∣","\\shortmid"),Vs(Bs,Rs,Us,"∥","\\shortparallel"),Vs(Bs,Rs,Us,"≬","\\between",!0),Vs(Bs,Rs,Us,"⋔","\\pitchfork",!0),Vs(Bs,Rs,Us,"∝","\\varpropto"),Vs(Bs,Rs,Us,"◀","\\blacktriangleleft"),Vs(Bs,Rs,Us,"∴","\\therefore",!0),Vs(Bs,Rs,Us,"∍","\\backepsilon"),Vs(Bs,Rs,Us,"▶","\\blacktriangleright"),Vs(Bs,Rs,Us,"∵","\\because",!0),Vs(Bs,Rs,Us,"⋘","\\llless"),Vs(Bs,Rs,Us,"⋙","\\gggtr"),Vs(Bs,Rs,Os,"⊲","\\lhd"),Vs(Bs,Rs,Os,"⊳","\\rhd"),Vs(Bs,Rs,Us,"≂","\\eqsim",!0),Vs(Bs,Ns,Us,"⋈","\\Join"),Vs(Bs,Rs,Us,"≑","\\Doteq",!0),Vs(Bs,Rs,Os,"∔","\\dotplus",!0),Vs(Bs,Rs,Os,"∖","\\smallsetminus"),Vs(Bs,Rs,Os,"⋒","\\Cap",!0),Vs(Bs,Rs,Os,"⋓","\\Cup",!0),Vs(Bs,Rs,Os,"⩞","\\doublebarwedge",!0),Vs(Bs,Rs,Os,"⊟","\\boxminus",!0),Vs(Bs,Rs,Os,"⊞","\\boxplus",!0),Vs(Bs,Rs,Os,"⋇","\\divideontimes",!0),Vs(Bs,Rs,Os,"⋉","\\ltimes",!0),Vs(Bs,Rs,Os,"⋊","\\rtimes",!0),Vs(Bs,Rs,Os,"⋋","\\leftthreetimes",!0),Vs(Bs,Rs,Os,"⋌","\\rightthreetimes",!0),Vs(Bs,Rs,Os,"⋏","\\curlywedge",!0),Vs(Bs,Rs,Os,"⋎","\\curlyvee",!0),Vs(Bs,Rs,Os,"⊝","\\circleddash",!0),Vs(Bs,Rs,Os,"⊛","\\circledast",!0),Vs(Bs,Rs,Os,"⋅","\\centerdot"),Vs(Bs,Rs,Os,"⊺","\\intercal",!0),Vs(Bs,Rs,Os,"⋒","\\doublecap"),Vs(Bs,Rs,Os,"⋓","\\doublecup"),Vs(Bs,Rs,Os,"⊠","\\boxtimes",!0),Vs(Bs,Rs,Us,"⇢","\\dashrightarrow",!0),Vs(Bs,Rs,Us,"⇠","\\dashleftarrow",!0),Vs(Bs,Rs,Us,"⇇","\\leftleftarrows",!0),Vs(Bs,Rs,Us,"⇆","\\leftrightarrows",!0),Vs(Bs,Rs,Us,"⇚","\\Lleftarrow",!0),Vs(Bs,Rs,Us,"↞","\\twoheadleftarrow",!0),Vs(Bs,Rs,Us,"↢","\\leftarrowtail",!0),Vs(Bs,Rs,Us,"↫","\\looparrowleft",!0),Vs(Bs,Rs,Us,"⇋","\\leftrightharpoons",!0),Vs(Bs,Rs,Us,"↶","\\curvearrowleft",!0),Vs(Bs,Rs,Us,"↺","\\circlearrowleft",!0),Vs(Bs,Rs,Us,"↰","\\Lsh",!0),Vs(Bs,Rs,Us,"⇈","\\upuparrows",!0),Vs(Bs,Rs,Us,"↿","\\upharpoonleft",!0),Vs(Bs,Rs,Us,"⇃","\\downharpoonleft",!0),Vs(Bs,Ns,Us,"⊶","\\origof",!0),Vs(Bs,Ns,Us,"⊷","\\imageof",!0),Vs(Bs,Rs,Us,"⊸","\\multimap",!0),Vs(Bs,Rs,Us,"↭","\\leftrightsquigarrow",!0),Vs(Bs,Rs,Us,"⇉","\\rightrightarrows",!0),Vs(Bs,Rs,Us,"⇄","\\rightleftarrows",!0),Vs(Bs,Rs,Us,"↠","\\twoheadrightarrow",!0),Vs(Bs,Rs,Us,"↣","\\rightarrowtail",!0),Vs(Bs,Rs,Us,"↬","\\looparrowright",!0),Vs(Bs,Rs,Us,"↷","\\curvearrowright",!0),Vs(Bs,Rs,Us,"↻","\\circlearrowright",!0),Vs(Bs,Rs,Us,"↱","\\Rsh",!0),Vs(Bs,Rs,Us,"⇊","\\downdownarrows",!0),Vs(Bs,Rs,Us,"↾","\\upharpoonright",!0),Vs(Bs,Rs,Us,"⇂","\\downharpoonright",!0),Vs(Bs,Rs,Us,"⇝","\\rightsquigarrow",!0),Vs(Bs,Rs,Us,"⇝","\\leadsto"),Vs(Bs,Rs,Us,"⇛","\\Rrightarrow",!0),Vs(Bs,Rs,Us,"↾","\\restriction"),Vs(Bs,Ns,Ks,"‘","`"),Vs(Bs,Ns,Ks,"$","\\$"),Vs(Ls,Ns,Ks,"$","\\$"),Vs(Ls,Ns,Ks,"$","\\textdollar"),Vs(Bs,Ns,Ks,"%","\\%"),Vs(Ls,Ns,Ks,"%","\\%"),Vs(Bs,Ns,Ks,"_","\\_"),Vs(Ls,Ns,Ks,"_","\\_"),Vs(Ls,Ns,Ks,"_","\\textunderscore"),Vs(Bs,Ns,Ks,"∠","\\angle",!0),Vs(Bs,Ns,Ks,"∞","\\infty",!0),Vs(Bs,Ns,Ks,"′","\\prime"),Vs(Bs,Ns,Ks,"△","\\triangle"),Vs(Bs,Ns,Ks,"Γ","\\Gamma",!0),Vs(Bs,Ns,Ks,"Δ","\\Delta",!0),Vs(Bs,Ns,Ks,"Θ","\\Theta",!0),Vs(Bs,Ns,Ks,"Λ","\\Lambda",!0),Vs(Bs,Ns,Ks,"Ξ","\\Xi",!0),Vs(Bs,Ns,Ks,"Π","\\Pi",!0),Vs(Bs,Ns,Ks,"Σ","\\Sigma",!0),Vs(Bs,Ns,Ks,"Υ","\\Upsilon",!0),Vs(Bs,Ns,Ks,"Φ","\\Phi",!0),Vs(Bs,Ns,Ks,"Ψ","\\Psi",!0),Vs(Bs,Ns,Ks,"Ω","\\Omega",!0),Vs(Bs,Ns,Ks,"A","Α"),Vs(Bs,Ns,Ks,"B","Β"),Vs(Bs,Ns,Ks,"E","Ε"),Vs(Bs,Ns,Ks,"Z","Ζ"),Vs(Bs,Ns,Ks,"H","Η"),Vs(Bs,Ns,Ks,"I","Ι"),Vs(Bs,Ns,Ks,"K","Κ"),Vs(Bs,Ns,Ks,"M","Μ"),Vs(Bs,Ns,Ks,"N","Ν"),Vs(Bs,Ns,Ks,"O","Ο"),Vs(Bs,Ns,Ks,"P","Ρ"),Vs(Bs,Ns,Ks,"T","Τ"),Vs(Bs,Ns,Ks,"X","Χ"),Vs(Bs,Ns,Ks,"¬","\\neg",!0),Vs(Bs,Ns,Ks,"¬","\\lnot"),Vs(Bs,Ns,Ks,"⊤","\\top"),Vs(Bs,Ns,Ks,"⊥","\\bot"),Vs(Bs,Ns,Ks,"∅","\\emptyset"),Vs(Bs,Rs,Ks,"∅","\\varnothing"),Vs(Bs,Ns,Hs,"α","\\alpha",!0),Vs(Bs,Ns,Hs,"β","\\beta",!0),Vs(Bs,Ns,Hs,"γ","\\gamma",!0),Vs(Bs,Ns,Hs,"δ","\\delta",!0),Vs(Bs,Ns,Hs,"ϵ","\\epsilon",!0),Vs(Bs,Ns,Hs,"ζ","\\zeta",!0),Vs(Bs,Ns,Hs,"η","\\eta",!0),Vs(Bs,Ns,Hs,"θ","\\theta",!0),Vs(Bs,Ns,Hs,"ι","\\iota",!0),Vs(Bs,Ns,Hs,"κ","\\kappa",!0),Vs(Bs,Ns,Hs,"λ","\\lambda",!0),Vs(Bs,Ns,Hs,"μ","\\mu",!0),Vs(Bs,Ns,Hs,"ν","\\nu",!0),Vs(Bs,Ns,Hs,"ξ","\\xi",!0),Vs(Bs,Ns,Hs,"ο","\\omicron",!0),Vs(Bs,Ns,Hs,"π","\\pi",!0),Vs(Bs,Ns,Hs,"ρ","\\rho",!0),Vs(Bs,Ns,Hs,"σ","\\sigma",!0),Vs(Bs,Ns,Hs,"τ","\\tau",!0),Vs(Bs,Ns,Hs,"υ","\\upsilon",!0),Vs(Bs,Ns,Hs,"ϕ","\\phi",!0),Vs(Bs,Ns,Hs,"χ","\\chi",!0),Vs(Bs,Ns,Hs,"ψ","\\psi",!0),Vs(Bs,Ns,Hs,"ω","\\omega",!0),Vs(Bs,Ns,Hs,"ε","\\varepsilon",!0),Vs(Bs,Ns,Hs,"ϑ","\\vartheta",!0),Vs(Bs,Ns,Hs,"ϖ","\\varpi",!0),Vs(Bs,Ns,Hs,"ϱ","\\varrho",!0),Vs(Bs,Ns,Hs,"ς","\\varsigma",!0),Vs(Bs,Ns,Hs,"φ","\\varphi",!0),Vs(Bs,Ns,Os,"∗","*",!0),Vs(Bs,Ns,Os,"+","+"),Vs(Bs,Ns,Os,"−","-",!0),Vs(Bs,Ns,Os,"⋅","\\cdot",!0),Vs(Bs,Ns,Os,"∘","\\circ",!0),Vs(Bs,Ns,Os,"÷","\\div",!0),Vs(Bs,Ns,Os,"±","\\pm",!0),Vs(Bs,Ns,Os,"×","\\times",!0),Vs(Bs,Ns,Os,"∩","\\cap",!0),Vs(Bs,Ns,Os,"∪","\\cup",!0),Vs(Bs,Ns,Os,"∖","\\setminus",!0),Vs(Bs,Ns,Os,"∧","\\land"),Vs(Bs,Ns,Os,"∨","\\lor"),Vs(Bs,Ns,Os,"∧","\\wedge",!0),Vs(Bs,Ns,Os,"∨","\\vee",!0),Vs(Bs,Ns,Ks,"√","\\surd"),Vs(Bs,Ns,js,"⟨","\\langle",!0),Vs(Bs,Ns,js,"∣","\\lvert"),Vs(Bs,Ns,js,"∥","\\lVert"),Vs(Bs,Ns,Is,"?","?"),Vs(Bs,Ns,Is,"!","!"),Vs(Bs,Ns,Is,"⟩","\\rangle",!0),Vs(Bs,Ns,Is,"∣","\\rvert"),Vs(Bs,Ns,Is,"∥","\\rVert"),Vs(Bs,Ns,Us,"=","="),Vs(Bs,Ns,Us,":",":"),Vs(Bs,Ns,Us,"≈","\\approx",!0),Vs(Bs,Ns,Us,"≅","\\cong",!0),Vs(Bs,Ns,Us,"≥","\\ge"),Vs(Bs,Ns,Us,"≥","\\geq",!0),Vs(Bs,Ns,Us,"←","\\gets"),Vs(Bs,Ns,Us,">","\\gt",!0),Vs(Bs,Ns,Us,"∈","\\in",!0),Vs(Bs,Ns,Us,"","\\@not"),Vs(Bs,Ns,Us,"⊂","\\subset",!0),Vs(Bs,Ns,Us,"⊃","\\supset",!0),Vs(Bs,Ns,Us,"⊆","\\subseteq",!0),Vs(Bs,Ns,Us,"⊇","\\supseteq",!0),Vs(Bs,Rs,Us,"⊈","\\nsubseteq",!0),Vs(Bs,Rs,Us,"⊉","\\nsupseteq",!0),Vs(Bs,Ns,Us,"⊨","\\models"),Vs(Bs,Ns,Us,"←","\\leftarrow",!0),Vs(Bs,Ns,Us,"≤","\\le"),Vs(Bs,Ns,Us,"≤","\\leq",!0),Vs(Bs,Ns,Us,"<","\\lt",!0),Vs(Bs,Ns,Us,"→","\\rightarrow",!0),Vs(Bs,Ns,Us,"→","\\to"),Vs(Bs,Rs,Us,"≱","\\ngeq",!0),Vs(Bs,Rs,Us,"≰","\\nleq",!0),Vs(Bs,Ns,Gs," ","\\ "),Vs(Bs,Ns,Gs," ","\\space"),Vs(Bs,Ns,Gs," ","\\nobreakspace"),Vs(Ls,Ns,Gs," ","\\ "),Vs(Ls,Ns,Gs," "," "),Vs(Ls,Ns,Gs," ","\\space"),Vs(Ls,Ns,Gs," ","\\nobreakspace"),Vs(Bs,Ns,Gs,null,"\\nobreak"),Vs(Bs,Ns,Gs,null,"\\allowbreak"),Vs(Bs,Ns,Fs,",",","),Vs(Bs,Ns,Fs,";",";"),Vs(Bs,Rs,Os,"⊼","\\barwedge",!0),Vs(Bs,Rs,Os,"⊻","\\veebar",!0),Vs(Bs,Ns,Os,"⊙","\\odot",!0),Vs(Bs,Ns,Os,"⊕","\\oplus",!0),Vs(Bs,Ns,Os,"⊗","\\otimes",!0),Vs(Bs,Ns,Ks,"∂","\\partial",!0),Vs(Bs,Ns,Os,"⊘","\\oslash",!0),Vs(Bs,Rs,Os,"⊚","\\circledcirc",!0),Vs(Bs,Rs,Os,"⊡","\\boxdot",!0),Vs(Bs,Ns,Os,"△","\\bigtriangleup"),Vs(Bs,Ns,Os,"▽","\\bigtriangledown"),Vs(Bs,Ns,Os,"†","\\dagger"),Vs(Bs,Ns,Os,"⋄","\\diamond"),Vs(Bs,Ns,Os,"⋆","\\star"),Vs(Bs,Ns,Os,"◃","\\triangleleft"),Vs(Bs,Ns,Os,"▹","\\triangleright"),Vs(Bs,Ns,js,"{","\\{"),Vs(Ls,Ns,Ks,"{","\\{"),Vs(Ls,Ns,Ks,"{","\\textbraceleft"),Vs(Bs,Ns,Is,"}","\\}"),Vs(Ls,Ns,Ks,"}","\\}"),Vs(Ls,Ns,Ks,"}","\\textbraceright"),Vs(Bs,Ns,js,"{","\\lbrace"),Vs(Bs,Ns,Is,"}","\\rbrace"),Vs(Bs,Ns,js,"[","\\lbrack",!0),Vs(Ls,Ns,Ks,"[","\\lbrack",!0),Vs(Bs,Ns,Is,"]","\\rbrack",!0),Vs(Ls,Ns,Ks,"]","\\rbrack",!0),Vs(Bs,Ns,js,"(","\\lparen",!0),Vs(Bs,Ns,Is,")","\\rparen",!0),Vs(Ls,Ns,Ks,"<","\\textless",!0),Vs(Ls,Ns,Ks,">","\\textgreater",!0),Vs(Bs,Ns,js,"⌊","\\lfloor",!0),Vs(Bs,Ns,Is,"⌋","\\rfloor",!0),Vs(Bs,Ns,js,"⌈","\\lceil",!0),Vs(Bs,Ns,Is,"⌉","\\rceil",!0),Vs(Bs,Ns,Ks,"\\","\\backslash"),Vs(Bs,Ns,Ks,"∣","|"),Vs(Bs,Ns,Ks,"∣","\\vert"),Vs(Ls,Ns,Ks,"|","\\textbar",!0),Vs(Bs,Ns,Ks,"∥","\\|"),Vs(Bs,Ns,Ks,"∥","\\Vert"),Vs(Ls,Ns,Ks,"∥","\\textbardbl"),Vs(Ls,Ns,Ks,"~","\\textasciitilde"),Vs(Ls,Ns,Ks,"\\","\\textbackslash"),Vs(Ls,Ns,Ks,"^","\\textasciicircum"),Vs(Bs,Ns,Us,"↑","\\uparrow",!0),Vs(Bs,Ns,Us,"⇑","\\Uparrow",!0),Vs(Bs,Ns,Us,"↓","\\downarrow",!0),Vs(Bs,Ns,Us,"⇓","\\Downarrow",!0),Vs(Bs,Ns,Us,"↕","\\updownarrow",!0),Vs(Bs,Ns,Us,"⇕","\\Updownarrow",!0),Vs(Bs,Ns,$s,"∐","\\coprod"),Vs(Bs,Ns,$s,"⋁","\\bigvee"),Vs(Bs,Ns,$s,"⋀","\\bigwedge"),Vs(Bs,Ns,$s,"⨄","\\biguplus"),Vs(Bs,Ns,$s,"⋂","\\bigcap"),Vs(Bs,Ns,$s,"⋃","\\bigcup"),Vs(Bs,Ns,$s,"∫","\\int"),Vs(Bs,Ns,$s,"∫","\\intop"),Vs(Bs,Ns,$s,"∬","\\iint"),Vs(Bs,Ns,$s,"∭","\\iiint"),Vs(Bs,Ns,$s,"∏","\\prod"),Vs(Bs,Ns,$s,"∑","\\sum"),Vs(Bs,Ns,$s,"⨂","\\bigotimes"),Vs(Bs,Ns,$s,"⨁","\\bigoplus"),Vs(Bs,Ns,$s,"⨀","\\bigodot"),Vs(Bs,Ns,$s,"∮","\\oint"),Vs(Bs,Ns,$s,"∯","\\oiint"),Vs(Bs,Ns,$s,"∰","\\oiiint"),Vs(Bs,Ns,$s,"⨆","\\bigsqcup"),Vs(Bs,Ns,$s,"∫","\\smallint"),Vs(Ls,Ns,Ds,"…","\\textellipsis"),Vs(Bs,Ns,Ds,"…","\\mathellipsis"),Vs(Ls,Ns,Ds,"…","\\ldots",!0),Vs(Bs,Ns,Ds,"…","\\ldots",!0),Vs(Bs,Ns,Ds,"⋯","\\@cdots",!0),Vs(Bs,Ns,Ds,"⋱","\\ddots",!0),Vs(Bs,Ns,Ks,"⋮","\\varvdots"),Vs(Bs,Ns,qs,"ˊ","\\acute"),Vs(Bs,Ns,qs,"ˋ","\\grave"),Vs(Bs,Ns,qs,"¨","\\ddot"),Vs(Bs,Ns,qs,"~","\\tilde"),Vs(Bs,Ns,qs,"ˉ","\\bar"),Vs(Bs,Ns,qs,"˘","\\breve"),Vs(Bs,Ns,qs,"ˇ","\\check"),Vs(Bs,Ns,qs,"^","\\hat"),Vs(Bs,Ns,qs,"⃗","\\vec"),Vs(Bs,Ns,qs,"˙","\\dot"),Vs(Bs,Ns,qs,"˚","\\mathring"),Vs(Bs,Ns,Hs,"","\\@imath"),Vs(Bs,Ns,Hs,"","\\@jmath"),Vs(Bs,Ns,Ks,"ı","ı"),Vs(Bs,Ns,Ks,"ȷ","ȷ"),Vs(Ls,Ns,Ks,"ı","\\i",!0),Vs(Ls,Ns,Ks,"ȷ","\\j",!0),Vs(Ls,Ns,Ks,"ß","\\ss",!0),Vs(Ls,Ns,Ks,"æ","\\ae",!0),Vs(Ls,Ns,Ks,"œ","\\oe",!0),Vs(Ls,Ns,Ks,"ø","\\o",!0),Vs(Ls,Ns,Ks,"Æ","\\AE",!0),Vs(Ls,Ns,Ks,"Œ","\\OE",!0),Vs(Ls,Ns,Ks,"Ø","\\O",!0),Vs(Ls,Ns,qs,"ˊ","\\'"),Vs(Ls,Ns,qs,"ˋ","\\`"),Vs(Ls,Ns,qs,"ˆ","\\^"),Vs(Ls,Ns,qs,"˜","\\~"),Vs(Ls,Ns,qs,"ˉ","\\="),Vs(Ls,Ns,qs,"˘","\\u"),Vs(Ls,Ns,qs,"˙","\\."),Vs(Ls,Ns,qs,"¸","\\c"),Vs(Ls,Ns,qs,"˚","\\r"),Vs(Ls,Ns,qs,"ˇ","\\v"),Vs(Ls,Ns,qs,"¨",'\\"'),Vs(Ls,Ns,qs,"˝","\\H"),Vs(Ls,Ns,qs,"◯","\\textcircled");var Ys={"--":!0,"---":!0,"``":!0,"''":!0};Vs(Ls,Ns,Ks,"–","--",!0),Vs(Ls,Ns,Ks,"–","\\textendash"),Vs(Ls,Ns,Ks,"—","---",!0),Vs(Ls,Ns,Ks,"—","\\textemdash"),Vs(Ls,Ns,Ks,"‘","`",!0),Vs(Ls,Ns,Ks,"‘","\\textquoteleft"),Vs(Ls,Ns,Ks,"’","'",!0),Vs(Ls,Ns,Ks,"’","\\textquoteright"),Vs(Ls,Ns,Ks,"“","``",!0),Vs(Ls,Ns,Ks,"“","\\textquotedblleft"),Vs(Ls,Ns,Ks,"”","''",!0),Vs(Ls,Ns,Ks,"”","\\textquotedblright"),Vs(Bs,Ns,Ks,"°","\\degree",!0),Vs(Ls,Ns,Ks,"°","\\degree"),Vs(Ls,Ns,Ks,"°","\\textdegree",!0),Vs(Bs,Ns,Ks,"£","\\pounds"),Vs(Bs,Ns,Ks,"£","\\mathsterling",!0),Vs(Ls,Ns,Ks,"£","\\pounds"),Vs(Ls,Ns,Ks,"£","\\textsterling",!0),Vs(Bs,Rs,Ks,"✠","\\maltese"),Vs(Ls,Rs,Ks,"✠","\\maltese");for(var Xs='0123456789/@."',Ws=0;Ws<14;Ws++){var Zs=Xs.charAt(Ws);Vs(Bs,Ns,Ks,Zs,Zs)}for(var Qs='0123456789!@*()-=+";:?/.,',Js=0;Js<25;Js++){var ea=Qs.charAt(Js);Vs(Ls,Ns,Ks,ea,ea)}for(var ta="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",ra=0;ra<52;ra++){var na=ta.charAt(ra);Vs(Bs,Ns,Hs,na,na),Vs(Ls,Ns,Ks,na,na)}Vs(Bs,Rs,Ks,"C","ℂ"),Vs(Ls,Rs,Ks,"C","ℂ"),Vs(Bs,Rs,Ks,"H","ℍ"),Vs(Ls,Rs,Ks,"H","ℍ"),Vs(Bs,Rs,Ks,"N","ℕ"),Vs(Ls,Rs,Ks,"N","ℕ"),Vs(Bs,Rs,Ks,"P","ℙ"),Vs(Ls,Rs,Ks,"P","ℙ"),Vs(Bs,Rs,Ks,"Q","ℚ"),Vs(Ls,Rs,Ks,"Q","ℚ"),Vs(Bs,Rs,Ks,"R","ℝ"),Vs(Ls,Rs,Ks,"R","ℝ"),Vs(Bs,Rs,Ks,"Z","ℤ"),Vs(Ls,Rs,Ks,"Z","ℤ"),Vs(Bs,Ns,Hs,"h","ℎ"),Vs(Ls,Ns,Hs,"h","ℎ");for(var ia="",sa=0;sa<52;sa++){var aa=ta.charAt(sa);Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56320+sa)),Vs(Ls,Ns,Ks,aa,ia),Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56372+sa)),Vs(Ls,Ns,Ks,aa,ia),Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56424+sa)),Vs(Ls,Ns,Ks,aa,ia),Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56580+sa)),Vs(Ls,Ns,Ks,aa,ia),Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56684+sa)),Vs(Ls,Ns,Ks,aa,ia),Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56736+sa)),Vs(Ls,Ns,Ks,aa,ia),Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56788+sa)),Vs(Ls,Ns,Ks,aa,ia),Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56840+sa)),Vs(Ls,Ns,Ks,aa,ia),Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56944+sa)),Vs(Ls,Ns,Ks,aa,ia),sa<26&&(Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56632+sa)),Vs(Ls,Ns,Ks,aa,ia),Vs(Bs,Ns,Hs,aa,ia=String.fromCharCode(55349,56476+sa)),Vs(Ls,Ns,Ks,aa,ia))}Vs(Bs,Ns,Hs,"k",ia=String.fromCharCode(55349,56668)),Vs(Ls,Ns,Ks,"k",ia);for(var oa=0;oa<10;oa++){var la=oa.toString();Vs(Bs,Ns,Hs,la,ia=String.fromCharCode(55349,57294+oa)),Vs(Ls,Ns,Ks,la,ia),Vs(Bs,Ns,Hs,la,ia=String.fromCharCode(55349,57314+oa)),Vs(Ls,Ns,Ks,la,ia),Vs(Bs,Ns,Hs,la,ia=String.fromCharCode(55349,57324+oa)),Vs(Ls,Ns,Ks,la,ia),Vs(Bs,Ns,Hs,la,ia=String.fromCharCode(55349,57334+oa)),Vs(Ls,Ns,Ks,la,ia)}for(var ha="ÐÞþ",ca=0;ca<3;ca++){var pa=ha.charAt(ca);Vs(Bs,Ns,Hs,pa,pa),Vs(Ls,Ns,Ks,pa,pa)}var ua=[["mathbf","textbf","Main-Bold"],["mathbf","textbf","Main-Bold"],["mathnormal","textit","Math-Italic"],["mathnormal","textit","Math-Italic"],["boldsymbol","boldsymbol","Main-BoldItalic"],["boldsymbol","boldsymbol","Main-BoldItalic"],["mathscr","textscr","Script-Regular"],["","",""],["","",""],["","",""],["mathfrak","textfrak","Fraktur-Regular"],["mathfrak","textfrak","Fraktur-Regular"],["mathbb","textbb","AMS-Regular"],["mathbb","textbb","AMS-Regular"],["mathboldfrak","textboldfrak","Fraktur-Regular"],["mathboldfrak","textboldfrak","Fraktur-Regular"],["mathsf","textsf","SansSerif-Regular"],["mathsf","textsf","SansSerif-Regular"],["mathboldsf","textboldsf","SansSerif-Bold"],["mathboldsf","textboldsf","SansSerif-Bold"],["mathitsf","textitsf","SansSerif-Italic"],["mathitsf","textitsf","SansSerif-Italic"],["","",""],["","",""],["mathtt","texttt","Typewriter-Regular"],["mathtt","texttt","Typewriter-Regular"]],da=[["mathbf","textbf","Main-Bold"],["","",""],["mathsf","textsf","SansSerif-Regular"],["mathboldsf","textboldsf","SansSerif-Bold"],["mathtt","texttt","Typewriter-Regular"]],ma=function(e,t,r){return Ts[r][e]&&Ts[r][e].replace&&(e=Ts[r][e].replace),{value:e,metrics:ss(e,t,r)}},ga=function(e,t,r,n,i){var s,a=ma(e,t,r),o=a.metrics;if(e=a.value,o){var l=o.italic;("text"===r||n&&"mathit"===n.font)&&(l=0),s=new Ss(e,o.height,o.depth,l,o.skew,o.width,i)}else"undefined"!=typeof console&&console.warn("No character metrics for '"+e+"' in style '"+t+"' and mode '"+r+"'"),s=new Ss(e,0,0,0,0,0,i);if(n){s.maxFontSize=n.sizeMultiplier,n.style.isTight()&&s.classes.push("mtight");var h=n.getColor();h&&(s.style.color=h)}return s},fa=(e,t)=>{if(fs(e.classes)!==fs(t.classes)||e.skew!==t.skew||e.maxFontSize!==t.maxFontSize)return!1;if(1===e.classes.length){var r=e.classes[0];if("mbin"===r||"mord"===r)return!1}for(var n in e.style)if(e.style.hasOwnProperty(n)&&e.style[n]!==t.style[n])return!1;for(var i in t.style)if(t.style.hasOwnProperty(i)&&e.style[i]!==t.style[i])return!1;return!0},va=function(e){for(var t=0,r=0,n=0,i=0;i<e.children.length;i++){var s=e.children[i];s.height>t&&(t=s.height),s.depth>r&&(r=s.depth),s.maxFontSize>n&&(n=s.maxFontSize)}e.height=t,e.depth=r,e.maxFontSize=n},ba=function(e,t,r,n){var i=new ys(e,t,r,n);return va(i),i},wa=(e,t,r,n)=>new ys(e,t,r,n),ya=function(e){var t=new ts(e);return va(t),t},xa=function(e,t,r){var n="";switch(e){case"amsrm":n="AMS";break;case"textrm":n="Main";break;case"textsf":n="SansSerif";break;case"texttt":n="Typewriter";break;default:n=e}return n+"-"+("textbf"===t&&"textit"===r?"BoldItalic":"textbf"===t?"Bold":"textit"===t?"Italic":"Regular")},ka={mathbf:{variant:"bold",fontName:"Main-Bold"},mathrm:{variant:"normal",fontName:"Main-Regular"},textit:{variant:"italic",fontName:"Main-Italic"},mathit:{variant:"italic",fontName:"Main-Italic"},mathnormal:{variant:"italic",fontName:"Math-Italic"},mathbb:{variant:"double-struck",fontName:"AMS-Regular"},mathcal:{variant:"script",fontName:"Caligraphic-Regular"},mathfrak:{variant:"fraktur",fontName:"Fraktur-Regular"},mathscr:{variant:"script",fontName:"Script-Regular"},mathsf:{variant:"sans-serif",fontName:"SansSerif-Regular"},mathtt:{variant:"monospace",fontName:"Typewriter-Regular"}},_a={vec:["vec",.471,.714],oiintSize1:["oiintSize1",.957,.499],oiintSize2:["oiintSize2",1.472,.659],oiiintSize1:["oiiintSize1",1.304,.499],oiiintSize2:["oiiintSize2",1.98,.659]},Sa={fontMap:ka,makeSymbol:ga,mathsym:function(e,t,r,n){return void 0===n&&(n=[]),"boldsymbol"===r.font&&ma(e,"Main-Bold",t).metrics?ga(e,"Main-Bold",t,r,n.concat(["mathbf"])):"\\"===e||"main"===Ts[t][e].font?ga(e,"Main-Regular",t,r,n):ga(e,"AMS-Regular",t,r,n.concat(["amsrm"]))},makeSpan:ba,makeSvgSpan:wa,makeLineSpan:function(e,t,r){var n=ba([e],[],t);return n.height=Math.max(r||t.fontMetrics().defaultRuleThickness,t.minRuleThickness),n.style.borderBottomWidth=gs(n.height),n.maxFontSize=1,n},makeAnchor:function(e,t,r,n){var i=new xs(e,t,r,n);return va(i),i},makeFragment:ya,wrapFragment:function(e,t){return e instanceof ts?ba([],[e],t):e},makeVList:function(e,t){for(var{children:r,depth:n}=function(e){if("individualShift"===e.positionType){for(var t=e.children,r=[t[0]],n=-t[0].shift-t[0].elem.depth,i=n,s=1;s<t.length;s++){var a=-t[s].shift-i-t[s].elem.depth,o=a-(t[s-1].elem.height+t[s-1].elem.depth);i+=a,r.push({type:"kern",size:o}),r.push(t[s])}return{children:r,depth:n}}var l;if("top"===e.positionType){for(var h=e.positionData,c=0;c<e.children.length;c++){var p=e.children[c];h-="kern"===p.type?p.size:p.elem.height+p.elem.depth}l=h}else if("bottom"===e.positionType)l=-e.positionData;else{var u=e.children[0];if("elem"!==u.type)throw new Error('First child must have type "elem".');if("shift"===e.positionType)l=-u.elem.depth-e.positionData;else{if("firstBaseline"!==e.positionType)throw new Error("Invalid positionType "+e.positionType+".");l=-u.elem.depth}}return{children:e.children,depth:l}}(e),i=0,s=0;s<r.length;s++){var a=r[s];if("elem"===a.type){var o=a.elem;i=Math.max(i,o.maxFontSize,o.height)}}i+=2;var l=ba(["pstrut"],[]);l.style.height=gs(i);for(var h=[],c=n,p=n,u=n,d=0;d<r.length;d++){var m=r[d];if("kern"===m.type)u+=m.size;else{var g=m.elem,f=m.wrapperClasses||[],v=m.wrapperStyle||{},b=ba(f,[l,g],void 0,v);b.style.top=gs(-i-u-g.depth),m.marginLeft&&(b.style.marginLeft=m.marginLeft),m.marginRight&&(b.style.marginRight=m.marginRight),h.push(b),u+=g.height+g.depth}c=Math.min(c,u),p=Math.max(p,u)}var w,y=ba(["vlist"],h);if(y.style.height=gs(p),c<0){var x=ba([],[]),k=ba(["vlist"],[x]);k.style.height=gs(-c);var _=ba(["vlist-s"],[new Ss("​")]);w=[ba(["vlist-r"],[y,_]),ba(["vlist-r"],[k])]}else w=[ba(["vlist-r"],[y])];var S=ba(["vlist-t"],w);return 2===w.length&&S.classes.push("vlist-t2"),S.height=p,S.depth=-c,S},makeOrd:function(e,t,r){var n=e.mode,i=e.text,s=["mord"],a="math"===n||"text"===n&&t.font,o=a?t.font:t.fontFamily,l="",h="";if(55349===i.charCodeAt(0)&&([l,h]=function(e,t){var r=1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320)+65536,n="math"===t?0:1;if(119808<=r&&r<120484){var i=Math.floor((r-119808)/26);return[ua[i][2],ua[i][n]]}if(120782<=r&&r<=120831){var s=Math.floor((r-120782)/10);return[da[s][2],da[s][n]]}if(120485===r||120486===r)return[ua[0][2],ua[0][n]];if(120486<r&&r<120782)return["",""];throw new Vi("Unsupported character: "+e)}(i,n)),l.length>0)return ga(i,l,n,t,s.concat(h));if(o){var c,p;if("boldsymbol"===o){var u=function(e,t,r,n,i){return"textord"!==i&&ma(e,"Math-BoldItalic",t).metrics?{fontName:"Math-BoldItalic",fontClass:"boldsymbol"}:{fontName:"Main-Bold",fontClass:"mathbf"}}(i,n,0,0,r);c=u.fontName,p=[u.fontClass]}else a?(c=ka[o].fontName,p=[o]):(c=xa(o,t.fontWeight,t.fontShape),p=[o,t.fontWeight,t.fontShape]);if(ma(i,c,n).metrics)return ga(i,c,n,t,s.concat(p));if(Ys.hasOwnProperty(i)&&"Typewriter"===c.slice(0,10)){for(var d=[],m=0;m<i.length;m++)d.push(ga(i[m],c,n,t,s.concat(p)));return ya(d)}}if("mathord"===r)return ga(i,"Math-Italic",n,t,s.concat(["mathnormal"]));if("textord"===r){var g=Ts[n][i]&&Ts[n][i].font;if("ams"===g){var f=xa("amsrm",t.fontWeight,t.fontShape);return ga(i,f,n,t,s.concat("amsrm",t.fontWeight,t.fontShape))}if("main"!==g&&g){var v=xa(g,t.fontWeight,t.fontShape);return ga(i,v,n,t,s.concat(v,t.fontWeight,t.fontShape))}var b=xa("textrm",t.fontWeight,t.fontShape);return ga(i,b,n,t,s.concat(t.fontWeight,t.fontShape))}throw new Error("unexpected type: "+r+" in makeOrd")},makeGlue:(e,t)=>{var r=ba(["mspace"],[],t),n=ms(e,t);return r.style.marginRight=gs(n),r},staticSvg:function(e,t){var[r,n,i]=_a[e],s=new Ms(r),a=new Cs([s],{width:gs(n),height:gs(i),style:"width:"+gs(n),viewBox:"0 0 "+1e3*n+" "+1e3*i,preserveAspectRatio:"xMinYMin"}),o=wa(["overlay"],[a],t);return o.height=i,o.style.height=gs(i),o.style.width=gs(n),o},svgData:_a,tryCombineChars:e=>{for(var t=0;t<e.length-1;t++){var r=e[t],n=e[t+1];r instanceof Ss&&n instanceof Ss&&fa(r,n)&&(r.text+=n.text,r.height=Math.max(r.height,n.height),r.depth=Math.max(r.depth,n.depth),r.italic=n.italic,e.splice(t+1,1),t--)}return e}},Ca={number:3,unit:"mu"},Ma={number:4,unit:"mu"},Pa={number:5,unit:"mu"},za={mord:{mop:Ca,mbin:Ma,mrel:Pa,minner:Ca},mop:{mord:Ca,mop:Ca,mrel:Pa,minner:Ca},mbin:{mord:Ma,mop:Ma,mopen:Ma,minner:Ma},mrel:{mord:Pa,mop:Pa,mopen:Pa,minner:Pa},mopen:{},mclose:{mop:Ca,mbin:Ma,mrel:Pa,minner:Ca},mpunct:{mord:Ca,mop:Ca,mrel:Pa,mopen:Ca,mclose:Ca,mpunct:Ca,minner:Ca},minner:{mord:Ca,mop:Ca,mbin:Ma,mrel:Pa,mopen:Ca,mpunct:Ca,minner:Ca}},Aa={mord:{mop:Ca},mop:{mord:Ca,mop:Ca},mbin:{},mrel:{},mopen:{},mclose:{mop:Ca},mpunct:{},minner:{mop:Ca}},Ea={},Ta={},Va={};function Ba(e){for(var{type:t,names:r,props:n,handler:i,htmlBuilder:s,mathmlBuilder:a}=e,o={type:t,numArgs:n.numArgs,argTypes:n.argTypes,allowedInArgument:!!n.allowedInArgument,allowedInText:!!n.allowedInText,allowedInMath:void 0===n.allowedInMath||n.allowedInMath,numOptionalArgs:n.numOptionalArgs||0,infix:!!n.infix,primitive:!!n.primitive,handler:i},l=0;l<r.length;++l)Ea[r[l]]=o;t&&(s&&(Ta[t]=s),a&&(Va[t]=a))}function La(e){var{type:t,htmlBuilder:r,mathmlBuilder:n}=e;Ba({type:t,names:[],props:{numArgs:0},handler(){throw new Error("Should never be called.")},htmlBuilder:r,mathmlBuilder:n})}var Na=function(e){return"ordgroup"===e.type&&1===e.body.length?e.body[0]:e},Ra=function(e){return"ordgroup"===e.type?e.body:[e]},qa=Sa.makeSpan,Oa=["leftmost","mbin","mopen","mrel","mop","mpunct"],Ia=["rightmost","mrel","mclose","mpunct"],Da={display:Xi.DISPLAY,text:Xi.TEXT,script:Xi.SCRIPT,scriptscript:Xi.SCRIPTSCRIPT},Ha={mord:"mord",mop:"mop",mbin:"mbin",mrel:"mrel",mopen:"mopen",mclose:"mclose",mpunct:"mpunct",minner:"minner"},$a=function(e,t,r,n){void 0===n&&(n=[null,null]);for(var i=[],s=0;s<e.length;s++){var a=Ya(e[s],t);if(a instanceof ts){var o=a.children;i.push(...o)}else i.push(a)}if(Sa.tryCombineChars(i),!r)return i;var l=t;if(1===e.length){var h=e[0];"sizing"===h.type?l=t.havingSize(h.size):"styling"===h.type&&(l=t.havingStyle(Da[h.style]))}var c=qa([n[0]||"leftmost"],[],t),p=qa([n[1]||"rightmost"],[],t),u="root"===r;return ja(i,((e,t)=>{var r=t.classes[0],n=e.classes[0];"mbin"===r&&qi.contains(Ia,n)?t.classes[0]="mord":"mbin"===n&&qi.contains(Oa,r)&&(e.classes[0]="mord")}),{node:c},p,u),ja(i,((e,t)=>{var r=Ga(t),n=Ga(e),i=r&&n?e.hasClass("mtight")?Aa[r][n]:za[r][n]:null;if(i)return Sa.makeGlue(i,l)}),{node:c},p,u),i},ja=function e(t,r,n,i,s){i&&t.push(i);for(var a=0;a<t.length;a++){var o=t[a],l=Fa(o);if(l)e(l.children,r,n,null,s);else{var h=!o.hasClass("mspace");if(h){var c=r(o,n.node);c&&(n.insertAfter?n.insertAfter(c):(t.unshift(c),a++))}h?n.node=o:s&&o.hasClass("newline")&&(n.node=qa(["leftmost"])),n.insertAfter=(e=>r=>{t.splice(e+1,0,r),a++})(a)}}i&&t.pop()},Fa=function(e){return e instanceof ts||e instanceof xs||e instanceof ys&&e.hasClass("enclosing")?e:null},Ua=function e(t,r){var n=Fa(t);if(n){var i=n.children;if(i.length){if("right"===r)return e(i[i.length-1],"right");if("left"===r)return e(i[0],"left")}}return t},Ga=function(e,t){return e?(t&&(e=Ua(e,t)),Ha[e.classes[0]]||null):null},Ka=function(e,t){var r=["nulldelimiter"].concat(e.baseSizingClasses());return qa(t.concat(r))},Ya=function(e,t,r){if(!e)return qa();if(Ta[e.type]){var n=Ta[e.type](e,t);if(r&&t.size!==r.size){n=qa(t.sizingClasses(r),[n],t);var i=t.sizeMultiplier/r.sizeMultiplier;n.height*=i,n.depth*=i}return n}throw new Vi("Got group of unknown type: '"+e.type+"'")};function Xa(e,t){var r=qa(["base"],e,t),n=qa(["strut"]);return n.style.height=gs(r.height+r.depth),r.depth&&(n.style.verticalAlign=gs(-r.depth)),r.children.unshift(n),r}function Wa(e,t){var r=null;1===e.length&&"tag"===e[0].type&&(r=e[0].tag,e=e[0].body);var n,i=$a(e,t,"root");2===i.length&&i[1].hasClass("tag")&&(n=i.pop());for(var s,a=[],o=[],l=0;l<i.length;l++)if(o.push(i[l]),i[l].hasClass("mbin")||i[l].hasClass("mrel")||i[l].hasClass("allowbreak")){for(var h=!1;l<i.length-1&&i[l+1].hasClass("mspace")&&!i[l+1].hasClass("newline");)l++,o.push(i[l]),i[l].hasClass("nobreak")&&(h=!0);h||(a.push(Xa(o,t)),o=[])}else i[l].hasClass("newline")&&(o.pop(),o.length>0&&(a.push(Xa(o,t)),o=[]),a.push(i[l]));o.length>0&&a.push(Xa(o,t)),r?((s=Xa($a(r,t,!0))).classes=["tag"],a.push(s)):n&&a.push(n);var c=qa(["katex-html"],a);if(c.setAttribute("aria-hidden","true"),s){var p=s.children[0];p.style.height=gs(c.height+c.depth),c.depth&&(p.style.verticalAlign=gs(-c.depth))}return c}function Za(e){return new ts(e)}class Qa{constructor(e,t,r){this.type=void 0,this.attributes=void 0,this.children=void 0,this.classes=void 0,this.type=e,this.attributes={},this.children=t||[],this.classes=r||[]}setAttribute(e,t){this.attributes[e]=t}getAttribute(e){return this.attributes[e]}toNode(){var e=document.createElementNS("http://www.w3.org/1998/Math/MathML",this.type);for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&e.setAttribute(t,this.attributes[t]);this.classes.length>0&&(e.className=fs(this.classes));for(var r=0;r<this.children.length;r++)e.appendChild(this.children[r].toNode());return e}toMarkup(){var e="<"+this.type;for(var t in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,t)&&(e+=" "+t+'="',e+=qi.escape(this.attributes[t]),e+='"');this.classes.length>0&&(e+=' class ="'+qi.escape(fs(this.classes))+'"'),e+=">";for(var r=0;r<this.children.length;r++)e+=this.children[r].toMarkup();return e+="</"+this.type+">"}toText(){return this.children.map((e=>e.toText())).join("")}}class Ja{constructor(e){this.text=void 0,this.text=e}toNode(){return document.createTextNode(this.text)}toMarkup(){return qi.escape(this.toText())}toText(){return this.text}}var eo={MathNode:Qa,TextNode:Ja,SpaceNode:class{constructor(e){this.width=void 0,this.character=void 0,this.width=e,this.character=e>=.05555&&e<=.05556?" ":e>=.1666&&e<=.1667?" ":e>=.2222&&e<=.2223?" ":e>=.2777&&e<=.2778?"  ":e>=-.05556&&e<=-.05555?" ⁣":e>=-.1667&&e<=-.1666?" ⁣":e>=-.2223&&e<=-.2222?" ⁣":e>=-.2778&&e<=-.2777?" ⁣":null}toNode(){if(this.character)return document.createTextNode(this.character);var e=document.createElementNS("http://www.w3.org/1998/Math/MathML","mspace");return e.setAttribute("width",gs(this.width)),e}toMarkup(){return this.character?"<mtext>"+this.character+"</mtext>":'<mspace width="'+gs(this.width)+'"/>'}toText(){return this.character?this.character:" "}},newDocumentFragment:Za},to=function(e,t,r){return!Ts[t][e]||!Ts[t][e].replace||55349===e.charCodeAt(0)||Ys.hasOwnProperty(e)&&r&&(r.fontFamily&&"tt"===r.fontFamily.slice(4,6)||r.font&&"tt"===r.font.slice(4,6))||(e=Ts[t][e].replace),new eo.TextNode(e)},ro=function(e){return 1===e.length?e[0]:new eo.MathNode("mrow",e)},no=function(e,t){if("texttt"===t.fontFamily)return"monospace";if("textsf"===t.fontFamily)return"textit"===t.fontShape&&"textbf"===t.fontWeight?"sans-serif-bold-italic":"textit"===t.fontShape?"sans-serif-italic":"textbf"===t.fontWeight?"bold-sans-serif":"sans-serif";if("textit"===t.fontShape&&"textbf"===t.fontWeight)return"bold-italic";if("textit"===t.fontShape)return"italic";if("textbf"===t.fontWeight)return"bold";var r=t.font;if(!r||"mathnormal"===r)return null;var n=e.mode;if("mathit"===r)return"italic";if("boldsymbol"===r)return"textord"===e.type?"bold":"bold-italic";if("mathbf"===r)return"bold";if("mathbb"===r)return"double-struck";if("mathfrak"===r)return"fraktur";if("mathscr"===r||"mathcal"===r)return"script";if("mathsf"===r)return"sans-serif";if("mathtt"===r)return"monospace";var i=e.text;return qi.contains(["\\imath","\\jmath"],i)?null:(Ts[n][i]&&Ts[n][i].replace&&(i=Ts[n][i].replace),ss(i,Sa.fontMap[r].fontName,n)?Sa.fontMap[r].variant:null)},io=function(e,t,r){if(1===e.length){var n=ao(e[0],t);return r&&n instanceof Qa&&"mo"===n.type&&(n.setAttribute("lspace","0em"),n.setAttribute("rspace","0em")),[n]}for(var i,s=[],a=0;a<e.length;a++){var o=ao(e[a],t);if(o instanceof Qa&&i instanceof Qa){if("mtext"===o.type&&"mtext"===i.type&&o.getAttribute("mathvariant")===i.getAttribute("mathvariant")){i.children.push(...o.children);continue}if("mn"===o.type&&"mn"===i.type){i.children.push(...o.children);continue}if("mi"===o.type&&1===o.children.length&&"mn"===i.type){var l=o.children[0];if(l instanceof Ja&&"."===l.text){i.children.push(...o.children);continue}}else if("mi"===i.type&&1===i.children.length){var h=i.children[0];if(h instanceof Ja&&"̸"===h.text&&("mo"===o.type||"mi"===o.type||"mn"===o.type)){var c=o.children[0];c instanceof Ja&&c.text.length>0&&(c.text=c.text.slice(0,1)+"̸"+c.text.slice(1),s.pop())}}}s.push(o),i=o}return s},so=function(e,t,r){return ro(io(e,t,r))},ao=function(e,t){if(!e)return new eo.MathNode("mrow");if(Va[e.type])return Va[e.type](e,t);throw new Vi("Got group of unknown type: '"+e.type+"'")};function oo(e,t,r,n,i){var s,a=io(e,r);s=1===a.length&&a[0]instanceof Qa&&qi.contains(["mrow","mtable"],a[0].type)?a[0]:new eo.MathNode("mrow",a);var o=new eo.MathNode("annotation",[new eo.TextNode(t)]);o.setAttribute("encoding","application/x-tex");var l=new eo.MathNode("semantics",[s,o]),h=new eo.MathNode("math",[l]);h.setAttribute("xmlns","http://www.w3.org/1998/Math/MathML"),n&&h.setAttribute("display","block");var c=i?"katex":"katex-mathml";return Sa.makeSpan([c],[h])}var lo=function(e){return new cs({style:e.displayMode?Xi.DISPLAY:Xi.TEXT,maxSize:e.maxSize,minRuleThickness:e.minRuleThickness})},ho=function(e,t){if(t.displayMode){var r=["katex-display"];t.leqno&&r.push("leqno"),t.fleqn&&r.push("fleqn"),e=Sa.makeSpan(r,[e])}return e},co={widehat:"^",widecheck:"ˇ",widetilde:"~",utilde:"~",overleftarrow:"←",underleftarrow:"←",xleftarrow:"←",overrightarrow:"→",underrightarrow:"→",xrightarrow:"→",underbrace:"⏟",overbrace:"⏞",overgroup:"⏠",undergroup:"⏡",overleftrightarrow:"↔",underleftrightarrow:"↔",xleftrightarrow:"↔",Overrightarrow:"⇒",xRightarrow:"⇒",overleftharpoon:"↼",xleftharpoonup:"↼",overrightharpoon:"⇀",xrightharpoonup:"⇀",xLeftarrow:"⇐",xLeftrightarrow:"⇔",xhookleftarrow:"↩",xhookrightarrow:"↪",xmapsto:"↦",xrightharpoondown:"⇁",xleftharpoondown:"↽",xrightleftharpoons:"⇌",xleftrightharpoons:"⇋",xtwoheadleftarrow:"↞",xtwoheadrightarrow:"↠",xlongequal:"=",xtofrom:"⇄",xrightleftarrows:"⇄",xrightequilibrium:"⇌",xleftequilibrium:"⇋","\\cdrightarrow":"→","\\cdleftarrow":"←","\\cdlongequal":"="},po={overrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],overleftarrow:[["leftarrow"],.888,522,"xMinYMin"],underrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],underleftarrow:[["leftarrow"],.888,522,"xMinYMin"],xrightarrow:[["rightarrow"],1.469,522,"xMaxYMin"],"\\cdrightarrow":[["rightarrow"],3,522,"xMaxYMin"],xleftarrow:[["leftarrow"],1.469,522,"xMinYMin"],"\\cdleftarrow":[["leftarrow"],3,522,"xMinYMin"],Overrightarrow:[["doublerightarrow"],.888,560,"xMaxYMin"],xRightarrow:[["doublerightarrow"],1.526,560,"xMaxYMin"],xLeftarrow:[["doubleleftarrow"],1.526,560,"xMinYMin"],overleftharpoon:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoonup:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoondown:[["leftharpoondown"],.888,522,"xMinYMin"],overrightharpoon:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoonup:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoondown:[["rightharpoondown"],.888,522,"xMaxYMin"],xlongequal:[["longequal"],.888,334,"xMinYMin"],"\\cdlongequal":[["longequal"],3,334,"xMinYMin"],xtwoheadleftarrow:[["twoheadleftarrow"],.888,334,"xMinYMin"],xtwoheadrightarrow:[["twoheadrightarrow"],.888,334,"xMaxYMin"],overleftrightarrow:[["leftarrow","rightarrow"],.888,522],overbrace:[["leftbrace","midbrace","rightbrace"],1.6,548],underbrace:[["leftbraceunder","midbraceunder","rightbraceunder"],1.6,548],underleftrightarrow:[["leftarrow","rightarrow"],.888,522],xleftrightarrow:[["leftarrow","rightarrow"],1.75,522],xLeftrightarrow:[["doubleleftarrow","doublerightarrow"],1.75,560],xrightleftharpoons:[["leftharpoondownplus","rightharpoonplus"],1.75,716],xleftrightharpoons:[["leftharpoonplus","rightharpoondownplus"],1.75,716],xhookleftarrow:[["leftarrow","righthook"],1.08,522],xhookrightarrow:[["lefthook","rightarrow"],1.08,522],overlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],underlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],overgroup:[["leftgroup","rightgroup"],.888,342],undergroup:[["leftgroupunder","rightgroupunder"],.888,342],xmapsto:[["leftmapsto","rightarrow"],1.5,522],xtofrom:[["leftToFrom","rightToFrom"],1.75,528],xrightleftarrows:[["baraboveleftarrow","rightarrowabovebar"],1.75,901],xrightequilibrium:[["baraboveshortleftharpoon","rightharpoonaboveshortbar"],1.75,716],xleftequilibrium:[["shortbaraboveleftharpoon","shortrightharpoonabovebar"],1.75,716]},uo=function(e,t,r,n,i){var s,a=e.height+e.depth+r+n;if(/fbox|color|angl/.test(t)){if(s=Sa.makeSpan(["stretchy",t],[],i),"fbox"===t){var o=i.color&&i.getColor();o&&(s.style.borderColor=o)}}else{var l=[];/^[bx]cancel$/.test(t)&&l.push(new Ps({x1:"0",y1:"0",x2:"100%",y2:"100%","stroke-width":"0.046em"})),/^x?cancel$/.test(t)&&l.push(new Ps({x1:"0",y1:"100%",x2:"100%",y2:"0","stroke-width":"0.046em"}));var h=new Cs(l,{width:"100%",height:gs(a)});s=Sa.makeSvgSpan([],[h],i)}return s.height=a,s.style.height=gs(a),s},mo=function(e){var t=new eo.MathNode("mo",[new eo.TextNode(co[e.replace(/^\\/,"")])]);return t.setAttribute("stretchy","true"),t},go=function(e,t){var{span:r,minWidth:n,height:i}=function(){var r=4e5,n=e.label.slice(1);if(qi.contains(["widehat","widecheck","widetilde","utilde"],n)){var i,s,a,o="ordgroup"===(d=e.base).type?d.body.length:1;if(o>5)"widehat"===n||"widecheck"===n?(i=420,r=2364,a=.42,s=n+"4"):(i=312,r=2340,a=.34,s="tilde4");else{var l=[1,1,2,2,3,3][o];"widehat"===n||"widecheck"===n?(r=[0,1062,2364,2364,2364][l],i=[0,239,300,360,420][l],a=[0,.24,.3,.3,.36,.42][l],s=n+l):(r=[0,600,1033,2339,2340][l],i=[0,260,286,306,312][l],a=[0,.26,.286,.3,.306,.34][l],s="tilde"+l)}var h=new Ms(s),c=new Cs([h],{width:"100%",height:gs(a),viewBox:"0 0 "+r+" "+i,preserveAspectRatio:"none"});return{span:Sa.makeSvgSpan([],[c],t),minWidth:0,height:a}}var p,u,d,m=[],g=po[n],[f,v,b]=g,w=b/1e3,y=f.length;if(1===y)p=["hide-tail"],u=[g[3]];else if(2===y)p=["halfarrow-left","halfarrow-right"],u=["xMinYMin","xMaxYMin"];else{if(3!==y)throw new Error("Correct katexImagesData or update code here to support\n                    "+y+" children.");p=["brace-left","brace-center","brace-right"],u=["xMinYMin","xMidYMin","xMaxYMin"]}for(var x=0;x<y;x++){var k=new Ms(f[x]),_=new Cs([k],{width:"400em",height:gs(w),viewBox:"0 0 "+r+" "+b,preserveAspectRatio:u[x]+" slice"}),S=Sa.makeSvgSpan([p[x]],[_],t);if(1===y)return{span:S,minWidth:v,height:w};S.style.height=gs(w),m.push(S)}return{span:Sa.makeSpan(["stretchy"],m,t),minWidth:v,height:w}}();return r.height=i,r.style.height=gs(i),n>0&&(r.style.minWidth=gs(n)),r};function fo(e,t){if(!e||e.type!==t)throw new Error("Expected node of type "+t+", but got "+(e?"node of type "+e.type:String(e)));return e}function vo(e){var t=bo(e);if(!t)throw new Error("Expected node of symbol group type, but got "+(e?"node of type "+e.type:String(e)));return t}function bo(e){return e&&("atom"===e.type||Es.hasOwnProperty(e.type))?e:null}var wo=(e,t)=>{var r,n,i;e&&"supsub"===e.type?(r=(n=fo(e.base,"accent")).base,e.base=r,i=function(e){if(e instanceof ys)return e;throw new Error("Expected span<HtmlDomNode> but got "+String(e)+".")}(Ya(e,t)),e.base=n):r=(n=fo(e,"accent")).base;var s=Ya(r,t.havingCrampedStyle()),a=0;if(n.isShifty&&qi.isCharacterBox(r)){var o=qi.getBaseElem(r);a=zs(Ya(o,t.havingCrampedStyle())).skew}var l,h="\\c"===n.label,c=h?s.height+s.depth:Math.min(s.height,t.fontMetrics().xHeight);if(n.isStretchy)l=go(n,t),l=Sa.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:s},{type:"elem",elem:l,wrapperClasses:["svg-align"],wrapperStyle:a>0?{width:"calc(100% - "+gs(2*a)+")",marginLeft:gs(2*a)}:void 0}]},t);else{var p,u;"\\vec"===n.label?(p=Sa.staticSvg("vec",t),u=Sa.svgData.vec[1]):((p=zs(p=Sa.makeOrd({mode:n.mode,text:n.label},t,"textord"))).italic=0,u=p.width,h&&(c+=p.depth)),l=Sa.makeSpan(["accent-body"],[p]);var d="\\textcircled"===n.label;d&&(l.classes.push("accent-full"),c=s.height);var m=a;d||(m-=u/2),l.style.left=gs(m),"\\textcircled"===n.label&&(l.style.top=".2em"),l=Sa.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:s},{type:"kern",size:-c},{type:"elem",elem:l}]},t)}var g=Sa.makeSpan(["mord","accent"],[l],t);return i?(i.children[0]=g,i.height=Math.max(g.height,i.height),i.classes[0]="mord",i):g},yo=(e,t)=>{var r=e.isStretchy?mo(e.label):new eo.MathNode("mo",[to(e.label,e.mode)]),n=new eo.MathNode("mover",[ao(e.base,t),r]);return n.setAttribute("accent","true"),n},xo=new RegExp(["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot","\\mathring"].map((e=>"\\"+e)).join("|"));Ba({type:"accent",names:["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot","\\mathring","\\widecheck","\\widehat","\\widetilde","\\overrightarrow","\\overleftarrow","\\Overrightarrow","\\overleftrightarrow","\\overgroup","\\overlinesegment","\\overleftharpoon","\\overrightharpoon"],props:{numArgs:1},handler:(e,t)=>{var r=Na(t[0]),n=!xo.test(e.funcName),i=!n||"\\widehat"===e.funcName||"\\widetilde"===e.funcName||"\\widecheck"===e.funcName;return{type:"accent",mode:e.parser.mode,label:e.funcName,isStretchy:n,isShifty:i,base:r}},htmlBuilder:wo,mathmlBuilder:yo}),Ba({type:"accent",names:["\\'","\\`","\\^","\\~","\\=","\\u","\\.",'\\"',"\\c","\\r","\\H","\\v","\\textcircled"],props:{numArgs:1,allowedInText:!0,allowedInMath:!0,argTypes:["primitive"]},handler:(e,t)=>{var r=t[0],n=e.parser.mode;return"math"===n&&(e.parser.settings.reportNonstrict("mathVsTextAccents","LaTeX's accent "+e.funcName+" works only in text mode"),n="text"),{type:"accent",mode:n,label:e.funcName,isStretchy:!1,isShifty:!0,base:r}},htmlBuilder:wo,mathmlBuilder:yo}),Ba({type:"accentUnder",names:["\\underleftarrow","\\underrightarrow","\\underleftrightarrow","\\undergroup","\\underlinesegment","\\utilde"],props:{numArgs:1},handler:(e,t)=>{var{parser:r,funcName:n}=e,i=t[0];return{type:"accentUnder",mode:r.mode,label:n,base:i}},htmlBuilder:(e,t)=>{var r=Ya(e.base,t),n=go(e,t),i="\\utilde"===e.label?.12:0,s=Sa.makeVList({positionType:"top",positionData:r.height,children:[{type:"elem",elem:n,wrapperClasses:["svg-align"]},{type:"kern",size:i},{type:"elem",elem:r}]},t);return Sa.makeSpan(["mord","accentunder"],[s],t)},mathmlBuilder:(e,t)=>{var r=mo(e.label),n=new eo.MathNode("munder",[ao(e.base,t),r]);return n.setAttribute("accentunder","true"),n}});var ko=e=>{var t=new eo.MathNode("mpadded",e?[e]:[]);return t.setAttribute("width","+0.6em"),t.setAttribute("lspace","0.3em"),t};Ba({type:"xArrow",names:["\\xleftarrow","\\xrightarrow","\\xLeftarrow","\\xRightarrow","\\xleftrightarrow","\\xLeftrightarrow","\\xhookleftarrow","\\xhookrightarrow","\\xmapsto","\\xrightharpoondown","\\xrightharpoonup","\\xleftharpoondown","\\xleftharpoonup","\\xrightleftharpoons","\\xleftrightharpoons","\\xlongequal","\\xtwoheadrightarrow","\\xtwoheadleftarrow","\\xtofrom","\\xrightleftarrows","\\xrightequilibrium","\\xleftequilibrium","\\\\cdrightarrow","\\\\cdleftarrow","\\\\cdlongequal"],props:{numArgs:1,numOptionalArgs:1},handler(e,t,r){var{parser:n,funcName:i}=e;return{type:"xArrow",mode:n.mode,label:i,body:t[0],below:r[0]}},htmlBuilder(e,t){var r,n=t.style,i=t.havingStyle(n.sup()),s=Sa.wrapFragment(Ya(e.body,i,t),t),a="\\x"===e.label.slice(0,2)?"x":"cd";s.classes.push(a+"-arrow-pad"),e.below&&(i=t.havingStyle(n.sub()),(r=Sa.wrapFragment(Ya(e.below,i,t),t)).classes.push(a+"-arrow-pad"));var o,l=go(e,t),h=-t.fontMetrics().axisHeight+.5*l.height,c=-t.fontMetrics().axisHeight-.5*l.height-.111;if((s.depth>.25||"\\xleftequilibrium"===e.label)&&(c-=s.depth),r){var p=-t.fontMetrics().axisHeight+r.height+.5*l.height+.111;o=Sa.makeVList({positionType:"individualShift",children:[{type:"elem",elem:s,shift:c},{type:"elem",elem:l,shift:h},{type:"elem",elem:r,shift:p}]},t)}else o=Sa.makeVList({positionType:"individualShift",children:[{type:"elem",elem:s,shift:c},{type:"elem",elem:l,shift:h}]},t);return o.children[0].children[0].children[1].classes.push("svg-align"),Sa.makeSpan(["mrel","x-arrow"],[o],t)},mathmlBuilder(e,t){var r,n=mo(e.label);if(n.setAttribute("minsize","x"===e.label.charAt(0)?"1.75em":"3.0em"),e.body){var i=ko(ao(e.body,t));if(e.below){var s=ko(ao(e.below,t));r=new eo.MathNode("munderover",[n,s,i])}else r=new eo.MathNode("mover",[n,i])}else if(e.below){var a=ko(ao(e.below,t));r=new eo.MathNode("munder",[n,a])}else r=ko(),r=new eo.MathNode("mover",[n,r]);return r}});var _o=Sa.makeSpan;function So(e,t){var r=$a(e.body,t,!0);return _o([e.mclass],r,t)}function Co(e,t){var r,n=io(e.body,t);return"minner"===e.mclass?r=new eo.MathNode("mpadded",n):"mord"===e.mclass?e.isCharacterBox?(r=n[0]).type="mi":r=new eo.MathNode("mi",n):(e.isCharacterBox?(r=n[0]).type="mo":r=new eo.MathNode("mo",n),"mbin"===e.mclass?(r.attributes.lspace="0.22em",r.attributes.rspace="0.22em"):"mpunct"===e.mclass?(r.attributes.lspace="0em",r.attributes.rspace="0.17em"):"mopen"===e.mclass||"mclose"===e.mclass?(r.attributes.lspace="0em",r.attributes.rspace="0em"):"minner"===e.mclass&&(r.attributes.lspace="0.0556em",r.attributes.width="+0.1111em")),r}Ba({type:"mclass",names:["\\mathord","\\mathbin","\\mathrel","\\mathopen","\\mathclose","\\mathpunct","\\mathinner"],props:{numArgs:1,primitive:!0},handler(e,t){var{parser:r,funcName:n}=e,i=t[0];return{type:"mclass",mode:r.mode,mclass:"m"+n.slice(5),body:Ra(i),isCharacterBox:qi.isCharacterBox(i)}},htmlBuilder:So,mathmlBuilder:Co});var Mo=e=>{var t="ordgroup"===e.type&&e.body.length?e.body[0]:e;return"atom"!==t.type||"bin"!==t.family&&"rel"!==t.family?"mord":"m"+t.family};Ba({type:"mclass",names:["\\@binrel"],props:{numArgs:2},handler(e,t){var{parser:r}=e;return{type:"mclass",mode:r.mode,mclass:Mo(t[0]),body:Ra(t[1]),isCharacterBox:qi.isCharacterBox(t[1])}}}),Ba({type:"mclass",names:["\\stackrel","\\overset","\\underset"],props:{numArgs:2},handler(e,t){var r,{parser:n,funcName:i}=e,s=t[1],a=t[0];r="\\stackrel"!==i?Mo(s):"mrel";var o={type:"op",mode:s.mode,limits:!0,alwaysHandleSupSub:!0,parentIsSupSub:!1,symbol:!1,suppressBaseShift:"\\stackrel"!==i,body:Ra(s)},l={type:"supsub",mode:a.mode,base:o,sup:"\\underset"===i?null:a,sub:"\\underset"===i?a:null};return{type:"mclass",mode:n.mode,mclass:r,body:[l],isCharacterBox:qi.isCharacterBox(l)}},htmlBuilder:So,mathmlBuilder:Co}),Ba({type:"pmb",names:["\\pmb"],props:{numArgs:1,allowedInText:!0},handler(e,t){var{parser:r}=e;return{type:"pmb",mode:r.mode,mclass:Mo(t[0]),body:Ra(t[0])}},htmlBuilder(e,t){var r=$a(e.body,t,!0),n=Sa.makeSpan([e.mclass],r,t);return n.style.textShadow="0.02em 0.01em 0.04px",n},mathmlBuilder(e,t){var r=io(e.body,t),n=new eo.MathNode("mstyle",r);return n.setAttribute("style","text-shadow: 0.02em 0.01em 0.04px"),n}});var Po={">":"\\\\cdrightarrow","<":"\\\\cdleftarrow","=":"\\\\cdlongequal",A:"\\uparrow",V:"\\downarrow","|":"\\Vert",".":"no arrow"},zo=e=>"textord"===e.type&&"@"===e.text;function Ao(e,t,r){var n=Po[e];switch(n){case"\\\\cdrightarrow":case"\\\\cdleftarrow":return r.callFunction(n,[t[0]],[t[1]]);case"\\uparrow":case"\\downarrow":var i={type:"atom",text:n,mode:"math",family:"rel"},s={type:"ordgroup",mode:"math",body:[r.callFunction("\\\\cdleft",[t[0]],[]),r.callFunction("\\Big",[i],[]),r.callFunction("\\\\cdright",[t[1]],[])]};return r.callFunction("\\\\cdparent",[s],[]);case"\\\\cdlongequal":return r.callFunction("\\\\cdlongequal",[],[]);case"\\Vert":return r.callFunction("\\Big",[{type:"textord",text:"\\Vert",mode:"math"}],[]);default:return{type:"textord",text:" ",mode:"math"}}}Ba({type:"cdlabel",names:["\\\\cdleft","\\\\cdright"],props:{numArgs:1},handler(e,t){var{parser:r,funcName:n}=e;return{type:"cdlabel",mode:r.mode,side:n.slice(4),label:t[0]}},htmlBuilder(e,t){var r=t.havingStyle(t.style.sup()),n=Sa.wrapFragment(Ya(e.label,r,t),t);return n.classes.push("cd-label-"+e.side),n.style.bottom=gs(.8-n.depth),n.height=0,n.depth=0,n},mathmlBuilder(e,t){var r=new eo.MathNode("mrow",[ao(e.label,t)]);return(r=new eo.MathNode("mpadded",[r])).setAttribute("width","0"),"left"===e.side&&r.setAttribute("lspace","-1width"),r.setAttribute("voffset","0.7em"),(r=new eo.MathNode("mstyle",[r])).setAttribute("displaystyle","false"),r.setAttribute("scriptlevel","1"),r}}),Ba({type:"cdlabelparent",names:["\\\\cdparent"],props:{numArgs:1},handler(e,t){var{parser:r}=e;return{type:"cdlabelparent",mode:r.mode,fragment:t[0]}},htmlBuilder(e,t){var r=Sa.wrapFragment(Ya(e.fragment,t),t);return r.classes.push("cd-vert-arrow"),r},mathmlBuilder:(e,t)=>new eo.MathNode("mrow",[ao(e.fragment,t)])}),Ba({type:"textord",names:["\\@char"],props:{numArgs:1,allowedInText:!0},handler(e,t){for(var{parser:r}=e,n=fo(t[0],"ordgroup").body,i="",s=0;s<n.length;s++){i+=fo(n[s],"textord").text}var a,o=parseInt(i);if(isNaN(o))throw new Vi("\\@char has non-numeric argument "+i);if(o<0||o>=1114111)throw new Vi("\\@char with invalid code point "+i);return o<=65535?a=String.fromCharCode(o):(o-=65536,a=String.fromCharCode(55296+(o>>10),56320+(1023&o))),{type:"textord",mode:r.mode,text:a}}});var Eo=(e,t)=>{var r=$a(e.body,t.withColor(e.color),!1);return Sa.makeFragment(r)},To=(e,t)=>{var r=io(e.body,t.withColor(e.color)),n=new eo.MathNode("mstyle",r);return n.setAttribute("mathcolor",e.color),n};Ba({type:"color",names:["\\textcolor"],props:{numArgs:2,allowedInText:!0,argTypes:["color","original"]},handler(e,t){var{parser:r}=e,n=fo(t[0],"color-token").color,i=t[1];return{type:"color",mode:r.mode,color:n,body:Ra(i)}},htmlBuilder:Eo,mathmlBuilder:To}),Ba({type:"color",names:["\\color"],props:{numArgs:1,allowedInText:!0,argTypes:["color"]},handler(e,t){var{parser:r,breakOnTokenText:n}=e,i=fo(t[0],"color-token").color;r.gullet.macros.set("\\current@color",i);var s=r.parseExpression(!0,n);return{type:"color",mode:r.mode,color:i,body:s}},htmlBuilder:Eo,mathmlBuilder:To}),Ba({type:"cr",names:["\\\\"],props:{numArgs:0,numOptionalArgs:0,allowedInText:!0},handler(e,t,r){var{parser:n}=e,i="["===n.gullet.future().text?n.parseSizeGroup(!0):null,s=!n.settings.displayMode||!n.settings.useStrictBehavior("newLineInDisplayMode","In LaTeX, \\\\ or \\newline does nothing in display mode");return{type:"cr",mode:n.mode,newLine:s,size:i&&fo(i,"size").value}},htmlBuilder(e,t){var r=Sa.makeSpan(["mspace"],[],t);return e.newLine&&(r.classes.push("newline"),e.size&&(r.style.marginTop=gs(ms(e.size,t)))),r},mathmlBuilder(e,t){var r=new eo.MathNode("mspace");return e.newLine&&(r.setAttribute("linebreak","newline"),e.size&&r.setAttribute("height",gs(ms(e.size,t)))),r}});var Vo={"\\global":"\\global","\\long":"\\\\globallong","\\\\globallong":"\\\\globallong","\\def":"\\gdef","\\gdef":"\\gdef","\\edef":"\\xdef","\\xdef":"\\xdef","\\let":"\\\\globallet","\\futurelet":"\\\\globalfuture"},Bo=e=>{var t=e.text;if(/^(?:[\\{}$&#^_]|EOF)$/.test(t))throw new Vi("Expected a control sequence",e);return t},Lo=(e,t,r,n)=>{var i=e.gullet.macros.get(r.text);null==i&&(r.noexpand=!0,i={tokens:[r],numArgs:0,unexpandable:!e.gullet.isExpandable(r.text)}),e.gullet.macros.set(t,i,n)};Ba({type:"internal",names:["\\global","\\long","\\\\globallong"],props:{numArgs:0,allowedInText:!0},handler(e){var{parser:t,funcName:r}=e;t.consumeSpaces();var n=t.fetch();if(Vo[n.text])return"\\global"!==r&&"\\\\globallong"!==r||(n.text=Vo[n.text]),fo(t.parseFunction(),"internal");throw new Vi("Invalid token after macro prefix",n)}}),Ba({type:"internal",names:["\\def","\\gdef","\\edef","\\xdef"],props:{numArgs:0,allowedInText:!0,primitive:!0},handler(e){var{parser:t,funcName:r}=e,n=t.gullet.popToken(),i=n.text;if(/^(?:[\\{}$&#^_]|EOF)$/.test(i))throw new Vi("Expected a control sequence",n);for(var s,a=0,o=[[]];"{"!==t.gullet.future().text;)if("#"===(n=t.gullet.popToken()).text){if("{"===t.gullet.future().text){s=t.gullet.future(),o[a].push("{");break}if(n=t.gullet.popToken(),!/^[1-9]$/.test(n.text))throw new Vi('Invalid argument number "'+n.text+'"');if(parseInt(n.text)!==a+1)throw new Vi('Argument number "'+n.text+'" out of order');a++,o.push([])}else{if("EOF"===n.text)throw new Vi("Expected a macro definition");o[a].push(n.text)}var{tokens:l}=t.gullet.consumeArg();return s&&l.unshift(s),"\\edef"!==r&&"\\xdef"!==r||(l=t.gullet.expandTokens(l)).reverse(),t.gullet.macros.set(i,{tokens:l,numArgs:a,delimiters:o},r===Vo[r]),{type:"internal",mode:t.mode}}}),Ba({type:"internal",names:["\\let","\\\\globallet"],props:{numArgs:0,allowedInText:!0,primitive:!0},handler(e){var{parser:t,funcName:r}=e,n=Bo(t.gullet.popToken());t.gullet.consumeSpaces();var i=(e=>{var t=e.gullet.popToken();return"="===t.text&&" "===(t=e.gullet.popToken()).text&&(t=e.gullet.popToken()),t})(t);return Lo(t,n,i,"\\\\globallet"===r),{type:"internal",mode:t.mode}}}),Ba({type:"internal",names:["\\futurelet","\\\\globalfuture"],props:{numArgs:0,allowedInText:!0,primitive:!0},handler(e){var{parser:t,funcName:r}=e,n=Bo(t.gullet.popToken()),i=t.gullet.popToken(),s=t.gullet.popToken();return Lo(t,n,s,"\\\\globalfuture"===r),t.gullet.pushToken(s),t.gullet.pushToken(i),{type:"internal",mode:t.mode}}});var No=function(e,t,r){var n=ss(Ts.math[e]&&Ts.math[e].replace||e,t,r);if(!n)throw new Error("Unsupported symbol "+e+" and font size "+t+".");return n},Ro=function(e,t,r,n){var i=r.havingBaseStyle(t),s=Sa.makeSpan(n.concat(i.sizingClasses(r)),[e],r),a=i.sizeMultiplier/r.sizeMultiplier;return s.height*=a,s.depth*=a,s.maxFontSize=i.sizeMultiplier,s},qo=function(e,t,r){var n=t.havingBaseStyle(r),i=(1-t.sizeMultiplier/n.sizeMultiplier)*t.fontMetrics().axisHeight;e.classes.push("delimcenter"),e.style.top=gs(i),e.height-=i,e.depth+=i},Oo=function(e,t,r,n,i,s){var a=function(e,t,r,n){return Sa.makeSymbol(e,"Size"+t+"-Regular",r,n)}(e,t,i,n),o=Ro(Sa.makeSpan(["delimsizing","size"+t],[a],n),Xi.TEXT,n,s);return r&&qo(o,n,Xi.TEXT),o},Io=function(e,t,r){var n;return n="Size1-Regular"===t?"delim-size1":"delim-size4",{type:"elem",elem:Sa.makeSpan(["delimsizinginner",n],[Sa.makeSpan([],[Sa.makeSymbol(e,t,r)])])}},Do=function(e,t,r){var n=rs["Size4-Regular"][e.charCodeAt(0)]?rs["Size4-Regular"][e.charCodeAt(0)][4]:rs["Size1-Regular"][e.charCodeAt(0)][4],i=new Ms("inner",function(e,t){switch(e){case"⎜":return"M291 0 H417 V"+t+" H291z M291 0 H417 V"+t+" H291z";case"∣":return"M145 0 H188 V"+t+" H145z M145 0 H188 V"+t+" H145z";case"∥":return"M145 0 H188 V"+t+" H145z M145 0 H188 V"+t+" H145zM367 0 H410 V"+t+" H367z M367 0 H410 V"+t+" H367z";case"⎟":return"M457 0 H583 V"+t+" H457z M457 0 H583 V"+t+" H457z";case"⎢":return"M319 0 H403 V"+t+" H319z M319 0 H403 V"+t+" H319z";case"⎥":return"M263 0 H347 V"+t+" H263z M263 0 H347 V"+t+" H263z";case"⎪":return"M384 0 H504 V"+t+" H384z M384 0 H504 V"+t+" H384z";case"⏐":return"M312 0 H355 V"+t+" H312z M312 0 H355 V"+t+" H312z";case"‖":return"M257 0 H300 V"+t+" H257z M257 0 H300 V"+t+" H257zM478 0 H521 V"+t+" H478z M478 0 H521 V"+t+" H478z";default:return""}}(e,Math.round(1e3*t))),s=new Cs([i],{width:gs(n),height:gs(t),style:"width:"+gs(n),viewBox:"0 0 "+1e3*n+" "+Math.round(1e3*t),preserveAspectRatio:"xMinYMin"}),a=Sa.makeSvgSpan([],[s],r);return a.height=t,a.style.height=gs(t),a.style.width=gs(n),{type:"elem",elem:a}},Ho={type:"kern",size:-.008},$o=["|","\\lvert","\\rvert","\\vert"],jo=["\\|","\\lVert","\\rVert","\\Vert"],Fo=function(e,t,r,n,i,s){var a,o,l,h,c="",p=0;a=l=h=e,o=null;var u="Size1-Regular";"\\uparrow"===e?l=h="⏐":"\\Uparrow"===e?l=h="‖":"\\downarrow"===e?a=l="⏐":"\\Downarrow"===e?a=l="‖":"\\updownarrow"===e?(a="\\uparrow",l="⏐",h="\\downarrow"):"\\Updownarrow"===e?(a="\\Uparrow",l="‖",h="\\Downarrow"):qi.contains($o,e)?(l="∣",c="vert",p=333):qi.contains(jo,e)?(l="∥",c="doublevert",p=556):"["===e||"\\lbrack"===e?(a="⎡",l="⎢",h="⎣",u="Size4-Regular",c="lbrack",p=667):"]"===e||"\\rbrack"===e?(a="⎤",l="⎥",h="⎦",u="Size4-Regular",c="rbrack",p=667):"\\lfloor"===e||"⌊"===e?(l=a="⎢",h="⎣",u="Size4-Regular",c="lfloor",p=667):"\\lceil"===e||"⌈"===e?(a="⎡",l=h="⎢",u="Size4-Regular",c="lceil",p=667):"\\rfloor"===e||"⌋"===e?(l=a="⎥",h="⎦",u="Size4-Regular",c="rfloor",p=667):"\\rceil"===e||"⌉"===e?(a="⎤",l=h="⎥",u="Size4-Regular",c="rceil",p=667):"("===e||"\\lparen"===e?(a="⎛",l="⎜",h="⎝",u="Size4-Regular",c="lparen",p=875):")"===e||"\\rparen"===e?(a="⎞",l="⎟",h="⎠",u="Size4-Regular",c="rparen",p=875):"\\{"===e||"\\lbrace"===e?(a="⎧",o="⎨",h="⎩",l="⎪",u="Size4-Regular"):"\\}"===e||"\\rbrace"===e?(a="⎫",o="⎬",h="⎭",l="⎪",u="Size4-Regular"):"\\lgroup"===e||"⟮"===e?(a="⎧",h="⎩",l="⎪",u="Size4-Regular"):"\\rgroup"===e||"⟯"===e?(a="⎫",h="⎭",l="⎪",u="Size4-Regular"):"\\lmoustache"===e||"⎰"===e?(a="⎧",h="⎭",l="⎪",u="Size4-Regular"):"\\rmoustache"!==e&&"⎱"!==e||(a="⎫",h="⎩",l="⎪",u="Size4-Regular");var d=No(a,u,i),m=d.height+d.depth,g=No(l,u,i),f=g.height+g.depth,v=No(h,u,i),b=v.height+v.depth,w=0,y=1;if(null!==o){var x=No(o,u,i);w=x.height+x.depth,y=2}var k=m+b+w,_=k+Math.max(0,Math.ceil((t-k)/(y*f)))*y*f,S=n.fontMetrics().axisHeight;r&&(S*=n.sizeMultiplier);var C=_/2-S,M=[];if(c.length>0){var P=_-m-b,z=Math.round(1e3*_),A=function(e,t){switch(e){case"lbrack":return"M403 1759 V84 H666 V0 H319 V1759 v"+t+" v1759 h347 v-84\nH403z M403 1759 V0 H319 V1759 v"+t+" v1759 h84z";case"rbrack":return"M347 1759 V0 H0 V84 H263 V1759 v"+t+" v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v"+t+" v1759 h84z";case"vert":return"M145 15 v585 v"+t+" v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v"+-t+" v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v"+t+" v585 h43z";case"doublevert":return"M145 15 v585 v"+t+" v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v"+-t+" v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v"+t+" v585 h43z\nM367 15 v585 v"+t+" v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v"+-t+" v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v"+t+" v585 h43z";case"lfloor":return"M319 602 V0 H403 V602 v"+t+" v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v"+t+" v1715 H319z";case"rfloor":return"M319 602 V0 H403 V602 v"+t+" v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v"+t+" v1715 H319z";case"lceil":return"M403 1759 V84 H666 V0 H319 V1759 v"+t+" v602 h84z\nM403 1759 V0 H319 V1759 v"+t+" v602 h84z";case"rceil":return"M347 1759 V0 H0 V84 H263 V1759 v"+t+" v602 h84z\nM347 1759 V0 h-84 V1759 v"+t+" v602 h84z";case"lparen":return"M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0,"+(t+84)+"c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-"+(t+92)+"c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";case"rparen":return"M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,"+(t+9)+"\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-"+(t+144)+"c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";default:throw new Error("Unknown stretchy delimiter.")}}(c,Math.round(1e3*P)),E=new Ms(c,A),T=(p/1e3).toFixed(3)+"em",V=(z/1e3).toFixed(3)+"em",B=new Cs([E],{width:T,height:V,viewBox:"0 0 "+p+" "+z}),L=Sa.makeSvgSpan([],[B],n);L.height=z/1e3,L.style.width=T,L.style.height=V,M.push({type:"elem",elem:L})}else{if(M.push(Io(h,u,i)),M.push(Ho),null===o){var N=_-m-b+.016;M.push(Do(l,N,n))}else{var R=(_-m-b-w)/2+.016;M.push(Do(l,R,n)),M.push(Ho),M.push(Io(o,u,i)),M.push(Ho),M.push(Do(l,R,n))}M.push(Ho),M.push(Io(a,u,i))}var q=n.havingBaseStyle(Xi.TEXT),O=Sa.makeVList({positionType:"bottom",positionData:C,children:M},q);return Ro(Sa.makeSpan(["delimsizing","mult"],[O],q),Xi.TEXT,n,s)},Uo=.08,Go=function(e,t,r,n,i){var s=function(e,t,r){t*=1e3;var n="";switch(e){case"sqrtMain":n=function(e,t){return"M95,"+(622+e+t)+"\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl"+e/2.075+" -"+e+"\nc5.3,-9.3,12,-14,20,-14\nH400000v"+(40+e)+"H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM"+(834+e)+" "+t+"h400000v"+(40+e)+"h-400000z"}(t,Ji);break;case"sqrtSize1":n=function(e,t){return"M263,"+(601+e+t)+"c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl"+e/2.084+" -"+e+"\nc4.7,-7.3,11,-11,19,-11\nH40000v"+(40+e)+"H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM"+(1001+e)+" "+t+"h400000v"+(40+e)+"h-400000z"}(t,Ji);break;case"sqrtSize2":n=function(e,t){return"M983 "+(10+e+t)+"\nl"+e/3.13+" -"+e+"\nc4,-6.7,10,-10,18,-10 H400000v"+(40+e)+"\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM"+(1001+e)+" "+t+"h400000v"+(40+e)+"h-400000z"}(t,Ji);break;case"sqrtSize3":n=function(e,t){return"M424,"+(2398+e+t)+"\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl"+e/4.223+" -"+e+"c4,-6.7,10,-10,18,-10 H400000\nv"+(40+e)+"H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M"+(1001+e)+" "+t+"\nh400000v"+(40+e)+"h-400000z"}(t,Ji);break;case"sqrtSize4":n=function(e,t){return"M473,"+(2713+e+t)+"\nc339.3,-1799.3,509.3,-2700,510,-2702 l"+e/5.298+" -"+e+"\nc3.3,-7.3,9.3,-11,18,-11 H400000v"+(40+e)+"H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM"+(1001+e)+" "+t+"h400000v"+(40+e)+"H1017.7z"}(t,Ji);break;case"sqrtTall":n=function(e,t,r){return"M702 "+(e+t)+"H400000"+(40+e)+"\nH742v"+(r-54-t-e)+"l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 "+t+"H400000v"+(40+e)+"H742z"}(t,Ji,r)}return n}(e,n,r),a=new Ms(e,s),o=new Cs([a],{width:"400em",height:gs(t),viewBox:"0 0 400000 "+r,preserveAspectRatio:"xMinYMin slice"});return Sa.makeSvgSpan(["hide-tail"],[o],i)},Ko=["(","\\lparen",")","\\rparen","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","⌊","⌋","\\lceil","\\rceil","⌈","⌉","\\surd"],Yo=["\\uparrow","\\downarrow","\\updownarrow","\\Uparrow","\\Downarrow","\\Updownarrow","|","\\|","\\vert","\\Vert","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","⟮","⟯","\\lmoustache","\\rmoustache","⎰","⎱"],Xo=["<",">","\\langle","\\rangle","/","\\backslash","\\lt","\\gt"],Wo=[0,1.2,1.8,2.4,3],Zo=[{type:"small",style:Xi.SCRIPTSCRIPT},{type:"small",style:Xi.SCRIPT},{type:"small",style:Xi.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4}],Qo=[{type:"small",style:Xi.SCRIPTSCRIPT},{type:"small",style:Xi.SCRIPT},{type:"small",style:Xi.TEXT},{type:"stack"}],Jo=[{type:"small",style:Xi.SCRIPTSCRIPT},{type:"small",style:Xi.SCRIPT},{type:"small",style:Xi.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4},{type:"stack"}],el=function(e){if("small"===e.type)return"Main-Regular";if("large"===e.type)return"Size"+e.size+"-Regular";if("stack"===e.type)return"Size4-Regular";throw new Error("Add support for delim type '"+e.type+"' here.")},tl=function(e,t,r,n){for(var i=Math.min(2,3-n.style.size);i<r.length&&"stack"!==r[i].type;i++){var s=No(e,el(r[i]),"math"),a=s.height+s.depth;if("small"===r[i].type&&(a*=n.havingBaseStyle(r[i].style).sizeMultiplier),a>t)return r[i]}return r[r.length-1]},rl=function(e,t,r,n,i,s){var a;"<"===e||"\\lt"===e||"⟨"===e?e="\\langle":">"!==e&&"\\gt"!==e&&"⟩"!==e||(e="\\rangle"),a=qi.contains(Xo,e)?Zo:qi.contains(Ko,e)?Jo:Qo;var o=tl(e,t,a,n);return"small"===o.type?function(e,t,r,n,i,s){var a=Sa.makeSymbol(e,"Main-Regular",i,n),o=Ro(a,t,n,s);return r&&qo(o,n,t),o}(e,o.style,r,n,i,s):"large"===o.type?Oo(e,o.size,r,n,i,s):Fo(e,t,r,n,i,s)},nl={sqrtImage:function(e,t){var r,n,i=t.havingBaseSizing(),s=tl("\\surd",e*i.sizeMultiplier,Jo,i),a=i.sizeMultiplier,o=Math.max(0,t.minRuleThickness-t.fontMetrics().sqrtRuleThickness),l=0,h=0,c=0;return"small"===s.type?(e<1?a=1:e<1.4&&(a=.7),h=(1+o)/a,(r=Go("sqrtMain",l=(1+o+Uo)/a,c=1e3+1e3*o+80,o,t)).style.minWidth="0.853em",n=.833/a):"large"===s.type?(c=1080*Wo[s.size],h=(Wo[s.size]+o)/a,l=(Wo[s.size]+o+Uo)/a,(r=Go("sqrtSize"+s.size,l,c,o,t)).style.minWidth="1.02em",n=1/a):(l=e+o+Uo,h=e+o,c=Math.floor(1e3*e+o)+80,(r=Go("sqrtTall",l,c,o,t)).style.minWidth="0.742em",n=1.056),r.height=h,r.style.height=gs(l),{span:r,advanceWidth:n,ruleWidth:(t.fontMetrics().sqrtRuleThickness+o)*a}},sizedDelim:function(e,t,r,n,i){if("<"===e||"\\lt"===e||"⟨"===e?e="\\langle":">"!==e&&"\\gt"!==e&&"⟩"!==e||(e="\\rangle"),qi.contains(Ko,e)||qi.contains(Xo,e))return Oo(e,t,!1,r,n,i);if(qi.contains(Yo,e))return Fo(e,Wo[t],!1,r,n,i);throw new Vi("Illegal delimiter: '"+e+"'")},sizeToMaxHeight:Wo,customSizedDelim:rl,leftRightDelim:function(e,t,r,n,i,s){var a=n.fontMetrics().axisHeight*n.sizeMultiplier,o=5/n.fontMetrics().ptPerEm,l=Math.max(t-a,r+a),h=Math.max(l/500*901,2*l-o);return rl(e,h,!0,n,i,s)}},il={"\\bigl":{mclass:"mopen",size:1},"\\Bigl":{mclass:"mopen",size:2},"\\biggl":{mclass:"mopen",size:3},"\\Biggl":{mclass:"mopen",size:4},"\\bigr":{mclass:"mclose",size:1},"\\Bigr":{mclass:"mclose",size:2},"\\biggr":{mclass:"mclose",size:3},"\\Biggr":{mclass:"mclose",size:4},"\\bigm":{mclass:"mrel",size:1},"\\Bigm":{mclass:"mrel",size:2},"\\biggm":{mclass:"mrel",size:3},"\\Biggm":{mclass:"mrel",size:4},"\\big":{mclass:"mord",size:1},"\\Big":{mclass:"mord",size:2},"\\bigg":{mclass:"mord",size:3},"\\Bigg":{mclass:"mord",size:4}},sl=["(","\\lparen",")","\\rparen","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","⌊","⌋","\\lceil","\\rceil","⌈","⌉","<",">","\\langle","⟨","\\rangle","⟩","\\lt","\\gt","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","⟮","⟯","\\lmoustache","\\rmoustache","⎰","⎱","/","\\backslash","|","\\vert","\\|","\\Vert","\\uparrow","\\Uparrow","\\downarrow","\\Downarrow","\\updownarrow","\\Updownarrow","."];function al(e,t){var r=bo(e);if(r&&qi.contains(sl,r.text))return r;throw new Vi(r?"Invalid delimiter '"+r.text+"' after '"+t.funcName+"'":"Invalid delimiter type '"+e.type+"'",e)}function ol(e){if(!e.body)throw new Error("Bug: The leftright ParseNode wasn't fully parsed.")}Ba({type:"delimsizing",names:["\\bigl","\\Bigl","\\biggl","\\Biggl","\\bigr","\\Bigr","\\biggr","\\Biggr","\\bigm","\\Bigm","\\biggm","\\Biggm","\\big","\\Big","\\bigg","\\Bigg"],props:{numArgs:1,argTypes:["primitive"]},handler:(e,t)=>{var r=al(t[0],e);return{type:"delimsizing",mode:e.parser.mode,size:il[e.funcName].size,mclass:il[e.funcName].mclass,delim:r.text}},htmlBuilder:(e,t)=>"."===e.delim?Sa.makeSpan([e.mclass]):nl.sizedDelim(e.delim,e.size,t,e.mode,[e.mclass]),mathmlBuilder:e=>{var t=[];"."!==e.delim&&t.push(to(e.delim,e.mode));var r=new eo.MathNode("mo",t);"mopen"===e.mclass||"mclose"===e.mclass?r.setAttribute("fence","true"):r.setAttribute("fence","false"),r.setAttribute("stretchy","true");var n=gs(nl.sizeToMaxHeight[e.size]);return r.setAttribute("minsize",n),r.setAttribute("maxsize",n),r}}),Ba({type:"leftright-right",names:["\\right"],props:{numArgs:1,primitive:!0},handler:(e,t)=>{var r=e.parser.gullet.macros.get("\\current@color");if(r&&"string"!=typeof r)throw new Vi("\\current@color set to non-string in \\right");return{type:"leftright-right",mode:e.parser.mode,delim:al(t[0],e).text,color:r}}}),Ba({type:"leftright",names:["\\left"],props:{numArgs:1,primitive:!0},handler:(e,t)=>{var r=al(t[0],e),n=e.parser;++n.leftrightDepth;var i=n.parseExpression(!1);--n.leftrightDepth,n.expect("\\right",!1);var s=fo(n.parseFunction(),"leftright-right");return{type:"leftright",mode:n.mode,body:i,left:r.text,right:s.delim,rightColor:s.color}},htmlBuilder:(e,t)=>{ol(e);for(var r,n,i=$a(e.body,t,!0,["mopen","mclose"]),s=0,a=0,o=!1,l=0;l<i.length;l++)i[l].isMiddle?o=!0:(s=Math.max(i[l].height,s),a=Math.max(i[l].depth,a));if(s*=t.sizeMultiplier,a*=t.sizeMultiplier,r="."===e.left?Ka(t,["mopen"]):nl.leftRightDelim(e.left,s,a,t,e.mode,["mopen"]),i.unshift(r),o)for(var h=1;h<i.length;h++){var c=i[h].isMiddle;c&&(i[h]=nl.leftRightDelim(c.delim,s,a,c.options,e.mode,[]))}if("."===e.right)n=Ka(t,["mclose"]);else{var p=e.rightColor?t.withColor(e.rightColor):t;n=nl.leftRightDelim(e.right,s,a,p,e.mode,["mclose"])}return i.push(n),Sa.makeSpan(["minner"],i,t)},mathmlBuilder:(e,t)=>{ol(e);var r=io(e.body,t);if("."!==e.left){var n=new eo.MathNode("mo",[to(e.left,e.mode)]);n.setAttribute("fence","true"),r.unshift(n)}if("."!==e.right){var i=new eo.MathNode("mo",[to(e.right,e.mode)]);i.setAttribute("fence","true"),e.rightColor&&i.setAttribute("mathcolor",e.rightColor),r.push(i)}return ro(r)}}),Ba({type:"middle",names:["\\middle"],props:{numArgs:1,primitive:!0},handler:(e,t)=>{var r=al(t[0],e);if(!e.parser.leftrightDepth)throw new Vi("\\middle without preceding \\left",r);return{type:"middle",mode:e.parser.mode,delim:r.text}},htmlBuilder:(e,t)=>{var r;if("."===e.delim)r=Ka(t,[]);else{r=nl.sizedDelim(e.delim,1,t,e.mode,[]);var n={delim:e.delim,options:t};r.isMiddle=n}return r},mathmlBuilder:(e,t)=>{var r="\\vert"===e.delim||"|"===e.delim?to("|","text"):to(e.delim,e.mode),n=new eo.MathNode("mo",[r]);return n.setAttribute("fence","true"),n.setAttribute("lspace","0.05em"),n.setAttribute("rspace","0.05em"),n}});var ll=(e,t)=>{var r,n,i,s=Sa.wrapFragment(Ya(e.body,t),t),a=e.label.slice(1),o=t.sizeMultiplier,l=0,h=qi.isCharacterBox(e.body);if("sout"===a)(r=Sa.makeSpan(["stretchy","sout"])).height=t.fontMetrics().defaultRuleThickness/o,l=-.5*t.fontMetrics().xHeight;else if("phase"===a){var c=ms({number:.6,unit:"pt"},t),p=ms({number:.35,unit:"ex"},t);o/=t.havingBaseSizing().sizeMultiplier;var u=s.height+s.depth+c+p;s.style.paddingLeft=gs(u/2+c);var d=Math.floor(1e3*u*o),m="M400000 "+(n=d)+" H0 L"+n/2+" 0 l65 45 L145 "+(n-80)+" H400000z",g=new Cs([new Ms("phase",m)],{width:"400em",height:gs(d/1e3),viewBox:"0 0 400000 "+d,preserveAspectRatio:"xMinYMin slice"});(r=Sa.makeSvgSpan(["hide-tail"],[g],t)).style.height=gs(u),l=s.depth+c+p}else{/cancel/.test(a)?h||s.classes.push("cancel-pad"):"angl"===a?s.classes.push("anglpad"):s.classes.push("boxpad");var f=0,v=0,b=0;/box/.test(a)?(b=Math.max(t.fontMetrics().fboxrule,t.minRuleThickness),v=f=t.fontMetrics().fboxsep+("colorbox"===a?0:b)):"angl"===a?(f=4*(b=Math.max(t.fontMetrics().defaultRuleThickness,t.minRuleThickness)),v=Math.max(0,.25-s.depth)):v=f=h?.2:0,r=uo(s,a,f,v,t),/fbox|boxed|fcolorbox/.test(a)?(r.style.borderStyle="solid",r.style.borderWidth=gs(b)):"angl"===a&&.049!==b&&(r.style.borderTopWidth=gs(b),r.style.borderRightWidth=gs(b)),l=s.depth+v,e.backgroundColor&&(r.style.backgroundColor=e.backgroundColor,e.borderColor&&(r.style.borderColor=e.borderColor))}if(e.backgroundColor)i=Sa.makeVList({positionType:"individualShift",children:[{type:"elem",elem:r,shift:l},{type:"elem",elem:s,shift:0}]},t);else{var w=/cancel|phase/.test(a)?["svg-align"]:[];i=Sa.makeVList({positionType:"individualShift",children:[{type:"elem",elem:s,shift:0},{type:"elem",elem:r,shift:l,wrapperClasses:w}]},t)}return/cancel/.test(a)&&(i.height=s.height,i.depth=s.depth),/cancel/.test(a)&&!h?Sa.makeSpan(["mord","cancel-lap"],[i],t):Sa.makeSpan(["mord"],[i],t)},hl=(e,t)=>{var r=0,n=new eo.MathNode(e.label.indexOf("colorbox")>-1?"mpadded":"menclose",[ao(e.body,t)]);switch(e.label){case"\\cancel":n.setAttribute("notation","updiagonalstrike");break;case"\\bcancel":n.setAttribute("notation","downdiagonalstrike");break;case"\\phase":n.setAttribute("notation","phasorangle");break;case"\\sout":n.setAttribute("notation","horizontalstrike");break;case"\\fbox":n.setAttribute("notation","box");break;case"\\angl":n.setAttribute("notation","actuarial");break;case"\\fcolorbox":case"\\colorbox":if(r=t.fontMetrics().fboxsep*t.fontMetrics().ptPerEm,n.setAttribute("width","+"+2*r+"pt"),n.setAttribute("height","+"+2*r+"pt"),n.setAttribute("lspace",r+"pt"),n.setAttribute("voffset",r+"pt"),"\\fcolorbox"===e.label){var i=Math.max(t.fontMetrics().fboxrule,t.minRuleThickness);n.setAttribute("style","border: "+i+"em solid "+String(e.borderColor))}break;case"\\xcancel":n.setAttribute("notation","updiagonalstrike downdiagonalstrike")}return e.backgroundColor&&n.setAttribute("mathbackground",e.backgroundColor),n};Ba({type:"enclose",names:["\\colorbox"],props:{numArgs:2,allowedInText:!0,argTypes:["color","text"]},handler(e,t,r){var{parser:n,funcName:i}=e,s=fo(t[0],"color-token").color,a=t[1];return{type:"enclose",mode:n.mode,label:i,backgroundColor:s,body:a}},htmlBuilder:ll,mathmlBuilder:hl}),Ba({type:"enclose",names:["\\fcolorbox"],props:{numArgs:3,allowedInText:!0,argTypes:["color","color","text"]},handler(e,t,r){var{parser:n,funcName:i}=e,s=fo(t[0],"color-token").color,a=fo(t[1],"color-token").color,o=t[2];return{type:"enclose",mode:n.mode,label:i,backgroundColor:a,borderColor:s,body:o}},htmlBuilder:ll,mathmlBuilder:hl}),Ba({type:"enclose",names:["\\fbox"],props:{numArgs:1,argTypes:["hbox"],allowedInText:!0},handler(e,t){var{parser:r}=e;return{type:"enclose",mode:r.mode,label:"\\fbox",body:t[0]}}}),Ba({type:"enclose",names:["\\cancel","\\bcancel","\\xcancel","\\sout","\\phase"],props:{numArgs:1},handler(e,t){var{parser:r,funcName:n}=e,i=t[0];return{type:"enclose",mode:r.mode,label:n,body:i}},htmlBuilder:ll,mathmlBuilder:hl}),Ba({type:"enclose",names:["\\angl"],props:{numArgs:1,argTypes:["hbox"],allowedInText:!1},handler(e,t){var{parser:r}=e;return{type:"enclose",mode:r.mode,label:"\\angl",body:t[0]}}});var cl={};function pl(e){for(var{type:t,names:r,props:n,handler:i,htmlBuilder:s,mathmlBuilder:a}=e,o={type:t,numArgs:n.numArgs||0,allowedInText:!1,numOptionalArgs:0,handler:i},l=0;l<r.length;++l)cl[r[l]]=o;s&&(Ta[t]=s),a&&(Va[t]=a)}var ul={};function dl(e,t){ul[e]=t}function ml(e){var t=[];e.consumeSpaces();var r=e.fetch().text;for("\\relax"===r&&(e.consume(),e.consumeSpaces(),r=e.fetch().text);"\\hline"===r||"\\hdashline"===r;)e.consume(),t.push("\\hdashline"===r),e.consumeSpaces(),r=e.fetch().text;return t}var gl=e=>{if(!e.parser.settings.displayMode)throw new Vi("{"+e.envName+"} can be used only in display mode.")};function fl(e){if(-1===e.indexOf("ed"))return-1===e.indexOf("*")}function vl(e,t,r){var{hskipBeforeAndAfter:n,addJot:i,cols:s,arraystretch:a,colSeparationType:o,autoTag:l,singleRow:h,emptySingleRow:c,maxNumCols:p,leqno:u}=t;if(e.gullet.beginGroup(),h||e.gullet.macros.set("\\cr","\\\\\\relax"),!a){var d=e.gullet.expandMacroAsText("\\arraystretch");if(null==d)a=1;else if(!(a=parseFloat(d))||a<0)throw new Vi("Invalid \\arraystretch: "+d)}e.gullet.beginGroup();var m=[],g=[m],f=[],v=[],b=null!=l?[]:void 0;function w(){l&&e.gullet.macros.set("\\@eqnsw","1",!0)}function y(){b&&(e.gullet.macros.get("\\df@tag")?(b.push(e.subparse([new Ti("\\df@tag")])),e.gullet.macros.set("\\df@tag",void 0,!0)):b.push(Boolean(l)&&"1"===e.gullet.macros.get("\\@eqnsw")))}for(w(),v.push(ml(e));;){var x=e.parseExpression(!1,h?"\\end":"\\\\");e.gullet.endGroup(),e.gullet.beginGroup(),x={type:"ordgroup",mode:e.mode,body:x},r&&(x={type:"styling",mode:e.mode,style:r,body:[x]}),m.push(x);var k=e.fetch().text;if("&"===k){if(p&&m.length===p){if(h||o)throw new Vi("Too many tab characters: &",e.nextToken);e.settings.reportNonstrict("textEnv","Too few columns specified in the {array} column argument.")}e.consume()}else{if("\\end"===k){y(),1===m.length&&"styling"===x.type&&0===x.body[0].body.length&&(g.length>1||!c)&&g.pop(),v.length<g.length+1&&v.push([]);break}if("\\\\"!==k)throw new Vi("Expected & or \\\\ or \\cr or \\end",e.nextToken);e.consume();var _=void 0;" "!==e.gullet.future().text&&(_=e.parseSizeGroup(!0)),f.push(_?_.value:null),y(),v.push(ml(e)),m=[],g.push(m),w()}}return e.gullet.endGroup(),e.gullet.endGroup(),{type:"array",mode:e.mode,addJot:i,arraystretch:a,body:g,cols:s,rowGaps:f,hskipBeforeAndAfter:n,hLinesBeforeRow:v,colSeparationType:o,tags:b,leqno:u}}function bl(e){return"d"===e.slice(0,1)?"display":"text"}var wl=function(e,t){var r,n,i=e.body.length,s=e.hLinesBeforeRow,a=0,o=new Array(i),l=[],h=Math.max(t.fontMetrics().arrayRuleWidth,t.minRuleThickness),c=1/t.fontMetrics().ptPerEm,p=5*c;e.colSeparationType&&"small"===e.colSeparationType&&(p=t.havingStyle(Xi.SCRIPT).sizeMultiplier/t.sizeMultiplier*.2778);var u="CD"===e.colSeparationType?ms({number:3,unit:"ex"},t):12*c,d=3*c,m=e.arraystretch*u,g=.7*m,f=.3*m,v=0;function b(e){for(var t=0;t<e.length;++t)t>0&&(v+=.25),l.push({pos:v,isDashed:e[t]})}for(b(s[0]),r=0;r<e.body.length;++r){var w=e.body[r],y=g,x=f;a<w.length&&(a=w.length);var k=new Array(w.length);for(n=0;n<w.length;++n){var _=Ya(w[n],t);x<_.depth&&(x=_.depth),y<_.height&&(y=_.height),k[n]=_}var S=e.rowGaps[r],C=0;S&&(C=ms(S,t))>0&&(x<(C+=f)&&(x=C),C=0),e.addJot&&(x+=d),k.height=y,k.depth=x,v+=y,k.pos=v,v+=x+C,o[r]=k,b(s[r+1])}var M,P,z=v/2+t.fontMetrics().axisHeight,A=e.cols||[],E=[],T=[];if(e.tags&&e.tags.some((e=>e)))for(r=0;r<i;++r){var V=o[r],B=V.pos-z,L=e.tags[r],N=void 0;(N=!0===L?Sa.makeSpan(["eqn-num"],[],t):!1===L?Sa.makeSpan([],[],t):Sa.makeSpan([],$a(L,t,!0),t)).depth=V.depth,N.height=V.height,T.push({type:"elem",elem:N,shift:B})}for(n=0,P=0;n<a||P<A.length;++n,++P){for(var R=A[P]||{},q=!0;"separator"===R.type;){if(q||((M=Sa.makeSpan(["arraycolsep"],[])).style.width=gs(t.fontMetrics().doubleRuleSep),E.push(M)),"|"!==R.separator&&":"!==R.separator)throw new Vi("Invalid separator type: "+R.separator);var O="|"===R.separator?"solid":"dashed",I=Sa.makeSpan(["vertical-separator"],[],t);I.style.height=gs(v),I.style.borderRightWidth=gs(h),I.style.borderRightStyle=O,I.style.margin="0 "+gs(-h/2);var D=v-z;D&&(I.style.verticalAlign=gs(-D)),E.push(I),R=A[++P]||{},q=!1}if(!(n>=a)){var H=void 0;(n>0||e.hskipBeforeAndAfter)&&0!==(H=qi.deflt(R.pregap,p))&&((M=Sa.makeSpan(["arraycolsep"],[])).style.width=gs(H),E.push(M));var $=[];for(r=0;r<i;++r){var j=o[r],F=j[n];if(F){var U=j.pos-z;F.depth=j.depth,F.height=j.height,$.push({type:"elem",elem:F,shift:U})}}$=Sa.makeVList({positionType:"individualShift",children:$},t),$=Sa.makeSpan(["col-align-"+(R.align||"c")],[$]),E.push($),(n<a-1||e.hskipBeforeAndAfter)&&0!==(H=qi.deflt(R.postgap,p))&&((M=Sa.makeSpan(["arraycolsep"],[])).style.width=gs(H),E.push(M))}}if(o=Sa.makeSpan(["mtable"],E),l.length>0){for(var G=Sa.makeLineSpan("hline",t,h),K=Sa.makeLineSpan("hdashline",t,h),Y=[{type:"elem",elem:o,shift:0}];l.length>0;){var X=l.pop(),W=X.pos-z;X.isDashed?Y.push({type:"elem",elem:K,shift:W}):Y.push({type:"elem",elem:G,shift:W})}o=Sa.makeVList({positionType:"individualShift",children:Y},t)}if(0===T.length)return Sa.makeSpan(["mord"],[o],t);var Z=Sa.makeVList({positionType:"individualShift",children:T},t);return Z=Sa.makeSpan(["tag"],[Z],t),Sa.makeFragment([o,Z])},yl={c:"center ",l:"left ",r:"right "},xl=function(e,t){for(var r=[],n=new eo.MathNode("mtd",[],["mtr-glue"]),i=new eo.MathNode("mtd",[],["mml-eqn-num"]),s=0;s<e.body.length;s++){for(var a=e.body[s],o=[],l=0;l<a.length;l++)o.push(new eo.MathNode("mtd",[ao(a[l],t)]));e.tags&&e.tags[s]&&(o.unshift(n),o.push(n),e.leqno?o.unshift(i):o.push(i)),r.push(new eo.MathNode("mtr",o))}var h=new eo.MathNode("mtable",r),c=.5===e.arraystretch?.1:.16+e.arraystretch-1+(e.addJot?.09:0);h.setAttribute("rowspacing",gs(c));var p="",u="";if(e.cols&&e.cols.length>0){var d=e.cols,m="",g=!1,f=0,v=d.length;"separator"===d[0].type&&(p+="top ",f=1),"separator"===d[d.length-1].type&&(p+="bottom ",v-=1);for(var b=f;b<v;b++)"align"===d[b].type?(u+=yl[d[b].align],g&&(m+="none "),g=!0):"separator"===d[b].type&&g&&(m+="|"===d[b].separator?"solid ":"dashed ",g=!1);h.setAttribute("columnalign",u.trim()),/[sd]/.test(m)&&h.setAttribute("columnlines",m.trim())}if("align"===e.colSeparationType){for(var w=e.cols||[],y="",x=1;x<w.length;x++)y+=x%2?"0em ":"1em ";h.setAttribute("columnspacing",y.trim())}else"alignat"===e.colSeparationType||"gather"===e.colSeparationType?h.setAttribute("columnspacing","0em"):"small"===e.colSeparationType?h.setAttribute("columnspacing","0.2778em"):"CD"===e.colSeparationType?h.setAttribute("columnspacing","0.5em"):h.setAttribute("columnspacing","1em");var k="",_=e.hLinesBeforeRow;p+=_[0].length>0?"left ":"",p+=_[_.length-1].length>0?"right ":"";for(var S=1;S<_.length-1;S++)k+=0===_[S].length?"none ":_[S][0]?"dashed ":"solid ";return/[sd]/.test(k)&&h.setAttribute("rowlines",k.trim()),""!==p&&(h=new eo.MathNode("menclose",[h])).setAttribute("notation",p.trim()),e.arraystretch&&e.arraystretch<1&&(h=new eo.MathNode("mstyle",[h])).setAttribute("scriptlevel","1"),h},kl=function(e,t){-1===e.envName.indexOf("ed")&&gl(e);var r,n=[],i=e.envName.indexOf("at")>-1?"alignat":"align",s="split"===e.envName,a=vl(e.parser,{cols:n,addJot:!0,autoTag:s?void 0:fl(e.envName),emptySingleRow:!0,colSeparationType:i,maxNumCols:s?2:void 0,leqno:e.parser.settings.leqno},"display"),o=0,l={type:"ordgroup",mode:e.mode,body:[]};if(t[0]&&"ordgroup"===t[0].type){for(var h="",c=0;c<t[0].body.length;c++){h+=fo(t[0].body[c],"textord").text}r=Number(h),o=2*r}var p=!o;a.body.forEach((function(e){for(var t=1;t<e.length;t+=2){var n=fo(e[t],"styling");fo(n.body[0],"ordgroup").body.unshift(l)}if(p)o<e.length&&(o=e.length);else{var i=e.length/2;if(r<i)throw new Vi("Too many math in a row: expected "+r+", but got "+i,e[0])}}));for(var u=0;u<o;++u){var d="r",m=0;u%2==1?d="l":u>0&&p&&(m=1),n[u]={type:"align",align:d,pregap:m,postgap:0}}return a.colSeparationType=p?"align":"alignat",a};pl({type:"array",names:["array","darray"],props:{numArgs:1},handler(e,t){var r=(bo(t[0])?[t[0]]:fo(t[0],"ordgroup").body).map((function(e){var t=vo(e).text;if(-1!=="lcr".indexOf(t))return{type:"align",align:t};if("|"===t)return{type:"separator",separator:"|"};if(":"===t)return{type:"separator",separator:":"};throw new Vi("Unknown column alignment: "+t,e)})),n={cols:r,hskipBeforeAndAfter:!0,maxNumCols:r.length};return vl(e.parser,n,bl(e.envName))},htmlBuilder:wl,mathmlBuilder:xl}),pl({type:"array",names:["matrix","pmatrix","bmatrix","Bmatrix","vmatrix","Vmatrix","matrix*","pmatrix*","bmatrix*","Bmatrix*","vmatrix*","Vmatrix*"],props:{numArgs:0},handler(e){var t={matrix:null,pmatrix:["(",")"],bmatrix:["[","]"],Bmatrix:["\\{","\\}"],vmatrix:["|","|"],Vmatrix:["\\Vert","\\Vert"]}[e.envName.replace("*","")],r="c",n={hskipBeforeAndAfter:!1,cols:[{type:"align",align:r}]};if("*"===e.envName.charAt(e.envName.length-1)){var i=e.parser;if(i.consumeSpaces(),"["===i.fetch().text){if(i.consume(),i.consumeSpaces(),r=i.fetch().text,-1==="lcr".indexOf(r))throw new Vi("Expected l or c or r",i.nextToken);i.consume(),i.consumeSpaces(),i.expect("]"),i.consume(),n.cols=[{type:"align",align:r}]}}var s=vl(e.parser,n,bl(e.envName)),a=Math.max(0,...s.body.map((e=>e.length)));return s.cols=new Array(a).fill({type:"align",align:r}),t?{type:"leftright",mode:e.mode,body:[s],left:t[0],right:t[1],rightColor:void 0}:s},htmlBuilder:wl,mathmlBuilder:xl}),pl({type:"array",names:["smallmatrix"],props:{numArgs:0},handler(e){var t=vl(e.parser,{arraystretch:.5},"script");return t.colSeparationType="small",t},htmlBuilder:wl,mathmlBuilder:xl}),pl({type:"array",names:["subarray"],props:{numArgs:1},handler(e,t){var r=(bo(t[0])?[t[0]]:fo(t[0],"ordgroup").body).map((function(e){var t=vo(e).text;if(-1!=="lc".indexOf(t))return{type:"align",align:t};throw new Vi("Unknown column alignment: "+t,e)}));if(r.length>1)throw new Vi("{subarray} can contain only one column");var n={cols:r,hskipBeforeAndAfter:!1,arraystretch:.5};if((n=vl(e.parser,n,"script")).body.length>0&&n.body[0].length>1)throw new Vi("{subarray} can contain only one column");return n},htmlBuilder:wl,mathmlBuilder:xl}),pl({type:"array",names:["cases","dcases","rcases","drcases"],props:{numArgs:0},handler(e){var t=vl(e.parser,{arraystretch:1.2,cols:[{type:"align",align:"l",pregap:0,postgap:1},{type:"align",align:"l",pregap:0,postgap:0}]},bl(e.envName));return{type:"leftright",mode:e.mode,body:[t],left:e.envName.indexOf("r")>-1?".":"\\{",right:e.envName.indexOf("r")>-1?"\\}":".",rightColor:void 0}},htmlBuilder:wl,mathmlBuilder:xl}),pl({type:"array",names:["align","align*","aligned","split"],props:{numArgs:0},handler:kl,htmlBuilder:wl,mathmlBuilder:xl}),pl({type:"array",names:["gathered","gather","gather*"],props:{numArgs:0},handler(e){qi.contains(["gather","gather*"],e.envName)&&gl(e);var t={cols:[{type:"align",align:"c"}],addJot:!0,colSeparationType:"gather",autoTag:fl(e.envName),emptySingleRow:!0,leqno:e.parser.settings.leqno};return vl(e.parser,t,"display")},htmlBuilder:wl,mathmlBuilder:xl}),pl({type:"array",names:["alignat","alignat*","alignedat"],props:{numArgs:1},handler:kl,htmlBuilder:wl,mathmlBuilder:xl}),pl({type:"array",names:["equation","equation*"],props:{numArgs:0},handler(e){gl(e);var t={autoTag:fl(e.envName),emptySingleRow:!0,singleRow:!0,maxNumCols:1,leqno:e.parser.settings.leqno};return vl(e.parser,t,"display")},htmlBuilder:wl,mathmlBuilder:xl}),pl({type:"array",names:["CD"],props:{numArgs:0},handler:e=>(gl(e),function(e){var t=[];for(e.gullet.beginGroup(),e.gullet.macros.set("\\cr","\\\\\\relax"),e.gullet.beginGroup();;){t.push(e.parseExpression(!1,"\\\\")),e.gullet.endGroup(),e.gullet.beginGroup();var r=e.fetch().text;if("&"!==r&&"\\\\"!==r){if("\\end"===r){0===t[t.length-1].length&&t.pop();break}throw new Vi("Expected \\\\ or \\cr or \\end",e.nextToken)}e.consume()}for(var n,i,s=[],a=[s],o=0;o<t.length;o++){for(var l=t[o],h={type:"styling",body:[],mode:"math",style:"display"},c=0;c<l.length;c++)if(zo(l[c])){s.push(h);var p=vo(l[c+=1]).text,u=new Array(2);if(u[0]={type:"ordgroup",mode:"math",body:[]},u[1]={type:"ordgroup",mode:"math",body:[]},"=|.".indexOf(p)>-1);else{if(!("<>AV".indexOf(p)>-1))throw new Vi('Expected one of "<>AV=|." after @',l[c]);for(var d=0;d<2;d++){for(var m=!0,g=c+1;g<l.length;g++){if(i=p,("mathord"===(n=l[g]).type||"atom"===n.type)&&n.text===i){m=!1,c=g;break}if(zo(l[g]))throw new Vi("Missing a "+p+" character to complete a CD arrow.",l[g]);u[d].body.push(l[g])}if(m)throw new Vi("Missing a "+p+" character to complete a CD arrow.",l[c])}}var f={type:"styling",body:[Ao(p,u,e)],mode:"math",style:"display"};s.push(f),h={type:"styling",body:[],mode:"math",style:"display"}}else h.body.push(l[c]);o%2==0?s.push(h):s.shift(),s=[],a.push(s)}return e.gullet.endGroup(),e.gullet.endGroup(),{type:"array",mode:"math",body:a,arraystretch:1,addJot:!0,rowGaps:[null],cols:new Array(a[0].length).fill({type:"align",align:"c",pregap:.25,postgap:.25}),colSeparationType:"CD",hLinesBeforeRow:new Array(a.length+1).fill([])}}(e.parser)),htmlBuilder:wl,mathmlBuilder:xl}),dl("\\nonumber","\\gdef\\@eqnsw{0}"),dl("\\notag","\\nonumber"),Ba({type:"text",names:["\\hline","\\hdashline"],props:{numArgs:0,allowedInText:!0,allowedInMath:!0},handler(e,t){throw new Vi(e.funcName+" valid only within array environment")}});var _l=cl;Ba({type:"environment",names:["\\begin","\\end"],props:{numArgs:1,argTypes:["text"]},handler(e,t){var{parser:r,funcName:n}=e,i=t[0];if("ordgroup"!==i.type)throw new Vi("Invalid environment name",i);for(var s="",a=0;a<i.body.length;++a)s+=fo(i.body[a],"textord").text;if("\\begin"===n){if(!_l.hasOwnProperty(s))throw new Vi("No such environment: "+s,i);var o=_l[s],{args:l,optArgs:h}=r.parseArguments("\\begin{"+s+"}",o),c={mode:r.mode,envName:s,parser:r},p=o.handler(c,l,h);r.expect("\\end",!1);var u=r.nextToken,d=fo(r.parseFunction(),"environment");if(d.name!==s)throw new Vi("Mismatch: \\begin{"+s+"} matched by \\end{"+d.name+"}",u);return p}return{type:"environment",mode:r.mode,name:s,nameGroup:i}}});var Sl=(e,t)=>{var r=e.font,n=t.withFont(r);return Ya(e.body,n)},Cl=(e,t)=>{var r=e.font,n=t.withFont(r);return ao(e.body,n)},Ml={"\\Bbb":"\\mathbb","\\bold":"\\mathbf","\\frak":"\\mathfrak","\\bm":"\\boldsymbol"};Ba({type:"font",names:["\\mathrm","\\mathit","\\mathbf","\\mathnormal","\\mathbb","\\mathcal","\\mathfrak","\\mathscr","\\mathsf","\\mathtt","\\Bbb","\\bold","\\frak"],props:{numArgs:1,allowedInArgument:!0},handler:(e,t)=>{var{parser:r,funcName:n}=e,i=Na(t[0]),s=n;return s in Ml&&(s=Ml[s]),{type:"font",mode:r.mode,font:s.slice(1),body:i}},htmlBuilder:Sl,mathmlBuilder:Cl}),Ba({type:"mclass",names:["\\boldsymbol","\\bm"],props:{numArgs:1},handler:(e,t)=>{var{parser:r}=e,n=t[0],i=qi.isCharacterBox(n);return{type:"mclass",mode:r.mode,mclass:Mo(n),body:[{type:"font",mode:r.mode,font:"boldsymbol",body:n}],isCharacterBox:i}}}),Ba({type:"font",names:["\\rm","\\sf","\\tt","\\bf","\\it","\\cal"],props:{numArgs:0,allowedInText:!0},handler:(e,t)=>{var{parser:r,funcName:n,breakOnTokenText:i}=e,{mode:s}=r,a=r.parseExpression(!0,i);return{type:"font",mode:s,font:"math"+n.slice(1),body:{type:"ordgroup",mode:r.mode,body:a}}},htmlBuilder:Sl,mathmlBuilder:Cl});var Pl=(e,t)=>{var r=t;return"display"===e?r=r.id>=Xi.SCRIPT.id?r.text():Xi.DISPLAY:"text"===e&&r.size===Xi.DISPLAY.size?r=Xi.TEXT:"script"===e?r=Xi.SCRIPT:"scriptscript"===e&&(r=Xi.SCRIPTSCRIPT),r},zl=(e,t)=>{var r,n=Pl(e.size,t.style),i=n.fracNum(),s=n.fracDen();r=t.havingStyle(i);var a=Ya(e.numer,r,t);if(e.continued){var o=8.5/t.fontMetrics().ptPerEm,l=3.5/t.fontMetrics().ptPerEm;a.height=a.height<o?o:a.height,a.depth=a.depth<l?l:a.depth}r=t.havingStyle(s);var h,c,p,u,d,m,g,f,v,b,w=Ya(e.denom,r,t);if(e.hasBarLine?(e.barSize?(c=ms(e.barSize,t),h=Sa.makeLineSpan("frac-line",t,c)):h=Sa.makeLineSpan("frac-line",t),c=h.height,p=h.height):(h=null,c=0,p=t.fontMetrics().defaultRuleThickness),n.size===Xi.DISPLAY.size||"display"===e.size?(u=t.fontMetrics().num1,d=c>0?3*p:7*p,m=t.fontMetrics().denom1):(c>0?(u=t.fontMetrics().num2,d=p):(u=t.fontMetrics().num3,d=3*p),m=t.fontMetrics().denom2),h){var y=t.fontMetrics().axisHeight;u-a.depth-(y+.5*c)<d&&(u+=d-(u-a.depth-(y+.5*c))),y-.5*c-(w.height-m)<d&&(m+=d-(y-.5*c-(w.height-m)));var x=-(y-.5*c);g=Sa.makeVList({positionType:"individualShift",children:[{type:"elem",elem:w,shift:m},{type:"elem",elem:h,shift:x},{type:"elem",elem:a,shift:-u}]},t)}else{var k=u-a.depth-(w.height-m);k<d&&(u+=.5*(d-k),m+=.5*(d-k)),g=Sa.makeVList({positionType:"individualShift",children:[{type:"elem",elem:w,shift:m},{type:"elem",elem:a,shift:-u}]},t)}return r=t.havingStyle(n),g.height*=r.sizeMultiplier/t.sizeMultiplier,g.depth*=r.sizeMultiplier/t.sizeMultiplier,f=n.size===Xi.DISPLAY.size?t.fontMetrics().delim1:n.size===Xi.SCRIPTSCRIPT.size?t.havingStyle(Xi.SCRIPT).fontMetrics().delim2:t.fontMetrics().delim2,v=null==e.leftDelim?Ka(t,["mopen"]):nl.customSizedDelim(e.leftDelim,f,!0,t.havingStyle(n),e.mode,["mopen"]),b=e.continued?Sa.makeSpan([]):null==e.rightDelim?Ka(t,["mclose"]):nl.customSizedDelim(e.rightDelim,f,!0,t.havingStyle(n),e.mode,["mclose"]),Sa.makeSpan(["mord"].concat(r.sizingClasses(t)),[v,Sa.makeSpan(["mfrac"],[g]),b],t)},Al=(e,t)=>{var r=new eo.MathNode("mfrac",[ao(e.numer,t),ao(e.denom,t)]);if(e.hasBarLine){if(e.barSize){var n=ms(e.barSize,t);r.setAttribute("linethickness",gs(n))}}else r.setAttribute("linethickness","0px");var i=Pl(e.size,t.style);if(i.size!==t.style.size){r=new eo.MathNode("mstyle",[r]);var s=i.size===Xi.DISPLAY.size?"true":"false";r.setAttribute("displaystyle",s),r.setAttribute("scriptlevel","0")}if(null!=e.leftDelim||null!=e.rightDelim){var a=[];if(null!=e.leftDelim){var o=new eo.MathNode("mo",[new eo.TextNode(e.leftDelim.replace("\\",""))]);o.setAttribute("fence","true"),a.push(o)}if(a.push(r),null!=e.rightDelim){var l=new eo.MathNode("mo",[new eo.TextNode(e.rightDelim.replace("\\",""))]);l.setAttribute("fence","true"),a.push(l)}return ro(a)}return r};Ba({type:"genfrac",names:["\\dfrac","\\frac","\\tfrac","\\dbinom","\\binom","\\tbinom","\\\\atopfrac","\\\\bracefrac","\\\\brackfrac"],props:{numArgs:2,allowedInArgument:!0},handler:(e,t)=>{var r,{parser:n,funcName:i}=e,s=t[0],a=t[1],o=null,l=null,h="auto";switch(i){case"\\dfrac":case"\\frac":case"\\tfrac":r=!0;break;case"\\\\atopfrac":r=!1;break;case"\\dbinom":case"\\binom":case"\\tbinom":r=!1,o="(",l=")";break;case"\\\\bracefrac":r=!1,o="\\{",l="\\}";break;case"\\\\brackfrac":r=!1,o="[",l="]";break;default:throw new Error("Unrecognized genfrac command")}switch(i){case"\\dfrac":case"\\dbinom":h="display";break;case"\\tfrac":case"\\tbinom":h="text"}return{type:"genfrac",mode:n.mode,continued:!1,numer:s,denom:a,hasBarLine:r,leftDelim:o,rightDelim:l,size:h,barSize:null}},htmlBuilder:zl,mathmlBuilder:Al}),Ba({type:"genfrac",names:["\\cfrac"],props:{numArgs:2},handler:(e,t)=>{var{parser:r,funcName:n}=e,i=t[0],s=t[1];return{type:"genfrac",mode:r.mode,continued:!0,numer:i,denom:s,hasBarLine:!0,leftDelim:null,rightDelim:null,size:"display",barSize:null}}}),Ba({type:"infix",names:["\\over","\\choose","\\atop","\\brace","\\brack"],props:{numArgs:0,infix:!0},handler(e){var t,{parser:r,funcName:n,token:i}=e;switch(n){case"\\over":t="\\frac";break;case"\\choose":t="\\binom";break;case"\\atop":t="\\\\atopfrac";break;case"\\brace":t="\\\\bracefrac";break;case"\\brack":t="\\\\brackfrac";break;default:throw new Error("Unrecognized infix genfrac command")}return{type:"infix",mode:r.mode,replaceWith:t,token:i}}});var El=["display","text","script","scriptscript"],Tl=function(e){var t=null;return e.length>0&&(t="."===(t=e)?null:t),t};Ba({type:"genfrac",names:["\\genfrac"],props:{numArgs:6,allowedInArgument:!0,argTypes:["math","math","size","text","math","math"]},handler(e,t){var r,{parser:n}=e,i=t[4],s=t[5],a=Na(t[0]),o="atom"===a.type&&"open"===a.family?Tl(a.text):null,l=Na(t[1]),h="atom"===l.type&&"close"===l.family?Tl(l.text):null,c=fo(t[2],"size"),p=null;r=!!c.isBlank||(p=c.value).number>0;var u="auto",d=t[3];if("ordgroup"===d.type){if(d.body.length>0){var m=fo(d.body[0],"textord");u=El[Number(m.text)]}}else d=fo(d,"textord"),u=El[Number(d.text)];return{type:"genfrac",mode:n.mode,numer:i,denom:s,continued:!1,hasBarLine:r,barSize:p,leftDelim:o,rightDelim:h,size:u}},htmlBuilder:zl,mathmlBuilder:Al}),Ba({type:"infix",names:["\\above"],props:{numArgs:1,argTypes:["size"],infix:!0},handler(e,t){var{parser:r,funcName:n,token:i}=e;return{type:"infix",mode:r.mode,replaceWith:"\\\\abovefrac",size:fo(t[0],"size").value,token:i}}}),Ba({type:"genfrac",names:["\\\\abovefrac"],props:{numArgs:3,argTypes:["math","size","math"]},handler:(e,t)=>{var{parser:r,funcName:n}=e,i=t[0],s=function(e){if(!e)throw new Error("Expected non-null, but got "+String(e));return e}(fo(t[1],"infix").size),a=t[2],o=s.number>0;return{type:"genfrac",mode:r.mode,numer:i,denom:a,continued:!1,hasBarLine:o,barSize:s,leftDelim:null,rightDelim:null,size:"auto"}},htmlBuilder:zl,mathmlBuilder:Al});var Vl=(e,t)=>{var r,n,i=t.style;"supsub"===e.type?(r=e.sup?Ya(e.sup,t.havingStyle(i.sup()),t):Ya(e.sub,t.havingStyle(i.sub()),t),n=fo(e.base,"horizBrace")):n=fo(e,"horizBrace");var s,a=Ya(n.base,t.havingBaseStyle(Xi.DISPLAY)),o=go(n,t);if(n.isOver?(s=Sa.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:a},{type:"kern",size:.1},{type:"elem",elem:o}]},t)).children[0].children[0].children[1].classes.push("svg-align"):(s=Sa.makeVList({positionType:"bottom",positionData:a.depth+.1+o.height,children:[{type:"elem",elem:o},{type:"kern",size:.1},{type:"elem",elem:a}]},t)).children[0].children[0].children[0].classes.push("svg-align"),r){var l=Sa.makeSpan(["mord",n.isOver?"mover":"munder"],[s],t);s=n.isOver?Sa.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:l},{type:"kern",size:.2},{type:"elem",elem:r}]},t):Sa.makeVList({positionType:"bottom",positionData:l.depth+.2+r.height+r.depth,children:[{type:"elem",elem:r},{type:"kern",size:.2},{type:"elem",elem:l}]},t)}return Sa.makeSpan(["mord",n.isOver?"mover":"munder"],[s],t)};Ba({type:"horizBrace",names:["\\overbrace","\\underbrace"],props:{numArgs:1},handler(e,t){var{parser:r,funcName:n}=e;return{type:"horizBrace",mode:r.mode,label:n,isOver:/^\\over/.test(n),base:t[0]}},htmlBuilder:Vl,mathmlBuilder:(e,t)=>{var r=mo(e.label);return new eo.MathNode(e.isOver?"mover":"munder",[ao(e.base,t),r])}}),Ba({type:"href",names:["\\href"],props:{numArgs:2,argTypes:["url","original"],allowedInText:!0},handler:(e,t)=>{var{parser:r}=e,n=t[1],i=fo(t[0],"url").url;return r.settings.isTrusted({command:"\\href",url:i})?{type:"href",mode:r.mode,href:i,body:Ra(n)}:r.formatUnsupportedCmd("\\href")},htmlBuilder:(e,t)=>{var r=$a(e.body,t,!1);return Sa.makeAnchor(e.href,[],r,t)},mathmlBuilder:(e,t)=>{var r=so(e.body,t);return r instanceof Qa||(r=new Qa("mrow",[r])),r.setAttribute("href",e.href),r}}),Ba({type:"href",names:["\\url"],props:{numArgs:1,argTypes:["url"],allowedInText:!0},handler:(e,t)=>{var{parser:r}=e,n=fo(t[0],"url").url;if(!r.settings.isTrusted({command:"\\url",url:n}))return r.formatUnsupportedCmd("\\url");for(var i=[],s=0;s<n.length;s++){var a=n[s];"~"===a&&(a="\\textasciitilde"),i.push({type:"textord",mode:"text",text:a})}var o={type:"text",mode:r.mode,font:"\\texttt",body:i};return{type:"href",mode:r.mode,href:n,body:Ra(o)}}}),Ba({type:"hbox",names:["\\hbox"],props:{numArgs:1,argTypes:["text"],allowedInText:!0,primitive:!0},handler(e,t){var{parser:r}=e;return{type:"hbox",mode:r.mode,body:Ra(t[0])}},htmlBuilder(e,t){var r=$a(e.body,t,!1);return Sa.makeFragment(r)},mathmlBuilder:(e,t)=>new eo.MathNode("mrow",io(e.body,t))}),Ba({type:"html",names:["\\htmlClass","\\htmlId","\\htmlStyle","\\htmlData"],props:{numArgs:2,argTypes:["raw","original"],allowedInText:!0},handler:(e,t)=>{var r,{parser:n,funcName:i,token:s}=e,a=fo(t[0],"raw").string,o=t[1];n.settings.strict&&n.settings.reportNonstrict("htmlExtension","HTML extension is disabled on strict mode");var l={};switch(i){case"\\htmlClass":l.class=a,r={command:"\\htmlClass",class:a};break;case"\\htmlId":l.id=a,r={command:"\\htmlId",id:a};break;case"\\htmlStyle":l.style=a,r={command:"\\htmlStyle",style:a};break;case"\\htmlData":for(var h=a.split(","),c=0;c<h.length;c++){var p=h[c].split("=");if(2!==p.length)throw new Vi("Error parsing key-value for \\htmlData");l["data-"+p[0].trim()]=p[1].trim()}r={command:"\\htmlData",attributes:l};break;default:throw new Error("Unrecognized html command")}return n.settings.isTrusted(r)?{type:"html",mode:n.mode,attributes:l,body:Ra(o)}:n.formatUnsupportedCmd(i)},htmlBuilder:(e,t)=>{var r=$a(e.body,t,!1),n=["enclosing"];e.attributes.class&&n.push(...e.attributes.class.trim().split(/\s+/));var i=Sa.makeSpan(n,r,t);for(var s in e.attributes)"class"!==s&&e.attributes.hasOwnProperty(s)&&i.setAttribute(s,e.attributes[s]);return i},mathmlBuilder:(e,t)=>so(e.body,t)}),Ba({type:"htmlmathml",names:["\\html@mathml"],props:{numArgs:2,allowedInText:!0},handler:(e,t)=>{var{parser:r}=e;return{type:"htmlmathml",mode:r.mode,html:Ra(t[0]),mathml:Ra(t[1])}},htmlBuilder:(e,t)=>{var r=$a(e.html,t,!1);return Sa.makeFragment(r)},mathmlBuilder:(e,t)=>so(e.mathml,t)});var Bl=function(e){if(/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e))return{number:+e,unit:"bp"};var t=/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);if(!t)throw new Vi("Invalid size: '"+e+"' in \\includegraphics");var r={number:+(t[1]+t[2]),unit:t[3]};if(!ds(r))throw new Vi("Invalid unit: '"+r.unit+"' in \\includegraphics.");return r};Ba({type:"includegraphics",names:["\\includegraphics"],props:{numArgs:1,numOptionalArgs:1,argTypes:["raw","url"],allowedInText:!1},handler:(e,t,r)=>{var{parser:n}=e,i={number:0,unit:"em"},s={number:.9,unit:"em"},a={number:0,unit:"em"},o="";if(r[0])for(var l=fo(r[0],"raw").string.split(","),h=0;h<l.length;h++){var c=l[h].split("=");if(2===c.length){var p=c[1].trim();switch(c[0].trim()){case"alt":o=p;break;case"width":i=Bl(p);break;case"height":s=Bl(p);break;case"totalheight":a=Bl(p);break;default:throw new Vi("Invalid key: '"+c[0]+"' in \\includegraphics.")}}}var u=fo(t[0],"url").url;return""===o&&(o=(o=(o=u).replace(/^.*[\\/]/,"")).substring(0,o.lastIndexOf("."))),n.settings.isTrusted({command:"\\includegraphics",url:u})?{type:"includegraphics",mode:n.mode,alt:o,width:i,height:s,totalheight:a,src:u}:n.formatUnsupportedCmd("\\includegraphics")},htmlBuilder:(e,t)=>{var r=ms(e.height,t),n=0;e.totalheight.number>0&&(n=ms(e.totalheight,t)-r);var i=0;e.width.number>0&&(i=ms(e.width,t));var s={height:gs(r+n)};i>0&&(s.width=gs(i)),n>0&&(s.verticalAlign=gs(-n));var a=new ks(e.src,e.alt,s);return a.height=r,a.depth=n,a},mathmlBuilder:(e,t)=>{var r=new eo.MathNode("mglyph",[]);r.setAttribute("alt",e.alt);var n=ms(e.height,t),i=0;if(e.totalheight.number>0&&(i=ms(e.totalheight,t)-n,r.setAttribute("valign",gs(-i))),r.setAttribute("height",gs(n+i)),e.width.number>0){var s=ms(e.width,t);r.setAttribute("width",gs(s))}return r.setAttribute("src",e.src),r}}),Ba({type:"kern",names:["\\kern","\\mkern","\\hskip","\\mskip"],props:{numArgs:1,argTypes:["size"],primitive:!0,allowedInText:!0},handler(e,t){var{parser:r,funcName:n}=e,i=fo(t[0],"size");if(r.settings.strict){var s="m"===n[1],a="mu"===i.value.unit;s?(a||r.settings.reportNonstrict("mathVsTextUnits","LaTeX's "+n+" supports only mu units, not "+i.value.unit+" units"),"math"!==r.mode&&r.settings.reportNonstrict("mathVsTextUnits","LaTeX's "+n+" works only in math mode")):a&&r.settings.reportNonstrict("mathVsTextUnits","LaTeX's "+n+" doesn't support mu units")}return{type:"kern",mode:r.mode,dimension:i.value}},htmlBuilder:(e,t)=>Sa.makeGlue(e.dimension,t),mathmlBuilder(e,t){var r=ms(e.dimension,t);return new eo.SpaceNode(r)}}),Ba({type:"lap",names:["\\mathllap","\\mathrlap","\\mathclap"],props:{numArgs:1,allowedInText:!0},handler:(e,t)=>{var{parser:r,funcName:n}=e,i=t[0];return{type:"lap",mode:r.mode,alignment:n.slice(5),body:i}},htmlBuilder:(e,t)=>{var r;"clap"===e.alignment?(r=Sa.makeSpan([],[Ya(e.body,t)]),r=Sa.makeSpan(["inner"],[r],t)):r=Sa.makeSpan(["inner"],[Ya(e.body,t)]);var n=Sa.makeSpan(["fix"],[]),i=Sa.makeSpan([e.alignment],[r,n],t),s=Sa.makeSpan(["strut"]);return s.style.height=gs(i.height+i.depth),i.depth&&(s.style.verticalAlign=gs(-i.depth)),i.children.unshift(s),i=Sa.makeSpan(["thinbox"],[i],t),Sa.makeSpan(["mord","vbox"],[i],t)},mathmlBuilder:(e,t)=>{var r=new eo.MathNode("mpadded",[ao(e.body,t)]);if("rlap"!==e.alignment){var n="llap"===e.alignment?"-1":"-0.5";r.setAttribute("lspace",n+"width")}return r.setAttribute("width","0px"),r}}),Ba({type:"styling",names:["\\(","$"],props:{numArgs:0,allowedInText:!0,allowedInMath:!1},handler(e,t){var{funcName:r,parser:n}=e,i=n.mode;n.switchMode("math");var s="\\("===r?"\\)":"$",a=n.parseExpression(!1,s);return n.expect(s),n.switchMode(i),{type:"styling",mode:n.mode,style:"text",body:a}}}),Ba({type:"text",names:["\\)","\\]"],props:{numArgs:0,allowedInText:!0,allowedInMath:!1},handler(e,t){throw new Vi("Mismatched "+e.funcName)}});var Ll=(e,t)=>{switch(t.style.size){case Xi.DISPLAY.size:return e.display;case Xi.TEXT.size:return e.text;case Xi.SCRIPT.size:return e.script;case Xi.SCRIPTSCRIPT.size:return e.scriptscript;default:return e.text}};Ba({type:"mathchoice",names:["\\mathchoice"],props:{numArgs:4,primitive:!0},handler:(e,t)=>{var{parser:r}=e;return{type:"mathchoice",mode:r.mode,display:Ra(t[0]),text:Ra(t[1]),script:Ra(t[2]),scriptscript:Ra(t[3])}},htmlBuilder:(e,t)=>{var r=Ll(e,t),n=$a(r,t,!1);return Sa.makeFragment(n)},mathmlBuilder:(e,t)=>{var r=Ll(e,t);return so(r,t)}});var Nl=(e,t,r,n,i,s,a)=>{e=Sa.makeSpan([],[e]);var o,l,h,c=r&&qi.isCharacterBox(r);if(t){var p=Ya(t,n.havingStyle(i.sup()),n);l={elem:p,kern:Math.max(n.fontMetrics().bigOpSpacing1,n.fontMetrics().bigOpSpacing3-p.depth)}}if(r){var u=Ya(r,n.havingStyle(i.sub()),n);o={elem:u,kern:Math.max(n.fontMetrics().bigOpSpacing2,n.fontMetrics().bigOpSpacing4-u.height)}}if(l&&o){var d=n.fontMetrics().bigOpSpacing5+o.elem.height+o.elem.depth+o.kern+e.depth+a;h=Sa.makeVList({positionType:"bottom",positionData:d,children:[{type:"kern",size:n.fontMetrics().bigOpSpacing5},{type:"elem",elem:o.elem,marginLeft:gs(-s)},{type:"kern",size:o.kern},{type:"elem",elem:e},{type:"kern",size:l.kern},{type:"elem",elem:l.elem,marginLeft:gs(s)},{type:"kern",size:n.fontMetrics().bigOpSpacing5}]},n)}else if(o){var m=e.height-a;h=Sa.makeVList({positionType:"top",positionData:m,children:[{type:"kern",size:n.fontMetrics().bigOpSpacing5},{type:"elem",elem:o.elem,marginLeft:gs(-s)},{type:"kern",size:o.kern},{type:"elem",elem:e}]},n)}else{if(!l)return e;var g=e.depth+a;h=Sa.makeVList({positionType:"bottom",positionData:g,children:[{type:"elem",elem:e},{type:"kern",size:l.kern},{type:"elem",elem:l.elem,marginLeft:gs(s)},{type:"kern",size:n.fontMetrics().bigOpSpacing5}]},n)}var f=[h];if(o&&0!==s&&!c){var v=Sa.makeSpan(["mspace"],[],n);v.style.marginRight=gs(s),f.unshift(v)}return Sa.makeSpan(["mop","op-limits"],f,n)},Rl=["\\smallint"],ql=(e,t)=>{var r,n,i,s=!1;"supsub"===e.type?(r=e.sup,n=e.sub,i=fo(e.base,"op"),s=!0):i=fo(e,"op");var a,o=t.style,l=!1;if(o.size===Xi.DISPLAY.size&&i.symbol&&!qi.contains(Rl,i.name)&&(l=!0),i.symbol){var h=l?"Size2-Regular":"Size1-Regular",c="";if("\\oiint"!==i.name&&"\\oiiint"!==i.name||(c=i.name.slice(1),i.name="oiint"===c?"\\iint":"\\iiint"),a=Sa.makeSymbol(i.name,h,"math",t,["mop","op-symbol",l?"large-op":"small-op"]),c.length>0){var p=a.italic,u=Sa.staticSvg(c+"Size"+(l?"2":"1"),t);a=Sa.makeVList({positionType:"individualShift",children:[{type:"elem",elem:a,shift:0},{type:"elem",elem:u,shift:l?.08:0}]},t),i.name="\\"+c,a.classes.unshift("mop"),a.italic=p}}else if(i.body){var d=$a(i.body,t,!0);1===d.length&&d[0]instanceof Ss?(a=d[0]).classes[0]="mop":a=Sa.makeSpan(["mop"],d,t)}else{for(var m=[],g=1;g<i.name.length;g++)m.push(Sa.mathsym(i.name[g],i.mode,t));a=Sa.makeSpan(["mop"],m,t)}var f=0,v=0;return(a instanceof Ss||"\\oiint"===i.name||"\\oiiint"===i.name)&&!i.suppressBaseShift&&(f=(a.height-a.depth)/2-t.fontMetrics().axisHeight,v=a.italic),s?Nl(a,r,n,t,o,v,f):(f&&(a.style.position="relative",a.style.top=gs(f)),a)},Ol=(e,t)=>{var r;if(e.symbol)r=new Qa("mo",[to(e.name,e.mode)]),qi.contains(Rl,e.name)&&r.setAttribute("largeop","false");else if(e.body)r=new Qa("mo",io(e.body,t));else{r=new Qa("mi",[new Ja(e.name.slice(1))]);var n=new Qa("mo",[to("⁡","text")]);r=e.parentIsSupSub?new Qa("mrow",[r,n]):Za([r,n])}return r},Il={"∏":"\\prod","∐":"\\coprod","∑":"\\sum","⋀":"\\bigwedge","⋁":"\\bigvee","⋂":"\\bigcap","⋃":"\\bigcup","⨀":"\\bigodot","⨁":"\\bigoplus","⨂":"\\bigotimes","⨄":"\\biguplus","⨆":"\\bigsqcup"};Ba({type:"op",names:["\\coprod","\\bigvee","\\bigwedge","\\biguplus","\\bigcap","\\bigcup","\\intop","\\prod","\\sum","\\bigotimes","\\bigoplus","\\bigodot","\\bigsqcup","\\smallint","∏","∐","∑","⋀","⋁","⋂","⋃","⨀","⨁","⨂","⨄","⨆"],props:{numArgs:0},handler:(e,t)=>{var{parser:r,funcName:n}=e,i=n;return 1===i.length&&(i=Il[i]),{type:"op",mode:r.mode,limits:!0,parentIsSupSub:!1,symbol:!0,name:i}},htmlBuilder:ql,mathmlBuilder:Ol}),Ba({type:"op",names:["\\mathop"],props:{numArgs:1,primitive:!0},handler:(e,t)=>{var{parser:r}=e,n=t[0];return{type:"op",mode:r.mode,limits:!1,parentIsSupSub:!1,symbol:!1,body:Ra(n)}},htmlBuilder:ql,mathmlBuilder:Ol});var Dl={"∫":"\\int","∬":"\\iint","∭":"\\iiint","∮":"\\oint","∯":"\\oiint","∰":"\\oiiint"};Ba({type:"op",names:["\\arcsin","\\arccos","\\arctan","\\arctg","\\arcctg","\\arg","\\ch","\\cos","\\cosec","\\cosh","\\cot","\\cotg","\\coth","\\csc","\\ctg","\\cth","\\deg","\\dim","\\exp","\\hom","\\ker","\\lg","\\ln","\\log","\\sec","\\sin","\\sinh","\\sh","\\tan","\\tanh","\\tg","\\th"],props:{numArgs:0},handler(e){var{parser:t,funcName:r}=e;return{type:"op",mode:t.mode,limits:!1,parentIsSupSub:!1,symbol:!1,name:r}},htmlBuilder:ql,mathmlBuilder:Ol}),Ba({type:"op",names:["\\det","\\gcd","\\inf","\\lim","\\max","\\min","\\Pr","\\sup"],props:{numArgs:0},handler(e){var{parser:t,funcName:r}=e;return{type:"op",mode:t.mode,limits:!0,parentIsSupSub:!1,symbol:!1,name:r}},htmlBuilder:ql,mathmlBuilder:Ol}),Ba({type:"op",names:["\\int","\\iint","\\iiint","\\oint","\\oiint","\\oiiint","∫","∬","∭","∮","∯","∰"],props:{numArgs:0},handler(e){var{parser:t,funcName:r}=e,n=r;return 1===n.length&&(n=Dl[n]),{type:"op",mode:t.mode,limits:!1,parentIsSupSub:!1,symbol:!0,name:n}},htmlBuilder:ql,mathmlBuilder:Ol});var Hl=(e,t)=>{var r,n,i,s,a=!1;if("supsub"===e.type?(r=e.sup,n=e.sub,i=fo(e.base,"operatorname"),a=!0):i=fo(e,"operatorname"),i.body.length>0){for(var o=i.body.map((e=>{var t=e.text;return"string"==typeof t?{type:"textord",mode:e.mode,text:t}:e})),l=$a(o,t.withFont("mathrm"),!0),h=0;h<l.length;h++){var c=l[h];c instanceof Ss&&(c.text=c.text.replace(/\u2212/,"-").replace(/\u2217/,"*"))}s=Sa.makeSpan(["mop"],l,t)}else s=Sa.makeSpan(["mop"],[],t);return a?Nl(s,r,n,t,t.style,0,0):s};function $l(e,t,r){for(var n=$a(e,t,!1),i=t.sizeMultiplier/r.sizeMultiplier,s=0;s<n.length;s++){var a=n[s].classes.indexOf("sizing");a<0?Array.prototype.push.apply(n[s].classes,t.sizingClasses(r)):n[s].classes[a+1]==="reset-size"+t.size&&(n[s].classes[a+1]="reset-size"+r.size),n[s].height*=i,n[s].depth*=i}return Sa.makeFragment(n)}Ba({type:"operatorname",names:["\\operatorname@","\\operatornamewithlimits"],props:{numArgs:1},handler:(e,t)=>{var{parser:r,funcName:n}=e,i=t[0];return{type:"operatorname",mode:r.mode,body:Ra(i),alwaysHandleSupSub:"\\operatornamewithlimits"===n,limits:!1,parentIsSupSub:!1}},htmlBuilder:Hl,mathmlBuilder:(e,t)=>{for(var r=io(e.body,t.withFont("mathrm")),n=!0,i=0;i<r.length;i++){var s=r[i];if(s instanceof eo.SpaceNode);else if(s instanceof eo.MathNode)switch(s.type){case"mi":case"mn":case"ms":case"mspace":case"mtext":break;case"mo":var a=s.children[0];1===s.children.length&&a instanceof eo.TextNode?a.text=a.text.replace(/\u2212/,"-").replace(/\u2217/,"*"):n=!1;break;default:n=!1}else n=!1}if(n){var o=r.map((e=>e.toText())).join("");r=[new eo.TextNode(o)]}var l=new eo.MathNode("mi",r);l.setAttribute("mathvariant","normal");var h=new eo.MathNode("mo",[to("⁡","text")]);return e.parentIsSupSub?new eo.MathNode("mrow",[l,h]):eo.newDocumentFragment([l,h])}}),dl("\\operatorname","\\@ifstar\\operatornamewithlimits\\operatorname@"),La({type:"ordgroup",htmlBuilder:(e,t)=>e.semisimple?Sa.makeFragment($a(e.body,t,!1)):Sa.makeSpan(["mord"],$a(e.body,t,!0),t),mathmlBuilder:(e,t)=>so(e.body,t,!0)}),Ba({type:"overline",names:["\\overline"],props:{numArgs:1},handler(e,t){var{parser:r}=e,n=t[0];return{type:"overline",mode:r.mode,body:n}},htmlBuilder(e,t){var r=Ya(e.body,t.havingCrampedStyle()),n=Sa.makeLineSpan("overline-line",t),i=t.fontMetrics().defaultRuleThickness,s=Sa.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r},{type:"kern",size:3*i},{type:"elem",elem:n},{type:"kern",size:i}]},t);return Sa.makeSpan(["mord","overline"],[s],t)},mathmlBuilder(e,t){var r=new eo.MathNode("mo",[new eo.TextNode("‾")]);r.setAttribute("stretchy","true");var n=new eo.MathNode("mover",[ao(e.body,t),r]);return n.setAttribute("accent","true"),n}}),Ba({type:"phantom",names:["\\phantom"],props:{numArgs:1,allowedInText:!0},handler:(e,t)=>{var{parser:r}=e,n=t[0];return{type:"phantom",mode:r.mode,body:Ra(n)}},htmlBuilder:(e,t)=>{var r=$a(e.body,t.withPhantom(),!1);return Sa.makeFragment(r)},mathmlBuilder:(e,t)=>{var r=io(e.body,t);return new eo.MathNode("mphantom",r)}}),Ba({type:"hphantom",names:["\\hphantom"],props:{numArgs:1,allowedInText:!0},handler:(e,t)=>{var{parser:r}=e,n=t[0];return{type:"hphantom",mode:r.mode,body:n}},htmlBuilder:(e,t)=>{var r=Sa.makeSpan([],[Ya(e.body,t.withPhantom())]);if(r.height=0,r.depth=0,r.children)for(var n=0;n<r.children.length;n++)r.children[n].height=0,r.children[n].depth=0;return r=Sa.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r}]},t),Sa.makeSpan(["mord"],[r],t)},mathmlBuilder:(e,t)=>{var r=io(Ra(e.body),t),n=new eo.MathNode("mphantom",r),i=new eo.MathNode("mpadded",[n]);return i.setAttribute("height","0px"),i.setAttribute("depth","0px"),i}}),Ba({type:"vphantom",names:["\\vphantom"],props:{numArgs:1,allowedInText:!0},handler:(e,t)=>{var{parser:r}=e,n=t[0];return{type:"vphantom",mode:r.mode,body:n}},htmlBuilder:(e,t)=>{var r=Sa.makeSpan(["inner"],[Ya(e.body,t.withPhantom())]),n=Sa.makeSpan(["fix"],[]);return Sa.makeSpan(["mord","rlap"],[r,n],t)},mathmlBuilder:(e,t)=>{var r=io(Ra(e.body),t),n=new eo.MathNode("mphantom",r),i=new eo.MathNode("mpadded",[n]);return i.setAttribute("width","0px"),i}}),Ba({type:"raisebox",names:["\\raisebox"],props:{numArgs:2,argTypes:["size","hbox"],allowedInText:!0},handler(e,t){var{parser:r}=e,n=fo(t[0],"size").value,i=t[1];return{type:"raisebox",mode:r.mode,dy:n,body:i}},htmlBuilder(e,t){var r=Ya(e.body,t),n=ms(e.dy,t);return Sa.makeVList({positionType:"shift",positionData:-n,children:[{type:"elem",elem:r}]},t)},mathmlBuilder(e,t){var r=new eo.MathNode("mpadded",[ao(e.body,t)]),n=e.dy.number+e.dy.unit;return r.setAttribute("voffset",n),r}}),Ba({type:"internal",names:["\\relax"],props:{numArgs:0,allowedInText:!0},handler(e){var{parser:t}=e;return{type:"internal",mode:t.mode}}}),Ba({type:"rule",names:["\\rule"],props:{numArgs:2,numOptionalArgs:1,argTypes:["size","size","size"]},handler(e,t,r){var{parser:n}=e,i=r[0],s=fo(t[0],"size"),a=fo(t[1],"size");return{type:"rule",mode:n.mode,shift:i&&fo(i,"size").value,width:s.value,height:a.value}},htmlBuilder(e,t){var r=Sa.makeSpan(["mord","rule"],[],t),n=ms(e.width,t),i=ms(e.height,t),s=e.shift?ms(e.shift,t):0;return r.style.borderRightWidth=gs(n),r.style.borderTopWidth=gs(i),r.style.bottom=gs(s),r.width=n,r.height=i+s,r.depth=-s,r.maxFontSize=1.125*i*t.sizeMultiplier,r},mathmlBuilder(e,t){var r=ms(e.width,t),n=ms(e.height,t),i=e.shift?ms(e.shift,t):0,s=t.color&&t.getColor()||"black",a=new eo.MathNode("mspace");a.setAttribute("mathbackground",s),a.setAttribute("width",gs(r)),a.setAttribute("height",gs(n));var o=new eo.MathNode("mpadded",[a]);return i>=0?o.setAttribute("height",gs(i)):(o.setAttribute("height",gs(i)),o.setAttribute("depth",gs(-i))),o.setAttribute("voffset",gs(i)),o}});var jl=["\\tiny","\\sixptsize","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"];Ba({type:"sizing",names:jl,props:{numArgs:0,allowedInText:!0},handler:(e,t)=>{var{breakOnTokenText:r,funcName:n,parser:i}=e,s=i.parseExpression(!1,r);return{type:"sizing",mode:i.mode,size:jl.indexOf(n)+1,body:s}},htmlBuilder:(e,t)=>{var r=t.havingSize(e.size);return $l(e.body,r,t)},mathmlBuilder:(e,t)=>{var r=t.havingSize(e.size),n=io(e.body,r),i=new eo.MathNode("mstyle",n);return i.setAttribute("mathsize",gs(r.sizeMultiplier)),i}}),Ba({type:"smash",names:["\\smash"],props:{numArgs:1,numOptionalArgs:1,allowedInText:!0},handler:(e,t,r)=>{var{parser:n}=e,i=!1,s=!1,a=r[0]&&fo(r[0],"ordgroup");if(a)for(var o="",l=0;l<a.body.length;++l){if("t"===(o=a.body[l].text))i=!0;else{if("b"!==o){i=!1,s=!1;break}s=!0}}else i=!0,s=!0;var h=t[0];return{type:"smash",mode:n.mode,body:h,smashHeight:i,smashDepth:s}},htmlBuilder:(e,t)=>{var r=Sa.makeSpan([],[Ya(e.body,t)]);if(!e.smashHeight&&!e.smashDepth)return r;if(e.smashHeight&&(r.height=0,r.children))for(var n=0;n<r.children.length;n++)r.children[n].height=0;if(e.smashDepth&&(r.depth=0,r.children))for(var i=0;i<r.children.length;i++)r.children[i].depth=0;var s=Sa.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r}]},t);return Sa.makeSpan(["mord"],[s],t)},mathmlBuilder:(e,t)=>{var r=new eo.MathNode("mpadded",[ao(e.body,t)]);return e.smashHeight&&r.setAttribute("height","0px"),e.smashDepth&&r.setAttribute("depth","0px"),r}}),Ba({type:"sqrt",names:["\\sqrt"],props:{numArgs:1,numOptionalArgs:1},handler(e,t,r){var{parser:n}=e,i=r[0],s=t[0];return{type:"sqrt",mode:n.mode,body:s,index:i}},htmlBuilder(e,t){var r=Ya(e.body,t.havingCrampedStyle());0===r.height&&(r.height=t.fontMetrics().xHeight),r=Sa.wrapFragment(r,t);var n=t.fontMetrics().defaultRuleThickness,i=n;t.style.id<Xi.TEXT.id&&(i=t.fontMetrics().xHeight);var s=n+i/4,a=r.height+r.depth+s+n,{span:o,ruleWidth:l,advanceWidth:h}=nl.sqrtImage(a,t),c=o.height-l;c>r.height+r.depth+s&&(s=(s+c-r.height-r.depth)/2);var p=o.height-r.height-s-l;r.style.paddingLeft=gs(h);var u=Sa.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r,wrapperClasses:["svg-align"]},{type:"kern",size:-(r.height+p)},{type:"elem",elem:o},{type:"kern",size:l}]},t);if(e.index){var d=t.havingStyle(Xi.SCRIPTSCRIPT),m=Ya(e.index,d,t),g=.6*(u.height-u.depth),f=Sa.makeVList({positionType:"shift",positionData:-g,children:[{type:"elem",elem:m}]},t),v=Sa.makeSpan(["root"],[f]);return Sa.makeSpan(["mord","sqrt"],[v,u],t)}return Sa.makeSpan(["mord","sqrt"],[u],t)},mathmlBuilder(e,t){var{body:r,index:n}=e;return n?new eo.MathNode("mroot",[ao(r,t),ao(n,t)]):new eo.MathNode("msqrt",[ao(r,t)])}});var Fl={display:Xi.DISPLAY,text:Xi.TEXT,script:Xi.SCRIPT,scriptscript:Xi.SCRIPTSCRIPT};Ba({type:"styling",names:["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"],props:{numArgs:0,allowedInText:!0,primitive:!0},handler(e,t){var{breakOnTokenText:r,funcName:n,parser:i}=e,s=i.parseExpression(!0,r),a=n.slice(1,n.length-5);return{type:"styling",mode:i.mode,style:a,body:s}},htmlBuilder(e,t){var r=Fl[e.style],n=t.havingStyle(r).withFont("");return $l(e.body,n,t)},mathmlBuilder(e,t){var r=Fl[e.style],n=t.havingStyle(r),i=io(e.body,n),s=new eo.MathNode("mstyle",i),a={display:["0","true"],text:["0","false"],script:["1","false"],scriptscript:["2","false"]}[e.style];return s.setAttribute("scriptlevel",a[0]),s.setAttribute("displaystyle",a[1]),s}});La({type:"supsub",htmlBuilder(e,t){var r=function(e,t){var r=e.base;return r?"op"===r.type?r.limits&&(t.style.size===Xi.DISPLAY.size||r.alwaysHandleSupSub)?ql:null:"operatorname"===r.type?r.alwaysHandleSupSub&&(t.style.size===Xi.DISPLAY.size||r.limits)?Hl:null:"accent"===r.type?qi.isCharacterBox(r.base)?wo:null:"horizBrace"===r.type&&!e.sub===r.isOver?Vl:null:null}(e,t);if(r)return r(e,t);var n,i,s,{base:a,sup:o,sub:l}=e,h=Ya(a,t),c=t.fontMetrics(),p=0,u=0,d=a&&qi.isCharacterBox(a);if(o){var m=t.havingStyle(t.style.sup());n=Ya(o,m,t),d||(p=h.height-m.fontMetrics().supDrop*m.sizeMultiplier/t.sizeMultiplier)}if(l){var g=t.havingStyle(t.style.sub());i=Ya(l,g,t),d||(u=h.depth+g.fontMetrics().subDrop*g.sizeMultiplier/t.sizeMultiplier)}s=t.style===Xi.DISPLAY?c.sup1:t.style.cramped?c.sup3:c.sup2;var f,v=t.sizeMultiplier,b=gs(.5/c.ptPerEm/v),w=null;if(i){var y=e.base&&"op"===e.base.type&&e.base.name&&("\\oiint"===e.base.name||"\\oiiint"===e.base.name);(h instanceof Ss||y)&&(w=gs(-h.italic))}if(n&&i){p=Math.max(p,s,n.depth+.25*c.xHeight),u=Math.max(u,c.sub2);var x=4*c.defaultRuleThickness;if(p-n.depth-(i.height-u)<x){u=x-(p-n.depth)+i.height;var k=.8*c.xHeight-(p-n.depth);k>0&&(p+=k,u-=k)}var _=[{type:"elem",elem:i,shift:u,marginRight:b,marginLeft:w},{type:"elem",elem:n,shift:-p,marginRight:b}];f=Sa.makeVList({positionType:"individualShift",children:_},t)}else if(i){u=Math.max(u,c.sub1,i.height-.8*c.xHeight);var S=[{type:"elem",elem:i,marginLeft:w,marginRight:b}];f=Sa.makeVList({positionType:"shift",positionData:u,children:S},t)}else{if(!n)throw new Error("supsub must have either sup or sub.");p=Math.max(p,s,n.depth+.25*c.xHeight),f=Sa.makeVList({positionType:"shift",positionData:-p,children:[{type:"elem",elem:n,marginRight:b}]},t)}var C=Ga(h,"right")||"mord";return Sa.makeSpan([C],[h,Sa.makeSpan(["msupsub"],[f])],t)},mathmlBuilder(e,t){var r,n=!1;e.base&&"horizBrace"===e.base.type&&!!e.sup===e.base.isOver&&(n=!0,r=e.base.isOver),!e.base||"op"!==e.base.type&&"operatorname"!==e.base.type||(e.base.parentIsSupSub=!0);var i,s=[ao(e.base,t)];if(e.sub&&s.push(ao(e.sub,t)),e.sup&&s.push(ao(e.sup,t)),n)i=r?"mover":"munder";else if(e.sub)if(e.sup){var a=e.base;i=a&&"op"===a.type&&a.limits&&t.style===Xi.DISPLAY||a&&"operatorname"===a.type&&a.alwaysHandleSupSub&&(t.style===Xi.DISPLAY||a.limits)?"munderover":"msubsup"}else{var o=e.base;i=o&&"op"===o.type&&o.limits&&(t.style===Xi.DISPLAY||o.alwaysHandleSupSub)||o&&"operatorname"===o.type&&o.alwaysHandleSupSub&&(o.limits||t.style===Xi.DISPLAY)?"munder":"msub"}else{var l=e.base;i=l&&"op"===l.type&&l.limits&&(t.style===Xi.DISPLAY||l.alwaysHandleSupSub)||l&&"operatorname"===l.type&&l.alwaysHandleSupSub&&(l.limits||t.style===Xi.DISPLAY)?"mover":"msup"}return new eo.MathNode(i,s)}}),La({type:"atom",htmlBuilder:(e,t)=>Sa.mathsym(e.text,e.mode,t,["m"+e.family]),mathmlBuilder(e,t){var r=new eo.MathNode("mo",[to(e.text,e.mode)]);if("bin"===e.family){var n=no(e,t);"bold-italic"===n&&r.setAttribute("mathvariant",n)}else"punct"===e.family?r.setAttribute("separator","true"):"open"!==e.family&&"close"!==e.family||r.setAttribute("stretchy","false");return r}});var Ul={mi:"italic",mn:"normal",mtext:"normal"};La({type:"mathord",htmlBuilder:(e,t)=>Sa.makeOrd(e,t,"mathord"),mathmlBuilder(e,t){var r=new eo.MathNode("mi",[to(e.text,e.mode,t)]),n=no(e,t)||"italic";return n!==Ul[r.type]&&r.setAttribute("mathvariant",n),r}}),La({type:"textord",htmlBuilder:(e,t)=>Sa.makeOrd(e,t,"textord"),mathmlBuilder(e,t){var r,n=to(e.text,e.mode,t),i=no(e,t)||"normal";return r="text"===e.mode?new eo.MathNode("mtext",[n]):/[0-9]/.test(e.text)?new eo.MathNode("mn",[n]):"\\prime"===e.text?new eo.MathNode("mo",[n]):new eo.MathNode("mi",[n]),i!==Ul[r.type]&&r.setAttribute("mathvariant",i),r}});var Gl={"\\nobreak":"nobreak","\\allowbreak":"allowbreak"},Kl={" ":{},"\\ ":{},"~":{className:"nobreak"},"\\space":{},"\\nobreakspace":{className:"nobreak"}};La({type:"spacing",htmlBuilder(e,t){if(Kl.hasOwnProperty(e.text)){var r=Kl[e.text].className||"";if("text"===e.mode){var n=Sa.makeOrd(e,t,"textord");return n.classes.push(r),n}return Sa.makeSpan(["mspace",r],[Sa.mathsym(e.text,e.mode,t)],t)}if(Gl.hasOwnProperty(e.text))return Sa.makeSpan(["mspace",Gl[e.text]],[],t);throw new Vi('Unknown type of space "'+e.text+'"')},mathmlBuilder(e,t){if(!Kl.hasOwnProperty(e.text)){if(Gl.hasOwnProperty(e.text))return new eo.MathNode("mspace");throw new Vi('Unknown type of space "'+e.text+'"')}return new eo.MathNode("mtext",[new eo.TextNode(" ")])}});var Yl=()=>{var e=new eo.MathNode("mtd",[]);return e.setAttribute("width","50%"),e};La({type:"tag",mathmlBuilder(e,t){var r=new eo.MathNode("mtable",[new eo.MathNode("mtr",[Yl(),new eo.MathNode("mtd",[so(e.body,t)]),Yl(),new eo.MathNode("mtd",[so(e.tag,t)])])]);return r.setAttribute("width","100%"),r}});var Xl={"\\text":void 0,"\\textrm":"textrm","\\textsf":"textsf","\\texttt":"texttt","\\textnormal":"textrm"},Wl={"\\textbf":"textbf","\\textmd":"textmd"},Zl={"\\textit":"textit","\\textup":"textup"},Ql=(e,t)=>{var r=e.font;return r?Xl[r]?t.withTextFontFamily(Xl[r]):Wl[r]?t.withTextFontWeight(Wl[r]):"\\emph"===r?"textit"===t.fontShape?t.withTextFontShape("textup"):t.withTextFontShape("textit"):t.withTextFontShape(Zl[r]):t};Ba({type:"text",names:["\\text","\\textrm","\\textsf","\\texttt","\\textnormal","\\textbf","\\textmd","\\textit","\\textup","\\emph"],props:{numArgs:1,argTypes:["text"],allowedInArgument:!0,allowedInText:!0},handler(e,t){var{parser:r,funcName:n}=e,i=t[0];return{type:"text",mode:r.mode,body:Ra(i),font:n}},htmlBuilder(e,t){var r=Ql(e,t),n=$a(e.body,r,!0);return Sa.makeSpan(["mord","text"],n,r)},mathmlBuilder(e,t){var r=Ql(e,t);return so(e.body,r)}}),Ba({type:"underline",names:["\\underline"],props:{numArgs:1,allowedInText:!0},handler(e,t){var{parser:r}=e;return{type:"underline",mode:r.mode,body:t[0]}},htmlBuilder(e,t){var r=Ya(e.body,t),n=Sa.makeLineSpan("underline-line",t),i=t.fontMetrics().defaultRuleThickness,s=Sa.makeVList({positionType:"top",positionData:r.height,children:[{type:"kern",size:i},{type:"elem",elem:n},{type:"kern",size:3*i},{type:"elem",elem:r}]},t);return Sa.makeSpan(["mord","underline"],[s],t)},mathmlBuilder(e,t){var r=new eo.MathNode("mo",[new eo.TextNode("‾")]);r.setAttribute("stretchy","true");var n=new eo.MathNode("munder",[ao(e.body,t),r]);return n.setAttribute("accentunder","true"),n}}),Ba({type:"vcenter",names:["\\vcenter"],props:{numArgs:1,argTypes:["original"],allowedInText:!1},handler(e,t){var{parser:r}=e;return{type:"vcenter",mode:r.mode,body:t[0]}},htmlBuilder(e,t){var r=Ya(e.body,t),n=t.fontMetrics().axisHeight,i=.5*(r.height-n-(r.depth+n));return Sa.makeVList({positionType:"shift",positionData:i,children:[{type:"elem",elem:r}]},t)},mathmlBuilder:(e,t)=>new eo.MathNode("mpadded",[ao(e.body,t)],["vcenter"])}),Ba({type:"verb",names:["\\verb"],props:{numArgs:0,allowedInText:!0},handler(e,t,r){throw new Vi("\\verb ended by end of line instead of matching delimiter")},htmlBuilder(e,t){for(var r=Jl(e),n=[],i=t.havingStyle(t.style.text()),s=0;s<r.length;s++){var a=r[s];"~"===a&&(a="\\textasciitilde"),n.push(Sa.makeSymbol(a,"Typewriter-Regular",e.mode,i,["mord","texttt"]))}return Sa.makeSpan(["mord","text"].concat(i.sizingClasses(t)),Sa.tryCombineChars(n),i)},mathmlBuilder(e,t){var r=new eo.TextNode(Jl(e)),n=new eo.MathNode("mtext",[r]);return n.setAttribute("mathvariant","monospace"),n}});var Jl=e=>e.body.replace(/ /g,e.star?"␣":" "),eh=Ea,th="[ \r\n\t]",rh="(\\\\[a-zA-Z@]+)"+th+"*",nh="[̀-ͯ]",ih=new RegExp(nh+"+$"),sh="("+th+"+)|\\\\(\n|[ \r\t]+\n?)[ \r\t]*|([!-\\[\\]-‧‪-퟿豈-￿]"+nh+"*|[\ud800-\udbff][\udc00-\udfff]"+nh+"*|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5|"+rh+"|\\\\[^\ud800-\udfff])";class ah{constructor(e,t){this.input=void 0,this.settings=void 0,this.tokenRegex=void 0,this.catcodes=void 0,this.input=e,this.settings=t,this.tokenRegex=new RegExp(sh,"g"),this.catcodes={"%":14,"~":13}}setCatcode(e,t){this.catcodes[e]=t}lex(){var e=this.input,t=this.tokenRegex.lastIndex;if(t===e.length)return new Ti("EOF",new Ei(this,t,t));var r=this.tokenRegex.exec(e);if(null===r||r.index!==t)throw new Vi("Unexpected character: '"+e[t]+"'",new Ti(e[t],new Ei(this,t,t+1)));var n=r[6]||r[3]||(r[2]?"\\ ":" ");if(14===this.catcodes[n]){var i=e.indexOf("\n",this.tokenRegex.lastIndex);return-1===i?(this.tokenRegex.lastIndex=e.length,this.settings.reportNonstrict("commentAtEnd","% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")):this.tokenRegex.lastIndex=i+1,this.lex()}return new Ti(n,new Ei(this,t,this.tokenRegex.lastIndex))}}class oh{constructor(e,t){void 0===e&&(e={}),void 0===t&&(t={}),this.current=void 0,this.builtins=void 0,this.undefStack=void 0,this.current=t,this.builtins=e,this.undefStack=[]}beginGroup(){this.undefStack.push({})}endGroup(){if(0===this.undefStack.length)throw new Vi("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");var e=this.undefStack.pop();for(var t in e)e.hasOwnProperty(t)&&(null==e[t]?delete this.current[t]:this.current[t]=e[t])}endGroups(){for(;this.undefStack.length>0;)this.endGroup()}has(e){return this.current.hasOwnProperty(e)||this.builtins.hasOwnProperty(e)}get(e){return this.current.hasOwnProperty(e)?this.current[e]:this.builtins[e]}set(e,t,r){if(void 0===r&&(r=!1),r){for(var n=0;n<this.undefStack.length;n++)delete this.undefStack[n][e];this.undefStack.length>0&&(this.undefStack[this.undefStack.length-1][e]=t)}else{var i=this.undefStack[this.undefStack.length-1];i&&!i.hasOwnProperty(e)&&(i[e]=this.current[e])}null==t?delete this.current[e]:this.current[e]=t}}var lh=ul;dl("\\noexpand",(function(e){var t=e.popToken();return e.isExpandable(t.text)&&(t.noexpand=!0,t.treatAsRelax=!0),{tokens:[t],numArgs:0}})),dl("\\expandafter",(function(e){var t=e.popToken();return e.expandOnce(!0),{tokens:[t],numArgs:0}})),dl("\\@firstoftwo",(function(e){return{tokens:e.consumeArgs(2)[0],numArgs:0}})),dl("\\@secondoftwo",(function(e){return{tokens:e.consumeArgs(2)[1],numArgs:0}})),dl("\\@ifnextchar",(function(e){var t=e.consumeArgs(3);e.consumeSpaces();var r=e.future();return 1===t[0].length&&t[0][0].text===r.text?{tokens:t[1],numArgs:0}:{tokens:t[2],numArgs:0}})),dl("\\@ifstar","\\@ifnextchar *{\\@firstoftwo{#1}}"),dl("\\TextOrMath",(function(e){var t=e.consumeArgs(2);return"text"===e.mode?{tokens:t[0],numArgs:0}:{tokens:t[1],numArgs:0}}));var hh={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,A:10,b:11,B:11,c:12,C:12,d:13,D:13,e:14,E:14,f:15,F:15};dl("\\char",(function(e){var t,r=e.popToken(),n="";if("'"===r.text)t=8,r=e.popToken();else if('"'===r.text)t=16,r=e.popToken();else if("`"===r.text)if("\\"===(r=e.popToken()).text[0])n=r.text.charCodeAt(1);else{if("EOF"===r.text)throw new Vi("\\char` missing argument");n=r.text.charCodeAt(0)}else t=10;if(t){if(null==(n=hh[r.text])||n>=t)throw new Vi("Invalid base-"+t+" digit "+r.text);for(var i;null!=(i=hh[e.future().text])&&i<t;)n*=t,n+=i,e.popToken()}return"\\@char{"+n+"}"}));var ch=(e,t,r)=>{var n=e.consumeArg().tokens;if(1!==n.length)throw new Vi("\\newcommand's first argument must be a macro name");var i=n[0].text,s=e.isDefined(i);if(s&&!t)throw new Vi("\\newcommand{"+i+"} attempting to redefine "+i+"; use \\renewcommand");if(!s&&!r)throw new Vi("\\renewcommand{"+i+"} when command "+i+" does not yet exist; use \\newcommand");var a=0;if(1===(n=e.consumeArg().tokens).length&&"["===n[0].text){for(var o="",l=e.expandNextToken();"]"!==l.text&&"EOF"!==l.text;)o+=l.text,l=e.expandNextToken();if(!o.match(/^\s*[0-9]+\s*$/))throw new Vi("Invalid number of arguments: "+o);a=parseInt(o),n=e.consumeArg().tokens}return e.macros.set(i,{tokens:n,numArgs:a}),""};dl("\\newcommand",(e=>ch(e,!1,!0))),dl("\\renewcommand",(e=>ch(e,!0,!1))),dl("\\providecommand",(e=>ch(e,!0,!0))),dl("\\message",(e=>{var t=e.consumeArgs(1)[0];return console.log(t.reverse().map((e=>e.text)).join("")),""})),dl("\\errmessage",(e=>{var t=e.consumeArgs(1)[0];return console.error(t.reverse().map((e=>e.text)).join("")),""})),dl("\\show",(e=>{var t=e.popToken(),r=t.text;return console.log(t,e.macros.get(r),eh[r],Ts.math[r],Ts.text[r]),""})),dl("\\bgroup","{"),dl("\\egroup","}"),dl("~","\\nobreakspace"),dl("\\lq","`"),dl("\\rq","'"),dl("\\aa","\\r a"),dl("\\AA","\\r A"),dl("\\textcopyright","\\html@mathml{\\textcircled{c}}{\\char`©}"),dl("\\copyright","\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}"),dl("\\textregistered","\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}"),dl("ℬ","\\mathscr{B}"),dl("ℰ","\\mathscr{E}"),dl("ℱ","\\mathscr{F}"),dl("ℋ","\\mathscr{H}"),dl("ℐ","\\mathscr{I}"),dl("ℒ","\\mathscr{L}"),dl("ℳ","\\mathscr{M}"),dl("ℛ","\\mathscr{R}"),dl("ℭ","\\mathfrak{C}"),dl("ℌ","\\mathfrak{H}"),dl("ℨ","\\mathfrak{Z}"),dl("\\Bbbk","\\Bbb{k}"),dl("·","\\cdotp"),dl("\\llap","\\mathllap{\\textrm{#1}}"),dl("\\rlap","\\mathrlap{\\textrm{#1}}"),dl("\\clap","\\mathclap{\\textrm{#1}}"),dl("\\mathstrut","\\vphantom{(}"),dl("\\underbar","\\underline{\\text{#1}}"),dl("\\not",'\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}'),dl("\\neq","\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}"),dl("\\ne","\\neq"),dl("≠","\\neq"),dl("\\notin","\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}"),dl("∉","\\notin"),dl("≘","\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}"),dl("≙","\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}"),dl("≚","\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}"),dl("≛","\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}"),dl("≝","\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}"),dl("≞","\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}"),dl("≟","\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}"),dl("⟂","\\perp"),dl("‼","\\mathclose{!\\mkern-0.8mu!}"),dl("∌","\\notni"),dl("⌜","\\ulcorner"),dl("⌝","\\urcorner"),dl("⌞","\\llcorner"),dl("⌟","\\lrcorner"),dl("©","\\copyright"),dl("®","\\textregistered"),dl("️","\\textregistered"),dl("\\ulcorner",'\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}'),dl("\\urcorner",'\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}'),dl("\\llcorner",'\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}'),dl("\\lrcorner",'\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}'),dl("\\vdots","\\mathord{\\varvdots\\rule{0pt}{15pt}}"),dl("⋮","\\vdots"),dl("\\varGamma","\\mathit{\\Gamma}"),dl("\\varDelta","\\mathit{\\Delta}"),dl("\\varTheta","\\mathit{\\Theta}"),dl("\\varLambda","\\mathit{\\Lambda}"),dl("\\varXi","\\mathit{\\Xi}"),dl("\\varPi","\\mathit{\\Pi}"),dl("\\varSigma","\\mathit{\\Sigma}"),dl("\\varUpsilon","\\mathit{\\Upsilon}"),dl("\\varPhi","\\mathit{\\Phi}"),dl("\\varPsi","\\mathit{\\Psi}"),dl("\\varOmega","\\mathit{\\Omega}"),dl("\\substack","\\begin{subarray}{c}#1\\end{subarray}"),dl("\\colon","\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax"),dl("\\boxed","\\fbox{$\\displaystyle{#1}$}"),dl("\\iff","\\DOTSB\\;\\Longleftrightarrow\\;"),dl("\\implies","\\DOTSB\\;\\Longrightarrow\\;"),dl("\\impliedby","\\DOTSB\\;\\Longleftarrow\\;");var ph={",":"\\dotsc","\\not":"\\dotsb","+":"\\dotsb","=":"\\dotsb","<":"\\dotsb",">":"\\dotsb","-":"\\dotsb","*":"\\dotsb",":":"\\dotsb","\\DOTSB":"\\dotsb","\\coprod":"\\dotsb","\\bigvee":"\\dotsb","\\bigwedge":"\\dotsb","\\biguplus":"\\dotsb","\\bigcap":"\\dotsb","\\bigcup":"\\dotsb","\\prod":"\\dotsb","\\sum":"\\dotsb","\\bigotimes":"\\dotsb","\\bigoplus":"\\dotsb","\\bigodot":"\\dotsb","\\bigsqcup":"\\dotsb","\\And":"\\dotsb","\\longrightarrow":"\\dotsb","\\Longrightarrow":"\\dotsb","\\longleftarrow":"\\dotsb","\\Longleftarrow":"\\dotsb","\\longleftrightarrow":"\\dotsb","\\Longleftrightarrow":"\\dotsb","\\mapsto":"\\dotsb","\\longmapsto":"\\dotsb","\\hookrightarrow":"\\dotsb","\\doteq":"\\dotsb","\\mathbin":"\\dotsb","\\mathrel":"\\dotsb","\\relbar":"\\dotsb","\\Relbar":"\\dotsb","\\xrightarrow":"\\dotsb","\\xleftarrow":"\\dotsb","\\DOTSI":"\\dotsi","\\int":"\\dotsi","\\oint":"\\dotsi","\\iint":"\\dotsi","\\iiint":"\\dotsi","\\iiiint":"\\dotsi","\\idotsint":"\\dotsi","\\DOTSX":"\\dotsx"};dl("\\dots",(function(e){var t="\\dotso",r=e.expandAfterFuture().text;return r in ph?t=ph[r]:("\\not"===r.slice(0,4)||r in Ts.math&&qi.contains(["bin","rel"],Ts.math[r].group))&&(t="\\dotsb"),t}));var uh={")":!0,"]":!0,"\\rbrack":!0,"\\}":!0,"\\rbrace":!0,"\\rangle":!0,"\\rceil":!0,"\\rfloor":!0,"\\rgroup":!0,"\\rmoustache":!0,"\\right":!0,"\\bigr":!0,"\\biggr":!0,"\\Bigr":!0,"\\Biggr":!0,$:!0,";":!0,".":!0,",":!0};dl("\\dotso",(function(e){return e.future().text in uh?"\\ldots\\,":"\\ldots"})),dl("\\dotsc",(function(e){var t=e.future().text;return t in uh&&","!==t?"\\ldots\\,":"\\ldots"})),dl("\\cdots",(function(e){return e.future().text in uh?"\\@cdots\\,":"\\@cdots"})),dl("\\dotsb","\\cdots"),dl("\\dotsm","\\cdots"),dl("\\dotsi","\\!\\cdots"),dl("\\dotsx","\\ldots\\,"),dl("\\DOTSI","\\relax"),dl("\\DOTSB","\\relax"),dl("\\DOTSX","\\relax"),dl("\\tmspace","\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax"),dl("\\,","\\tmspace+{3mu}{.1667em}"),dl("\\thinspace","\\,"),dl("\\>","\\mskip{4mu}"),dl("\\:","\\tmspace+{4mu}{.2222em}"),dl("\\medspace","\\:"),dl("\\;","\\tmspace+{5mu}{.2777em}"),dl("\\thickspace","\\;"),dl("\\!","\\tmspace-{3mu}{.1667em}"),dl("\\negthinspace","\\!"),dl("\\negmedspace","\\tmspace-{4mu}{.2222em}"),dl("\\negthickspace","\\tmspace-{5mu}{.277em}"),dl("\\enspace","\\kern.5em "),dl("\\enskip","\\hskip.5em\\relax"),dl("\\quad","\\hskip1em\\relax"),dl("\\qquad","\\hskip2em\\relax"),dl("\\tag","\\@ifstar\\tag@literal\\tag@paren"),dl("\\tag@paren","\\tag@literal{({#1})}"),dl("\\tag@literal",(e=>{if(e.macros.get("\\df@tag"))throw new Vi("Multiple \\tag");return"\\gdef\\df@tag{\\text{#1}}"})),dl("\\bmod","\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}"),dl("\\pod","\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"),dl("\\pmod","\\pod{{\\rm mod}\\mkern6mu#1}"),dl("\\mod","\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1"),dl("\\newline","\\\\\\relax"),dl("\\TeX","\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");var dh=gs(rs["Main-Regular"]["T".charCodeAt(0)][1]-.7*rs["Main-Regular"]["A".charCodeAt(0)][1]);dl("\\LaTeX","\\textrm{\\html@mathml{L\\kern-.36em\\raisebox{"+dh+"}{\\scriptstyle A}\\kern-.15em\\TeX}{LaTeX}}"),dl("\\KaTeX","\\textrm{\\html@mathml{K\\kern-.17em\\raisebox{"+dh+"}{\\scriptstyle A}\\kern-.15em\\TeX}{KaTeX}}"),dl("\\hspace","\\@ifstar\\@hspacer\\@hspace"),dl("\\@hspace","\\hskip #1\\relax"),dl("\\@hspacer","\\rule{0pt}{0pt}\\hskip #1\\relax"),dl("\\ordinarycolon",":"),dl("\\vcentcolon","\\mathrel{\\mathop\\ordinarycolon}"),dl("\\dblcolon",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}'),dl("\\coloneqq",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}'),dl("\\Coloneqq",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}'),dl("\\coloneq",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}'),dl("\\Coloneq",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}'),dl("\\eqqcolon",'\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}'),dl("\\Eqqcolon",'\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}'),dl("\\eqcolon",'\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}'),dl("\\Eqcolon",'\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}'),dl("\\colonapprox",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}'),dl("\\Colonapprox",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}'),dl("\\colonsim",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}'),dl("\\Colonsim",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}'),dl("∷","\\dblcolon"),dl("∹","\\eqcolon"),dl("≔","\\coloneqq"),dl("≕","\\eqqcolon"),dl("⩴","\\Coloneqq"),dl("\\ratio","\\vcentcolon"),dl("\\coloncolon","\\dblcolon"),dl("\\colonequals","\\coloneqq"),dl("\\coloncolonequals","\\Coloneqq"),dl("\\equalscolon","\\eqqcolon"),dl("\\equalscoloncolon","\\Eqqcolon"),dl("\\colonminus","\\coloneq"),dl("\\coloncolonminus","\\Coloneq"),dl("\\minuscolon","\\eqcolon"),dl("\\minuscoloncolon","\\Eqcolon"),dl("\\coloncolonapprox","\\Colonapprox"),dl("\\coloncolonsim","\\Colonsim"),dl("\\simcolon","\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}"),dl("\\simcoloncolon","\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}"),dl("\\approxcolon","\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}"),dl("\\approxcoloncolon","\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}"),dl("\\notni","\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}"),dl("\\limsup","\\DOTSB\\operatorname*{lim\\,sup}"),dl("\\liminf","\\DOTSB\\operatorname*{lim\\,inf}"),dl("\\injlim","\\DOTSB\\operatorname*{inj\\,lim}"),dl("\\projlim","\\DOTSB\\operatorname*{proj\\,lim}"),dl("\\varlimsup","\\DOTSB\\operatorname*{\\overline{lim}}"),dl("\\varliminf","\\DOTSB\\operatorname*{\\underline{lim}}"),dl("\\varinjlim","\\DOTSB\\operatorname*{\\underrightarrow{lim}}"),dl("\\varprojlim","\\DOTSB\\operatorname*{\\underleftarrow{lim}}"),dl("\\gvertneqq","\\html@mathml{\\@gvertneqq}{≩}"),dl("\\lvertneqq","\\html@mathml{\\@lvertneqq}{≨}"),dl("\\ngeqq","\\html@mathml{\\@ngeqq}{≱}"),dl("\\ngeqslant","\\html@mathml{\\@ngeqslant}{≱}"),dl("\\nleqq","\\html@mathml{\\@nleqq}{≰}"),dl("\\nleqslant","\\html@mathml{\\@nleqslant}{≰}"),dl("\\nshortmid","\\html@mathml{\\@nshortmid}{∤}"),dl("\\nshortparallel","\\html@mathml{\\@nshortparallel}{∦}"),dl("\\nsubseteqq","\\html@mathml{\\@nsubseteqq}{⊈}"),dl("\\nsupseteqq","\\html@mathml{\\@nsupseteqq}{⊉}"),dl("\\varsubsetneq","\\html@mathml{\\@varsubsetneq}{⊊}"),dl("\\varsubsetneqq","\\html@mathml{\\@varsubsetneqq}{⫋}"),dl("\\varsupsetneq","\\html@mathml{\\@varsupsetneq}{⊋}"),dl("\\varsupsetneqq","\\html@mathml{\\@varsupsetneqq}{⫌}"),dl("\\imath","\\html@mathml{\\@imath}{ı}"),dl("\\jmath","\\html@mathml{\\@jmath}{ȷ}"),dl("\\llbracket","\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}"),dl("\\rrbracket","\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}"),dl("⟦","\\llbracket"),dl("⟧","\\rrbracket"),dl("\\lBrace","\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}"),dl("\\rBrace","\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}"),dl("⦃","\\lBrace"),dl("⦄","\\rBrace"),dl("\\minuso","\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}"),dl("⦵","\\minuso"),dl("\\darr","\\downarrow"),dl("\\dArr","\\Downarrow"),dl("\\Darr","\\Downarrow"),dl("\\lang","\\langle"),dl("\\rang","\\rangle"),dl("\\uarr","\\uparrow"),dl("\\uArr","\\Uparrow"),dl("\\Uarr","\\Uparrow"),dl("\\N","\\mathbb{N}"),dl("\\R","\\mathbb{R}"),dl("\\Z","\\mathbb{Z}"),dl("\\alef","\\aleph"),dl("\\alefsym","\\aleph"),dl("\\Alpha","\\mathrm{A}"),dl("\\Beta","\\mathrm{B}"),dl("\\bull","\\bullet"),dl("\\Chi","\\mathrm{X}"),dl("\\clubs","\\clubsuit"),dl("\\cnums","\\mathbb{C}"),dl("\\Complex","\\mathbb{C}"),dl("\\Dagger","\\ddagger"),dl("\\diamonds","\\diamondsuit"),dl("\\empty","\\emptyset"),dl("\\Epsilon","\\mathrm{E}"),dl("\\Eta","\\mathrm{H}"),dl("\\exist","\\exists"),dl("\\harr","\\leftrightarrow"),dl("\\hArr","\\Leftrightarrow"),dl("\\Harr","\\Leftrightarrow"),dl("\\hearts","\\heartsuit"),dl("\\image","\\Im"),dl("\\infin","\\infty"),dl("\\Iota","\\mathrm{I}"),dl("\\isin","\\in"),dl("\\Kappa","\\mathrm{K}"),dl("\\larr","\\leftarrow"),dl("\\lArr","\\Leftarrow"),dl("\\Larr","\\Leftarrow"),dl("\\lrarr","\\leftrightarrow"),dl("\\lrArr","\\Leftrightarrow"),dl("\\Lrarr","\\Leftrightarrow"),dl("\\Mu","\\mathrm{M}"),dl("\\natnums","\\mathbb{N}"),dl("\\Nu","\\mathrm{N}"),dl("\\Omicron","\\mathrm{O}"),dl("\\plusmn","\\pm"),dl("\\rarr","\\rightarrow"),dl("\\rArr","\\Rightarrow"),dl("\\Rarr","\\Rightarrow"),dl("\\real","\\Re"),dl("\\reals","\\mathbb{R}"),dl("\\Reals","\\mathbb{R}"),dl("\\Rho","\\mathrm{P}"),dl("\\sdot","\\cdot"),dl("\\sect","\\S"),dl("\\spades","\\spadesuit"),dl("\\sub","\\subset"),dl("\\sube","\\subseteq"),dl("\\supe","\\supseteq"),dl("\\Tau","\\mathrm{T}"),dl("\\thetasym","\\vartheta"),dl("\\weierp","\\wp"),dl("\\Zeta","\\mathrm{Z}"),dl("\\argmin","\\DOTSB\\operatorname*{arg\\,min}"),dl("\\argmax","\\DOTSB\\operatorname*{arg\\,max}"),dl("\\plim","\\DOTSB\\mathop{\\operatorname{plim}}\\limits"),dl("\\bra","\\mathinner{\\langle{#1}|}"),dl("\\ket","\\mathinner{|{#1}\\rangle}"),dl("\\braket","\\mathinner{\\langle{#1}\\rangle}"),dl("\\Bra","\\left\\langle#1\\right|"),dl("\\Ket","\\left|#1\\right\\rangle");var mh=e=>t=>{var r=t.consumeArg().tokens,n=t.consumeArg().tokens,i=t.consumeArg().tokens,s=t.consumeArg().tokens,a=t.macros.get("|"),o=t.macros.get("\\|");t.macros.beginGroup();var l=t=>r=>{e&&(r.macros.set("|",a),i.length&&r.macros.set("\\|",o));var s=t;!t&&i.length&&("|"===r.future().text&&(r.popToken(),s=!0));return{tokens:s?i:n,numArgs:0}};t.macros.set("|",l(!1)),i.length&&t.macros.set("\\|",l(!0));var h=t.consumeArg().tokens,c=t.expandTokens([...s,...h,...r]);return t.macros.endGroup(),{tokens:c.reverse(),numArgs:0}};dl("\\bra@ket",mh(!1)),dl("\\bra@set",mh(!0)),dl("\\Braket","\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}"),dl("\\Set","\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}"),dl("\\set","\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}"),dl("\\angln","{\\angl n}"),dl("\\blue","\\textcolor{##6495ed}{#1}"),dl("\\orange","\\textcolor{##ffa500}{#1}"),dl("\\pink","\\textcolor{##ff00af}{#1}"),dl("\\red","\\textcolor{##df0030}{#1}"),dl("\\green","\\textcolor{##28ae7b}{#1}"),dl("\\gray","\\textcolor{gray}{#1}"),dl("\\purple","\\textcolor{##9d38bd}{#1}"),dl("\\blueA","\\textcolor{##ccfaff}{#1}"),dl("\\blueB","\\textcolor{##80f6ff}{#1}"),dl("\\blueC","\\textcolor{##63d9ea}{#1}"),dl("\\blueD","\\textcolor{##11accd}{#1}"),dl("\\blueE","\\textcolor{##0c7f99}{#1}"),dl("\\tealA","\\textcolor{##94fff5}{#1}"),dl("\\tealB","\\textcolor{##26edd5}{#1}"),dl("\\tealC","\\textcolor{##01d1c1}{#1}"),dl("\\tealD","\\textcolor{##01a995}{#1}"),dl("\\tealE","\\textcolor{##208170}{#1}"),dl("\\greenA","\\textcolor{##b6ffb0}{#1}"),dl("\\greenB","\\textcolor{##8af281}{#1}"),dl("\\greenC","\\textcolor{##74cf70}{#1}"),dl("\\greenD","\\textcolor{##1fab54}{#1}"),dl("\\greenE","\\textcolor{##0d923f}{#1}"),dl("\\goldA","\\textcolor{##ffd0a9}{#1}"),dl("\\goldB","\\textcolor{##ffbb71}{#1}"),dl("\\goldC","\\textcolor{##ff9c39}{#1}"),dl("\\goldD","\\textcolor{##e07d10}{#1}"),dl("\\goldE","\\textcolor{##a75a05}{#1}"),dl("\\redA","\\textcolor{##fca9a9}{#1}"),dl("\\redB","\\textcolor{##ff8482}{#1}"),dl("\\redC","\\textcolor{##f9685d}{#1}"),dl("\\redD","\\textcolor{##e84d39}{#1}"),dl("\\redE","\\textcolor{##bc2612}{#1}"),dl("\\maroonA","\\textcolor{##ffbde0}{#1}"),dl("\\maroonB","\\textcolor{##ff92c6}{#1}"),dl("\\maroonC","\\textcolor{##ed5fa6}{#1}"),dl("\\maroonD","\\textcolor{##ca337c}{#1}"),dl("\\maroonE","\\textcolor{##9e034e}{#1}"),dl("\\purpleA","\\textcolor{##ddd7ff}{#1}"),dl("\\purpleB","\\textcolor{##c6b9fc}{#1}"),dl("\\purpleC","\\textcolor{##aa87ff}{#1}"),dl("\\purpleD","\\textcolor{##7854ab}{#1}"),dl("\\purpleE","\\textcolor{##543b78}{#1}"),dl("\\mintA","\\textcolor{##f5f9e8}{#1}"),dl("\\mintB","\\textcolor{##edf2df}{#1}"),dl("\\mintC","\\textcolor{##e0e5cc}{#1}"),dl("\\grayA","\\textcolor{##f6f7f7}{#1}"),dl("\\grayB","\\textcolor{##f0f1f2}{#1}"),dl("\\grayC","\\textcolor{##e3e5e6}{#1}"),dl("\\grayD","\\textcolor{##d6d8da}{#1}"),dl("\\grayE","\\textcolor{##babec2}{#1}"),dl("\\grayF","\\textcolor{##888d93}{#1}"),dl("\\grayG","\\textcolor{##626569}{#1}"),dl("\\grayH","\\textcolor{##3b3e40}{#1}"),dl("\\grayI","\\textcolor{##21242c}{#1}"),dl("\\kaBlue","\\textcolor{##314453}{#1}"),dl("\\kaGreen","\\textcolor{##71B307}{#1}");var gh={"^":!0,_:!0,"\\limits":!0,"\\nolimits":!0};class fh{constructor(e,t,r){this.settings=void 0,this.expansionCount=void 0,this.lexer=void 0,this.macros=void 0,this.stack=void 0,this.mode=void 0,this.settings=t,this.expansionCount=0,this.feed(e),this.macros=new oh(lh,t.macros),this.mode=r,this.stack=[]}feed(e){this.lexer=new ah(e,this.settings)}switchMode(e){this.mode=e}beginGroup(){this.macros.beginGroup()}endGroup(){this.macros.endGroup()}endGroups(){this.macros.endGroups()}future(){return 0===this.stack.length&&this.pushToken(this.lexer.lex()),this.stack[this.stack.length-1]}popToken(){return this.future(),this.stack.pop()}pushToken(e){this.stack.push(e)}pushTokens(e){this.stack.push(...e)}scanArgument(e){var t,r,n;if(e){if(this.consumeSpaces(),"["!==this.future().text)return null;t=this.popToken(),({tokens:n,end:r}=this.consumeArg(["]"]))}else({tokens:n,start:t,end:r}=this.consumeArg());return this.pushToken(new Ti("EOF",r.loc)),this.pushTokens(n),t.range(r,"")}consumeSpaces(){for(;;){if(" "!==this.future().text)break;this.stack.pop()}}consumeArg(e){var t=[],r=e&&e.length>0;r||this.consumeSpaces();var n,i=this.future(),s=0,a=0;do{if(n=this.popToken(),t.push(n),"{"===n.text)++s;else if("}"===n.text){if(-1===--s)throw new Vi("Extra }",n)}else if("EOF"===n.text)throw new Vi("Unexpected end of input in a macro argument, expected '"+(e&&r?e[a]:"}")+"'",n);if(e&&r)if((0===s||1===s&&"{"===e[a])&&n.text===e[a]){if(++a===e.length){t.splice(-a,a);break}}else a=0}while(0!==s||r);return"{"===i.text&&"}"===t[t.length-1].text&&(t.pop(),t.shift()),t.reverse(),{tokens:t,start:i,end:n}}consumeArgs(e,t){if(t){if(t.length!==e+1)throw new Vi("The length of delimiters doesn't match the number of args!");for(var r=t[0],n=0;n<r.length;n++){var i=this.popToken();if(r[n]!==i.text)throw new Vi("Use of the macro doesn't match its definition",i)}}for(var s=[],a=0;a<e;a++)s.push(this.consumeArg(t&&t[a+1]).tokens);return s}countExpansion(e){if(this.expansionCount+=e,this.expansionCount>this.settings.maxExpand)throw new Vi("Too many expansions: infinite loop or need to increase maxExpand setting")}expandOnce(e){var t=this.popToken(),r=t.text,n=t.noexpand?null:this._getExpansion(r);if(null==n||e&&n.unexpandable){if(e&&null==n&&"\\"===r[0]&&!this.isDefined(r))throw new Vi("Undefined control sequence: "+r);return this.pushToken(t),!1}this.countExpansion(1);var i=n.tokens,s=this.consumeArgs(n.numArgs,n.delimiters);if(n.numArgs)for(var a=(i=i.slice()).length-1;a>=0;--a){var o=i[a];if("#"===o.text){if(0===a)throw new Vi("Incomplete placeholder at end of macro body",o);if("#"===(o=i[--a]).text)i.splice(a+1,1);else{if(!/^[1-9]$/.test(o.text))throw new Vi("Not a valid argument number",o);i.splice(a,2,...s[+o.text-1])}}}return this.pushTokens(i),i.length}expandAfterFuture(){return this.expandOnce(),this.future()}expandNextToken(){for(;;)if(!1===this.expandOnce()){var e=this.stack.pop();return e.treatAsRelax&&(e.text="\\relax"),e}throw new Error}expandMacro(e){return this.macros.has(e)?this.expandTokens([new Ti(e)]):void 0}expandTokens(e){var t=[],r=this.stack.length;for(this.pushTokens(e);this.stack.length>r;)if(!1===this.expandOnce(!0)){var n=this.stack.pop();n.treatAsRelax&&(n.noexpand=!1,n.treatAsRelax=!1),t.push(n)}return this.countExpansion(t.length),t}expandMacroAsText(e){var t=this.expandMacro(e);return t?t.map((e=>e.text)).join(""):t}_getExpansion(e){var t=this.macros.get(e);if(null==t)return t;if(1===e.length){var r=this.lexer.catcodes[e];if(null!=r&&13!==r)return}var n="function"==typeof t?t(this):t;if("string"==typeof n){var i=0;if(-1!==n.indexOf("#"))for(var s=n.replace(/##/g,"");-1!==s.indexOf("#"+(i+1));)++i;for(var a=new ah(n,this.settings),o=[],l=a.lex();"EOF"!==l.text;)o.push(l),l=a.lex();return o.reverse(),{tokens:o,numArgs:i}}return n}isDefined(e){return this.macros.has(e)||eh.hasOwnProperty(e)||Ts.math.hasOwnProperty(e)||Ts.text.hasOwnProperty(e)||gh.hasOwnProperty(e)}isExpandable(e){var t=this.macros.get(e);return null!=t?"string"==typeof t||"function"==typeof t||!t.unexpandable:eh.hasOwnProperty(e)&&!eh[e].primitive}}var vh=/^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/,bh=Object.freeze({"₊":"+","₋":"-","₌":"=","₍":"(","₎":")","₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","ₐ":"a","ₑ":"e","ₕ":"h","ᵢ":"i","ⱼ":"j","ₖ":"k","ₗ":"l","ₘ":"m","ₙ":"n","ₒ":"o","ₚ":"p","ᵣ":"r","ₛ":"s","ₜ":"t","ᵤ":"u","ᵥ":"v","ₓ":"x","ᵦ":"β","ᵧ":"γ","ᵨ":"ρ","ᵩ":"ϕ","ᵪ":"χ","⁺":"+","⁻":"-","⁼":"=","⁽":"(","⁾":")","⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ᴬ":"A","ᴮ":"B","ᴰ":"D","ᴱ":"E","ᴳ":"G","ᴴ":"H","ᴵ":"I","ᴶ":"J","ᴷ":"K","ᴸ":"L","ᴹ":"M","ᴺ":"N","ᴼ":"O","ᴾ":"P","ᴿ":"R","ᵀ":"T","ᵁ":"U","ⱽ":"V","ᵂ":"W","ᵃ":"a","ᵇ":"b","ᶜ":"c","ᵈ":"d","ᵉ":"e","ᶠ":"f","ᵍ":"g","ʰ":"h","ⁱ":"i","ʲ":"j","ᵏ":"k","ˡ":"l","ᵐ":"m","ⁿ":"n","ᵒ":"o","ᵖ":"p","ʳ":"r","ˢ":"s","ᵗ":"t","ᵘ":"u","ᵛ":"v","ʷ":"w","ˣ":"x","ʸ":"y","ᶻ":"z","ᵝ":"β","ᵞ":"γ","ᵟ":"δ","ᵠ":"ϕ","ᵡ":"χ","ᶿ":"θ"}),wh={"́":{text:"\\'",math:"\\acute"},"̀":{text:"\\`",math:"\\grave"},"̈":{text:'\\"',math:"\\ddot"},"̃":{text:"\\~",math:"\\tilde"},"̄":{text:"\\=",math:"\\bar"},"̆":{text:"\\u",math:"\\breve"},"̌":{text:"\\v",math:"\\check"},"̂":{text:"\\^",math:"\\hat"},"̇":{text:"\\.",math:"\\dot"},"̊":{text:"\\r",math:"\\mathring"},"̋":{text:"\\H"},"̧":{text:"\\c"}},yh={"á":"á","à":"à","ä":"ä","ǟ":"ǟ","ã":"ã","ā":"ā","ă":"ă","ắ":"ắ","ằ":"ằ","ẵ":"ẵ","ǎ":"ǎ","â":"â","ấ":"ấ","ầ":"ầ","ẫ":"ẫ","ȧ":"ȧ","ǡ":"ǡ","å":"å","ǻ":"ǻ","ḃ":"ḃ","ć":"ć","ḉ":"ḉ","č":"č","ĉ":"ĉ","ċ":"ċ","ç":"ç","ď":"ď","ḋ":"ḋ","ḑ":"ḑ","é":"é","è":"è","ë":"ë","ẽ":"ẽ","ē":"ē","ḗ":"ḗ","ḕ":"ḕ","ĕ":"ĕ","ḝ":"ḝ","ě":"ě","ê":"ê","ế":"ế","ề":"ề","ễ":"ễ","ė":"ė","ȩ":"ȩ","ḟ":"ḟ","ǵ":"ǵ","ḡ":"ḡ","ğ":"ğ","ǧ":"ǧ","ĝ":"ĝ","ġ":"ġ","ģ":"ģ","ḧ":"ḧ","ȟ":"ȟ","ĥ":"ĥ","ḣ":"ḣ","ḩ":"ḩ","í":"í","ì":"ì","ï":"ï","ḯ":"ḯ","ĩ":"ĩ","ī":"ī","ĭ":"ĭ","ǐ":"ǐ","î":"î","ǰ":"ǰ","ĵ":"ĵ","ḱ":"ḱ","ǩ":"ǩ","ķ":"ķ","ĺ":"ĺ","ľ":"ľ","ļ":"ļ","ḿ":"ḿ","ṁ":"ṁ","ń":"ń","ǹ":"ǹ","ñ":"ñ","ň":"ň","ṅ":"ṅ","ņ":"ņ","ó":"ó","ò":"ò","ö":"ö","ȫ":"ȫ","õ":"õ","ṍ":"ṍ","ṏ":"ṏ","ȭ":"ȭ","ō":"ō","ṓ":"ṓ","ṑ":"ṑ","ŏ":"ŏ","ǒ":"ǒ","ô":"ô","ố":"ố","ồ":"ồ","ỗ":"ỗ","ȯ":"ȯ","ȱ":"ȱ","ő":"ő","ṕ":"ṕ","ṗ":"ṗ","ŕ":"ŕ","ř":"ř","ṙ":"ṙ","ŗ":"ŗ","ś":"ś","ṥ":"ṥ","š":"š","ṧ":"ṧ","ŝ":"ŝ","ṡ":"ṡ","ş":"ş","ẗ":"ẗ","ť":"ť","ṫ":"ṫ","ţ":"ţ","ú":"ú","ù":"ù","ü":"ü","ǘ":"ǘ","ǜ":"ǜ","ǖ":"ǖ","ǚ":"ǚ","ũ":"ũ","ṹ":"ṹ","ū":"ū","ṻ":"ṻ","ŭ":"ŭ","ǔ":"ǔ","û":"û","ů":"ů","ű":"ű","ṽ":"ṽ","ẃ":"ẃ","ẁ":"ẁ","ẅ":"ẅ","ŵ":"ŵ","ẇ":"ẇ","ẘ":"ẘ","ẍ":"ẍ","ẋ":"ẋ","ý":"ý","ỳ":"ỳ","ÿ":"ÿ","ỹ":"ỹ","ȳ":"ȳ","ŷ":"ŷ","ẏ":"ẏ","ẙ":"ẙ","ź":"ź","ž":"ž","ẑ":"ẑ","ż":"ż","Á":"Á","À":"À","Ä":"Ä","Ǟ":"Ǟ","Ã":"Ã","Ā":"Ā","Ă":"Ă","Ắ":"Ắ","Ằ":"Ằ","Ẵ":"Ẵ","Ǎ":"Ǎ","Â":"Â","Ấ":"Ấ","Ầ":"Ầ","Ẫ":"Ẫ","Ȧ":"Ȧ","Ǡ":"Ǡ","Å":"Å","Ǻ":"Ǻ","Ḃ":"Ḃ","Ć":"Ć","Ḉ":"Ḉ","Č":"Č","Ĉ":"Ĉ","Ċ":"Ċ","Ç":"Ç","Ď":"Ď","Ḋ":"Ḋ","Ḑ":"Ḑ","É":"É","È":"È","Ë":"Ë","Ẽ":"Ẽ","Ē":"Ē","Ḗ":"Ḗ","Ḕ":"Ḕ","Ĕ":"Ĕ","Ḝ":"Ḝ","Ě":"Ě","Ê":"Ê","Ế":"Ế","Ề":"Ề","Ễ":"Ễ","Ė":"Ė","Ȩ":"Ȩ","Ḟ":"Ḟ","Ǵ":"Ǵ","Ḡ":"Ḡ","Ğ":"Ğ","Ǧ":"Ǧ","Ĝ":"Ĝ","Ġ":"Ġ","Ģ":"Ģ","Ḧ":"Ḧ","Ȟ":"Ȟ","Ĥ":"Ĥ","Ḣ":"Ḣ","Ḩ":"Ḩ","Í":"Í","Ì":"Ì","Ï":"Ï","Ḯ":"Ḯ","Ĩ":"Ĩ","Ī":"Ī","Ĭ":"Ĭ","Ǐ":"Ǐ","Î":"Î","İ":"İ","Ĵ":"Ĵ","Ḱ":"Ḱ","Ǩ":"Ǩ","Ķ":"Ķ","Ĺ":"Ĺ","Ľ":"Ľ","Ļ":"Ļ","Ḿ":"Ḿ","Ṁ":"Ṁ","Ń":"Ń","Ǹ":"Ǹ","Ñ":"Ñ","Ň":"Ň","Ṅ":"Ṅ","Ņ":"Ņ","Ó":"Ó","Ò":"Ò","Ö":"Ö","Ȫ":"Ȫ","Õ":"Õ","Ṍ":"Ṍ","Ṏ":"Ṏ","Ȭ":"Ȭ","Ō":"Ō","Ṓ":"Ṓ","Ṑ":"Ṑ","Ŏ":"Ŏ","Ǒ":"Ǒ","Ô":"Ô","Ố":"Ố","Ồ":"Ồ","Ỗ":"Ỗ","Ȯ":"Ȯ","Ȱ":"Ȱ","Ő":"Ő","Ṕ":"Ṕ","Ṗ":"Ṗ","Ŕ":"Ŕ","Ř":"Ř","Ṙ":"Ṙ","Ŗ":"Ŗ","Ś":"Ś","Ṥ":"Ṥ","Š":"Š","Ṧ":"Ṧ","Ŝ":"Ŝ","Ṡ":"Ṡ","Ş":"Ş","Ť":"Ť","Ṫ":"Ṫ","Ţ":"Ţ","Ú":"Ú","Ù":"Ù","Ü":"Ü","Ǘ":"Ǘ","Ǜ":"Ǜ","Ǖ":"Ǖ","Ǚ":"Ǚ","Ũ":"Ũ","Ṹ":"Ṹ","Ū":"Ū","Ṻ":"Ṻ","Ŭ":"Ŭ","Ǔ":"Ǔ","Û":"Û","Ů":"Ů","Ű":"Ű","Ṽ":"Ṽ","Ẃ":"Ẃ","Ẁ":"Ẁ","Ẅ":"Ẅ","Ŵ":"Ŵ","Ẇ":"Ẇ","Ẍ":"Ẍ","Ẋ":"Ẋ","Ý":"Ý","Ỳ":"Ỳ","Ÿ":"Ÿ","Ỹ":"Ỹ","Ȳ":"Ȳ","Ŷ":"Ŷ","Ẏ":"Ẏ","Ź":"Ź","Ž":"Ž","Ẑ":"Ẑ","Ż":"Ż","ά":"ά","ὰ":"ὰ","ᾱ":"ᾱ","ᾰ":"ᾰ","έ":"έ","ὲ":"ὲ","ή":"ή","ὴ":"ὴ","ί":"ί","ὶ":"ὶ","ϊ":"ϊ","ΐ":"ΐ","ῒ":"ῒ","ῑ":"ῑ","ῐ":"ῐ","ό":"ό","ὸ":"ὸ","ύ":"ύ","ὺ":"ὺ","ϋ":"ϋ","ΰ":"ΰ","ῢ":"ῢ","ῡ":"ῡ","ῠ":"ῠ","ώ":"ώ","ὼ":"ὼ","Ύ":"Ύ","Ὺ":"Ὺ","Ϋ":"Ϋ","Ῡ":"Ῡ","Ῠ":"Ῠ","Ώ":"Ώ","Ὼ":"Ὼ"};class xh{constructor(e,t){this.mode=void 0,this.gullet=void 0,this.settings=void 0,this.leftrightDepth=void 0,this.nextToken=void 0,this.mode="math",this.gullet=new fh(e,t,this.mode),this.settings=t,this.leftrightDepth=0}expect(e,t){if(void 0===t&&(t=!0),this.fetch().text!==e)throw new Vi("Expected '"+e+"', got '"+this.fetch().text+"'",this.fetch());t&&this.consume()}consume(){this.nextToken=null}fetch(){return null==this.nextToken&&(this.nextToken=this.gullet.expandNextToken()),this.nextToken}switchMode(e){this.mode=e,this.gullet.switchMode(e)}parse(){this.settings.globalGroup||this.gullet.beginGroup(),this.settings.colorIsTextColor&&this.gullet.macros.set("\\color","\\textcolor");try{var e=this.parseExpression(!1);return this.expect("EOF"),this.settings.globalGroup||this.gullet.endGroup(),e}finally{this.gullet.endGroups()}}subparse(e){var t=this.nextToken;this.consume(),this.gullet.pushToken(new Ti("}")),this.gullet.pushTokens(e);var r=this.parseExpression(!1);return this.expect("}"),this.nextToken=t,r}parseExpression(e,t){for(var r=[];;){"math"===this.mode&&this.consumeSpaces();var n=this.fetch();if(-1!==xh.endOfExpression.indexOf(n.text))break;if(t&&n.text===t)break;if(e&&eh[n.text]&&eh[n.text].infix)break;var i=this.parseAtom(t);if(!i)break;"internal"!==i.type&&r.push(i)}return"text"===this.mode&&this.formLigatures(r),this.handleInfixNodes(r)}handleInfixNodes(e){for(var t,r=-1,n=0;n<e.length;n++)if("infix"===e[n].type){if(-1!==r)throw new Vi("only one infix operator per group",e[n].token);r=n,t=e[n].replaceWith}if(-1!==r&&t){var i,s,a=e.slice(0,r),o=e.slice(r+1);return i=1===a.length&&"ordgroup"===a[0].type?a[0]:{type:"ordgroup",mode:this.mode,body:a},s=1===o.length&&"ordgroup"===o[0].type?o[0]:{type:"ordgroup",mode:this.mode,body:o},["\\\\abovefrac"===t?this.callFunction(t,[i,e[r],s],[]):this.callFunction(t,[i,s],[])]}return e}handleSupSubscript(e){var t=this.fetch(),r=t.text;this.consume(),this.consumeSpaces();var n=this.parseGroup(e);if(!n)throw new Vi("Expected group after '"+r+"'",t);return n}formatUnsupportedCmd(e){for(var t=[],r=0;r<e.length;r++)t.push({type:"textord",mode:"text",text:e[r]});var n={type:"text",mode:this.mode,body:t};return{type:"color",mode:this.mode,color:this.settings.errorColor,body:[n]}}parseAtom(e){var t,r,n=this.parseGroup("atom",e);if("text"===this.mode)return n;for(;;){this.consumeSpaces();var i=this.fetch();if("\\limits"===i.text||"\\nolimits"===i.text){if(n&&"op"===n.type){var s="\\limits"===i.text;n.limits=s,n.alwaysHandleSupSub=!0}else{if(!n||"operatorname"!==n.type)throw new Vi("Limit controls must follow a math operator",i);n.alwaysHandleSupSub&&(n.limits="\\limits"===i.text)}this.consume()}else if("^"===i.text){if(t)throw new Vi("Double superscript",i);t=this.handleSupSubscript("superscript")}else if("_"===i.text){if(r)throw new Vi("Double subscript",i);r=this.handleSupSubscript("subscript")}else if("'"===i.text){if(t)throw new Vi("Double superscript",i);var a={type:"textord",mode:this.mode,text:"\\prime"},o=[a];for(this.consume();"'"===this.fetch().text;)o.push(a),this.consume();"^"===this.fetch().text&&o.push(this.handleSupSubscript("superscript")),t={type:"ordgroup",mode:this.mode,body:o}}else{if(!bh[i.text])break;var l=vh.test(i.text),h=[];for(h.push(new Ti(bh[i.text])),this.consume();;){var c=this.fetch().text;if(!bh[c])break;if(vh.test(c)!==l)break;h.unshift(new Ti(bh[c])),this.consume()}var p=this.subparse(h);l?r={type:"ordgroup",mode:"math",body:p}:t={type:"ordgroup",mode:"math",body:p}}}return t||r?{type:"supsub",mode:this.mode,base:n,sup:t,sub:r}:n}parseFunction(e,t){var r=this.fetch(),n=r.text,i=eh[n];if(!i)return null;if(this.consume(),t&&"atom"!==t&&!i.allowedInArgument)throw new Vi("Got function '"+n+"' with no arguments"+(t?" as "+t:""),r);if("text"===this.mode&&!i.allowedInText)throw new Vi("Can't use function '"+n+"' in text mode",r);if("math"===this.mode&&!1===i.allowedInMath)throw new Vi("Can't use function '"+n+"' in math mode",r);var{args:s,optArgs:a}=this.parseArguments(n,i);return this.callFunction(n,s,a,r,e)}callFunction(e,t,r,n,i){var s={funcName:e,parser:this,token:n,breakOnTokenText:i},a=eh[e];if(a&&a.handler)return a.handler(s,t,r);throw new Vi("No function handler for "+e)}parseArguments(e,t){var r=t.numArgs+t.numOptionalArgs;if(0===r)return{args:[],optArgs:[]};for(var n=[],i=[],s=0;s<r;s++){var a=t.argTypes&&t.argTypes[s],o=s<t.numOptionalArgs;(t.primitive&&null==a||"sqrt"===t.type&&1===s&&null==i[0])&&(a="primitive");var l=this.parseGroupOfType("argument to '"+e+"'",a,o);if(o)i.push(l);else{if(null==l)throw new Vi("Null argument, please report this as a bug");n.push(l)}}return{args:n,optArgs:i}}parseGroupOfType(e,t,r){switch(t){case"color":return this.parseColorGroup(r);case"size":return this.parseSizeGroup(r);case"url":return this.parseUrlGroup(r);case"math":case"text":return this.parseArgumentGroup(r,t);case"hbox":var n=this.parseArgumentGroup(r,"text");return null!=n?{type:"styling",mode:n.mode,body:[n],style:"text"}:null;case"raw":var i=this.parseStringGroup("raw",r);return null!=i?{type:"raw",mode:"text",string:i.text}:null;case"primitive":if(r)throw new Vi("A primitive argument cannot be optional");var s=this.parseGroup(e);if(null==s)throw new Vi("Expected group as "+e,this.fetch());return s;case"original":case null:case void 0:return this.parseArgumentGroup(r);default:throw new Vi("Unknown group type as "+e,this.fetch())}}consumeSpaces(){for(;" "===this.fetch().text;)this.consume()}parseStringGroup(e,t){var r=this.gullet.scanArgument(t);if(null==r)return null;for(var n,i="";"EOF"!==(n=this.fetch()).text;)i+=n.text,this.consume();return this.consume(),r.text=i,r}parseRegexGroup(e,t){for(var r,n=this.fetch(),i=n,s="";"EOF"!==(r=this.fetch()).text&&e.test(s+r.text);)s+=(i=r).text,this.consume();if(""===s)throw new Vi("Invalid "+t+": '"+n.text+"'",n);return n.range(i,s)}parseColorGroup(e){var t=this.parseStringGroup("color",e);if(null==t)return null;var r=/^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);if(!r)throw new Vi("Invalid color: '"+t.text+"'",t);var n=r[0];return/^[0-9a-f]{6}$/i.test(n)&&(n="#"+n),{type:"color-token",mode:this.mode,color:n}}parseSizeGroup(e){var t,r=!1;if(this.gullet.consumeSpaces(),!(t=e||"{"===this.gullet.future().text?this.parseStringGroup("size",e):this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/,"size")))return null;e||0!==t.text.length||(t.text="0pt",r=!0);var n=/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);if(!n)throw new Vi("Invalid size: '"+t.text+"'",t);var i={number:+(n[1]+n[2]),unit:n[3]};if(!ds(i))throw new Vi("Invalid unit: '"+i.unit+"'",t);return{type:"size",mode:this.mode,value:i,isBlank:r}}parseUrlGroup(e){this.gullet.lexer.setCatcode("%",13),this.gullet.lexer.setCatcode("~",12);var t=this.parseStringGroup("url",e);if(this.gullet.lexer.setCatcode("%",14),this.gullet.lexer.setCatcode("~",13),null==t)return null;var r=t.text.replace(/\\([#$%&~_^{}])/g,"$1");return{type:"url",mode:this.mode,url:r}}parseArgumentGroup(e,t){var r=this.gullet.scanArgument(e);if(null==r)return null;var n=this.mode;t&&this.switchMode(t),this.gullet.beginGroup();var i=this.parseExpression(!1,"EOF");this.expect("EOF"),this.gullet.endGroup();var s={type:"ordgroup",mode:this.mode,loc:r.loc,body:i};return t&&this.switchMode(n),s}parseGroup(e,t){var r,n=this.fetch(),i=n.text;if("{"===i||"\\begingroup"===i){this.consume();var s="{"===i?"}":"\\endgroup";this.gullet.beginGroup();var a=this.parseExpression(!1,s),o=this.fetch();this.expect(s),this.gullet.endGroup(),r={type:"ordgroup",mode:this.mode,loc:Ei.range(n,o),body:a,semisimple:"\\begingroup"===i||void 0}}else if(null==(r=this.parseFunction(t,e)||this.parseSymbol())&&"\\"===i[0]&&!gh.hasOwnProperty(i)){if(this.settings.throwOnError)throw new Vi("Undefined control sequence: "+i,n);r=this.formatUnsupportedCmd(i),this.consume()}return r}formLigatures(e){for(var t=e.length-1,r=0;r<t;++r){var n=e[r],i=n.text;"-"===i&&"-"===e[r+1].text&&(r+1<t&&"-"===e[r+2].text?(e.splice(r,3,{type:"textord",mode:"text",loc:Ei.range(n,e[r+2]),text:"---"}),t-=2):(e.splice(r,2,{type:"textord",mode:"text",loc:Ei.range(n,e[r+1]),text:"--"}),t-=1)),"'"!==i&&"`"!==i||e[r+1].text!==i||(e.splice(r,2,{type:"textord",mode:"text",loc:Ei.range(n,e[r+1]),text:i+i}),t-=1)}}parseSymbol(){var e=this.fetch(),t=e.text;if(/^\\verb[^a-zA-Z]/.test(t)){this.consume();var r=t.slice(5),n="*"===r.charAt(0);if(n&&(r=r.slice(1)),r.length<2||r.charAt(0)!==r.slice(-1))throw new Vi("\\verb assertion failed --\n                    please report what input caused this bug");return{type:"verb",mode:"text",body:r=r.slice(1,-1),star:n}}yh.hasOwnProperty(t[0])&&!Ts[this.mode][t[0]]&&(this.settings.strict&&"math"===this.mode&&this.settings.reportNonstrict("unicodeTextInMathMode",'Accented Unicode text character "'+t[0]+'" used in math mode',e),t=yh[t[0]]+t.slice(1));var i,s=ih.exec(t);if(s&&("i"===(t=t.substring(0,s.index))?t="ı":"j"===t&&(t="ȷ")),Ts[this.mode][t]){this.settings.strict&&"math"===this.mode&&ha.indexOf(t)>=0&&this.settings.reportNonstrict("unicodeTextInMathMode",'Latin-1/Unicode text character "'+t[0]+'" used in math mode',e);var a,o=Ts[this.mode][t].group,l=Ei.range(e);if(As.hasOwnProperty(o)){var h=o;a={type:"atom",mode:this.mode,family:h,loc:l,text:t}}else a={type:o,mode:this.mode,loc:l,text:t};i=a}else{if(!(t.charCodeAt(0)>=128))return null;this.settings.strict&&(Qi(t.charCodeAt(0))?"math"===this.mode&&this.settings.reportNonstrict("unicodeTextInMathMode",'Unicode text character "'+t[0]+'" used in math mode',e):this.settings.reportNonstrict("unknownSymbol",'Unrecognized Unicode character "'+t[0]+'" ('+t.charCodeAt(0)+")",e)),i={type:"textord",mode:"text",loc:Ei.range(e),text:t}}if(this.consume(),s)for(var c=0;c<s[0].length;c++){var p=s[0][c];if(!wh[p])throw new Vi("Unknown accent ' "+p+"'",e);var u=wh[p][this.mode]||wh[p].text;if(!u)throw new Vi("Accent "+p+" unsupported in "+this.mode+" mode",e);i={type:"accent",mode:this.mode,loc:Ei.range(e),label:u,isStretchy:!1,isShifty:!0,base:i}}return i}}xh.endOfExpression=["}","\\endgroup","\\end","\\right","&"];var kh=function(e,t){if(!("string"==typeof e||e instanceof String))throw new TypeError("KaTeX can only parse string typed expression");var r=new xh(e,t);delete r.gullet.macros.current["\\df@tag"];var n=r.parse();if(delete r.gullet.macros.current["\\current@color"],delete r.gullet.macros.current["\\color"],r.gullet.macros.get("\\df@tag")){if(!t.displayMode)throw new Vi("\\tag works only in display equations");n=[{type:"tag",mode:"text",body:n,tag:r.subparse([new Ti("\\df@tag")])}]}return n},_h=function(e,t,r){t.textContent="";var n=Ch(e,r).toNode();t.appendChild(n)};"undefined"!=typeof document&&"CSS1Compat"!==document.compatMode&&("undefined"!=typeof console&&console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."),_h=function(){throw new Vi("KaTeX doesn't work in quirks mode.")});var Sh=function(e,t,r){if(r.throwOnError||!(e instanceof Vi))throw e;var n=Sa.makeSpan(["katex-error"],[new Ss(t)]);return n.setAttribute("title",e.toString()),n.setAttribute("style","color:"+r.errorColor),n},Ch=function(e,t){var r=new Di(t);try{return function(e,t,r){var n,i=lo(r);if("mathml"===r.output)return oo(e,t,i,r.displayMode,!0);if("html"===r.output){var s=Wa(e,i);n=Sa.makeSpan(["katex"],[s])}else{var a=oo(e,t,i,r.displayMode,!1),o=Wa(e,i);n=Sa.makeSpan(["katex"],[a,o])}return ho(n,r)}(kh(e,r),e,r)}catch(t){return Sh(t,e,r)}},Mh={version:"0.16.11",render:_h,renderToString:function(e,t){return Ch(e,t).toMarkup()},ParseError:Vi,SETTINGS_SCHEMA:Oi,__parse:function(e,t){var r=new Di(t);return kh(e,r)},__renderToDomTree:Ch,__renderToHTMLTree:function(e,t){var r=new Di(t);try{return function(e,t,r){var n=Wa(e,lo(r)),i=Sa.makeSpan(["katex"],[n]);return ho(i,r)}(kh(e,r),0,r)}catch(t){return Sh(t,e,r)}},__setFontMetrics:function(e,t){rs[e]=t},__defineSymbol:Vs,__defineFunction:Ba,__defineMacro:dl,__domTree:{Span:ys,Anchor:xs,SymbolNode:Ss,SvgNode:Cs,PathNode:Ms,LineNode:Ps}};function Ph(e,t,r){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:r;throw new TypeError("Private element is not present on this object")}function zh(e,t){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,t),t.add(e)}function Ah(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Eh(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let Th={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};function Vh(e){Th=e}const Bh=/[&<>"']/,Lh=new RegExp(Bh.source,"g"),Nh=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,Rh=new RegExp(Nh.source,"g"),qh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Oh=e=>qh[e];function Ih(e,t){if(t){if(Bh.test(e))return e.replace(Lh,Oh)}else if(Nh.test(e))return e.replace(Rh,Oh);return e}const Dh=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;const Hh=/(^|[^\[])\^/g;function $h(e,t){e="string"==typeof e?e:e.source,t=t||"";const r={replace:(t,n)=>(n=(n="object"==typeof n&&"source"in n?n.source:n).replace(Hh,"$1"),e=e.replace(t,n),r),getRegex:()=>new RegExp(e,t)};return r}function jh(e){try{e=encodeURI(e).replace(/%25/g,"%")}catch(e){return null}return e}const Fh={exec:()=>null};function Uh(e,t){const r=e.replace(/\|/g,((e,t,r)=>{let n=!1,i=t;for(;--i>=0&&"\\"===r[i];)n=!n;return n?"|":" |"})).split(/ \|/);let n=0;if(r[0].trim()||r.shift(),r.length>0&&!r[r.length-1].trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;n<r.length;n++)r[n]=r[n].trim().replace(/\\\|/g,"|");return r}function Gh(e,t,r){const n=e.length;if(0===n)return"";let i=0;for(;i<n;){const s=e.charAt(n-i-1);if(s!==t||r){if(s===t||!r)break;i++}else i++}return e.slice(0,n-i)}function Kh(e,t,r,n){const i=t.href,s=t.title?Ih(t.title):null,a=e[1].replace(/\\([\[\]])/g,"$1");if("!"!==e[0].charAt(0)){n.state.inLink=!0;const e={type:"link",raw:r,href:i,title:s,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,e}return{type:"image",raw:r,href:i,title:s,text:Ih(a)}}class Yh{options;rules;lexer;constructor(e){this.options=e||Th}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const e=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:Gh(e,"\n")}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const e=t[0],r=function(e,t){const r=e.match(/^(\s+)(?:```)/);if(null===r)return t;const n=r[1];return t.split("\n").map((e=>{const t=e.match(/^\s+/);if(null===t)return e;const[r]=t;return r.length>=n.length?e.slice(n.length):e})).join("\n")}(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline._escapes,"$1"):t[2],text:r}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(/#$/.test(e)){const t=Gh(e,"#");this.options.pedantic?e=t.trim():t&&!/ $/.test(t)||(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const e=Gh(t[0].replace(/^ *>[ \t]?/gm,""),"\n"),r=this.lexer.state.top;this.lexer.state.top=!0;const n=this.lexer.blockTokens(e);return this.lexer.state.top=r,{type:"blockquote",raw:t[0],tokens:n,text:e}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim();const n=r.length>1,i={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");const s=new RegExp(`^( {0,3}${r})((?:[\t ][^\\n]*)?(?:\\n|$))`);let a="",o="",l=!1;for(;e;){let r=!1;if(!(t=s.exec(e)))break;if(this.rules.block.hr.test(e))break;a=t[0],e=e.substring(a.length);let n=t[2].split("\n",1)[0].replace(/^\t+/,(e=>" ".repeat(3*e.length))),h=e.split("\n",1)[0],c=0;this.options.pedantic?(c=2,o=n.trimStart()):(c=t[2].search(/[^ ]/),c=c>4?1:c,o=n.slice(c),c+=t[1].length);let p=!1;if(!n&&/^ *$/.test(h)&&(a+=h+"\n",e=e.substring(h.length+1),r=!0),!r){const t=new RegExp(`^ {0,${Math.min(3,c-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),r=new RegExp(`^ {0,${Math.min(3,c-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),i=new RegExp(`^ {0,${Math.min(3,c-1)}}(?:\`\`\`|~~~)`),s=new RegExp(`^ {0,${Math.min(3,c-1)}}#`);for(;e;){const l=e.split("\n",1)[0];if(h=l,this.options.pedantic&&(h=h.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),i.test(h))break;if(s.test(h))break;if(t.test(h))break;if(r.test(e))break;if(h.search(/[^ ]/)>=c||!h.trim())o+="\n"+h.slice(c);else{if(p)break;if(n.search(/[^ ]/)>=4)break;if(i.test(n))break;if(s.test(n))break;if(r.test(n))break;o+="\n"+h}p||h.trim()||(p=!0),a+=l+"\n",e=e.substring(l.length+1),n=h.slice(c)}}i.loose||(l?i.loose=!0:/\n *\n *$/.test(a)&&(l=!0));let u,d=null;this.options.gfm&&(d=/^\[[ xX]\] /.exec(o),d&&(u="[ ] "!==d[0],o=o.replace(/^\[[ xX]\] +/,""))),i.items.push({type:"list_item",raw:a,task:!!d,checked:u,loose:!1,text:o,tokens:[]}),i.raw+=a}i.items[i.items.length-1].raw=a.trimEnd(),i.items[i.items.length-1].text=o.trimEnd(),i.raw=i.raw.trimEnd();for(let e=0;e<i.items.length;e++)if(this.lexer.state.top=!1,i.items[e].tokens=this.lexer.blockTokens(i.items[e].text,[]),!i.loose){const t=i.items[e].tokens.filter((e=>"space"===e.type)),r=t.length>0&&t.some((e=>/\n.*\n/.test(e.raw)));i.loose=r}if(i.loose)for(let e=0;e<i.items.length;e++)i.items[e].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t){return{type:"html",block:!0,raw:t[0],pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:t[0]}}}def(e){const t=this.rules.block.def.exec(e);if(t){const e=t[1].toLowerCase().replace(/\s+/g," "),r=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",n=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline._escapes,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:r,title:n}}}table(e){const t=this.rules.block.table.exec(e);if(t){if(!/[:|]/.test(t[2]))return;const e={type:"table",raw:t[0],header:Uh(t[1]).map((e=>({text:e,tokens:[]}))),align:t[2].replace(/^\||\| *$/g,"").split("|"),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(e.header.length===e.align.length){let t,r,n,i,s=e.align.length;for(t=0;t<s;t++){const r=e.align[t];r&&(/^ *-+: *$/.test(r)?e.align[t]="right":/^ *:-+: *$/.test(r)?e.align[t]="center":/^ *:-+ *$/.test(r)?e.align[t]="left":e.align[t]=null)}for(s=e.rows.length,t=0;t<s;t++)e.rows[t]=Uh(e.rows[t],e.header.length).map((e=>({text:e,tokens:[]})));for(s=e.header.length,r=0;r<s;r++)e.header[r].tokens=this.lexer.inline(e.header[r].text);for(s=e.rows.length,r=0;r<s;r++)for(i=e.rows[r],n=0;n<i.length;n++)i[n].tokens=this.lexer.inline(i[n].text);return e}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:Ih(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const e=t[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e))return;const t=Gh(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{const e=function(e,t){if(-1===e.indexOf(t[1]))return-1;let r=0;for(let n=0;n<e.length;n++)if("\\"===e[n])n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return-1}(t[2],"()");if(e>-1){const r=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let r=t[2],n="";if(this.options.pedantic){const e=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);e&&(r=e[1],n=e[3])}else n=t[3]?t[3].slice(1,-1):"";return r=r.trim(),/^</.test(r)&&(r=this.options.pedantic&&!/>$/.test(e)?r.slice(1):r.slice(1,-1)),Kh(t,{href:r?r.replace(this.rules.inline._escapes,"$1"):r,title:n?n.replace(this.rules.inline._escapes,"$1"):n},t[0],this.lexer)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let e=(r[2]||r[1]).replace(/\s+/g," ");if(e=t[e.toLowerCase()],!e){const e=r[0].charAt(0);return{type:"text",raw:e,text:e}}return Kh(r,e,r[0],this.lexer)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrong.lDelim.exec(e);if(!n)return;if(n[3]&&r.match(/[\p{L}\p{N}]/u))return;if(!(n[1]||n[2]||"")||!r||this.rules.inline.punctuation.exec(r)){const r=[...n[0]].length-1;let i,s,a=r,o=0;const l="*"===n[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+r);null!=(n=l.exec(t));){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i)continue;if(s=[...i].length,n[3]||n[4]){a+=s;continue}if((n[5]||n[6])&&r%3&&!((r+s)%3)){o+=s;continue}if(a-=s,a>0)continue;s=Math.min(s,s+a+o);const t=[...n[0]][0].length,l=e.slice(0,r+n.index+t+s);if(Math.min(r,s)%2){const e=l.slice(1,-1);return{type:"em",raw:l,text:e,tokens:this.lexer.inlineTokens(e)}}const h=l.slice(2,-2);return{type:"strong",raw:l,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(/\n/g," ");const r=/[^ ]/.test(e),n=/^ /.test(e)&&/ $/.test(e);return r&&n&&(e=e.substring(1,e.length-1)),e=Ih(e,!0),{type:"codespan",raw:t[0],text:e}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let e,r;return"@"===t[2]?(e=Ih(t[1]),r="mailto:"+e):(e=Ih(t[1]),r=e),{type:"link",raw:t[0],text:e,href:r,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,r;if("@"===t[2])e=Ih(t[0]),r="mailto:"+e;else{let n;do{n=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])[0]}while(n!==t[0]);e=Ih(t[0]),r="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:r,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let e;return e=this.lexer.state.inRawBlock?t[0]:Ih(t[0]),{type:"text",raw:t[0],text:e}}}}const Xh={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:Fh,lheading:/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};Xh.def=$h(Xh.def).replace("label",Xh._label).replace("title",Xh._title).getRegex(),Xh.bullet=/(?:[*+-]|\d{1,9}[.)])/,Xh.listItemStart=$h(/^( *)(bull) */).replace("bull",Xh.bullet).getRegex(),Xh.list=$h(Xh.list).replace(/bull/g,Xh.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+Xh.def.source+")").getRegex(),Xh._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Xh._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,Xh.html=$h(Xh.html,"i").replace("comment",Xh._comment).replace("tag",Xh._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Xh.lheading=$h(Xh.lheading).replace(/bull/g,Xh.bullet).getRegex(),Xh.paragraph=$h(Xh._paragraph).replace("hr",Xh.hr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Xh._tag).getRegex(),Xh.blockquote=$h(Xh.blockquote).replace("paragraph",Xh.paragraph).getRegex(),Xh.normal={...Xh},Xh.gfm={...Xh.normal,table:"^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"},Xh.gfm.table=$h(Xh.gfm.table).replace("hr",Xh.hr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Xh._tag).getRegex(),Xh.gfm.paragraph=$h(Xh._paragraph).replace("hr",Xh.hr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Xh.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Xh._tag).getRegex(),Xh.pedantic={...Xh.normal,html:$h("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",Xh._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Fh,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$h(Xh.normal._paragraph).replace("hr",Xh.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",Xh.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const Wh={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:Fh,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,rDelimAst:/^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:Fh,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^((?![*_])[\spunctuation])/,_punctuation:"\\p{P}$+<=>`^|~"};Wh.punctuation=$h(Wh.punctuation,"u").replace(/punctuation/g,Wh._punctuation).getRegex(),Wh.blockSkip=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Wh.anyPunctuation=/\\[punct]/g,Wh._escapes=/\\([punct])/g,Wh._comment=$h(Xh._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),Wh.emStrong.lDelim=$h(Wh.emStrong.lDelim,"u").replace(/punct/g,Wh._punctuation).getRegex(),Wh.emStrong.rDelimAst=$h(Wh.emStrong.rDelimAst,"gu").replace(/punct/g,Wh._punctuation).getRegex(),Wh.emStrong.rDelimUnd=$h(Wh.emStrong.rDelimUnd,"gu").replace(/punct/g,Wh._punctuation).getRegex(),Wh.anyPunctuation=$h(Wh.anyPunctuation,"gu").replace(/punct/g,Wh._punctuation).getRegex(),Wh._escapes=$h(Wh._escapes,"gu").replace(/punct/g,Wh._punctuation).getRegex(),Wh._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,Wh._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,Wh.autolink=$h(Wh.autolink).replace("scheme",Wh._scheme).replace("email",Wh._email).getRegex(),Wh._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,Wh.tag=$h(Wh.tag).replace("comment",Wh._comment).replace("attribute",Wh._attribute).getRegex(),Wh._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Wh._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,Wh._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,Wh.link=$h(Wh.link).replace("label",Wh._label).replace("href",Wh._href).replace("title",Wh._title).getRegex(),Wh.reflink=$h(Wh.reflink).replace("label",Wh._label).replace("ref",Xh._label).getRegex(),Wh.nolink=$h(Wh.nolink).replace("ref",Xh._label).getRegex(),Wh.reflinkSearch=$h(Wh.reflinkSearch,"g").replace("reflink",Wh.reflink).replace("nolink",Wh.nolink).getRegex(),Wh.normal={...Wh},Wh.pedantic={...Wh.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:$h(/^!?\[(label)\]\((.*?)\)/).replace("label",Wh._label).getRegex(),reflink:$h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Wh._label).getRegex()},Wh.gfm={...Wh.normal,escape:$h(Wh.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Wh.gfm.url=$h(Wh.gfm.url,"i").replace("email",Wh.gfm._extended_email).getRegex(),Wh.breaks={...Wh.gfm,br:$h(Wh.br).replace("{2,}","*").getRegex(),text:$h(Wh.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};class Zh{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Th,this.options.tokenizer=this.options.tokenizer||new Yh,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:Xh.normal,inline:Wh.normal};this.options.pedantic?(t.block=Xh.pedantic,t.inline=Wh.pedantic):this.options.gfm&&(t.block=Xh.gfm,this.options.breaks?t.inline=Wh.breaks:t.inline=Wh.gfm),this.tokenizer.rules=t}static get rules(){return{block:Xh,inline:Wh}}static lex(e,t){return new Zh(t).lex(e)}static lexInline(e,t){return new Zh(t).inlineTokens(e)}lex(e){let t;for(e=e.replace(/\r\n|\r/g,"\n"),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}blockTokens(e,t=[]){let r,n,i,s;for(e=this.options.pedantic?e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e.replace(/^( *)(\t+)/gm,((e,t,r)=>t+"    ".repeat(r.length)));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((n=>!!(r=n.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))))if(r=this.tokenizer.space(e))e=e.substring(r.raw.length),1===r.raw.length&&t.length>0?t[t.length-1].raw+="\n":t.push(r);else if(r=this.tokenizer.code(e))e=e.substring(r.raw.length),n=t[t.length-1],!n||"paragraph"!==n.type&&"text"!==n.type?t.push(r):(n.raw+="\n"+r.raw,n.text+="\n"+r.text,this.inlineQueue[this.inlineQueue.length-1].src=n.text);else if(r=this.tokenizer.fences(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.heading(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.hr(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.blockquote(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.list(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.html(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.def(e))e=e.substring(r.raw.length),n=t[t.length-1],!n||"paragraph"!==n.type&&"text"!==n.type?this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title}):(n.raw+="\n"+r.raw,n.text+="\n"+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=n.text);else if(r=this.tokenizer.table(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.lheading(e))e=e.substring(r.raw.length),t.push(r);else{if(i=e,this.options.extensions&&this.options.extensions.startBlock){let t=1/0;const r=e.slice(1);let n;this.options.extensions.startBlock.forEach((e=>{n=e.call({lexer:this},r),"number"==typeof n&&n>=0&&(t=Math.min(t,n))})),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(this.state.top&&(r=this.tokenizer.paragraph(i)))n=t[t.length-1],s&&"paragraph"===n.type?(n.raw+="\n"+r.raw,n.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=n.text):t.push(r),s=i.length!==e.length,e=e.substring(r.raw.length);else if(r=this.tokenizer.text(e))e=e.substring(r.raw.length),n=t[t.length-1],n&&"text"===n.type?(n.raw+="\n"+r.raw,n.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=n.text):t.push(r);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let r,n,i,s,a,o,l=e;if(this.tokens.links){const e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(s=this.tokenizer.rules.inline.reflinkSearch.exec(l));)e.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(l=l.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(s=this.tokenizer.rules.inline.blockSkip.exec(l));)l=l.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(s=this.tokenizer.rules.inline.anyPunctuation.exec(l));)l=l.slice(0,s.index)+"++"+l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(a||(o=""),a=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((n=>!!(r=n.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))))if(r=this.tokenizer.escape(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.tag(e))e=e.substring(r.raw.length),n=t[t.length-1],n&&"text"===r.type&&"text"===n.type?(n.raw+=r.raw,n.text+=r.text):t.push(r);else if(r=this.tokenizer.link(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(r.raw.length),n=t[t.length-1],n&&"text"===r.type&&"text"===n.type?(n.raw+=r.raw,n.text+=r.text):t.push(r);else if(r=this.tokenizer.emStrong(e,l,o))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.codespan(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.br(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.del(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.autolink(e))e=e.substring(r.raw.length),t.push(r);else if(this.state.inLink||!(r=this.tokenizer.url(e))){if(i=e,this.options.extensions&&this.options.extensions.startInline){let t=1/0;const r=e.slice(1);let n;this.options.extensions.startInline.forEach((e=>{n=e.call({lexer:this},r),"number"==typeof n&&n>=0&&(t=Math.min(t,n))})),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(r=this.tokenizer.inlineText(i))e=e.substring(r.raw.length),"_"!==r.raw.slice(-1)&&(o=r.raw.slice(-1)),a=!0,n=t[t.length-1],n&&"text"===n.type?(n.raw+=r.raw,n.text+=r.text):t.push(r);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}else e=e.substring(r.raw.length),t.push(r);return t}}class Qh{options;constructor(e){this.options=e||Th}code(e,t,r){const n=(t||"").match(/^\S*/)?.[0];return e=e.replace(/\n$/,"")+"\n",n?'<pre><code class="language-'+Ih(n)+'">'+(r?e:Ih(e,!0))+"</code></pre>\n":"<pre><code>"+(r?e:Ih(e,!0))+"</code></pre>\n"}blockquote(e){return`<blockquote>\n${e}</blockquote>\n`}html(e,t){return e}heading(e,t,r){return`<h${t}>${e}</h${t}>\n`}hr(){return"<hr>\n"}list(e,t,r){const n=t?"ol":"ul";return"<"+n+(t&&1!==r?' start="'+r+'"':"")+">\n"+e+"</"+n+">\n"}listitem(e,t,r){return`<li>${e}</li>\n`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>\n`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return`<tr>\n${e}</tr>\n`}tablecell(e,t){const r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>\n`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,r){const n=jh(e);if(null===n)return r;let i='<a href="'+(e=n)+'"';return t&&(i+=' title="'+t+'"'),i+=">"+r+"</a>",i}image(e,t,r){const n=jh(e);if(null===n)return r;let i=`<img src="${e=n}" alt="${r}"`;return t&&(i+=` title="${t}"`),i+=">",i}text(e){return e}}class Jh{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,r){return""+r}image(e,t,r){return""+r}br(){return""}}class ec{options;renderer;textRenderer;constructor(e){this.options=e||Th,this.options.renderer=this.options.renderer||new Qh,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new Jh}static parse(e,t){return new ec(t).parse(e)}static parseInline(e,t){return new ec(t).parseInline(e)}parse(e,t=!0){let r="";for(let n=0;n<e.length;n++){const i=e[n];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const e=i,t=this.options.extensions.renderers[e.type].call({parser:this},e);if(!1!==t||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(e.type)){r+=t||"";continue}}switch(i.type){case"space":continue;case"hr":r+=this.renderer.hr();continue;case"heading":{const e=i;r+=this.renderer.heading(this.parseInline(e.tokens),e.depth,this.parseInline(e.tokens,this.textRenderer).replace(Dh,((e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):"")));continue}case"code":{const e=i;r+=this.renderer.code(e.text,e.lang,!!e.escaped);continue}case"table":{const e=i;let t="",n="";for(let t=0;t<e.header.length;t++)n+=this.renderer.tablecell(this.parseInline(e.header[t].tokens),{header:!0,align:e.align[t]});t+=this.renderer.tablerow(n);let s="";for(let t=0;t<e.rows.length;t++){const r=e.rows[t];n="";for(let t=0;t<r.length;t++)n+=this.renderer.tablecell(this.parseInline(r[t].tokens),{header:!1,align:e.align[t]});s+=this.renderer.tablerow(n)}r+=this.renderer.table(t,s);continue}case"blockquote":{const e=i,t=this.parse(e.tokens);r+=this.renderer.blockquote(t);continue}case"list":{const e=i,t=e.ordered,n=e.start,s=e.loose;let a="";for(let t=0;t<e.items.length;t++){const r=e.items[t],n=r.checked,i=r.task;let o="";if(r.task){const e=this.renderer.checkbox(!!n);s?r.tokens.length>0&&"paragraph"===r.tokens[0].type?(r.tokens[0].text=e+" "+r.tokens[0].text,r.tokens[0].tokens&&r.tokens[0].tokens.length>0&&"text"===r.tokens[0].tokens[0].type&&(r.tokens[0].tokens[0].text=e+" "+r.tokens[0].tokens[0].text)):r.tokens.unshift({type:"text",text:e+" "}):o+=e+" "}o+=this.parse(r.tokens,s),a+=this.renderer.listitem(o,i,!!n)}r+=this.renderer.list(a,t,n);continue}case"html":{const e=i;r+=this.renderer.html(e.text,e.block);continue}case"paragraph":{const e=i;r+=this.renderer.paragraph(this.parseInline(e.tokens));continue}case"text":{let s=i,a=s.tokens?this.parseInline(s.tokens):s.text;for(;n+1<e.length&&"text"===e[n+1].type;)s=e[++n],a+="\n"+(s.tokens?this.parseInline(s.tokens):s.text);r+=t?this.renderer.paragraph(a):a;continue}default:{const e='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return r}parseInline(e,t){t=t||this.renderer;let r="";for(let n=0;n<e.length;n++){const i=e[n];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const e=this.options.extensions.renderers[i.type].call({parser:this},i);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=e||"";continue}}switch(i.type){case"escape":{const e=i;r+=t.text(e.text);break}case"html":{const e=i;r+=t.html(e.text);break}case"link":{const e=i;r+=t.link(e.href,e.title,this.parseInline(e.tokens,t));break}case"image":{const e=i;r+=t.image(e.href,e.title,e.text);break}case"strong":{const e=i;r+=t.strong(this.parseInline(e.tokens,t));break}case"em":{const e=i;r+=t.em(this.parseInline(e.tokens,t));break}case"codespan":{const e=i;r+=t.codespan(e.text);break}case"br":r+=t.br();break;case"del":{const e=i;r+=t.del(this.parseInline(e.tokens,t));break}case"text":{const e=i;r+=t.text(e.text);break}default:{const e='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return r}}class tc{options;constructor(e){this.options=e||Th}static passThroughHooks=new Set(["preprocess","postprocess"]);preprocess(e){return e}postprocess(e){return e}}var rc=new WeakSet;class nc{constructor(...e){zh(this,rc),Ah(this,"defaults",{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}),Ah(this,"options",this.setOptions),Ah(this,"parse",Ph(rc,this,ic).call(this,Zh.lex,ec.parse)),Ah(this,"parseInline",Ph(rc,this,ic).call(this,Zh.lexInline,ec.parseInline)),Ah(this,"Parser",ec),Ah(this,"Renderer",Qh),Ah(this,"TextRenderer",Jh),Ah(this,"Lexer",Zh),Ah(this,"Tokenizer",Yh),Ah(this,"Hooks",tc),this.use(...e)}walkTokens(e,t){let r=[];for(const n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{const e=n;for(const n of e.header)r=r.concat(this.walkTokens(n.tokens,t));for(const n of e.rows)for(const e of n)r=r.concat(this.walkTokens(e.tokens,t));break}case"list":{const e=n;r=r.concat(this.walkTokens(e.items,t));break}default:{const e=n;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach((n=>{r=r.concat(this.walkTokens(e[n],t))})):e.tokens&&(r=r.concat(this.walkTokens(e.tokens,t)))}}return r}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach((e=>{const r={...e};if(r.async=this.defaults.async||r.async||!1,e.extensions&&(e.extensions.forEach((e=>{if(!e.name)throw new Error("extension name required");if("renderer"in e){const r=t.renderers[e.name];t.renderers[e.name]=r?function(...t){let n=e.renderer.apply(this,t);return!1===n&&(n=r.apply(this,t)),n}:e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");const r=t[e.level];r?r.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)})),r.extensions=t),e.renderer){const t=this.defaults.renderer||new Qh(this.defaults);for(const r in e.renderer){const n=e.renderer[r],i=r,s=t[i];t[i]=(...e)=>{let r=n.apply(t,e);return!1===r&&(r=s.apply(t,e)),r||""}}r.renderer=t}if(e.tokenizer){const t=this.defaults.tokenizer||new Yh(this.defaults);for(const r in e.tokenizer){const n=e.tokenizer[r],i=r,s=t[i];t[i]=(...e)=>{let r=n.apply(t,e);return!1===r&&(r=s.apply(t,e)),r}}r.tokenizer=t}if(e.hooks){const t=this.defaults.hooks||new tc;for(const r in e.hooks){const n=e.hooks[r],i=r,s=t[i];tc.passThroughHooks.has(r)?t[i]=e=>{if(this.defaults.async)return Promise.resolve(n.call(t,e)).then((e=>s.call(t,e)));const r=n.call(t,e);return s.call(t,r)}:t[i]=(...e)=>{let r=n.apply(t,e);return!1===r&&(r=s.apply(t,e)),r}}r.hooks=t}if(e.walkTokens){const t=this.defaults.walkTokens,n=e.walkTokens;r.walkTokens=function(e){let r=[];return r.push(n.call(this,e)),t&&(r=r.concat(t.call(this,e))),r}}this.defaults={...this.defaults,...r}})),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Zh.lex(e,t??this.defaults)}parser(e,t){return ec.parse(e,t??this.defaults)}}function ic(e,t){return(r,n)=>{const i={...n},s={...this.defaults,...i};!0===this.defaults.async&&!1===i.async&&(s.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),s.async=!0);const a=Ph(rc,this,sc).call(this,!!s.silent,!!s.async);if(null==r)return a(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof r)return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));if(s.hooks&&(s.hooks.options=s),s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(r):r).then((t=>e(t,s))).then((e=>s.walkTokens?Promise.all(this.walkTokens(e,s.walkTokens)).then((()=>e)):e)).then((e=>t(e,s))).then((e=>s.hooks?s.hooks.postprocess(e):e)).catch(a);try{s.hooks&&(r=s.hooks.preprocess(r));const n=e(r,s);s.walkTokens&&this.walkTokens(n,s.walkTokens);let i=t(n,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(e){return a(e)}}}function sc(e,t){return r=>{if(r.message+="\nPlease report this to https://github.com/markedjs/marked.",e){const e="<p>An error occurred:</p><pre>"+Ih(r.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(r);throw r}}const ac=new nc;function oc(e,t){return ac.parse(e,t)}oc.options=oc.setOptions=function(e){return ac.setOptions(e),oc.defaults=ac.defaults,Vh(oc.defaults),oc},oc.getDefaults=Eh,oc.defaults=Th,oc.use=function(...e){return ac.use(...e),oc.defaults=ac.defaults,Vh(oc.defaults),oc},oc.walkTokens=function(e,t){return ac.walkTokens(e,t)},oc.parseInline=ac.parseInline,oc.Parser=ec,oc.parser=ec.parse,oc.Renderer=Qh,oc.TextRenderer=Jh,oc.Lexer=Zh,oc.lexer=Zh.lex,oc.Tokenizer=Yh,oc.Hooks=tc,oc.parse=oc,oc.options,oc.setOptions,oc.use,oc.walkTokens,oc.parseInline,ec.parse,Zh.lex;const lc=/^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1(?=[\s?!\.,:？！。，：]|$)/,hc=/^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/;function cc(e,t){return r=>Mh.renderToString(r.text,{...e,displayMode:r.displayMode})+(t?"\n":"")}function pc(e,t){return{name:"inlineKatex",level:"inline",start(e){let t,r=e;for(;r;){if(t=r.indexOf("$"),-1===t)return;if(0===t||" "===r.charAt(t-1)){if(r.substring(t).match(lc))return t}r=r.substring(t+1).replace(/^\$+/,"")}},tokenizer(e,t){const r=e.match(lc);if(r)return{type:"inlineKatex",raw:r[0],text:r[2].trim(),displayMode:2===r[1].length}},renderer:t}}function uc(e,t){return{name:"blockKatex",level:"block",tokenizer(e,t){const r=e.match(hc);if(r)return{type:"blockKatex",raw:r[0],text:r[2].trim(),displayMode:2===r[1].length}},renderer:t}}const dc=_e("indu"),mc=_e("indub");class gc{constructor(e,t){var r;this.element=e.createElement("div"),this.element.classList.add(dc()),t.border&&this.element.classList.add(mc()),null===(r=t.viewProps)||void 0===r||r.bindClassModifiers(this.element);const n=e.createElement("div");if(n.classList.add(dc("t")),t.markdown){const e=(new nc).use(function(e={}){return{extensions:[pc(0,cc(e,!1)),uc(0,cc(e,!0))]}}(Object.assign({output:"mathml"},t.latexSettings))).parse(t.content,Object.assign({gfm:!0,breaks:!0},t.markdownSettings));"string"==typeof e?n.innerHTML=e:e.then((e=>n.innerHTML=e))}else t.latex?n.innerHTML=Mh.renderToString(t.content,Object.assign({displayMode:!0,output:"mathml"},t.latexSettings)):n.textContent=t.content;this.element.appendChild(n)}}class fc extends Ae{constructor(e,t){super({blade:Ke(),viewProps:t.viewProps,view:new gc(e,t)})}}const vc=[Oe({id:"latex",type:"blade",accept(e){const t=ae(e,(e=>({view:e.required.constant("latex"),content:e.required.string,viewProps:e.optional.constant(nt.prototype),border:e.optional.boolean,markdown:e.optional.boolean,latex:e.optional.boolean,latexSettings:e.optional.object({displayMode:e.optional.boolean,output:e.optional.string,leqno:e.optional.boolean,fleqn:e.optional.boolean,throwOnError:e.optional.boolean,errorColor:e.optional.string,macros:e.optional.object({}),minRuleThickness:e.optional.number,colorIsTextColor:e.optional.boolean,maxSize:e.optional.number,maxExpand:e.optional.number,strict:e.optional.boolean,trust:e.optional.boolean,globalGroup:e.optional.boolean}),markdownSettings:e.optional.object({async:e.optional.boolean,breaks:e.optional.boolean,gfm:e.optional.boolean,pedantic:e.optional.boolean,silent:e.optional.boolean,renderer:e.optional.object({}),tokenizer:e.optional.object({}),walkTokens:e.optional.function})})));return t?{params:t}:null},controller(e){var t,r,n,i,s;return new fc(e.document,{view:e.params.view,viewProps:e.viewProps,border:null!==(t=e.params.border)&&void 0!==t&&t,content:e.params.content,latex:null!==(r=e.params.latex)&&void 0!==r&&r,markdown:null!==(n=e.params.markdown)&&void 0!==n&&n,latexSettings:null!==(i=e.params.latexSettings)&&void 0!==i?i:{},markdownSettings:null!==(s=e.params.markdownSettings)&&void 0!==s?s:{}})},api:e=>e.controller instanceof fc?new W(e.controller):null})];e.css='.tp-induv{position:relative;align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-hp);padding-right:var(--cnt-hp)}.tp-induv.tp-v-disabled{opacity:.5}.tp-induv .tp-induv_t{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;padding:2px 4px 2px;width:1px}.tp-induv .tp-induv_t>*:first-child{margin-top:0}.tp-induv .tp-induv_t>*:last-child{margin-bottom:0}.tp-induv .tp-induv_t p,.tp-induv .tp-induv_t h1,.tp-induv .tp-induv_t h2,.tp-induv .tp-induv_t h3,.tp-induv .tp-induv_t ol,.tp-induv .tp-induv_t ul,.tp-induv .tp-induv_t blockquote,.tp-induv .tp-induv_t pre{margin:.5em 0}.tp-induv .tp-induv_t a{color:var(--btn-bg)}.tp-induv .tp-induv_t a:active{color:var(--btn-bg-a)}.tp-induv .tp-induv_t a:hover{color:var(--btn-bg-h)}.tp-induv .tp-induv_t h1{font-size:1.3em;font-weight:bold}.tp-induv .tp-induv_t h2{font-size:1em;font-weight:bold}.tp-induv .tp-induv_t h3{font-size:1em;font-weight:normal}.tp-induv .tp-induv_t ol,.tp-induv .tp-induv_t ul,.tp-induv .tp-induv_t blockquote{padding-left:28px}.tp-indubv::before{border:var(--mo-fg) dashed 1px;border-radius:var(--bs-br);bottom:0;content:"";left:var(--cnt-vp);opacity:.3;position:absolute;right:var(--cnt-vp);top:0}',e.id="latex",e.plugins=vc,Object.defineProperty(e,"__esModule",{value:!0})}));

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSION = exports.TpChangeEvent = exports.TextBladeApi = exports.TabPageApi = exports.TabApi = exports.SliderInputBindingApi = exports.SliderBladeApi = exports.SeparatorBladeApi = exports.Semver = exports.Pane = exports.ListInputBindingApi = exports.ListBladeApi = exports.FolderApi = exports.ButtonApi = exports.BladeApi = void 0;
/*! Tweakpane 4.0.4 (c) 2016 cocopon, licensed under the MIT license. */
function forceCast(v) {
  return v;
}
function isEmpty(value) {
  return value === null || value === undefined;
}
function isObject$1(value) {
  return value !== null && typeof value === 'object';
}
function isRecord(value) {
  return value !== null && typeof value === 'object';
}
function deepEqualsArray(a1, a2) {
  if (a1.length !== a2.length) {
    return false;
  }
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}
function deepMerge(r1, r2) {
  const keys = Array.from(new Set([...Object.keys(r1), ...Object.keys(r2)]));
  return keys.reduce((result, key) => {
    const v1 = r1[key];
    const v2 = r2[key];
    return isRecord(v1) && isRecord(v2) ? Object.assign(Object.assign({}, result), {
      [key]: deepMerge(v1, v2)
    }) : Object.assign(Object.assign({}, result), {
      [key]: key in r2 ? v2 : v1
    });
  }, {});
}
function isBinding(value) {
  if (!isObject$1(value)) {
    return false;
  }
  return 'target' in value;
}
const CREATE_MESSAGE_MAP = {
  alreadydisposed: () => 'View has been already disposed',
  invalidparams: context => `Invalid parameters for '${context.name}'`,
  nomatchingcontroller: context => `No matching controller for '${context.key}'`,
  nomatchingview: context => `No matching view for '${JSON.stringify(context.params)}'`,
  notbindable: () => `Value is not bindable`,
  notcompatible: context => `Not compatible with  plugin '${context.id}'`,
  propertynotfound: context => `Property '${context.name}' not found`,
  shouldneverhappen: () => 'This error should never happen'
};
class TpError {
  static alreadyDisposed() {
    return new TpError({
      type: 'alreadydisposed'
    });
  }
  static notBindable() {
    return new TpError({
      type: 'notbindable'
    });
  }
  static notCompatible(bundleId, id) {
    return new TpError({
      type: 'notcompatible',
      context: {
        id: `${bundleId}.${id}`
      }
    });
  }
  static propertyNotFound(name) {
    return new TpError({
      type: 'propertynotfound',
      context: {
        name: name
      }
    });
  }
  static shouldNeverHappen() {
    return new TpError({
      type: 'shouldneverhappen'
    });
  }
  constructor(config) {
    var _a;
    this.message = (_a = CREATE_MESSAGE_MAP[config.type](forceCast(config.context))) !== null && _a !== void 0 ? _a : 'Unexpected error';
    this.name = this.constructor.name;
    this.stack = new Error(this.message).stack;
    this.type = config.type;
  }
  toString() {
    return this.message;
  }
}
class BindingTarget {
  constructor(obj, key) {
    this.obj_ = obj;
    this.key = key;
  }
  static isBindable(obj) {
    if (obj === null) {
      return false;
    }
    if (typeof obj !== 'object' && typeof obj !== 'function') {
      return false;
    }
    return true;
  }
  read() {
    return this.obj_[this.key];
  }
  write(value) {
    this.obj_[this.key] = value;
  }
  writeProperty(name, value) {
    const valueObj = this.read();
    if (!BindingTarget.isBindable(valueObj)) {
      throw TpError.notBindable();
    }
    if (!(name in valueObj)) {
      throw TpError.propertyNotFound(name);
    }
    valueObj[name] = value;
  }
}
class Emitter {
  constructor() {
    this.observers_ = {};
  }
  on(eventName, handler, opt_options) {
    var _a;
    let observers = this.observers_[eventName];
    if (!observers) {
      observers = this.observers_[eventName] = [];
    }
    observers.push({
      handler: handler,
      key: (_a = opt_options === null || opt_options === void 0 ? void 0 : opt_options.key) !== null && _a !== void 0 ? _a : handler
    });
    return this;
  }
  off(eventName, key) {
    const observers = this.observers_[eventName];
    if (observers) {
      this.observers_[eventName] = observers.filter(observer => {
        return observer.key !== key;
      });
    }
    return this;
  }
  emit(eventName, event) {
    const observers = this.observers_[eventName];
    if (!observers) {
      return;
    }
    observers.forEach(observer => {
      observer.handler(event);
    });
  }
}
class ComplexValue {
  constructor(initialValue, config) {
    var _a;
    this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
    this.equals_ = (_a = config === null || config === void 0 ? void 0 : config.equals) !== null && _a !== void 0 ? _a : (v1, v2) => v1 === v2;
    this.emitter = new Emitter();
    this.rawValue_ = initialValue;
  }
  get constraint() {
    return this.constraint_;
  }
  get rawValue() {
    return this.rawValue_;
  }
  set rawValue(rawValue) {
    this.setRawValue(rawValue, {
      forceEmit: false,
      last: true
    });
  }
  setRawValue(rawValue, options) {
    const opts = options !== null && options !== void 0 ? options : {
      forceEmit: false,
      last: true
    };
    const constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
    const prevValue = this.rawValue_;
    const changed = !this.equals_(prevValue, constrainedValue);
    if (!changed && !opts.forceEmit) {
      return;
    }
    this.emitter.emit('beforechange', {
      sender: this
    });
    this.rawValue_ = constrainedValue;
    this.emitter.emit('change', {
      options: opts,
      previousRawValue: prevValue,
      rawValue: constrainedValue,
      sender: this
    });
  }
}
class PrimitiveValue {
  constructor(initialValue) {
    this.emitter = new Emitter();
    this.value_ = initialValue;
  }
  get rawValue() {
    return this.value_;
  }
  set rawValue(value) {
    this.setRawValue(value, {
      forceEmit: false,
      last: true
    });
  }
  setRawValue(value, options) {
    const opts = options !== null && options !== void 0 ? options : {
      forceEmit: false,
      last: true
    };
    const prevValue = this.value_;
    if (prevValue === value && !opts.forceEmit) {
      return;
    }
    this.emitter.emit('beforechange', {
      sender: this
    });
    this.value_ = value;
    this.emitter.emit('change', {
      options: opts,
      previousRawValue: prevValue,
      rawValue: this.value_,
      sender: this
    });
  }
}
class ReadonlyPrimitiveValue {
  constructor(value) {
    this.emitter = new Emitter();
    this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.value_ = value;
    this.value_.emitter.on('beforechange', this.onValueBeforeChange_);
    this.value_.emitter.on('change', this.onValueChange_);
  }
  get rawValue() {
    return this.value_.rawValue;
  }
  onValueBeforeChange_(ev) {
    this.emitter.emit('beforechange', Object.assign(Object.assign({}, ev), {
      sender: this
    }));
  }
  onValueChange_(ev) {
    this.emitter.emit('change', Object.assign(Object.assign({}, ev), {
      sender: this
    }));
  }
}
function createValue(initialValue, config) {
  const constraint = config === null || config === void 0 ? void 0 : config.constraint;
  const equals = config === null || config === void 0 ? void 0 : config.equals;
  if (!constraint && !equals) {
    return new PrimitiveValue(initialValue);
  }
  return new ComplexValue(initialValue, config);
}
function createReadonlyValue(value) {
  return [new ReadonlyPrimitiveValue(value), (rawValue, options) => {
    value.setRawValue(rawValue, options);
  }];
}
class ValueMap {
  constructor(valueMap) {
    this.emitter = new Emitter();
    this.valMap_ = valueMap;
    for (const key in this.valMap_) {
      const v = this.valMap_[key];
      v.emitter.on('change', () => {
        this.emitter.emit('change', {
          key: key,
          sender: this
        });
      });
    }
  }
  static createCore(initialValue) {
    const keys = Object.keys(initialValue);
    return keys.reduce((o, key) => {
      return Object.assign(o, {
        [key]: createValue(initialValue[key])
      });
    }, {});
  }
  static fromObject(initialValue) {
    const core = this.createCore(initialValue);
    return new ValueMap(core);
  }
  get(key) {
    return this.valMap_[key].rawValue;
  }
  set(key, value) {
    this.valMap_[key].rawValue = value;
  }
  value(key) {
    return this.valMap_[key];
  }
}
class DefiniteRangeConstraint {
  constructor(config) {
    this.values = ValueMap.fromObject({
      max: config.max,
      min: config.min
    });
  }
  constrain(value) {
    const max = this.values.get('max');
    const min = this.values.get('min');
    return Math.min(Math.max(value, min), max);
  }
}
class RangeConstraint {
  constructor(config) {
    this.values = ValueMap.fromObject({
      max: config.max,
      min: config.min
    });
  }
  constrain(value) {
    const max = this.values.get('max');
    const min = this.values.get('min');
    let result = value;
    if (!isEmpty(min)) {
      result = Math.max(result, min);
    }
    if (!isEmpty(max)) {
      result = Math.min(result, max);
    }
    return result;
  }
}
class StepConstraint {
  constructor(step, origin = 0) {
    this.step = step;
    this.origin = origin;
  }
  constrain(value) {
    const o = this.origin % this.step;
    const r = Math.round((value - o) / this.step);
    return o + r * this.step;
  }
}
class NumberLiteralNode {
  constructor(text) {
    this.text = text;
  }
  evaluate() {
    return Number(this.text);
  }
  toString() {
    return this.text;
  }
}
const BINARY_OPERATION_MAP = {
  '**': (v1, v2) => Math.pow(v1, v2),
  '*': (v1, v2) => v1 * v2,
  '/': (v1, v2) => v1 / v2,
  '%': (v1, v2) => v1 % v2,
  '+': (v1, v2) => v1 + v2,
  '-': (v1, v2) => v1 - v2,
  '<<': (v1, v2) => v1 << v2,
  '>>': (v1, v2) => v1 >> v2,
  '>>>': (v1, v2) => v1 >>> v2,
  '&': (v1, v2) => v1 & v2,
  '^': (v1, v2) => v1 ^ v2,
  '|': (v1, v2) => v1 | v2
};
class BinaryOperationNode {
  constructor(operator, left, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
  evaluate() {
    const op = BINARY_OPERATION_MAP[this.operator];
    if (!op) {
      throw new Error(`unexpected binary operator: '${this.operator}`);
    }
    return op(this.left.evaluate(), this.right.evaluate());
  }
  toString() {
    return ['b(', this.left.toString(), this.operator, this.right.toString(), ')'].join(' ');
  }
}
const UNARY_OPERATION_MAP = {
  '+': v => v,
  '-': v => -v,
  '~': v => ~v
};
class UnaryOperationNode {
  constructor(operator, expr) {
    this.operator = operator;
    this.expression = expr;
  }
  evaluate() {
    const op = UNARY_OPERATION_MAP[this.operator];
    if (!op) {
      throw new Error(`unexpected unary operator: '${this.operator}`);
    }
    return op(this.expression.evaluate());
  }
  toString() {
    return ['u(', this.operator, this.expression.toString(), ')'].join(' ');
  }
}
function combineReader(parsers) {
  return (text, cursor) => {
    for (let i = 0; i < parsers.length; i++) {
      const result = parsers[i](text, cursor);
      if (result !== '') {
        return result;
      }
    }
    return '';
  };
}
function readWhitespace(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^\s+/);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
}
function readNonZeroDigit(text, cursor) {
  const ch = text.substr(cursor, 1);
  return ch.match(/^[1-9]$/) ? ch : '';
}
function readDecimalDigits(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^[0-9]+/);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
}
function readSignedInteger(text, cursor) {
  const ds = readDecimalDigits(text, cursor);
  if (ds !== '') {
    return ds;
  }
  const sign = text.substr(cursor, 1);
  cursor += 1;
  if (sign !== '-' && sign !== '+') {
    return '';
  }
  const sds = readDecimalDigits(text, cursor);
  if (sds === '') {
    return '';
  }
  return sign + sds;
}
function readExponentPart(text, cursor) {
  const e = text.substr(cursor, 1);
  cursor += 1;
  if (e.toLowerCase() !== 'e') {
    return '';
  }
  const si = readSignedInteger(text, cursor);
  if (si === '') {
    return '';
  }
  return e + si;
}
function readDecimalIntegerLiteral(text, cursor) {
  const ch = text.substr(cursor, 1);
  if (ch === '0') {
    return ch;
  }
  const nzd = readNonZeroDigit(text, cursor);
  cursor += nzd.length;
  if (nzd === '') {
    return '';
  }
  return nzd + readDecimalDigits(text, cursor);
}
function readDecimalLiteral1(text, cursor) {
  const dil = readDecimalIntegerLiteral(text, cursor);
  cursor += dil.length;
  if (dil === '') {
    return '';
  }
  const dot = text.substr(cursor, 1);
  cursor += dot.length;
  if (dot !== '.') {
    return '';
  }
  const dds = readDecimalDigits(text, cursor);
  cursor += dds.length;
  return dil + dot + dds + readExponentPart(text, cursor);
}
function readDecimalLiteral2(text, cursor) {
  const dot = text.substr(cursor, 1);
  cursor += dot.length;
  if (dot !== '.') {
    return '';
  }
  const dds = readDecimalDigits(text, cursor);
  cursor += dds.length;
  if (dds === '') {
    return '';
  }
  return dot + dds + readExponentPart(text, cursor);
}
function readDecimalLiteral3(text, cursor) {
  const dil = readDecimalIntegerLiteral(text, cursor);
  cursor += dil.length;
  if (dil === '') {
    return '';
  }
  return dil + readExponentPart(text, cursor);
}
const readDecimalLiteral = combineReader([readDecimalLiteral1, readDecimalLiteral2, readDecimalLiteral3]);
function parseBinaryDigits(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^[01]+/);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
}
function readBinaryIntegerLiteral(text, cursor) {
  const prefix = text.substr(cursor, 2);
  cursor += prefix.length;
  if (prefix.toLowerCase() !== '0b') {
    return '';
  }
  const bds = parseBinaryDigits(text, cursor);
  if (bds === '') {
    return '';
  }
  return prefix + bds;
}
function readOctalDigits(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^[0-7]+/);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
}
function readOctalIntegerLiteral(text, cursor) {
  const prefix = text.substr(cursor, 2);
  cursor += prefix.length;
  if (prefix.toLowerCase() !== '0o') {
    return '';
  }
  const ods = readOctalDigits(text, cursor);
  if (ods === '') {
    return '';
  }
  return prefix + ods;
}
function readHexDigits(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^[0-9a-f]+/i);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
}
function readHexIntegerLiteral(text, cursor) {
  const prefix = text.substr(cursor, 2);
  cursor += prefix.length;
  if (prefix.toLowerCase() !== '0x') {
    return '';
  }
  const hds = readHexDigits(text, cursor);
  if (hds === '') {
    return '';
  }
  return prefix + hds;
}
const readNonDecimalIntegerLiteral = combineReader([readBinaryIntegerLiteral, readOctalIntegerLiteral, readHexIntegerLiteral]);
const readNumericLiteral = combineReader([readNonDecimalIntegerLiteral, readDecimalLiteral]);
function parseLiteral(text, cursor) {
  const num = readNumericLiteral(text, cursor);
  cursor += num.length;
  if (num === '') {
    return null;
  }
  return {
    evaluable: new NumberLiteralNode(num),
    cursor: cursor
  };
}
function parseParenthesizedExpression(text, cursor) {
  const op = text.substr(cursor, 1);
  cursor += op.length;
  if (op !== '(') {
    return null;
  }
  const expr = parseExpression(text, cursor);
  if (!expr) {
    return null;
  }
  cursor = expr.cursor;
  cursor += readWhitespace(text, cursor).length;
  const cl = text.substr(cursor, 1);
  cursor += cl.length;
  if (cl !== ')') {
    return null;
  }
  return {
    evaluable: expr.evaluable,
    cursor: cursor
  };
}
function parsePrimaryExpression(text, cursor) {
  var _a;
  return (_a = parseLiteral(text, cursor)) !== null && _a !== void 0 ? _a : parseParenthesizedExpression(text, cursor);
}
function parseUnaryExpression(text, cursor) {
  const expr = parsePrimaryExpression(text, cursor);
  if (expr) {
    return expr;
  }
  const op = text.substr(cursor, 1);
  cursor += op.length;
  if (op !== '+' && op !== '-' && op !== '~') {
    return null;
  }
  const num = parseUnaryExpression(text, cursor);
  if (!num) {
    return null;
  }
  cursor = num.cursor;
  return {
    cursor: cursor,
    evaluable: new UnaryOperationNode(op, num.evaluable)
  };
}
function readBinaryOperator(ops, text, cursor) {
  cursor += readWhitespace(text, cursor).length;
  const op = ops.filter(op => text.startsWith(op, cursor))[0];
  if (!op) {
    return null;
  }
  cursor += op.length;
  cursor += readWhitespace(text, cursor).length;
  return {
    cursor: cursor,
    operator: op
  };
}
function createBinaryOperationExpressionParser(exprParser, ops) {
  return (text, cursor) => {
    const firstExpr = exprParser(text, cursor);
    if (!firstExpr) {
      return null;
    }
    cursor = firstExpr.cursor;
    let expr = firstExpr.evaluable;
    for (;;) {
      const op = readBinaryOperator(ops, text, cursor);
      if (!op) {
        break;
      }
      cursor = op.cursor;
      const nextExpr = exprParser(text, cursor);
      if (!nextExpr) {
        return null;
      }
      cursor = nextExpr.cursor;
      expr = new BinaryOperationNode(op.operator, expr, nextExpr.evaluable);
    }
    return expr ? {
      cursor: cursor,
      evaluable: expr
    } : null;
  };
}
const parseBinaryOperationExpression = [['**'], ['*', '/', '%'], ['+', '-'], ['<<', '>>>', '>>'], ['&'], ['^'], ['|']].reduce((parser, ops) => {
  return createBinaryOperationExpressionParser(parser, ops);
}, parseUnaryExpression);
function parseExpression(text, cursor) {
  cursor += readWhitespace(text, cursor).length;
  return parseBinaryOperationExpression(text, cursor);
}
function parseEcmaNumberExpression(text) {
  const expr = parseExpression(text, 0);
  if (!expr) {
    return null;
  }
  const cursor = expr.cursor + readWhitespace(text, expr.cursor).length;
  if (cursor !== text.length) {
    return null;
  }
  return expr.evaluable;
}
function parseNumber(text) {
  var _a;
  const r = parseEcmaNumberExpression(text);
  return (_a = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a !== void 0 ? _a : null;
}
function numberFromUnknown(value) {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const pv = parseNumber(value);
    if (!isEmpty(pv)) {
      return pv;
    }
  }
  return 0;
}
function numberToString(value) {
  return String(value);
}
function createNumberFormatter(digits) {
  return value => {
    return value.toFixed(Math.max(Math.min(digits, 20), 0));
  };
}
function mapRange(value, start1, end1, start2, end2) {
  const p = (value - start1) / (end1 - start1);
  return start2 + p * (end2 - start2);
}
function getDecimalDigits(value) {
  const text = String(value.toFixed(10));
  const frac = text.split('.')[1];
  return frac.replace(/0+$/, '').length;
}
function constrainRange(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function loopRange(value, max) {
  return (value % max + max) % max;
}
function getSuitableDecimalDigits(params, rawValue) {
  return !isEmpty(params.step) ? getDecimalDigits(params.step) : Math.max(getDecimalDigits(rawValue), 2);
}
function getSuitableKeyScale(params) {
  var _a;
  return (_a = params.step) !== null && _a !== void 0 ? _a : 1;
}
function getSuitablePointerScale(params, rawValue) {
  var _a;
  const base = Math.abs((_a = params.step) !== null && _a !== void 0 ? _a : rawValue);
  return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
}
function createStepConstraint(params, initialValue) {
  if (!isEmpty(params.step)) {
    return new StepConstraint(params.step, initialValue);
  }
  return null;
}
function createRangeConstraint(params) {
  if (!isEmpty(params.max) && !isEmpty(params.min)) {
    return new DefiniteRangeConstraint({
      max: params.max,
      min: params.min
    });
  }
  if (!isEmpty(params.max) || !isEmpty(params.min)) {
    return new RangeConstraint({
      max: params.max,
      min: params.min
    });
  }
  return null;
}
function createNumberTextPropsObject(params, initialValue) {
  var _a, _b, _c;
  return {
    formatter: (_a = params.format) !== null && _a !== void 0 ? _a : createNumberFormatter(getSuitableDecimalDigits(params, initialValue)),
    keyScale: (_b = params.keyScale) !== null && _b !== void 0 ? _b : getSuitableKeyScale(params),
    pointerScale: (_c = params.pointerScale) !== null && _c !== void 0 ? _c : getSuitablePointerScale(params, initialValue)
  };
}
function createNumberTextInputParamsParser(p) {
  return {
    format: p.optional.function,
    keyScale: p.optional.number,
    max: p.optional.number,
    min: p.optional.number,
    pointerScale: p.optional.number,
    step: p.optional.number
  };
}
function createPointAxis(config) {
  return {
    constraint: config.constraint,
    textProps: ValueMap.fromObject(createNumberTextPropsObject(config.params, config.initialValue))
  };
}
class BladeApi {
  constructor(controller) {
    this.controller = controller;
  }
  get element() {
    return this.controller.view.element;
  }
  get disabled() {
    return this.controller.viewProps.get('disabled');
  }
  set disabled(disabled) {
    this.controller.viewProps.set('disabled', disabled);
  }
  get hidden() {
    return this.controller.viewProps.get('hidden');
  }
  set hidden(hidden) {
    this.controller.viewProps.set('hidden', hidden);
  }
  dispose() {
    this.controller.viewProps.set('disposed', true);
  }
  importState(state) {
    return this.controller.importState(state);
  }
  exportState() {
    return this.controller.exportState();
  }
}
exports.BladeApi = BladeApi;
class TpEvent {
  constructor(target) {
    this.target = target;
  }
}
class TpChangeEvent extends TpEvent {
  constructor(target, value, last) {
    super(target);
    this.value = value;
    this.last = last !== null && last !== void 0 ? last : true;
  }
}
exports.TpChangeEvent = TpChangeEvent;
class TpFoldEvent extends TpEvent {
  constructor(target, expanded) {
    super(target);
    this.expanded = expanded;
  }
}
class TpTabSelectEvent extends TpEvent {
  constructor(target, index) {
    super(target);
    this.index = index;
  }
}
class TpMouseEvent extends TpEvent {
  constructor(target, nativeEvent) {
    super(target);
    this.native = nativeEvent;
  }
}
class BindingApi extends BladeApi {
  constructor(controller) {
    super(controller);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.emitter_ = new Emitter();
    this.controller.value.emitter.on('change', this.onValueChange_);
  }
  get label() {
    return this.controller.labelController.props.get('label');
  }
  set label(label) {
    this.controller.labelController.props.set('label', label);
  }
  get key() {
    return this.controller.value.binding.target.key;
  }
  get tag() {
    return this.controller.tag;
  }
  set tag(tag) {
    this.controller.tag = tag;
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, ev => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
  refresh() {
    this.controller.value.fetch();
  }
  onValueChange_(ev) {
    const value = this.controller.value;
    this.emitter_.emit('change', new TpChangeEvent(this, forceCast(value.binding.target.read()), ev.options.last));
  }
}
class InputBindingValue {
  constructor(value, binding) {
    this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.binding = binding;
    this.value_ = value;
    this.value_.emitter.on('beforechange', this.onValueBeforeChange_);
    this.value_.emitter.on('change', this.onValueChange_);
    this.emitter = new Emitter();
  }
  get rawValue() {
    return this.value_.rawValue;
  }
  set rawValue(rawValue) {
    this.value_.rawValue = rawValue;
  }
  setRawValue(rawValue, options) {
    this.value_.setRawValue(rawValue, options);
  }
  fetch() {
    this.value_.rawValue = this.binding.read();
  }
  push() {
    this.binding.write(this.value_.rawValue);
  }
  onValueBeforeChange_(ev) {
    this.emitter.emit('beforechange', Object.assign(Object.assign({}, ev), {
      sender: this
    }));
  }
  onValueChange_(ev) {
    this.push();
    this.emitter.emit('change', Object.assign(Object.assign({}, ev), {
      sender: this
    }));
  }
}
function isInputBindingValue(v) {
  if (!('binding' in v)) {
    return false;
  }
  const b = v['binding'];
  return isBinding(b) && 'read' in b && 'write' in b;
}
function parseObject(value, keyToParserMap) {
  const keys = Object.keys(keyToParserMap);
  const result = keys.reduce((tmp, key) => {
    if (tmp === undefined) {
      return undefined;
    }
    const parser = keyToParserMap[key];
    const result = parser(value[key]);
    return result.succeeded ? Object.assign(Object.assign({}, tmp), {
      [key]: result.value
    }) : undefined;
  }, {});
  return forceCast(result);
}
function parseArray(value, parseItem) {
  return value.reduce((tmp, item) => {
    if (tmp === undefined) {
      return undefined;
    }
    const result = parseItem(item);
    if (!result.succeeded || result.value === undefined) {
      return undefined;
    }
    return [...tmp, result.value];
  }, []);
}
function isObject(value) {
  if (value === null) {
    return false;
  }
  return typeof value === 'object';
}
function createMicroParserBuilder(parse) {
  return optional => v => {
    if (!optional && v === undefined) {
      return {
        succeeded: false,
        value: undefined
      };
    }
    if (optional && v === undefined) {
      return {
        succeeded: true,
        value: undefined
      };
    }
    const result = parse(v);
    return result !== undefined ? {
      succeeded: true,
      value: result
    } : {
      succeeded: false,
      value: undefined
    };
  };
}
function createMicroParserBuilders(optional) {
  return {
    custom: parse => createMicroParserBuilder(parse)(optional),
    boolean: createMicroParserBuilder(v => typeof v === 'boolean' ? v : undefined)(optional),
    number: createMicroParserBuilder(v => typeof v === 'number' ? v : undefined)(optional),
    string: createMicroParserBuilder(v => typeof v === 'string' ? v : undefined)(optional),
    function: createMicroParserBuilder(v => typeof v === 'function' ? v : undefined)(optional),
    constant: value => createMicroParserBuilder(v => v === value ? value : undefined)(optional),
    raw: createMicroParserBuilder(v => v)(optional),
    object: keyToParserMap => createMicroParserBuilder(v => {
      if (!isObject(v)) {
        return undefined;
      }
      return parseObject(v, keyToParserMap);
    })(optional),
    array: itemParser => createMicroParserBuilder(v => {
      if (!Array.isArray(v)) {
        return undefined;
      }
      return parseArray(v, itemParser);
    })(optional)
  };
}
const MicroParsers = {
  optional: createMicroParserBuilders(true),
  required: createMicroParserBuilders(false)
};
function parseRecord(value, keyToParserMap) {
  const map = keyToParserMap(MicroParsers);
  const result = MicroParsers.required.object(map)(value);
  return result.succeeded ? result.value : undefined;
}
function importBladeState(state, superImport, parser, callback) {
  if (superImport && !superImport(state)) {
    return false;
  }
  const result = parseRecord(state, parser);
  return result ? callback(result) : false;
}
function exportBladeState(superExport, thisState) {
  var _a;
  return deepMerge((_a = superExport === null || superExport === void 0 ? void 0 : superExport()) !== null && _a !== void 0 ? _a : {}, thisState);
}
function isValueBladeController(bc) {
  return 'value' in bc;
}
function isBindingValue(v) {
  if (!isObject$1(v) || !('binding' in v)) {
    return false;
  }
  const b = v.binding;
  return isBinding(b);
}
const SVG_NS = 'http://www.w3.org/2000/svg';
function forceReflow(element) {
  element.offsetHeight;
}
function disableTransitionTemporarily(element, callback) {
  const t = element.style.transition;
  element.style.transition = 'none';
  callback();
  element.style.transition = t;
}
function supportsTouch(doc) {
  return doc.ontouchstart !== undefined;
}
function getGlobalObject() {
  return globalThis;
}
function getWindowDocument() {
  const globalObj = forceCast(getGlobalObject());
  return globalObj.document;
}
function getCanvasContext(canvasElement) {
  const win = canvasElement.ownerDocument.defaultView;
  if (!win) {
    return null;
  }
  const isBrowser = 'document' in win;
  return isBrowser ? canvasElement.getContext('2d', {
    willReadFrequently: true
  }) : null;
}
const ICON_ID_TO_INNER_HTML_MAP = {
  check: '<path d="M2 8l4 4l8 -8"/>',
  dropdown: '<path d="M5 7h6l-3 3 z"/>',
  p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
};
function createSvgIconElement(document, iconId) {
  const elem = document.createElementNS(SVG_NS, 'svg');
  elem.innerHTML = ICON_ID_TO_INNER_HTML_MAP[iconId];
  return elem;
}
function insertElementAt(parentElement, element, index) {
  parentElement.insertBefore(element, parentElement.children[index]);
}
function removeElement(element) {
  if (element.parentElement) {
    element.parentElement.removeChild(element);
  }
}
function removeChildElements(element) {
  while (element.children.length > 0) {
    element.removeChild(element.children[0]);
  }
}
function removeChildNodes(element) {
  while (element.childNodes.length > 0) {
    element.removeChild(element.childNodes[0]);
  }
}
function findNextTarget(ev) {
  if (ev.relatedTarget) {
    return forceCast(ev.relatedTarget);
  }
  if ('explicitOriginalTarget' in ev) {
    return ev.explicitOriginalTarget;
  }
  return null;
}
function bindValue(value, applyValue) {
  value.emitter.on('change', ev => {
    applyValue(ev.rawValue);
  });
  applyValue(value.rawValue);
}
function bindValueMap(valueMap, key, applyValue) {
  bindValue(valueMap.value(key), applyValue);
}
const PREFIX = 'tp';
function ClassName(viewName) {
  const fn = (opt_elementName, opt_modifier) => {
    return [PREFIX, '-', viewName, 'v', opt_elementName ? `_${opt_elementName}` : '', opt_modifier ? `-${opt_modifier}` : ''].join('');
  };
  return fn;
}
const cn$r = ClassName('lbl');
function createLabelNode(doc, label) {
  const frag = doc.createDocumentFragment();
  const lineNodes = label.split('\n').map(line => {
    return doc.createTextNode(line);
  });
  lineNodes.forEach((lineNode, index) => {
    if (index > 0) {
      frag.appendChild(doc.createElement('br'));
    }
    frag.appendChild(lineNode);
  });
  return frag;
}
class LabelView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$r());
    config.viewProps.bindClassModifiers(this.element);
    const labelElem = doc.createElement('div');
    labelElem.classList.add(cn$r('l'));
    bindValueMap(config.props, 'label', value => {
      if (isEmpty(value)) {
        this.element.classList.add(cn$r(undefined, 'nol'));
      } else {
        this.element.classList.remove(cn$r(undefined, 'nol'));
        removeChildNodes(labelElem);
        labelElem.appendChild(createLabelNode(doc, value));
      }
    });
    this.element.appendChild(labelElem);
    this.labelElement = labelElem;
    const valueElem = doc.createElement('div');
    valueElem.classList.add(cn$r('v'));
    this.element.appendChild(valueElem);
    this.valueElement = valueElem;
  }
}
class LabelController {
  constructor(doc, config) {
    this.props = config.props;
    this.valueController = config.valueController;
    this.viewProps = config.valueController.viewProps;
    this.view = new LabelView(doc, {
      props: config.props,
      viewProps: this.viewProps
    });
    this.view.valueElement.appendChild(this.valueController.view.element);
  }
  importProps(state) {
    return importBladeState(state, null, p => ({
      label: p.optional.string
    }), result => {
      this.props.set('label', result.label);
      return true;
    });
  }
  exportProps() {
    return exportBladeState(null, {
      label: this.props.get('label')
    });
  }
}
function getAllBladePositions() {
  return ['veryfirst', 'first', 'last', 'verylast'];
}
const cn$q = ClassName('');
const POS_TO_CLASS_NAME_MAP = {
  veryfirst: 'vfst',
  first: 'fst',
  last: 'lst',
  verylast: 'vlst'
};
class BladeController {
  constructor(config) {
    this.parent_ = null;
    this.blade = config.blade;
    this.view = config.view;
    this.viewProps = config.viewProps;
    const elem = this.view.element;
    this.blade.value('positions').emitter.on('change', () => {
      getAllBladePositions().forEach(pos => {
        elem.classList.remove(cn$q(undefined, POS_TO_CLASS_NAME_MAP[pos]));
      });
      this.blade.get('positions').forEach(pos => {
        elem.classList.add(cn$q(undefined, POS_TO_CLASS_NAME_MAP[pos]));
      });
    });
    this.viewProps.handleDispose(() => {
      removeElement(elem);
    });
  }
  get parent() {
    return this.parent_;
  }
  set parent(parent) {
    this.parent_ = parent;
    this.viewProps.set('parent', this.parent_ ? this.parent_.viewProps : null);
  }
  importState(state) {
    return importBladeState(state, null, p => ({
      disabled: p.required.boolean,
      hidden: p.required.boolean
    }), result => {
      this.viewProps.importState(result);
      return true;
    });
  }
  exportState() {
    return exportBladeState(null, Object.assign({}, this.viewProps.exportState()));
  }
}
class LabeledValueBladeController extends BladeController {
  constructor(doc, config) {
    if (config.value !== config.valueController.value) {
      throw TpError.shouldNeverHappen();
    }
    const viewProps = config.valueController.viewProps;
    const lc = new LabelController(doc, {
      blade: config.blade,
      props: config.props,
      valueController: config.valueController
    });
    super(Object.assign(Object.assign({}, config), {
      view: new LabelView(doc, {
        props: config.props,
        viewProps: viewProps
      }),
      viewProps: viewProps
    }));
    this.labelController = lc;
    this.value = config.value;
    this.valueController = config.valueController;
    this.view.valueElement.appendChild(this.valueController.view.element);
  }
  importState(state) {
    return importBladeState(state, s => {
      var _a, _b, _c;
      return super.importState(s) && this.labelController.importProps(s) && ((_c = (_b = (_a = this.valueController).importProps) === null || _b === void 0 ? void 0 : _b.call(_a, state)) !== null && _c !== void 0 ? _c : true);
    }, p => ({
      value: p.optional.raw
    }), result => {
      if (result.value) {
        this.value.rawValue = result.value;
      }
      return true;
    });
  }
  exportState() {
    var _a, _b, _c;
    return exportBladeState(() => super.exportState(), Object.assign(Object.assign({
      value: this.value.rawValue
    }, this.labelController.exportProps()), (_c = (_b = (_a = this.valueController).exportProps) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : {}));
  }
}
function excludeValue(state) {
  const result = Object.assign({}, state);
  delete result.value;
  return result;
}
class BindingController extends LabeledValueBladeController {
  constructor(doc, config) {
    super(doc, config);
    this.tag = config.tag;
  }
  importState(state) {
    return importBladeState(state, _s => super.importState(excludeValue(state)), p => ({
      tag: p.optional.string
    }), result => {
      this.tag = result.tag;
      return true;
    });
  }
  exportState() {
    return exportBladeState(() => excludeValue(super.exportState()), {
      binding: {
        key: this.value.binding.target.key,
        value: this.value.binding.target.read()
      },
      tag: this.tag
    });
  }
}
function isBindingController(bc) {
  return isValueBladeController(bc) && isBindingValue(bc.value);
}
class InputBindingController extends BindingController {
  importState(state) {
    return importBladeState(state, s => super.importState(s), p => ({
      binding: p.required.object({
        value: p.required.raw
      })
    }), result => {
      this.value.binding.inject(result.binding.value);
      this.value.fetch();
      return true;
    });
  }
}
function isInputBindingController(bc) {
  return isValueBladeController(bc) && isInputBindingValue(bc.value);
}
function fillBuffer(buffer, bufferSize) {
  while (buffer.length < bufferSize) {
    buffer.push(undefined);
  }
}
function initializeBuffer(bufferSize) {
  const buffer = [];
  fillBuffer(buffer, bufferSize);
  return buffer;
}
function createTrimmedBuffer(buffer) {
  const index = buffer.indexOf(undefined);
  return forceCast(index < 0 ? buffer : buffer.slice(0, index));
}
function createPushedBuffer(buffer, newValue) {
  const newBuffer = [...createTrimmedBuffer(buffer), newValue];
  if (newBuffer.length > buffer.length) {
    newBuffer.splice(0, newBuffer.length - buffer.length);
  } else {
    fillBuffer(newBuffer, buffer.length);
  }
  return newBuffer;
}
class MonitorBindingValue {
  constructor(config) {
    this.emitter = new Emitter();
    this.onTick_ = this.onTick_.bind(this);
    this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.binding = config.binding;
    this.value_ = createValue(initializeBuffer(config.bufferSize));
    this.value_.emitter.on('beforechange', this.onValueBeforeChange_);
    this.value_.emitter.on('change', this.onValueChange_);
    this.ticker = config.ticker;
    this.ticker.emitter.on('tick', this.onTick_);
    this.fetch();
  }
  get rawValue() {
    return this.value_.rawValue;
  }
  set rawValue(rawValue) {
    this.value_.rawValue = rawValue;
  }
  setRawValue(rawValue, options) {
    this.value_.setRawValue(rawValue, options);
  }
  fetch() {
    this.value_.rawValue = createPushedBuffer(this.value_.rawValue, this.binding.read());
  }
  onTick_() {
    this.fetch();
  }
  onValueBeforeChange_(ev) {
    this.emitter.emit('beforechange', Object.assign(Object.assign({}, ev), {
      sender: this
    }));
  }
  onValueChange_(ev) {
    this.emitter.emit('change', Object.assign(Object.assign({}, ev), {
      sender: this
    }));
  }
}
function isMonitorBindingValue(v) {
  if (!('binding' in v)) {
    return false;
  }
  const b = v['binding'];
  return isBinding(b) && 'read' in b && !('write' in b);
}
class MonitorBindingController extends BindingController {
  exportState() {
    return exportBladeState(() => super.exportState(), {
      binding: {
        readonly: true
      }
    });
  }
}
function isMonitorBindingController(bc) {
  return isValueBladeController(bc) && isMonitorBindingValue(bc.value);
}
class ButtonApi extends BladeApi {
  get label() {
    return this.controller.labelController.props.get('label');
  }
  set label(label) {
    this.controller.labelController.props.set('label', label);
  }
  get title() {
    var _a;
    return (_a = this.controller.buttonController.props.get('title')) !== null && _a !== void 0 ? _a : '';
  }
  set title(title) {
    this.controller.buttonController.props.set('title', title);
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    const emitter = this.controller.buttonController.emitter;
    emitter.on(eventName, ev => {
      bh(new TpMouseEvent(this, ev.nativeEvent));
    });
    return this;
  }
  off(eventName, handler) {
    const emitter = this.controller.buttonController.emitter;
    emitter.off(eventName, handler);
    return this;
  }
}
exports.ButtonApi = ButtonApi;
function applyClass(elem, className, active) {
  if (active) {
    elem.classList.add(className);
  } else {
    elem.classList.remove(className);
  }
}
function valueToClassName(elem, className) {
  return value => {
    applyClass(elem, className, value);
  };
}
function bindValueToTextContent(value, elem) {
  bindValue(value, text => {
    elem.textContent = text !== null && text !== void 0 ? text : '';
  });
}
const cn$p = ClassName('btn');
class ButtonView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$p());
    config.viewProps.bindClassModifiers(this.element);
    const buttonElem = doc.createElement('button');
    buttonElem.classList.add(cn$p('b'));
    config.viewProps.bindDisabled(buttonElem);
    this.element.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    const titleElem = doc.createElement('div');
    titleElem.classList.add(cn$p('t'));
    bindValueToTextContent(config.props.value('title'), titleElem);
    this.buttonElement.appendChild(titleElem);
  }
}
class ButtonController {
  constructor(doc, config) {
    this.emitter = new Emitter();
    this.onClick_ = this.onClick_.bind(this);
    this.props = config.props;
    this.viewProps = config.viewProps;
    this.view = new ButtonView(doc, {
      props: this.props,
      viewProps: this.viewProps
    });
    this.view.buttonElement.addEventListener('click', this.onClick_);
  }
  importProps(state) {
    return importBladeState(state, null, p => ({
      title: p.optional.string
    }), result => {
      this.props.set('title', result.title);
      return true;
    });
  }
  exportProps() {
    return exportBladeState(null, {
      title: this.props.get('title')
    });
  }
  onClick_(ev) {
    this.emitter.emit('click', {
      nativeEvent: ev,
      sender: this
    });
  }
}
class ButtonBladeController extends BladeController {
  constructor(doc, config) {
    const bc = new ButtonController(doc, {
      props: config.buttonProps,
      viewProps: config.viewProps
    });
    const lc = new LabelController(doc, {
      blade: config.blade,
      props: config.labelProps,
      valueController: bc
    });
    super({
      blade: config.blade,
      view: lc.view,
      viewProps: config.viewProps
    });
    this.buttonController = bc;
    this.labelController = lc;
  }
  importState(state) {
    return importBladeState(state, s => super.importState(s) && this.buttonController.importProps(s) && this.labelController.importProps(s), () => ({}), () => true);
  }
  exportState() {
    return exportBladeState(() => super.exportState(), Object.assign(Object.assign({}, this.buttonController.exportProps()), this.labelController.exportProps()));
  }
}
class Semver {
  constructor(text) {
    const [core, prerelease] = text.split('-');
    const coreComps = core.split('.');
    this.major = parseInt(coreComps[0], 10);
    this.minor = parseInt(coreComps[1], 10);
    this.patch = parseInt(coreComps[2], 10);
    this.prerelease = prerelease !== null && prerelease !== void 0 ? prerelease : null;
  }
  toString() {
    const core = [this.major, this.minor, this.patch].join('.');
    return this.prerelease !== null ? [core, this.prerelease].join('-') : core;
  }
}
exports.Semver = Semver;
const VERSION$1 = new Semver('2.0.4');
function createPlugin(plugin) {
  return Object.assign({
    core: VERSION$1
  }, plugin);
}
const ButtonBladePlugin = createPlugin({
  id: 'button',
  type: 'blade',
  accept(params) {
    const result = parseRecord(params, p => ({
      title: p.required.string,
      view: p.required.constant('button'),
      label: p.optional.string
    }));
    return result ? {
      params: result
    } : null;
  },
  controller(args) {
    return new ButtonBladeController(args.document, {
      blade: args.blade,
      buttonProps: ValueMap.fromObject({
        title: args.params.title
      }),
      labelProps: ValueMap.fromObject({
        label: args.params.label
      }),
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (args.controller instanceof ButtonBladeController) {
      return new ButtonApi(args.controller);
    }
    return null;
  }
});
function addButtonAsBlade(api, params) {
  return api.addBlade(Object.assign(Object.assign({}, params), {
    view: 'button'
  }));
}
function addFolderAsBlade(api, params) {
  return api.addBlade(Object.assign(Object.assign({}, params), {
    view: 'folder'
  }));
}
function addTabAsBlade(api, params) {
  return api.addBlade(Object.assign(Object.assign({}, params), {
    view: 'tab'
  }));
}
function isRefreshable(value) {
  if (!isObject$1(value)) {
    return false;
  }
  return 'refresh' in value && typeof value.refresh === 'function';
}
function createBindingTarget(obj, key) {
  if (!BindingTarget.isBindable(obj)) {
    throw TpError.notBindable();
  }
  return new BindingTarget(obj, key);
}
class RackApi {
  constructor(controller, pool) {
    this.onRackValueChange_ = this.onRackValueChange_.bind(this);
    this.controller_ = controller;
    this.emitter_ = new Emitter();
    this.pool_ = pool;
    const rack = this.controller_.rack;
    rack.emitter.on('valuechange', this.onRackValueChange_);
  }
  get children() {
    return this.controller_.rack.children.map(bc => this.pool_.createApi(bc));
  }
  addBinding(object, key, opt_params) {
    const params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
    const doc = this.controller_.element.ownerDocument;
    const bc = this.pool_.createBinding(doc, createBindingTarget(object, key), params);
    const api = this.pool_.createBindingApi(bc);
    return this.add(api, params.index);
  }
  addFolder(params) {
    return addFolderAsBlade(this, params);
  }
  addButton(params) {
    return addButtonAsBlade(this, params);
  }
  addTab(params) {
    return addTabAsBlade(this, params);
  }
  add(api, opt_index) {
    const bc = api.controller;
    this.controller_.rack.add(bc, opt_index);
    return api;
  }
  remove(api) {
    this.controller_.rack.remove(api.controller);
  }
  addBlade(params) {
    const doc = this.controller_.element.ownerDocument;
    const bc = this.pool_.createBlade(doc, params);
    const api = this.pool_.createApi(bc);
    return this.add(api, params.index);
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, ev => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
  refresh() {
    this.children.forEach(c => {
      if (isRefreshable(c)) {
        c.refresh();
      }
    });
  }
  onRackValueChange_(ev) {
    const bc = ev.bladeController;
    const api = this.pool_.createApi(bc);
    const binding = isBindingValue(bc.value) ? bc.value.binding : null;
    this.emitter_.emit('change', new TpChangeEvent(api, binding ? binding.target.read() : bc.value.rawValue, ev.options.last));
  }
}
class ContainerBladeApi extends BladeApi {
  constructor(controller, pool) {
    super(controller);
    this.rackApi_ = new RackApi(controller.rackController, pool);
  }
  refresh() {
    this.rackApi_.refresh();
  }
}
class ContainerBladeController extends BladeController {
  constructor(config) {
    super({
      blade: config.blade,
      view: config.view,
      viewProps: config.rackController.viewProps
    });
    this.rackController = config.rackController;
  }
  importState(state) {
    return importBladeState(state, s => super.importState(s), p => ({
      children: p.required.array(p.required.raw)
    }), result => {
      return this.rackController.rack.children.every((c, index) => {
        return c.importState(result.children[index]);
      });
    });
  }
  exportState() {
    return exportBladeState(() => super.exportState(), {
      children: this.rackController.rack.children.map(c => c.exportState())
    });
  }
}
function isContainerBladeController(bc) {
  return 'rackController' in bc;
}
class NestedOrderedSet {
  constructor(extract) {
    this.emitter = new Emitter();
    this.items_ = [];
    this.cache_ = new Set();
    this.onSubListAdd_ = this.onSubListAdd_.bind(this);
    this.onSubListRemove_ = this.onSubListRemove_.bind(this);
    this.extract_ = extract;
  }
  get items() {
    return this.items_;
  }
  allItems() {
    return Array.from(this.cache_);
  }
  find(callback) {
    for (const item of this.allItems()) {
      if (callback(item)) {
        return item;
      }
    }
    return null;
  }
  includes(item) {
    return this.cache_.has(item);
  }
  add(item, opt_index) {
    if (this.includes(item)) {
      throw TpError.shouldNeverHappen();
    }
    const index = opt_index !== undefined ? opt_index : this.items_.length;
    this.items_.splice(index, 0, item);
    this.cache_.add(item);
    const subList = this.extract_(item);
    if (subList) {
      subList.emitter.on('add', this.onSubListAdd_);
      subList.emitter.on('remove', this.onSubListRemove_);
      subList.allItems().forEach(i => {
        this.cache_.add(i);
      });
    }
    this.emitter.emit('add', {
      index: index,
      item: item,
      root: this,
      target: this
    });
  }
  remove(item) {
    const index = this.items_.indexOf(item);
    if (index < 0) {
      return;
    }
    this.items_.splice(index, 1);
    this.cache_.delete(item);
    const subList = this.extract_(item);
    if (subList) {
      subList.allItems().forEach(i => {
        this.cache_.delete(i);
      });
      subList.emitter.off('add', this.onSubListAdd_);
      subList.emitter.off('remove', this.onSubListRemove_);
    }
    this.emitter.emit('remove', {
      index: index,
      item: item,
      root: this,
      target: this
    });
  }
  onSubListAdd_(ev) {
    this.cache_.add(ev.item);
    this.emitter.emit('add', {
      index: ev.index,
      item: ev.item,
      root: this,
      target: ev.target
    });
  }
  onSubListRemove_(ev) {
    this.cache_.delete(ev.item);
    this.emitter.emit('remove', {
      index: ev.index,
      item: ev.item,
      root: this,
      target: ev.target
    });
  }
}
function findValueBladeController(bcs, v) {
  for (let i = 0; i < bcs.length; i++) {
    const bc = bcs[i];
    if (isValueBladeController(bc) && bc.value === v) {
      return bc;
    }
  }
  return null;
}
function findSubBladeControllerSet(bc) {
  return isContainerBladeController(bc) ? bc.rackController.rack['bcSet_'] : null;
}
class Rack {
  constructor(config) {
    var _a, _b;
    this.emitter = new Emitter();
    this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this);
    this.onSetAdd_ = this.onSetAdd_.bind(this);
    this.onSetRemove_ = this.onSetRemove_.bind(this);
    this.onChildDispose_ = this.onChildDispose_.bind(this);
    this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this);
    this.onChildValueChange_ = this.onChildValueChange_.bind(this);
    this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
    this.onRackLayout_ = this.onRackLayout_.bind(this);
    this.onRackValueChange_ = this.onRackValueChange_.bind(this);
    this.blade_ = (_a = config.blade) !== null && _a !== void 0 ? _a : null;
    (_b = this.blade_) === null || _b === void 0 ? void 0 : _b.value('positions').emitter.on('change', this.onBladePositionsChange_);
    this.viewProps = config.viewProps;
    this.bcSet_ = new NestedOrderedSet(findSubBladeControllerSet);
    this.bcSet_.emitter.on('add', this.onSetAdd_);
    this.bcSet_.emitter.on('remove', this.onSetRemove_);
  }
  get children() {
    return this.bcSet_.items;
  }
  add(bc, opt_index) {
    var _a;
    (_a = bc.parent) === null || _a === void 0 ? void 0 : _a.remove(bc);
    bc.parent = this;
    this.bcSet_.add(bc, opt_index);
  }
  remove(bc) {
    bc.parent = null;
    this.bcSet_.remove(bc);
  }
  find(finder) {
    return this.bcSet_.allItems().filter(finder);
  }
  onSetAdd_(ev) {
    this.updatePositions_();
    const root = ev.target === ev.root;
    this.emitter.emit('add', {
      bladeController: ev.item,
      index: ev.index,
      root: root,
      sender: this
    });
    if (!root) {
      return;
    }
    const bc = ev.item;
    bc.viewProps.emitter.on('change', this.onChildViewPropsChange_);
    bc.blade.value('positions').emitter.on('change', this.onChildPositionsChange_);
    bc.viewProps.handleDispose(this.onChildDispose_);
    if (isValueBladeController(bc)) {
      bc.value.emitter.on('change', this.onChildValueChange_);
    } else if (isContainerBladeController(bc)) {
      const rack = bc.rackController.rack;
      if (rack) {
        const emitter = rack.emitter;
        emitter.on('layout', this.onRackLayout_);
        emitter.on('valuechange', this.onRackValueChange_);
      }
    }
  }
  onSetRemove_(ev) {
    this.updatePositions_();
    const root = ev.target === ev.root;
    this.emitter.emit('remove', {
      bladeController: ev.item,
      root: root,
      sender: this
    });
    if (!root) {
      return;
    }
    const bc = ev.item;
    if (isValueBladeController(bc)) {
      bc.value.emitter.off('change', this.onChildValueChange_);
    } else if (isContainerBladeController(bc)) {
      const rack = bc.rackController.rack;
      if (rack) {
        const emitter = rack.emitter;
        emitter.off('layout', this.onRackLayout_);
        emitter.off('valuechange', this.onRackValueChange_);
      }
    }
  }
  updatePositions_() {
    const visibleItems = this.bcSet_.items.filter(bc => !bc.viewProps.get('hidden'));
    const firstVisibleItem = visibleItems[0];
    const lastVisibleItem = visibleItems[visibleItems.length - 1];
    this.bcSet_.items.forEach(bc => {
      const ps = [];
      if (bc === firstVisibleItem) {
        ps.push('first');
        if (!this.blade_ || this.blade_.get('positions').includes('veryfirst')) {
          ps.push('veryfirst');
        }
      }
      if (bc === lastVisibleItem) {
        ps.push('last');
        if (!this.blade_ || this.blade_.get('positions').includes('verylast')) {
          ps.push('verylast');
        }
      }
      bc.blade.set('positions', ps);
    });
  }
  onChildPositionsChange_() {
    this.updatePositions_();
    this.emitter.emit('layout', {
      sender: this
    });
  }
  onChildViewPropsChange_(_ev) {
    this.updatePositions_();
    this.emitter.emit('layout', {
      sender: this
    });
  }
  onChildDispose_() {
    const disposedUcs = this.bcSet_.items.filter(bc => {
      return bc.viewProps.get('disposed');
    });
    disposedUcs.forEach(bc => {
      this.bcSet_.remove(bc);
    });
  }
  onChildValueChange_(ev) {
    const bc = findValueBladeController(this.find(isValueBladeController), ev.sender);
    if (!bc) {
      throw TpError.alreadyDisposed();
    }
    this.emitter.emit('valuechange', {
      bladeController: bc,
      options: ev.options,
      sender: this
    });
  }
  onRackLayout_(_) {
    this.updatePositions_();
    this.emitter.emit('layout', {
      sender: this
    });
  }
  onRackValueChange_(ev) {
    this.emitter.emit('valuechange', {
      bladeController: ev.bladeController,
      options: ev.options,
      sender: this
    });
  }
  onBladePositionsChange_() {
    this.updatePositions_();
  }
}
class RackController {
  constructor(config) {
    this.onRackAdd_ = this.onRackAdd_.bind(this);
    this.onRackRemove_ = this.onRackRemove_.bind(this);
    this.element = config.element;
    this.viewProps = config.viewProps;
    const rack = new Rack({
      blade: config.root ? undefined : config.blade,
      viewProps: config.viewProps
    });
    rack.emitter.on('add', this.onRackAdd_);
    rack.emitter.on('remove', this.onRackRemove_);
    this.rack = rack;
    this.viewProps.handleDispose(() => {
      for (let i = this.rack.children.length - 1; i >= 0; i--) {
        const bc = this.rack.children[i];
        bc.viewProps.set('disposed', true);
      }
    });
  }
  onRackAdd_(ev) {
    if (!ev.root) {
      return;
    }
    insertElementAt(this.element, ev.bladeController.view.element, ev.index);
  }
  onRackRemove_(ev) {
    if (!ev.root) {
      return;
    }
    removeElement(ev.bladeController.view.element);
  }
}
function createBlade() {
  return new ValueMap({
    positions: createValue([], {
      equals: deepEqualsArray
    })
  });
}
class Foldable extends ValueMap {
  constructor(valueMap) {
    super(valueMap);
  }
  static create(expanded) {
    const coreObj = {
      completed: true,
      expanded: expanded,
      expandedHeight: null,
      shouldFixHeight: false,
      temporaryExpanded: null
    };
    const core = ValueMap.createCore(coreObj);
    return new Foldable(core);
  }
  get styleExpanded() {
    var _a;
    return (_a = this.get('temporaryExpanded')) !== null && _a !== void 0 ? _a : this.get('expanded');
  }
  get styleHeight() {
    if (!this.styleExpanded) {
      return '0';
    }
    const exHeight = this.get('expandedHeight');
    if (this.get('shouldFixHeight') && !isEmpty(exHeight)) {
      return `${exHeight}px`;
    }
    return 'auto';
  }
  bindExpandedClass(elem, expandedClassName) {
    const onExpand = () => {
      const expanded = this.styleExpanded;
      if (expanded) {
        elem.classList.add(expandedClassName);
      } else {
        elem.classList.remove(expandedClassName);
      }
    };
    bindValueMap(this, 'expanded', onExpand);
    bindValueMap(this, 'temporaryExpanded', onExpand);
  }
  cleanUpTransition() {
    this.set('shouldFixHeight', false);
    this.set('expandedHeight', null);
    this.set('completed', true);
  }
}
function computeExpandedFolderHeight(folder, containerElement) {
  let height = 0;
  disableTransitionTemporarily(containerElement, () => {
    folder.set('expandedHeight', null);
    folder.set('temporaryExpanded', true);
    forceReflow(containerElement);
    height = containerElement.clientHeight;
    folder.set('temporaryExpanded', null);
    forceReflow(containerElement);
  });
  return height;
}
function applyHeight(foldable, elem) {
  elem.style.height = foldable.styleHeight;
}
function bindFoldable(foldable, elem) {
  foldable.value('expanded').emitter.on('beforechange', () => {
    foldable.set('completed', false);
    if (isEmpty(foldable.get('expandedHeight'))) {
      const h = computeExpandedFolderHeight(foldable, elem);
      if (h > 0) {
        foldable.set('expandedHeight', h);
      }
    }
    foldable.set('shouldFixHeight', true);
    forceReflow(elem);
  });
  foldable.emitter.on('change', () => {
    applyHeight(foldable, elem);
  });
  applyHeight(foldable, elem);
  elem.addEventListener('transitionend', ev => {
    if (ev.propertyName !== 'height') {
      return;
    }
    foldable.cleanUpTransition();
  });
}
class FolderApi extends ContainerBladeApi {
  constructor(controller, pool) {
    super(controller, pool);
    this.emitter_ = new Emitter();
    this.controller.foldable.value('expanded').emitter.on('change', ev => {
      this.emitter_.emit('fold', new TpFoldEvent(this, ev.sender.rawValue));
    });
    this.rackApi_.on('change', ev => {
      this.emitter_.emit('change', ev);
    });
  }
  get expanded() {
    return this.controller.foldable.get('expanded');
  }
  set expanded(expanded) {
    this.controller.foldable.set('expanded', expanded);
  }
  get title() {
    return this.controller.props.get('title');
  }
  set title(title) {
    this.controller.props.set('title', title);
  }
  get children() {
    return this.rackApi_.children;
  }
  addBinding(object, key, opt_params) {
    return this.rackApi_.addBinding(object, key, opt_params);
  }
  addFolder(params) {
    return this.rackApi_.addFolder(params);
  }
  addButton(params) {
    return this.rackApi_.addButton(params);
  }
  addTab(params) {
    return this.rackApi_.addTab(params);
  }
  add(api, opt_index) {
    return this.rackApi_.add(api, opt_index);
  }
  remove(api) {
    this.rackApi_.remove(api);
  }
  addBlade(params) {
    return this.rackApi_.addBlade(params);
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, ev => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
}
exports.FolderApi = FolderApi;
const bladeContainerClassName = ClassName('cnt');
class FolderView {
  constructor(doc, config) {
    var _a;
    this.className_ = ClassName((_a = config.viewName) !== null && _a !== void 0 ? _a : 'fld');
    this.element = doc.createElement('div');
    this.element.classList.add(this.className_(), bladeContainerClassName());
    config.viewProps.bindClassModifiers(this.element);
    this.foldable_ = config.foldable;
    this.foldable_.bindExpandedClass(this.element, this.className_(undefined, 'expanded'));
    bindValueMap(this.foldable_, 'completed', valueToClassName(this.element, this.className_(undefined, 'cpl')));
    const buttonElem = doc.createElement('button');
    buttonElem.classList.add(this.className_('b'));
    bindValueMap(config.props, 'title', title => {
      if (isEmpty(title)) {
        this.element.classList.add(this.className_(undefined, 'not'));
      } else {
        this.element.classList.remove(this.className_(undefined, 'not'));
      }
    });
    config.viewProps.bindDisabled(buttonElem);
    this.element.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    const indentElem = doc.createElement('div');
    indentElem.classList.add(this.className_('i'));
    this.element.appendChild(indentElem);
    const titleElem = doc.createElement('div');
    titleElem.classList.add(this.className_('t'));
    bindValueToTextContent(config.props.value('title'), titleElem);
    this.buttonElement.appendChild(titleElem);
    this.titleElement = titleElem;
    const markElem = doc.createElement('div');
    markElem.classList.add(this.className_('m'));
    this.buttonElement.appendChild(markElem);
    const containerElem = doc.createElement('div');
    containerElem.classList.add(this.className_('c'));
    this.element.appendChild(containerElem);
    this.containerElement = containerElem;
  }
}
class FolderController extends ContainerBladeController {
  constructor(doc, config) {
    var _a;
    const foldable = Foldable.create((_a = config.expanded) !== null && _a !== void 0 ? _a : true);
    const view = new FolderView(doc, {
      foldable: foldable,
      props: config.props,
      viewName: config.root ? 'rot' : undefined,
      viewProps: config.viewProps
    });
    super(Object.assign(Object.assign({}, config), {
      rackController: new RackController({
        blade: config.blade,
        element: view.containerElement,
        root: config.root,
        viewProps: config.viewProps
      }),
      view: view
    }));
    this.onTitleClick_ = this.onTitleClick_.bind(this);
    this.props = config.props;
    this.foldable = foldable;
    bindFoldable(this.foldable, this.view.containerElement);
    this.rackController.rack.emitter.on('add', () => {
      this.foldable.cleanUpTransition();
    });
    this.rackController.rack.emitter.on('remove', () => {
      this.foldable.cleanUpTransition();
    });
    this.view.buttonElement.addEventListener('click', this.onTitleClick_);
  }
  get document() {
    return this.view.element.ownerDocument;
  }
  importState(state) {
    return importBladeState(state, s => super.importState(s), p => ({
      expanded: p.required.boolean,
      title: p.optional.string
    }), result => {
      this.foldable.set('expanded', result.expanded);
      this.props.set('title', result.title);
      return true;
    });
  }
  exportState() {
    return exportBladeState(() => super.exportState(), {
      expanded: this.foldable.get('expanded'),
      title: this.props.get('title')
    });
  }
  onTitleClick_() {
    this.foldable.set('expanded', !this.foldable.get('expanded'));
  }
}
const FolderBladePlugin = createPlugin({
  id: 'folder',
  type: 'blade',
  accept(params) {
    const result = parseRecord(params, p => ({
      title: p.required.string,
      view: p.required.constant('folder'),
      expanded: p.optional.boolean
    }));
    return result ? {
      params: result
    } : null;
  },
  controller(args) {
    return new FolderController(args.document, {
      blade: args.blade,
      expanded: args.params.expanded,
      props: ValueMap.fromObject({
        title: args.params.title
      }),
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (!(args.controller instanceof FolderController)) {
      return null;
    }
    return new FolderApi(args.controller, args.pool);
  }
});
const cn$o = ClassName('');
function valueToModifier(elem, modifier) {
  return valueToClassName(elem, cn$o(undefined, modifier));
}
class ViewProps extends ValueMap {
  constructor(valueMap) {
    var _a;
    super(valueMap);
    this.onDisabledChange_ = this.onDisabledChange_.bind(this);
    this.onParentChange_ = this.onParentChange_.bind(this);
    this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this);
    [this.globalDisabled_, this.setGlobalDisabled_] = createReadonlyValue(createValue(this.getGlobalDisabled_()));
    this.value('disabled').emitter.on('change', this.onDisabledChange_);
    this.value('parent').emitter.on('change', this.onParentChange_);
    (_a = this.get('parent')) === null || _a === void 0 ? void 0 : _a.globalDisabled.emitter.on('change', this.onParentGlobalDisabledChange_);
  }
  static create(opt_initialValue) {
    var _a, _b, _c;
    const initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {};
    return new ViewProps(ValueMap.createCore({
      disabled: (_a = initialValue.disabled) !== null && _a !== void 0 ? _a : false,
      disposed: false,
      hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false,
      parent: (_c = initialValue.parent) !== null && _c !== void 0 ? _c : null
    }));
  }
  get globalDisabled() {
    return this.globalDisabled_;
  }
  bindClassModifiers(elem) {
    bindValue(this.globalDisabled_, valueToModifier(elem, 'disabled'));
    bindValueMap(this, 'hidden', valueToModifier(elem, 'hidden'));
  }
  bindDisabled(target) {
    bindValue(this.globalDisabled_, disabled => {
      target.disabled = disabled;
    });
  }
  bindTabIndex(elem) {
    bindValue(this.globalDisabled_, disabled => {
      elem.tabIndex = disabled ? -1 : 0;
    });
  }
  handleDispose(callback) {
    this.value('disposed').emitter.on('change', disposed => {
      if (disposed) {
        callback();
      }
    });
  }
  importState(state) {
    this.set('disabled', state.disabled);
    this.set('hidden', state.hidden);
  }
  exportState() {
    return {
      disabled: this.get('disabled'),
      hidden: this.get('hidden')
    };
  }
  getGlobalDisabled_() {
    const parent = this.get('parent');
    const parentDisabled = parent ? parent.globalDisabled.rawValue : false;
    return parentDisabled || this.get('disabled');
  }
  updateGlobalDisabled_() {
    this.setGlobalDisabled_(this.getGlobalDisabled_());
  }
  onDisabledChange_() {
    this.updateGlobalDisabled_();
  }
  onParentGlobalDisabledChange_() {
    this.updateGlobalDisabled_();
  }
  onParentChange_(ev) {
    var _a;
    const prevParent = ev.previousRawValue;
    prevParent === null || prevParent === void 0 ? void 0 : prevParent.globalDisabled.emitter.off('change', this.onParentGlobalDisabledChange_);
    (_a = this.get('parent')) === null || _a === void 0 ? void 0 : _a.globalDisabled.emitter.on('change', this.onParentGlobalDisabledChange_);
    this.updateGlobalDisabled_();
  }
}
const cn$n = ClassName('tbp');
class TabPageView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$n());
    config.viewProps.bindClassModifiers(this.element);
    const containerElem = doc.createElement('div');
    containerElem.classList.add(cn$n('c'));
    this.element.appendChild(containerElem);
    this.containerElement = containerElem;
  }
}
const cn$m = ClassName('tbi');
class TabItemView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$m());
    config.viewProps.bindClassModifiers(this.element);
    bindValueMap(config.props, 'selected', selected => {
      if (selected) {
        this.element.classList.add(cn$m(undefined, 'sel'));
      } else {
        this.element.classList.remove(cn$m(undefined, 'sel'));
      }
    });
    const buttonElem = doc.createElement('button');
    buttonElem.classList.add(cn$m('b'));
    config.viewProps.bindDisabled(buttonElem);
    this.element.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    const titleElem = doc.createElement('div');
    titleElem.classList.add(cn$m('t'));
    bindValueToTextContent(config.props.value('title'), titleElem);
    this.buttonElement.appendChild(titleElem);
    this.titleElement = titleElem;
  }
}
class TabItemController {
  constructor(doc, config) {
    this.emitter = new Emitter();
    this.onClick_ = this.onClick_.bind(this);
    this.props = config.props;
    this.viewProps = config.viewProps;
    this.view = new TabItemView(doc, {
      props: config.props,
      viewProps: config.viewProps
    });
    this.view.buttonElement.addEventListener('click', this.onClick_);
  }
  onClick_() {
    this.emitter.emit('click', {
      sender: this
    });
  }
}
class TabPageController extends ContainerBladeController {
  constructor(doc, config) {
    const view = new TabPageView(doc, {
      viewProps: config.viewProps
    });
    super(Object.assign(Object.assign({}, config), {
      rackController: new RackController({
        blade: config.blade,
        element: view.containerElement,
        viewProps: config.viewProps
      }),
      view: view
    }));
    this.onItemClick_ = this.onItemClick_.bind(this);
    this.ic_ = new TabItemController(doc, {
      props: config.itemProps,
      viewProps: ViewProps.create()
    });
    this.ic_.emitter.on('click', this.onItemClick_);
    this.props = config.props;
    bindValueMap(this.props, 'selected', selected => {
      this.itemController.props.set('selected', selected);
      this.viewProps.set('hidden', !selected);
    });
  }
  get itemController() {
    return this.ic_;
  }
  importState(state) {
    return importBladeState(state, s => super.importState(s), p => ({
      selected: p.required.boolean,
      title: p.required.string
    }), result => {
      this.ic_.props.set('selected', result.selected);
      this.ic_.props.set('title', result.title);
      return true;
    });
  }
  exportState() {
    return exportBladeState(() => super.exportState(), {
      selected: this.ic_.props.get('selected'),
      title: this.ic_.props.get('title')
    });
  }
  onItemClick_() {
    this.props.set('selected', true);
  }
}
class TabApi extends ContainerBladeApi {
  constructor(controller, pool) {
    super(controller, pool);
    this.emitter_ = new Emitter();
    this.onSelect_ = this.onSelect_.bind(this);
    this.pool_ = pool;
    this.rackApi_.on('change', ev => {
      this.emitter_.emit('change', ev);
    });
    this.controller.tab.selectedIndex.emitter.on('change', this.onSelect_);
  }
  get pages() {
    return this.rackApi_.children;
  }
  addPage(params) {
    const doc = this.controller.view.element.ownerDocument;
    const pc = new TabPageController(doc, {
      blade: createBlade(),
      itemProps: ValueMap.fromObject({
        selected: false,
        title: params.title
      }),
      props: ValueMap.fromObject({
        selected: false
      }),
      viewProps: ViewProps.create()
    });
    const papi = this.pool_.createApi(pc);
    return this.rackApi_.add(papi, params.index);
  }
  removePage(index) {
    this.rackApi_.remove(this.rackApi_.children[index]);
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, ev => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
  onSelect_(ev) {
    this.emitter_.emit('select', new TpTabSelectEvent(this, ev.rawValue));
  }
}
exports.TabApi = TabApi;
class TabPageApi extends ContainerBladeApi {
  get title() {
    var _a;
    return (_a = this.controller.itemController.props.get('title')) !== null && _a !== void 0 ? _a : '';
  }
  set title(title) {
    this.controller.itemController.props.set('title', title);
  }
  get selected() {
    return this.controller.props.get('selected');
  }
  set selected(selected) {
    this.controller.props.set('selected', selected);
  }
  get children() {
    return this.rackApi_.children;
  }
  addButton(params) {
    return this.rackApi_.addButton(params);
  }
  addFolder(params) {
    return this.rackApi_.addFolder(params);
  }
  addTab(params) {
    return this.rackApi_.addTab(params);
  }
  add(api, opt_index) {
    this.rackApi_.add(api, opt_index);
  }
  remove(api) {
    this.rackApi_.remove(api);
  }
  addBinding(object, key, opt_params) {
    return this.rackApi_.addBinding(object, key, opt_params);
  }
  addBlade(params) {
    return this.rackApi_.addBlade(params);
  }
}
exports.TabPageApi = TabPageApi;
const INDEX_NOT_SELECTED = -1;
class Tab {
  constructor() {
    this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this);
    this.empty = createValue(true);
    this.selectedIndex = createValue(INDEX_NOT_SELECTED);
    this.items_ = [];
  }
  add(item, opt_index) {
    const index = opt_index !== null && opt_index !== void 0 ? opt_index : this.items_.length;
    this.items_.splice(index, 0, item);
    item.emitter.on('change', this.onItemSelectedChange_);
    this.keepSelection_();
  }
  remove(item) {
    const index = this.items_.indexOf(item);
    if (index < 0) {
      return;
    }
    this.items_.splice(index, 1);
    item.emitter.off('change', this.onItemSelectedChange_);
    this.keepSelection_();
  }
  keepSelection_() {
    if (this.items_.length === 0) {
      this.selectedIndex.rawValue = INDEX_NOT_SELECTED;
      this.empty.rawValue = true;
      return;
    }
    const firstSelIndex = this.items_.findIndex(s => s.rawValue);
    if (firstSelIndex < 0) {
      this.items_.forEach((s, i) => {
        s.rawValue = i === 0;
      });
      this.selectedIndex.rawValue = 0;
    } else {
      this.items_.forEach((s, i) => {
        s.rawValue = i === firstSelIndex;
      });
      this.selectedIndex.rawValue = firstSelIndex;
    }
    this.empty.rawValue = false;
  }
  onItemSelectedChange_(ev) {
    if (ev.rawValue) {
      const index = this.items_.findIndex(s => s === ev.sender);
      this.items_.forEach((s, i) => {
        s.rawValue = i === index;
      });
      this.selectedIndex.rawValue = index;
    } else {
      this.keepSelection_();
    }
  }
}
const cn$l = ClassName('tab');
class TabView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$l(), bladeContainerClassName());
    config.viewProps.bindClassModifiers(this.element);
    bindValue(config.empty, valueToClassName(this.element, cn$l(undefined, 'nop')));
    const titleElem = doc.createElement('div');
    titleElem.classList.add(cn$l('t'));
    this.element.appendChild(titleElem);
    this.itemsElement = titleElem;
    const indentElem = doc.createElement('div');
    indentElem.classList.add(cn$l('i'));
    this.element.appendChild(indentElem);
    const contentsElem = doc.createElement('div');
    contentsElem.classList.add(cn$l('c'));
    this.element.appendChild(contentsElem);
    this.contentsElement = contentsElem;
  }
}
class TabController extends ContainerBladeController {
  constructor(doc, config) {
    const tab = new Tab();
    const view = new TabView(doc, {
      empty: tab.empty,
      viewProps: config.viewProps
    });
    super({
      blade: config.blade,
      rackController: new RackController({
        blade: config.blade,
        element: view.contentsElement,
        viewProps: config.viewProps
      }),
      view: view
    });
    this.onRackAdd_ = this.onRackAdd_.bind(this);
    this.onRackRemove_ = this.onRackRemove_.bind(this);
    const rack = this.rackController.rack;
    rack.emitter.on('add', this.onRackAdd_);
    rack.emitter.on('remove', this.onRackRemove_);
    this.tab = tab;
  }
  add(pc, opt_index) {
    this.rackController.rack.add(pc, opt_index);
  }
  remove(index) {
    this.rackController.rack.remove(this.rackController.rack.children[index]);
  }
  onRackAdd_(ev) {
    if (!ev.root) {
      return;
    }
    const pc = ev.bladeController;
    insertElementAt(this.view.itemsElement, pc.itemController.view.element, ev.index);
    pc.itemController.viewProps.set('parent', this.viewProps);
    this.tab.add(pc.props.value('selected'));
  }
  onRackRemove_(ev) {
    if (!ev.root) {
      return;
    }
    const pc = ev.bladeController;
    removeElement(pc.itemController.view.element);
    pc.itemController.viewProps.set('parent', null);
    this.tab.remove(pc.props.value('selected'));
  }
}
const TabBladePlugin = createPlugin({
  id: 'tab',
  type: 'blade',
  accept(params) {
    const result = parseRecord(params, p => ({
      pages: p.required.array(p.required.object({
        title: p.required.string
      })),
      view: p.required.constant('tab')
    }));
    if (!result || result.pages.length === 0) {
      return null;
    }
    return {
      params: result
    };
  },
  controller(args) {
    const c = new TabController(args.document, {
      blade: args.blade,
      viewProps: args.viewProps
    });
    args.params.pages.forEach(p => {
      const pc = new TabPageController(args.document, {
        blade: createBlade(),
        itemProps: ValueMap.fromObject({
          selected: false,
          title: p.title
        }),
        props: ValueMap.fromObject({
          selected: false
        }),
        viewProps: ViewProps.create()
      });
      c.add(pc);
    });
    return c;
  },
  api(args) {
    if (args.controller instanceof TabController) {
      return new TabApi(args.controller, args.pool);
    }
    if (args.controller instanceof TabPageController) {
      return new TabPageApi(args.controller, args.pool);
    }
    return null;
  }
});
function createBladeController(plugin, args) {
  const ac = plugin.accept(args.params);
  if (!ac) {
    return null;
  }
  const params = parseRecord(args.params, p => ({
    disabled: p.optional.boolean,
    hidden: p.optional.boolean
  }));
  return plugin.controller({
    blade: createBlade(),
    document: args.document,
    params: forceCast(Object.assign(Object.assign({}, ac.params), {
      disabled: params === null || params === void 0 ? void 0 : params.disabled,
      hidden: params === null || params === void 0 ? void 0 : params.hidden
    })),
    viewProps: ViewProps.create({
      disabled: params === null || params === void 0 ? void 0 : params.disabled,
      hidden: params === null || params === void 0 ? void 0 : params.hidden
    })
  });
}
class ListInputBindingApi extends BindingApi {
  get options() {
    return this.controller.valueController.props.get('options');
  }
  set options(options) {
    this.controller.valueController.props.set('options', options);
  }
}
exports.ListInputBindingApi = ListInputBindingApi;
class ManualTicker {
  constructor() {
    this.disabled = false;
    this.emitter = new Emitter();
  }
  dispose() {}
  tick() {
    if (this.disabled) {
      return;
    }
    this.emitter.emit('tick', {
      sender: this
    });
  }
}
class IntervalTicker {
  constructor(doc, interval) {
    this.disabled_ = false;
    this.timerId_ = null;
    this.onTick_ = this.onTick_.bind(this);
    this.doc_ = doc;
    this.emitter = new Emitter();
    this.interval_ = interval;
    this.setTimer_();
  }
  get disabled() {
    return this.disabled_;
  }
  set disabled(inactive) {
    this.disabled_ = inactive;
    if (this.disabled_) {
      this.clearTimer_();
    } else {
      this.setTimer_();
    }
  }
  dispose() {
    this.clearTimer_();
  }
  clearTimer_() {
    if (this.timerId_ === null) {
      return;
    }
    const win = this.doc_.defaultView;
    if (win) {
      win.clearInterval(this.timerId_);
    }
    this.timerId_ = null;
  }
  setTimer_() {
    this.clearTimer_();
    if (this.interval_ <= 0) {
      return;
    }
    const win = this.doc_.defaultView;
    if (win) {
      this.timerId_ = win.setInterval(this.onTick_, this.interval_);
    }
  }
  onTick_() {
    if (this.disabled_) {
      return;
    }
    this.emitter.emit('tick', {
      sender: this
    });
  }
}
class CompositeConstraint {
  constructor(constraints) {
    this.constraints = constraints;
  }
  constrain(value) {
    return this.constraints.reduce((result, c) => {
      return c.constrain(result);
    }, value);
  }
}
function findConstraint(c, constraintClass) {
  if (c instanceof constraintClass) {
    return c;
  }
  if (c instanceof CompositeConstraint) {
    const result = c.constraints.reduce((tmpResult, sc) => {
      if (tmpResult) {
        return tmpResult;
      }
      return sc instanceof constraintClass ? sc : null;
    }, null);
    if (result) {
      return result;
    }
  }
  return null;
}
class ListConstraint {
  constructor(options) {
    this.values = ValueMap.fromObject({
      options: options
    });
  }
  constrain(value) {
    const opts = this.values.get('options');
    if (opts.length === 0) {
      return value;
    }
    const matched = opts.filter(item => {
      return item.value === value;
    }).length > 0;
    return matched ? value : opts[0].value;
  }
}
function parseListOptions(value) {
  var _a;
  const p = MicroParsers;
  if (Array.isArray(value)) {
    return (_a = parseRecord({
      items: value
    }, p => ({
      items: p.required.array(p.required.object({
        text: p.required.string,
        value: p.required.raw
      }))
    }))) === null || _a === void 0 ? void 0 : _a.items;
  }
  if (typeof value === 'object') {
    return p.required.raw(value).value;
  }
  return undefined;
}
function normalizeListOptions(options) {
  if (Array.isArray(options)) {
    return options;
  }
  const items = [];
  Object.keys(options).forEach(text => {
    items.push({
      text: text,
      value: options[text]
    });
  });
  return items;
}
function createListConstraint(options) {
  return !isEmpty(options) ? new ListConstraint(normalizeListOptions(forceCast(options))) : null;
}
const cn$k = ClassName('lst');
class ListView {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.props_ = config.props;
    this.element = doc.createElement('div');
    this.element.classList.add(cn$k());
    config.viewProps.bindClassModifiers(this.element);
    const selectElem = doc.createElement('select');
    selectElem.classList.add(cn$k('s'));
    config.viewProps.bindDisabled(selectElem);
    this.element.appendChild(selectElem);
    this.selectElement = selectElem;
    const markElem = doc.createElement('div');
    markElem.classList.add(cn$k('m'));
    markElem.appendChild(createSvgIconElement(doc, 'dropdown'));
    this.element.appendChild(markElem);
    config.value.emitter.on('change', this.onValueChange_);
    this.value_ = config.value;
    bindValueMap(this.props_, 'options', opts => {
      removeChildElements(this.selectElement);
      opts.forEach(item => {
        const optionElem = doc.createElement('option');
        optionElem.textContent = item.text;
        this.selectElement.appendChild(optionElem);
      });
      this.update_();
    });
  }
  update_() {
    const values = this.props_.get('options').map(o => o.value);
    this.selectElement.selectedIndex = values.indexOf(this.value_.rawValue);
  }
  onValueChange_() {
    this.update_();
  }
}
class ListController {
  constructor(doc, config) {
    this.onSelectChange_ = this.onSelectChange_.bind(this);
    this.props = config.props;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new ListView(doc, {
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view.selectElement.addEventListener('change', this.onSelectChange_);
  }
  onSelectChange_(e) {
    const selectElem = forceCast(e.currentTarget);
    this.value.rawValue = this.props.get('options')[selectElem.selectedIndex].value;
  }
  importProps(state) {
    return importBladeState(state, null, p => ({
      options: p.required.custom(parseListOptions)
    }), result => {
      this.props.set('options', normalizeListOptions(result.options));
      return true;
    });
  }
  exportProps() {
    return exportBladeState(null, {
      options: this.props.get('options')
    });
  }
}
const cn$j = ClassName('pop');
class PopupView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$j());
    config.viewProps.bindClassModifiers(this.element);
    bindValue(config.shows, valueToClassName(this.element, cn$j(undefined, 'v')));
  }
}
class PopupController {
  constructor(doc, config) {
    this.shows = createValue(false);
    this.viewProps = config.viewProps;
    this.view = new PopupView(doc, {
      shows: this.shows,
      viewProps: this.viewProps
    });
  }
}
const cn$i = ClassName('txt');
class TextView {
  constructor(doc, config) {
    this.onChange_ = this.onChange_.bind(this);
    this.element = doc.createElement('div');
    this.element.classList.add(cn$i());
    config.viewProps.bindClassModifiers(this.element);
    this.props_ = config.props;
    this.props_.emitter.on('change', this.onChange_);
    const inputElem = doc.createElement('input');
    inputElem.classList.add(cn$i('i'));
    inputElem.type = 'text';
    config.viewProps.bindDisabled(inputElem);
    this.element.appendChild(inputElem);
    this.inputElement = inputElem;
    config.value.emitter.on('change', this.onChange_);
    this.value_ = config.value;
    this.refresh();
  }
  refresh() {
    const formatter = this.props_.get('formatter');
    this.inputElement.value = formatter(this.value_.rawValue);
  }
  onChange_() {
    this.refresh();
  }
}
class TextController {
  constructor(doc, config) {
    this.onInputChange_ = this.onInputChange_.bind(this);
    this.parser_ = config.parser;
    this.props = config.props;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new TextView(doc, {
      props: config.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view.inputElement.addEventListener('change', this.onInputChange_);
  }
  onInputChange_(e) {
    const inputElem = forceCast(e.currentTarget);
    const value = inputElem.value;
    const parsedValue = this.parser_(value);
    if (!isEmpty(parsedValue)) {
      this.value.rawValue = parsedValue;
    }
    this.view.refresh();
  }
}
function boolToString(value) {
  return String(value);
}
function boolFromUnknown(value) {
  if (value === 'false') {
    return false;
  }
  return !!value;
}
function BooleanFormatter(value) {
  return boolToString(value);
}
function composeParsers(parsers) {
  return text => {
    return parsers.reduce((result, parser) => {
      if (result !== null) {
        return result;
      }
      return parser(text);
    }, null);
  };
}
const innerFormatter = createNumberFormatter(0);
function formatPercentage(value) {
  return innerFormatter(value) + '%';
}
function stringFromUnknown(value) {
  return String(value);
}
function formatString(value) {
  return value;
}
function connectValues({
  primary,
  secondary,
  forward,
  backward
}) {
  let changing = false;
  function preventFeedback(callback) {
    if (changing) {
      return;
    }
    changing = true;
    callback();
    changing = false;
  }
  primary.emitter.on('change', ev => {
    preventFeedback(() => {
      secondary.setRawValue(forward(primary.rawValue, secondary.rawValue), ev.options);
    });
  });
  secondary.emitter.on('change', ev => {
    preventFeedback(() => {
      primary.setRawValue(backward(primary.rawValue, secondary.rawValue), ev.options);
    });
    preventFeedback(() => {
      secondary.setRawValue(forward(primary.rawValue, secondary.rawValue), ev.options);
    });
  });
  preventFeedback(() => {
    secondary.setRawValue(forward(primary.rawValue, secondary.rawValue), {
      forceEmit: false,
      last: true
    });
  });
}
function getStepForKey(keyScale, keys) {
  const step = keyScale * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
  if (keys.upKey) {
    return +step;
  } else if (keys.downKey) {
    return -step;
  }
  return 0;
}
function getVerticalStepKeys(ev) {
  return {
    altKey: ev.altKey,
    downKey: ev.key === 'ArrowDown',
    shiftKey: ev.shiftKey,
    upKey: ev.key === 'ArrowUp'
  };
}
function getHorizontalStepKeys(ev) {
  return {
    altKey: ev.altKey,
    downKey: ev.key === 'ArrowLeft',
    shiftKey: ev.shiftKey,
    upKey: ev.key === 'ArrowRight'
  };
}
function isVerticalArrowKey(key) {
  return key === 'ArrowUp' || key === 'ArrowDown';
}
function isArrowKey(key) {
  return isVerticalArrowKey(key) || key === 'ArrowLeft' || key === 'ArrowRight';
}
function computeOffset$1(ev, elem) {
  var _a, _b;
  const win = elem.ownerDocument.defaultView;
  const rect = elem.getBoundingClientRect();
  return {
    x: ev.pageX - (((_a = win && win.scrollX) !== null && _a !== void 0 ? _a : 0) + rect.left),
    y: ev.pageY - (((_b = win && win.scrollY) !== null && _b !== void 0 ? _b : 0) + rect.top)
  };
}
class PointerHandler {
  constructor(element) {
    this.lastTouch_ = null;
    this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
    this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
    this.onMouseDown_ = this.onMouseDown_.bind(this);
    this.onTouchEnd_ = this.onTouchEnd_.bind(this);
    this.onTouchMove_ = this.onTouchMove_.bind(this);
    this.onTouchStart_ = this.onTouchStart_.bind(this);
    this.elem_ = element;
    this.emitter = new Emitter();
    element.addEventListener('touchstart', this.onTouchStart_, {
      passive: false
    });
    element.addEventListener('touchmove', this.onTouchMove_, {
      passive: true
    });
    element.addEventListener('touchend', this.onTouchEnd_);
    element.addEventListener('mousedown', this.onMouseDown_);
  }
  computePosition_(offset) {
    const rect = this.elem_.getBoundingClientRect();
    return {
      bounds: {
        width: rect.width,
        height: rect.height
      },
      point: offset ? {
        x: offset.x,
        y: offset.y
      } : null
    };
  }
  onMouseDown_(ev) {
    var _a;
    ev.preventDefault();
    (_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.focus();
    const doc = this.elem_.ownerDocument;
    doc.addEventListener('mousemove', this.onDocumentMouseMove_);
    doc.addEventListener('mouseup', this.onDocumentMouseUp_);
    this.emitter.emit('down', {
      altKey: ev.altKey,
      data: this.computePosition_(computeOffset$1(ev, this.elem_)),
      sender: this,
      shiftKey: ev.shiftKey
    });
  }
  onDocumentMouseMove_(ev) {
    this.emitter.emit('move', {
      altKey: ev.altKey,
      data: this.computePosition_(computeOffset$1(ev, this.elem_)),
      sender: this,
      shiftKey: ev.shiftKey
    });
  }
  onDocumentMouseUp_(ev) {
    const doc = this.elem_.ownerDocument;
    doc.removeEventListener('mousemove', this.onDocumentMouseMove_);
    doc.removeEventListener('mouseup', this.onDocumentMouseUp_);
    this.emitter.emit('up', {
      altKey: ev.altKey,
      data: this.computePosition_(computeOffset$1(ev, this.elem_)),
      sender: this,
      shiftKey: ev.shiftKey
    });
  }
  onTouchStart_(ev) {
    ev.preventDefault();
    const touch = ev.targetTouches.item(0);
    const rect = this.elem_.getBoundingClientRect();
    this.emitter.emit('down', {
      altKey: ev.altKey,
      data: this.computePosition_(touch ? {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      } : undefined),
      sender: this,
      shiftKey: ev.shiftKey
    });
    this.lastTouch_ = touch;
  }
  onTouchMove_(ev) {
    const touch = ev.targetTouches.item(0);
    const rect = this.elem_.getBoundingClientRect();
    this.emitter.emit('move', {
      altKey: ev.altKey,
      data: this.computePosition_(touch ? {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      } : undefined),
      sender: this,
      shiftKey: ev.shiftKey
    });
    this.lastTouch_ = touch;
  }
  onTouchEnd_(ev) {
    var _a;
    const touch = (_a = ev.targetTouches.item(0)) !== null && _a !== void 0 ? _a : this.lastTouch_;
    const rect = this.elem_.getBoundingClientRect();
    this.emitter.emit('up', {
      altKey: ev.altKey,
      data: this.computePosition_(touch ? {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      } : undefined),
      sender: this,
      shiftKey: ev.shiftKey
    });
  }
}
const cn$h = ClassName('txt');
class NumberTextView {
  constructor(doc, config) {
    this.onChange_ = this.onChange_.bind(this);
    this.props_ = config.props;
    this.props_.emitter.on('change', this.onChange_);
    this.element = doc.createElement('div');
    this.element.classList.add(cn$h(), cn$h(undefined, 'num'));
    if (config.arrayPosition) {
      this.element.classList.add(cn$h(undefined, config.arrayPosition));
    }
    config.viewProps.bindClassModifiers(this.element);
    const inputElem = doc.createElement('input');
    inputElem.classList.add(cn$h('i'));
    inputElem.type = 'text';
    config.viewProps.bindDisabled(inputElem);
    this.element.appendChild(inputElem);
    this.inputElement = inputElem;
    this.onDraggingChange_ = this.onDraggingChange_.bind(this);
    this.dragging_ = config.dragging;
    this.dragging_.emitter.on('change', this.onDraggingChange_);
    this.element.classList.add(cn$h());
    this.inputElement.classList.add(cn$h('i'));
    const knobElem = doc.createElement('div');
    knobElem.classList.add(cn$h('k'));
    this.element.appendChild(knobElem);
    this.knobElement = knobElem;
    const guideElem = doc.createElementNS(SVG_NS, 'svg');
    guideElem.classList.add(cn$h('g'));
    this.knobElement.appendChild(guideElem);
    const bodyElem = doc.createElementNS(SVG_NS, 'path');
    bodyElem.classList.add(cn$h('gb'));
    guideElem.appendChild(bodyElem);
    this.guideBodyElem_ = bodyElem;
    const headElem = doc.createElementNS(SVG_NS, 'path');
    headElem.classList.add(cn$h('gh'));
    guideElem.appendChild(headElem);
    this.guideHeadElem_ = headElem;
    const tooltipElem = doc.createElement('div');
    tooltipElem.classList.add(ClassName('tt')());
    this.knobElement.appendChild(tooltipElem);
    this.tooltipElem_ = tooltipElem;
    config.value.emitter.on('change', this.onChange_);
    this.value = config.value;
    this.refresh();
  }
  onDraggingChange_(ev) {
    if (ev.rawValue === null) {
      this.element.classList.remove(cn$h(undefined, 'drg'));
      return;
    }
    this.element.classList.add(cn$h(undefined, 'drg'));
    const x = ev.rawValue / this.props_.get('pointerScale');
    const aox = x + (x > 0 ? -1 : x < 0 ? +1 : 0);
    const adx = constrainRange(-aox, -4, +4);
    this.guideHeadElem_.setAttributeNS(null, 'd', [`M ${aox + adx},0 L${aox},4 L${aox + adx},8`, `M ${x},-1 L${x},9`].join(' '));
    this.guideBodyElem_.setAttributeNS(null, 'd', `M 0,4 L${x},4`);
    const formatter = this.props_.get('formatter');
    this.tooltipElem_.textContent = formatter(this.value.rawValue);
    this.tooltipElem_.style.left = `${x}px`;
  }
  refresh() {
    const formatter = this.props_.get('formatter');
    this.inputElement.value = formatter(this.value.rawValue);
  }
  onChange_() {
    this.refresh();
  }
}
class NumberTextController {
  constructor(doc, config) {
    var _a;
    this.originRawValue_ = 0;
    this.onInputChange_ = this.onInputChange_.bind(this);
    this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
    this.onInputKeyUp_ = this.onInputKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.parser_ = config.parser;
    this.props = config.props;
    this.sliderProps_ = (_a = config.sliderProps) !== null && _a !== void 0 ? _a : null;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.dragging_ = createValue(null);
    this.view = new NumberTextView(doc, {
      arrayPosition: config.arrayPosition,
      dragging: this.dragging_,
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view.inputElement.addEventListener('change', this.onInputChange_);
    this.view.inputElement.addEventListener('keydown', this.onInputKeyDown_);
    this.view.inputElement.addEventListener('keyup', this.onInputKeyUp_);
    const ph = new PointerHandler(this.view.knobElement);
    ph.emitter.on('down', this.onPointerDown_);
    ph.emitter.on('move', this.onPointerMove_);
    ph.emitter.on('up', this.onPointerUp_);
  }
  constrainValue_(value) {
    var _a, _b;
    const min = (_a = this.sliderProps_) === null || _a === void 0 ? void 0 : _a.get('min');
    const max = (_b = this.sliderProps_) === null || _b === void 0 ? void 0 : _b.get('max');
    let v = value;
    if (min !== undefined) {
      v = Math.max(v, min);
    }
    if (max !== undefined) {
      v = Math.min(v, max);
    }
    return v;
  }
  onInputChange_(e) {
    const inputElem = forceCast(e.currentTarget);
    const value = inputElem.value;
    const parsedValue = this.parser_(value);
    if (!isEmpty(parsedValue)) {
      this.value.rawValue = this.constrainValue_(parsedValue);
    }
    this.view.refresh();
  }
  onInputKeyDown_(ev) {
    const step = getStepForKey(this.props.get('keyScale'), getVerticalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.constrainValue_(this.value.rawValue + step), {
      forceEmit: false,
      last: false
    });
  }
  onInputKeyUp_(ev) {
    const step = getStepForKey(this.props.get('keyScale'), getVerticalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
  onPointerDown_() {
    this.originRawValue_ = this.value.rawValue;
    this.dragging_.rawValue = 0;
  }
  computeDraggingValue_(data) {
    if (!data.point) {
      return null;
    }
    const dx = data.point.x - data.bounds.width / 2;
    return this.constrainValue_(this.originRawValue_ + dx * this.props.get('pointerScale'));
  }
  onPointerMove_(ev) {
    const v = this.computeDraggingValue_(ev.data);
    if (v === null) {
      return;
    }
    this.value.setRawValue(v, {
      forceEmit: false,
      last: false
    });
    this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
  }
  onPointerUp_(ev) {
    const v = this.computeDraggingValue_(ev.data);
    if (v === null) {
      return;
    }
    this.value.setRawValue(v, {
      forceEmit: true,
      last: true
    });
    this.dragging_.rawValue = null;
  }
}
const cn$g = ClassName('sld');
class SliderView {
  constructor(doc, config) {
    this.onChange_ = this.onChange_.bind(this);
    this.props_ = config.props;
    this.props_.emitter.on('change', this.onChange_);
    this.element = doc.createElement('div');
    this.element.classList.add(cn$g());
    config.viewProps.bindClassModifiers(this.element);
    const trackElem = doc.createElement('div');
    trackElem.classList.add(cn$g('t'));
    config.viewProps.bindTabIndex(trackElem);
    this.element.appendChild(trackElem);
    this.trackElement = trackElem;
    const knobElem = doc.createElement('div');
    knobElem.classList.add(cn$g('k'));
    this.trackElement.appendChild(knobElem);
    this.knobElement = knobElem;
    config.value.emitter.on('change', this.onChange_);
    this.value = config.value;
    this.update_();
  }
  update_() {
    const p = constrainRange(mapRange(this.value.rawValue, this.props_.get('min'), this.props_.get('max'), 0, 100), 0, 100);
    this.knobElement.style.width = `${p}%`;
  }
  onChange_() {
    this.update_();
  }
}
class SliderController {
  constructor(doc, config) {
    this.onKeyDown_ = this.onKeyDown_.bind(this);
    this.onKeyUp_ = this.onKeyUp_.bind(this);
    this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.props = config.props;
    this.view = new SliderView(doc, {
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.trackElement);
    this.ptHandler_.emitter.on('down', this.onPointerDownOrMove_);
    this.ptHandler_.emitter.on('move', this.onPointerDownOrMove_);
    this.ptHandler_.emitter.on('up', this.onPointerUp_);
    this.view.trackElement.addEventListener('keydown', this.onKeyDown_);
    this.view.trackElement.addEventListener('keyup', this.onKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    this.value.setRawValue(mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get('min'), this.props.get('max')), opts);
  }
  onPointerDownOrMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onKeyDown_(ev) {
    const step = getStepForKey(this.props.get('keyScale'), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue + step, {
      forceEmit: false,
      last: false
    });
  }
  onKeyUp_(ev) {
    const step = getStepForKey(this.props.get('keyScale'), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
}
const cn$f = ClassName('sldtxt');
class SliderTextView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$f());
    const sliderElem = doc.createElement('div');
    sliderElem.classList.add(cn$f('s'));
    this.sliderView_ = config.sliderView;
    sliderElem.appendChild(this.sliderView_.element);
    this.element.appendChild(sliderElem);
    const textElem = doc.createElement('div');
    textElem.classList.add(cn$f('t'));
    this.textView_ = config.textView;
    textElem.appendChild(this.textView_.element);
    this.element.appendChild(textElem);
  }
}
class SliderTextController {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.sliderC_ = new SliderController(doc, {
      props: config.sliderProps,
      value: config.value,
      viewProps: this.viewProps
    });
    this.textC_ = new NumberTextController(doc, {
      parser: config.parser,
      props: config.textProps,
      sliderProps: config.sliderProps,
      value: config.value,
      viewProps: config.viewProps
    });
    this.view = new SliderTextView(doc, {
      sliderView: this.sliderC_.view,
      textView: this.textC_.view
    });
  }
  get sliderController() {
    return this.sliderC_;
  }
  get textController() {
    return this.textC_;
  }
  importProps(state) {
    return importBladeState(state, null, p => ({
      max: p.required.number,
      min: p.required.number
    }), result => {
      const sliderProps = this.sliderC_.props;
      sliderProps.set('max', result.max);
      sliderProps.set('min', result.min);
      return true;
    });
  }
  exportProps() {
    const sliderProps = this.sliderC_.props;
    return exportBladeState(null, {
      max: sliderProps.get('max'),
      min: sliderProps.get('min')
    });
  }
}
function createSliderTextProps(config) {
  return {
    sliderProps: new ValueMap({
      keyScale: config.keyScale,
      max: config.max,
      min: config.min
    }),
    textProps: new ValueMap({
      formatter: createValue(config.formatter),
      keyScale: config.keyScale,
      pointerScale: createValue(config.pointerScale)
    })
  };
}
const CSS_VAR_MAP = {
  containerUnitSize: 'cnt-usz'
};
function getCssVar(key) {
  return `--${CSS_VAR_MAP[key]}`;
}
function createPointDimensionParser(p) {
  return createNumberTextInputParamsParser(p);
}
function parsePointDimensionParams(value) {
  if (!isRecord(value)) {
    return undefined;
  }
  return parseRecord(value, createPointDimensionParser);
}
function createDimensionConstraint(params, initialValue) {
  if (!params) {
    return undefined;
  }
  const constraints = [];
  const cs = createStepConstraint(params, initialValue);
  if (cs) {
    constraints.push(cs);
  }
  const rs = createRangeConstraint(params);
  if (rs) {
    constraints.push(rs);
  }
  return new CompositeConstraint(constraints);
}
function isCompatible(ver) {
  if (!ver) {
    return false;
  }
  return ver.major === VERSION$1.major;
}
function parsePickerLayout(value) {
  if (value === 'inline' || value === 'popup') {
    return value;
  }
  return undefined;
}
function writePrimitive(target, value) {
  target.write(value);
}
const cn$e = ClassName('ckb');
class CheckboxView {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.element = doc.createElement('div');
    this.element.classList.add(cn$e());
    config.viewProps.bindClassModifiers(this.element);
    const labelElem = doc.createElement('label');
    labelElem.classList.add(cn$e('l'));
    this.element.appendChild(labelElem);
    this.labelElement = labelElem;
    const inputElem = doc.createElement('input');
    inputElem.classList.add(cn$e('i'));
    inputElem.type = 'checkbox';
    this.labelElement.appendChild(inputElem);
    this.inputElement = inputElem;
    config.viewProps.bindDisabled(this.inputElement);
    const wrapperElem = doc.createElement('div');
    wrapperElem.classList.add(cn$e('w'));
    this.labelElement.appendChild(wrapperElem);
    const markElem = createSvgIconElement(doc, 'check');
    wrapperElem.appendChild(markElem);
    config.value.emitter.on('change', this.onValueChange_);
    this.value = config.value;
    this.update_();
  }
  update_() {
    this.inputElement.checked = this.value.rawValue;
  }
  onValueChange_() {
    this.update_();
  }
}
class CheckboxController {
  constructor(doc, config) {
    this.onInputChange_ = this.onInputChange_.bind(this);
    this.onLabelMouseDown_ = this.onLabelMouseDown_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new CheckboxView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.view.inputElement.addEventListener('change', this.onInputChange_);
    this.view.labelElement.addEventListener('mousedown', this.onLabelMouseDown_);
  }
  onInputChange_(ev) {
    const inputElem = forceCast(ev.currentTarget);
    this.value.rawValue = inputElem.checked;
    ev.preventDefault();
    ev.stopPropagation();
  }
  onLabelMouseDown_(ev) {
    ev.preventDefault();
  }
}
function createConstraint$6(params) {
  const constraints = [];
  const lc = createListConstraint(params.options);
  if (lc) {
    constraints.push(lc);
  }
  return new CompositeConstraint(constraints);
}
const BooleanInputPlugin = createPlugin({
  id: 'input-bool',
  type: 'input',
  accept: (value, params) => {
    if (typeof value !== 'boolean') {
      return null;
    }
    const result = parseRecord(params, p => ({
      options: p.optional.custom(parseListOptions),
      readonly: p.optional.constant(false)
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: _args => boolFromUnknown,
    constraint: args => createConstraint$6(args.params),
    writer: _args => writePrimitive
  },
  controller: args => {
    const doc = args.document;
    const value = args.value;
    const c = args.constraint;
    const lc = c && findConstraint(c, ListConstraint);
    if (lc) {
      return new ListController(doc, {
        props: new ValueMap({
          options: lc.values.value('options')
        }),
        value: value,
        viewProps: args.viewProps
      });
    }
    return new CheckboxController(doc, {
      value: value,
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (typeof args.controller.value.rawValue !== 'boolean') {
      return null;
    }
    if (args.controller.valueController instanceof ListController) {
      return new ListInputBindingApi(args.controller);
    }
    return null;
  }
});
const cn$d = ClassName('col');
class ColorView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$d());
    config.foldable.bindExpandedClass(this.element, cn$d(undefined, 'expanded'));
    bindValueMap(config.foldable, 'completed', valueToClassName(this.element, cn$d(undefined, 'cpl')));
    const headElem = doc.createElement('div');
    headElem.classList.add(cn$d('h'));
    this.element.appendChild(headElem);
    const swatchElem = doc.createElement('div');
    swatchElem.classList.add(cn$d('s'));
    headElem.appendChild(swatchElem);
    this.swatchElement = swatchElem;
    const textElem = doc.createElement('div');
    textElem.classList.add(cn$d('t'));
    headElem.appendChild(textElem);
    this.textElement = textElem;
    if (config.pickerLayout === 'inline') {
      const pickerElem = doc.createElement('div');
      pickerElem.classList.add(cn$d('p'));
      this.element.appendChild(pickerElem);
      this.pickerElement = pickerElem;
    } else {
      this.pickerElement = null;
    }
  }
}
function rgbToHslInt(r, g, b) {
  const rp = constrainRange(r / 255, 0, 1);
  const gp = constrainRange(g / 255, 0, 1);
  const bp = constrainRange(b / 255, 0, 1);
  const cmax = Math.max(rp, gp, bp);
  const cmin = Math.min(rp, gp, bp);
  const c = cmax - cmin;
  let h = 0;
  let s = 0;
  const l = (cmin + cmax) / 2;
  if (c !== 0) {
    s = c / (1 - Math.abs(cmax + cmin - 1));
    if (rp === cmax) {
      h = (gp - bp) / c;
    } else if (gp === cmax) {
      h = 2 + (bp - rp) / c;
    } else {
      h = 4 + (rp - gp) / c;
    }
    h = h / 6 + (h < 0 ? 1 : 0);
  }
  return [h * 360, s * 100, l * 100];
}
function hslToRgbInt(h, s, l) {
  const hp = (h % 360 + 360) % 360;
  const sp = constrainRange(s / 100, 0, 1);
  const lp = constrainRange(l / 100, 0, 1);
  const c = (1 - Math.abs(2 * lp - 1)) * sp;
  const x = c * (1 - Math.abs(hp / 60 % 2 - 1));
  const m = lp - c / 2;
  let rp, gp, bp;
  if (hp >= 0 && hp < 60) {
    [rp, gp, bp] = [c, x, 0];
  } else if (hp >= 60 && hp < 120) {
    [rp, gp, bp] = [x, c, 0];
  } else if (hp >= 120 && hp < 180) {
    [rp, gp, bp] = [0, c, x];
  } else if (hp >= 180 && hp < 240) {
    [rp, gp, bp] = [0, x, c];
  } else if (hp >= 240 && hp < 300) {
    [rp, gp, bp] = [x, 0, c];
  } else {
    [rp, gp, bp] = [c, 0, x];
  }
  return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
}
function rgbToHsvInt(r, g, b) {
  const rp = constrainRange(r / 255, 0, 1);
  const gp = constrainRange(g / 255, 0, 1);
  const bp = constrainRange(b / 255, 0, 1);
  const cmax = Math.max(rp, gp, bp);
  const cmin = Math.min(rp, gp, bp);
  const d = cmax - cmin;
  let h;
  if (d === 0) {
    h = 0;
  } else if (cmax === rp) {
    h = 60 * (((gp - bp) / d % 6 + 6) % 6);
  } else if (cmax === gp) {
    h = 60 * ((bp - rp) / d + 2);
  } else {
    h = 60 * ((rp - gp) / d + 4);
  }
  const s = cmax === 0 ? 0 : d / cmax;
  const v = cmax;
  return [h, s * 100, v * 100];
}
function hsvToRgbInt(h, s, v) {
  const hp = loopRange(h, 360);
  const sp = constrainRange(s / 100, 0, 1);
  const vp = constrainRange(v / 100, 0, 1);
  const c = vp * sp;
  const x = c * (1 - Math.abs(hp / 60 % 2 - 1));
  const m = vp - c;
  let rp, gp, bp;
  if (hp >= 0 && hp < 60) {
    [rp, gp, bp] = [c, x, 0];
  } else if (hp >= 60 && hp < 120) {
    [rp, gp, bp] = [x, c, 0];
  } else if (hp >= 120 && hp < 180) {
    [rp, gp, bp] = [0, c, x];
  } else if (hp >= 180 && hp < 240) {
    [rp, gp, bp] = [0, x, c];
  } else if (hp >= 240 && hp < 300) {
    [rp, gp, bp] = [x, 0, c];
  } else {
    [rp, gp, bp] = [c, 0, x];
  }
  return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
}
function hslToHsvInt(h, s, l) {
  const sd = l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100);
  return [h, sd !== 0 ? s * (100 - Math.abs(2 * l - 100)) / sd : 0, l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100)];
}
function hsvToHslInt(h, s, v) {
  const sd = 100 - Math.abs(v * (200 - s) / 100 - 100);
  return [h, sd !== 0 ? s * v / sd : 0, v * (200 - s) / (2 * 100)];
}
function removeAlphaComponent(comps) {
  return [comps[0], comps[1], comps[2]];
}
function appendAlphaComponent(comps, alpha) {
  return [comps[0], comps[1], comps[2], alpha];
}
const MODE_CONVERTER_MAP = {
  hsl: {
    hsl: (h, s, l) => [h, s, l],
    hsv: hslToHsvInt,
    rgb: hslToRgbInt
  },
  hsv: {
    hsl: hsvToHslInt,
    hsv: (h, s, v) => [h, s, v],
    rgb: hsvToRgbInt
  },
  rgb: {
    hsl: rgbToHslInt,
    hsv: rgbToHsvInt,
    rgb: (r, g, b) => [r, g, b]
  }
};
function getColorMaxComponents(mode, type) {
  return [type === 'float' ? 1 : mode === 'rgb' ? 255 : 360, type === 'float' ? 1 : mode === 'rgb' ? 255 : 100, type === 'float' ? 1 : mode === 'rgb' ? 255 : 100];
}
function loopHueRange(hue, max) {
  return hue === max ? max : loopRange(hue, max);
}
function constrainColorComponents(components, mode, type) {
  var _a;
  const ms = getColorMaxComponents(mode, type);
  return [mode === 'rgb' ? constrainRange(components[0], 0, ms[0]) : loopHueRange(components[0], ms[0]), constrainRange(components[1], 0, ms[1]), constrainRange(components[2], 0, ms[2]), constrainRange((_a = components[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)];
}
function convertColorType(comps, mode, from, to) {
  const fms = getColorMaxComponents(mode, from);
  const tms = getColorMaxComponents(mode, to);
  return comps.map((c, index) => c / fms[index] * tms[index]);
}
function convertColor(components, from, to) {
  const intComps = convertColorType(components, from.mode, from.type, 'int');
  const result = MODE_CONVERTER_MAP[from.mode][to.mode](...intComps);
  return convertColorType(result, to.mode, 'int', to.type);
}
class IntColor {
  static black() {
    return new IntColor([0, 0, 0], 'rgb');
  }
  constructor(comps, mode) {
    this.type = 'int';
    this.mode = mode;
    this.comps_ = constrainColorComponents(comps, mode, this.type);
  }
  getComponents(opt_mode) {
    return appendAlphaComponent(convertColor(removeAlphaComponent(this.comps_), {
      mode: this.mode,
      type: this.type
    }, {
      mode: opt_mode !== null && opt_mode !== void 0 ? opt_mode : this.mode,
      type: this.type
    }), this.comps_[3]);
  }
  toRgbaObject() {
    const rgbComps = this.getComponents('rgb');
    return {
      r: rgbComps[0],
      g: rgbComps[1],
      b: rgbComps[2],
      a: rgbComps[3]
    };
  }
}
const cn$c = ClassName('colp');
class ColorPickerView {
  constructor(doc, config) {
    this.alphaViews_ = null;
    this.element = doc.createElement('div');
    this.element.classList.add(cn$c());
    config.viewProps.bindClassModifiers(this.element);
    const hsvElem = doc.createElement('div');
    hsvElem.classList.add(cn$c('hsv'));
    const svElem = doc.createElement('div');
    svElem.classList.add(cn$c('sv'));
    this.svPaletteView_ = config.svPaletteView;
    svElem.appendChild(this.svPaletteView_.element);
    hsvElem.appendChild(svElem);
    const hElem = doc.createElement('div');
    hElem.classList.add(cn$c('h'));
    this.hPaletteView_ = config.hPaletteView;
    hElem.appendChild(this.hPaletteView_.element);
    hsvElem.appendChild(hElem);
    this.element.appendChild(hsvElem);
    const rgbElem = doc.createElement('div');
    rgbElem.classList.add(cn$c('rgb'));
    this.textsView_ = config.textsView;
    rgbElem.appendChild(this.textsView_.element);
    this.element.appendChild(rgbElem);
    if (config.alphaViews) {
      this.alphaViews_ = {
        palette: config.alphaViews.palette,
        text: config.alphaViews.text
      };
      const aElem = doc.createElement('div');
      aElem.classList.add(cn$c('a'));
      const apElem = doc.createElement('div');
      apElem.classList.add(cn$c('ap'));
      apElem.appendChild(this.alphaViews_.palette.element);
      aElem.appendChild(apElem);
      const atElem = doc.createElement('div');
      atElem.classList.add(cn$c('at'));
      atElem.appendChild(this.alphaViews_.text.element);
      aElem.appendChild(atElem);
      this.element.appendChild(aElem);
    }
  }
  get allFocusableElements() {
    const elems = [this.svPaletteView_.element, this.hPaletteView_.element, this.textsView_.modeSelectElement, ...this.textsView_.inputViews.map(v => v.inputElement)];
    if (this.alphaViews_) {
      elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
    }
    return elems;
  }
}
function parseColorType(value) {
  return value === 'int' ? 'int' : value === 'float' ? 'float' : undefined;
}
function parseColorInputParams(params) {
  return parseRecord(params, p => ({
    color: p.optional.object({
      alpha: p.optional.boolean,
      type: p.optional.custom(parseColorType)
    }),
    expanded: p.optional.boolean,
    picker: p.optional.custom(parsePickerLayout),
    readonly: p.optional.constant(false)
  }));
}
function getKeyScaleForColor(forAlpha) {
  return forAlpha ? 0.1 : 1;
}
function extractColorType(params) {
  var _a;
  return (_a = params.color) === null || _a === void 0 ? void 0 : _a.type;
}
class FloatColor {
  constructor(comps, mode) {
    this.type = 'float';
    this.mode = mode;
    this.comps_ = constrainColorComponents(comps, mode, this.type);
  }
  getComponents(opt_mode) {
    return appendAlphaComponent(convertColor(removeAlphaComponent(this.comps_), {
      mode: this.mode,
      type: this.type
    }, {
      mode: opt_mode !== null && opt_mode !== void 0 ? opt_mode : this.mode,
      type: this.type
    }), this.comps_[3]);
  }
  toRgbaObject() {
    const rgbComps = this.getComponents('rgb');
    return {
      r: rgbComps[0],
      g: rgbComps[1],
      b: rgbComps[2],
      a: rgbComps[3]
    };
  }
}
const TYPE_TO_CONSTRUCTOR_MAP = {
  int: (comps, mode) => new IntColor(comps, mode),
  float: (comps, mode) => new FloatColor(comps, mode)
};
function createColor(comps, mode, type) {
  return TYPE_TO_CONSTRUCTOR_MAP[type](comps, mode);
}
function isFloatColor(c) {
  return c.type === 'float';
}
function isIntColor(c) {
  return c.type === 'int';
}
function convertFloatToInt(cf) {
  const comps = cf.getComponents();
  const ms = getColorMaxComponents(cf.mode, 'int');
  return new IntColor([Math.round(mapRange(comps[0], 0, 1, 0, ms[0])), Math.round(mapRange(comps[1], 0, 1, 0, ms[1])), Math.round(mapRange(comps[2], 0, 1, 0, ms[2])), comps[3]], cf.mode);
}
function convertIntToFloat(ci) {
  const comps = ci.getComponents();
  const ms = getColorMaxComponents(ci.mode, 'int');
  return new FloatColor([mapRange(comps[0], 0, ms[0], 0, 1), mapRange(comps[1], 0, ms[1], 0, 1), mapRange(comps[2], 0, ms[2], 0, 1), comps[3]], ci.mode);
}
function mapColorType(c, type) {
  if (c.type === type) {
    return c;
  }
  if (isIntColor(c) && type === 'float') {
    return convertIntToFloat(c);
  }
  if (isFloatColor(c) && type === 'int') {
    return convertFloatToInt(c);
  }
  throw TpError.shouldNeverHappen();
}
function equalsStringColorFormat(f1, f2) {
  return f1.alpha === f2.alpha && f1.mode === f2.mode && f1.notation === f2.notation && f1.type === f2.type;
}
function parseCssNumberOrPercentage(text, max) {
  const m = text.match(/^(.+)%$/);
  if (!m) {
    return Math.min(parseFloat(text), max);
  }
  return Math.min(parseFloat(m[1]) * 0.01 * max, max);
}
const ANGLE_TO_DEG_MAP = {
  deg: angle => angle,
  grad: angle => angle * 360 / 400,
  rad: angle => angle * 360 / (2 * Math.PI),
  turn: angle => angle * 360
};
function parseCssNumberOrAngle(text) {
  const m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
  if (!m) {
    return parseFloat(text);
  }
  const angle = parseFloat(m[1]);
  const unit = m[2];
  return ANGLE_TO_DEG_MAP[unit](angle);
}
function parseFunctionalRgbColorComponents(text) {
  const m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
  if (!m) {
    return null;
  }
  const comps = [parseCssNumberOrPercentage(m[1], 255), parseCssNumberOrPercentage(m[2], 255), parseCssNumberOrPercentage(m[3], 255)];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
    return null;
  }
  return comps;
}
function parseFunctionalRgbColor(text) {
  const comps = parseFunctionalRgbColorComponents(text);
  return comps ? new IntColor(comps, 'rgb') : null;
}
function parseFunctionalRgbaColorComponents(text) {
  const m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
  if (!m) {
    return null;
  }
  const comps = [parseCssNumberOrPercentage(m[1], 255), parseCssNumberOrPercentage(m[2], 255), parseCssNumberOrPercentage(m[3], 255), parseCssNumberOrPercentage(m[4], 1)];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
    return null;
  }
  return comps;
}
function parseFunctionalRgbaColor(text) {
  const comps = parseFunctionalRgbaColorComponents(text);
  return comps ? new IntColor(comps, 'rgb') : null;
}
function parseFunctionalHslColorComponents(text) {
  const m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
  if (!m) {
    return null;
  }
  const comps = [parseCssNumberOrAngle(m[1]), parseCssNumberOrPercentage(m[2], 100), parseCssNumberOrPercentage(m[3], 100)];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
    return null;
  }
  return comps;
}
function parseFunctionalHslColor(text) {
  const comps = parseFunctionalHslColorComponents(text);
  return comps ? new IntColor(comps, 'hsl') : null;
}
function parseHslaColorComponents(text) {
  const m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
  if (!m) {
    return null;
  }
  const comps = [parseCssNumberOrAngle(m[1]), parseCssNumberOrPercentage(m[2], 100), parseCssNumberOrPercentage(m[3], 100), parseCssNumberOrPercentage(m[4], 1)];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
    return null;
  }
  return comps;
}
function parseFunctionalHslaColor(text) {
  const comps = parseHslaColorComponents(text);
  return comps ? new IntColor(comps, 'hsl') : null;
}
function parseHexRgbColorComponents(text) {
  const mRgb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
  if (mRgb) {
    return [parseInt(mRgb[1] + mRgb[1], 16), parseInt(mRgb[2] + mRgb[2], 16), parseInt(mRgb[3] + mRgb[3], 16)];
  }
  const mRrggbb = text.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
  if (mRrggbb) {
    return [parseInt(mRrggbb[1], 16), parseInt(mRrggbb[2], 16), parseInt(mRrggbb[3], 16)];
  }
  return null;
}
function parseHexRgbColor(text) {
  const comps = parseHexRgbColorComponents(text);
  return comps ? new IntColor(comps, 'rgb') : null;
}
function parseHexRgbaColorComponents(text) {
  const mRgb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
  if (mRgb) {
    return [parseInt(mRgb[1] + mRgb[1], 16), parseInt(mRgb[2] + mRgb[2], 16), parseInt(mRgb[3] + mRgb[3], 16), mapRange(parseInt(mRgb[4] + mRgb[4], 16), 0, 255, 0, 1)];
  }
  const mRrggbb = text.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
  if (mRrggbb) {
    return [parseInt(mRrggbb[1], 16), parseInt(mRrggbb[2], 16), parseInt(mRrggbb[3], 16), mapRange(parseInt(mRrggbb[4], 16), 0, 255, 0, 1)];
  }
  return null;
}
function parseHexRgbaColor(text) {
  const comps = parseHexRgbaColorComponents(text);
  return comps ? new IntColor(comps, 'rgb') : null;
}
function parseObjectRgbColorComponents(text) {
  const m = text.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
  if (!m) {
    return null;
  }
  const comps = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
    return null;
  }
  return comps;
}
function createObjectRgbColorParser(type) {
  return text => {
    const comps = parseObjectRgbColorComponents(text);
    return comps ? createColor(comps, 'rgb', type) : null;
  };
}
function parseObjectRgbaColorComponents(text) {
  const m = text.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
  if (!m) {
    return null;
  }
  const comps = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), parseFloat(m[4])];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
    return null;
  }
  return comps;
}
function createObjectRgbaColorParser(type) {
  return text => {
    const comps = parseObjectRgbaColorComponents(text);
    return comps ? createColor(comps, 'rgb', type) : null;
  };
}
const PARSER_AND_RESULT = [{
  parser: parseHexRgbColorComponents,
  result: {
    alpha: false,
    mode: 'rgb',
    notation: 'hex'
  }
}, {
  parser: parseHexRgbaColorComponents,
  result: {
    alpha: true,
    mode: 'rgb',
    notation: 'hex'
  }
}, {
  parser: parseFunctionalRgbColorComponents,
  result: {
    alpha: false,
    mode: 'rgb',
    notation: 'func'
  }
}, {
  parser: parseFunctionalRgbaColorComponents,
  result: {
    alpha: true,
    mode: 'rgb',
    notation: 'func'
  }
}, {
  parser: parseFunctionalHslColorComponents,
  result: {
    alpha: false,
    mode: 'hsl',
    notation: 'func'
  }
}, {
  parser: parseHslaColorComponents,
  result: {
    alpha: true,
    mode: 'hsl',
    notation: 'func'
  }
}, {
  parser: parseObjectRgbColorComponents,
  result: {
    alpha: false,
    mode: 'rgb',
    notation: 'object'
  }
}, {
  parser: parseObjectRgbaColorComponents,
  result: {
    alpha: true,
    mode: 'rgb',
    notation: 'object'
  }
}];
function detectStringColor(text) {
  return PARSER_AND_RESULT.reduce((prev, {
    parser,
    result: detection
  }) => {
    if (prev) {
      return prev;
    }
    return parser(text) ? detection : null;
  }, null);
}
function detectStringColorFormat(text, type = 'int') {
  const r = detectStringColor(text);
  if (!r) {
    return null;
  }
  if (r.notation === 'hex' && type !== 'float') {
    return Object.assign(Object.assign({}, r), {
      type: 'int'
    });
  }
  if (r.notation === 'func') {
    return Object.assign(Object.assign({}, r), {
      type: type
    });
  }
  return null;
}
function createColorStringParser(type) {
  const parsers = [parseHexRgbColor, parseHexRgbaColor, parseFunctionalRgbColor, parseFunctionalRgbaColor, parseFunctionalHslColor, parseFunctionalHslaColor];
  if (type === 'int') {
    parsers.push(createObjectRgbColorParser('int'), createObjectRgbaColorParser('int'));
  }
  if (type === 'float') {
    parsers.push(createObjectRgbColorParser('float'), createObjectRgbaColorParser('float'));
  }
  const parser = composeParsers(parsers);
  return text => {
    const result = parser(text);
    return result ? mapColorType(result, type) : null;
  };
}
function readIntColorString(value) {
  const parser = createColorStringParser('int');
  if (typeof value !== 'string') {
    return IntColor.black();
  }
  const result = parser(value);
  return result !== null && result !== void 0 ? result : IntColor.black();
}
function zerofill(comp) {
  const hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function colorToHexRgbString(value, prefix = '#') {
  const hexes = removeAlphaComponent(value.getComponents('rgb')).map(zerofill).join('');
  return `${prefix}${hexes}`;
}
function colorToHexRgbaString(value, prefix = '#') {
  const rgbaComps = value.getComponents('rgb');
  const hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255].map(zerofill).join('');
  return `${prefix}${hexes}`;
}
function colorToFunctionalRgbString(value) {
  const formatter = createNumberFormatter(0);
  const ci = mapColorType(value, 'int');
  const comps = removeAlphaComponent(ci.getComponents('rgb')).map(comp => formatter(comp));
  return `rgb(${comps.join(', ')})`;
}
function colorToFunctionalRgbaString(value) {
  const aFormatter = createNumberFormatter(2);
  const rgbFormatter = createNumberFormatter(0);
  const ci = mapColorType(value, 'int');
  const comps = ci.getComponents('rgb').map((comp, index) => {
    const formatter = index === 3 ? aFormatter : rgbFormatter;
    return formatter(comp);
  });
  return `rgba(${comps.join(', ')})`;
}
function colorToFunctionalHslString(value) {
  const formatters = [createNumberFormatter(0), formatPercentage, formatPercentage];
  const ci = mapColorType(value, 'int');
  const comps = removeAlphaComponent(ci.getComponents('hsl')).map((comp, index) => formatters[index](comp));
  return `hsl(${comps.join(', ')})`;
}
function colorToFunctionalHslaString(value) {
  const formatters = [createNumberFormatter(0), formatPercentage, formatPercentage, createNumberFormatter(2)];
  const ci = mapColorType(value, 'int');
  const comps = ci.getComponents('hsl').map((comp, index) => formatters[index](comp));
  return `hsla(${comps.join(', ')})`;
}
function colorToObjectRgbString(value, type) {
  const formatter = createNumberFormatter(type === 'float' ? 2 : 0);
  const names = ['r', 'g', 'b'];
  const cc = mapColorType(value, type);
  const comps = removeAlphaComponent(cc.getComponents('rgb')).map((comp, index) => `${names[index]}: ${formatter(comp)}`);
  return `{${comps.join(', ')}}`;
}
function createObjectRgbColorFormatter(type) {
  return value => colorToObjectRgbString(value, type);
}
function colorToObjectRgbaString(value, type) {
  const aFormatter = createNumberFormatter(2);
  const rgbFormatter = createNumberFormatter(type === 'float' ? 2 : 0);
  const names = ['r', 'g', 'b', 'a'];
  const cc = mapColorType(value, type);
  const comps = cc.getComponents('rgb').map((comp, index) => {
    const formatter = index === 3 ? aFormatter : rgbFormatter;
    return `${names[index]}: ${formatter(comp)}`;
  });
  return `{${comps.join(', ')}}`;
}
function createObjectRgbaColorFormatter(type) {
  return value => colorToObjectRgbaString(value, type);
}
const FORMAT_AND_STRINGIFIERS = [{
  format: {
    alpha: false,
    mode: 'rgb',
    notation: 'hex',
    type: 'int'
  },
  stringifier: colorToHexRgbString
}, {
  format: {
    alpha: true,
    mode: 'rgb',
    notation: 'hex',
    type: 'int'
  },
  stringifier: colorToHexRgbaString
}, {
  format: {
    alpha: false,
    mode: 'rgb',
    notation: 'func',
    type: 'int'
  },
  stringifier: colorToFunctionalRgbString
}, {
  format: {
    alpha: true,
    mode: 'rgb',
    notation: 'func',
    type: 'int'
  },
  stringifier: colorToFunctionalRgbaString
}, {
  format: {
    alpha: false,
    mode: 'hsl',
    notation: 'func',
    type: 'int'
  },
  stringifier: colorToFunctionalHslString
}, {
  format: {
    alpha: true,
    mode: 'hsl',
    notation: 'func',
    type: 'int'
  },
  stringifier: colorToFunctionalHslaString
}, ...['int', 'float'].reduce((prev, type) => {
  return [...prev, {
    format: {
      alpha: false,
      mode: 'rgb',
      notation: 'object',
      type: type
    },
    stringifier: createObjectRgbColorFormatter(type)
  }, {
    format: {
      alpha: true,
      mode: 'rgb',
      notation: 'object',
      type: type
    },
    stringifier: createObjectRgbaColorFormatter(type)
  }];
}, [])];
function findColorStringifier(format) {
  return FORMAT_AND_STRINGIFIERS.reduce((prev, fas) => {
    if (prev) {
      return prev;
    }
    return equalsStringColorFormat(fas.format, format) ? fas.stringifier : null;
  }, null);
}
const cn$b = ClassName('apl');
class APaletteView {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.value = config.value;
    this.value.emitter.on('change', this.onValueChange_);
    this.element = doc.createElement('div');
    this.element.classList.add(cn$b());
    config.viewProps.bindClassModifiers(this.element);
    config.viewProps.bindTabIndex(this.element);
    const barElem = doc.createElement('div');
    barElem.classList.add(cn$b('b'));
    this.element.appendChild(barElem);
    const colorElem = doc.createElement('div');
    colorElem.classList.add(cn$b('c'));
    barElem.appendChild(colorElem);
    this.colorElem_ = colorElem;
    const markerElem = doc.createElement('div');
    markerElem.classList.add(cn$b('m'));
    this.element.appendChild(markerElem);
    this.markerElem_ = markerElem;
    const previewElem = doc.createElement('div');
    previewElem.classList.add(cn$b('p'));
    this.markerElem_.appendChild(previewElem);
    this.previewElem_ = previewElem;
    this.update_();
  }
  update_() {
    const c = this.value.rawValue;
    const rgbaComps = c.getComponents('rgb');
    const leftColor = new IntColor([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], 'rgb');
    const rightColor = new IntColor([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], 'rgb');
    const gradientComps = ['to right', colorToFunctionalRgbaString(leftColor), colorToFunctionalRgbaString(rightColor)];
    this.colorElem_.style.background = `linear-gradient(${gradientComps.join(',')})`;
    this.previewElem_.style.backgroundColor = colorToFunctionalRgbaString(c);
    const left = mapRange(rgbaComps[3], 0, 1, 0, 100);
    this.markerElem_.style.left = `${left}%`;
  }
  onValueChange_() {
    this.update_();
  }
}
class APaletteController {
  constructor(doc, config) {
    this.onKeyDown_ = this.onKeyDown_.bind(this);
    this.onKeyUp_ = this.onKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new APaletteView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.element);
    this.ptHandler_.emitter.on('down', this.onPointerDown_);
    this.ptHandler_.emitter.on('move', this.onPointerMove_);
    this.ptHandler_.emitter.on('up', this.onPointerUp_);
    this.view.element.addEventListener('keydown', this.onKeyDown_);
    this.view.element.addEventListener('keyup', this.onKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    const alpha = d.point.x / d.bounds.width;
    const c = this.value.rawValue;
    const [h, s, v] = c.getComponents('hsv');
    this.value.setRawValue(new IntColor([h, s, v, alpha], 'hsv'), opts);
  }
  onPointerDown_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onKeyDown_(ev) {
    const step = getStepForKey(getKeyScaleForColor(true), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    const c = this.value.rawValue;
    const [h, s, v, a] = c.getComponents('hsv');
    this.value.setRawValue(new IntColor([h, s, v, a + step], 'hsv'), {
      forceEmit: false,
      last: false
    });
  }
  onKeyUp_(ev) {
    const step = getStepForKey(getKeyScaleForColor(true), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
}
const cn$a = ClassName('coltxt');
function createModeSelectElement(doc) {
  const selectElem = doc.createElement('select');
  const items = [{
    text: 'RGB',
    value: 'rgb'
  }, {
    text: 'HSL',
    value: 'hsl'
  }, {
    text: 'HSV',
    value: 'hsv'
  }, {
    text: 'HEX',
    value: 'hex'
  }];
  selectElem.appendChild(items.reduce((frag, item) => {
    const optElem = doc.createElement('option');
    optElem.textContent = item.text;
    optElem.value = item.value;
    frag.appendChild(optElem);
    return frag;
  }, doc.createDocumentFragment()));
  return selectElem;
}
class ColorTextsView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$a());
    config.viewProps.bindClassModifiers(this.element);
    const modeElem = doc.createElement('div');
    modeElem.classList.add(cn$a('m'));
    this.modeElem_ = createModeSelectElement(doc);
    this.modeElem_.classList.add(cn$a('ms'));
    modeElem.appendChild(this.modeSelectElement);
    config.viewProps.bindDisabled(this.modeElem_);
    const modeMarkerElem = doc.createElement('div');
    modeMarkerElem.classList.add(cn$a('mm'));
    modeMarkerElem.appendChild(createSvgIconElement(doc, 'dropdown'));
    modeElem.appendChild(modeMarkerElem);
    this.element.appendChild(modeElem);
    const inputsElem = doc.createElement('div');
    inputsElem.classList.add(cn$a('w'));
    this.element.appendChild(inputsElem);
    this.inputsElem_ = inputsElem;
    this.inputViews_ = config.inputViews;
    this.applyInputViews_();
    bindValue(config.mode, mode => {
      this.modeElem_.value = mode;
    });
  }
  get modeSelectElement() {
    return this.modeElem_;
  }
  get inputViews() {
    return this.inputViews_;
  }
  set inputViews(inputViews) {
    this.inputViews_ = inputViews;
    this.applyInputViews_();
  }
  applyInputViews_() {
    removeChildElements(this.inputsElem_);
    const doc = this.element.ownerDocument;
    this.inputViews_.forEach(v => {
      const compElem = doc.createElement('div');
      compElem.classList.add(cn$a('c'));
      compElem.appendChild(v.element);
      this.inputsElem_.appendChild(compElem);
    });
  }
}
function createFormatter$2(type) {
  return createNumberFormatter(type === 'float' ? 2 : 0);
}
function createConstraint$5(mode, type, index) {
  const max = getColorMaxComponents(mode, type)[index];
  return new DefiniteRangeConstraint({
    min: 0,
    max: max
  });
}
function createComponentController(doc, config, index) {
  return new NumberTextController(doc, {
    arrayPosition: index === 0 ? 'fst' : index === 3 - 1 ? 'lst' : 'mid',
    parser: config.parser,
    props: ValueMap.fromObject({
      formatter: createFormatter$2(config.colorType),
      keyScale: getKeyScaleForColor(false),
      pointerScale: config.colorType === 'float' ? 0.01 : 1
    }),
    value: createValue(0, {
      constraint: createConstraint$5(config.colorMode, config.colorType, index)
    }),
    viewProps: config.viewProps
  });
}
function createComponentControllers(doc, config) {
  const cc = {
    colorMode: config.colorMode,
    colorType: config.colorType,
    parser: parseNumber,
    viewProps: config.viewProps
  };
  return [0, 1, 2].map(i => {
    const c = createComponentController(doc, cc, i);
    connectValues({
      primary: config.value,
      secondary: c.value,
      forward(p) {
        const mc = mapColorType(p, config.colorType);
        return mc.getComponents(config.colorMode)[i];
      },
      backward(p, s) {
        const pickedMode = config.colorMode;
        const mc = mapColorType(p, config.colorType);
        const comps = mc.getComponents(pickedMode);
        comps[i] = s;
        const c = createColor(appendAlphaComponent(removeAlphaComponent(comps), comps[3]), pickedMode, config.colorType);
        return mapColorType(c, 'int');
      }
    });
    return c;
  });
}
function createHexController(doc, config) {
  const c = new TextController(doc, {
    parser: createColorStringParser('int'),
    props: ValueMap.fromObject({
      formatter: colorToHexRgbString
    }),
    value: createValue(IntColor.black()),
    viewProps: config.viewProps
  });
  connectValues({
    primary: config.value,
    secondary: c.value,
    forward: p => new IntColor(removeAlphaComponent(p.getComponents()), p.mode),
    backward: (p, s) => new IntColor(appendAlphaComponent(removeAlphaComponent(s.getComponents(p.mode)), p.getComponents()[3]), p.mode)
  });
  return [c];
}
function isColorMode(mode) {
  return mode !== 'hex';
}
class ColorTextsController {
  constructor(doc, config) {
    this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
    this.colorType_ = config.colorType;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.colorMode = createValue(this.value.rawValue.mode);
    this.ccs_ = this.createComponentControllers_(doc);
    this.view = new ColorTextsView(doc, {
      mode: this.colorMode,
      inputViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view],
      viewProps: this.viewProps
    });
    this.view.modeSelectElement.addEventListener('change', this.onModeSelectChange_);
  }
  createComponentControllers_(doc) {
    const mode = this.colorMode.rawValue;
    if (isColorMode(mode)) {
      return createComponentControllers(doc, {
        colorMode: mode,
        colorType: this.colorType_,
        value: this.value,
        viewProps: this.viewProps
      });
    }
    return createHexController(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
  }
  onModeSelectChange_(ev) {
    const selectElem = ev.currentTarget;
    this.colorMode.rawValue = selectElem.value;
    this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
    this.view.inputViews = this.ccs_.map(cc => cc.view);
  }
}
const cn$9 = ClassName('hpl');
class HPaletteView {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.value = config.value;
    this.value.emitter.on('change', this.onValueChange_);
    this.element = doc.createElement('div');
    this.element.classList.add(cn$9());
    config.viewProps.bindClassModifiers(this.element);
    config.viewProps.bindTabIndex(this.element);
    const colorElem = doc.createElement('div');
    colorElem.classList.add(cn$9('c'));
    this.element.appendChild(colorElem);
    const markerElem = doc.createElement('div');
    markerElem.classList.add(cn$9('m'));
    this.element.appendChild(markerElem);
    this.markerElem_ = markerElem;
    this.update_();
  }
  update_() {
    const c = this.value.rawValue;
    const [h] = c.getComponents('hsv');
    this.markerElem_.style.backgroundColor = colorToFunctionalRgbString(new IntColor([h, 100, 100], 'hsv'));
    const left = mapRange(h, 0, 360, 0, 100);
    this.markerElem_.style.left = `${left}%`;
  }
  onValueChange_() {
    this.update_();
  }
}
class HPaletteController {
  constructor(doc, config) {
    this.onKeyDown_ = this.onKeyDown_.bind(this);
    this.onKeyUp_ = this.onKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new HPaletteView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.element);
    this.ptHandler_.emitter.on('down', this.onPointerDown_);
    this.ptHandler_.emitter.on('move', this.onPointerMove_);
    this.ptHandler_.emitter.on('up', this.onPointerUp_);
    this.view.element.addEventListener('keydown', this.onKeyDown_);
    this.view.element.addEventListener('keyup', this.onKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    const hue = mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, 0, 360);
    const c = this.value.rawValue;
    const [, s, v, a] = c.getComponents('hsv');
    this.value.setRawValue(new IntColor([hue, s, v, a], 'hsv'), opts);
  }
  onPointerDown_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onKeyDown_(ev) {
    const step = getStepForKey(getKeyScaleForColor(false), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    const c = this.value.rawValue;
    const [h, s, v, a] = c.getComponents('hsv');
    this.value.setRawValue(new IntColor([h + step, s, v, a], 'hsv'), {
      forceEmit: false,
      last: false
    });
  }
  onKeyUp_(ev) {
    const step = getStepForKey(getKeyScaleForColor(false), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
}
const cn$8 = ClassName('svp');
const CANVAS_RESOL = 64;
class SvPaletteView {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.value = config.value;
    this.value.emitter.on('change', this.onValueChange_);
    this.element = doc.createElement('div');
    this.element.classList.add(cn$8());
    config.viewProps.bindClassModifiers(this.element);
    config.viewProps.bindTabIndex(this.element);
    const canvasElem = doc.createElement('canvas');
    canvasElem.height = CANVAS_RESOL;
    canvasElem.width = CANVAS_RESOL;
    canvasElem.classList.add(cn$8('c'));
    this.element.appendChild(canvasElem);
    this.canvasElement = canvasElem;
    const markerElem = doc.createElement('div');
    markerElem.classList.add(cn$8('m'));
    this.element.appendChild(markerElem);
    this.markerElem_ = markerElem;
    this.update_();
  }
  update_() {
    const ctx = getCanvasContext(this.canvasElement);
    if (!ctx) {
      return;
    }
    const c = this.value.rawValue;
    const hsvComps = c.getComponents('hsv');
    const width = this.canvasElement.width;
    const height = this.canvasElement.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let iy = 0; iy < height; iy++) {
      for (let ix = 0; ix < width; ix++) {
        const s = mapRange(ix, 0, width, 0, 100);
        const v = mapRange(iy, 0, height, 100, 0);
        const rgbComps = hsvToRgbInt(hsvComps[0], s, v);
        const i = (iy * width + ix) * 4;
        data[i] = rgbComps[0];
        data[i + 1] = rgbComps[1];
        data[i + 2] = rgbComps[2];
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    const left = mapRange(hsvComps[1], 0, 100, 0, 100);
    this.markerElem_.style.left = `${left}%`;
    const top = mapRange(hsvComps[2], 0, 100, 100, 0);
    this.markerElem_.style.top = `${top}%`;
  }
  onValueChange_() {
    this.update_();
  }
}
class SvPaletteController {
  constructor(doc, config) {
    this.onKeyDown_ = this.onKeyDown_.bind(this);
    this.onKeyUp_ = this.onKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new SvPaletteView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.element);
    this.ptHandler_.emitter.on('down', this.onPointerDown_);
    this.ptHandler_.emitter.on('move', this.onPointerMove_);
    this.ptHandler_.emitter.on('up', this.onPointerUp_);
    this.view.element.addEventListener('keydown', this.onKeyDown_);
    this.view.element.addEventListener('keyup', this.onKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    const saturation = mapRange(d.point.x, 0, d.bounds.width, 0, 100);
    const value = mapRange(d.point.y, 0, d.bounds.height, 100, 0);
    const [h,,, a] = this.value.rawValue.getComponents('hsv');
    this.value.setRawValue(new IntColor([h, saturation, value, a], 'hsv'), opts);
  }
  onPointerDown_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onKeyDown_(ev) {
    if (isArrowKey(ev.key)) {
      ev.preventDefault();
    }
    const [h, s, v, a] = this.value.rawValue.getComponents('hsv');
    const keyScale = getKeyScaleForColor(false);
    const ds = getStepForKey(keyScale, getHorizontalStepKeys(ev));
    const dv = getStepForKey(keyScale, getVerticalStepKeys(ev));
    if (ds === 0 && dv === 0) {
      return;
    }
    this.value.setRawValue(new IntColor([h, s + ds, v + dv, a], 'hsv'), {
      forceEmit: false,
      last: false
    });
  }
  onKeyUp_(ev) {
    const keyScale = getKeyScaleForColor(false);
    const ds = getStepForKey(keyScale, getHorizontalStepKeys(ev));
    const dv = getStepForKey(keyScale, getVerticalStepKeys(ev));
    if (ds === 0 && dv === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
}
class ColorPickerController {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.hPaletteC_ = new HPaletteController(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.svPaletteC_ = new SvPaletteController(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.alphaIcs_ = config.supportsAlpha ? {
      palette: new APaletteController(doc, {
        value: this.value,
        viewProps: this.viewProps
      }),
      text: new NumberTextController(doc, {
        parser: parseNumber,
        props: ValueMap.fromObject({
          pointerScale: 0.01,
          keyScale: 0.1,
          formatter: createNumberFormatter(2)
        }),
        value: createValue(0, {
          constraint: new DefiniteRangeConstraint({
            min: 0,
            max: 1
          })
        }),
        viewProps: this.viewProps
      })
    } : null;
    if (this.alphaIcs_) {
      connectValues({
        primary: this.value,
        secondary: this.alphaIcs_.text.value,
        forward: p => p.getComponents()[3],
        backward: (p, s) => {
          const comps = p.getComponents();
          comps[3] = s;
          return new IntColor(comps, p.mode);
        }
      });
    }
    this.textsC_ = new ColorTextsController(doc, {
      colorType: config.colorType,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view = new ColorPickerView(doc, {
      alphaViews: this.alphaIcs_ ? {
        palette: this.alphaIcs_.palette.view,
        text: this.alphaIcs_.text.view
      } : null,
      hPaletteView: this.hPaletteC_.view,
      supportsAlpha: config.supportsAlpha,
      svPaletteView: this.svPaletteC_.view,
      textsView: this.textsC_.view,
      viewProps: this.viewProps
    });
  }
  get textsController() {
    return this.textsC_;
  }
}
const cn$7 = ClassName('colsw');
class ColorSwatchView {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    config.value.emitter.on('change', this.onValueChange_);
    this.value = config.value;
    this.element = doc.createElement('div');
    this.element.classList.add(cn$7());
    config.viewProps.bindClassModifiers(this.element);
    const swatchElem = doc.createElement('div');
    swatchElem.classList.add(cn$7('sw'));
    this.element.appendChild(swatchElem);
    this.swatchElem_ = swatchElem;
    const buttonElem = doc.createElement('button');
    buttonElem.classList.add(cn$7('b'));
    config.viewProps.bindDisabled(buttonElem);
    this.element.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    this.update_();
  }
  update_() {
    const value = this.value.rawValue;
    this.swatchElem_.style.backgroundColor = colorToHexRgbaString(value);
  }
  onValueChange_() {
    this.update_();
  }
}
class ColorSwatchController {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new ColorSwatchView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
  }
}
class ColorController {
  constructor(doc, config) {
    this.onButtonBlur_ = this.onButtonBlur_.bind(this);
    this.onButtonClick_ = this.onButtonClick_.bind(this);
    this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
    this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.foldable_ = Foldable.create(config.expanded);
    this.swatchC_ = new ColorSwatchController(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    const buttonElem = this.swatchC_.view.buttonElement;
    buttonElem.addEventListener('blur', this.onButtonBlur_);
    buttonElem.addEventListener('click', this.onButtonClick_);
    this.textC_ = new TextController(doc, {
      parser: config.parser,
      props: ValueMap.fromObject({
        formatter: config.formatter
      }),
      value: this.value,
      viewProps: this.viewProps
    });
    this.view = new ColorView(doc, {
      foldable: this.foldable_,
      pickerLayout: config.pickerLayout
    });
    this.view.swatchElement.appendChild(this.swatchC_.view.element);
    this.view.textElement.appendChild(this.textC_.view.element);
    this.popC_ = config.pickerLayout === 'popup' ? new PopupController(doc, {
      viewProps: this.viewProps
    }) : null;
    const pickerC = new ColorPickerController(doc, {
      colorType: config.colorType,
      supportsAlpha: config.supportsAlpha,
      value: this.value,
      viewProps: this.viewProps
    });
    pickerC.view.allFocusableElements.forEach(elem => {
      elem.addEventListener('blur', this.onPopupChildBlur_);
      elem.addEventListener('keydown', this.onPopupChildKeydown_);
    });
    this.pickerC_ = pickerC;
    if (this.popC_) {
      this.view.element.appendChild(this.popC_.view.element);
      this.popC_.view.element.appendChild(pickerC.view.element);
      connectValues({
        primary: this.foldable_.value('expanded'),
        secondary: this.popC_.shows,
        forward: p => p,
        backward: (_, s) => s
      });
    } else if (this.view.pickerElement) {
      this.view.pickerElement.appendChild(this.pickerC_.view.element);
      bindFoldable(this.foldable_, this.view.pickerElement);
    }
  }
  get textController() {
    return this.textC_;
  }
  onButtonBlur_(e) {
    if (!this.popC_) {
      return;
    }
    const elem = this.view.element;
    const nextTarget = forceCast(e.relatedTarget);
    if (!nextTarget || !elem.contains(nextTarget)) {
      this.popC_.shows.rawValue = false;
    }
  }
  onButtonClick_() {
    this.foldable_.set('expanded', !this.foldable_.get('expanded'));
    if (this.foldable_.get('expanded')) {
      this.pickerC_.view.allFocusableElements[0].focus();
    }
  }
  onPopupChildBlur_(ev) {
    if (!this.popC_) {
      return;
    }
    const elem = this.popC_.view.element;
    const nextTarget = findNextTarget(ev);
    if (nextTarget && elem.contains(nextTarget)) {
      return;
    }
    if (nextTarget && nextTarget === this.swatchC_.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
      return;
    }
    this.popC_.shows.rawValue = false;
  }
  onPopupChildKeydown_(ev) {
    if (this.popC_) {
      if (ev.key === 'Escape') {
        this.popC_.shows.rawValue = false;
      }
    } else if (this.view.pickerElement) {
      if (ev.key === 'Escape') {
        this.swatchC_.view.buttonElement.focus();
      }
    }
  }
}
function colorToRgbNumber(value) {
  return removeAlphaComponent(value.getComponents('rgb')).reduce((result, comp) => {
    return result << 8 | Math.floor(comp) & 0xff;
  }, 0);
}
function colorToRgbaNumber(value) {
  return value.getComponents('rgb').reduce((result, comp, index) => {
    const hex = Math.floor(index === 3 ? comp * 255 : comp) & 0xff;
    return result << 8 | hex;
  }, 0) >>> 0;
}
function numberToRgbColor(num) {
  return new IntColor([num >> 16 & 0xff, num >> 8 & 0xff, num & 0xff], 'rgb');
}
function numberToRgbaColor(num) {
  return new IntColor([num >> 24 & 0xff, num >> 16 & 0xff, num >> 8 & 0xff, mapRange(num & 0xff, 0, 255, 0, 1)], 'rgb');
}
function colorFromRgbNumber(value) {
  if (typeof value !== 'number') {
    return IntColor.black();
  }
  return numberToRgbColor(value);
}
function colorFromRgbaNumber(value) {
  if (typeof value !== 'number') {
    return IntColor.black();
  }
  return numberToRgbaColor(value);
}
function isRgbColorComponent(obj, key) {
  if (typeof obj !== 'object' || isEmpty(obj)) {
    return false;
  }
  return key in obj && typeof obj[key] === 'number';
}
function isRgbColorObject(obj) {
  return isRgbColorComponent(obj, 'r') && isRgbColorComponent(obj, 'g') && isRgbColorComponent(obj, 'b');
}
function isRgbaColorObject(obj) {
  return isRgbColorObject(obj) && isRgbColorComponent(obj, 'a');
}
function isColorObject(obj) {
  return isRgbColorObject(obj);
}
function equalsColor(v1, v2) {
  if (v1.mode !== v2.mode) {
    return false;
  }
  if (v1.type !== v2.type) {
    return false;
  }
  const comps1 = v1.getComponents();
  const comps2 = v2.getComponents();
  for (let i = 0; i < comps1.length; i++) {
    if (comps1[i] !== comps2[i]) {
      return false;
    }
  }
  return true;
}
function createColorComponentsFromRgbObject(obj) {
  return 'a' in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
}
function createColorStringWriter(format) {
  const stringify = findColorStringifier(format);
  return stringify ? (target, value) => {
    writePrimitive(target, stringify(value));
  } : null;
}
function createColorNumberWriter(supportsAlpha) {
  const colorToNumber = supportsAlpha ? colorToRgbaNumber : colorToRgbNumber;
  return (target, value) => {
    writePrimitive(target, colorToNumber(value));
  };
}
function writeRgbaColorObject(target, value, type) {
  const cc = mapColorType(value, type);
  const obj = cc.toRgbaObject();
  target.writeProperty('r', obj.r);
  target.writeProperty('g', obj.g);
  target.writeProperty('b', obj.b);
  target.writeProperty('a', obj.a);
}
function writeRgbColorObject(target, value, type) {
  const cc = mapColorType(value, type);
  const obj = cc.toRgbaObject();
  target.writeProperty('r', obj.r);
  target.writeProperty('g', obj.g);
  target.writeProperty('b', obj.b);
}
function createColorObjectWriter(supportsAlpha, type) {
  return (target, inValue) => {
    if (supportsAlpha) {
      writeRgbaColorObject(target, inValue, type);
    } else {
      writeRgbColorObject(target, inValue, type);
    }
  };
}
function shouldSupportAlpha$1(inputParams) {
  var _a;
  if ((_a = inputParams === null || inputParams === void 0 ? void 0 : inputParams.color) === null || _a === void 0 ? void 0 : _a.alpha) {
    return true;
  }
  return false;
}
function createFormatter$1(supportsAlpha) {
  return supportsAlpha ? v => colorToHexRgbaString(v, '0x') : v => colorToHexRgbString(v, '0x');
}
function isForColor(params) {
  if ('color' in params) {
    return true;
  }
  if (params.view === 'color') {
    return true;
  }
  return false;
}
const NumberColorInputPlugin = createPlugin({
  id: 'input-color-number',
  type: 'input',
  accept: (value, params) => {
    if (typeof value !== 'number') {
      return null;
    }
    if (!isForColor(params)) {
      return null;
    }
    const result = parseColorInputParams(params);
    return result ? {
      initialValue: value,
      params: Object.assign(Object.assign({}, result), {
        supportsAlpha: shouldSupportAlpha$1(params)
      })
    } : null;
  },
  binding: {
    reader: args => {
      return args.params.supportsAlpha ? colorFromRgbaNumber : colorFromRgbNumber;
    },
    equals: equalsColor,
    writer: args => {
      return createColorNumberWriter(args.params.supportsAlpha);
    }
  },
  controller: args => {
    var _a, _b;
    return new ColorController(args.document, {
      colorType: 'int',
      expanded: (_a = args.params.expanded) !== null && _a !== void 0 ? _a : false,
      formatter: createFormatter$1(args.params.supportsAlpha),
      parser: createColorStringParser('int'),
      pickerLayout: (_b = args.params.picker) !== null && _b !== void 0 ? _b : 'popup',
      supportsAlpha: args.params.supportsAlpha,
      value: args.value,
      viewProps: args.viewProps
    });
  }
});
function colorFromObject(value, type) {
  if (!isColorObject(value)) {
    return mapColorType(IntColor.black(), type);
  }
  if (type === 'int') {
    const comps = createColorComponentsFromRgbObject(value);
    return new IntColor(comps, 'rgb');
  }
  if (type === 'float') {
    const comps = createColorComponentsFromRgbObject(value);
    return new FloatColor(comps, 'rgb');
  }
  return mapColorType(IntColor.black(), 'int');
}
function shouldSupportAlpha(initialValue) {
  return isRgbaColorObject(initialValue);
}
function createColorObjectBindingReader(type) {
  return value => {
    const c = colorFromObject(value, type);
    return mapColorType(c, 'int');
  };
}
function createColorObjectFormatter(supportsAlpha, type) {
  return value => {
    if (supportsAlpha) {
      return colorToObjectRgbaString(value, type);
    }
    return colorToObjectRgbString(value, type);
  };
}
const ObjectColorInputPlugin = createPlugin({
  id: 'input-color-object',
  type: 'input',
  accept: (value, params) => {
    var _a;
    if (!isColorObject(value)) {
      return null;
    }
    const result = parseColorInputParams(params);
    return result ? {
      initialValue: value,
      params: Object.assign(Object.assign({}, result), {
        colorType: (_a = extractColorType(params)) !== null && _a !== void 0 ? _a : 'int'
      })
    } : null;
  },
  binding: {
    reader: args => createColorObjectBindingReader(args.params.colorType),
    equals: equalsColor,
    writer: args => createColorObjectWriter(shouldSupportAlpha(args.initialValue), args.params.colorType)
  },
  controller: args => {
    var _a, _b;
    const supportsAlpha = isRgbaColorObject(args.initialValue);
    return new ColorController(args.document, {
      colorType: args.params.colorType,
      expanded: (_a = args.params.expanded) !== null && _a !== void 0 ? _a : false,
      formatter: createColorObjectFormatter(supportsAlpha, args.params.colorType),
      parser: createColorStringParser('int'),
      pickerLayout: (_b = args.params.picker) !== null && _b !== void 0 ? _b : 'popup',
      supportsAlpha: supportsAlpha,
      value: args.value,
      viewProps: args.viewProps
    });
  }
});
const StringColorInputPlugin = createPlugin({
  id: 'input-color-string',
  type: 'input',
  accept: (value, params) => {
    if (typeof value !== 'string') {
      return null;
    }
    if (params.view === 'text') {
      return null;
    }
    const format = detectStringColorFormat(value, extractColorType(params));
    if (!format) {
      return null;
    }
    const stringifier = findColorStringifier(format);
    if (!stringifier) {
      return null;
    }
    const result = parseColorInputParams(params);
    return result ? {
      initialValue: value,
      params: Object.assign(Object.assign({}, result), {
        format: format,
        stringifier: stringifier
      })
    } : null;
  },
  binding: {
    reader: () => readIntColorString,
    equals: equalsColor,
    writer: args => {
      const writer = createColorStringWriter(args.params.format);
      if (!writer) {
        throw TpError.notBindable();
      }
      return writer;
    }
  },
  controller: args => {
    var _a, _b;
    return new ColorController(args.document, {
      colorType: args.params.format.type,
      expanded: (_a = args.params.expanded) !== null && _a !== void 0 ? _a : false,
      formatter: args.params.stringifier,
      parser: createColorStringParser('int'),
      pickerLayout: (_b = args.params.picker) !== null && _b !== void 0 ? _b : 'popup',
      supportsAlpha: args.params.format.alpha,
      value: args.value,
      viewProps: args.viewProps
    });
  }
});
class PointNdConstraint {
  constructor(config) {
    this.components = config.components;
    this.asm_ = config.assembly;
  }
  constrain(value) {
    const comps = this.asm_.toComponents(value).map((comp, index) => {
      var _a, _b;
      return (_b = (_a = this.components[index]) === null || _a === void 0 ? void 0 : _a.constrain(comp)) !== null && _b !== void 0 ? _b : comp;
    });
    return this.asm_.fromComponents(comps);
  }
}
const cn$6 = ClassName('pndtxt');
class PointNdTextView {
  constructor(doc, config) {
    this.textViews = config.textViews;
    this.element = doc.createElement('div');
    this.element.classList.add(cn$6());
    this.textViews.forEach(v => {
      const axisElem = doc.createElement('div');
      axisElem.classList.add(cn$6('a'));
      axisElem.appendChild(v.element);
      this.element.appendChild(axisElem);
    });
  }
}
function createAxisController(doc, config, index) {
  return new NumberTextController(doc, {
    arrayPosition: index === 0 ? 'fst' : index === config.axes.length - 1 ? 'lst' : 'mid',
    parser: config.parser,
    props: config.axes[index].textProps,
    value: createValue(0, {
      constraint: config.axes[index].constraint
    }),
    viewProps: config.viewProps
  });
}
class PointNdTextController {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.acs_ = config.axes.map((_, index) => createAxisController(doc, config, index));
    this.acs_.forEach((c, index) => {
      connectValues({
        primary: this.value,
        secondary: c.value,
        forward: p => config.assembly.toComponents(p)[index],
        backward: (p, s) => {
          const comps = config.assembly.toComponents(p);
          comps[index] = s;
          return config.assembly.fromComponents(comps);
        }
      });
    });
    this.view = new PointNdTextView(doc, {
      textViews: this.acs_.map(ac => ac.view)
    });
  }
  get textControllers() {
    return this.acs_;
  }
}
class SliderInputBindingApi extends BindingApi {
  get max() {
    return this.controller.valueController.sliderController.props.get('max');
  }
  set max(max) {
    this.controller.valueController.sliderController.props.set('max', max);
  }
  get min() {
    return this.controller.valueController.sliderController.props.get('min');
  }
  set min(max) {
    this.controller.valueController.sliderController.props.set('min', max);
  }
}
exports.SliderInputBindingApi = SliderInputBindingApi;
function createConstraint$4(params, initialValue) {
  const constraints = [];
  const sc = createStepConstraint(params, initialValue);
  if (sc) {
    constraints.push(sc);
  }
  const rc = createRangeConstraint(params);
  if (rc) {
    constraints.push(rc);
  }
  const lc = createListConstraint(params.options);
  if (lc) {
    constraints.push(lc);
  }
  return new CompositeConstraint(constraints);
}
const NumberInputPlugin = createPlugin({
  id: 'input-number',
  type: 'input',
  accept: (value, params) => {
    if (typeof value !== 'number') {
      return null;
    }
    const result = parseRecord(params, p => Object.assign(Object.assign({}, createNumberTextInputParamsParser(p)), {
      options: p.optional.custom(parseListOptions),
      readonly: p.optional.constant(false)
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: _args => numberFromUnknown,
    constraint: args => createConstraint$4(args.params, args.initialValue),
    writer: _args => writePrimitive
  },
  controller: args => {
    const value = args.value;
    const c = args.constraint;
    const lc = c && findConstraint(c, ListConstraint);
    if (lc) {
      return new ListController(args.document, {
        props: new ValueMap({
          options: lc.values.value('options')
        }),
        value: value,
        viewProps: args.viewProps
      });
    }
    const textPropsObj = createNumberTextPropsObject(args.params, value.rawValue);
    const drc = c && findConstraint(c, DefiniteRangeConstraint);
    if (drc) {
      return new SliderTextController(args.document, Object.assign(Object.assign({}, createSliderTextProps(Object.assign(Object.assign({}, textPropsObj), {
        keyScale: createValue(textPropsObj.keyScale),
        max: drc.values.value('max'),
        min: drc.values.value('min')
      }))), {
        parser: parseNumber,
        value: value,
        viewProps: args.viewProps
      }));
    }
    return new NumberTextController(args.document, {
      parser: parseNumber,
      props: ValueMap.fromObject(textPropsObj),
      value: value,
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (typeof args.controller.value.rawValue !== 'number') {
      return null;
    }
    if (args.controller.valueController instanceof SliderTextController) {
      return new SliderInputBindingApi(args.controller);
    }
    if (args.controller.valueController instanceof ListController) {
      return new ListInputBindingApi(args.controller);
    }
    return null;
  }
});
class Point2d {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  getComponents() {
    return [this.x, this.y];
  }
  static isObject(obj) {
    if (isEmpty(obj)) {
      return false;
    }
    const x = obj.x;
    const y = obj.y;
    if (typeof x !== 'number' || typeof y !== 'number') {
      return false;
    }
    return true;
  }
  static equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y;
  }
  toObject() {
    return {
      x: this.x,
      y: this.y
    };
  }
}
const Point2dAssembly = {
  toComponents: p => p.getComponents(),
  fromComponents: comps => new Point2d(...comps)
};
const cn$5 = ClassName('p2d');
class Point2dView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn$5());
    config.viewProps.bindClassModifiers(this.element);
    bindValue(config.expanded, valueToClassName(this.element, cn$5(undefined, 'expanded')));
    const headElem = doc.createElement('div');
    headElem.classList.add(cn$5('h'));
    this.element.appendChild(headElem);
    const buttonElem = doc.createElement('button');
    buttonElem.classList.add(cn$5('b'));
    buttonElem.appendChild(createSvgIconElement(doc, 'p2dpad'));
    config.viewProps.bindDisabled(buttonElem);
    headElem.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    const textElem = doc.createElement('div');
    textElem.classList.add(cn$5('t'));
    headElem.appendChild(textElem);
    this.textElement = textElem;
    if (config.pickerLayout === 'inline') {
      const pickerElem = doc.createElement('div');
      pickerElem.classList.add(cn$5('p'));
      this.element.appendChild(pickerElem);
      this.pickerElement = pickerElem;
    } else {
      this.pickerElement = null;
    }
  }
}
const cn$4 = ClassName('p2dp');
class Point2dPickerView {
  constructor(doc, config) {
    this.onFoldableChange_ = this.onFoldableChange_.bind(this);
    this.onPropsChange_ = this.onPropsChange_.bind(this);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.props_ = config.props;
    this.props_.emitter.on('change', this.onPropsChange_);
    this.element = doc.createElement('div');
    this.element.classList.add(cn$4());
    if (config.layout === 'popup') {
      this.element.classList.add(cn$4(undefined, 'p'));
    }
    config.viewProps.bindClassModifiers(this.element);
    const padElem = doc.createElement('div');
    padElem.classList.add(cn$4('p'));
    config.viewProps.bindTabIndex(padElem);
    this.element.appendChild(padElem);
    this.padElement = padElem;
    const svgElem = doc.createElementNS(SVG_NS, 'svg');
    svgElem.classList.add(cn$4('g'));
    this.padElement.appendChild(svgElem);
    this.svgElem_ = svgElem;
    const xAxisElem = doc.createElementNS(SVG_NS, 'line');
    xAxisElem.classList.add(cn$4('ax'));
    xAxisElem.setAttributeNS(null, 'x1', '0');
    xAxisElem.setAttributeNS(null, 'y1', '50%');
    xAxisElem.setAttributeNS(null, 'x2', '100%');
    xAxisElem.setAttributeNS(null, 'y2', '50%');
    this.svgElem_.appendChild(xAxisElem);
    const yAxisElem = doc.createElementNS(SVG_NS, 'line');
    yAxisElem.classList.add(cn$4('ax'));
    yAxisElem.setAttributeNS(null, 'x1', '50%');
    yAxisElem.setAttributeNS(null, 'y1', '0');
    yAxisElem.setAttributeNS(null, 'x2', '50%');
    yAxisElem.setAttributeNS(null, 'y2', '100%');
    this.svgElem_.appendChild(yAxisElem);
    const lineElem = doc.createElementNS(SVG_NS, 'line');
    lineElem.classList.add(cn$4('l'));
    lineElem.setAttributeNS(null, 'x1', '50%');
    lineElem.setAttributeNS(null, 'y1', '50%');
    this.svgElem_.appendChild(lineElem);
    this.lineElem_ = lineElem;
    const markerElem = doc.createElement('div');
    markerElem.classList.add(cn$4('m'));
    this.padElement.appendChild(markerElem);
    this.markerElem_ = markerElem;
    config.value.emitter.on('change', this.onValueChange_);
    this.value = config.value;
    this.update_();
  }
  get allFocusableElements() {
    return [this.padElement];
  }
  update_() {
    const [x, y] = this.value.rawValue.getComponents();
    const max = this.props_.get('max');
    const px = mapRange(x, -max, +max, 0, 100);
    const py = mapRange(y, -max, +max, 0, 100);
    const ipy = this.props_.get('invertsY') ? 100 - py : py;
    this.lineElem_.setAttributeNS(null, 'x2', `${px}%`);
    this.lineElem_.setAttributeNS(null, 'y2', `${ipy}%`);
    this.markerElem_.style.left = `${px}%`;
    this.markerElem_.style.top = `${ipy}%`;
  }
  onValueChange_() {
    this.update_();
  }
  onPropsChange_() {
    this.update_();
  }
  onFoldableChange_() {
    this.update_();
  }
}
function computeOffset(ev, keyScales, invertsY) {
  return [getStepForKey(keyScales[0], getHorizontalStepKeys(ev)), getStepForKey(keyScales[1], getVerticalStepKeys(ev)) * (invertsY ? 1 : -1)];
}
class Point2dPickerController {
  constructor(doc, config) {
    this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
    this.onPadKeyUp_ = this.onPadKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.props = config.props;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new Point2dPickerView(doc, {
      layout: config.layout,
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.padElement);
    this.ptHandler_.emitter.on('down', this.onPointerDown_);
    this.ptHandler_.emitter.on('move', this.onPointerMove_);
    this.ptHandler_.emitter.on('up', this.onPointerUp_);
    this.view.padElement.addEventListener('keydown', this.onPadKeyDown_);
    this.view.padElement.addEventListener('keyup', this.onPadKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    const max = this.props.get('max');
    const px = mapRange(d.point.x, 0, d.bounds.width, -max, +max);
    const py = mapRange(this.props.get('invertsY') ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max, +max);
    this.value.setRawValue(new Point2d(px, py), opts);
  }
  onPointerDown_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onPadKeyDown_(ev) {
    if (isArrowKey(ev.key)) {
      ev.preventDefault();
    }
    const [dx, dy] = computeOffset(ev, [this.props.get('xKeyScale'), this.props.get('yKeyScale')], this.props.get('invertsY'));
    if (dx === 0 && dy === 0) {
      return;
    }
    this.value.setRawValue(new Point2d(this.value.rawValue.x + dx, this.value.rawValue.y + dy), {
      forceEmit: false,
      last: false
    });
  }
  onPadKeyUp_(ev) {
    const [dx, dy] = computeOffset(ev, [this.props.get('xKeyScale'), this.props.get('yKeyScale')], this.props.get('invertsY'));
    if (dx === 0 && dy === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
}
class Point2dController {
  constructor(doc, config) {
    var _a, _b;
    this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
    this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
    this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
    this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.foldable_ = Foldable.create(config.expanded);
    this.popC_ = config.pickerLayout === 'popup' ? new PopupController(doc, {
      viewProps: this.viewProps
    }) : null;
    const padC = new Point2dPickerController(doc, {
      layout: config.pickerLayout,
      props: new ValueMap({
        invertsY: createValue(config.invertsY),
        max: createValue(config.max),
        xKeyScale: config.axes[0].textProps.value('keyScale'),
        yKeyScale: config.axes[1].textProps.value('keyScale')
      }),
      value: this.value,
      viewProps: this.viewProps
    });
    padC.view.allFocusableElements.forEach(elem => {
      elem.addEventListener('blur', this.onPopupChildBlur_);
      elem.addEventListener('keydown', this.onPopupChildKeydown_);
    });
    this.pickerC_ = padC;
    this.textC_ = new PointNdTextController(doc, {
      assembly: Point2dAssembly,
      axes: config.axes,
      parser: config.parser,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view = new Point2dView(doc, {
      expanded: this.foldable_.value('expanded'),
      pickerLayout: config.pickerLayout,
      viewProps: this.viewProps
    });
    this.view.textElement.appendChild(this.textC_.view.element);
    (_a = this.view.buttonElement) === null || _a === void 0 ? void 0 : _a.addEventListener('blur', this.onPadButtonBlur_);
    (_b = this.view.buttonElement) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.onPadButtonClick_);
    if (this.popC_) {
      this.view.element.appendChild(this.popC_.view.element);
      this.popC_.view.element.appendChild(this.pickerC_.view.element);
      connectValues({
        primary: this.foldable_.value('expanded'),
        secondary: this.popC_.shows,
        forward: p => p,
        backward: (_, s) => s
      });
    } else if (this.view.pickerElement) {
      this.view.pickerElement.appendChild(this.pickerC_.view.element);
      bindFoldable(this.foldable_, this.view.pickerElement);
    }
  }
  get textController() {
    return this.textC_;
  }
  onPadButtonBlur_(e) {
    if (!this.popC_) {
      return;
    }
    const elem = this.view.element;
    const nextTarget = forceCast(e.relatedTarget);
    if (!nextTarget || !elem.contains(nextTarget)) {
      this.popC_.shows.rawValue = false;
    }
  }
  onPadButtonClick_() {
    this.foldable_.set('expanded', !this.foldable_.get('expanded'));
    if (this.foldable_.get('expanded')) {
      this.pickerC_.view.allFocusableElements[0].focus();
    }
  }
  onPopupChildBlur_(ev) {
    if (!this.popC_) {
      return;
    }
    const elem = this.popC_.view.element;
    const nextTarget = findNextTarget(ev);
    if (nextTarget && elem.contains(nextTarget)) {
      return;
    }
    if (nextTarget && nextTarget === this.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
      return;
    }
    this.popC_.shows.rawValue = false;
  }
  onPopupChildKeydown_(ev) {
    if (this.popC_) {
      if (ev.key === 'Escape') {
        this.popC_.shows.rawValue = false;
      }
    } else if (this.view.pickerElement) {
      if (ev.key === 'Escape') {
        this.view.buttonElement.focus();
      }
    }
  }
}
function point2dFromUnknown(value) {
  return Point2d.isObject(value) ? new Point2d(value.x, value.y) : new Point2d();
}
function writePoint2d(target, value) {
  target.writeProperty('x', value.x);
  target.writeProperty('y', value.y);
}
function createConstraint$3(params, initialValue) {
  return new PointNdConstraint({
    assembly: Point2dAssembly,
    components: [createDimensionConstraint(Object.assign(Object.assign({}, params), params.x), initialValue.x), createDimensionConstraint(Object.assign(Object.assign({}, params), params.y), initialValue.y)]
  });
}
function getSuitableMaxDimensionValue(params, rawValue) {
  var _a, _b;
  if (!isEmpty(params.min) || !isEmpty(params.max)) {
    return Math.max(Math.abs((_a = params.min) !== null && _a !== void 0 ? _a : 0), Math.abs((_b = params.max) !== null && _b !== void 0 ? _b : 0));
  }
  const step = getSuitableKeyScale(params);
  return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
}
function getSuitableMax(params, initialValue) {
  var _a, _b;
  const xr = getSuitableMaxDimensionValue(deepMerge(params, (_a = params.x) !== null && _a !== void 0 ? _a : {}), initialValue.x);
  const yr = getSuitableMaxDimensionValue(deepMerge(params, (_b = params.y) !== null && _b !== void 0 ? _b : {}), initialValue.y);
  return Math.max(xr, yr);
}
function shouldInvertY(params) {
  if (!('y' in params)) {
    return false;
  }
  const yParams = params.y;
  if (!yParams) {
    return false;
  }
  return 'inverted' in yParams ? !!yParams.inverted : false;
}
const Point2dInputPlugin = createPlugin({
  id: 'input-point2d',
  type: 'input',
  accept: (value, params) => {
    if (!Point2d.isObject(value)) {
      return null;
    }
    const result = parseRecord(params, p => Object.assign(Object.assign({}, createPointDimensionParser(p)), {
      expanded: p.optional.boolean,
      picker: p.optional.custom(parsePickerLayout),
      readonly: p.optional.constant(false),
      x: p.optional.custom(parsePointDimensionParams),
      y: p.optional.object(Object.assign(Object.assign({}, createPointDimensionParser(p)), {
        inverted: p.optional.boolean
      }))
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: () => point2dFromUnknown,
    constraint: args => createConstraint$3(args.params, args.initialValue),
    equals: Point2d.equals,
    writer: () => writePoint2d
  },
  controller: args => {
    var _a, _b;
    const doc = args.document;
    const value = args.value;
    const c = args.constraint;
    const dParams = [args.params.x, args.params.y];
    return new Point2dController(doc, {
      axes: value.rawValue.getComponents().map((comp, i) => {
        var _a;
        return createPointAxis({
          constraint: c.components[i],
          initialValue: comp,
          params: deepMerge(args.params, (_a = dParams[i]) !== null && _a !== void 0 ? _a : {})
        });
      }),
      expanded: (_a = args.params.expanded) !== null && _a !== void 0 ? _a : false,
      invertsY: shouldInvertY(args.params),
      max: getSuitableMax(args.params, value.rawValue),
      parser: parseNumber,
      pickerLayout: (_b = args.params.picker) !== null && _b !== void 0 ? _b : 'popup',
      value: value,
      viewProps: args.viewProps
    });
  }
});
class Point3d {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  getComponents() {
    return [this.x, this.y, this.z];
  }
  static isObject(obj) {
    if (isEmpty(obj)) {
      return false;
    }
    const x = obj.x;
    const y = obj.y;
    const z = obj.z;
    if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
      return false;
    }
    return true;
  }
  static equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
  }
  toObject() {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  }
}
const Point3dAssembly = {
  toComponents: p => p.getComponents(),
  fromComponents: comps => new Point3d(...comps)
};
function point3dFromUnknown(value) {
  return Point3d.isObject(value) ? new Point3d(value.x, value.y, value.z) : new Point3d();
}
function writePoint3d(target, value) {
  target.writeProperty('x', value.x);
  target.writeProperty('y', value.y);
  target.writeProperty('z', value.z);
}
function createConstraint$2(params, initialValue) {
  return new PointNdConstraint({
    assembly: Point3dAssembly,
    components: [createDimensionConstraint(Object.assign(Object.assign({}, params), params.x), initialValue.x), createDimensionConstraint(Object.assign(Object.assign({}, params), params.y), initialValue.y), createDimensionConstraint(Object.assign(Object.assign({}, params), params.z), initialValue.z)]
  });
}
const Point3dInputPlugin = createPlugin({
  id: 'input-point3d',
  type: 'input',
  accept: (value, params) => {
    if (!Point3d.isObject(value)) {
      return null;
    }
    const result = parseRecord(params, p => Object.assign(Object.assign({}, createPointDimensionParser(p)), {
      readonly: p.optional.constant(false),
      x: p.optional.custom(parsePointDimensionParams),
      y: p.optional.custom(parsePointDimensionParams),
      z: p.optional.custom(parsePointDimensionParams)
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: _args => point3dFromUnknown,
    constraint: args => createConstraint$2(args.params, args.initialValue),
    equals: Point3d.equals,
    writer: _args => writePoint3d
  },
  controller: args => {
    const value = args.value;
    const c = args.constraint;
    const dParams = [args.params.x, args.params.y, args.params.z];
    return new PointNdTextController(args.document, {
      assembly: Point3dAssembly,
      axes: value.rawValue.getComponents().map((comp, i) => {
        var _a;
        return createPointAxis({
          constraint: c.components[i],
          initialValue: comp,
          params: deepMerge(args.params, (_a = dParams[i]) !== null && _a !== void 0 ? _a : {})
        });
      }),
      parser: parseNumber,
      value: value,
      viewProps: args.viewProps
    });
  }
});
class Point4d {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  getComponents() {
    return [this.x, this.y, this.z, this.w];
  }
  static isObject(obj) {
    if (isEmpty(obj)) {
      return false;
    }
    const x = obj.x;
    const y = obj.y;
    const z = obj.z;
    const w = obj.w;
    if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' || typeof w !== 'number') {
      return false;
    }
    return true;
  }
  static equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
  }
  toObject() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      w: this.w
    };
  }
}
const Point4dAssembly = {
  toComponents: p => p.getComponents(),
  fromComponents: comps => new Point4d(...comps)
};
function point4dFromUnknown(value) {
  return Point4d.isObject(value) ? new Point4d(value.x, value.y, value.z, value.w) : new Point4d();
}
function writePoint4d(target, value) {
  target.writeProperty('x', value.x);
  target.writeProperty('y', value.y);
  target.writeProperty('z', value.z);
  target.writeProperty('w', value.w);
}
function createConstraint$1(params, initialValue) {
  return new PointNdConstraint({
    assembly: Point4dAssembly,
    components: [createDimensionConstraint(Object.assign(Object.assign({}, params), params.x), initialValue.x), createDimensionConstraint(Object.assign(Object.assign({}, params), params.y), initialValue.y), createDimensionConstraint(Object.assign(Object.assign({}, params), params.z), initialValue.z), createDimensionConstraint(Object.assign(Object.assign({}, params), params.w), initialValue.w)]
  });
}
const Point4dInputPlugin = createPlugin({
  id: 'input-point4d',
  type: 'input',
  accept: (value, params) => {
    if (!Point4d.isObject(value)) {
      return null;
    }
    const result = parseRecord(params, p => Object.assign(Object.assign({}, createPointDimensionParser(p)), {
      readonly: p.optional.constant(false),
      w: p.optional.custom(parsePointDimensionParams),
      x: p.optional.custom(parsePointDimensionParams),
      y: p.optional.custom(parsePointDimensionParams),
      z: p.optional.custom(parsePointDimensionParams)
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: _args => point4dFromUnknown,
    constraint: args => createConstraint$1(args.params, args.initialValue),
    equals: Point4d.equals,
    writer: _args => writePoint4d
  },
  controller: args => {
    const value = args.value;
    const c = args.constraint;
    const dParams = [args.params.x, args.params.y, args.params.z, args.params.w];
    return new PointNdTextController(args.document, {
      assembly: Point4dAssembly,
      axes: value.rawValue.getComponents().map((comp, i) => {
        var _a;
        return createPointAxis({
          constraint: c.components[i],
          initialValue: comp,
          params: deepMerge(args.params, (_a = dParams[i]) !== null && _a !== void 0 ? _a : {})
        });
      }),
      parser: parseNumber,
      value: value,
      viewProps: args.viewProps
    });
  }
});
function createConstraint(params) {
  const constraints = [];
  const lc = createListConstraint(params.options);
  if (lc) {
    constraints.push(lc);
  }
  return new CompositeConstraint(constraints);
}
const StringInputPlugin = createPlugin({
  id: 'input-string',
  type: 'input',
  accept: (value, params) => {
    if (typeof value !== 'string') {
      return null;
    }
    const result = parseRecord(params, p => ({
      readonly: p.optional.constant(false),
      options: p.optional.custom(parseListOptions)
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: _args => stringFromUnknown,
    constraint: args => createConstraint(args.params),
    writer: _args => writePrimitive
  },
  controller: args => {
    const doc = args.document;
    const value = args.value;
    const c = args.constraint;
    const lc = c && findConstraint(c, ListConstraint);
    if (lc) {
      return new ListController(doc, {
        props: new ValueMap({
          options: lc.values.value('options')
        }),
        value: value,
        viewProps: args.viewProps
      });
    }
    return new TextController(doc, {
      parser: v => v,
      props: ValueMap.fromObject({
        formatter: formatString
      }),
      value: value,
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (typeof args.controller.value.rawValue !== 'string') {
      return null;
    }
    if (args.controller.valueController instanceof ListController) {
      return new ListInputBindingApi(args.controller);
    }
    return null;
  }
});
const Constants = {
  monitor: {
    defaultInterval: 200,
    defaultRows: 3
  }
};
const cn$3 = ClassName('mll');
class MultiLogView {
  constructor(doc, config) {
    this.onValueUpdate_ = this.onValueUpdate_.bind(this);
    this.formatter_ = config.formatter;
    this.element = doc.createElement('div');
    this.element.classList.add(cn$3());
    config.viewProps.bindClassModifiers(this.element);
    const textareaElem = doc.createElement('textarea');
    textareaElem.classList.add(cn$3('i'));
    textareaElem.style.height = `calc(var(${getCssVar('containerUnitSize')}) * ${config.rows})`;
    textareaElem.readOnly = true;
    config.viewProps.bindDisabled(textareaElem);
    this.element.appendChild(textareaElem);
    this.textareaElem_ = textareaElem;
    config.value.emitter.on('change', this.onValueUpdate_);
    this.value = config.value;
    this.update_();
  }
  update_() {
    const elem = this.textareaElem_;
    const shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
    const lines = [];
    this.value.rawValue.forEach(value => {
      if (value !== undefined) {
        lines.push(this.formatter_(value));
      }
    });
    elem.textContent = lines.join('\n');
    if (shouldScroll) {
      elem.scrollTop = elem.scrollHeight;
    }
  }
  onValueUpdate_() {
    this.update_();
  }
}
class MultiLogController {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new MultiLogView(doc, {
      formatter: config.formatter,
      rows: config.rows,
      value: this.value,
      viewProps: this.viewProps
    });
  }
}
const cn$2 = ClassName('sgl');
class SingleLogView {
  constructor(doc, config) {
    this.onValueUpdate_ = this.onValueUpdate_.bind(this);
    this.formatter_ = config.formatter;
    this.element = doc.createElement('div');
    this.element.classList.add(cn$2());
    config.viewProps.bindClassModifiers(this.element);
    const inputElem = doc.createElement('input');
    inputElem.classList.add(cn$2('i'));
    inputElem.readOnly = true;
    inputElem.type = 'text';
    config.viewProps.bindDisabled(inputElem);
    this.element.appendChild(inputElem);
    this.inputElement = inputElem;
    config.value.emitter.on('change', this.onValueUpdate_);
    this.value = config.value;
    this.update_();
  }
  update_() {
    const values = this.value.rawValue;
    const lastValue = values[values.length - 1];
    this.inputElement.value = lastValue !== undefined ? this.formatter_(lastValue) : '';
  }
  onValueUpdate_() {
    this.update_();
  }
}
class SingleLogController {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new SingleLogView(doc, {
      formatter: config.formatter,
      value: this.value,
      viewProps: this.viewProps
    });
  }
}
const BooleanMonitorPlugin = createPlugin({
  id: 'monitor-bool',
  type: 'monitor',
  accept: (value, params) => {
    if (typeof value !== 'boolean') {
      return null;
    }
    const result = parseRecord(params, p => ({
      readonly: p.required.constant(true),
      rows: p.optional.number
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: _args => boolFromUnknown
  },
  controller: args => {
    var _a;
    if (args.value.rawValue.length === 1) {
      return new SingleLogController(args.document, {
        formatter: BooleanFormatter,
        value: args.value,
        viewProps: args.viewProps
      });
    }
    return new MultiLogController(args.document, {
      formatter: BooleanFormatter,
      rows: (_a = args.params.rows) !== null && _a !== void 0 ? _a : Constants.monitor.defaultRows,
      value: args.value,
      viewProps: args.viewProps
    });
  }
});
class GraphLogMonitorBindingApi extends BindingApi {
  get max() {
    return this.controller.valueController.props.get('max');
  }
  set max(max) {
    this.controller.valueController.props.set('max', max);
  }
  get min() {
    return this.controller.valueController.props.get('min');
  }
  set min(min) {
    this.controller.valueController.props.set('min', min);
  }
}
const cn$1 = ClassName('grl');
class GraphLogView {
  constructor(doc, config) {
    this.onCursorChange_ = this.onCursorChange_.bind(this);
    this.onValueUpdate_ = this.onValueUpdate_.bind(this);
    this.element = doc.createElement('div');
    this.element.classList.add(cn$1());
    config.viewProps.bindClassModifiers(this.element);
    this.formatter_ = config.formatter;
    this.props_ = config.props;
    this.cursor_ = config.cursor;
    this.cursor_.emitter.on('change', this.onCursorChange_);
    const svgElem = doc.createElementNS(SVG_NS, 'svg');
    svgElem.classList.add(cn$1('g'));
    svgElem.style.height = `calc(var(${getCssVar('containerUnitSize')}) * ${config.rows})`;
    this.element.appendChild(svgElem);
    this.svgElem_ = svgElem;
    const lineElem = doc.createElementNS(SVG_NS, 'polyline');
    this.svgElem_.appendChild(lineElem);
    this.lineElem_ = lineElem;
    const tooltipElem = doc.createElement('div');
    tooltipElem.classList.add(cn$1('t'), ClassName('tt')());
    this.element.appendChild(tooltipElem);
    this.tooltipElem_ = tooltipElem;
    config.value.emitter.on('change', this.onValueUpdate_);
    this.value = config.value;
    this.update_();
  }
  get graphElement() {
    return this.svgElem_;
  }
  update_() {
    const {
      clientWidth: w,
      clientHeight: h
    } = this.element;
    const maxIndex = this.value.rawValue.length - 1;
    const min = this.props_.get('min');
    const max = this.props_.get('max');
    const points = [];
    this.value.rawValue.forEach((v, index) => {
      if (v === undefined) {
        return;
      }
      const x = mapRange(index, 0, maxIndex, 0, w);
      const y = mapRange(v, min, max, h, 0);
      points.push([x, y].join(','));
    });
    this.lineElem_.setAttributeNS(null, 'points', points.join(' '));
    const tooltipElem = this.tooltipElem_;
    const value = this.value.rawValue[this.cursor_.rawValue];
    if (value === undefined) {
      tooltipElem.classList.remove(cn$1('t', 'a'));
      return;
    }
    const tx = mapRange(this.cursor_.rawValue, 0, maxIndex, 0, w);
    const ty = mapRange(value, min, max, h, 0);
    tooltipElem.style.left = `${tx}px`;
    tooltipElem.style.top = `${ty}px`;
    tooltipElem.textContent = `${this.formatter_(value)}`;
    if (!tooltipElem.classList.contains(cn$1('t', 'a'))) {
      tooltipElem.classList.add(cn$1('t', 'a'), cn$1('t', 'in'));
      forceReflow(tooltipElem);
      tooltipElem.classList.remove(cn$1('t', 'in'));
    }
  }
  onValueUpdate_() {
    this.update_();
  }
  onCursorChange_() {
    this.update_();
  }
}
class GraphLogController {
  constructor(doc, config) {
    this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
    this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
    this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
    this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
    this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
    this.props = config.props;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.cursor_ = createValue(-1);
    this.view = new GraphLogView(doc, {
      cursor: this.cursor_,
      formatter: config.formatter,
      rows: config.rows,
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    if (!supportsTouch(doc)) {
      this.view.element.addEventListener('mousemove', this.onGraphMouseMove_);
      this.view.element.addEventListener('mouseleave', this.onGraphMouseLeave_);
    } else {
      const ph = new PointerHandler(this.view.element);
      ph.emitter.on('down', this.onGraphPointerDown_);
      ph.emitter.on('move', this.onGraphPointerMove_);
      ph.emitter.on('up', this.onGraphPointerUp_);
    }
  }
  importProps(state) {
    return importBladeState(state, null, p => ({
      max: p.required.number,
      min: p.required.number
    }), result => {
      this.props.set('max', result.max);
      this.props.set('min', result.min);
      return true;
    });
  }
  exportProps() {
    return exportBladeState(null, {
      max: this.props.get('max'),
      min: this.props.get('min')
    });
  }
  onGraphMouseLeave_() {
    this.cursor_.rawValue = -1;
  }
  onGraphMouseMove_(ev) {
    const {
      clientWidth: w
    } = this.view.element;
    this.cursor_.rawValue = Math.floor(mapRange(ev.offsetX, 0, w, 0, this.value.rawValue.length));
  }
  onGraphPointerDown_(ev) {
    this.onGraphPointerMove_(ev);
  }
  onGraphPointerMove_(ev) {
    if (!ev.data.point) {
      this.cursor_.rawValue = -1;
      return;
    }
    this.cursor_.rawValue = Math.floor(mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
  }
  onGraphPointerUp_() {
    this.cursor_.rawValue = -1;
  }
}
function createFormatter(params) {
  return !isEmpty(params.format) ? params.format : createNumberFormatter(2);
}
function createTextMonitor(args) {
  var _a;
  if (args.value.rawValue.length === 1) {
    return new SingleLogController(args.document, {
      formatter: createFormatter(args.params),
      value: args.value,
      viewProps: args.viewProps
    });
  }
  return new MultiLogController(args.document, {
    formatter: createFormatter(args.params),
    rows: (_a = args.params.rows) !== null && _a !== void 0 ? _a : Constants.monitor.defaultRows,
    value: args.value,
    viewProps: args.viewProps
  });
}
function createGraphMonitor(args) {
  var _a, _b, _c;
  return new GraphLogController(args.document, {
    formatter: createFormatter(args.params),
    rows: (_a = args.params.rows) !== null && _a !== void 0 ? _a : Constants.monitor.defaultRows,
    props: ValueMap.fromObject({
      max: (_b = args.params.max) !== null && _b !== void 0 ? _b : 100,
      min: (_c = args.params.min) !== null && _c !== void 0 ? _c : 0
    }),
    value: args.value,
    viewProps: args.viewProps
  });
}
function shouldShowGraph(params) {
  return params.view === 'graph';
}
const NumberMonitorPlugin = createPlugin({
  id: 'monitor-number',
  type: 'monitor',
  accept: (value, params) => {
    if (typeof value !== 'number') {
      return null;
    }
    const result = parseRecord(params, p => ({
      format: p.optional.function,
      max: p.optional.number,
      min: p.optional.number,
      readonly: p.required.constant(true),
      rows: p.optional.number,
      view: p.optional.string
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    defaultBufferSize: params => shouldShowGraph(params) ? 64 : 1,
    reader: _args => numberFromUnknown
  },
  controller: args => {
    if (shouldShowGraph(args.params)) {
      return createGraphMonitor(args);
    }
    return createTextMonitor(args);
  },
  api: args => {
    if (args.controller.valueController instanceof GraphLogController) {
      return new GraphLogMonitorBindingApi(args.controller);
    }
    return null;
  }
});
const StringMonitorPlugin = createPlugin({
  id: 'monitor-string',
  type: 'monitor',
  accept: (value, params) => {
    if (typeof value !== 'string') {
      return null;
    }
    const result = parseRecord(params, p => ({
      multiline: p.optional.boolean,
      readonly: p.required.constant(true),
      rows: p.optional.number
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: _args => stringFromUnknown
  },
  controller: args => {
    var _a;
    const value = args.value;
    const multiline = value.rawValue.length > 1 || args.params.multiline;
    if (multiline) {
      return new MultiLogController(args.document, {
        formatter: formatString,
        rows: (_a = args.params.rows) !== null && _a !== void 0 ? _a : Constants.monitor.defaultRows,
        value: value,
        viewProps: args.viewProps
      });
    }
    return new SingleLogController(args.document, {
      formatter: formatString,
      value: value,
      viewProps: args.viewProps
    });
  }
});
class BladeApiCache {
  constructor() {
    this.map_ = new Map();
  }
  get(bc) {
    var _a;
    return (_a = this.map_.get(bc)) !== null && _a !== void 0 ? _a : null;
  }
  has(bc) {
    return this.map_.has(bc);
  }
  add(bc, api) {
    this.map_.set(bc, api);
    bc.viewProps.handleDispose(() => {
      this.map_.delete(bc);
    });
    return api;
  }
}
class ReadWriteBinding {
  constructor(config) {
    this.target = config.target;
    this.reader_ = config.reader;
    this.writer_ = config.writer;
  }
  read() {
    return this.reader_(this.target.read());
  }
  write(value) {
    this.writer_(this.target, value);
  }
  inject(value) {
    this.write(this.reader_(value));
  }
}
function createInputBindingController(plugin, args) {
  var _a;
  const result = plugin.accept(args.target.read(), args.params);
  if (isEmpty(result)) {
    return null;
  }
  const valueArgs = {
    target: args.target,
    initialValue: result.initialValue,
    params: result.params
  };
  const params = parseRecord(args.params, p => ({
    disabled: p.optional.boolean,
    hidden: p.optional.boolean,
    label: p.optional.string,
    tag: p.optional.string
  }));
  const reader = plugin.binding.reader(valueArgs);
  const constraint = plugin.binding.constraint ? plugin.binding.constraint(valueArgs) : undefined;
  const binding = new ReadWriteBinding({
    reader: reader,
    target: args.target,
    writer: plugin.binding.writer(valueArgs)
  });
  const value = new InputBindingValue(createValue(reader(result.initialValue), {
    constraint: constraint,
    equals: plugin.binding.equals
  }), binding);
  const controller = plugin.controller({
    constraint: constraint,
    document: args.document,
    initialValue: result.initialValue,
    params: result.params,
    value: value,
    viewProps: ViewProps.create({
      disabled: params === null || params === void 0 ? void 0 : params.disabled,
      hidden: params === null || params === void 0 ? void 0 : params.hidden
    })
  });
  return new InputBindingController(args.document, {
    blade: createBlade(),
    props: ValueMap.fromObject({
      label: 'label' in args.params ? (_a = params === null || params === void 0 ? void 0 : params.label) !== null && _a !== void 0 ? _a : null : args.target.key
    }),
    tag: params === null || params === void 0 ? void 0 : params.tag,
    value: value,
    valueController: controller
  });
}
class ReadonlyBinding {
  constructor(config) {
    this.target = config.target;
    this.reader_ = config.reader;
  }
  read() {
    return this.reader_(this.target.read());
  }
}
function createTicker(document, interval) {
  return interval === 0 ? new ManualTicker() : new IntervalTicker(document, interval !== null && interval !== void 0 ? interval : Constants.monitor.defaultInterval);
}
function createMonitorBindingController(plugin, args) {
  var _a, _b, _c;
  const result = plugin.accept(args.target.read(), args.params);
  if (isEmpty(result)) {
    return null;
  }
  const bindingArgs = {
    target: args.target,
    initialValue: result.initialValue,
    params: result.params
  };
  const params = parseRecord(args.params, p => ({
    bufferSize: p.optional.number,
    disabled: p.optional.boolean,
    hidden: p.optional.boolean,
    interval: p.optional.number,
    label: p.optional.string
  }));
  const reader = plugin.binding.reader(bindingArgs);
  const bufferSize = (_b = (_a = params === null || params === void 0 ? void 0 : params.bufferSize) !== null && _a !== void 0 ? _a : plugin.binding.defaultBufferSize && plugin.binding.defaultBufferSize(result.params)) !== null && _b !== void 0 ? _b : 1;
  const value = new MonitorBindingValue({
    binding: new ReadonlyBinding({
      reader: reader,
      target: args.target
    }),
    bufferSize: bufferSize,
    ticker: createTicker(args.document, params === null || params === void 0 ? void 0 : params.interval)
  });
  const controller = plugin.controller({
    document: args.document,
    params: result.params,
    value: value,
    viewProps: ViewProps.create({
      disabled: params === null || params === void 0 ? void 0 : params.disabled,
      hidden: params === null || params === void 0 ? void 0 : params.hidden
    })
  });
  controller.viewProps.bindDisabled(value.ticker);
  controller.viewProps.handleDispose(() => {
    value.ticker.dispose();
  });
  return new MonitorBindingController(args.document, {
    blade: createBlade(),
    props: ValueMap.fromObject({
      label: 'label' in args.params ? (_c = params === null || params === void 0 ? void 0 : params.label) !== null && _c !== void 0 ? _c : null : args.target.key
    }),
    value: value,
    valueController: controller
  });
}
class PluginPool {
  constructor(apiCache) {
    this.pluginsMap_ = {
      blades: [],
      inputs: [],
      monitors: []
    };
    this.apiCache_ = apiCache;
  }
  getAll() {
    return [...this.pluginsMap_.blades, ...this.pluginsMap_.inputs, ...this.pluginsMap_.monitors];
  }
  register(bundleId, r) {
    if (!isCompatible(r.core)) {
      throw TpError.notCompatible(bundleId, r.id);
    }
    if (r.type === 'blade') {
      this.pluginsMap_.blades.unshift(r);
    } else if (r.type === 'input') {
      this.pluginsMap_.inputs.unshift(r);
    } else if (r.type === 'monitor') {
      this.pluginsMap_.monitors.unshift(r);
    }
  }
  createInput_(document, target, params) {
    return this.pluginsMap_.inputs.reduce((result, plugin) => result !== null && result !== void 0 ? result : createInputBindingController(plugin, {
      document: document,
      target: target,
      params: params
    }), null);
  }
  createMonitor_(document, target, params) {
    return this.pluginsMap_.monitors.reduce((result, plugin) => result !== null && result !== void 0 ? result : createMonitorBindingController(plugin, {
      document: document,
      params: params,
      target: target
    }), null);
  }
  createBinding(doc, target, params) {
    const initialValue = target.read();
    if (isEmpty(initialValue)) {
      throw new TpError({
        context: {
          key: target.key
        },
        type: 'nomatchingcontroller'
      });
    }
    const ic = this.createInput_(doc, target, params);
    if (ic) {
      return ic;
    }
    const mc = this.createMonitor_(doc, target, params);
    if (mc) {
      return mc;
    }
    throw new TpError({
      context: {
        key: target.key
      },
      type: 'nomatchingcontroller'
    });
  }
  createBlade(document, params) {
    const bc = this.pluginsMap_.blades.reduce((result, plugin) => result !== null && result !== void 0 ? result : createBladeController(plugin, {
      document: document,
      params: params
    }), null);
    if (!bc) {
      throw new TpError({
        type: 'nomatchingview',
        context: {
          params: params
        }
      });
    }
    return bc;
  }
  createInputBindingApi_(bc) {
    const api = this.pluginsMap_.inputs.reduce((result, plugin) => {
      var _a, _b;
      if (result) {
        return result;
      }
      return (_b = (_a = plugin.api) === null || _a === void 0 ? void 0 : _a.call(plugin, {
        controller: bc
      })) !== null && _b !== void 0 ? _b : null;
    }, null);
    return this.apiCache_.add(bc, api !== null && api !== void 0 ? api : new BindingApi(bc));
  }
  createMonitorBindingApi_(bc) {
    const api = this.pluginsMap_.monitors.reduce((result, plugin) => {
      var _a, _b;
      if (result) {
        return result;
      }
      return (_b = (_a = plugin.api) === null || _a === void 0 ? void 0 : _a.call(plugin, {
        controller: bc
      })) !== null && _b !== void 0 ? _b : null;
    }, null);
    return this.apiCache_.add(bc, api !== null && api !== void 0 ? api : new BindingApi(bc));
  }
  createBindingApi(bc) {
    if (this.apiCache_.has(bc)) {
      return this.apiCache_.get(bc);
    }
    if (isInputBindingController(bc)) {
      return this.createInputBindingApi_(bc);
    }
    if (isMonitorBindingController(bc)) {
      return this.createMonitorBindingApi_(bc);
    }
    throw TpError.shouldNeverHappen();
  }
  createApi(bc) {
    if (this.apiCache_.has(bc)) {
      return this.apiCache_.get(bc);
    }
    if (isBindingController(bc)) {
      return this.createBindingApi(bc);
    }
    const api = this.pluginsMap_.blades.reduce((result, plugin) => result !== null && result !== void 0 ? result : plugin.api({
      controller: bc,
      pool: this
    }), null);
    if (!api) {
      throw TpError.shouldNeverHappen();
    }
    return this.apiCache_.add(bc, api);
  }
}
const sharedCache = new BladeApiCache();
function createDefaultPluginPool() {
  const pool = new PluginPool(sharedCache);
  [Point2dInputPlugin, Point3dInputPlugin, Point4dInputPlugin, StringInputPlugin, NumberInputPlugin, StringColorInputPlugin, ObjectColorInputPlugin, NumberColorInputPlugin, BooleanInputPlugin, BooleanMonitorPlugin, StringMonitorPlugin, NumberMonitorPlugin, ButtonBladePlugin, FolderBladePlugin, TabBladePlugin].forEach(p => {
    pool.register('core', p);
  });
  return pool;
}
class ListBladeApi extends BladeApi {
  /**
   * @hidden
   */
  constructor(controller) {
    super(controller);
    this.emitter_ = new Emitter();
    this.controller.value.emitter.on('change', ev => {
      this.emitter_.emit('change', new TpChangeEvent(this, ev.rawValue));
    });
  }
  get label() {
    return this.controller.labelController.props.get('label');
  }
  set label(label) {
    this.controller.labelController.props.set('label', label);
  }
  get options() {
    return this.controller.valueController.props.get('options');
  }
  set options(options) {
    this.controller.valueController.props.set('options', options);
  }
  get value() {
    return this.controller.value.rawValue;
  }
  set value(value) {
    this.controller.value.rawValue = value;
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, ev => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
}
exports.ListBladeApi = ListBladeApi;
class SeparatorBladeApi extends BladeApi {}
exports.SeparatorBladeApi = SeparatorBladeApi;
class SliderBladeApi extends BladeApi {
  /**
   * @hidden
   */
  constructor(controller) {
    super(controller);
    this.emitter_ = new Emitter();
    this.controller.value.emitter.on('change', ev => {
      this.emitter_.emit('change', new TpChangeEvent(this, ev.rawValue));
    });
  }
  get label() {
    return this.controller.labelController.props.get('label');
  }
  set label(label) {
    this.controller.labelController.props.set('label', label);
  }
  get max() {
    return this.controller.valueController.sliderController.props.get('max');
  }
  set max(max) {
    this.controller.valueController.sliderController.props.set('max', max);
  }
  get min() {
    return this.controller.valueController.sliderController.props.get('min');
  }
  set min(min) {
    this.controller.valueController.sliderController.props.set('min', min);
  }
  get value() {
    return this.controller.value.rawValue;
  }
  set value(value) {
    this.controller.value.rawValue = value;
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, ev => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
}
exports.SliderBladeApi = SliderBladeApi;
class TextBladeApi extends BladeApi {
  /**
   * @hidden
   */
  constructor(controller) {
    super(controller);
    this.emitter_ = new Emitter();
    this.controller.value.emitter.on('change', ev => {
      this.emitter_.emit('change', new TpChangeEvent(this, ev.rawValue));
    });
  }
  get label() {
    return this.controller.labelController.props.get('label');
  }
  set label(label) {
    this.controller.labelController.props.set('label', label);
  }
  get formatter() {
    return this.controller.valueController.props.get('formatter');
  }
  set formatter(formatter) {
    this.controller.valueController.props.set('formatter', formatter);
  }
  get value() {
    return this.controller.value.rawValue;
  }
  set value(value) {
    this.controller.value.rawValue = value;
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, ev => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
}
exports.TextBladeApi = TextBladeApi;
const ListBladePlugin = function () {
  return {
    id: 'list',
    type: 'blade',
    core: VERSION$1,
    accept(params) {
      const result = parseRecord(params, p => ({
        options: p.required.custom(parseListOptions),
        value: p.required.raw,
        view: p.required.constant('list'),
        label: p.optional.string
      }));
      return result ? {
        params: result
      } : null;
    },
    controller(args) {
      const lc = new ListConstraint(normalizeListOptions(args.params.options));
      const value = createValue(args.params.value, {
        constraint: lc
      });
      const ic = new ListController(args.document, {
        props: new ValueMap({
          options: lc.values.value('options')
        }),
        value: value,
        viewProps: args.viewProps
      });
      return new LabeledValueBladeController(args.document, {
        blade: args.blade,
        props: ValueMap.fromObject({
          label: args.params.label
        }),
        value: value,
        valueController: ic
      });
    },
    api(args) {
      if (!(args.controller instanceof LabeledValueBladeController)) {
        return null;
      }
      if (!(args.controller.valueController instanceof ListController)) {
        return null;
      }
      return new ListBladeApi(args.controller);
    }
  };
}();
class RootApi extends FolderApi {
  /**
   * @hidden
   */
  constructor(controller, pool) {
    super(controller, pool);
  }
  get element() {
    return this.controller.view.element;
  }
}

/**
 * @hidden
 */
class RootController extends FolderController {
  constructor(doc, config) {
    super(doc, {
      expanded: config.expanded,
      blade: config.blade,
      props: config.props,
      root: true,
      viewProps: config.viewProps
    });
  }
}
const cn = ClassName('spr');
/**
 * @hidden
 */
class SeparatorView {
  constructor(doc, config) {
    this.element = doc.createElement('div');
    this.element.classList.add(cn());
    config.viewProps.bindClassModifiers(this.element);
    const hrElem = doc.createElement('hr');
    hrElem.classList.add(cn('r'));
    this.element.appendChild(hrElem);
  }
}

/**
 * @hidden
 */
class SeparatorController extends BladeController {
  /**
   * @hidden
   */
  constructor(doc, config) {
    super(Object.assign(Object.assign({}, config), {
      view: new SeparatorView(doc, {
        viewProps: config.viewProps
      })
    }));
  }
}
const SeparatorBladePlugin = {
  id: 'separator',
  type: 'blade',
  core: VERSION$1,
  accept(params) {
    const result = parseRecord(params, p => ({
      view: p.required.constant('separator')
    }));
    return result ? {
      params: result
    } : null;
  },
  controller(args) {
    return new SeparatorController(args.document, {
      blade: args.blade,
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (!(args.controller instanceof SeparatorController)) {
      return null;
    }
    return new SeparatorBladeApi(args.controller);
  }
};
const SliderBladePlugin = {
  id: 'slider',
  type: 'blade',
  core: VERSION$1,
  accept(params) {
    const result = parseRecord(params, p => ({
      max: p.required.number,
      min: p.required.number,
      view: p.required.constant('slider'),
      format: p.optional.function,
      label: p.optional.string,
      value: p.optional.number
    }));
    return result ? {
      params: result
    } : null;
  },
  controller(args) {
    var _a, _b;
    const initialValue = (_a = args.params.value) !== null && _a !== void 0 ? _a : 0;
    const drc = new DefiniteRangeConstraint({
      max: args.params.max,
      min: args.params.min
    });
    const v = createValue(initialValue, {
      constraint: drc
    });
    const vc = new SliderTextController(args.document, Object.assign(Object.assign({}, createSliderTextProps({
      formatter: (_b = args.params.format) !== null && _b !== void 0 ? _b : numberToString,
      keyScale: createValue(1),
      max: drc.values.value('max'),
      min: drc.values.value('min'),
      pointerScale: getSuitablePointerScale(args.params, initialValue)
    })), {
      parser: parseNumber,
      value: v,
      viewProps: args.viewProps
    }));
    return new LabeledValueBladeController(args.document, {
      blade: args.blade,
      props: ValueMap.fromObject({
        label: args.params.label
      }),
      value: v,
      valueController: vc
    });
  },
  api(args) {
    if (!(args.controller instanceof LabeledValueBladeController)) {
      return null;
    }
    if (!(args.controller.valueController instanceof SliderTextController)) {
      return null;
    }
    return new SliderBladeApi(args.controller);
  }
};
const TextBladePlugin = function () {
  return {
    id: 'text',
    type: 'blade',
    core: VERSION$1,
    accept(params) {
      const result = parseRecord(params, p => ({
        parse: p.required.function,
        value: p.required.raw,
        view: p.required.constant('text'),
        format: p.optional.function,
        label: p.optional.string
      }));
      return result ? {
        params: result
      } : null;
    },
    controller(args) {
      var _a;
      const v = createValue(args.params.value);
      const ic = new TextController(args.document, {
        parser: args.params.parse,
        props: ValueMap.fromObject({
          formatter: (_a = args.params.format) !== null && _a !== void 0 ? _a : v => String(v)
        }),
        value: v,
        viewProps: args.viewProps
      });
      return new LabeledValueBladeController(args.document, {
        blade: args.blade,
        props: ValueMap.fromObject({
          label: args.params.label
        }),
        value: v,
        valueController: ic
      });
    },
    api(args) {
      if (!(args.controller instanceof LabeledValueBladeController)) {
        return null;
      }
      if (!(args.controller.valueController instanceof TextController)) {
        return null;
      }
      return new TextBladeApi(args.controller);
    }
  };
}();
function createDefaultWrapperElement(doc) {
  const elem = doc.createElement('div');
  elem.classList.add(ClassName('dfw')());
  if (doc.body) {
    doc.body.appendChild(elem);
  }
  return elem;
}
function embedStyle(doc, id, css) {
  if (doc.querySelector(`style[data-tp-style=${id}]`)) {
    return;
  }
  const styleElem = doc.createElement('style');
  styleElem.dataset.tpStyle = id;
  styleElem.textContent = css;
  doc.head.appendChild(styleElem);
}
/**
 * The root pane of Tweakpane.
 */
class Pane extends RootApi {
  constructor(opt_config) {
    var _a, _b;
    const config = opt_config !== null && opt_config !== void 0 ? opt_config : {};
    const doc = (_a = config.document) !== null && _a !== void 0 ? _a : getWindowDocument();
    const pool = createDefaultPluginPool();
    const rootController = new RootController(doc, {
      expanded: config.expanded,
      blade: createBlade(),
      props: ValueMap.fromObject({
        title: config.title
      }),
      viewProps: ViewProps.create()
    });
    super(rootController, pool);
    this.pool_ = pool;
    this.containerElem_ = (_b = config.container) !== null && _b !== void 0 ? _b : createDefaultWrapperElement(doc);
    this.containerElem_.appendChild(this.element);
    this.doc_ = doc;
    this.usesDefaultWrapper_ = !config.container;
    this.setUpDefaultPlugins_();
  }
  get document() {
    if (!this.doc_) {
      throw TpError.alreadyDisposed();
    }
    return this.doc_;
  }
  dispose() {
    const containerElem = this.containerElem_;
    if (!containerElem) {
      throw TpError.alreadyDisposed();
    }
    if (this.usesDefaultWrapper_) {
      const parentElem = containerElem.parentElement;
      if (parentElem) {
        parentElem.removeChild(containerElem);
      }
    }
    this.containerElem_ = null;
    this.doc_ = null;
    super.dispose();
  }
  registerPlugin(bundle) {
    if (bundle.css) {
      embedStyle(this.document, `plugin-${bundle.id}`, bundle.css);
    }
    const plugins = 'plugin' in bundle ? [bundle.plugin] : 'plugins' in bundle ? bundle.plugins : [];
    plugins.forEach(p => {
      this.pool_.register(bundle.id, p);
    });
  }
  setUpDefaultPlugins_() {
    this.registerPlugin({
      id: 'default',
      // NOTE: This string literal will be replaced with the default CSS by Rollup at the compilation time
      css: '.tp-tbiv_b,.tp-coltxtv_ms,.tp-colswv_b,.tp-ckbv_i,.tp-sglv_i,.tp-mllv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-rotv_b,.tp-fldv_b,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--bld-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--cnt-usz);line-height:var(--cnt-usz);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tbpv_c>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-vp))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tbpv_c>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--cnt-usp)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tbpv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tbpv_c>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tbpv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tbpv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tbpv_c>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tbpv_c>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--bld-br);border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tbpv_c .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tbpv_c>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tbpv_c>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--bld-br)}.tp-tbpv_c .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--bld-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);overflow:hidden;padding-left:var(--cnt-hp);padding-right:calc(4px + var(--cnt-usz) + var(--cnt-hp));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-hp) + (var(--cnt-usz) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-vp);padding-top:var(--cnt-vp);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--cnt-usz);line-height:var(--cnt-usz);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-sglv_i,.tp-mllv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--mo-fg);height:var(--cnt-usz);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-sglv_i::-webkit-scrollbar,.tp-mllv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-sglv_i::-webkit-scrollbar-corner,.tp-mllv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-sglv_i::-webkit-scrollbar-thumb,.tp-mllv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-rotv{--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-br: var(--tp-base-border-radius, 6px);--bs-ff: var(--tp-base-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--bld-br: var(--tp-blade-border-radius, 2px);--bld-hp: var(--tp-blade-horizontal-padding, 4px);--bld-vw: var(--tp-blade-value-width, 160px);--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--cnt-hp: var(--tp-container-horizontal-padding, 4px);--cnt-vp: var(--tp-container-vertical-padding, 4px);--cnt-usp: var(--tp-container-unit-spacing, 4px);--cnt-usz: var(--tp-container-unit-size, 20px);--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--bld-br);cursor:pointer;display:block;height:var(--cnt-usz);position:relative;width:var(--cnt-usz)}.tp-ckbv_w svg{display:block;height:16px;inset:0;margin:auto;opacity:0;position:absolute;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--cnt-usz)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--cnt-usp);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--cnt-usp)}.tp-colpv_rgb{display:flex;margin-top:var(--cnt-usp);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-vp);padding-top:calc(var(--cnt-vp) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-hp));position:absolute;right:calc(-1*var(--cnt-hp));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--bld-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--cnt-usz)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{inset:0;position:absolute}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--bld-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;inset:0;position:absolute}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--bld-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{cursor:pointer;display:block;height:var(--cnt-usz);left:0;position:absolute;top:0;width:var(--cnt-usz)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--bld-br);content:"";display:block;inset:0;position:absolute}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--bld-br);color:var(--lbl-fg);cursor:pointer;height:var(--cnt-usz);line-height:var(--cnt-usz);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--cnt-usz)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-hp);padding-right:var(--cnt-hp)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--bld-vw)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 var(--bld-hp);width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--cnt-usz)*3);line-height:var(--cnt-usz);padding-left:var(--bld-hp);padding-right:var(--bld-hp);resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--cnt-usz);margin-right:4px;position:relative;width:var(--cnt-usz)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--cnt-usp);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-p2dpv{padding-left:calc(var(--cnt-usz) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:var(--bld-vw);padding:var(--cnt-vp) var(--cnt-hp);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--cnt-usz);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin:auto;position:absolute}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin-bottom:auto;margin-top:auto;position:absolute}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--bld-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--cnt-usz) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-hp) + 4px);padding-right:calc(var(--cnt-hp) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);content:"";inset:0 0 2px;pointer-events:none;position:absolute}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);opacity:.5;overflow:hidden;position:relative;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-tbpv_c{padding-bottom:var(--cnt-vp);padding-left:4px;padding-top:var(--cnt-vp)}.tp-txtv{position:relative}.tp-txtv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:calc(var(--bld-hp) - 5px);position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--cnt-usz) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--bld-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--bs-ff);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--cnt-usz) + var(--cnt-hp));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0;transition-delay:0s;transition-duration:0s}.tp-rotv.tp-rotv-not>.tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst.tp-fldv-expanded>.tp-fldv_b{transition-delay:0s;transition-duration:0s}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}',
      plugins: [ListBladePlugin, SeparatorBladePlugin, SliderBladePlugin, TabBladePlugin, TextBladePlugin]
    });
  }
}
exports.Pane = Pane;
const VERSION = exports.VERSION = new Semver('4.0.4');

},{}],4:[function(require,module,exports){
const regl = require("regl")();
const {
  utils
} = require("./utils");
const {
  Pane
} = require("tweakpane");
const TweakpaneLatex = require("tweakpane-latex");
const pane = new Pane({
  title: "WARNING: GPU INTENSIVE"
});
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# Terrain Generation

Generating pseudo-realistic terrain
using fractional brownian motion, ray tracing.
`,
  border: false,
  markdown: true
});
const drawShape = regl({
  uniforms: {
    iTime: (context, props) => context.time,
    propRatio: (context, props) => {
      return context.viewportHeight / context.viewportWidth;
    }
  },
  attributes: {
    position: [[-1, -1], [1, -1], [-1, 1], [1, -1], [-1, 1], [1, 1]]
  },
  count: 6,
  primitive: "triangle",
  vert: `
precision mediump float;
attribute vec2 position;
varying vec2 fragCoord;

void main() {
	fragCoord = position;
	gl_Position = vec4(position, 0, 1);
}
	`,
  frag: `
precision mediump float;
varying vec2 fragCoord;
uniform float iTime;
uniform float propRatio;

${utils}

float terrain(in vec2 p) {
	// by default, fractal brownian motion
	float y = fbm(p);

	// add a cliff
	float line = -0.2 * p.x + 1.2;
	y += .8*smoothstep(1.0, 0.0, p.y - line);

	return y;
}

float iTerrain( in vec3 ro, in vec3 rd)
{
	// https://www.shadertoy.com/view/4ttSWf

	// estimate how far it is first.
	const float delta = 0.1;
	
	for (float t = 0.0; t < 10.0; t += delta) {

		vec3 p = ro + rd * t;
		p.y += 0.5; // offset

		if (p.y < terrain(p.xz)) {
			// hit
			return t;
		}
	}
	return -1.0;
}

vec4 nTerrain(in vec3 pos, in vec3 lightRay)
{
    // the normal vector
	// (1, df/dz, 0) cross (0, df/dx, 1) = (-df/dx, 1, df/dz)

	vec2 p = pos.xz;
	vec2 delta = vec2(0.01, 0.0);
	float d = terrain(p);

	// f = terrain(p)
	float df_dx = (terrain(p + delta.xy) - d) / delta.x;
	float df_dz = (terrain(p + delta.yx) - d) / delta.x;

	vec3 n = vec3(-df_dx, 1.0, df_dz);
	n = normalize(n);

	// Trying to safe computation by weirdly putting it here
	// float R = shadows(pos, d, lightRay);
	float R = 1.0;

    return vec4(n, R);
}

int intersect( in vec3 ro, in vec3 rd, out float t)
{
    t = 1000.0;
    int id = -1; // by default, it will be a miss
    float tpla = iTerrain(ro, rd);
    
    
    // report which ever comes first
    if (tpla > 0.0) {
        id = 2;
        t = tpla;
    }
    
    return id;
}



void main() {

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord;
    uv.y = fragCoord.y*propRatio;
    
    float cameraDist = 6.0;
	float height = 4.0;
    float time = 0.3 * iTime;
    vec3 ro = vec3(0.0, height, cameraDist);
    vec3 rd = normalize( vec3( uv, -1.0 ) );

	ro.z += time;

	float angle = -PI/2.0 * 0.4;
	mat2 rotateCamera = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
	rd.yz *= rotateCamera;
    
    float t = -1.0;
    // intersect
    int id = intersect(ro, rd, t);
    
	float theta = PI/3.0 * sin(time);
	float phi = PI/6.0;
    vec3 light = cameraDist * vec3(sin(theta) * sin(phi), cos(theta), sin(theta) * cos(phi));
    
    // draw background color
    vec3 col = skyColor(light, time, ro, rd);

    if ( id == 2)
    {
        // we hit the plane
        vec3 pos = ro + t*rd;
        vec4 norm = nTerrain(pos, light - pos);

		float maxVal = 8.0;
        float intensity = dot(normalize(light - pos), normalize(norm.xyz));
		// intensity = clamp(intensity, 0.0, maxVal);
        
        // inverse square law
        // float r = length(light - pos)*0.2;
        // intensity = intensity / (r*r);
        
        col = vec3(94.0/255.0, 72.0/255.0, 64.0/255.0);

		// icecap
		float icecapHeight = 0.2;
		col = mix(col, vec3(1.0), smoothstep(0.0, 1.0, pos.y - icecapHeight) * smoothstep(0.6, 1.0, intensity));

		col *= intensity;

		float d = length(ro - pos);
		// decaying with distance away from viewer
		float k = 0.01;
		vec3 lambda = vec3(exp(-k * d), exp(-1.0*k* d), exp(-4.0*k*d));
		vec3 hue = vec3(0.4, 0.0, 0.0);

		col = mix(hue.xxx, col, lambda);
    }
    
    gl_FragColor = vec4(col,1.0);
}
	`
});
regl.frame(() => {
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1
  });
  drawShape();
});

},{"./utils":5,"regl":1,"tweakpane":3,"tweakpane-latex":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = void 0;
const utils = exports.utils = `

#define PI 3.14159256
#define E 2.71828182

float rand (in float x) {
	return fract(sin(x * 12.9898)
				* 43758.5453123);
}

float rand (in vec2 st) {
	return fract(sin(dot(st.xy,
						vec2(12.9898, 78.233)))
				* 43758.5453123);
}

float noise(in vec2 pos) {
	vec2 i = floor(pos);
	vec2 f = fract(pos);

	float a = rand(i);
	float b = rand(i + vec2(1.0, 0.0));
	float c = rand(i + vec2(0.0, 1.0));
	float d = rand(i + vec2(1.0, 1.0));

	vec2 u = smoothstep(0.,1.,f);

	// c -- d
	// |    |
	// a -- b
	// Little intuition here.

	return mix(a, b, u.x) +
			(c - a)*u.y*(1.0-u.x) +
			(d - b)*u.x*u.y;
		
}

float fbm( in vec2 pos ) {
	float value = 0.0;
	float amplitude = 1.0;
	float frequency = 0.5;

	float angle = 10.0; // arbitrary angle for rotation
	mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
	
	// max is \sum^octaves amplitude * gamma^i
	const int octaves = 9;

	// analogous to fourier series
	for (int i = 0; i < octaves; i++) {
	 	pos = pos * rotationMatrix;

		value += amplitude * noise(frequency * pos);
		frequency *= 2.0;
		amplitude *= 0.5;
	}

	return value;
}

float fbm_norm( in vec2 pos ) {
	float value = 0.0;
	float amplitude = 1.0;
	float frequency = 0.5;

	float angle = 10.0; // arbitrary angle for rotation
	mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
	
	// max is \sum^octaves amplitude * gamma^i
	const int octaves = 9;

	float tot = 0.0;
	// analogous to fourier series
	for (int i = 0; i < octaves; i++) {
	 	pos = pos * rotationMatrix;

		value += amplitude * noise(frequency * pos);
		tot += amplitude;
		frequency *= 2.0;
		amplitude *= 0.5;
	}

	return value/tot;
}


float shadows(in vec3 p, in float ref, in vec3 lightRay) {
	vec3 ray = normalize(lightRay);
	for (float t = 0.0; t < 10.0; t++) {
		vec3 newPos = p + lightRay * t;
		if (abs(fbm(newPos.xz) - ref) < 0.1) {
			return newPos.y/t;
		}
	}
	return 0.0;
}

vec3 skyColor(in vec3 lightSource, in float time, in vec3 ro, in vec3 rd) {
	// https://www.shadertoy.com/view/XsBXDc

	vec3 daytime = vec3(130.0/255.0, 180.0/255.0, 235.0/255.0);
	vec3 nighttime = vec3(0.0, 0.0, 0.0);

	daytime.y += 0.2 * rd.y;

	float cloudHeight = 10.0;
	// ro.y + rd.y * t = cloudHeight
	float t = clamp((cloudHeight - ro.y)/rd.y, 0.0, 10.0);

	vec2 p = (t * rd + ro).xz;

	float cloud = fbm_norm(2.0*p);
	daytime = mix(vec3(0.8), daytime, cloud);

	return daytime;
}

// https://iquilezles.org/articles/rmshadows/
// float softshadow( in vec3 ro, in vec3 rd, float mint, float maxt, float k ) {
//     float res = 1.0;
//     float t = mint;
//     for( int i=0; i<256 && t<maxt; i++ )
//     {
//         float h = map(ro + rd*t);
//         if( h<0.001 )
//             return 0.0;
//         res = min( res, k*h/t );
//         t += h;
//     }
//     return res;
// }

`;

},{}]},{},[4]);

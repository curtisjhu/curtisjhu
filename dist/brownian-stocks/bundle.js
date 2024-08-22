var t=new dat.GUI({name:"Stickman"}),n=document.createElement("div");n.style="background: rgb(0, 0, 0); padding: 6px;";n.innerHTML=`
<h1>Geometric Brownian Motion</h1>
<p>
Statistical physics have long inspired the basis of our economic models.
In fact the Nobel Prize winning Black-Scholes equation is a page taken straight from thermal physics.
Here's a little simulation of geometric brownian motion used in the Stochastic Differential Equation in Black-Scholes.
</p>
<button onclick="window.location.reload()">refresh</button>
`;t.domElement.prepend(n);t.closed=!1;var e={framerate:10,N:60,sigma:5,mu:.2};t.add(e,"sigma",.001,20).onFinishChange(a=>{i=d3.randomNormal(-e.mu,e.sigma)});t.add(e,"mu",-10,10).onFinishChange(a=>{i=d3.randomNormal(-e.mu,e.sigma)});t.add(e,"N",1,200).onFinishChange(a=>{c()});t.add(e,"framerate",1,45).onFinishChange(a=>{frameRate(e.framerate)});var o;var r,s,l,d,m,h,i;function c(){l=createCanvas(windowWidth,windowHeight),r=height/2,s=2,d=!1,m=!1,h=10,i=d3.randomNormal(-e.mu,e.sigma),o=[];for(let a=0;a<e.N;a++)o.push([0,0]);frameRate(e.framerate),background(0)}

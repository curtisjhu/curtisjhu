if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var stats;
var controls;
var camera, scene, renderer;

var clothGeometry;
var groundMaterial;

var sphere;
var table;
var boundingBox;
var object;
var collidableMeshList = [];


var gui;
var guiControls;

var poleMat, clothMaterial, ballMaterial;
init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// scene (First thing you need to do is set up a scene)
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

	// camera (Second thing you need to do is set up the camera)
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.y = 450;
	camera.position.z = 1500;
	scene.add( camera );

	// renderer (Third thing you need is a renderer)
	renderer = new THREE.WebGLRenderer( { antialias: true, devicePixelRatio: 1 } );
	//renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( scene.fog.color );
	//renderer.setClearColor(0xffffff);

	container.appendChild( renderer.domElement );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;

	// This gives us stats on how well the simulation is running
	stats = new Stats();
	container.appendChild( stats.domElement );

	// mouse controls
	controls = new THREE.TrackballControls( camera, renderer.domElement );

	// lights (fourth thing you need is lights)
	var light, materials;
	scene.add( new THREE.AmbientLight( 0x666666 ) );
	light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
	light.position.set( 50, 200, 100 );
	light.position.multiplyScalar( 1.3 );
	light.castShadow = true;
	// light.shadowCameraVisible = true;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	var d = 300;
	light.shadow.camera.left = -d;
	light.shadow.camera.right = d;
	light.shadow.camera.top = d;
	light.shadow.camera.bottom = -d;
	light.shadow.camera.far = 1000;

	scene.add( light );


	// cloth (Now we're going to create the cloth)
	// every thing in our world needs a material and a geometry

	/*
	// this part allows us to use an image for the cloth texture
	// can include transparent parts
	var loader = new THREE.TextureLoader();
	var clothTexture = loader.load( "textures/patterns/circuit_pattern.png" );
	clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
	clothTexture.anisotropy = 16;
	*/

	// cloth material
	// this tells us the material's color, how light reflects off it, etc.

	clothMaterial = new THREE.MeshPhongMaterial( {
		color: 0xaa2929,
		specular: 0x030303,
		wireframeLinewidth: 2,
		//map: clothTexture,
		side: THREE.DoubleSide,
		alphaTest: 0.5
	} );

	// cloth geometry
	// the geometry contains all the points and faces of an object
	clothGeometry = new THREE.ParametricGeometry( clothInitialPosition, cloth.w, cloth.h );
	clothGeometry.dynamic = true;

	/*
	// more stuff needed for the texture
	var uniforms = { texture:  { type: "t", value: clothTexture } };
	var vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent;
	var fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;
	*/

	// cloth mesh
	// a mesh takes the geometry and applies a material to it
	// so a mesh = geometry + material
	object = new THREE.Mesh( clothGeometry, clothMaterial );
	object.position.set( 0, 0, 0 );
	object.castShadow = true;

	// whenever we make something, we need to also add it to the scene
	scene.add( object ); // add cloth to the scene
	//collidableMeshList.push(object);

	/*
	// more stuff needed for texture
	object.customDepthMaterial = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide
	} );
	*/

	// sphere
	// sphere geometry
	var ballGeo = new THREE.SphereGeometry( ballSize, 20, 20 );
	// sphere material
	ballMaterial = new THREE.MeshPhongMaterial( {
		color: 0xaaaaaa,
		side: THREE.DoubleSide,
		transparent: true,
		opacity:0.01
	} );
	// sphere mesh
	sphere = new THREE.Mesh( ballGeo, ballMaterial );
	sphere.castShadow = true;
	sphere.receiveShadow = true;
	scene.add( sphere ); // add sphere to scene

	// ground

	/*
	// needed for ground texture
	var groundTexture = loader.load( "textures/terrain/grasslight-big.jpg" );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 25, 25 );
	groundTexture.anisotropy = 16;
	*/

	// ground material
	groundMaterial = new THREE.MeshPhongMaterial(
		{
			color: 0x404761,//0x3c3c3c,
			specular: 0x404761//0x3c3c3c//,
			//map: groundTexture
		} );

	// ground mesh
	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
	mesh.position.y = -250;
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh ); // add ground to scene

	// poles

	var poleGeo = new THREE.BoxGeometry( 5, 250+125, 5 );
	poleMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 100, side: THREE.DoubleSide} );

	var pole1 = new THREE.Mesh( poleGeo, poleMat );
	pole1.position.x = -250;
	pole1.position.z = 250;
	pole1.position.y = -(125-125/2);
	pole1.receiveShadow = true;
	pole1.castShadow = true;
	scene.add( pole1 );

	var pole2 = new THREE.Mesh( poleGeo, poleMat );
	pole2.position.x = 250;
	pole2.position.z = 250;
	pole2.position.y = -(125-125/2);
	pole2.receiveShadow = true;
	pole2.castShadow = true;
	scene.add( pole2 );

	var pole3 = new THREE.Mesh( poleGeo, poleMat );
	pole3.position.x = 250;
	pole3.position.z = -250;
	pole3.position.y = -(125-125/2);
	pole3.receiveShadow = true;
	pole3.castShadow = true;
	scene.add( pole3 );

	var pole4 = new THREE.Mesh( poleGeo, poleMat );
	pole4.position.x = -250;
	pole4.position.z = -250;
	pole4.position.y = -62;
	pole4.receiveShadow = true;
	pole4.castShadow = true;
	scene.add( pole4 );

	// create a table mesh
	var boxGeo = new THREE.BoxGeometry( 250, 100, 250 );
  	table = new THREE.Mesh( boxGeo, ballMaterial );
	table.position.x = 0;
	table.position.y = 0;
	table.position.z = 0;
	table.receiveShadow = true;
	table.castShadow = true;
	scene.add( table );

	boxGeo.computeBoundingBox();
	boundingBox = table.geometry.boundingBox.clone();

	//console.log('bounding box coordinates: ' + '(' + boundingBox.min.x + ', ' + boundingBox.min.y + ', ' + boundingBox.min.z + '), ' + '(' + boundingBox.max.x + ', ' + boundingBox.max.y + ', ' + boundingBox.max.z + ')' );

	window.addEventListener( 'resize', onWindowResize, false );


	// some initial conditions here

	// createThing is a function that creates objects the cloth can collide into
	createThing('Ball');
	// pinCloth sets how the cloth is pinned
	pinCloth('Corners');

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	var time = Date.now();

	simulate(time); // run physics simulation to create new positions of cloth
	render(); 		// update position of cloth, compute normals, rotate camera, render the scene
	stats.update();
	controls.update();

}

// restartCloth() is used when we change a fundamental cloth property with a slider
// and therefore need to recreate the cloth object from scratch
function restartCloth()
{
		scene.remove(object);
		//clothInitialPosition = plane( 500, 500 );
		cloth = new Cloth( xSegs, ySegs, fabricLength );

		//GRAVITY = 9.81 * 140; //
		gravity = new THREE.Vector3( 0, - GRAVITY, 0 ).multiplyScalar( MASS );

		// recreate cloth geometry
		clothGeometry = new THREE.ParametricGeometry( clothInitialPosition, xSegs, ySegs );
		clothGeometry.dynamic = true;

		// recreate cloth mesh
		object = new THREE.Mesh( clothGeometry, clothMaterial );
		object.position.set( 0, 0, 0 );
		object.castShadow = true;

		scene.add( object ); // adds the cloth to the scene
}

// the rendering happens here
function render() {

	var timer = Date.now() * 0.0002;


	// update position of the cloth
	// i.e. copy positions from the particles (i.e. result of physics simulation)
	// to the cloth geometry
	var p = cloth.particles;
	for ( var i = 0, il = p.length; i < il; i ++ ) {
		clothGeometry.vertices[ i ].copy( p[ i ].position );
	}

	// recalculate cloth normals
	clothGeometry.computeFaceNormals();
	clothGeometry.computeVertexNormals();

	clothGeometry.normalsNeedUpdate = true;
	clothGeometry.verticesNeedUpdate = true;

	// update sphere position from ball position
	sphere.position.copy( ballPosition );

	// option to auto-rotate camera
	if ( rotate ) {
		var cameraRadius = Math.sqrt(camera.position.x*camera.position.x + camera.position.z*camera.position.z);
		camera.position.x = Math.cos( timer ) * cameraRadius;
		camera.position.z = Math.sin( timer ) * cameraRadius;
	}

	camera.lookAt( scene.position );
	renderer.render( scene, camera ); // render the scene
}

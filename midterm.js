// BASE: Example 3 but draws a cube instead of a tetrahedron

var gl;
var locations;
var verts = [];
var translation = [0,0,0];
var transLoc;
var last_redraw;
var w = .07;
var slider =  document.getElementById("slider");
var choice = 0;
var dimensions = 0;

window.addEventListener('load', function init()
{
	// Get the HTML5 canvas object
	var canvas = document.getElementById("gl-canvas");
	
	// Get the WebGL context
	gl = getWebGLContext(canvas);
	if (!gl)
	{
		alert("WebGL isn't available");
		return;
	}

	// Create a cube
	//one vec3 for each point of the cube/rectangular prism
	//look at page 96 for a reccomendation for creating a random maze 
	locations = [ 
	[1,1,1,1,1,1,1,1,1,1],
	[0,0,1,0,0,0,0,0,1,1 ],
	[1,0,0,0,1,1,1,0,1,1 ],
	[1,0,1,0,1,0,0,0,1,1 ],
	[1,0,1,1,1,1,1,1,0,1 ],
	[1,0,1,1,0,0,0,1,0,1 ],
	[1,0,1,1,0,1,0,0,0,1 ],
	[1,0,0,1,0,1,1,1,1,1 ],
	[1,1,0,0,0,0,0,0,0,1 ],
	[1,1,1,1,1,1,1,1,0,1 ]
	];
	
	

	

	
	
	
	cube(vec3(-w, -w, -w),
				vec3( w, -w, -w),
				vec3( w,  w, -w),
				vec3(-w,  w, -w),
				vec3(-w,  w,  w),
				vec3( w,  w,  w),
				vec3( w, -w,  w),
				vec3(-w, -w,  w),
				verts);
				
				
					var colors = [];
	var red = vec4(1.0, 0.0, 0.0, 1.0);
	var grn = vec4(0.0, 1.0, 0.0, 1.0);
	var blu = vec4(0.0, 0.0, 1.0, 1.0);
	var org = vec4(1.0, 0.5, 0.0, 1.0);
	var ylw = vec4(1.0, 1.0, 0.0, 1.0);
	var blk = vec4(0.0, 0.0, 0.0, 1.0);
				
				colors.push(blu, blu, blu, blu, blu, blu);
				colors.push(org, org, org, org, org, org);
				colors.push(red, red, red, red, red, red);
				colors.push(blk, blk, blk, blk, blk, blk);
				colors.push(ylw, ylw, ylw, ylw, ylw, ylw);
				colors.push(grn, grn, grn, grn, grn, grn);
				
	
	
	

	
	// Configure WebGL
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 0.0);
	gl.enable(gl.DEPTH_TEST);

	// Compile shaders
	var vertShdr = compileShader(gl, gl.VERTEX_SHADER,
		`attribute vec4 vPosition;
		attribute vec4 vColor;
		varying vec4 fColor;
		uniform mat4 transform;
		
		void main()
		{
			gl_Position = transform *vPosition;
			fColor = vColor;
		}`
	);
	var fragShdr = compileShader(gl, gl.FRAGMENT_SHADER,
		`precision mediump float;
		varying vec4 fColor;
		void main()
		{
			gl_FragColor = fColor;
		}`
	);

	var program = linkProgram(gl, [vertShdr, fragShdr]);
	gl.useProgram(program);
	
	window.addEventListener("keydown",  onKeyDown); 
		
function onKeyDown(evt)
{
	var key = String.fromCharCode(evt.keyCode);
	//left arrow key
	
		if(key==='A')
		{
			translation[0]+=-.1;
		}
		if(key==='D')
		{
			translation[0]+=.1;
		}
		if(key==='W')
		{
			translation[1]+=.1;
		}
		if(key==='S')
		{
			translation[1]+=-.1;
		}
}	
slider.addEventListener("change", function SlideR()
	{
		choice = eval(slider.value);
		console.log(choice);
		render();
	});	


	transLoc = gl.getUniformLocation(program, "transform");
	
	

	// Load the vertex data into the GPU and associate with shader
	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(verts), gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	// Load the color data into the GPU and associate with shader
	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	
	// Render the static scene
	render();
});

function render(ms)
{
	
	
	
	console.log(choice);
	/**
	 * Render the scene.
	 */
	 if(ms)
	 {
		 
		 	  var elapsed_ms = ms- last_redraw;
			    last_redraw =ms;
		 
	 }
	
	else{last_redraw = performance.now();}


	 
	 //easy difficulty 10x10
	 if(choice ===0){
		 w = .07;
	 var x = w-1;
	var y = 1-w;
	for(var i =0;i<=9;i++)
	{
		
		x = w-1;
		for(var j = 0;j<=9;j++)
		{
			if(locations[i][j]===1)
			{
				var m = mult(rotateX(-30), translate(x,y,0));
				m = mult(rotateY(-30), m);
				gl.uniformMatrix4fv(transLoc, false, flatten(m));
				gl.drawArrays(gl.TRIANGLES, 0, verts.length);
			}
	 	x+=w*2;
		}
		y-=2*w;
	}
	verts = [];
	 }
	//medium difficulty 50x50
  if (choice ===1) {

	w=.01;
	var x = w-1;
	var y = 1-w;

	for(var i =0;i<=49;i++)
	{
		x = w-1;
		for(var j = 0;j<=49;j++)
		{
			 var random = Math.round(Math.random());
		
		
				
				if(random===1)
				{
						 console.log(random);
				var m = mult(rotateX(-30), translate(x,y,0));
				m = mult(rotateY(-30), m);
					gl.uniformMatrix4fv(transLoc, false, flatten(m));
					gl.drawArrays(gl.TRIANGLES, 0, verts.length);
				}
			
				
			
		x+=w*2;
		}
	y-=2*w;
	}
  }
	
	/*
			if(i===2 && j===0 )
			{
				
			}
		     if(i===dim-2 && j===dim)
			{
				
			}
		     if(j===dim || j===0 ||i===0 || i===dim)
			{
				var m = mult(rotateX(-30), translate(x,y,0));
				m = mult(rotateY(-30), m);
				gl.uniformMatrix4fv(transLoc, false, flatten(m));
				gl.drawArrays(gl.TRIANGLES, 0, verts.length);
			}
			*/
	
	
	//hard difficulty 100x100
	 if (choice ===2) {
	var x = w-1;
	var y = 1-w;
	w=.008;
	var dim = 49;
	for(var i =0;i<=dim;i++)
	{
		
		x = w-1;
		for(var j = 0;j<=dim;j++)
		{
			if(i===2 && j===0 )
			{
				
			}
		    if(i===dim-2 && j===dim)
			{
				
			}
		    if(j===dim || j===0 ||i===0 || i===dim)
			{
				var m = mult(rotateX(-30), translate(x,y,0));
				m = mult(rotateY(-30), m);
				gl.uniformMatrix4fv(transLoc, false, flatten(m));
				gl.drawArrays(gl.TRIANGLES, 0, verts.length);
			}
			else
			{
				var random = Math.round(Math.random());
			
				if(random===1)
				{
					var m = mult(rotateX(-30), translate(x,y,0));
					m = mult(rotateY(-30), m);
					gl.uniformMatrix4fv(transLoc, false, flatten(m));
					gl.drawArrays(gl.TRIANGLES, 0, verts.length);
				}
			}
		x+=w*2;
		}
		y-=2*w;
	}
}
	/*gl.uniform4f(transLoc,translation[0], translation[1], translation[2],0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, verts.length); */
	//window.requestAnimationFrame(render);

}


function rect(a, b, c, d, verts)
{
	/**
	 * Add the rectangle abcd to verts as two triangles.
	 */
	verts.push(a, b, c, a, c, d);
}


function cube(a, b, c, d, e, f, g, h, verts)
{
	/**
	 * Adds a cube to verts defined by the vertices a, b, c, d, e, f, g, h
	 * with abcd and efgh are opposite faces of the cube.
	 */
	 //faces of the cube
	rect(a, b, c, d, verts);
	rect(e, f, g, h, verts);
	rect(a, d, e, h, verts);
	rect(c, d, e, f, verts);
	rect(b, c, f, g, verts);
	rect(a, b, g, h, verts);
}

function tetrahedron(a, b, c, d, verts)
{
	/**
	 * Adds a tetrahedron to verts defined by the vertices a, b, c, and d.
	 */
	verts.push(	a, c, b,
				a, c, d,
				a, b, d,
				b, c, d);
}


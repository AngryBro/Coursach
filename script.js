function fx(x,y,a) {
	return a*x-y-x*(x*x+y*y);
}
function fy(x,y,a) {
	return a*y+x-y*(x*x+y*y);
}
function gx(x,y,a) {
	return a*x-y+x*(x*x+y*y);
}
function gy(x,y,a) {
	return a*y+x+y*(x*x+y*y);
}
function fr(r,a) {
	return a*r-r*r*r;
}
function gr(r,a) {
	return a*r+r*r*r;
}
function euler(start_x,start_y,dt,n,a,fx,fy) {
	var x = [start_x];
	var y = [start_y];
	for(var k = 1; k<=n; k++) {
		x.push(x[k-1]+fx(x[k-1],y[k-1],a)*dt);
		y.push(y[k-1]+fy(x[k-1],y[k-1],a)*dt);
	}
	return {x:x,y:y};
}
function eulerPolar1(start_r,start_phi,dt,n,a,fr) {
	var r = [start_r];
	var phi = [start_phi];
	for(var k = 1; k<=n; k++) {
		r.length++;
		phi.length++;
		r[k] = r[k-1]+fr(r[k-1],a)*dt;
		phi[k] = phi[k-1]+dt;
	}
	return {
		r:r,
		phi:phi
	};
}
function polar_to_decart(polar_points) {
	var x = [];
	var y = [];
	for(var i in polar_points.r) {
		x.push(polar_points.r[i]*Math.cos(polar_points.phi[i]));
		y.push(polar_points.r[i]*Math.sin(polar_points.phi[i]));
	}
	return {
		x:x,
		y:y
	};
}

function build1(a,dt,n,start_x,start_y,cases) {
	for(var i in arguments) {
		arguments[i] = Number(arguments[i]);
	}
	var points = cases?euler(start_x,start_y,dt,n,a,gx,gy):euler(start_x,start_y,dt,n,a,fx,fy);
	var len = document.getElementById('length').value;
	var size = document.getElementById('size').value;
	var oxy = new Oxy({length:len},{length:len});
	oxy.create('graph','cvs',size);
	oxy.plot(points);
}

function build(cases) {
	cases = 0;
	for(var i in arguments) {
		arguments[i] = Number(arguments[i]);
	}
	var points = cases?eulerPolar1(start_x,start_y,dt,n,a,gr):eulerPolar1(start_x,start_y,dt,n,a,fr);
	points = polar_to_decart(points);
	var len = 0.5;
	var size = 1000;
	var oxy = new Oxy({length:len},{length:len});
	oxy.create('graph','cvs',size);
	oxy.plot(points);
	var da = 0.001;
	a_field.innerHTML = 'a = '+Math.round(a*1000)/1000;
	if(flag) {
		a-=da;
	}
	else {
		a+=da;
	}
	if(Math.abs(a)>=0.2) {
		flag = !flag;
	}
}

function build2(cases) {
	cases = 1;
	for(var i in arguments) {
		arguments[i] = Number(arguments[i]);
	}
	var points = cases?eulerPolar1(start_x,start_y,dt,n,a,gr):eulerPolar1(start_x,start_y,dt,n,a,fr);
	points = polar_to_decart(points);
	var len = 0.5;
	var size = 1000;
	var oxy = new Oxy({length:len},{length:len});
	oxy.create('graph1','cvs1',size);
	oxy.plot(points);
	var da = 0.001;
	a_field.innerHTML = 'a = '+Math.round(a*1000)/1000;
	if(flag) {
		a-=da;
	}
	else {
		a+=da;
	}
	if(Math.abs(a)>=0.2) {
		flag = !flag;
	}
}

var a,dt,n,start_x,start_y,flag = false;
var a_field = document.getElementById('a');

a = -0.2;
dt = 0.1;
n = 10000;
start_x = 0.1;
start_y = 0;

setInterval(build,40);
setInterval(build2,40);

// var oxy = new Oxy({length:1},{length:1});
// 	oxy.create('graph','cvs',1000);
// 	var a = -0.005;
// 	var points = polar_to_decart(eulerPolar1(0.1,Math.PI/2,0.001,100000,a,gr));
// 	oxy.plot(points);
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
function euler(start_x,start_y,dt,n,a,fx,fy) {
	var x = [start_x];
	var y = [start_y];
	for(var k = 1; k<=n; k++) {
		var xkm1 = x[k-1];
		var ykm1 = y[k-1];
		var xk = xkm1 + fx(xkm1,ykm1,a)*dt;
		var yk = ykm1 + fy(xkm1,ykm1,a)*dt;
		if(isFinite(xk)&&isFinite(yk)) {
			x.push(xk); y.push(yk);
		}
	}
	return {x:x,y:y};
}
function build(a,dt,n,start_x,start_y,cases) {
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
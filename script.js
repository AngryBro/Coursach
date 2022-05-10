function f1(x,y,a) {
	return a*x-y-x*(x*x+y*y);
}
function f2(x,y,a) {
	return a*y+x-y*(x*x+y*y);
}
function euler(start_x,start_y,dt,n,a) {
	var x = [start_x];
	var y = [start_y];
	for(var k = 1; k<=n; k++) {
		var xkm1 = x[k-1];
		var ykm1 = y[k-1];
		var xk = xkm1 + f1(xkm1,ykm1,a)*dt;
		var yk = ykm1 + f2(xkm1,ykm1,a)*dt;
		x.push(xk); y.push(yk);
	}
	return {x:x,y:y};
}
function build(a,dt,n,start_x,start_y) {
	for(var i in arguments) {
		arguments[i] = Number(arguments[i]);
	}
	console.log(a,dt,n,start_x,start_y)
	var points = euler(start_x,start_y,dt,n,a); console.log(points);
	var len = document.getElementById('length').value;
	var size = document.getElementById('size').value;
	var oxy = new Oxy({length:len},{length:len});
	oxy.create('graph','cvs',size);
	oxy.plot(points);
}
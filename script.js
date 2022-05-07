// function f1(x,y,a) {
	// return a*x-y-x*(x*x+y*y);
// }
// function f2(x,y,a) {
	// return a*y+x-y*(x*x+y*y);
// }
function f1(x,y,a) {
	return a*x-y+x*(x*x+y*y);
}
function f2(x,y,a) {
	return a*y+x+y*(x*x+y*y);
}
function euler(n,dt,f1,f2,a,start) {
	var points = [start];
	for(var k = 1; k<=n; k++) {
		var xkm1 = points[k-1].x;
		var ykm1 = points[k-1].y;
		var xk = xkm1 + f1(xkm1,ykm1,a)*dt;
		var yk = ykm1 + f2(xkm1,ykm1,a)*dt;
		points.length++;
		points[k] = new Point(xk,yk);
	}
	return points;
}
function build(a,dt,n,start_x,start_y) {
	var start = new Point(start_x,start_y); console.log(1);
	var points = euler(n,dt,f1,f2,a,start); console.log(points);
	oxy.Plot ( svg, points, 10, 2, 'blue' );
}
var svg = new SVG(1000, 1000);
var oxy = new OXY(svg, 2, 20, 3, 'x', 'y', 2);
svg.Create(); console.log(2);
oxy.Draw(svg);
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
function euler(a,b,n,f1,f2,par) {
	var points = [new Point(0.1,0.1)];
	var dt = 1/10000;
	for(var k = 1; k<=n; k++) {
		var xkm1 = points[k-1].x;
		var ykm1 = points[k-1].y;
		var xk = xkm1 + f1(xkm1,ykm1,par)*dt;
		var yk = ykm1 + f2(xkm1,ykm1,par)*dt;
		points.length++;
		points[k] = new Point(xk,yk);
	}
	return points;
}
var svg = new SVG(1000, 1000);
var oxy = new OXY(svg, 2, 20, 3, 'x', 'y', 2);
svg.Create();
oxy.Draw(svg);
var points = euler(1,50,1000000,f1,f2,0.005);
oxy.Plot ( svg, points, 10, 3, 'blue' );
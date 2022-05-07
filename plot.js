/*
Синтаксис:
	var oxy = new oxy(x axis, y axis).create(div_id,cvs_id,size);
	t_axis = {
		name: 't', // default ''
		length: 10, // length from 0 to end, default 10
		thickness: 2, // default 2
		color: black // default
	}
	oxy.plot(points, style);
	style = {
		thickness: 2,
		color: blue
	}
	points = {
		x = [x0, x1, ..., xn],
		y = [y0, y1, ..., yn]
	}
	oxy.point(x,y)
*/
class oxy {
	constructor(x_axis,y_axis) {
		this.x_axis = x_axis;
		this.y_axis = y_axis;
	}
	create(div_id,cvs_id,size) {
		var div = document.getElementById(div_id);
		div.innerHTML = '<canvas id="'+cvs_id+'"></canvas>';
		this.canvas = document.getElementById(cvs_id);
		this.canvas.width = size;
		this.canvas.height = size;
		this.size = size;
	}
}

var oxy_ = new oxy(1,2);
oxy_.create('d','cvs',100);
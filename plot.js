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
console.log(`
	var oxy = new Oxy(x axis, y axis).create(div_id,cvs_id,size);
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
`)
class Oxy {
	constructor(x_axis,y_axis) {
		this.x_axis = {
			name: 'x',
			length: 10,
			thickness: 2,
			color: 'black',
			arrow_angle_ctg: 3,
			arrow_length: 20
		};
		for(var key in this.x_axis) {
			if(key in x_axis) {
				this.x_axis[key] = x_axis[key]; 
			}
		}
		this.y_axis = JSON.parse(JSON.stringify(this.x_axis));
		this.y_axis.name = 'y';
		for(var key in this.y_axis) {
			if(key in y_axis) {
				this.y_axis[key] = y_axis[key]; 
			}
		}
	}
	create(div_id,cvs_id,size) {
		var div = document.getElementById(div_id);
		div.innerHTML = '<canvas id="'+cvs_id+'"></canvas>';
		this.canvas = document.getElementById(cvs_id);
		this.canvas.width = size;
		this.canvas.height = size;
		this.size = size;
		this.ctx = this.canvas.getContext('2d');
		// this.ctx.fillStyle = this.x_axis.color;
		// this.ctx.fillRect(0,(size-this.x_axis.thickness)/2,size,this.x_axis.thickness);
		// this.ctx.fillStyle = this.y_axis.color;
		// this.ctx.fillRect((size-this.y_axis.thickness)/2,0,this.y_axis.thickness,size);
		this.ctx.strokeStyle = this.x_axis.color;
		this.ctx.fillStyle = this.x_axis.color;
		this.ctx.beginPath();
		this.ctx.moveTo(0,size/2);
		this.ctx.lineTo(size,size/2);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(size,size/2);
		this.ctx.lineTo(size-this.x_axis.arrow_length,size/2-
			Math.round(this.x_axis.arrow_length/this.x_axis.arrow_angle_ctg));
		this.ctx.lineTo(size-this.x_axis.arrow_length,size/2+
			Math.round(this.x_axis.arrow_length/this.x_axis.arrow_angle_ctg));
		this.ctx.lineTo(size,size/2);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.strokeStyle = this.y_axis.color;
		this.ctx.fillStyle = this.y_axis.color;
		this.ctx.beginPath();
		this.ctx.moveTo(size/2,0);
		this.ctx.lineTo(size/2,size);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(size/2,0);
		this.ctx.lineTo(size/2-
			Math.round(this.y_axis.arrow_length/this.y_axis.arrow_angle_ctg),
				this.y_axis.arrow_length);
		this.ctx.lineTo(size/2+
			Math.round(this.y_axis.arrow_length/this.y_axis.arrow_angle_ctg),
				this.y_axis.arrow_length);
		this.ctx.lineTo(size/2,0);
		this.ctx.closePath();
		this.ctx.fill();
	}
	point(x,y,style) {
		var style_default = {
			radius: 5,
			color: 'blue'
		};
		if(arguments.length==3) {
			for(var key in style_default) {
				if(!(key in style)) {
					style[key] = style_default[key];
				}
			}
		}
		else {
			style = JSON.parse(JSON.stringify(style_default));
		}
		x = this.size*(x/this.x_axis.length+1)/2;
		y = this.size*(-y/this.y_axis.length+1)/2;
		this.ctx.fillStyle = style.color;
		this.ctx.beginPath();
		this.ctx.arc(x,y,style.radius,0,Math.PI*2,false);
		this.ctx.closePath();
		this.ctx.fill();
	}
	inCanvas(x,y) {
		return (x>0)&&(x<this.size)&&(y>0)&&(y<this.size);
	}
	plot(points,style) {
		var style_default = {
			color: 'blue'
		};
		if(arguments.length==2) {
			for(var key in style_default) {
				if(!(key in style)) {
					style[key] = style_default[key];
				}
			}
		}
		else {
			style = JSON.parse(JSON.stringify(style_default));
		}
		var x_ = JSON.parse(JSON.stringify(points.x));
		var y_ = JSON.parse(JSON.stringify(points.y));
		var x = [];
		var y = [];
		for(var i in x_) {
			if(isFinite(x_[i])&&isFinite(y_[i])) {
				x.push(x_[i]);
				y.push(y_[i]);
			}
		}
		this.point(x[0],y[0],{color: style.color,radius:2});
		this.point(x[x.length-1],y[y.length-1],{color: style.color,radius:2});
		for(var i in x) {
			x[i] = Math.round(this.size*(x[i]/this.x_axis.length+1)/2);
		}
		for(var i in y) {
			y[i] = Math.round(this.size*(-y[i]/this.y_axis.length+1)/2);
		}
		for(var i in x) {
			if(!this.inCanvas(x[i],y[i])) {
				x[i] = -1;
				y[i] = -1;
			}
		}
		this.ctx.strokeStyle = style.color;
		this.ctx.beginPath();
		this.ctx.moveTo(x[0],y[0]);
		for(var i = 1; i<x.length; i++) {
			if(this.inCanvas(x[i],y[i])&&this.inCanvas(x[i-1],y[i-1])) {
				this.ctx.lineTo(x[i],y[i]);
			}
			else {
				this.ctx.moveTo(x[i],y[i]);
			}
		}
		this.ctx.moveTo(x[0],y[0]);
		this.ctx.closePath();
		this.ctx.stroke();
	}
}
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
		this.ctx.moveTo(size/2,0); console.log(this.y_axis)
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
		if(arguments.length==2) {
			style = {
				raduis: this.size/Math.min(this.x_axis.length,this.y_axis.length)/10,
				color: 'blue'
			};
		}
		this.ctx.fillStyle = style.color;
		this.ctx.beginPath();
		this.ctx.arc(x,y,style.radius,0,Math.PI*2,false);
		this.ctx.closePath();
		this.ctx.fill();
	}
}

var oxy1 = new oxy({},{});
oxy1.create('d','cvs',1000);
oxy1.point(10,10,{radius:10,color:'red'});
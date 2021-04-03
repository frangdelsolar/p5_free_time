
class Point {
    constructor(x, y, userData=null){
        this.x = x;
        this.y = y;
        this.userData = userData;
    }

    show(){
		stroke(0, 200, 200);
        strokeWeight(1);
        circle(this.x, this.y, 3);
    }
}

class Circle {
    constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.rsq = this.r * this.r;
    }

    contains(point) {
		let d = (point.x - this.x) ** 2 + (point.y - this.y) ** 2;
		return d <= this.rsq;
    }

	intersects(rango) {
		let x_dist = abs(rango.x - this.x);
		let y_dist = abs(rango.y - this.y);

		let r = this.r;

		let w = rango.w;
		let h = rango.h;

		let edges = (x_dist - w) ** 2 + (y_dist - h) ** 2;

		if (x_dist > r + w || y_dist > r + h){
            return false;
        } else if (x_dist <= w || y_dist <= h){
            return true;
        } else {
            return edges <= self.rsq;
        }
    }
}

class Rectangle{
	constructor (x, y, w, h){
		this.x = x; 
		this.y = y;
		this.w = w;
        this.h = h;
    }

	contains(point){
		return (point.x >= this.x && 
				point.x <= this.x + this.w &&
				point.y >= this.y &&
                point.y <= this.y + this.h);
        }

	intersects(rango){
		return !(rango.x > this.x + this.w ||
				    rango.x + rango.w < this.x ||
				    rango.y > this.y + this.h ||
                    rango.y + rango.h < this.y);
        }
}

class QuadTree {
	constructor (boundary, n){
		this.boundary = boundary;
		this.capacity = n;
		this.points = [];
		this.divided = false;
		this.northeast = null;
		this.northwest = null;
		this.southeast = null;
		this.southwest = null;
    }

	subdivide(){
		let x = this.boundary.x;
		let y = this.boundary.y;
		let w = this.boundary.w;
		let h = this.boundary.h;
		let ne = new Rectangle(x + w/2, y,       w/2, h/2);
		let nw = new Rectangle(x,       y,       w/2, h/2);
		let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
		let sw = new Rectangle(x,       y + h/2, w/2, h/2);
		this.northeast = new QuadTree(ne, this.capacity);
		this.northwest = new QuadTree(nw, this.capacity);
		this.southeast = new QuadTree(se, this.capacity);
		this.southwest = new QuadTree(sw, this.capacity);
        this.divided = true;
    }

	insert (point){
		if (!this.boundary.contains(point)){
            return;
        }

		if (this.points.length < this.capacity){
            this.points.push(point);
        } else {
			if (this.divided == false) {
                this.subdivide();
            }

			this.northeast.insert(point);
			this.northwest.insert(point);
			this.southeast.insert(point);
            this.southwest.insert(point);
        }
    }


	show() {
		stroke(255);
		noFill();
		strokeWeight(1);
		rect(
		  this.boundary.x,
		  this.boundary.y,
		  this.boundary.w,
		  this.boundary.h
		);
		for (let p of this.points) {
		  p.show();
		}
	
		if (this.divided) {
		  this.northeast.show();
		  this.northwest.show();
		  this.southeast.show();
		  this.southwest.show();
		}
	  }

	query(rango, found) {

		if (!rango.intersects(this.boundary)){
            return;
        } else {
			for (let p of this.points){

				if (p in found == false){
					if (rango.contains(p)){
                        found.push(p);
                    }
                }
            }

			if (this.divided) {
				this.northwest.query(rango, found);
				this.northeast.query(rango, found);
				this.southwest.query(rango, found);
                this.southeast.query(rango, found);
            }
        }

        return found;
    }
}
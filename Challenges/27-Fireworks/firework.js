function Firework(maxParticles = 100, dampener = random(0.85, 0.95), hu = random(360)) {
	this.firework = new Particle(
		pos=createVector(random(width), height),
		vel=createVector(0, random(-15, -5)));
	this.willExplode = true;
	this.particles = [];
	this.maxParticles = maxParticles;
	this.dampener = dampener;
	this.hu = hu;
	this.done = false;

	this.update = function() {
		if(this.willExplode) {
			this.firework.applyForce(gravity);
			this.firework.update();
			if (this.firework.vel.y >= 0) {
				this.willExplode = false;
				this.explode();
			}
		}
		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].applyForce(gravity);
			this.particles[i].lifespan -= 4;
			this.particles[i].update();
			if(this.particles[i].lifespan <= 0) {
				this.particles.splice(i, 1);
				if(this.particles.length <= 0) {
					this.done = true;
				}
			}
		}
	}
	
	this.show = function() {
		if(this.willExplode) {
			colorMode(RGB);
			this.firework.show();
		}
		for (let i = 0; i < this.particles.length; i++) {
			colorMode(HSB);
			this.particles[i].show();
		}
	}

	this.explode = function() {
		for (let i = 0; i < this.maxParticles; i++) {
			var v = p5.Vector.random2D();
			v.mult(random(1, 6));
			var p = new Particle(
				createVector(this.firework.pos.x, this.firework.pos.y),
				v,
				this.dampener,
				this.hu);
			this.particles.push(p);
		}
	}
}
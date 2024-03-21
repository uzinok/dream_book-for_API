// Звёздный фон
function bdCanvas(canvas) {
	document

	const opts = {
		minRadius: 0.1,
		maxRadius: 0.6,
		delay: 100,
		step: 0.05,
		trangles: 4,
		intervalRadius: 2,
	}

	// let canvas = document.querySelector("#bg-canvas");
	let ctx = canvas.getContext("2d");
	let w;
	let h;
	const arrStars = [];
	let check;
	let animations;

	resizeCanvas();

	function resizeCanvas() {
		w = canvas.width = window.innerWidth;
		// h = canvas.height = window.innerHeight;
		h = canvas.height = document.body.clientHeight;
		return w, h;
	}

	window.addEventListener("resize", function() {
		windowResize();
	});

	document.body.addEventListener("DOMSubtreeModified", function(e) {
		window.setTimeout(function() {
			windowResize();
		}, 1500)
	}, false);

	function windowResize() {
		arrStars.length = 0;
		clearTimeout(check);
		check = setTimeout(function() {
			clearInterval(animations);
			resizeCanvas();
			setup();
		}, 10)
	}

	const Stars = function(w, h) {
		this.x = Math.random() * w;
		this.y = (Math.random() * h);
		this.color = '#513a24';
		this.vector = Math.round(Math.random()) || -1;
		this.minRadius = opts.minRadius + Math.random() * (opts.maxRadius - opts.minRadius);
		this.maxRadius = this.minRadius + opts.intervalRadius;

		this.draw = function() {

			ctx.beginPath();

			ctx.moveTo(this.x, this.y + this.minRadius);

			for (var i = 0; i < 2 * opts.trangles + 1; i++) {
				var r = (i % 2 == 0) ? this.minRadius : this.maxRadius;
				// var a = (Math.PI * i / opts.trangles) + 45 * Math.PI / 180;
				// ctx.lineTo(this.x + r * Math.sin(a), this.y + r * Math.cos(a));
				ctx.arc(this.x, this.y, r, 0, 2 * Math.PI)
			};

			ctx.closePath();
			ctx.fillStyle = this.color;
			ctx.fill();

		}

		this.update = function() {
			this.check();
			this.minRadius += opts.step * this.vector;
			this.maxRadius += opts.step * this.vector;
		}

		this.check = function() {
			if (this.minRadius > opts.maxRadius || this.minRadius < opts.minRadius) {
				this.vector *= -1;
			}
		}

	}

	function setup() {
		for (let i = 0; i < (w / 60) * (h / 60); i++) {
			arrStars.push(new Stars(w, h));
			arrStars[i].draw();
		}
		loop();
	}

	setup();

	function loop() {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: no-preference)')

		if (prefersReducedMotion.matches) {
			animations = setInterval(function() {
				ctx.clearRect(0, 0, w, h);
				for (let i = 0; i < arrStars.length; i++) {
					arrStars[i].update();
					arrStars[i].draw();
				}
			}, opts.delay);
		}
	}

}

// nav toggle
const menubutton = document.querySelector('.header__nav-toggle');
const menu = document.querySelector('.header__nav-list');

menubutton.addEventListener('click', function() {
	this.classList.toggle('header__nav-toggle--open');
	if (this.classList.contains('header__nav-toggle--open')) {
		this.removeAttribute('aria-expanded', 'true');
	} else {
		this.setAttribute('aria-expanded', 'true');
	}
});

menu.addEventListener('click', function(e) {
	if (e.target.tagName == 'A') {
		menubutton.classList.toggle('header__nav-toggle--open');
		menubutton.removeAttribute('aria-expanded', 'true');
	}
});

bdCanvas(document.querySelector('#bg-canvas'));

new Date().getFullYear();
const yearElem = document.querySelectorAll('.ryear');

for (let i = 0; i < yearElem.length; i++) {
	yearElem[i].innerText = new Date().getFullYear();
}

$(document).ready(function() {
	var $bgBlock = $('.index-block');
	var $fgBlock = $('.waiting-block');


	$('.button-next').on('click', function(e) {
		$fgBlock.fadeIn(3000, function() {
			console.log('done!');
		});

		$bgBlock.fadeOut(1500, function() {
			console.log('done!');
		});
	});
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth',
		});
		window.location.hash = this.getAttribute('href');
	});
});

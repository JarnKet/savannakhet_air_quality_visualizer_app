(() => {
	function setUp() {
		const rainContainer = document.querySelector('.rain-container');
		const background = 'linear-gradient(transparent, white)';

		return {
			rainContainer,
			background,
			amount: 100,
		};
	}

	function setRainDropProperty() {
		return {
			width: Math.random() * 5 + 'px',
			positionX: Math.floor(Math.random() * window.innerWidth) + 'px',
			delay: Math.random() * -20 + 's',
			duration: Math.random() * 5 + 's',
			opacity: Math.random() + 0.2,
		};
	}

	function setDropStyle({
		drop,
		width,
		positionX,
		delay,
		duration,
		background,
		opacity,
	}) {
		drop.style.width = width;
		drop.style.left = positionX;
		drop.style.animationDelay = delay;
		drop.style.animationDuration = duration;
		drop.style.background = background;
		drop.style.opacity = opacity;
	}

	function run() {
		const { rainContainer, background, amount } = setUp();

		for (let index = 0; index < amount; index++) {
			const drop = document.createElement('i');
			const { width, positionX, delay, duration, opacity } =
				setRainDropProperty();
			setDropStyle({
				drop,
				width,
				positionX,
				delay,
				duration,
				background,
				opacity,
			});
			rainContainer.appendChild(drop);
			const i = document.querySelectorAll('i');
			console.log(i);
		}
	}

	run();
})();

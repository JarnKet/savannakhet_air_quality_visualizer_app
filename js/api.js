(() => {
	const KEY = 'c49719c6-6db0-447a-bb57-3a07758c55c5';

	async function getAirQuality({ lat, lon }) {
		const response = await fetch(
			// `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${KEY}`
			`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${KEY}`
		);

		const {
			data: { state, city, country, current },
		} = await response.json();

		const { pollution, weather } = current;
		return {
			state,
			city,
			country,
			aqi: pollution.aqius,
			temperature: weather.tp,
			humidity: weather.hu,
			wind: weather.ws,
		};
	}

	function displayAirQuality({
		city,
		state,
		country,
		aqi,
		temperature,
		humidity,
		wind,
	}) {
		const cityElem = document.querySelector('.city');
		const stateElem = document.querySelector('.state-country');
		const aqiElem = document.querySelector('.aqi > h1');
		const temperatureElem = document.querySelector('.temperature');
		const humidityElem = document.querySelector('.humidity');
		const windElem = document.querySelector('.wind');

		cityElem.innerText = city;
		stateElem.innerText = `${state}, ${country}`;
		aqiElem.innerText = aqi;
		temperatureElem.innerText = `Temp: ${temperature} c`;
		humidityElem.innerText = `humidity: ${humidity} %`;
		windElem.innerText = `wind: ${wind} m/s`;
	}

	function setAirQuality(aqi) {
		if (aqi <= 50) {
			document.documentElement.style.setProperty(
				`--current-aqi-color`,
				`var(--good-aqi-color)`
			);
		} else if (aqi <= 100) {
			document.documentElement.style.setProperty(
				`--current-aqi-color`,
				`var(--medium-aqi-color)`
			);
		} else {
			document.documentElement.style.setProperty(
				`--current-aqi-color`,
				`var(--bad-aqi-color)`
			);
		}
	}

	async function run() {
		// const city = 'Thakhek';
		// const state = 'Khammouan';
		// const country = 'Laos';
		const lat = 16.56505;
		const lon = 104.75273;

		const { state, city, country, aqi, temperature, humidity, wind } =
			await getAirQuality({
				lat,
				lon,
			});
		displayAirQuality({
			state,
			city,
			country,
			aqi,
			temperature,
			humidity,
			wind,
		});

		setAirQuality(aqi);
	}
	run();
})();

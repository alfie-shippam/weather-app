const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () =>{

        const APIKey = 'c88e0d476c6a02d525663f37e7b6d2c8'
        const city = document.querySelector('.search-box input').value;

        if (city === '')
            return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '30rem';
                error404.style.display = 'flex';
                weatherBox.style.display ='none';
                weatherDetails.style.display = 'none';
                return;
            }

            error404.style.display ='none';

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const rain = document.querySelector('.weather-details .rain span');
            const uv = document.querySelector('.weather-details .uv-index span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;
                
                case 'Clouds':
                    image.src = 'img/cloud.png';
                    break;

                case 'Rain':
                    image.src = 'img/rainy.png';
                    break;

                case 'Haze':
                    image.src = 'img/mist.png';
                    break;

                case 'Snow':
                    image.src = 'img/Snowy.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            rain.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = 'flex';
            container.style.height = '40rem';
            });
        });
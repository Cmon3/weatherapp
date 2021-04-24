// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid)

const APIkey = '2c0cee37fdc74c5bb0b13e7444c5dd55';
const baseURL = 'https://api.weatherbit.io/v2.0/current?';
const latitude = 53.349924;
const longitude = -6.262208;
/*lat =
&
lon = 
&
key =*/

//const URL = `${baseURL}lat=${latitude}&lon=${longitude}&key=${APIkey}`;

const getUserPosition = () => {
    console.log('from getUserForPosition');
    navigator.geolocation.getCurrentPosition((location) => onPositionReceived(location), (error) => onPositionDenied(error));
}

const onPositionReceived = (position) => {
    const { coords: { latitude, longitude } } = position;
    callWeatherAPIWithCoords(latitude, longitude);
};

const onPositionDenied = (error) => {
    const { message } = error;
    console.error(error);
    const notificationDiv = document.getElementsByClassName('notification');
    const notification = notificationDiv[0];
    
    const p = document.createElement('p');
    p.innerText = message;

    notificationDiv.appendChild(p);
}

const callWeatherAPIWithCoords = (latitude, longitude) => {
    const URL = `${baseURL}lat=${latitude}&lon=${longitude}&key=${APIkey}`;
    //console.log('from callWeatherAPIWithCoords');
    const call = fetch(URL);
    //if the call goes right || 200;
    call.then((response) => response.json()).then((weatherInfo) => showWeatherInfo(weatherInfo.data[0])); 
    // if something goes wrong || 403, 404, 402..
    call.catch((error) => console.error('Something went wrong', error));
}

const showWeatherInfo = (weatherObject) => {
    console.log('weather Info Element', weatherObject);
    const { 
        city_name, 
        country_code, 
        temp,
        weather: { description, icon } 
    } = weatherObject;

    const descriptionP = document.querySelector('.temperature-description p');
    descriptionP.innerText = description;
    
    const locationP = document.querySelector('.location p');
    locationP.innerText = `${city_name}, ${country_code}`;
    //const [ descriptionDiv ] = descripElements; same const description = descripElements[0]
    const temperatureValueP = document.querySelector('.temperature-value p');
    temperatureValueP.innerHTML = `${temp}º <span>C</span>`;

    const weatherIconImg = document.querySelector('.weather-icon img');
    const iconWithoutFirstLetter = icon.slice(1);
    weatherIconImg.setAttribute('src', `icons/${iconWithoutFirstLetter}.png`);
}

getUserPosition();

// Realiza a requisição à API e retorna os dados formatados em JSON.
function getRequest(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(); 
    
    return JSON.parse(request.response);
}

// Atualiza os dados atuais.
function updateCurrentDaySection(weatherData) {
    // Atualiza o nome da cidade.
    cityName.innerHTML = weatherData.results.city;
    
    // Atualiza o dia da semana.
    const dayAbbr = weatherData.results.forecast[0].weekday;
    dayAndTime.innerHTML = `${daysOfWeek[dayAbbr]}, ${weatherData.results.time}`;
    
    // Atualiza a temperatura.
    temperature.innerHTML = `${weatherData.results.temp}°C`;
    minTemp.innerHTML = `min: ${weatherData.results.forecast[0].min}°C`;
    maxTemp.innerHTML = `max: ${weatherData.results.forecast[0].max}°C`;

    // Atualiza o ícone.
    const weatherDescription = weatherData.results.description;
    icon.className = icons[weatherDescription];
}

// Atualiza os dados dos dias seguintes.
function updateNextDaysSection(weatherData) {
    for (let i = 0; i <= 6; i++) {
        const day = nextDays[i].firstElementChild;
        const dayAbbr = weatherData.results.forecast[i].weekday;
        
        day.innerHTML = dayAbbr;
    
        nxdMin[i].innerHTML = `min: ${weatherData.results.forecast[i].min}°C`;
        nxdMax[i].innerHTML = `max: ${weatherData.results.forecast[i].max}°C`;

        const weatherCondition = weatherData.results.forecast[i].description;
        nextDays[i].children[1].className = icons[weatherCondition];
    }
}

// Atualiza os dados conforme a cidade selecionada.
function selectCity(select) {

    let weatherData;

    if (select.value != 'user_ip=remote') {
        weatherData = getRequest(`https://api.hgbrasil.com/weather?format=json-cors&key=34ff8b50&woeid=${select.value}`);
        console.log(weatherData);
    } else {
        weatherData = getRequest(`https://api.hgbrasil.com/weather?format=json-cors&key=34ff8b50&${select.value}`);

        console.log(weatherData);
    }

    updateCurrentDaySection(weatherData);
    updateNextDaysSection(weatherData);
}

// ============================================================

const daysOfWeek = {
    'Dom': 'domingo',
    'Seg': 'segunda-feira',
    'Ter': 'terça-feira',
    'Qua': 'quarta-feira',
    'Qui': 'quinta-feira',
    'Sex': 'sexta-feira',
    'Sáb': 'sábado'
}

const icons = {
    'Tempestade forte': 'wi wi-thunderstorm',
    'Tempestade tropical': 'wi wi-thunderstorm',
    'Furacão': 'wi wi-hurricane',
    'Tempestades severas': 'wi wi-thunderstorm',
    'Tempestades': 'wi wi-storm-showers',   
    'Misto de neve e chuva': 'wi wi-day-snow-thunderstorm',        
    'Misto chuva e gelo': 'wi wi-storm-showers',             
    'Misto neve e gelo': 'wi wi-storm-showers',             
    'Geada fina': 'wi wi-snow',             
    'Chuviscos': 'wi wi-day-sprinkle',             
    'Congelamento chuva': 'wi wi-snowflake-cold',            
    'Alguns chuviscos': 'wi wi-day-sprinkle',            
    'Alguns chuviscos': 'wi wi-day-sprinkle',
    'Neve baixa': 'wi wi-snow',
    'Tempestade com neve': 'wi wi-snow',
    'Ventania com neve': 'wi wi-snow',
    'Neve': 'wi wi-snow',
    'Granizo': 'wi wi-snowflake-cold',
    'Gelo': 'wi wi-snowflake-cold',
    'Poeira': 'wi wi-dust',
    'Neblina': 'wi wi-fog',
    'Tempestade de areia': 'wi wi-sandstorm',
    'Fumacento': 'wi wi-smoke',
    'Vento acentuado': 'wi wi-strong-wind',
    'Ventania': 'wi wi-strong-wind',
    'Tempo frio': 'wi wi-snowflake-cold',
    'Tempo nublado': 'wi wi-cloudy',
    'Tempo limpo': 'wi wi-day-sunny',
    'Tempo nublado': 'wi wi-cloudy',
    'Parcialmente nublado': 'wi wi-day-cloudy',
    'Tempo limpo': 'wi wi-day-sunny',
    'Ensolarado': 'wi wi-day-sunny',
    'Estrelado': 'wi wi-stars',
    'Ensolarado com muitas nuvens': 'wi wi-day-cloudy',
    'Misto chuva e granizo': 'wi wi-storm-showers',
    'Ar quente': 'wi wi-hot',
    'Tempestades isoladas': 'wi wi-rain-mix',
    'Trovoadas dispersas': 'wi wi-lightning',
    'Trovoadas dispersas': 'wi wi-lightning',
    'Chuvas esparsas': 'wi wi-sleet',
    'Pesados neve': 'wi wi-snow',
    'Chuviscos com neve': 'wi wi-snow',
    'Neve pesada': 'wi wi-snow',
    'Sol com poucas nuvens': 'wi wi-day-cloudy',
    'Chuva': 'wi wi-rain',
    'Queda de neve': 'wi wi-snow',
    'Tempestades isoladas': 'wi wi-rain-mix',
    'Serviço não disponível': 'wi wi-na'
}

const weatherData = getRequest('https://api.hgbrasil.com/weather?format=json-cors&key=34ff8b50&user_ip=remote');
const cityName = document.querySelector('#city-name');
const dayAndTime = document.querySelector('#day-and-time');
const icon = document.querySelector('.icon').firstElementChild;
const temperature = document.querySelector('.temperature');
const minTemp = document.querySelector('#min');
const maxTemp = document.querySelector('#max');
const nextDays = document.getElementsByClassName('next-day-wrapper');
const nextDaysMinMax = document.getElementsByClassName('next-day-min-max');
const nxdMin = document.getElementsByClassName('nxd-min');
const nxdMax = document.getElementsByClassName('nxd-max');

updateCurrentDaySection(weatherData);
updateNextDaysSection(weatherData);


function backgroundImage(weather) {

    switch (weather) {
        case 'Clear':
            return 'App';
        case 'Clouds':
            return 'App cloudy';
        case 'Rain':
        case 'Drizzle':
            return 'App rain';
        case 'Snow':
            return 'App snow';
        case 'Thunderstorm':
            return 'App storm';
        case 'Fog':
        case 'Mist':
            return 'App foggy';
        default:
            return 'App haze';
    }
}


export default backgroundImage;
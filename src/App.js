import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WETHER_API_KEY } from './api';
import { useEffect, useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] =  useState(null);

const iniData = () => {
  const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${24.4511}&lon=${54.3969}&appid=${WETHER_API_KEY}&units=metric`);

    const currentforcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${24.4511}&lon=${54.3969}&appid=${WETHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, currentforcastFetch])
    .then(async (response) => {
      const wetherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      
      setCurrentWeather({city:'Abu Dhabi, AE'  , ...wetherResponse});
      setForecast({city:'Abu Dhabi, AE', ...forecastResponse});
    })
    .catch((err) => console.log(err))
}


  useEffect(()=> {
    iniData();
  },[]);

  

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WETHER_API_KEY}&units=metric`);

    const currentforcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WETHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, currentforcastFetch])
    .then(async (response) => {
      const wetherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      
      setCurrentWeather({city:searchData.label  , ...wetherResponse});
      setForecast({city:searchData.label, ...forecastResponse});
    })
    .catch((err) => console.log(err))

  }

  console.log(currentWeather);
  console.log(forecast)

  return (
    <div className="container">
      <Search 
        onSearchChange={handleOnSearchChange}
      />
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;

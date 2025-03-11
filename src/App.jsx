import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('New York');
  const [inputCity, setInputCity] = useState('New York');
  const [weatherData, setWeatherData] = useState({
    temperature: 72,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 8,
    forecast: [
      { day: 'Today', temp: 72, condition: 'sunny' },
      { day: 'Tomorrow', temp: 68, condition: 'cloudy' },
      { day: 'Wednesday', temp: 65, condition: 'rainy' },
      { day: 'Thursday', temp: 70, condition: 'partly-cloudy' },
      { day: 'Friday', temp: 75, condition: 'sunny' }
    ]
  });
  const [isLoading, setIsLoading] = useState(false);

  // Cute SVG Icons
  const WeatherIcons = {
    Sun: () => (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="24" fill="#FFD700" stroke="#FF9900" strokeWidth="2" />
        <g stroke="#FF9900" strokeWidth="3" strokeLinecap="round">
          <line x1="50" y1="15" x2="50" y2="5" />
          <line x1="50" y1="95" x2="50" y2="85" />
          <line x1="15" y1="50" x2="5" y2="50" />
          <line x1="95" y1="50" x2="85" y2="50" />
          <line x1="26" y1="26" x2="19" y2="19" />
          <line x1="81" y1="81" x2="74" y2="74" />
          <line x1="26" y1="74" x2="19" y2="81" />
          <line x1="81" y1="19" x2="74" y2="26" />
        </g>
        <circle cx="40" cy="40" r="4" fill="#FFFFFF" fillOpacity="0.6" />
        <path d="M42,60 Q50,65 58,60" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Cloud: () => (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M25,60 Q10,60 10,45 Q10,30 25,30 Q25,10 50,10 Q75,10 75,30 Q90,30 90,45 Q90,60 75,60 Z" 
          fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2" />
        <circle cx="30" cy="35" r="4" fill="#EEEEEE" />
        <circle cx="65" cy="25" r="6" fill="#EEEEEE" />
        <path d="M35,45 Q40,42 45,45" fill="none" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    CloudRain: () => (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M25,45 Q10,45 10,35 Q10,25 25,25 Q25,10 50,10 Q75,10 75,25 Q90,25 90,35 Q90,45 75,45 Z" 
          fill="#BBBBFF" stroke="#9999CC" strokeWidth="2" />
        <circle cx="35" cy="25" r="4" fill="#CCCCEE" />
        <path d="M35,35 Q40,32 45,35" fill="none" stroke="#9999CC" strokeWidth="2" strokeLinecap="round" />
        
        <path d="M30,55 C28,65 26,75 24,85" fill="none" stroke="#6699FF" strokeWidth="3" strokeLinecap="round" />
        <path d="M50,50 C48,60 46,70 44,80" fill="none" stroke="#6699FF" strokeWidth="3" strokeLinecap="round" />
        <path d="M70,55 C68,65 66,75 64,85" fill="none" stroke="#6699FF" strokeWidth="3" strokeLinecap="round" />
        
        <circle cx="24" cy="85" r="2" fill="#6699FF" />
        <circle cx="44" cy="80" r="2" fill="#6699FF" />
        <circle cx="64" cy="85" r="2" fill="#6699FF" />
      </svg>
    ),
    CloudSun: () => (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="35" cy="35" r="15" fill="#FFD700" stroke="#FF9900" strokeWidth="2" />
        <g stroke="#FF9900" strokeWidth="2" strokeLinecap="round">
          <line x1="35" y1="12" x2="35" y2="7" />
          <line x1="35" y1="63" x2="35" y2="58" />
          <line x1="12" y1="35" x2="7" y2="35" />
          <line x1="63" y1="35" x2="58" y2="35" />
          <line x1="19" y1="19" x2="15" y2="15" />
          <line x1="55" y1="55" x2="51" y2="51" />
          <line x1="19" y1="51" x2="15" y2="55" />
          <line x1="55" y1="15" x2="51" y2="19" />
        </g>
        
        <path d="M40,70 Q25,70 25,60 Q25,50 40,50 Q40,35 60,35 Q80,35 80,50 Q90,50 90,60 Q90,70 80,70 Z" 
          fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2" />
        <circle cx="50" cy="55" r="3" fill="#EEEEEE" />
        <path d="M60,60 Q65,58 70,60" fill="none" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Umbrella: () => (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M50,10 L50,70" stroke="#663366" strokeWidth="3" />
        <path d="M50,10 C20,10 10,40 10,40 L90,40 C90,40 80,10 50,10 Z" fill="#FF66CC" stroke="#CC3399" strokeWidth="2" />
        <path d="M30,40 C30,25 70,25 70,40" fill="none" stroke="#CC3399" strokeWidth="2" strokeDasharray="3,2" />
        <path d="M50,70 C60,70 60,85 50,90" fill="none" stroke="#663366" strokeWidth="3" />
        <circle cx="50" cy="90" r="3" fill="#663366" />
      </svg>
    ),
    Loading: () => (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-spin">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#FFCCEE" strokeWidth="8" strokeDasharray="60 180" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#FF99CC" strokeWidth="8" strokeDasharray="40 130" strokeDashoffset="30" />
      </svg>
    )
  };

  // Function to get weather data
  const fetchWeatherData = (cityName) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate some random weather data based on the city name
      const newTemp = Math.floor(50 + Math.random() * 40); // Temperature between 50-90
      const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      // Generate random forecast
      const forecast = [];
      const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'];
      
      days.forEach((day, index) => {
        // The temperature should vary slightly each day
        const dayTemp = newTemp + Math.floor(Math.random() * 10) - 5;
        const dayCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        forecast.push({
          day,
          temp: dayTemp,
          condition: dayCondition
        });
      });
      
      // Update the weather data
      setWeatherData({
        temperature: newTemp,
        condition: randomCondition,
        humidity: Math.floor(40 + Math.random() * 50), // Humidity between 40-90
        windSpeed: Math.floor(5 + Math.random() * 15), // Wind between 5-20
        forecast
      });
      
      setCity(cityName);
      setIsLoading(false);
    }, 1500); // 1.5 second delay to simulate network request
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim() !== '') {
      fetchWeatherData(inputCity);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    if (isLoading) {
      return <WeatherIcons.Loading />;
    }
    
    switch (condition) {
      case 'sunny':
        return <WeatherIcons.Sun />;
      case 'cloudy':
        return <WeatherIcons.Cloud />;
      case 'rainy':
        return <WeatherIcons.CloudRain />;
      case 'partly-cloudy':
        return <WeatherIcons.CloudSun />;
      default:
        return <WeatherIcons.Sun />;
    }
  };

  // Get cute background color based on weather condition
  const getBackgroundColor = (condition) => {
    switch (condition) {
      case 'sunny':
        return 'bg-gradient-to-b from-blue-300 to-yellow-100';
      case 'cloudy':
        return 'bg-gradient-to-b from-blue-200 to-purple-100';
      case 'rainy':
        return 'bg-gradient-to-b from-blue-400 to-indigo-200';
      case 'partly-cloudy':
        return 'bg-gradient-to-b from-blue-300 to-pink-100';
      default:
        return 'bg-gradient-to-b from-blue-300 to-pink-100';
    }
  };

  // Get current date
  const getCurrentDate = () => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className={`h-screen w-screen flex flex-col transition-all duration-1000 ${getBackgroundColor(weatherData.condition)}`}>
      {/* Cute Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-pink-600 tracking-wide"> Weather</h1>
        <div className="w-8 h-8 text-pink-600">
          <WeatherIcons.Umbrella />
        </div>
      </header>

      {/* Cute Search */}
      <div className="px-6 py-2">
        <form onSubmit={handleSearch} className="bg-white bg-opacity-40 rounded-full p-2 pl-4 flex items-center shadow-md">
          <input
            type="text"
            value={inputCity}
            onChange={handleInputChange}
            className="flex-1 bg-transparent border-none outline-none text-pink-700 placeholder-pink-400"
            placeholder="Search location..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="bg-pink-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center"
            disabled={isLoading}
          >
            ↵
          </button>
        </form>
      </div>

      {/* Cute Weather Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white bg-opacity-30 rounded-3xl p-8 w-full max-w-sm shadow-lg">
          <div className="text-center mb-2 text-lg font-medium text-pink-700">
            {city} <span className="text-xs text-pink-500">{getCurrentDate()}</span>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="w-32 h-32">
              {getWeatherIcon(weatherData.condition)}
            </div>
          </div>
          <div className="text-center text-7xl font-light mb-4 text-pink-800">
            {isLoading ? '--' : weatherData.temperature}°
          </div>
          <div className="text-center text-xl capitalize mb-4 text-pink-700">
            {isLoading ? 'Checking weather...' : weatherData.condition}
          </div>
          
          <div className="flex justify-between text-pink-600">
            <div className="flex flex-col items-center">
              <span className="text-sm">Humidity</span>
              <span className="font-medium">{isLoading ? '--' : weatherData.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">Wind</span>
              <span className="font-medium">{isLoading ? '--' : weatherData.windSpeed} mph</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cute Forecast */}
      <div className="bg-white bg-opacity-20 p-4 rounded-t-3xl border-t-2 border-white border-opacity-30 shadow-inner">
        <div className="flex justify-between">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-pink-700 text-sm mb-1 font-medium">{day.day}</div>
              <div className="w-10 h-10 text-pink-600 mb-1">
                {isLoading ? <WeatherIcons.Loading /> : getWeatherIcon(day.condition)}
              </div>
              <div className="text-pink-800 font-bold">{isLoading ? '--' : day.temp}°</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Little cloud decorations */}
      <div className="absolute top-20 left-5 w-16 h-8 opacity-40">
        <WeatherIcons.Cloud />
      </div>
      <div className="absolute top-40 right-10 w-20 h-10 opacity-30">
        <WeatherIcons.Cloud />
      </div>
    </div>
  );
};

export default WeatherApp;
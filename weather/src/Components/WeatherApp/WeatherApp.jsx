import React, { useEffect } from 'react';
import { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import drizzle_icon from '../Assets/drizzle.png';
import drop_icon from '../Assets/drop.png';
import humidity_icon from '../Assets/humidity.png';
import wcloud_icon from '../Assets/one-cloud.png';
import storm_icon from '../Assets/storm.png';
import sun_icon from '../Assets/sun.png';
import sunnycloudy_icon from '../Assets/sunny-cloudy.png';
import twoclouds_icon from '../Assets/two-clouds.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [temperature, setTemperature] = useState('');
    const [location, setLocation] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [wicon, setWicon] = useState('');
    const [gradient, setGradient] = useState({
        id: '',
        startColor: '',
        endColor: '',
    });

    const iconMapping = {
        '01d': sun_icon,
        '02d': sunnycloudy_icon,
        '03d': wcloud_icon,
        '04d': twoclouds_icon,
        '04n': twoclouds_icon,
        '09d': drizzle_icon,
        '10d': drop_icon,
        '11d': storm_icon,
        '13d': wcloud_icon,
        '50d': wcloud_icon,
    };
    const gradients = [
        {
            id: '01d',
            startColor: '#1fa9ff',
            endColor: '#8ec6e4',
        },
        {
            id: '02d',
            startColor: '#305e74',
            endColor: '#91a7b1',
        },
        {
            id: '03d',
            startColor: '#305e74',
            endColor: '#91a7b1',
        },
        {
            id: '04d',
            startColor: '#305e74',
            endColor: '#91a7b1',
        },
        {
            id: '04n',
            startColor: '#305e74',
            endColor: '#91a7b1',
        },
        {
            id: '09d',
            startColor: '#305e74',
            endColor: '#91a7b1',
        },
        {
            id: '10d',
            startColor: '#305e74',
            endColor: '#91a7b1',
        },
        {
            id: '11d',
            startColor: '#4066A4',
            endColor: '#CFACA8',
        },
        {
            id: '13d',
            startColor: '#797C87',
            endColor: '#ACB7BD',
        },
        {
            id: '50d',
            startColor: '#B98EB6',
            endColor: '#5E5E91',
        },
    ];

    const api_key = process.env.REACT_APP_API_KEY;

    const handleInput = (e) => {
        setCityInput(e.target.value);
    };

    const search = async (e) => {
        e.preventDefault();
        try {
            if (cityInput === '') return 0;

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${api_key}&units=metric`;

            let response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response failed');
            }

            let data = await response.json();

            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemperature(data.main.temp);
            setLocation(data.name);

            setWicon(iconMapping[data.weather[0].icon] || sunnycloudy_icon);

            setGradient(
                gradients.find(
                    (gradient) => gradient.id === data.weather[0].icon
                )
            );

            setCityInput('');
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=${api_key}&units=metric`;

                let response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response failed');
                }

                let data = await response.json();

                setLocation(data.name);
                setHumidity(data.main.humidity);
                setWind(data.wind.speed);
                setTemperature(data.main.temp);

                setWicon(iconMapping[data.weather[0].icon] || sunnycloudy_icon);

                // setGradient(
                //     gradients.find(
                //         (gradient) => gradient.id === data.weather[0].icon
                //     )
                // );
            } catch (error) {
                console.error(error);
            }
        };
        fetchWeatherData();
    }, []);

    return (
        gradient && (
            <div
                className='container'
                style={{
                    background: `linear-gradient(180deg, ${gradient.startColor} 0%, ${gradient.endColor} 100%)`,
                }}
            >
                <div>
                    <form
                        onSubmit={search}
                        className='top-bar'
                    >
                        <input
                            type='text'
                            className='cityInput'
                            value={cityInput}
                            onChange={handleInput}
                        />
                        <button
                            type='sumbit'
                            className='search-icon'
                        >
                            <img
                                src={search_icon}
                                alt=''
                            />
                        </button>
                    </form>
                </div>
                <div className='weather-image'>
                    <img
                        src={wicon}
                        alt=''
                    />
                </div>
                <div className='weather-temp'>
                    {Math.floor(temperature)}
                    °C
                </div>
                <div className='weather-location'>{location}</div>
                <div className='data-container'>
                    <div className='element'>
                        <img
                            src={humidity_icon}
                            alt=''
                            className='icon'
                        />
                        <div className='data'>
                            <div className='humidity-percent'>{humidity} %</div>
                            <div className='text'>Humidity</div>
                        </div>
                    </div>
                    <div className='element'>
                        <img
                            src={wind_icon}
                            alt=''
                            className='icon'
                        />
                        <div className='data'>
                            <div className='wind-rate'>{wind} km/h</div>
                            <div className='text'>Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default WeatherApp;

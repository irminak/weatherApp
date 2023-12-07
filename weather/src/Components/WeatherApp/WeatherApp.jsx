import React from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
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
    return (
        <div className='container'>
            <div className='top-bar'>
                <input
                    type='text'
                    className='cityInput'
                />
                <div className='search-icon'>
                    <img
                        src={search_icon}
                        alt=''
                    />
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;

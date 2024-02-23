import React, { useEffect, useState } from "react";

import axios from "axios";

import css from "./WeatherPanel.module.css";

const WeatherPanel = ({ selectedTrip }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (selectedTrip) {
      const fetchForecastData = async () => {
        const API_KEY = "7AGEZLA4XX9KGW4SZUF75U7N5";
        const city = selectedTrip.city;
        const startDate = selectedTrip.startDate;
        const endDate = selectedTrip.endDate;

        const forecastWeatherDateUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;
        try {
          const response = await axios.get(forecastWeatherDateUrl);
          const fetchedForecastData = response.data;

          console.log("WeatherDataPeriod", fetchedForecastData);

          if (fetchedForecastData && fetchedForecastData.days) {
            setForecastData(fetchedForecastData.days.slice(0, 7));
          }
        } catch (error) {
          console.log("Error todayWeather", error);
        }
      };
      fetchForecastData();
    }
  }, [selectedTrip]);

  return (
    <div>
      {forecastData && (
        <div className={css.wrapperPanel}>
          <h3 className={css.titleWeek}>Week</h3>
          <ul className={css.itemWeather}>
            {forecastData.map((days, index) => (
              <li className={ css.listItem} key={index}>
                <p> {days.datetime}</p>
                <p className={ css.temp}> {days.temp} &#176;C</p>
                <p> {days.conditions}</p>
                {/* <span>
                  {days.icon && (
                    <img
                      src={`URL_TO_YOUR_WEATHER_ICONS/${days.icon}.jpg`}
                      alt={`Weather Icon for ${days.conditions}`}
                    />
                  )}
                </span> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherPanel;

import React, { useEffect, useState } from "react";

import axios from "axios";

import css from "./TodayWeather.module.css";

const TodayWeather = ({ selectedTrip }) => {
  const [todayWeather, setTodayWeather] = useState(null);

  useEffect(() => {
    const fetchtodayWeather = async () => {
      if (selectedTrip) {
        const API_KEY = "3YJTVU3DH396ZRGN48SMDCKPC";
        const city = selectedTrip.city;

        // URL для отримання прогнозу погоди вибраного міста
        const todayWeatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;

        try {
          const response = await axios.get(todayWeatherUrl);
          const todayData = response.data;
          console.log("todayData", todayData);

          setTodayWeather(todayData.days[0]);
        } catch (error) {
          console.log("Error fetching today's Weather:", error);
        }
      }
    };

    fetchtodayWeather();
  }, [selectedTrip]);

  return (
    <div className={css.wrapperToday}>
      {todayWeather && (
        <div className={css.boxDescrWeatherToday}>
          <p> {todayWeather.datetime}</p>
          <p className={css.temp}> {todayWeather.temp} &#176;C</p>
          <h4 className={css.city}> {selectedTrip.city}</h4>
          <p> {todayWeather.conditions}</p>
        </div>
      )}
    </div>
  );
};

export default TodayWeather;

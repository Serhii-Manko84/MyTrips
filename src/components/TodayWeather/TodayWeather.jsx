import React, { useEffect, useState } from "react";

import axios from "axios";

import css from "./TodayWeather.module.css";
import IconosWeather from "../../assets/icons/IconosWeather";

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
          <div className={css.wrapperTemp}>
            <div className={css.iconWeather}>
              <IconosWeather icon={todayWeather.icon} />
            </div>
            <p className={css.temp}>
              {todayWeather.temp} <sup className={css.tempSup}>&#176;C</sup>
            </p>
          </div>

          <h4 className={css.city}> {selectedTrip.city}</h4>
        </div>
      )}
    </div>
  );
};

export default TodayWeather;

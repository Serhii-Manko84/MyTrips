import React, { useState } from "react";

import css from "./App.module.css";

import TripList from "./TripList/TripList";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import TodayWeather from "./TodayWeather/TodayWeather";

const App = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);

  return (
    <div className={css.container}>
      <div className={css.boxTrips}>
        <div className={css.boxTripsList}>
          
          <TripList setSelectedTrip={setSelectedTrip} />
          <div className={css.boxWeatherPanel}>
            <WeatherPanel selectedTrip={selectedTrip} />
          </div>
        </div>
      </div>
      <div className={css.boxWeatherToday}>
        <TodayWeather selectedTrip={selectedTrip} />
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import axios from "axios";
import styles from "./App.module.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = "617d8906f04300b477be81c1cb5d0bfa";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        console.log(response.data.main.temp);
        console.log();
      });
      setLocation("");
    }
  };
  // const temp = data.main.temp.toFixed();
  // // console.log(temp);
  // const setTemp = Math.round(((temp - 32) * 5) / 9);
  // // console.log(setTemp);
  // const feel = data.main.feels_like
  // const setFeel = Math.round(((data.main.feels_like - 32) * 5) / 9);

  return (
    <div className={styles.app}>
      <div className={styles.search}>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.location}>
            {data.main ? <p> City {data.name}</p> : null}
          </div>
          <div className={styles.temp}>
            {data.main ? (
              <p> Temp {Math.round(((data.main.temp - 32) * 5) / 9)}°C</p>
            ) : null}
          </div>
          <div className={styles.description}>
            {data.sys ? <p> Country {data.sys.country}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className={styles.bottom}>
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {Math.round(((data.main.feels_like - 32) * 5) / 9)}°C
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className={styles.humidity}>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className={styles.wind}>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

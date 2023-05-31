import React, { useEffect, useState } from "react";
import "./style.css";

const Weather = () => {
  const [loading, setLoading] = useState();
  const [weatherState, setWeatherState] = useState("");
  const [searchValue, setsearchValue] = useState("Delhi");
  const [tempInfo, setTempInfo] = useState({});

  const getWeather = async () => {
    try {
      setLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`;
      const res = await fetch(url);
      const data = await res.json();
      setLoading(false);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNew = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNew);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tempInfo.weathermood) {
      switch (tempInfo.weathermood) {
        case "Clouds":
          setWeatherState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi-fog");
          break;
        case "Mist":
          setWeatherState("wi-dust");
          break;
        case "Dust":
          setWeatherState("wi-dust");
          break;
        case "Thunderstorm":
          setWeatherState("wi-day-thunderstorm");
          break;
        case "Rain":
          setWeatherState("wi-day-thunderstorm");
          break;
        default:
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
      }
    }
  }, [tempInfo.weathermood]);

  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let am = "AM";

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date();
  let monthName = month[d.getMonth()];

  let day = new Date().getDate();
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const week = new Date();
  let weekDay = weekday[week.getDay()];

  const year = new Date().getFullYear();

  const [htime, setHtime] = useState(hour);
  const [mtime, setMtime] = useState(minute);
  const [ampm, setAMPM] = useState(am);
  const [second, setSecond] = useState("")

  const updateTime = () => {
    am = "AM";
    hour = new Date().getHours();
    minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    am = hour > 12 ? ((hour = hour - 12), (am = "PM")) : am;
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;
    setHtime(hour);
    setMtime(minute);
    setSecond(second)
    setAMPM(am);
  };
  setInterval(updateTime, 1000);

  let sec = tempInfo.sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  const num = tempInfo.temp;

  const result = typeof num === "number" ? num.toFixed(0) : num;

  useEffect(() => {
    setsearchValue("");
  }, []);

  return (
    <>
      <div className="container">
       
        <div className="box">
          <h1 className="heading">
            {htime}:{mtime}:{second} {ampm}
          </h1>
          <h3 className="date">
            {monthName} {day} {year}, {weekDay}
          </h3>
          <div className="search">
            <input
              className="searchTerm"
              autoFocus
              id="search"
              value={searchValue}
              onChange={(e) => setsearchValue(e.target.value)}
              placeholder="Search"
            ></input>
            <button className="searchButton" type="button" onClick={getWeather}>
              search
            </button>
          </div>
          <div className="widget">
            <div className="wrapper">
              {loading ? (
                <div className="loading-img">
                <img src="./images/weatherIcons.gif" alt="img" />
                </div>
              ) : (
                <>
                  <div className="weatherInfo">
                    <span className="place">
                      <i className="fa fa-location-dot"></i>
                      {tempInfo.name},{tempInfo.country}
                    </span>
                    <br />
                    <div className="weatherIcon">
                      <i className={`wi ${weatherState}`}></i>
                    </div>
                    <h1 className="temperature">{result}°C</h1>
                    <span className="weathercondition">
                      {tempInfo.weathermood}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="detail">
              <span className="span">Weather details</span>
            </div>
            <div className="extra-temp">
              <div className="temp-info-minmax">
                <div className="two-sided-section">
                  <p>
                    <i className={"wi wi-sunset"}></i>
                  </p>
                  <p className="extra-info-leftside">
                    {timeStr} PM
                    <br />
                    Sunset
                  </p>
                </div>
                <div className="two-sided-section">
                  <p>
                    <i className={"wi wi-humidity"}></i>
                  </p>
                  <p className="extra-info-leftside">
                    {tempInfo.humidity} % <br />
                    Humidity
                  </p>
                </div>
              </div>
              <div className="weather-extra-info">
                <div className="two-sided-section">
                  <p>
                    <i className={"wi wi-rain"}></i>
                  </p>
                  <p className="extra-info-leftside">
                    {tempInfo.pressure} hpa <br />
                    Pressure
                  </p>
                </div>
                <div className="two-sided-section">
                  <p>
                    <i className={"wi wi-strong-wind"}></i>
                  </p>
                  <p className="extra-info-leftside">
                    {(tempInfo.speed * 3.6).toFixed(0)} km/h
                    <br />
                    Speed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-info">
        <a href="https://github.com/narendercoder/weatherApp" rel="noreferrer">
          Download Source Code
        </a>{" "}
        <span>| Developed by</span>{" "}
        <a target="_blank" href="https://www.linkedin.com/in/narender-singh-bisht-4529051b7/" rel="noreferrer">
          Narender Singh Bisht
        </a>
        </div>
      </div>
    </>
  );
};
export default Weather;

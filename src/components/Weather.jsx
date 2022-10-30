import axios from 'axios';
import React, { useEffect, useState } from 'react';
import background1 from "../assets/soleado.jpg";
import backgroun2 from "../assets/noche.jpg";

const Weather = () => {
 // obtengo la hora local
 const tiempoTranscurrido = Date.now();
 const time = new Date(tiempoTranscurrido).toLocaleTimeString();
 const hoy= new Date (tiempoTranscurrido).toDateString();
 const [actualTime,setActualTime]= useState(0);
 // actualizacion de hs en pantalla
 const timeActual =()=>{
  setActualTime(actualTime+1)
 }
 setInterval(timeActual,1000);
 
 
   
 

 const [weather,setWeather]=useState({});
 const[isCelsius,setIsCelsius]= useState(true);
 
 // convertir a celsius
 const tempCelsius =  (weather.main?.temp-273.15).toFixed();
  const sensCelsius =(weather.main?.feels_like-273.15).toFixed();
 
  
 useEffect(()=>{
 
  
  const success= (pos) =>{
   
   const lat= pos.coords.latitude;
   const lon= pos.coords.longitude;
   
   axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e3e7f727e11e921d57ca8bdcfef156ef`)
   .then(res=> setWeather(res.data));
  }
  navigator.geolocation.getCurrentPosition(success);
 },[]);
 


 

 console.log(weather)
 return (
  <div className='App' style={{backgroundImage:(time>"19:00:00 PM"&& time<"5:00:00 AM")?`url(${backgroun2})`:`url(${background1})`}} >
   <header className='header' style={{color:"white"}}>
    <h1>The Weather Now</h1>
   </header>
   <main className='app-body'>
    <section className='icon-information'>
     <h3 className='localization'>{weather.name} {weather.sys?.country}</h3>
     <p>{hoy} {time}</p>
     <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
     <p className='description'>{weather.weather?.[0]?.description}</p>
     <i className="fa-solid fa-temperature-three-quarters"></i>
     <h3>Temperature: {isCelsius? tempCelsius:(tempCelsius*1.8+32).toFixed()}
      {isCelsius? "°C":"°F"}
     </h3>
     <h3>Windchill: {isCelsius? sensCelsius:(sensCelsius*1.8+32).toFixed()}
      {isCelsius? "°C":"°F"}
     </h3>
     <button onClick={()=> setIsCelsius(!isCelsius)}>Convert °</button>
    </section>
    <section className='aditional-information'>
     <h3>Additional data</h3>
     <p><i className="fa-solid fa-droplet"></i> Humidity: {weather.main?.humidity} %</p>
     <p><i className="fa-solid fa-cloud-arrow-down"></i> Pressure: {weather.main?.pressure} mbar</p>
     <p><i className="fa-solid fa-eye"></i> Visibility: {weather.visibility/1000} km</p>
     <p><i className="fa-solid fa-wind"></i> Wind Speed: {weather.wind?.speed} km/h</p>
    </section>
   </main>
   
  </div>
 );
};

export default Weather;

import { useEffect, useState } from 'react';
import './App.css';
import Weather from './components/Weather';



function App() {
 // preloaded
 const [loading,setLoading]=useState(false);
 useEffect(()=>{
  setLoading(true);
  setTimeout(()=>{
   setLoading(false);
  },2000);
 },[]);

  return (
    <div  >
     {/* ternario para preloaded */}
     {loading ?(
     <div className="centrado">
     <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
     </div>
     ):(
     <div className="hidden">
     <Weather />
     </div>
     )}
     
     </div>
     
  )
}



export default App

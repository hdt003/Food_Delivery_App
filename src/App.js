import NavBar from './components/Navbar';
import Area from './components/Area';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile';
import { auth } from './firebase';
import { useEffect,useState } from 'react';
import ItemPage from './components/ItemPage';
import ContactUs from './components/ContactUs';
import Cart from './components/Cart';
function App() {
  const [Userid,setUserid]=useState("")
  const [mode,setMode]=useState("light");
  const [aalert,setAlert]=useState("Light Mode Enabled")

  useEffect(()=>{ 
    
    auth.onAuthStateChanged((user)=>{
      // console.log("user:",user)
      if(user){
        setUserid(user.uid)
      }
    });
    togglemode();
  },[])

      //to change mode
      const togglemode=()=>{
        
        if(mode==="dark")
        {
          setMode("light")
            // document.body.style.backgroundColor="rgb(45,82,71)";
            document.body.style.backgroundImage="none"
            document.body.style.backgroundImage="linear-gradient(90deg, #3EADCF 0%, #ABE9CD 100%)";//blue //rgb(71, 194, 255)"//linear-gradient(90deg, #ff4800 0%, #dd2476 100%)
            document.body.style.color="black"
            setAlert("dark mode Enabled")
            // console.log("light")
            document.title="Menu App - Light mode"
        }
         if(mode==="light")
        {
          setMode("dark")//linear-gradient(to right, #0000ff, #add8e6)
          document.body.style.backgroundImage = "none";
          document.body.style.backgroundColor="rgb(48, 51, 51)";//black
          document.body.style.color="white"
          setAlert("Light mode Enabled")
          // console.log("dark")
          document.title="Menu App - Dark mode"
        }
    }

    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    
    function alertfunc() {
      var wrapper = document.createElement('div')
      wrapper.innerHTML = '<br/><div class="alert alert-success alert-dismissible text-dark text-center border-2 border-dark" role="alert">' + aalert + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      alertPlaceholder.appendChild(wrapper)
      clc()
    }

  function timeBasedFood(date) {
    var hours = date.getHours();
    if((hours>=4 && hours<11) || (hours>=16 && hours<=17))
    return "Breakfast";
    else if(hours>=11 && hours<16)
    return "Lunch";
    else if((hours>=18 && hours<=23) || (hours>=0 && hours<=3) )
    return "Dinner";
  }

  //to clear alert box every 6 seconds
  function clc(){
  setTimeout(() => {
    // clearBox()
    document.getElementById('liveAlertPlaceholder').innerHTML = "";
  }, 5000);
} 

  return (
    <>
    <div>
    <Router>
      <hr style={{width:"10px"}}/>
    <NavBar mode={mode} togglemode={togglemode} alert={alertfunc}/>
    <div className='mt-5 container ' id="liveAlertPlaceholder"></div>
    {/* <br/> */}
        <Routes>
            <Route exact path="/" element={<Area uid={Userid } value={timeBasedFood(new Date)} field="type" pagename="home" mode={mode}/> }/>
            <Route exact path="Breakfast" element={<Area uid={Userid } value="Breakfast" field="type" mode={mode}/>}/>
            <Route exact path="Lunch" element={<Area uid={Userid } value="Lunch" field="type" mode={mode}/>}/>
            <Route exact path="Dinner" element={<Area uid={Userid } value="Dinner" field="type" mode={mode}/>}/>

            <Route exact path="Veg" element={<Area uid={Userid } value="Veg" field="food_type" mode={mode}/>}/>
            <Route exact path="Non_Veg" element={<Area uid={Userid } value="Non-Veg" field="food_type" mode={mode}/>}/>

            <Route exact path="htol" element={<Area uid={Userid } value="htol" field="popularity" mode={mode}/>}/>
            <Route exact path="ltoh" element={<Area uid={Userid } value="ltoh" field="popularity" mode={mode}/>}/>
            
            <Route exact path="/price_ltoh" element={<Area uid={Userid } value="price_ltoh" field="price" mode={mode}/>}/>
            <Route exact path="/price_htol" element={<Area uid={Userid } value="price_htol" field="price" mode={mode}/>}/>
            
            <Route exact path="/contact" element={<ContactUs uid={Userid } mode={mode}/>}/>
            <Route exact path="cart" element={<Cart uid={Userid } mode={mode}/>}/>
            
       
            <Route exact path="/login" element={<Login mode={mode}/>}/>
            <Route exact path="/SignUp" element={<SignUp mode={mode}/>}/>
            <Route exact path="/Profile" element={<Profile uid={Userid } mode={mode}/>}/>
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;



// // import logo from './logo.svg';
// import './App.css';
// import Navbar from './Components/Navbar';
// import TextForm from './Components/TextForm';
// import About from './Components/About';
// //hooks useState
// import { useState } from 'react';
// //to use Routes
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route
//   } from "react-router-dom";


// function App() {
//     const [mode,setMode]=useState("light");
//     const [aalert,setAlert]=useState("Light mode Enabled")
//     //to change mode
//     const togglemode=()=>{
//         if(mode==="dark")
//         {
//             setMode("light")
//             document.body.style.backgroundColor="white";
//             document.body.style.color="black"
//             setAlert("dark mode Enabled")
//             document.title="TextUtils - Light mode"
//         }
//         else
//         {
//             setMode("dark")
//             document.body.style.backgroundColor="rgb(43, 41, 41 )";
//             document.body.style.color="white"
//             setAlert("Light mode Enabled")
//             document.title="TextUtils - Dark mode"
//         }
//     }

//     ///////
//     var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    
//     function alertfunc() {
//       var wrapper = document.createElement('div')
//       wrapper.innerHTML = '<div class="alert alert-warning alert-dismissible" role="alert">' + aalert + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
//       alertPlaceholder.appendChild(wrapper)
//     }
//     /////
//     //to clear alert box every 6 seconds
//     function clearBox(elementID)
//     {
//         document.getElementById(elementID).innerHTML = "";
//     }
//     setTimeout(() => {
//         console.log("hello");
//         clearBox('liveAlertPlaceholder')
//       }, 6000);

//     return (

//         <>
//         <Router>
//         <Navbar title="TextUtils" mode={mode} togglemode={togglemode} alert={alertfunc} />
  
//         <div className="container mt-5 p-2">
//             <div className='mt-5 ' id="liveAlertPlaceholder"></div>
//             <Routes>
//                 <Route exact path="/about" element={<About />} />
//                 <Route exact path="/" element={<TextForm mode={mode}/>} />
//             </Routes> 
//         </div>
//         <br />
//         </Router>
//         </>
//     );
// }

// export default App;
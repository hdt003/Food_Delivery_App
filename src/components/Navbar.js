import React from "react";
import "../css/Navbar.css";
import {auth} from "../firebase"
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

function logout(){
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("log-out successful.")
  }).catch((error) => {
    // An error happened.
    console.log("log-out Unsuccessful.Try again.")
  });
}
function logOutAndGoToSignUp()
{
  logout();
  window.location.replace("/SignUp");
}
export default function NavBar(props) {
  // useState(()=>{
  //   props.togglemode()
  // },[])
  return (
    <>
      <nav className="fw-bold fixed-top"style={{background: `${props.mode==="light"?"white":"black"}`,color:"black !important"}} >
      <div className="left-side" >
        <input type="checkbox"/>
        <div className="nav-links" style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}>
          
          <h3><img src="https://www.linkpicture.com/q/7896.png" alt="..." height="38px" width="35px"/></h3>
          <h3 style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}>Menu App</h3>
          <div className="nav-link-wrapper hover-underline-animation"><a href="/" style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} >Home</a></div>
          <div className="nav-item dropdown hover-underline-animation">
          <Link style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="nav-link dropdown-toggle " to="/#" role="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Filter By 
          </Link>
          <ul className="dropdown-menu " style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} aria-labelledby="dropdownMenuButton">
            <li>
              <Link className="hover-underline-animation dropdown-item fw-bold" style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} to="/#">Type &raquo;</Link>
              <ul className="dropdown-menu dropdown-submenu fw-bold" style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}>
                  <li>
                    <Link className="dropdown-item hover-underline-animation fw-bold"style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}  to="/Breakfast">Breakfast</Link>
                  </li>
                  <li>
                    <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/Lunch">Lunch</Link>
                  </li>
                  <li>
                    <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/Dinner">Dinner</Link>
                  </li>
                </ul>
              </li>
            <li>
              <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/#">Food Type &raquo;</Link>
              <ul className="dropdown-menu dropdown-submenu fw-bold" style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}>
                <li>
                  <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/Veg">Veg.</Link>
                </li>
                <li>
                  <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/Non_Veg">Non-Veg.</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/#">
              Popularity &raquo;
              </Link>
              <ul className="dropdown-menu dropdown-submenu fw-bold" style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}>
                <li>
                  <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/htol">Higest to Lowest</Link>
                </li>
                <li>
                  <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/ltoh">Lowest to Highest</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/#">Price &raquo;</Link>
              <ul className="dropdown-menu dropdown-submenu fw-bold" style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}>
                <li>
                  <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/price_htol">Higest to Lowest</Link>
                </li>
                <li>
                  <Link style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} className="dropdown-item hover-underline-animation fw-bold" to="/price_ltoh">Lowest to Highest</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="nav-link-wrapper hover-underline-animation"><Link style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} to="/contact">Contact Us</Link></div>

        <div className="nav-link-wrapper hover-underline-animation"><Link style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}} to="/cart">My Cart</Link></div>

        
        <div className="nav-link-wrapper hover-underline-animation px-3 pt-3">
          <div className="d-flex justify-content-around">
        <p  style={{color: `${props.mode==="light"?"black":"white"}`}}>Light Mode </p>
        <p className="px-1"> </p>
        <label className="switch">
        <input  type="checkbox" onClick={() => {props.togglemode();props.alert()}}/>
        <span className="slider round"></span>
        </label>
        </div>
        </div>


         
        </div>
      </div>
      <div className="right-side">
      
      <div className="">
        {/* {auth.currentUser && <div className="px-2 mx-2 nav-link-wrapper hover-underline-animation"><Link style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}  onClick={logOutAndGoToSignUp}> Diet Plan</Link></div>} */}
        {auth.currentUser &&<div className="px-2 mx-2 hover-underline-animation" ><Link to="/Profile"  style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}>Profile </Link></div>}
        {auth.currentUser && <div className="px-2 mx-2 nav-link-wrapper hover-underline-animation"><Link style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}  onClick={logOutAndGoToSignUp}> Logout</Link></div>}
         {!auth.currentUser &&<div className="px-2 mx-2 hover-underline-animation"><Link to="/login" style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}> Login </Link></div>}
        {!auth.currentUser && <div className="px-2 mx-2 hover-underline-animation"><Link to="/SignUp"  style={{color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}> SignUp </Link></div>} 
      </div>
        <div className={`menuu ${props.mode==="light"?"light2":"dark2"}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
    </>
  );
}
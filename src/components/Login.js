import { signInWithEmailAndPassword } from 'firebase/auth';
import React,{useState} from 'react'
import {auth} from '../firebase'
import "../css/placeholder1.css"
import { useNavigate,Link } from 'react-router-dom';
export default function Login(props) {
    console.clear();
    const navigate = useNavigate();
    const [Email,setEmail]=useState("")
    const [Password,setPassword]=useState("")

    function getsubstring(err)
    {
      return err.substring(5,err.length)
    }

    const handleLogin=()=>{
      signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user.uid)
        // alert("Successfully Logged In")
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        document.getElementById('liveAlertPlaceholder').innerHTML = `<br/><div class="alert alert-success alert-dismissible text-dark text-center border-2 border-dark" role="alert">${getsubstring(errorCode)}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        setTimeout(() => {
          document.getElementById('liveAlertPlaceholder').innerHTML = "";
        }, 5000);
        // alert(errorCode)
      });
    }
    const check=()=>{
      
      if(Email==="" && Password==="")
      {
        document.getElementById("new").innerHTML="Enter Email and Password"
      }
      else if(Email==="")
      {
        document.getElementById("new").innerHTML="Enter Email"
      }
      else if(Password==="")
      {
        document.getElementById("new").innerHTML="Enter Password"
      }
      else{
        handleLogin();
      }
    }

  return (
    <div>
      <br/>
      <div className="container">
        <div className="text-center" ><h2>Login</h2></div>
        <div className="my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address<b className='text text-danger'>*</b></label>
        <input type="email" className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput2" placeholder="Enter Email" onChange={(event)=>setEmail(event.target.value)}/>
        </div>
        <div className="my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Password<b className='text text-danger '>*</b></label>
        <input type="password" className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}}  id="exampleFormControlInput3" placeholder="Enter password" onChange={(event)=>setPassword(event.target.value)}/>
        </div>
        <div className="text text-center text-danger fw-bold" id="new"></div>
        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary" id="myBtn"  onClick={check} tabIndex={0}>Login</button>

        </div >
        <div>Don't have an account? <Link to="/SignUp">SignUp</Link></div>
      </div>
    </div>
  )
}

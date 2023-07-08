import React,{useState} from 'react'
import {auth} from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {doc, setDoc} from "firebase/firestore"; 
import {db} from '../firebase'
import "../css/placeholder1.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export var UserId="";
export default function SignUp(props) {
  console.clear();
  const navigate = useNavigate();
    const [Email,setEmail]=useState("")
    const [Password,setPassword]=useState("")
    const [FName,setFName]=useState("")
    const [LName,setLName]=useState("")
    const [dietplan,setdietplan]=useState(0)
    const [calory,setcalory]=useState(Number.MAX_VALUE)
    const docData = {
      email:Email,
      password: Password,
      fname:FName,
      lname:LName,
      dietplan:dietplan,
      calory:calory
    };
    async function insertData(user_id){
      await setDoc(doc(db, "users",user_id), docData);
      console.log("data inserted in db");
    }
    function getsubstring(err)
    {
      return err.substring(5,err.length)
    }
    const handleSignUp=()=>{
      createUserWithEmailAndPassword(auth,Email,Password)
          .then((userCredential)=>{
              const user=userCredential.user;
              UserId=user.uid
              console.log("UserId:",UserId)
              insertData(user.uid)
              console.log("successfully created account")
          })
          .catch((error) => {
            const errorCode = error.code;
            document.getElementById('liveAlertPlaceholder').innerHTML = `<br/><div class="alert alert-success alert-dismissible text-dark text-center border-2 border-dark" role="alert">${getsubstring(errorCode)}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        setTimeout(() => {
          document.getElementById('liveAlertPlaceholder').innerHTML = "";
        }, 5000);
          });
    }

    const check=()=>{
      
      if(docData.email==="" && docData.password==="")
      {
        document.getElementById("new").innerHTML="Enter Email and Password"
      }
      else if(docData.email==="")
      {
        document.getElementById("new").innerHTML="Enter Email"
      }
      else if(docData.password==="")
      {
        document.getElementById("new").innerHTML="Enter Password"
      }
      else{
        handleSignUp();
      }
    }
    const pass=()=>{
      if(auth.currentUser){
        navigate("/");;
    }
    } 
    function todo(){
       check();
       setTimeout(pass, 3000)
      }
  return (
    <div>
      <br/>

      <div className="container">
        <div className="text-center"><h2>SignUp</h2></div>
        <div className="my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
        <input type="text" className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput1" placeholder="Enter Name" onChange={(event)=>setFName(event.target.value)}/>
        </div>
        <div className="my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
        <input type="text" className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput2" placeholder="Enter Name" onChange={(event)=>setLName(event.target.value)}/>
        </div>
        <div className="my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address<b className='text text-danger'>*</b></label>
        <input type="email" className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput3" placeholder="Enter Email" onChange={(event)=>setEmail(event.target.value)}/>
        </div>
        <div className="my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Password<b className='text text-danger'>*</b></label>
        <input type="password" className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput4" placeholder="Enter password" onChange={(event)=>setPassword(event.target.value)}/>
        </div>
          <div className="text text-center text-danger fw-bold" id="new"></div>
        <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={todo}>SignUp</button>
        </div>
        <div>
        <div>Already have an account? <Link to="/login">Login</Link></div>
      </div>
      </div>
    </div>
  )
}

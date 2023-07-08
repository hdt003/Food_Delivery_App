import { doc, setDoc } from 'firebase/firestore';
import React, {  useEffect ,useState } from 'react'
import {db} from '../firebase'
import "../css/placeholder1.css"
export default function ContactUs(props) {
    let [subject,setSubject]=useState("")
    let [message,setMessage]=useState("")
    let [userId,setUserId]=useState("")

    let obj = {
        sub:subject,
        msg:message
    }
    useEffect(()=>{
            setUserId(props.uid)
        },[])

    const insertData=(async()=>{
        await setDoc(doc(db, "contactus",userId), obj);
        // console.log(obj);
        console.log("data inserted in db");
        document.getElementById("new").innerHTML="Submitted"
        })
    const check=()=>{
    
        if(subject==="" && message==="")
        {
            document.getElementById("new").innerHTML="Enter Subject and Description"
        }
        else if(subject==="")
        {
            document.getElementById("new").innerHTML="Enter Subject"
        }
        else if(message==="")
        {
            document.getElementById("new").innerHTML="Enter Description"
        }
        else{
            insertData();
        }
    }
    

    function todo()
    {
        check();
    }
  return (
    <div className='container'>    
    <br />      
            <form className="row g-3 ">
                <h3 className='text-center' style={{color:`${props.mode==="light"?"black":"white"}`}}>Contact Us</h3>
            <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">Subject</label>
                <input type="text" className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="inputAddress" placeholder="Enter the Subject" onChange={(event)=>setSubject(event.target.value)}/>
            </div>
            <div className="col-12 " >
                <label htmlFor="inputAddress2" className="form-label">Description</label>
                <textarea className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="textAreaExample1" placeholder="Enter the Description" rows="7" onChange={(event)=>setMessage(event.target.value)}></textarea>
            </div>
            <div className="text text-center text-danger fw-bold" id="new"></div>
            <div className="col-12 d-flex justify-content-center">
            <div className='btn btn-primary' onClick={todo}>Submit</div>
            </div>
            </form>
            </div>

  )
}

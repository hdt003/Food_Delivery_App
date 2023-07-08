import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import { getDoc,updateDoc } from "firebase/firestore"; 
import { doc } from "firebase/firestore"; 
import diet from "../images/diet.png"
import edit from "../images/edit.png"
import editlight from "../images/edit-light.png"
import "../css/profileplaceholder.css"
export default function Profile(props) {
    // console.clear();
    let [fname,setFName]=useState("")
    let [lname,setLName]=useState("")
    let [email,setEmail]=useState("")
    let [dietplan,setDietplan]=useState(0)   
    let [calory,setcalory]=useState(Number.MAX_VALUE)   
    let [clicked,setclicked]=useState(0)
    let [num,setnum]=useState(1)
    let [removebutton,setremovebutton]=useState(0)
    let [removebutton2,setremovebutton2]=useState(0)
    let first="";
    let last="";
    async function fetchData() {
      const docRef =  doc(db, "users", props.uid);
      // await setDoc(doc(db, "users",user_id), docData);
      const docSnap =  await getDoc(docRef);
      if (docSnap.exists()) {
          let data=docSnap.data();
          // console.log("Userdata:",data);
          setEmail(data.email);
          setFName(data.fname);
          setLName(data.lname);
          setDietplan(data.dietplan);
          setcalory(data.calory);
      }
      else {
      // doc.data() will be undefined in this case
      console.log("Data not load!");
      }     
  }
    useEffect(() => {
        
        fetchData();
      },[]);
    //update user data for subscribe to dietplan
  async function updateData(){
    const docRef = doc(db, "users", props.uid);
    if(checknum()===false)
    {
        setnum(0)
        setclicked(1)
        return;
    }
    else{
        setnum(1)
    }
    const data = {
      dietplan: 1,
      calory: calory
    };
    updateDoc(docRef, data)
    .then(docRef => {
        console.log("A New dietplan,calory Field has been added");
    })
    .catch(error => {
        console.log(error);
    })
  }
  //   update user data for unsubscribe to dietplan
  async function updateData2(){
    const docRef = doc(db, "users", props.uid);
    const data = {
      dietplan: 0,
      calory: Number.MAX_VALUE
    };
    updateDoc(docRef, data)
    .then(docRef => {
        console.log("A New dietplan,calory Field has been added ");
    })
    .catch(error => {
        console.log(error);
    })
  }
  function updateFname()
  {
    const docRef = doc(db, "users", props.uid);
    const data = {
      // fname: fname,
      fname:first,
      // lname:last
    };
    updateDoc(docRef, data)
    .then(docRef => {
        console.log("A New First name Field has been added ");
    })
    .catch(error => {
        console.log(error);
    })
  }
  function updateLname()
  {
    const docRef = doc(db, "users", props.uid);
    const data = {
      // fname: fname,
      lname:last
    };
    updateDoc(docRef, data)
    .then(docRef => {
        console.log("A New First name Field has been added ");
    })
    .catch(error => {
        console.log(error);
    })
  }
  function checknum()
{ 
  if (isNaN(calory)) 
  {
    return false;
  }
}
function setupdatefirst(temp)
{
  setFName(temp);
  first=temp;               
  updateFname()
}
function setupdatelast(temp)
{
  setLName(temp);
  last=temp;               
  updateLname()
}
  return (
    <div>
        <div className="container">

            <h3 className='text-center' style={{color: `${props.mode==="dark"?"white":"black"}`}}>Your Profile</h3>
            <div >
                <div className='row'>
                <h5 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{minWidth:"90px"}}>First Name:</h5>
                {/*  */}
                <div className='col-8 px-2 'style={{minWidth:"99px"}}>
                <input className={`${props.mode==="light"?"light1":"dark1"} px-3 fw-bold col-12 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"} bg-opacity-25 border border-light rounded-3`} style={{minWidth:"90px",minHeight:"62px",fontSize:"23px",background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput3" value={fname!==""?fname:""} placeholder={fname!==""?"":"Enter First Name"} onChange={(event)=>{setupdatefirst(event.target.value)}}/>
                </div>
                        
                {/*  */}
                </div>
                <div className='row'>
                <h5 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{minWidth:"90px"}}>Last Name:</h5>
                <div className='col-8 px-2 'style={{minWidth:"99px"}}>
                <input className={`${props.mode==="light"?"light1":"dark1"} px-3 col-12 fw-bold bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"} bg-opacity-25 border border-light rounded-3`} style={{minWidth:"90px",minHeight:"62px",fontSize:"23px",background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput4" value={lname!==""?lname:""} placeholder={lname!==""?"":"Enter Last Name"} onChange={(event)=>{setupdatelast(event.target.value)}}/>
                </div>
                </div>
                <div className='row' >
                <h5 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} >Email:</h5>
                <h5 className={`p-3 mx-2 col-8 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{maxWidth:"744px"}}>{email}</h5>
                {/* <h2 className='p-3 bg-info bg-opacity-10 border border-info  rounded-3'>Gender:</h2>
                <h2 className='p-3 bg-info bg-opacity-10 border border-info  rounded-3'>Age:</h2> */}
                </div>
                {dietplan?<div className='row'>
                <h5 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{minWidth:"90px"}}>Calory limit:</h5>
                <h5 className={`p-3 mx-2 col-7 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`}>{calory!==Number.MAX_VALUE?calory:""}   
                </h5>
                <img src={props.mode==="light"?edit :editlight} className={`p-3 mx-2 col-1 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"} bg-opacity-25 border border-light  rounded-3`} style={{ height: "65px",width:"64px"}}  alt="..." onClick={()=>{setclicked(!clicked)}}/>        
                </div>:""}
                {/* subscribe to diet plan */}
                {!dietplan ? <button className="btn btn-danger fw-bold btn-md col-3 mx-2" onClick={()=>setremovebutton2(1)}>Add Diet Plan</button>:""}
                { removebutton2 ? <div className={`card-body my-3 text text-${props.mode==="light"?"dark":"white"}`}>
                    <h5 >Do You want to add diet plan?</h5>
                    <div>
                    <button className="btn btn-danger fw-bold btn-md col-1 mx-2" onClick={() => {setclicked(1);setDietplan(1);setremovebutton2(0);setcalory(Number.MAX_VALUE)}}>Yes</button>
                    <button className="btn btn-danger fw-bold btn-md col-1 mx-2" onClick={()=>setremovebutton2(0)}>No</button>
                    </div>
                </div>:""}

                {clicked ?
                    <div className="my-3 row">
                    <div className='col-7'>
                    <img src={diet} style={{ height: "500px",}} className="card-img-top" alt="..."/>
                    </div>
                    <div className='col-5'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Maximum calories required for each day<b className='text text-danger'>*</b></label>
                    <input className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput2" placeholder="Enter calories" onChange={(event)=>{setcalory(parseFloat(event.target.value))}}/>
                    <br />
                    {!num && <><div className='d-flex justify-content-center text-danger fw-bold'>Calory is a number</div><br/></>}
                    <div className='d-flex justify-content-center'>
                    <button className="btn btn-danger fw-bold btn-md col-4 my-3 " onClick={() => {setclicked(0);updateData()}}>Set Calories</button>
                    </div>
                    </div>
                </div>:""}

                {/* unsubscribe to diet plan */}
                {dietplan ? <button className="btn btn-danger fw-bold btn-md col-3 mx-2" onClick={()=>{setremovebutton(1);setclicked(0)}}>Remove Diet Plan</button>:""}
                {removebutton ? <div className={`card-body my-3 text text-${props.mode==="light"?"dark":"white"}`}>
                    <h5 >Do You want to remove diet plan?</h5>
                    <div>
                    <button className="btn btn-danger fw-bold btn-md col-1 mx-2" onClick={() => {setclicked(0);setDietplan(0);setremovebutton(0);;updateData2()}}>Yes</button>
                    <button className="btn btn-danger fw-bold btn-md col-1 mx-2" onClick={()=>setremovebutton(0)}>No</button>
                    </div>
                </div>:""}
            
            
            {/* <Diet mode={props.mode}/> */}
            </div>
        </div>
    </div>
  )
}
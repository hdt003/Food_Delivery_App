import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, {  useEffect ,useState } from 'react'
import {db} from '../firebase'
import { getDocs,query,getDoc } from "firebase/firestore";
import { auth } from '../firebase';
import deletee from "../images/delete.png"
export default function Cart(props) {
    // console.clear();
    let [userId,setUserId]=useState("")
    let [array,setArray]=useState([])
    let [runonce,setrunonce]=useState(0)
    let [ct,setct]=useState(0)
    let [sum,setsum]=useState(0)
    let [totcalory,settotcalory]=useState(0)
    let [dailycalory,setdailycalory]=useState(Number.MAX_VALUE)
    let [overload,setoverload]=useState(0)
    let temp=0,temp2=0
    let dc=Number.MAX_VALUE;//dailycalory
    async function fetchcartData() {
      setct(0)
      setArray([]);
      // console.log("fetchdata")
      const querySnapshot = await getDocs(query(collection(db,"cart",props.uid,"orders")));
      querySnapshot.forEach((doc) => {
      setct(++ct)
      temp+=doc.data().price
      setsum(temp)
      temp2+=doc.data().calories
      settotcalory(temp2)
      if(temp2>dc)
      {
        setoverload(1);
      }
      if(temp2<=dc)
      {
        setoverload(0);
      }
      setArray(array => [...array, doc.data()]);
      });
    }
    async function fetchUserData() {
      const docRef =  doc(db, "users", props.uid);
      // await setDoc(doc(db, "users",user_id), docData);
      const docSnap =  await getDoc(docRef);
      if (docSnap.exists()) {
          let data=docSnap.data();
          console.log("Userdata:",data);
          setdailycalory(data.calory);
          dc=data.calory;
          console.log("user data successfully fetched");
      }
      else {
      // doc.data() will be undefined in this case
      console.log("Data not load!");
      }     
    }
    // async function checkcalory(){
    //   console.log("tot",totcalory)
    //   console.log("daily",dailycalory)
    //   if(totcalory>dailycalory)
    //   setoverload(1);
    // }
      useEffect(()=>{
          if(runonce===0){
          setct(0);
          setUserId(props.uid)
          fetchUserData();
          fetchcartData();
          // checkcalory();
          setrunonce(1);
          console.log(overload)
          }
      },[])

      async function removeFromCart(oid)
      {
        // console.log(oid)
        try{
          await deleteDoc(doc(db,"cart",props.uid,"orders",oid))
          setct(0);
          fetchcartData();
          console.log("deleted successfully")
        }
        catch(error)
        {
          console.log(error)
        }
      }
  return (
    <div className='container  text-center'>

      <br/>
      <br/>
      {auth.currentUser && userId?<div><div className='row'>
        {/* <div className=''> */}
          {array.length?<div className='col-6 '>
                <div className="text-center position-fixed  col-6 mx-2">
                <div className='text-center fs-2 fw-bold '>My Cart</div><br />
                  <div className='fs-4 fw-bold '>Total Items: {array.length}</div><br />
                  <div className='fs-4 fw-bold '>Total Calories: {totcalory}</div><br/>
                  {dailycalory!==Number.MAX_VALUE?<div className='fs-4 fw-bold '>Daily calories limit: {dailycalory}</div>:""}
                  {overload ?<><div className='fs-4 fw-bold text-danger'>Your daily calories limit exceeded.</div></>:""}
                  <br /><button className="btn btn-danger fw-bold btn-lg text-center ">Pay Now: &#8377; {sum}</button>
                </div> 
                <br />
              </div>:<h3 className="text-center col-12"style={{color: `${props.mode==="light"?"black":"white"}`}}>Your Cart is Empty</h3>}
              
                
                <div className='col-6'>{array.map((element,index)=>{
                return <div className="col-12 itemmm text-center" key={index}  >
                    
                    <div className="card mb-3" style={{maxWidth: "503px",minWidth:"503px"}}>
                    <div className="row g-0">
                      <div className="col-6 " style={{minHeight:"200px",maxHeight:"200px",minWidth:"250px",maxWidth:"250px"}}>
                        <img src={element.img} className="img-fluid rounded-start" alt="..." style={{minHeight:"208px",maxHeight:"200px",minWidth:"250px",maxWidth:"250px"}}/>
                      </div>
                      <div className="col-6" style={{background:`${props.mode==="light"?"white":"black"}`}} >
                        <div className={`card-body text text-${props.mode==="light"?"dark":"white"}`} style={{background:`${props.mode==="light"?"white":"black"}`}}>
                          <h5 className="card-title fw-bold">{element.name}</h5>
                          <p className="card-text">Restaurant: {element.description}</p>
                          <p className="card-text">Calories: {element.calories}</p>
                          <div className='row'>
                          <p className="card-text fs-4  fw-bold col-6">&#8377; {element.price}</p>
                          {/* <button className='btn btn-sm btn-danger fw-bold col-2' onClick={insert}><h5>In</h5></button> */}
                          <img className='btn btn-sm fw-bold col-6' src={deletee} style={{width:"70px",height:"50px"}} onClick={()=>{removeFromCart(element.oid)}}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              })
            }  </div>
            
            </div></div>:<h2>Please, Sign Up or Login to add Item in Cart</h2>
}
    </div> 
  )
}


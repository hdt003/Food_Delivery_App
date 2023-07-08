import React, { useEffect, useState } from 'react'
import Item from './Item'
import {db} from '../firebase'
import { getDocs,query,where,orderBy,collectionGroup, updateDoc } from "firebase/firestore"; 
import { doc, setDoc} from "firebase/firestore"; 
import { deleteDoc } from 'firebase/firestore';
import ItemPage from './ItemPage';
// import docref
export default function Area(props) {
  // console.clear();

  let [array,setArray]=useState([])
  var ranonce = false;

  let [isTrue,setIsTrue]=useState(false)
  let [obj2,setobj2]=useState({})

  let [p,setP]=useState("k")//to check old props with new props
  let [lastmode,setlastmode]=useState("light")
  // let [once,setonce]=useState(0)
  const pull_data=(data) =>{
    setobj2(data)
    console.log("obj2:",obj2);
    setIsTrue(true)  
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
  function temp(){
    if(props.mode!==lastmode )
    {
      // console.log("lastmode: ",lastmode);
      // console.log("current mode: ",props.mode)
      fetchData();
      setlastmode(props.mode)
    }
    if(p==="k")
    {
      setP(timeBasedFood(new Date))
      setP(props.value)
    }
    else if(props.value!==p )
    {
      // console.log("p: ",p);
      // console.log("props.value: ",props.value)
      fetchData();
      setP(props.value);
      setIsTrue(false)
    }
}
setTimeout(temp, 0); 
    // if(props.mode!=lastmode)
    // {
    //   window.location.replace(`/${props.value}`);
    //   setlastmode(props.mode)
    // }
async function fetchData() {
    setArray([]);
    console.log("fetchdata")
    let q;
    if(`${props.field}`==="popularity")
    {
      if(`${props.value}`==="htol")
      {
        q = query(collectionGroup(db, "items"), orderBy("popularity","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      });
        
      }
      else if(`${props.value}`==="ltoh")
      {
        q = query(collectionGroup(db,"items"), orderBy("popularity"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      });
      }
    }
    else if(`${props.field}`==="price")
    {
      if(`${props.value}`==="price_htol")
      {
        q = query(collectionGroup(db, "items"), orderBy("price","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      });
        
      }
      else if(`${props.value}`==="price_ltoh")
      {
        q = query(collectionGroup(db,"items"), orderBy("price","asc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      });
      }
    }
    else
    {
        q = query(collectionGroup(db,"items"), where(`${props.field}`, "==", `${props.value}`));  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      }); 
    }   

}

  useEffect(()=>{
    if (!ranonce) {
      console.log("UseEffect")
      fetchData();
      console.log(props.field)
      console.log(props.value)
      ranonce = true
  }

  },[])


  // async function insertData(){
  //   let obj=
  //   {
  //     img:"https://b.zmtcdn.com/data/dish_photos/0e2/3eadae994f22d5b4b23e60de85a770e2.jpg",
  //     video:"",
  //     name:"Manchurian",
  //     food_type: "Veg",
  //     type: "Breakfast",
  //     description: "Greenz Restaurant",
  //     price: 130,
  //     popularity: 140,
  //     address:"Sector 10, Gandhinagar",
  //     calories: 200
  //     review:5 //1 to 5
  // }
  //   await setDoc(doc(db, "restaurant","Greenz Restaurant","items","Manchurian"), obj);
  //   console.log(obj);
  //   console.log("data inserted in db");
  
  //   // console.log(array[0].name)
  //   // array.map((element,index)=>{
  //   //   console.log(element.name,"attttt",index)
  //   // })
  // }
  
  // async function deleteData(){
  //   await deleteDoc(doc(db, "menu", "eUsn0OV4H00R3Bl6JErv"));
  //   console.log("data deleted in db");
  // }
  // // update user field data
  // async function updateData(){
  //   const docRef = doc(db, "users","zvCanhflnSXS7eY1arVymnmxeRE2");

  //   const data = {
  //     dietplan: 0,
  //     calory: Number.MAX_VALUE,
  //     address:""
  //   };
  //   updateDoc(docRef, data)
  //   .then(docRef => {
  //       console.log("A New Document Field has been added to an existing document");
  //   })
  //   .catch(error => {
  //       console.log(error);
  //   })
  // }

  function titleText(){
    if(props.value==="htol")
    {
      return "by Popularity High to Low"
    }
    else if(props.value==="ltoh")
    {
      return "by Popularity Low to High"
    }
    else if(props.value==="price_htol")
    {
      return "by Price High to Low"
    }
    else if(props.value==="price_ltoh")
    {
      return "by Price Low to High"
    }
    else if(props.pagename==="home")
    {
      return ""
    }
    else{
      return "in "+props.value
    }
  }
  return (
    <div >
      <div className="container my-4" id="area">
        <br />
        {/* <br/>
            <button className="btn btn-primary" onClick={updateData}>update data in db</button>
            <br/>
            <br/> */}
            {!isTrue ?<div>
            <h1 className="text-center" style={{color: `${props.mode==="light"?"black":"white"}`}}>Top Food Items  {titleText()}</h1>
            <div className="container">
            <div className="row">
                    {
                      
                      array.map((element,index)=>{
                        return  <div className="col-sm-12 col-md-6 col-lg-4 itemmm" key={index} >
                          <Item 
                          img={element.img?element.img:"image"} 
                          description={element.description?element.description:"description"}
                          food_type={element.food_type?element.food_type:"Lunch"}
                          price={element.price?element.price:"100"}
                          popularity= {element.popularity?element.popularity:"0"}
                          type={element.type?element.type:"not found"}
                          video={element.video?element.video:"video not found"} 
                          name={element.name?element.name:"name"}
                          review={element.review}
                          calories={element.calories}
                          totalRating={element.totalRating}
                          usersRated={element.usersRated}
                          func={pull_data}
                          address={element.address}
                          mode={props.mode}
                          uid={props.uid}/>
                      </div>
                      })
                    }
                     
            </div>
             {/* <button className="btn btn-primary" onClick={insertData}>insert data in db</button> */}
            
            {/* <button className="btn btn-primary" onClick={func}>isTrue</button>
            <br/> */}
            
            {/* <br/>
            <button className="btn btn-primary" onClick={deleteData}>delete data in db</button>
            <br/>
            <br/> */}
            {/* <br/>
            <button className="btn btn-primary" onClick={updateData}>update data in db</button>
            <br/>
            <br/> */}

            </div>
            
            </div>:<ItemPage img={obj2.img} 
                          description={obj2.description}
                          food_type={obj2.food_type}
                          price={obj2.price}
                          popularity= {obj2.popularity}
                          type={obj2.type}
                          review={obj2.review}
                          video={obj2.video} 
                          name={obj2.name}
                          address={obj2.address}
                          calories={obj2.calories}
                          totalRating={obj2.totalRating}
                          usersRated={obj2.usersRated}
                          mode={props.mode}
                          uid={props.uid}
                           />}
        </div>
    </div>
  )
}


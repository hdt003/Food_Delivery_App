import React, { useEffect } from 'react'
import "../css/item.css"
export const UserContext = React.createContext();

export default function Item(props) {
  var p={}
  useEffect(()=>{
    p={
    img:props.img ,
    description:props.description,
    food_type:props.food_type,
    price:props.price,
    popularity: props.popularity,
    type:props.type,
    review:props.review,
    video:props.video ,
    name:props.name,
    address:props.address,
    calories:props.calories,
    totalRating:props.totalRating,
    usersRated:props.usersRated
  }
},[])
  function content()
  {
    var arr=[];
    if(props.review)
    {
      var i=1
      for(;i<=props.review;i++)
      {
        arr.push(<span className="fa fa-star checked"></span>)
      }
      for(;i<=5;i++)
      {
        arr.push(<span className="fa fa-star"></span>)
      }
      return arr
    }
    return null
  }
  return (
    <div >
      <div className={`my-4 d-flex justify-content-center hover-item`} >
            <div className={`card item `} style={{width: "100%"}} >
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger z-1 fs-6 p-2" style={{left:"92%" }}>&#8377; {props.price}
                    <span className="visually-hidden">New alerts</span>
                </span>
                <img src={props.img} style={{ height: "180px"}} className="card-img-top" alt="..."/>
                <div className={`card-body text text-${props.mode==="light"?"dark":"white"}`} style={{background:`${props.mode==="light"?"white":"black"}`}} >
                    <h4 className="card-title">{props.name}</h4>
                    <hr />
                    <p className="card-text"> {props.description}</p>
                    <p className="rating">
                      <span className="heading">Rating: </span>   
                      {content()}
                      </p>
                    <div className='text-center'>
                    <button className="btn btn-sm btn-dark shadoww" onClick={() =>props.func(p)}>Read More</button></div>
                </div>
            </div>
    </div>
    </div>
  )
}

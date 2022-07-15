import React,{useState} from 'react'
//import {Button} from 'react-bootstrap';
import Data from './Data.json'

const CercaDipendente = () => {
  const [search,setSearch]= useState('')
  return (
    <>
  
    <div>
        <p>
        <input type="text" className="form-control"placeholder="Search..Dipendente"
        onChange={event =>{setSearch(event.target.value)}}/>
        </p>
        <div className='box'>

        
        {Data.filter((val)=> {
                  if(search === ''){
                    return val
                  }
                  else if(val.first_name.includes(search)){
                    return val
                  }
                }).map((val) => {
                  return<div>{val.first_name} </div>
                  })}
             
        </div>
        <button className="btn btn-primary">Conferma </button>
    </div>
</>
  )
}

export default CercaDipendente
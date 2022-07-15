import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Data from './Data.json'

const CercaDipendente = () => {
  const [search,setSearch]= useState('')
  let navigate = useNavigate()
  useEffect( () => {
    if (sessionStorage.auth === undefined)
      navigate("/login", {replace: true})
  })
  return (
    <>
        <div>
            <p>
            <input type="text" className="form-control"placeholder="Search.." onChange={event =>{setSearch(event.target.value)}}/>
            </p>
           

         
          

        
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
     
    
</>
  )
}

export default CercaDipendente
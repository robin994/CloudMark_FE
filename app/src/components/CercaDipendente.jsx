import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CercaDipendente = () => {
  let data = []/* getAziendaData() */
  const [search,setSearch]= useState('')
  return (
    <>
        <div>
            <p>
            <input type="text" className="form-control"placeholder="Search.." onChange={event =>{setSearch(event.target.value)}}/>
            </p>
           

         
          

        
        {data.filter((val)=> {
                  if(search === ''){
                    return val
                  }
                  else if(val.azienda.includes(search)){
                    return val
                  }
                }).map((val) => {
                  return<div>{val.azienda} </div>
                  })}
             
      </div>
     
    
</>
  )
}

export default CercaDipendente


import React,{useState} from "react"
import './css_components/TableDipendenti.css'

function TableDipendenti() {

  const dummyData = [
    {id:1,nome:"marco",cognome:"rossi",email:"ciao@gmail.com",contratto:"indeterminato",assunzione:"25/07/01",commessa:"visioture"},
    {id:2,nome:"andrea",cognome:"bianco",email:"hey@gmail.com",contratto:"indeterminato",assunzione:"25/07/01",commessa:"visioture"},
    {id:3,nome:"lorenzo",cognome:"mimmo",email:"mim@gmail.com",contratto:"indeterminato",assunzione:"25/07/01",commessa:"visioture"},
    {id:4,nome:"gianni",cognome:"esposito",email:"gio@gmail.com",contratto:"indeterminato",assunzione:"25/07/01",commessa:"visioture"},
    {id:5,nome:"sandro",cognome:"pinna",email:"pin@gmail.com",contratto:"indeterminato",assunzione:"25/07/01",commessa:"visioture"},
    {id:6,nome:"francesco",cognome:"beltra",email:"bel@gmail.com",contratto:"indeterminato",assunzione:"25/07/01",commessa:"visioture"},
    {id:7,nome:"alessandro",cognome:"ciro",email:"ciro@gmail.com",contratto:"indeterminato",assunzione:"25/07/01",commessa:"visioture"},
    {id:8,nome:"alessandro",cognome:"cirto",email:"ciro@gmail.com",contratto:"indeterminato",assunzione:"25/07/01",commessa:"visioture"},
  

   
]
const[value,setValue] = useState('');
const[dataSource,setDataSource] = useState(dummyData);
const [tablefilter,setTableFilter] = useState([])

const filterData = (e) =>{
  if(e.target.value !== ''){
    setValue(e.target.value);
    const filterTable = dataSource.filter(o => Object.keys(o).some(k=>
      String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
      ))
      setTableFilter([...filterTable])
  }else{
    setValue(e.target.value);
    setDataSource([...dataSource])
  }
}
  return (
   <>
   <div className="container mt-5 ">
    <div className="mytop">
    <input className="form-control" placeholder="search" value={value} onChange={filterData}></input>
    <div class="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
 
</div>
    </div>
 
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nome</th>
          <th scope="col">Cognome</th>
          <th scope="col">Matricola</th>
          <th scope="col">Contratto</th>
          <th scope="col">Assunzione</th>
          <th scope="col">Commessa</th>
          
        </tr>
      </thead>
      <tbody>
        {value.length > 0 ? tablefilter.map((data)=>
          (
            <tr>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.id}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.nome}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.cognome}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.email}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.contratto}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.assunzione}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.commessa}</a></td>
            
            </tr>
          )
        )
        :
        dataSource.map((data)=>
           (
            <tr>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.id}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.nome}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.cognome}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.email}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.contratto}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.assunzione}</a></td>
              <td><a href={`/dipendente/${data.id}`} className="cl">{data.commessa}</a></td>
             

            </tr>
          )
        )
      }
      </tbody>
    </table>
      
    </div>
   </>
  );
}

export default TableDipendenti;

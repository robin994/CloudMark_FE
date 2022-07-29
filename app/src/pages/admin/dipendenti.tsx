
import axios from 'axios'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './components/css_components/TabellaDipendenti.css'



const ListaDipendenti=(props:any)=> {

  
  const [dipendenti, setDipendenti] = useState([])


  useEffect( () => {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/employee`).then( resp => {
      const data = resp.data.data
      setDipendenti(Object.values(data))
  }).catch( err => { throw err })
  },[])
  console.log(dipendenti)


  let list = dipendenti.map(el => {
    return {
        first_name: el['first_name'],
        last_name:el['last_name'],
        cf: el['cf'],
        iban: el['iban'],
        id_contractType: el['id_contractType'],
        email: el['email'],
        phoneNumber: el['phoneNumber'],
        id: el['id_employee']
    }
})

const rows = list

const columns: GridColDef[] = [
    { field: 'first_name', headerName: 'First name', width: 279, editable: true },
    { field: 'last_name', headerName: 'Last name', width: 279, editable: true },
    { field: 'cf', headerName: 'Codice Fiscale', type: 'string', width: 279, editable: true },
    { field: 'iban', headerName: 'iban', width: 279, editable: true },
    { field: 'id_contractType', headerName: 'Tipo Contratto', width: 279, editable: true },
    { field: 'email', headerName: 'email', width: 279, editable: true },
    { field: 'phoneNumber', headerName: 'Telefono', width: 279, editable: true },
   
]

 
  return (




<motion.div initial={{x : 100}} animate={{x : 0}} style={{ height: 400, width: '100%' }} className='custom-grid'>
            <DataGrid
                // components={{
                //     LoadingOverlay: LinearProgress
                // }}
                // loading
                rows={rows}
                columns={columns}
                pageSize={5}
                editMode='row'
                rowsPerPageOptions={[5]}
                checkboxSelection
                sx={{
                    boxShadow: 20
                }}
            />
  </motion.div>
   

    )
  }

  export default ListaDipendenti
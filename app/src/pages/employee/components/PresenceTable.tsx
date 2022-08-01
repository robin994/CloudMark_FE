import axios from 'axios'
import { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { motion } from 'framer-motion';

import "../styles/PresenceTable.css";

const types: { [key: string]: string } = {
    'ca34d37e-600c-452e-a8e4-2efb53161812': 'Standard',
    '6dc55260-7150-4f76-8251-adc4c3fc15b4': 'Assenza',
    'a8fd713d-36e8-440f-81e1-6e7314a3c417': 'Festivo',
    'b867b283-38a0-4eb3-8df1-55ccb5f310df': 'Malattia'
}

const heading: GridColDef[] = [
    { field: 'date_presence', headerName: 'Data', type: 'date', width: 279, editable: true, align: 'right', headerAlign: 'right' },
    { field: 'hours', headerName: 'Ore', type: 'number', width: 279, editable: true, align: 'right', headerAlign: 'right' },
    { field: 'type', headerName: 'Tipo Presenza', type: 'string', width: 279, editable: true, align: 'right', headerAlign: 'right' },
]

const PresenceTable =(props:any)=> {
  const [presenze, setPresenze] = useState([])

    async function getPresenze() {
        try {
        const response = await axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/load`,{
            id_employee: sessionStorage.id_employee,
            year: 2022,
            month: 1
        }, { 
            headers: {accept: "application/json", "Content-Type": "application/json" }
        })
        console.log('PresenceTable --> AXIOS RESPONSE [data]: ', response.data.data)
        setPresenze(response.data.data.map((e: any)=> {
                e['id'] = e['id_presence']
                e['type'] = types[e['id_tipoPresenza']]
                console.log('PresenceTable --> PARSED RESPONSE: ', [e])
                return e
            }
        ))} catch(error) {
            throw error
        }
    }

    useEffect(()=> {
        getPresenze();
      }, [])
 
  return (
    <motion.div initial={{x : 100}} animate={{x : 0}} style={{ height: 400, width: '100%' }} className='custom-grid'>
        <DataGrid
            // components={{
            //     LoadingOverlay: LinearProgress
            // }}
            // loading
            rows={presenze}
            columns={heading}
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

export default PresenceTable
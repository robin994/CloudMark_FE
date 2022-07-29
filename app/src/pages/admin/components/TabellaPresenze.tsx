import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Box, createTheme, LinearProgress, ThemeProvider } from '@mui/material';
import { motion } from 'framer-motion';
import './css_components/TabellaPresenze.css'

const TabellaPresenze = (props: any) => {
    
    const [presenze, setPresenze] = useState([])
    const [editPresenze, setEditPresenze] = useState([])

    async function getPresenze() {
        axios.get(`${process.env.REACT_APP_FASTAPI_URL}/presence/all/first_name/last_name/`)
        .then(res => {
            setPresenze(res.data.data)
        })
    }

    async function editGetPresenze() {
        axios.get(`${process.env.REACT_APP_FASTAPI_URL}/presence/employee/`)
        .then(res => {
            setEditPresenze(res.data.data)
        })
    }

    useEffect(() => {
        getPresenze()
        editGetPresenze()
    }, [])

    let list = presenze.map(el => {
        return {
            date_presence: el['date_presence'],
            first_name:el['first_name'],
            hours: el['hours'],
            id: el['id_employee'],
            last_name: el['last_name'],
            nome_azienda: el['nome_azienda'],
            tipoPresenza: el['tipoPresenza']
        }
    })

    const rows = list

    const columns: GridColDef[] = [
        { field: 'first_name', headerName: 'First name', width: 279, editable: true },
        { field: 'last_name', headerName: 'Last name', width: 279, editable: true },
        { field: 'tipoPresenza', headerName: 'tipoPresenza', type: 'string', width: 279, editable: true },
        { field: 'hours', headerName: 'Ore', width: 279, editable: true },
        { field: 'nome_azienda', headerName: 'Commessa', width: 279, editable: true },
        { field: 'date_presence', headerName: 'Data', width: 279, editable: true }
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

export default TabellaPresenze











// import { useState, useEffect } from 'react'
// import './css_components/TabellaPresenze.css'
// import axios from 'axios'

// export default function TabellaPresenze() {
//     const [reveal, setReveal] = useState(true)
//     const [presenze, setPresenze] = useState([])
//     const [inputPresenze, setInputPresenze] = useState([])
//     // const[date_presence, setDatePresence] = useState()
//     // const[tipo_presenza, setTipoPresenza] = useState()
//     const[hours, setHours] = useState()

    

//     async function getPresenze() {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_FASTAPI_URL}/presence/all/first_name/last_name/`)
//             setPresenze(response.data.data)
//         } catch (error) {
//             throw error
//         }
//     }

//     const handleSubmit = (e: any) => {
//         e.preventDefault();
//         axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/insertUpdate`, {
//             inputPresenze:[
//                 {
//                     idDipendente : presenze,
//                     dataPresenza : presenze,
//                     tipoPresenza : presenze,
//                     idCommessa : presenze,
//                     ore : hours
//                 }
//             ]

//         })
//             .then(function (response) {
//                 console.log(response);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }


//     useEffect(() => {
//         getPresenze()
//     }, [])

//     // presenze.map((el, index) => {
//     //     return arr.push(Object.keys(el)[index])
//     // })
//     // console.log(arr)




//     const arr: any = []
//     const otherArr: any = []
//     Object.values(presenze).filter((el, index) => {
//         if(el["id_employee"]) {
//             arr.push(el)
//         }
//         otherArr.push(arr[index]["id_employee"])
//     })
    
//     console.log(arr);
//     console.log(otherArr);


    


//     const test = presenze.map((el, index) => {
//         // console.log(Object.keys(el)[index])

//         return (
//             <tr ng-repeat="name in getdrugnameNewArray" key={index}>
//                 <td><input type="text" placeholder="prova" /></td>
//                 {
//                     Object.values(el).map((e: any, i) => {
//                         if (typeof e === 'string') {
//                             return (
//                                 <td key={i}>
//                                     <div className='input-group mb-3'>
//                                         <input type="text" className='form-control' aria-label="Username" aria-describedby="basic-addon1" value={e} />
//                                     </div>
//                                 </td>
//                             )
//                         } 
//                         else {
//                             return (
//                                 <td key={i}>
//                                     <div className='input-group mb-3'>
//                                         <input type="number" className='form-control' aria-label="Username" aria-describedby="basic-addon1" value={e} />
//                                     </div>
//                                 </td>
//                             )
//                         }
//                     })
//                 }
//             </tr>
//         )
//     })

//     const test2 = presenze.map((el, index) => {
//         return (
//             <tr ng-repeat="name in getdrugnameNewArray" key={index}>
//                 <td className='cold-md-auto'>prova</td>
//                 {
//                     Object.values(el).map((e: any, i) => {
//                         return (
//                             <td key={i} className='cold-md-auto'>{e}</td>
//                         )
//                     })
//                 }
//             </tr>
//         )
//     })

//     let change = () => {
//         if (reveal === true) {
//             setReveal(false)
//         } else {
//             setReveal(true)
//         }
//     }


//     return (
//         <>
//             <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />

//             <table className="table table-bordered table-hover">
//                 <thead>
//                     <tr>
//                         <th className="col-md-auto text-center custom-head">N#</th>
//                         {
//                             presenze.map((e: any, i: any) => {
//                                 return (
//                                     <th key={i} className='cold-md-auto text-center custom-head'>{Object.keys(e)[i]}</th>
//                                 )
//                             })
//                         }
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         reveal === true ? test2 : test
//                     }
//                 </tbody>
//             </table>
//             <button className='btn btn-info' onClick={change}>Modifica</button>
//         </>
//     )
// }


// else if (e.slice(4, 5) === "/" && e.slice(7, 8) === "/") {
//     return (
//         <td key={i}>
//             <div className='input-group mb-3'>
//                 <input type="date" className='form-control' placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={e} />
//             </div>
//         </td>
//     )
// } 
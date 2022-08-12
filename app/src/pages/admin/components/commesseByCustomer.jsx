import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CommesseByCustomer({id_customer}) {
    const [commesseCustomer, setCommesseCustomer] = useState([])
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/orders/customer/`, {
            id_customer: id_customer,
            id_business: sessionStorage.business_id ? sessionStorage.business_id : "124e4567-e85b-1fd3-a456-426614474000"
            // id_business should only get business_id (REMOVE TERNARY ASAP)
        }, { 
            headers: {accept: 'application/json', 'Content-Type': 'application/json'}
        }).then(resp => {
            setCommesseCustomer(resp.data)
        })
    }, [id_customer])
    const columns = [
        { field: 'descrizione', headerName: 'Descrizione', width: 150, flex: 0.3 },
        { field: 'data_inizio', headerName: 'Data inizio', width: 150,flex: 0.3 },
        { field: 'data_fine', headerName: 'Data fine', width: 150,flex: 0.3 }
    ];
    const rows = []
    for (const obj of commesseCustomer) {
        rows.push({
            id: obj.id_commessa,
            descrizione: obj.descrizione,
            data_inizio: obj.data_inizio,
            data_fine: obj.data_fine
        })
    }
    return (
        <>
            <div style={{ display: 'flex', height: "100%", width: "100%"}}>
                <DataGrid autoHeight rows={rows} columns={columns}/>
            </div>
        </>
    )
}
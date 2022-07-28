import React from "react";
import { Button, Card, Table } from 'react-bootstrap'
import axios from 'axios'
import decode from 'jwt-decode'


interface InterfacciaUtente {

    id_account: string,
    user: string,
    abilitato: number,
    id_tipo_account: string

}

export default function ProfiloUtente() {
    var info = '28daa75b-7ea2-4f2c-b771-525a06cd7d9f'

    function ChiamaUtente(){
        // axios.get(`${process.env.REACT_APP_FASTAPI_URL}/account/${info}`)
        // .then(res=>console.log(res.data.data))
        // .catch(err=>console.log(err))
        var sus = sessionStorage.bearer
        console.log(decode(sus))
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm">
                        <h2>Id Account:</h2>
                        <input type="text" />
                    </div>
                    <div className="col-sm">
                        <h2>User:</h2>
                        <input type="text" />
                    </div>
                    <div className="col-sm">
                        <h2>Abilitato:</h2>
                        <input type="text" />
                    </div>
                    <div className="col-sm">
                        <h2>Id Tipo Account:</h2>
                        <input type="text" />
                    </div>
                </div>
                <button className="btn btn-primary mt-5" onClick={ChiamaUtente}>Cambia Dati</button>

            </div>
        </>
    )
}
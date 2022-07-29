import React, { useState, useEffect } from "react";
import { Button, Card, Table } from 'react-bootstrap'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import './css_components/PaginaProfilo.css'

interface SessionInterface {
    id_account: string,
    abilitate: string,
    accountType: string,
    accountTypeName: string,
    accountListFunction: string,
    user: string
}



export default function ProfiloUtente() {
    const [data, setData] = useState<SessionInterface>()
    const [filtredData, setFiltredData] = useState([])    
    const [hid, setHid] = useState(true)
    const [btnMsg, setBtnMsg] = useState('Modifica')

    function FilterData() {

        function ChiamaUtente() {
            setData(jwt_decode(sessionStorage.bearer));  
            console.log(data?.id_account);
            if(hid === true){
                setHid(false)
                setBtnMsg('Salva Modifiche')
            }else{
                setHid(true)
                setBtnMsg('Modifica')
            }
        }

        return (
            <button className="btn btn-primary mt-5" onClick={ChiamaUtente}>{btnMsg}</button>
        )
    }

    return (
        <>
            <div className="container mt-5 flexBello">
                <div className="rowBello">
                    <div className="col-sm">
                        <h2>Nome:</h2>
                        <input type="text" disabled={hid}/>
                    </div>
                    <div className="col-sm">
                        <h2>Cognome:</h2>
                        <input type="text" disabled={hid}/>
                    </div>
                    <div className="col-sm">
                        <h2>CF:</h2>
                        <input type="text" disabled={hid}/>
                    </div>
                    <div className="col-sm">
                        <h2>Iban:</h2>
                        <input type="text" disabled={hid}/>
                    </div>
                    <div className="col-sm">
                        <h2>Numero Di Telefono:</h2>
                        <input type="text" disabled={hid}/>
                    </div>
                    {<FilterData/>}
                </div>
            </div>
        </>
    )
}
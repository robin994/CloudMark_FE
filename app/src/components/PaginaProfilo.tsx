import React, { useState, useEffect } from "react";
import { Button, Card, Table } from 'react-bootstrap'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import './css_components/PaginaProfilo.css'
interface InterfacciaToken {
    id_account: string
}
interface SessionInterface {

    id_account: string,
    abilitate: string,
    accountType: string,
    accountTypeName: string,
    accountListFunction: string,
    user: string

}


function FilterData(prop: InterfacciaToken) {
    const [data, setData] = useState<SessionInterface>()
    const [filtredData, setFiltredData] = useState([])
    function ChiamaUtente() {
        setData(jwt_decode(sessionStorage.bearer));
        console.log(data?.id_account);
        function getProfilo(prop: InterfacciaToken) {
            Axios(`${process.env.REACT_APP_FASTAPI_URL}/employee/account/${data}`, {
                method: "GET"
                })
                .then(resp => {
                setData(resp.data);
                });    
        }
    }
    return (
        <button className="btn btn-primary mt-5" onClick={ChiamaUtente}>Salva Modifiche</button>
    )
}

export default function ProfiloUtente() {

    return (
        <>
            <div className="container mt-5 flexBello">
                <div className="rowBello">
                    <div className="col-sm">
                        <h2>Nome:</h2>
                        <input type="text"  />
                    </div>
                    <div className="col-sm">
                        <h2>Cognome:</h2>
                        <input type="text" />
                    </div>
                    <div className="col-sm">
                        <h2>CF:</h2>
                        <input type="text" />
                    </div>
                    <div className="col-sm">
                        <h2>Iban:</h2>
                        <input type="text" />
                    </div>
                    <div className="col-sm">
                        <h2>Numero Di Telefono:</h2>
                        <input type="text" />
                    </div>
                    {<FilterData id_account=""/>}
                </div>

            </div>
        </>
    )
}
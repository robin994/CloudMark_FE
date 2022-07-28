import React, { useState, useEffect } from "react";
import { Button, Card, Table } from 'react-bootstrap'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

interface InterfacciaToken {
    id_account: string
}

interface InterfacciaUtente {

    first_name: string,
    last_name: string,
    cf: number,
    iban: number,
    email: string,
    phoneNumber: number

}

interface SessionInterface {

    id_account: string,
    abilitate: string,
    accountType: string,
    accountTypeName: string,
    accountListFunction: string,
    user: string

}

export default function ProfiloUtente() {

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm">
                        <h2>Nome:</h2>
                        <input type="text" />
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

                </div>
                {<FilterData id_account=""/>}
            </div>
        </>
    )
}

function FilterData(prop: InterfacciaToken) {
    const [data, setData] = useState<SessionInterface>()
    const [filtredData, setFiltredData] = useState([])
    function ChiamaUtente() {
        setData(jwt_decode(sessionStorage.bearer));
        
        console.log(data?.id_account);
    }
    return (
        <button className="btn btn-primary mt-5" onClick={ChiamaUtente}>Salva Modifiche</button>
    )
}
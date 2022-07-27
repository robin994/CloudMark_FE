import React from "react";
import { Button, Card, Table } from 'react-bootstrap'

interface InterfacciaUtente {

    id_account: string,
    user: string,
    abilitato: number,
    id_tipo_account: string

}

export default function ProfiloUtente() {
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
                    <button className="btn btn-primary"></button>
                </div>
            </div>
        </>
    )
}
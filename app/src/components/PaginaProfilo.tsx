import React, { useState, useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./css_components/PaginaProfilo.css";
import { Map } from "typescript";

interface SessionInterface {
    id_account: string;
    abilitate: string;
    accountType: string;
    accountTypeName: string;
    accountListFunction: string;
    user: string;
}

// interface EmployeesAccount {
//     first_name: string,
//     last_name: string,
//     cf: string,
//     iban: number,
//     id_contractType: string,
//     email: string,
//     phoneNumber: number,
//     id_employee: string

// }

export default function ProfiloUtente() {
    const [data, setData] = useState<SessionInterface>();
    const [filtredData, setFiltredData] = useState<any>();
    const [hid, setHid] = useState(true);
    const [btnMsg, setBtnMsg] = useState("Modifica");
    const [count, setCount] = useState(0);
    //dati input & account
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [CF, setCF] = useState("");
    const [iban, setIban] = useState("");
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("");
    const [id_employee, setId_employee] = useState("")
    const [id_contractType, setId_contractType] = useState("")
    //
    const [serverAlert, setServerAlert] = useState(true)
    const [popHide, setPopHide] = useState(true)


    function getAccount() {
        if (data !== undefined) {
            axios
                .get(
                    `${process.env.REACT_APP_FASTAPI_URL}/employee/account/${data.id_account}`
                )
                .then((res) => {
                    if (res !== undefined) { setFiltredData(res.data.data) };
                    if (filtredData !== undefined) {
                        FiltroBello()
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }

    function FiltroBello() {

        if (filtredData !== undefined) {
            for (var x in filtredData) {
                console.log(filtredData[x])
                setNome(filtredData[x].first_name)
                setCognome(filtredData[x].last_name)
                setCF(filtredData[x].cf)
                setIban(filtredData[x].iban)
                setEmail(filtredData[x].email)
                setTel(filtredData[x].phoneNumber)
                setId_employee(filtredData[x].id_employee)
                setId_contractType(filtredData[x].id_contractType)
                return filtredData[x];
            }
        } else return <></>;
    }
    function sendData() {
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/employee/update`, {
            first_name: nome,
            last_name: cognome,
            cf: CF,
            iban: iban,
            id_contractType: id_contractType,
            email: email,
            phoneNumber: tel,
            id_employee: id_employee
        }).then(res => { console.log(res) }).catch(err => { console.log(err) })
    }
    function hidePop() {
        if (popHide === true) {
            setPopHide(false)
        } else {
            setPopHide(true)
        }
    }

    function FilterData() {
        function ChiamaUtente() {
            if (nome !== '') {
                setServerAlert(true)
                if (hid === true) {
                    setHid(false)
                    setBtnMsg('Salva Modifiche')
                }
            } else {
                setServerAlert(false)
            }
            if (hid === false) {
                setPopHide(false)
            }
        }
        return (
            <>
                <button className="btn btn-primary mt-5" onClick={ChiamaUtente}>{btnMsg}</button>
                <div className="alert alert-danger mt-3" role="alert" hidden={serverAlert}>
                    Aspetti che arrivino i dati dal server
                </div>
            </>
        )
    }


    useEffect(() => {
        setData(jwt_decode(sessionStorage.bearer));

        if (data !== undefined) {
            getAccount();
        } else {
            setCount(count + 1);
        }
    }, [count]);

    return (
        <>
            <div className="moduleBelloBack" hidden={popHide}>
                <div className="moduleBelloBody">
                    <ul className="mb-5">
                        <li>Nome: {nome}</li>
                        <li>Cognome: {cognome}</li>
                        <li>Codice Fiscale: {CF}</li>
                        <li>Iban: {iban}</li>
                        <li>Email: {email}</li>
                        <li>Telefono: {tel}</li>

                    </ul>
                    <button className="btn btn-primary" onClick={sendData}>Manda i dati</button>
                    <button className="btn btn-danger mx-3" onClick={hidePop}>Torna Indietro</button>
                </div>
            </div>
            <div className="container mt-5 flexBello">
                <div className="rowBello">
                    <div className="col-sm">
                        <h2>Nome:</h2>
                        <input
                            type="text"
                            disabled={hid}
                            onChange={(val) => setNome(val.target.value)}
                            value={nome}
                            required
                        />
                    </div>
                    <div className="col-sm">
                        <h2>Cognome:</h2>
                        <input
                            type="text"
                            disabled={hid}
                            onChange={(val) => setCognome(val.target.value)}
                            value={cognome}
                            required
                        />
                    </div>
                    <div className="col-sm">
                        <h2>CF:</h2>
                        <input
                            type="text"
                            disabled={hid}
                            onChange={(val) => setCF(val.target.value)}
                            value={CF}
                            required
                        />
                    </div>
                    <div className="col-sm">
                        <h2>Iban:</h2>
                        <input
                            type="text"
                            disabled={hid}
                            onChange={(val) => setIban(val.target.value)}
                            value={iban}
                            required
                        />
                    </div>
                    <div className="col-sm">
                        <h2>Email:</h2>
                        <input
                            type="text"
                            disabled={hid}
                            onChange={(val) => setEmail(val.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="col-sm">
                        <h2>Numero Di Telefono:</h2>
                        <input
                            type="text"
                            disabled={hid}
                            onChange={(val) => setTel(val.target.value)}
                            value={tel}
                            required
                        />
                    </div>
                    {<FilterData />}
                </div>
            </div>
        </>
    );
}

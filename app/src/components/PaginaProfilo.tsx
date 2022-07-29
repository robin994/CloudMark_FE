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
    const [filtredAccount, setFiltredAccount] = useState([])
    const [hid, setHid] = useState(true)
    const [btnMsg, setBtnMsg] = useState('Modifica')
    const [count, setCount] = useState(0)
    const [nome, setNome] = useState('')
    const [cognome, setCognome] = useState('')
    const [CF, setCF] = useState('')
    const [iban, setIban] = useState('')
    const [tel, setTel] = useState('')

    function getAccount(){
        if(data !== undefined){
            axios.get(`${process.env.REACT_APP_FASTAPI_URL}/employee/account/${data.id_account}`)
            .then(res=>{
                setFiltredData(res.data.data)

            })
            .catch(err=>{console.log(err)})
        }         
    }
    function FilterData() {
        function ChiamaUtente() {
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

    useEffect(()=>{
        setData(jwt_decode(sessionStorage.bearer));  
        if(data !== undefined){
            getAccount()
        }

    }, [count])

    function countEffect(){
        if(count < 1){
            setTimeout(()=>{
                setCount(count + 1)
            }, 2000)
        }
    }
    countEffect()
    
    return (
        <>
            <div className="container mt-5 flexBello">
                <div className="rowBello">
                    <div className="col-sm">
                        <h2>Nome:</h2>
                        <input type="text" disabled={hid} onChange={val=> setNome(val.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <h2>Cognome:</h2>
                        <input type="text" disabled={hid} onChange={val=> setCognome(val.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <h2>CF:</h2>
                        <input type="text" disabled={hid} onChange={val=> setCF(val.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <h2>Iban:</h2>
                        <input type="text" disabled={hid} onChange={val=> setIban(val.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <h2>Numero Di Telefono:</h2>
                        <input type="text" disabled={hid} onChange={val=> setTel(val.target.value)} required/>
                    </div>
                    {<FilterData/>}
                </div>
            </div>
        </>
    )
}
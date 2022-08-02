import { Grid, Box } from '@chakra-ui/react'
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
// import { theme } from "./ContTheme";



interface SessionInterface {
    id_account: string;
    abilitate: string;
    accountType: string;
    accountTypeName: string;
    accountListFunction: string;
    user: string;
}

export default function ContProfile() {

    const [data, setData] = useState<SessionInterface>();
    const [hid, setHid] = useState(true);
    const [count, setCount] = useState(0);
    const [hideUpd, setHideupd] = useState(false)
    //dati input & account
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [CF, setCF] = useState("");
    const [iban, setIban] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [id_employee, setId_employee] = useState("");
    const [id_contractType, setId_contractType] = useState("");
    //
    const [popHide, setPopHide] = useState(true);

    //il problema del delay è relativo al fatto che appena la pagina carica filtredData è unefined
    function getAccount() {
        console.log(data?.id_account);
        axios
            .get(
                `${process.env.REACT_APP_FASTAPI_URL}/employee/account/${data?.id_account}`
            )
            .then((res) => {
                for (var x in res.data.data) {
                    setNome(res.data.data[x].first_name);
                    setCognome(res.data.data[x].last_name);
                    setCF(res.data.data[x].cf);
                    setIban(res.data.data[x].iban);
                    setEmail(res.data.data[x].email);
                    setTel(res.data.data[x].phoneNumber);
                    setId_employee(res.data.data[x].id_employee);
                    setId_contractType(res.data.data[x].id_contractType);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function sendData() {

        axios
            .post(`${process.env.REACT_APP_FASTAPI_URL}/employee/update/`, {
                first_name: nome,
                last_name: cognome,
                cf: CF,
                iban: iban,
                id_contractType: id_contractType,
                email: email,
                phoneNumber: tel,
                id_employee: id_employee,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        window.location.reload()
    }

    function hidePop() {
        if (popHide === true) {
            setPopHide(false);
        } else {
            setPopHide(true);
        }
        window.location.reload()
    }

    function FilterData() {
        function ChiamaUtente() {
            if (hid === true) {
                setHid(false);
            }
            setPopHide(false);
            setHideupd(true)

        }
        return (
            <>
                <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
                    <button className='btn btn-primary' onClick={ChiamaUtente} hidden={hideUpd}>Update</button>
                </Box>
            </>
        );
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
            <div>
                <div className='row'>
                    <div className="mb-3 col-6">
                        <div className='d-flex'>
                        <input 
                            className='form-control'
                            id='name'
                            type="text"
                            value={nome}
                            onChange={(val) => setNome(val.target.value)}
                            disabled={hid}
                            required 
                        />
                        </div>
                    </div>
                    <div className="mb-3 col-6">
                        <input
                            className='form-control'
                            type="text"
                            value={cognome}
                            onChange={(val) => setCognome(val.target.value)}
                            disabled={hid}
                            required />
                    </div>
                </div>
                
                <div className="mb-3">
                <input
                    className='form-control'
                    type="text"
                    value={CF}
                    onChange={(val) => setCF(val.target.value)}
                    disabled={hid}
                    required />
                </div>
                <div className="mb-3">
                <input 
                    className='form-control'
                    type="text"
                    value={iban}
                    onChange={(val) => setIban(val.target.value)}
                    disabled={hid}
                    required />
                </div>

                <div className='mb-3'>
                <input
                    className='form-control'
                    type="email"
                    value={email}
                    onChange={(val) => setEmail(val.target.value)}
                    disabled={hid}
                    required
                    />
                </div>

                <div className='mb-3'>
                    <input
                        className='form-control'
                        type="tel"
                        value={tel}
                        onChange={(val) => setTel(val.target.value)}
                        disabled={hid}
                        required
                        />
                </div>
            </div>

            <div className="moduleBelloBack" hidden={popHide}>
                <div className="moduleBelloBody">
                    <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
                        <button className="btn btn-primary" onClick={sendData}>
                            Manda i dati
                        </button>

                        <button className="btn btn-danger mx-3" onClick={hidePop}>
                            Torna Indietro
                        </button>
                    </Box>
                </div>
            </div>

            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                gap={6}>

            </Grid>
            {<FilterData />}
        </>
    )
}
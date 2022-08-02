import { FormControl, FormLabel, Grid, Input, Select, Button, Box } from '@chakra-ui/react'
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react"
import { theme } from "./ContTheme"



interface SessionInterface {
    id_account: string;
    abilitate: string;
    accountType: string;
    accountTypeName: string;
    accountListFunction: string;
    user: string;
}


export default function ContProfile() {

    console.log(theme)

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
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [id_employee, setId_employee] = useState("");
    const [id_contractType, setId_contractType] = useState("");
    //
    const [serverAlert, setServerAlert] = useState(true);
    const [popHide, setPopHide] = useState(true);

    //il problema del delay è relativo al fatto che appena la pagina carica filtredData è unefined
    function getAccount() {
        console.log(data?.id_account);
        axios
            .get(
                `${process.env.REACT_APP_FASTAPI_URL}/employee/account/${data?.id_account}`
            )
            .then((res) => {
                setFiltredData(res.data.data);
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
    }

    function hidePop() {
        if (popHide === true) {
            setPopHide(false);
        } else {
            setPopHide(true);
        }
    }

    function FilterData() {
        function ChiamaUtente() {
            if (nome !== "") {
                setServerAlert(true);
                if (hid === true) {
                    setHid(false);
                    setBtnMsg("Salva Modifiche");
                }
            } else {
                setServerAlert(false);
            }
            if (hid === false) {
                setPopHide(false);
            }
        }
        return (
            <>
                <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
                    <Button onClick={ChiamaUtente}>Update</Button>
                </Box>
                {/* <button className="btn btn-primary mt-5" onClick={ChiamaUtente}>
                    {btnMsg}
                </button> */}
                <div
                    className="alert alert-danger mt-3"
                    role="alert"
                    hidden={serverAlert}
                >
                    Aspetti che arrivino i dati dal server
                </div>
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


    return (<>
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
                <button className="btn btn-primary" onClick={sendData}>
                    Manda i dati
                </button>
                <button className="btn btn-danger mx-3" onClick={hidePop}>
                    Torna Indietro
                </button>
            </div>
        </div>

        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={6}>

            <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input focusBorderColor="brand.blue"
                    type="text"
                    value={nome}
                    onChange={(val) => setNome(val.target.value)}
                    disabled={hid}
                    required />
            </FormControl>

            <FormControl >
                <FormLabel>Cognome</FormLabel>
                <Input focusBorderColor="brand.blue"
                    type="text"
                    value={cognome}
                    onChange={(val) => setCognome(val.target.value)}
                    disabled={hid}
                    required />
            </FormControl>

            <FormControl>
                <FormLabel>Codice Fiscale</FormLabel>
                <Input focusBorderColor="brand.blue"
                    type="text"
                    value={CF}
                    onChange={(val) => setCF(val.target.value)}
                    disabled={hid}
                    required />
            </FormControl>

            <FormControl>
                <FormLabel>Iban</FormLabel>
                <Input focusBorderColor="brand.blue"
                    type="text"
                    value={iban}
                    onChange={(val) => setIban(val.target.value)}
                    disabled={hid}
                    required />
            </FormControl>

            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    focusBorderColor="brand.blue"
                    type="email"
                    value={email}
                    onChange={(val) => setEmail(val.target.value)}
                    disabled={hid}
                    required
                />
            </FormControl>

            <FormControl>
                <FormLabel>Telefono</FormLabel>
                <Input
                    focusBorderColor="brand.blue"
                    type="tel"
                    value={tel}
                    onChange={(val) => setTel(val.target.value)}
                    disabled={hid}
                    required
                />
            </FormControl>

        </Grid>
        {<FilterData />}

    </>)
}
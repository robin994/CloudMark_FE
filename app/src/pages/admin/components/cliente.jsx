import { Card, ListGroup } from "react-bootstrap"
import { useOutletContext, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { TextField, Button } from "@mui/material"
import axios from "axios"
import { getListaDipendenti } from "../../../data_mock"

export default function Cliente() {
    const [customer, setCustomer] = useState({})
    const [editedCustomer, setEditedCustomer] = useState({})
    const getDipendenti = useOutletContext()
    let params = useParams()
    let id_customer = params.id_customer
    useEffect( () => {
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/${id_customer}`).then( resp => {
        setCustomer(resp.data.data)
    }).catch( err => {
        console.log("axios error in rendering: \n", err)
    })
    setEditedCustomer(customer)
    }, [id_customer])
    useEffect(() => {
        setEditedCustomer(customer)
        editedCustomer["id_customer"] = id_customer
        sessionStorage.editedCustomer = editedCustomer
    }, [customer])
    const handleChange = e => {
        const {id, value} = e.target
        editedCustomer[id] = value
    }
    const handleSendUpdate = e => {
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/update/`, editedCustomer, {
            headers: {accept: "application/json", "Content-Type": "application/json"}
        }).then(resp => {
            if (resp.data.length === editedCustomer.id_customer.length 
                && resp.data.description === null
                && resp.data.status === "SUCCESS")
                getDipendenti()
        }).catch(err => {
            console.log("axios error in updating customer: \n", err)
        })
    }
    const inputsAttrs = [
        {type: "text", id: "name", label: `Nome: ${customer.name}`},
        {type: "text", id: "p_iva", label: `IVA: ${customer.p_iva}`},
        {type: "text", id: "address", label: `Address: ${customer.address}`},
        {type: "text", id: "cap", label: `CAP: ${customer.cap}`},
        {type: "text", id: "iban", label: `IBAN: ${customer.iban}`},
        {type: "email", id: "email", label: `Email: ${customer.email}`},
        {type: "email", id: "pec", label: `PEC: ${customer.pec}`},
        {type: "text", id: "fax", label: `FAX: ${customer.fax}`},
        {type: "text", id: "phone", label: `Phone: ${customer.phone}`}
    ]
    return (
            <Card style={{ width: '18rem' }}>
                <Card.Img src="/statics/customer.jpg" />
                <ListGroup variant="flush">
                {inputsAttrs.map(attrs => <TextField {...attrs} autoFocus margin="dense"
                                          fullWidth variant="outlined"
                                          onChange={e => handleChange(e)}
                                      />
                )}
                </ListGroup>
                <Button variant="contained" onClick={handleSendUpdate}>Save</Button>
            </Card>
    )
}
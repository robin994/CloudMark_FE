import { useOutletContext, useParams } from "react-router-dom"
import { Button } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import "./css_components/cliente.css"
import { MDBCol, MDBRow,MDBTypography } from 'mdb-react-ui-kit';
import Spacer from "../../../components/Spacer"

interface CustomerInterface {
    name: string
    p_iva: string
    address: string
    cap: string
    iban: string
    phone: string
    email: string
    pec: string
    fax: string
}

export default function Cliente() {
    const [payload, setPayload] = useState<CustomerInterface>();
    let params = useParams()
    const getDipendenti = useOutletContext() as Function
    let id_customer = params.id_customer
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/${id_customer}`).then(resp => {
            setPayload(resp.data.data)
        }).catch(err => {
            console.log("axios error in rendering: \n", err)
        })
    }, [id_customer])

    function handleUpdate() {
        axios.post(
            `${process.env.REACT_APP_FASTAPI_URL}/customer/update/`, payload
        ).then(resp => {
            if (resp.data.description === null
                && resp.data.status === "SUCCESS")
                getDipendenti()
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        let toUpdate = payload;
        switch (event.target.id) {
            case "name":
                toUpdate!.name = event.target.value;
                break;
            case "p_iva":
                toUpdate!.p_iva = event.target.value;
                break;
            case "address":
                toUpdate!.address = event.target.value;
                break;
            case "cap":
                toUpdate!.cap = event.target.value;
                break;
            case "iban":
                toUpdate!.iban = event.target.value;
                break;
            case "phone":
                toUpdate!.phone = event.target.value;
                break;
            case "email":
                toUpdate!.email = event.target.value;
                break;
            case "pec":
                toUpdate!.pec = event.target.value;
                break;
            case "fax":
                toUpdate!.fax = event.target.value;
                break;
        }
        setPayload(toUpdate);
    };
        return (
            <>
                <MDBTypography tag="h6">Informations</MDBTypography>
                <hr className="mt-0 mb-4" />
                <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Nome</MDBTypography>

                        <div className="input-group col-1">
                            <input type="text" className="form-control " id="name" placeholder={payload?.name} onChange={handleInput} />
                        </div>

                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Indrizzo</MDBTypography>
                        <div className="input-group col-1">
                            <input type="text" className="form-control " id="address" placeholder={payload?.address} onChange={handleInput} />
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Cap</MDBTypography>
                        <div className="input-group col-1">
                            <input type="text" className="form-control " id="cap" placeholder={payload?.cap} onChange={handleInput} />
                        </div>
                    </MDBCol>
                </MDBRow>
                <Spacer margin="1rem" />
                <MDBTypography tag="h6">Contacts</MDBTypography>
                <hr className="mt-0 mb-4" />
                <Spacer margin="1rem" />
                <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <div className="input-group col-1">
                            <input type="text" className="form-control " id="email" placeholder={payload?.email} onChange={handleInput} />
                        </div>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Pec</MDBTypography>
                        <div className="input-group col-1">
                            <input type="text" className="form-control " id="pec" placeholder={payload?.pec} onChange={handleInput} />
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Iban</MDBTypography>
                        <div className="input-group col-1">
                            <input type="text" className="form-control " id="iban" placeholder={payload?.iban} onChange={handleInput} />
                        </div>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Telefono</MDBTypography>
                        <div className="input-group col-1">
                            <input type="text" className="form-control " id="phone" placeholder={payload?.phone} onChange={handleInput} />
                        </div>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">P.Iva</MDBTypography>
                        <div className="input-group col-1">
                            <input type="text" className="form-control " id="p_iva" placeholder={payload?.p_iva} onChange={handleInput} />
                        </div>

                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Fax</MDBTypography>
                        <div className="input-group col-1">
                            <input type="text" className="form-control " id="p_iva" placeholder={payload?.fax} onChange={handleInput} />
                        </div>

                    </MDBCol>
                </MDBRow>
                <Spacer margin="3rem" />
                <div className="div-cliente">
                    <Button type="button" variant="contained" className="btn btn-primary center btn-lg" onClick={handleUpdate}>Save</Button>
                </div>
            </>
        )
    }

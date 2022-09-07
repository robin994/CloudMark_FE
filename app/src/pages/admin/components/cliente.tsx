import { useOutletContext, useParams } from "react-router-dom"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import "./css_components/cliente.css"
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommesseByCustomer from "./commesseByCustomer"
import CardClienti from "./CardClienti"
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
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/${id_customer}`).then(resp => {
            setPayload(resp.data.data)
        }).catch(err => {
            console.log("axios error in rendering: \n", err)
        })
    }, [id_customer, isOpen])

    const openOrders = () => {
        setIsOpen(true)
    }
    const closeOrders = () => {
        setIsOpen(false)
    }

    if (isOpen === false) {
        return (
            <>
                <MDBCard className="mb-3 w-100 h-100 card-clienti " style={{ borderRadius: '.5rem', marginRight: '2rem', display: 'flex' }}>
                    <MDBRow className="g-0">
                        <MDBCol md="3" className="gradient-custom text-center text-white"
                            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                            <MDBCardText>Customer</MDBCardText>
                            <MDBCol>
                                <div>
                                    <table className="table">
                                        <tr>
                                            <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <MDBCardText style={{  }}><Button onClick={openOrders}>Visualizza Commesse<VisibilityIcon style={{ marginLeft: '5px' }} /></Button></MDBCardText>
                                            </td>
                                        </tr>

                                    </table>
                                </div>
                            </MDBCol>
                        </MDBCol>
                        <MDBCol md="9" className="h-100 ">
                            <MDBCardBody className="p-4 border h-100 ">
                                <CardClienti />
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    </MDBRow>
                </MDBCard>
            </>
        )
    }
    else {
        return (
            <>
                <MDBCard className="mb-3 w-100 h-100 card-clienti " style={{ borderRadius: '.5rem', marginRight: '2rem', display: 'flex' }}>
                    <MDBRow className="g-0">
                        <MDBCol md="3" className="gradient-custom text-center text-white"
                            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                            <MDBCardText>Customer</MDBCardText>
                            <MDBCol>
                                <div>
                                    <table className="table">

                                        <tr>
                                            <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <MDBCardText style={{}}><Button onClick={openOrders}>Visualizza Commesse<VisibilityIcon style={{ marginLeft: '5px' }} /></Button></MDBCardText>
                                            </td>
                                        </tr>

                                    </table>
                                </div>
                            </MDBCol>
                        </MDBCol>
                        <MDBCol md="9" className="h-100 ">
                            <MDBCardBody className="p-4 border h-100 ">
                                <Button onClick={closeOrders} style={{ marginLeft: '-9px', fontSize: '12px', textDecoration: 'underline' }}><ArrowBackIcon style={{ fontSize: '15px' }} />Torna a Cliente</Button>
                                <CommesseByCustomer id_customer={id_customer} />
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    </MDBRow>
                </MDBCard>
            </>
        )
    }
}
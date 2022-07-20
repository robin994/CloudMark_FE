import { Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getListaDipendenti } from "../../data_mock"
import CustomCard from "../../components/CustomCard"
import { useEffect, useState } from "react"
import Spacer from "../../components/Spacer"
import axios from 'axios'

interface Clients {
    [key: string]: Client
}

interface Client {
    [ key: string]: any
}

export default function Clienti() {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState<Clients>({})
    useEffect(() => {
        if (sessionStorage.auth === undefined)
            navigate("/login", {replace: true})
    }, [navigate])
    
    async function getDipendenti() {
        try {
          const response = await axios.get<any>(`http://localhost:8000/customer`);
          setCustomers(response.data)
        } catch (error) {
          console.log(error)
        }
      }
    useEffect( () => {
        getDipendenti()
    }, [])
    let customers_obj = Object.values(customers)
    return (
        <>
            <Container>
                <Spacer margin='80px' />
                <Container>
                <Row>
                    <Col>
                    <h1>
                        {`${sessionStorage.azienda_nome} Dipendenti`}
                    </h1>
                    </Col>
                </Row>
                <Row>
                {customers_obj.map(cust => (
                    <Col>
                        <CustomCard cardTitle={`${cust.name}`}
                        imgSrc='/statics/customer.jpg'
                        navPath={`/cliente/${cust.id_customer}`}
                        buttonText='Dettagli'
                        textDesc={cust.phone}/>
                    </Col>
                ))}
                </Row>
                </Container>
                <Spacer margin='80px' />
            </Container>
        </>
    )
}
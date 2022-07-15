import { Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getListaDipendenti } from "../data_mock"
import CustomCard from "./CustomCard"
import Spacer from "./Spacer"

export default function DipendentiLista() {
    const navigate = useNavigate()
    if (sessionStorage.auth !== "true") {
        navigate("/login")
    }
    let lista_dipendenti = getListaDipendenti()
    let comps_Dipendente = []
    for (const dip of Object.values(lista_dipendenti)) {
        comps_Dipendente.push(dip)
    }
    return (
        <>
            <Container>
                <Spacer />
                <Container>
                <Row >
                    <Col>
                    <h1>
                        {`${sessionStorage.azienda_nome} Dipendenti`}
                    </h1>
                    </Col>
                </Row>
                <Row>
                {comps_Dipendente.map(dip => (
                    <Col>
                        <CustomCard cardTitle={`${dip.nome} ${dip.cognome}`}
                        imgSrc='https://www.svgrepo.com/show/12496/users.svg'
                        navPath={`/dipendente/${dip.id_employee}`}
                        buttonText='Dettagli'
                        textDesc={dip.telefono}/>
                    </Col>
                ))}
                </Row>
                </Container>
                <Spacer />
                <Container className='center'>
                    <Row className='my-5'>
                    <Col>
                      {}
                    </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}
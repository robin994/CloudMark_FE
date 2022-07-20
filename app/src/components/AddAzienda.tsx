import './css_components/AddAzienda.css'
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Spacer from "./Spacer"

const AddAziendaComponent=()=>{
 
    return(
        <>
            <Spacer margin="20px" />
                <Container>
                    <Card style={{ width: '24rem' }} className="mx-auto">
                        <Card.Header className="text-center">
                            <h1>Modifica Azienda</h1>
                        </Card.Header>
                        <Card.Body>
                            <form action="">
                                <div>
                                    <input type="text" placeholder="Nome" className="form-control my-3" required/>
                                </div>
                                <div>
                                    <input type="text"  placeholder="Partita Iva" className="form-control my-3" required/>
                                </div>
                                <div>
                                    <input type="text" placeholder="iban"  className="form-control my-3" required/>
                                </div>
                                <div>
                                    <input type="email" name="email" placeholder="Email" id="emailRegistrazione" className="form-control my-3" required/>
                                </div>
                                <div>
                                    <input type="tel" name="telefono" placeholder="Telefono" className="form-control my-3" required/>
                                </div>
                                <div>
                                    <input type="text" name="indirizzo" placeholder="Indirizzo" className="form-control my-3" required />
                                </div>
                                <button type="submit" className="btn btn-outline-primary">Conferma Modifica</button>
                            </form>
                        </Card.Body>
                    </Card>
                </Container>
        </>
    )
}

export default AddAziendaComponent
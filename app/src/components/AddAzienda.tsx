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
                        <h1>Aggiungi Azienda</h1>
                    </Card.Header>
                    <Card.Body>

                        <form action="submit">
                    
                            <div>
                                <input type="text" placeholder="Nome" className="form-control my-3" required/>
                            </div>

                            <div>
                                <input type="text"  placeholder="Partita Iva" className="form-control my-3" required/>
                            </div>
                            
                            <div>
                                <input type="text" placeholder="Iban"  className="form-control my-3" required/>
                            </div>

                            <div>
                                <input type="email" name="email" placeholder="Email" id="emailReg" className="form-control my-3" required/>
                            </div>

                            <div>
                                <input type="email" name="pec" placeholder="Pec" id="pecReg" className="form-control my-3" required/>
                            </div>

                            <div>
                                <input type="tel" name="telefono" placeholder="Telefono" className="form-control my-3" required/>
                            </div>

                            <div>
                                <input type="text" name="indirizzo" placeholder="Indirizzo" className="form-control my-3" required />
                            </div>

                            <div>
                                <input type="text" name="cap" placeholder="Cap" className="form-control my-3" required/>
                            </div>

                            <div>
                                <input type="text" name="fax" placeholder="Fax" className="form-control my-3" required/>
                            </div>
                            

                            

                            <button type="submit" className="btn btn-outline-primary my-2">Conferma Modifica</button>

                        </form>
                    </Card.Body>
                </Card>
            </Container>

    </>
  )

}

export default AddAziendaComponent
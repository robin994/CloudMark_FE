import './css_components/AddAzienda.css'
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Spacer from "./Spacer"
import React, {useState} from 'react'

export default function AddAzienda() {
    const [oggetto, setOggetto] = useState([{nome:""},{p_iva:""},{iban:""},{indirizzo:""},{cap:""},{telefono:""},{email:""}, {pec:""}, {fax:""}])
    function MandaDati(){

    }
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
                                    <input type="text" placeholder="Nome" className="form-control my-3" required onChange={(val)=>{setOggetto([{nome:val.target.value}])}}/>
                                </div>
                                <div>
                                    <input type="text"  placeholder="Partita Iva" className="form-control my-3" required onChange={(val)=>{setOggetto([{email:val.target.value}])}}/>
                                </div>
                                <div>
                                    <input type="text" placeholder="iban"  className="form-control my-3" required onChange={(val)=>{setOggetto([{iban:val.target.value}])}}/>
                                </div>
                                <div>
                                    <input type="email" name="email" placeholder="Email" className="form-control my-3" required onChange={(val)=>{setOggetto([{email:val.target.value}])}}/>
                                </div>
                                <div>
                                    <input type="email" name='pec' placeholder='Pec' className='form-control my-3' required onChange={(val)=>{setOggetto([{pec:val.target.value}])}}/>
                                </div>
                                <div>
                                    <input type="text" name='fax'  placeholder='Fax' className='form-control my-3' required onChange={(val)=>{setOggetto([{fax:val.target.value}])}}/>
                                </div>
                                <div>
                                    <input type="tel" name="telefono" placeholder="Telefono" className="form-control my-3" required onChange={(val)=>{setOggetto([{telefono:val.target.value}])}}/>
                                </div>
                                <div>
                                    <input type="text" name="indirizzo" placeholder="Indirizzo" className="form-control my-3" required onChange={(val)=>{setOggetto([{indirizzo:val.target.value}])}}/>
                                </div>
                                <div>
                                    <input type="text" name='cap' placeholder='Cap' className='form-control my-3' onChange={(val)=>{setOggetto([{cap:val.target.value}])}}/>
                                </div>
                                <button type="submit" className="btn btn-outline-primary" onClick={MandaDati}>Conferma Modifica</button>
                            </form>
                        </Card.Body>
                    </Card>
                </Container>
        </>
    )
}

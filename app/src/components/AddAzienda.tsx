import './css_components/AddAzienda.css'
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Spacer from "./Spacer"
import React, {useState} from 'react'
import axios from 'axios'

export default function AddAzienda() {
    const[nome, setNome]= useState('')
    const[p_iva, setP_iva]= useState('')
    const[indirizzo, setIndirizzo]= useState('')
    const[cap, setCap]= useState('')
    const[iban, setIban]= useState('')
    const[telefono, setTelefono]= useState('')
    const[email, setEmail]= useState('')
    const[pec, setPec]= useState('')
    const[fax, setFax]= useState('')

    function MandaDati(){
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/business/create/`, {
            name: nome,
            p_iva: p_iva,
            address: indirizzo,
            cap: cap,
            iban: iban,
            phone: telefono,
            email: email,
            pec: pec,
            fax: fax
            
        }).then(res=>{console.log(res)
        }).catch(err=>{console.log(err)})
        console.log('click funzia')
    }
    return(
        <>
            <Spacer margin="20px" />
                <Container>
                    <Card style={{ width: '24rem' }} className="mx-auto">
                        <Card.Header className="text-center">
                            <h1>Aggiungi Azienda</h1>
                        </Card.Header>
                        <Card.Body>
                            <form>
                                <div>
                                    <input type="text" placeholder="Nome" className="form-control my-3" required onChange={(val)=>{setNome(val.target.value)}}/>
                                </div>
                                <div>
                                    <input type="text"  placeholder="Partita Iva" className="form-control my-3" required onChange={(val)=>{setP_iva(val.target.value)}}/>
                                </div>
                                <div>
                                    <input type="text" placeholder="iban"  className="form-control my-3" required onChange={(val)=>{setIban(val.target.value)}}/>
                                </div>
                                <div>
                                    <input type="email" name="email" placeholder="Email" className="form-control my-3" required onChange={(val)=>{setEmail(val.target.value)}}/>
                                </div>
                                <div>
                                    <input type="email" name='pec' placeholder='Pec' className='form-control my-3' required onChange={(val)=>{setPec(val.target.value)}}/>
                                </div>
                                <div>
                                    <input type="text" name='fax'  placeholder='Fax' className='form-control my-3' required onChange={(val)=>{setFax(val.target.value)}}/>
                                </div>
                                <div>
                                    <input type="tel" name="telefono" placeholder="Telefono" className="form-control my-3" required onChange={(val)=>{setTelefono(val.target.value)}}/>
                                </div>
                                <div>
                                    <input type="text" name="indirizzo" placeholder="Indirizzo" className="form-control my-3" required onChange={(val)=>{setIndirizzo(val.target.value)}}/>
                                </div>
                                <div>
                                    <input type="text" name='cap' placeholder='Cap' className='form-control my-3' onChange={(val)=>{setCap(val.target.value)}}/>
                                </div>
                                <button type='button' className="btn btn-outline-primary" onClick={MandaDati}>Conferma Aggiunta</button>
                            </form>
                        </Card.Body>
                    </Card>
                </Container>
        </>
    )
}

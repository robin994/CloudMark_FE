import { Password } from '@mui/icons-material';
import axios from 'axios';
import { type } from 'os';
import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const id_business = sessionStorage.business_id;

const AddDipendente = () => {

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [cf, setCf] = useState('')
  const [iban, setIban] = useState('')
  const [id_contractType, setIdContractType] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [abilitato, setAbilitato] = useState(1)
  const [start_date, setStartDate] = useState('')
  const [end_date, setEndDate] = useState('')
  const [serial_num, setserial_num] = useState('')
  const ref = useRef()
  const navigate = useNavigate()

  const CreateEmployee = (e: any) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_FASTAPI_URL}/employee/create/account`, {
      new_employee: {
        first_name: first_name,
        last_name: last_name,
        cf: cf,
        iban: iban,
        id_contractType: id_contractType,
        email: email,
        phoneNumber: phoneNumber,
      },
      new_account: {
        user: user,
        password: password,
        abilitato: abilitato,
        id_tipo_account: "7e554b54-08f4-11ed-861d-0242ac120002",
      },
      id_business: sessionStorage.business_id,
      start_date: start_date,
      end_date: end_date,
      serial_num: serial_num,
    })
      .then(function (response) {
        console.log(response);
        navigate("/dipendenti", {replace: true})
      })
      .catch(function (error) {
        console.log({
          new_employee: {
            first_name: first_name,
            last_name: last_name,
            cf: cf,
            iban: iban,
            id_contractType: id_contractType,
            email: email,
            phoneNumber: phoneNumber,
          },
          new_account: {
            user: user,
            password: password,
            abilitato: abilitato,
            id_tipo_account: "7e554b54-08f4-11ed-861d-0242ac120002",
          },
          id_business: sessionStorage.business_id,
          start_date: start_date,
          end_date: end_date,
          serial_num: serial_num,
        });
      });
  }

  return (
    <>
      <Card style={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center', fontSize: "50px", fontFamily: "Gill Sans, sans-serif" }}>Aggiungi Dipendente</Card.Title>
          <div className='container' style={{ display: 'flex', marginTop: "3vh" }}>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input style={{ marginRight: '1vh' }} value={first_name} type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="Nome" className="form-control col-xs-3" required ></input>
            </div>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input value={last_name} type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Cognome" className="form-control" required ></input>
            </div>
          </div>
          <div className='container' style={{ display: 'flex', marginTop: "1vh" }}>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input style={{ marginRight: '1vh' }} value={cf} type="text" onChange={(e) => setCf(e.target.value)} placeholder="Codice Fiscale" className="form-control" required ></input>
            </div>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input value={iban} type="text" onChange={(e) => setIban(e.target.value)} placeholder="Iban" className="form-control" required ></input>
            </div>
          </div>
          <div className='container' style={{ display: 'flex', marginTop: "1vh" }}>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <select style={{ marginRight: '1vh' }} id="myselect" className="form-control form-select" onChange={(e) => {
                setIdContractType(e.target.value)
              }}>
                <option>-Seleziona-</option>
                <option value={'52fbe812-08f6-11ed-861d-0242ac120002'} >Determinato</option>
                <option value={'198ef11d-cf73-4245-8469-2ddfa9979acf'}>Indeterminato</option>
              </select>
            </div>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="form-control" required ></input>
            </div>
          </div>
          <div className='container' style={{ display: 'flex', marginTop: "1vh" }}>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input style={{ marginRight: '1vh' }} value={user} type="text" onChange={(e) => setUser(e.target.value)} placeholder="Username" className="form-control" required ></input>
            </div>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="form-control" required ></input>
            </div>
          </div>
          <div className='container' style={{ display: 'flex', marginTop: "1vh" }}>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input style={{ marginRight: '1vh' }} value={abilitato} type="text" onChange={(e) => setAbilitato(e.target.valueAsNumber)} placeholder="abilitato" className="form-control" disabled></input>
            </div>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input value={'dipendente'} type="text" placeholder="tipo account" className="form-control" disabled></input>
            </div>
          </div>
          <div className='container col-md-12' style={{ display: 'flex', marginTop: "1vh" }}>
            <input style={{ marginRight: "1vh" }} id='startDate' value={start_date} type="text" onFocus={(e) => { e.currentTarget.type = "date" }} onBlur={(e) => { e.currentTarget.type = 'text' }} onChange={(e) => setStartDate(e.target.value)} placeholder="Data Inizio Contratto" className="form-control" required ></input>
            <div className='col-md-6' style={{ display: 'flex' }}>
              <input value={end_date} type="text" id='endDate' onFocus={(e) => { e.currentTarget.type = 'date' }} onBlur={(e) => { e.currentTarget.type = 'text' }} onChange={(e) => setEndDate(e.target.value)} placeholder="Data Fine Contratto" className="form-control" required ></input>
            </div>
          </div>
          <div className='container' style={{ display: 'flex', marginTop: "1vh" }}>
            <div className='col-md-12' style={{ display: 'flex' }}>
              <input value={serial_num} type="text" onChange={(e) => setserial_num(e.target.value)} placeholder="Numero di Matricola" className="form-control" required ></input>
            </div>
          </div>
          <div className='container' style={{ display: 'flex', marginTop: "1vh" }}>
            <div className='col-md-12' style={{ display: 'flex' }}>
              <input value={phoneNumber} type="tel" onChange={(e) => setphoneNumber(e.target.value)} placeholder="Telefono" className="form-control" required ></input>
            </div>
          </div>
          <div className='container' style={{ marginTop: "1vh" }}>
            <div className='col-md-12' style={{ display: 'flex' }}>
              <Button variant="primary" style={{ width: "100%" }}
                onClick={CreateEmployee}>Conferma </Button>
            </div>
            <a href="dipendenti">
              <Button variant="secondary" style={{ width: "100%", marginTop: "1vh" }}>Torna Indietro</Button>
            </a>

          </div>

        </Card.Body>
      </Card>
    </>
  )
}

export default AddDipendente
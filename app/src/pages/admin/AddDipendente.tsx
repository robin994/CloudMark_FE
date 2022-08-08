import { Password } from '@mui/icons-material';
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


  

const AddDipendente = () => {



    const[first_name,setFirstName] =useState('')
    const[last_name,setLastName] = useState('')
    const[cf,setCf] =useState('')
    const[iban,setIban] =useState('')
    const[id_contractType,setIdContractType] = useState('')
    const[email,setEmail] =useState('')
    const[phoneNumber,setphoneNumber] = useState('')

    const[user,setUser] =useState('')
    const[password,setPassword] =useState('')
    const[abilitato,setAbilitato] =useState(0)
    const[id_tipo_account,setIdTipoAccount] =useState('')

    const[id_business,setBusiness] =useState('')
    const[start_date,setStartDate] = useState('')
    const[end_date,setEndDate] = useState('')
    const[serial_num,setserial_num] = useState('')



    const types: { [key: string]: string } = {

      "52fbe812-08f6-11ed-861d-0242ac120002":"determinato",
      "198ef11d-cf73-4245-8469-2ddfa9979acf":"indeterminato",
      "7e55494c-08f4-11ed-861d-0242ac120002":"administrator",
      "7e554b54-08f4-11ed-861d-0242ac120002":"dipendente",

      "124e4567-e85b-1fd3-a456-426614474000":"markup",
      "11111111-e85b-1fd3-a456-426614474000":"tamtung",
      "12455557-444b-1333-a886-426699994000":"pokia",
      "f565cec2-a3d9-4b9d-8600-0a3fd43dd5fb":"MARCO"
    };

const CreateEmployee=(e:any)=>{
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_FASTAPI_URL}/employee/create/account`, {
        new_employee:{
            first_name:first_name,
            last_name:last_name,
            cf: cf,
            iban: iban,
            id_contractType: id_contractType,
            email: email,
            phoneNumber: phoneNumber,

        },
        new_account:{
            user: user,
            password: password,
            abilitato:abilitato,
            id_tipo_account: id_tipo_account,

        },
    
        id_business: id_business,
        start_date: start_date,
        end_date: end_date,
        serial_num: serial_num,

     
    
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}






  return (
    <>
 

    <Card style={{ width: '50%',justifyContent: 'center',textAlign: 'center' }}>
     
      <Card.Body>
        <Card.Title style={{ textAlign: 'center',fontSize:"50px" }}>Aggiungi Dipendente</Card.Title>
       
            <div style={{display: 'flex',marginTop:"1vh"}}>
            <input value={first_name} type="text" onChange={(e) => setFirstName(e.target.value)}placeholder="First Name" className="form-control" required ></input>
            <input value={last_name}type="text"onChange={(e) => setLastName(e.target.value)}placeholder="Last Name"className="form-control" required ></input>
            </div>

            <div style={{display: 'flex',marginTop:"1vh"}}>
                
            <input value={cf} type="text"onChange={(e) => setCf(e.target.value)} placeholder="Cf"className="form-control" required ></input>
            <input value={iban}type="text" onChange={(e) => setIban(e.target.value)} placeholder="Iban"className="form-control" required ></input>
            </div>

            <div style={{display: 'flex',marginTop:"1vh"}}>

            <input value={id_contractType}type="text" onChange={(e) => setIdContractType(e.target.value)}placeholder="Id Contratto"className="form-control" required ></input>
            <input value={email}type="email" onChange={(e) => setEmail(e.target.value)}placeholder="Email"className="form-control" required ></input>
            </div>

            <div style={{display: 'flex',marginTop:"1vh"}}>
                <input value={user}type="text" onChange={(e) => setUser(e.target.value)}placeholder="user"className="form-control" required ></input>
                <input value={password}type="password" onChange={(e) => setPassword(e.target.value)}placeholder="password"className="form-control" required ></input>
            </div>
            <div style={{display: 'flex',marginTop:"1vh"}}>
                <input value={abilitato}type="text" onChange={(e) => setAbilitato(e.target.valueAsNumber)}placeholder="abilitato"className="form-control" required ></input>
                <input value={id_tipo_account}type="text" onChange={(e) => setIdTipoAccount(e.target.value)}placeholder="tipo account"className="form-control" required ></input>
            </div>

            <div style={{display: 'flex',marginTop:"1vh"}}>
                <input value={start_date}type="date" onChange={(e) => setStartDate(e.target.value)}placeholder="start date"className="form-control" required ></input>
                <input value={end_date}type="date" onChange={(e) => setEndDate(e.target.value)}placeholder="end date"className="form-control" required ></input>
            </div>

            <div style={{display: 'flex',marginTop:"1vh"}}>
                <input value={id_business}type="text" onChange={(e) => setBusiness(e.target.value)}placeholder="id business"className="form-control" required ></input>
                <input value={serial_num}type="text" onChange={(e) => setserial_num(e.target.value)}placeholder="serial num"className="form-control" required ></input>
            </div>

            <div style={{display: 'flex',marginTop:"1vh"}}>
            <input value={phoneNumber} type="tel" onChange={(e) => setphoneNumber(e.target.value)} placeholder="Telefono"className="form-control" required ></input>
            
            </div>

        

       
        <div style={{marginTop:"1vh"}}>
        <Button variant="primary" style={{width:"100%"}}
        onClick={CreateEmployee}>Conferma </Button>
      
        <a href="dipendenti">
        <Button variant="danger" style={{width:"100%",marginTop:"1vh"}}>Annulla</Button>
        </a>
        </div>
     
      </Card.Body>
    </Card>
 
        
    </>
  )
}

export default AddDipendente
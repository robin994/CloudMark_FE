import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'
import './css_components/Tab.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React,{useState} from 'react'



export default function Tab() {


    const mydata = [
        {id:1,nome:"marco",cognome:"rossi",email:"ciao@gmail.com"},
        {id:2,nome:"andrea",cognome:"bianco",email:"hey@gmail.com"},
        {id:3,nome:"lorenzo",cognome:"mimmo",email:"mim@gmail.com"},
        {id:4,nome:"gianni",cognome:"esposito",email:"gio@gmail.com"},
        {id:5,nome:"sandro",cognome:"pinna",email:"pin@gmail.com"},
        {id:6,nome:"francesco",cognome:"beltra",email:"bel@gmail.com"},
        {id:7,nome:"alessandro",cognome:"ciro",email:"ciro@gmail.com"},
     
       
    ]


    const[value,setValue]= useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [dataSource, setDataSource] = useState(mydata)
    const [TableFilter,setTableFilter] = useState([])

    const FilterData = (e)=>{
        if(e.target.value !== "" ){
            setValue(e.target.value);
            const FilterTable = dataSource.filter(o=>Object.keys(o).some(k=>
                String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
                ));
                setTableFilter([...FilterTable])
        }else{
            setValue(e.target.value);
            setDataSource([...dataSource])
        }
    }

    const paginationBLock = (
        <>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </>
    )
  

    
    return (
        <>
            <Card>
              
                <Card.Body>
                <div className="mytop">
                    <input className="form-control" placeholder="search" value={value} onChange={FilterData}></input>
                    <button className="btn btn-primary">Conferma</button>
                </div>
                
                    
                    <Table striped bordered hover className="mytab">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {value.length > 0 ? TableFilter.map((data)=>{
                                return(
                                    <tr key="primo">
                                    <td>{data.id}</td>
                                    <td>{data.nome}</td>
                                    <td>{data.cognome}</td>
                                    <td>{data.email}
                    
                                    </td>
                                  
                                </tr>
                                )
                            })
                        :
                        dataSource.map((data)=>{
                            return(
                                <tr>
                                <td>{data.id}</td>
                                <td>{data.nome}</td>
                                <td>{data.cognome}</td>
                                <td>{data.email}
                                <Button variant="primary" onClick={handleShow} className="premi">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
</svg>

                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Anagrafica Dipendente</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Modifica Utente
                                        <div>
                                            <input type="text" placeholder="nome" className="form-control"></input>
                                            <input type="text" placeholder="cognome" className="form-control"></input>
                                            <input type="text" placeholder="email" className="form-control"></input>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={handleClose}>
                                        Conferma Modifica
                                        </Button>
                                        <Button variant="danger" onClick={handleClose}>
                                            Annulla
                                        </Button>
                                    </Modal.Footer>
                                </Modal></td>
                            </tr>
                            )
                        })
                        
                        }
                        
                        </tbody>
                    </Table>
                </Card.Body>
                {paginationBLock}
            </Card>
        </>
  )
}

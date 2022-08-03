import { ListGroup } from "react-bootstrap"
import { useNavigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from 'axios'
import axios from 'axios'
import { DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogTitle, DialogActions, 
         DialogContent, DialogContentText, TextField } from "@mui/material"        

let newCustomer = {}

export default function Clienti() {

    const navigate = useNavigate()
    const [customers, setCustomers] = useState({})
    const [id_customer, setId_customer] = useState("")
    const [openAddCustomer, setOpenAddCustomer] = useState(false)
    useEffect(() => navigate(`/clienti/${id_customer}`), [id_customer])
    const handleDetails = id_customer => {
        setId_customer(id_customer)
    }
    const handleDelete = id_customer => {
        Axios(`${process.env.REACT_APP_FASTAPI_URL}/customer/delete/`, {
            method: "POST",
            headers: {accept: "application/json"},
            params: {id_customer: id_customer}
        }).catch(err => {
            console.log("errore", err)
        })
        getDipendenti()
    }
    const handleAddCustomer = () => setOpenAddCustomer(true)
    const handleClose = () => {
        setOpenAddCustomer(false)
        getDipendenti()
    }
    console.log("id_customer = ", id_customer)
    const columns = [
        { field: 'name', headerName: 'Nome', width: 150 },
        { field: 'actions', type: "actions", getActions: customer_row => [
            <GridActionsCellItem icon={<EditIcon />} label="Info"
            onClick={() => handleDetails(customer_row.id)}
            />,
            <GridActionsCellItem icon={<DeleteIcon />} label="Delete"
            onClick={() => handleDelete(customer_row.id)}
            />
        ]}
    ];
    let rowsArr = []
    for (const [id_customer, detailsObj] of Object.entries(customers)) {
        rowsArr.push({id: id_customer, name: detailsObj.name})
    }
    const rows = rowsArr
    async function getDipendenti() {
        try {
          const response = await axios.get(`${process.env.REACT_APP_FASTAPI_URL}/customer`);
          setCustomers(response.data.data)
        } catch (error) {
          console.log(error)
        }
      }
    useEffect( () => {
        getDipendenti()
    }, [])
    return (
        <>
        <AddCustomerDialog onClose={handleClose} open={openAddCustomer}/>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddCustomer}>
            ADD CUSTOMER
        </Button>
        <ListGroup horizontal="md" variant="flush">
            <ListGroup.Item>
                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns}/>
                </div>
            </ListGroup.Item>
            <ListGroup.Item>
                <Outlet/>
            </ListGroup.Item>
        </ListGroup>
        </>
    )
}

function AddCustomerDialog(props) {
  const { onClose, open } = props
  const [missing, setMissing] = useState(false)

  const handleClose = () => {
    onClose()
    setMissing(false)
  }
  const handleChange = (e) => {
    const {id, value} = e.target
    console.log(id, value)
    newCustomer[id] = value
  }
  const handleAdd = () => {
    if (Object.keys(newCustomer).length !== 9)
        setMissing(true)
    else
        Axios(`${process.env.REACT_APP_FASTAPI_URL}/customer/create/`, {
            method: "POST",
            headers: {accept: "application/json", "Content-Type": "application/json"},
            data: newCustomer
        }).then(resp => {
            onClose()
        }).catch(err => {
            console.log("errore", err)
        })
  }
  const inputsAttrs = [
    {type: "text", id: "name", label: "Name"},
    {type: "text", id: "p_iva", label: "IVA"},
    {type: "text", id: "address", label: "Address"},
    {type: "text", id: "cap", label: "CAP"},
    {type: "text", id: "iban", label: "IBAN"},
    {type: "email", id: "email", label: "Email Address"},
    {type: "email", id: "pec", label: "PEC Address"},
    {type: "text", id: "fax", label: "FAX"},
    {type: "text", id: "phone", label: "Phone"}
  ]
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a customer and its detail here (every field is mandatory)
          </DialogContentText>
          {inputsAttrs.map(attrs => <TextField {...attrs} autoFocus margin="dense"
                                          fullWidth variant="standard" required
                                          onChange={e => handleChange(e)}
                                      />
          )}
          {missing && <h5 className="text-danger">Missing credentials, can't process this form</h5>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Confirm</Button>
        </DialogActions>
    </Dialog>
  );
}
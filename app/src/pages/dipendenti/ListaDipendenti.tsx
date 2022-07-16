import DataTable from '../../components/DataTable'

let heading = ['Nome', 'Cognome', 'Citta', 'Indirizzo']

let objects = [
  {
    'Nome': 'Alessandro',
    'Cognome': 'Rocco',
    'Citta': 'Roma',
    'Indirizzo': 'Via Enrico Jovane, 9'
  },
  {
    'Nome': 'Alessandro',
    'Cognome': 'Rocca',
    'Citta': 'Milano',
    'Indirizzo': 'Via Enrico Jovane, 10'
  },
  {
    'Nome': 'Alessandro',
    'Cognome': 'Rocche',
    'Citta': 'Torino',
    'Indirizzo': 'Via Enrico Jovane, 11'
  },
  {
    'Nome': 'Alessandro',
    'Cognome': 'Rocchi',
    'Citta': 'Bologna',
    'Indirizzo': 'Via Enrico Jovane, 12'
  }
]

export default function ListaDipendenti() {
    const axios = require('axios');

    axios.get('')
    .then((response: object)=> {
        console.log(response)
    })
    .catch((error: Error)=> {
        console.log(error)
    })

    return (
        <DataTable id='id' col={heading} rows={objects}/>
    )
}

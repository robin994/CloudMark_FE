let lista_dipendenti = {
    "0": {
        "id_employee": 0,
        "nome": "bruno",
        "cognome": "rossi",
        "cf": "123",
        "iban": "696",
        "tipo_contratto": "indeterminato",
        "email": "brunorossi@gmail.com",
        "telefono": "1234"
    },
    "1": {
        "id_employee": 1,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "2": {
        "id_employee": 2,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "3": {
        "id_employee": 3,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "4": {
        "id_employee": 4,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "5": {
        "id_employee": 5,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "6": {
        "id_employee": 6,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "7": {
        "id_employee": 7,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "8": {
        "id_employee": 8,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "9": {
        "id_employee": 9,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "10": {
        "id_employee": 10,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "11": {
        "id_employee": 11,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "12": {
        "id_employee": 12,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "13": {
        "id_employee": 13,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "14": {
        "id_employee": 14,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "15": {
        "id_employee": 15,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "16": {
        "id_employee": 16,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    },
    "17": {
        "id_employee": 17,
        "nome": "francesco",
        "cognome": "gialli",
        "cf": "221",
        "iban": "333",
        "tipo_contratto": "indeterminato",
        "email": "francescogialli@gmail.com",
        "telefono": "11222"
    }
}

export function getListaDipendenti() {
    return lista_dipendenti
}

// employee

const mockPresenzeHeading = {
    presenze: 'Presenza',
    ferie: 'Ferie',
    malattia: 'Malattia',
    permessi: 'Permessi',
    straordinari: 'Straordinari',
    totale: 'Totale Ore',
    cliente: 'Cliente',
    note: 'Note'
  }
  
  export function getMockPresenzeHeading() {
    return mockPresenzeHeading
  }
  
  const mockPresenzeDate = [
    {
        date: '01/06/22',
        presenze: '4',
        ferie: '3',
        malattia: '0',
        permessi: '1',
        straordinari: '2',
        totale: '10',
        cliente: 'Plenitude',
      note: 'Giornataccia?'
    },
    {
        date: '27/05/22',
        presenze: '4',
        ferie: '1',
        malattia: '0',
        permessi: '3',
        straordinari: '1',
        totale: '9',
        cliente: 'Plenitude',
        note: 'Giornataccia?'
    },
    {
        date: '26/05/22',
        presenze: '1',
        ferie: '11',
        malattia: '2',
        permessi: '2',
        straordinari: '2',
        totale: '18',
        cliente: 'Plenitude',
        note: 'Giornataccia?'
    },
    {
        date: '25/05/22',
        presenze: '4',
        ferie: '3',
        malattia: '0',
        permessi: '1',
        straordinari: '2',
        totale: '10',
        cliente: 'Accenture',
        note: 'Giornataccia?'
    },
    {
        date: '022/05/22',
        presenze: '4',
        ferie: '3',
        malattia: '0',
        permessi: '1',
        straordinari: '2',
        totale: '10',
        cliente: 'Accenture',
        note: 'Giornataccia?'
    },
    {
        date: '021/05/22',
        presenze: '4',
        ferie: '3',
        malattia: '0',
        permessi: '1',
        straordinari: '2',
        totale: '10',
        cliente: 'Plenitude',
        note: 'Giornataccia?'
    }
]
  
  export function getMockPresenzeDate() {
    return mockPresenzeDate
  }
  
  const mockCommesseData = [
    {
      id_commessa: '',
    }
  ]
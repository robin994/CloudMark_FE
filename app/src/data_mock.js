let lista_dipendenti = {
    "1": {
        "id_employee": 1,
        "nome": "bruno",
        "cognome": "rossi",
        "cf": "123",
        "iban": "696",
        "tipo_contratto": "indeterminato",
        "email": "brunorossi@gmail.com",
        "telefono": "1234"
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
    }
}

export function getListaDipendenti() {
    return lista_dipendenti
}

let persona_registrata = 
{   
    "nome": "",
    "cognome": "",
    "codice fiscale": "",
    "iban": "",
    "password": "",
    "indirizzo": "",
    "telefono": "",
    "email": ""

}

let azienda_data = [
    {
   
      "azienda":"Visioture"
    },
    {
     
      "azienda":"Google"
    },
    {
      
      "azienda":"Amazon"
    },

    {
      
      "azienda":"Norren"
    },

    {
      
      "azienda":"Facebook"
    },

    {
      
      "azienda":"Veritas"
    }
]

export function getListaPersonaRegistrata() {
    return persona_registrata
}

export function getAziendaData() {
    return azienda_data
}
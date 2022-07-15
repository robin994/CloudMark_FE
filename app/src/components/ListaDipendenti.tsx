import { getListaDipendenti } from "../data_mock"

export default function ListaDipendenti() {
    let lista_dipendenti = getListaDipendenti()
    return (
        <>
            {JSON.stringify(lista_dipendenti)}
        </>
    )
}
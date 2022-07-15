import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getListaDipendenti } from "../data_mock";
import CustomCard from "./CustomCard";
import Spacer from "./Spacer"
import "./Dipendente.css"

export default function Dipendente() {
    const navigate = useNavigate()
    if (sessionStorage.auth === "false") {
        navigate("/login")
    }
    let params = useParams()
    let lista_dipendenti = getListaDipendenti()
    // Axios("api/dipendentebyid", {GET})
    let dipendente = lista_dipendenti[params.id_dipendente]
    return (
        <div className="mycentereddiv">
            {/* dipendente infos here */}
        </div>
    )
}
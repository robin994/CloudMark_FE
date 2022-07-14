import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CercaDipendente = () => {
  let navigate = useNavigate()
  useEffect( () => {
    if (sessionStorage.auth === undefined)
      navigate("/login", {replace: true})
  })
  return (
    <>
        <div>
            <p>
            <input type="text" className="form-control cerca"placeholder="Search.."/>
            </p>
           

            <p>
            <input type="text" className="form-control nome"placeholder="Nome"/>
            </p>
            <p>
            <input type="text" className="form-control cognome"placeholder="Cognome"/>
            </p>
           <button className = "btn btn-primary" type="submit">Conferma</button>

        </div>
    </>
  )
}

export default CercaDipendente
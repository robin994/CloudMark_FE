import { Link } from "react-router-dom"

let ErrorPage = () =>{
    return(
      <>
      <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>
              Oops!</h1>
            <h2>
              Nessun Dipendente è su questa commessa</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">
              <Link to="/commesse" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                Torna a Commesse </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    )
    }
    export default ErrorPage
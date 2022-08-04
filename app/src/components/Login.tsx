import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import Background from './Background';

interface SessionInterface {
  id_account: string;
  abilitate: string;
  accountType: string;
  accountTypeName: string;
  accountListFunction: string;
  user: string;
}

export default function Login() {
    const navigate = useNavigate()
    const [firstTry, setFirstTry] = useState(true)
    const [netErr, setNetErr] = useState(false)
    if (sessionStorage.bearer)
        Axios(`${process.env.REACT_APP_FASTAPI_URL}/account/verify_account`, {
            method: "POST",
            params: {token: sessionStorage.bearer}
        }).then(resp => {
            if (resp.data.data === "True")
                navigate("/", {replace: true})
        }).catch(err => {
            throw err
        })
    const onSubmit = () => {
        let user = document.getElementById("userLogin") as HTMLInputElement
        let psw = document.getElementById("pswLogin") as HTMLInputElement
        Axios(`${process.env.REACT_APP_FASTAPI_URL}/account/login`, {
            method: 'POST',
            headers: { "accept": "application/json", 'Content-Type': 'application/json' },
            data: {
              user: user.value,
              password: psw.value
            }
        }).then( resp => {
            console.log(resp.data)
            if (resp.data.data === null && resp.data.status === "BAD_REQUEST") {
                setFirstTry(false)
                return
            } else if (resp.data.data && !resp.data.error) {
                const userObj = jwtDecode(resp.data.data) as SessionInterface
                for (const [key, val] of Object.entries(userObj)) {
                    sessionStorage.setItem(key, val)
                }
                sessionStorage.bearer = resp.data.data
                switch (sessionStorage.accountTypeName) {
                    case "administrator":
                        navigate("/admin", {replace: true})
                        break
                    case "dipendente":
                        navigate("/employee", {replace: true})
                        break
                    case "superuser":
                        navigate("/superuser", {replace: true})
                        break
                }
            }
        }).catch(err => {
            if (err.code === "ERR_NETWORK") {
                setNetErr(true)
            }
        })
    }
    return (
    <>
      <Background />
      <Container style={{position: 'absolute', top: "50%", right: "50%", transform: "translate(50%, -50%)"}}>
        <Card style={{ width: "24rem" }} className="mx-auto">
          <Card.Header className="text-center">
            <h1>Log In</h1>
          </Card.Header>
          <Card.Body>
            <div className="log-div">
              {/* <form action=""> */}
              <p>
                <input
                  type="username"
                  placeholder="username"
                  required
                  className="form-control"
                  id="userLogin"
                />
              </p>
              <p>
                <input
                  type="password"
                  placeholder="password"
                  required
                  className="form-control"
                  id="pswLogin"
                />
              </p>
              <p>
                <button
                  id="sub_btn"
                  type="submit"
                  className="btn btn-outline-primary logbtn"
                  onClick={() => onSubmit()}
                >
                  Log In
                </button>
              </p>
              {/* </form> */}
            </div>
          </Card.Body>
        </Card>
        {firstTry || <h4 className="text-danger">Credentials mismatch</h4>}
        {netErr && (
          <h4 className="text-danger">
            Unable to reach the server
            <br />
            you may have internet issues or the network might be down...
          </h4>
        )}
      </Container>
    </>
  );
}

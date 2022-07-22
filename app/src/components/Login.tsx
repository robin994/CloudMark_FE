import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Spacer from "./Spacer"
import Axios from "axios"

export default function Login() {
    const navigate = useNavigate()
    const [firstTry, setFirstTry] = useState(true)
    if (sessionStorage.bearer)
        Axios("http://localhost:8000/account/verify_account", {
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
        Axios("http://localhost:8000/account/login", {
            method: 'POST',
            headers: { "accept": "application/json", 'Content-Type': 'application/json' },
            data: {
              user: user.value,
              password: psw.value
            }
        }).then( resp => {
            console.log(resp.data)
            if (resp.data.data === null && resp.data.error === "BAD REQUEST") {
                setFirstTry(false)
                return
            } else if (resp.data.data && !resp.data.error) {
                sessionStorage.bearer = resp.data.data
                sessionStorage.account_username = user.value
                sessionStorage.id_employee = "124e4567-e85b-1fd3-a456-333322233412"
                navigate("/", {replace: true})
            }
            // {
            //     "data": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9hY2NvdW50IjoiZTU1OTE3ZTEtMGU5Zi00MGIyLTkyYWUtYzg4MDMyOGFhMTEwIiwidXNlciI6ImJydW5vIiwiYWJpbGl0YXRlIjpudWxsLCJhY2NvdW50VHlwZSI6bnVsbH0.FlUAPay6Lf7hij-3eB1lhLLPpVi3wMpTEkxEoPH71WA",
            //     "length": 220,
            //     "description": null,
            //     "error": null
            //   }
            
        }).catch(err => {
            throw err
        })
    }
    return (
    <>
    <Spacer margin="20vh" />
    <Container>
        <Card style={{ width: '24rem' }} className="mx-auto">
            <Card.Header className="text-center">
                <h1>Log In</h1>
            </Card.Header>
            <Card.Body>
            <div className="log-div">
                    {/* <form action=""> */}
                        <p>
                            <input type="username" placeholder="username" required className="form-control" id="userLogin" />
                        </p>
                        <p>
                            <input type="password" placeholder="password" required className="form-control" id="pswLogin" />
                        </p>
                        <p>
                            <button id="sub_btn" type="submit" className="btn btn-outline-primary logbtn" onClick={() => onSubmit()} >Log In</button>
                        </p>
                {/* </form> */}
            </div>
            </Card.Body>
        </Card>
    </Container>
    </>
  )
}

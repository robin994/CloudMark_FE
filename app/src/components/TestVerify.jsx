import { useEffect, useState } from 'react'
import { Axios } from 'axios'

export default function TestVerify () {
    const [response, setResponse] = useState()
    useEffect( () => {
        Axios("http://localhost:8000/account/verify_account", {
            method: "POST",
            headers: { accept: 'application/json' },
            params: { token: sessionStorage.bearer }
            }).then( resp => {
                console.log(resp)
                setResponse(resp)
            }).catch( err => {
                setResponse(err)
            })
    }, [])
    return(
        <>
            {JSON.stringify(response.data)}
        </>
    )
}
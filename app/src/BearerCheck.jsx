import Axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function BearerCheck() {
    let navigate = useNavigate()
    useEffect(() => {
        if (!sessionStorage.bearer)
            navigate("/login", {replace: true})
        else
            Axios("http://localhost:8000/account/verify_account", {
                method: "POST",
                headers: { accept: 'application/json' },
                params: {token: sessionStorage.bearer}
            }).then( resp => {
                if (resp.data.data === "False")
                    navigate("/login", {replace: true})
            })
        }, [navigate])
    return <Outlet />
}

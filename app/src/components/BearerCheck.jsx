import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";

export default function BearerCheck() {
    let navigate = useNavigate()
    useEffect(() => {
        if (!sessionStorage.bearer)
            navigate("/login", {replace: true})
        else
            Axios(`${process.env.REACT_APP_FASTAPI_URL}/account/verify_account`, {
                method: "POST",
                headers: { accept: 'application/json' },
                params: { token: sessionStorage.bearer }
            }).then( resp => {
                if (resp.data.data === "False")
                    navigate("/login", {replace: true})
            })
        }, [navigate])
    return <Outlet />
}

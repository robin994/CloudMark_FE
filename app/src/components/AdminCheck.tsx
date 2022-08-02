import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminCheck() {
    let navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.accountTypeName !== "administrator")
            navigate("/", {replace: true})
    }, [])
    return <Outlet />
}

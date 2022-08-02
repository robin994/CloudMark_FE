import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function EmployeeCheck() {
    let navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.accountTypeName !== "dipendente")
            navigate("/", {replace: true})
    }, [])
    return <Outlet />
}

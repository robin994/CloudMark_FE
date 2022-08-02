import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function SuperUserCheck() {
    let navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.accountTypeName !== "superuser")
            navigate("/", {replace: true})
    }, [])
    return <Outlet />
}

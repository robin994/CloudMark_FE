import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AccountCheck() {
    let navigate = useNavigate()
    useEffect(() => {
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
    }, [])
    return <Outlet />
}

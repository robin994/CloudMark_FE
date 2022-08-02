import "./PaginaProfilo.css";
import ContProfile from "./components_profile/Cont";

export default function ProfiloUtente() {
  return (
    <>
      <div className="container mt-5 p-3 flexBello shadow">
        <div className="containerLeft"></div>
        <div className="rowBello">{<ContProfile />}</div>
      </div>
    </>
  );
}

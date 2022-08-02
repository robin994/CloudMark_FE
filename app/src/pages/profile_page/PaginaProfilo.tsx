import "./PaginaProfilo.css";
import ContProfile from "./components_profile/Cont"



// interface EmployeesAccount {
//     first_name: string,
//     last_name: string,
//     cf: string,
//     iban: number,
//     id_contractType: string,
//     email: string,
//     phoneNumber: number,
//     id_employee: string

// }

export default function ProfiloUtente() {


  return (
    <>
      <div className="container mt-5 p-3 flexBello shadow">
        <div className="containerLeft">
          <div className="d-flex align-items-center">
            <div className="top_img my-3 mx-5">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fa6ce764a-3881-4145-9baf-debd8cccdb7d%2Fd15za23-9762ad9e-36fd-47d8-adaf-266cc72401cc.jpg%2Fv1%2Ffill%2Fw_600%2Ch_748%2Cq_75%2Cstrp%2Fmarcus_fenix___gears_of_war_by_hueyyeng_d15za23-fullview.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzQ4IiwicGF0aCI6IlwvZlwvYTZjZTc2NGEtMzg4MS00MTQ1LTliYWYtZGViZDhjY2NkYjdkXC9kMTV6YTIzLTk3NjJhZDllLTM2ZmQtNDdkOC1hZGFmLTI2NmNjNzI0MDFjYy5qcGciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.6-hRqeWTz83qlXckEXsnYuGbG-eTSrdsME-cnSJjh54&f=1&nofb=1" />
            </div>
            <h2 className="fs-1 mx-5">Benvenuto nella pagina profilo</h2>
          </div>
        </div>
        <div className="rowBello">
          {<ContProfile />}
        </div>
      </div>
    </>
  );
}

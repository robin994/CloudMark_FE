import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect, ChangeEvent } from "react";
import "./Cont.css";
import { motion } from 'framer-motion'
import ProfiloUtente from '../PaginaProfilo';
import EmployeeCheck from '../../../components/EmployeeCheck';

interface ProfileInterface {
  employee: {
    first_name: string | undefined;
    last_name: string;
    cf: string;
    iban: string;
    id_contractType: string;
    email: string;
    phoneNumber: string;
    id_employee: string;
  };
  account: {
    id_account: string;
    user: string;
    password: string;
    abilitato: number;
    id_tipo_account: string;
  };
  id_business: string;
  start_date: Date;
  end_date: Date;
  serial_num: number;
}

interface SessionInterface {
  id_account: string;
  abilitate: string;
  accountType: string;
  accountTypeName: string;
  accountListFunction: string;
  user: string;
}

interface tipoContratto {
  id_contract_type: string;
  name: string;
  info: string;
}
interface BusinessInterface {
  name: string;
  p_iva: string;
  address: string;
  cap: string;
  iban: string;
  phone: string;
  email: string;
  pec: string;
  fax: string;
  id_business: string;
}

export default function ContProfile() {
  const [profile, setProfile] = React.useState<ProfileInterface>();
  const [tipoContratto, setTipoContratto] = React.useState<tipoContratto>();
  const [data, setData] = useState<SessionInterface>();
  const [business, setBusiness] = useState<BusinessInterface>();

  useEffect(() => {
    loadProfileData();
  }, []);

  function loadProfileData() {
    let account: SessionInterface = jwt_decode(sessionStorage.bearer);
    axios
      .get(
        `${process.env.REACT_APP_FASTAPI_URL}/employee/account/${account.id_account}`
      )
      .then((res) => {
        let profile: ProfileInterface = res.data.data;
        loadTypeContract(profile.employee.id_contractType);
        loadBusiness(profile.id_business);
        setProfile(res.data.data);
      });
  }

  async function loadTypeContract(id_contractType: string) {
    axios
      .post(
        `${process.env.REACT_APP_FASTAPI_URL}/type/contract/${id_contractType}`
      )
      .then((res) => {
        setTipoContratto(res.data.data);
      });
  }

  function loadBusiness(id_business: string) {
    axios
      .get(`${process.env.REACT_APP_FASTAPI_URL}/business/${id_business}`)
      .then((res) => {
        setBusiness(res.data.data);
      });
  }

  async function updateEmployee() {
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/employee/update/`, 
      {
        "first_name": profile?.employee.first_name,
        "last_name": profile?.employee.last_name,
        "cf": profile?.employee.cf,
        "iban": profile?.employee.iban,
        "id_contractType": profile?.employee.id_contractType,
        "email": profile?.employee.email,
        "phoneNumber": profile?.employee.phoneNumber,
        "id_employee": profile?.employee.id_employee
      });
  }

  const handleInputChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    profile!.employee.first_name = event.target.value;
  };

  const handleInputChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    profile!.employee.last_name = event.target.value;
  };

  const handleInputChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    profile!.employee.phoneNumber = event.target.value;
  };

  const handleInputChangeFiscalCode = (event: ChangeEvent<HTMLInputElement>) => {
    profile!.employee.cf = event.target.value;
  };

  const handleInputChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    profile!.employee.email = event.target.value;
  };

  const handleInputChangeIban = (event: ChangeEvent<HTMLInputElement>) => {
    profile!.employee.iban = event.target.value;
  };

  const handleRevealProfilePage = () => {
    if (profile && tipoContratto && business) {
      return (
        <motion.div className="container rounded bg-white mt-5 mb-5" initial={{y: -100}} animate={{y: 0}}>
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span className="font-weight-bold">
                  {profile?.employee.first_name} {profile?.employee.last_name}
                </span>
                <span className="text-black-50">{profile?.employee.email}</span>
                <span className="text-black-50">{tipoContratto?.name}</span>
                <span className="text-black-50">{business?.name}</span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Impostazioni profilo</h4>
                </div>
                <div className="row mt-2">
                  <motion.div className="col-md-6" initial={{x: -100}} animate={{x: 0}}>
                    <label className="labels fst-italic fs-6 mb-1 fw-normal" htmlFor="firstname">Nome</label>
                    <input
                      style={{border: "None"}}
                      id="firstname"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.first_name}
                      onChange={handleInputChangeFirstName}
                    />
                  </motion.div>
                  <motion.div className="col-md-6" initial={{x: 100}} animate={{x: 0}}>
                    <label className="labels fst-italic fs-6 mb-1 fw-normal" htmlFor="lastname">Cognome</label>
                    <input
                      style={{border: "None"}}  
                      id="lastname"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.last_name}
                      onChange={handleInputChangeLastName}
                    />
                  </motion.div>
                </div>
                <div className="row mt-3">
                  <motion.div className="col-md-12" initial={{x: -100}} animate={{x: 0}}>
                    <label className="labels fst-italic fs-6 mb-1 fw-normal" htmlFor="phonenumber">Telefono</label>
                    <input
                      style={{border: "None"}}
                      id="phonenumber"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.phoneNumber}
                      onChange={handleInputChangePhoneNumber}
                    />
                  </motion.div>
                  <motion.div className="col-md-12" initial={{x: -100}} animate={{x: 0}}>
                    <label className="labels fst-italic fs-6 mb-1 fw-normal mt-3" htmlFor="fiscalcode">Codice Fisacle</label>
                    <input
                      style={{border: "None"}}
                      id="fiscalcode"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.cf}
                      onChange={handleInputChangeFiscalCode}
                    />
                  </motion.div>
                  <motion.div className="col-md-12" initial={{x: -100}} animate={{x: 0}}>
                    <label className="labels fst-italic fs-6 mb-1 fw-normal mt-3" htmlFor="email">Email ID</label>
                    <input
                      style={{border: "None"}}
                      id="email"
                      type="email"
                      className="form-control shadow"
                      placeholder={profile?.employee.email}
                      onChange={handleInputChangeEmail}
                    />
                  </motion.div>
                  <motion.div className="col-md-12" initial={{x: -100}} animate={{x: 0}}>
                    <label className="labels fst-italic fs-6 mb-1 fw-normal mt-3" htmlFor="iban">Iban</label>
                    <input
                      style={{border: "None"}}
                      id="iban"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.iban}
                      onChange={handleInputChangeIban}
                    />
                  </motion.div>
                </div>
                <div className="mt-5 text-center">
                  <button onClick={() => updateEmployee()} className="btn btn-primary profile-button" type="button">
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience">
                  <span>Account</span>
                </div>
                <br />
                <div className="col-md-12">
                  <label className="labels fst-italic fs-6 mb-1 fw-normal">User</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="experience"
                    value={profile?.account.user}
                  />
                </div>{" "}
                <br />
                <div className="col-md-12">
                  <label className="labels fst-italic fs-6 mb-1 fw-normal">Nuova Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nuova Password"
                    value=""
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels fst-italic fs-6 mb-1 fw-normal">Conferma Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Conferma Password"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )
    } else {
      return (
        <motion.div className="container rounded bg-white mt-5 mb-5 text-center" initial={{y: -100}} animate={{y: 0}}>
          <span style={{fontSize: "25px", letterSpacing: "3px"}}>LOADING</span>
          <div className="loadbar shadow"></div>
        </motion.div>
      )
    }
  }

  return (
    <>
      {
        handleRevealProfilePage()
      }
    </>
  );
}

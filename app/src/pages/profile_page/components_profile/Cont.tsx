import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect, ChangeEvent } from "react";
import "./Cont.css";
import { motion } from "framer-motion";
import * as Admin from '../../admin'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";


interface ProfileInterface {
  employee: {
    first_name: string;
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

interface PayloadInterface {
  first_name: string;
  last_name: string;
  cf: string;
  iban: string;
  id_contractType: string;
  email: string;
  phoneNumber: string;
  id_employee: string;
}

export default function ContProfile() {
  const [profile, setProfile] = React.useState<ProfileInterface>();
  const [tipoContratto, setTipoContratto] = React.useState<tipoContratto>();
  const [payload, setPayload] = useState<PayloadInterface>();
  const [business, setBusiness] = useState<BusinessInterface>();
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const naviga = useNavigate()

  function ChiamaPath(){
    naviga("/presenze")
  }

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
        setPayload({
          first_name: profile.employee.first_name,
          last_name: profile.employee.last_name,
          cf: profile.employee.cf,
          iban: profile.employee.iban,
          id_contractType: profile.employee.id_contractType,
          email: profile.employee.email,
          phoneNumber: profile.employee.phoneNumber,
          id_employee: profile.employee.id_employee,
        });
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
    axios.post(
      `${process.env.REACT_APP_FASTAPI_URL}/employee/update/`,
      payload
    ).then(res=>{
      if(res.status === 200){
      setSuccess(true)
      setTimeout(()=>{
        setSuccess(false)
      },3500)}
      if(res.status === 404){
        setError(true)
        setTimeout(()=>{
          setError(false)
      },3500)}
    });
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    let toUpdate = JSON.parse(JSON.stringify(payload));
    switch (event.target.id) {
      case "first_name":
        toUpdate!.first_name = event.target.value;
        break;
      case "last_name":
        toUpdate!.last_name = event.target.value;
        break;
      case "cf":
        toUpdate!.cf = event.target.value;
        break;
      case "iban":
        toUpdate!.iban = event.target.value;
        break;
      case "email":
        toUpdate!.email = event.target.value;
        break;
      case "phonenumber":
        toUpdate!.phoneNumber = event.target.value;
        break;
    }
    setPayload(toUpdate);
  };

//task optional: quando si avrà risposta da backend aggiungere validazione password prima di poter mandare dati

  const handleRevealProfilePage = () => {
    if (profile && tipoContratto && business) {
      return (
        <>
        <motion.div
          className="container rounded bg-white mt-5 mb-5"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
        >
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
                  <a href="#" onClick={ChiamaPath} className="link-primary">Vedi Presenze</a>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Impostazioni profilo</h4>
                </div>
                <div className="row mt-2">
                  <motion.div
                    className="col-md-6"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                  >
                    <label
                      className="labels fst-italic fs-6 mb-1 fw-normal"
                      htmlFor="firstname"
                    >
                      Nome
                    </label>
                    <input
                      disabled
                      style={{ border: "None" }}
                      id="firstname"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.first_name}
                      onChange={handleInput}
                    />
                  </motion.div>
                  <motion.div
                    className="col-md-6"
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                  >
                    <label
                      className="labels fst-italic fs-6 mb-1 fw-normal"
                      htmlFor="lastname"
                    >
                      Cognome
                    </label>
                    <input
                      disabled
                      style={{ border: "None" }}
                      id="lastname"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.last_name}
                      onChange={handleInput}
                    />
                  </motion.div>
                </div>
                <div className="row mt-3">
                  <motion.div
                    className="col-md-12"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                  >
                    <label
                      className="labels fst-italic fs-6 mb-1 fw-normal"
                      htmlFor="phonenumber"
                    >
                      Telefono
                    </label>
                    <input
                      style={{ border: "None" }}
                      id="phonenumber"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.phoneNumber}
                      onChange={handleInput}
                    />
                  </motion.div>
                  <motion.div
                    className="col-md-12"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                  >
                    <label
                      className="labels fst-italic fs-6 mb-1 fw-normal mt-3"
                      htmlFor="fiscalcode"
                    >
                      Codice Fisacle
                    </label>
                    <input
                      style={{ border: "None" }}
                      id="fiscalcode"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.cf}
                      onChange={handleInput}
                    />
                  </motion.div>
                  <motion.div
                    className="col-md-12"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                  >
                    <label
                      className="labels fst-italic fs-6 mb-1 fw-normal mt-3"
                      htmlFor="email"
                    >
                      Email ID
                    </label>
                    <input
                      style={{ border: "None" }}
                      id="email"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.email}
                      onChange={handleInput}
                    />
                  </motion.div>
                  <motion.div
                    className="col-md-12"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                  >
                    <label
                      className="labels fst-italic fs-6 mb-1 fw-normal mt-3"
                      htmlFor="iban"
                    >
                      Iban
                    </label>
                    <input
                      style={{ border: "None" }}
                      id="iban"
                      type="text"
                      className="form-control shadow"
                      placeholder={profile?.employee.iban}
                      onChange={handleInput}
                    />
                  </motion.div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={() => updateEmployee()}
                    className="btn btn-primary profile-button"
                    type="button"
                  >
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
                  <label className="labels fst-italic fs-6 mb-1 fw-normal">
                    User
                  </label>
                  <input
                    disabled
                    style={{ border: "None" }}
                    type="text"
                    className="form-control shadow"
                    placeholder={profile?.account.user}
                  />
                </div>
                <br />
                <div className="col-md-12">
                  <label className="labels fst-italic fs-6 mb-1 fw-normal">
                    Nuova Password
                  </label>
                  <input
                    style={{ border: "None" }}
                    type="password"
                    className="form-control shadow"
                    placeholder="Nuova Password"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels fst-italic fs-6 mb-1 fw-normal mt-3">
                    Conferma Password
                  </label>
                  <input
                    style={{ border: "None" }}
                    type="password"
                    className="form-control shadow"
                    placeholder="Conferma Password"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {success && <div className="alert alert-success position-fixed fixed-bottom start-50 w-30 translate-middle text-center">
          Dati correttamente inviati
        </div>}
        {error && <div className="alert alert-danger position-fixed fixed-bottom start-50 w-30 translate-middle text-center">
          Errore server, riprovare tra qualche minuto
        </div>}
        </>
      )
    } else {
      return (
        <motion.div
          className="container rounded bg-white mt-5 mb-5 text-center"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
        >
          <span style={{ fontSize: "25px", letterSpacing: "3px" }}>
            LOADING
          </span>
          <div className="loadbar shadow"></div>
        </motion.div>
      );
    }
  };

  return <>{handleRevealProfilePage()}</>;
}

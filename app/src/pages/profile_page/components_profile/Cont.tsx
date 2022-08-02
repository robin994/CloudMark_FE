import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import "./Cont.css";

interface ProfileInterface {
  employee: {
    first_name: string;
    last_name: string;
    cf: string;
    iban: string;
    id_contractType: string;
    email: string;
    phoneNumber: string;
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

  function sendData() {}

  return (
    <div className="container rounded bg-white mt-5 mb-5">
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
              <div className="col-md-6">
                <label className="labels">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                  value={profile?.employee.first_name}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Cognome</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile?.employee.last_name}
                  placeholder="surname"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter phone number"
                  value={profile?.employee.phoneNumber}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Codice Fisacle</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter phone number"
                  value={profile?.employee.cf}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter email id"
                  value={profile?.employee.email}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Iban</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter email id"
                  value={profile?.employee.iban}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button">
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
              <label className="labels">User</label>
              <input
                type="text"
                className="form-control"
                placeholder="experience"
                value={profile?.account.user}
              />
            </div>{" "}
            <br />
            <div className="col-md-12">
              <label className="labels">Nuova Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nuova Password"
                value=""
              />
            </div>
            <div className="col-md-12">
              <label className="labels">Conferma Password</label>
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
    </div>
  );
}

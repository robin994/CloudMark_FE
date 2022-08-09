import CustomCard from '../../components/CustomCard';
import Background from '../../components/Background';
import Row from 'react-bootstrap/Row';
import { motion } from "framer-motion";
import "../super_user/dashboard-css/style.css"


const textDesc: string[] = [];

textDesc[0] = "Lista delle ziende";
textDesc[1] = "Lista di tutti gli account";
textDesc[2] = "Lista dei tipi di account";
textDesc[3] = "Lista dei tipi di contratto";
textDesc[4] = "Lista dei tipi di presenza";

export default function Dashboard() {
  return (
    <>
      <Background />
      {/* <h1 style={{position: "absolute", top: "20%", right: "50%", transform: "translateX(50%)"}}>Benvenuto Superuser</h1> */}
      <div className="container" style={{position: "absolute", top: "50%", right: "50%", transform: "translate(50%, -50%)"}}>
        <Row className='justify-content-center align-items-center Cont'>
          <motion.div className='col-xxl-3 col-lg-4 d-flex justify-content-center' initial={{ x: -100 }} animate={{ x: 0 }}>
            <CustomCard
              cardTitle='Azienda'
              imgSrc='https://www.svgrepo.com/show/93436/business-bag.svg'
              navPath='/azienda'
              buttonText='Ricerca'
              textDesc={textDesc[0]}
            />
          </motion.div>
          <motion.div className='col-xxl-3 col-lg-4 d-flex justify-content-center' initial={{ y: -100 }} animate={{ y: 0 }}>
          <CustomCard
              cardTitle='Accounts'
              imgSrc='https://www.svgrepo.com/show/361411/account.svg'
              navPath='/accounts'
              buttonText='Mostra'
              textDesc={textDesc[1]}
            />
          </motion.div>
          <motion.div className='col-xxl-3 col-lg-4 d-flex justify-content-center' initial={{ x: 100 }} animate={{ x: 0 }}>
          <CustomCard
              cardTitle='Tipo Account'
              imgSrc='https://www.svgrepo.com/show/10278/account-passkey.svg'
              navPath='/tipo/account'
              buttonText='Ricerca'
              textDesc={textDesc[2]}
            />
          </motion.div>
          <motion.div className='col-xxl-3 col-lg-4 d-flex justify-content-center' initial={{ y: 100 }} animate={{ y: 0 }}>
            <CustomCard
              cardTitle='Tipo Contratto'
              imgSrc='https://www.svgrepo.com/show/36743/contract.svg'
              navPath='/tipo/contratto'
              buttonText='Ricerca'
              textDesc={textDesc[3]}
            />
          </motion.div>
          <motion.div className='col-xxl-3 col-lg-4 d-flex justify-content-center' initial={{ y: 100 }} animate={{ y: 0 }}>
          <CustomCard
              cardTitle='Tipo Presenza'
              imgSrc='https://www.svgrepo.com/show/53043/signs.svg'
              navPath='/tipo/presenza'
              buttonText='Mostra'
              textDesc={textDesc[4]}
            />
          </motion.div>
        </Row>
      </div>
    </>
  )
}

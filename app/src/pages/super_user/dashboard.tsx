import CustomCard from '../../components/CustomCard';
import Background from '../../components/Background';
import Row from 'react-bootstrap/Row';
import { motion } from "framer-motion";

const textDesc: string[] = [];

textDesc[0] = "Lista delle ziende";
textDesc[1] = "Lista di tutti gli account";
textDesc[2] = "Lista dei tipi di account";

export default function Dashboard() {
  return (
    <>
      <Background />
      <h1 style={{position: "absolute", top: "20%", right: "50%", transform: "translateX(50%)"}}>Benvenuto Superuser</h1>
      <div className="container" style={{position: "absolute", top: "50%", right: "50%", transform: "translate(50%, -50%)"}}>
        <Row className='my-5 justify-content-center align-items-center'>
          <motion.div className='col-3 d-flex justify-content-center' initial={{ x: -100 }} animate={{ x: 0 }}>
            <CustomCard
              cardTitle='Azienda'
              imgSrc='https://www.svgrepo.com/show/93436/business-bag.svg'
              navPath='/azienda'
              buttonText='Ricerca'
              textDesc={textDesc[0]}
            />
          </motion.div>
          <motion.div className='col-3 d-flex justify-content-center' initial={{ y: -100 }} animate={{ y: 0 }}>
          <CustomCard
              cardTitle='Accounts'
              imgSrc='https://www.svgrepo.com/show/361411/account.svg'
              navPath='/accounts'
              buttonText='Mostra'
              textDesc={textDesc[1]}
            />
            
          </motion.div>
          <motion.div className='col-3 d-flex justify-content-center' initial={{ x: 100 }} animate={{ x: 0 }}>
          <CustomCard
              cardTitle='Tipo Account'
              imgSrc='https://www.svgrepo.com/show/10278/account-passkey.svg'
              navPath='/tipo/account'
              buttonText='Ricerca'
              textDesc={textDesc[2]}
            />
          </motion.div>
        </Row>
      </div>
    </>
  )
}

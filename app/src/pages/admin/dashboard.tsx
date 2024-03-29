import Row from "react-bootstrap/Row";
import CustomCard from "../../components/CustomCard";
import { motion } from "framer-motion";
import "./dashboard-css/style.css";
import Background from "../../components/Background";

const textDesc: string[] = [];

textDesc[0] = "Operazioni sui Dipendenti";
textDesc[1] = "Lista di tutti i dipendenti";
textDesc[2] = "Ricerca di un singolo cliente";
textDesc[3] = "Lista di tutti i clienti";
textDesc[4] = "Visualizza l'andamento dei prezzi delle commesse";

export default function Dashboard() {
  return (
    <>
      <Background />
      <div
        className="container"
        style={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
        }}
      >
        <Row className="mt-10 justify-content-center align-items-center Cont">
          <motion.div
            className="col-xxl-3 col-lg-4 d-flex justify-content-center"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
          >
            <CustomCard
              cardTitle="Dipendenti"
              imgSrc="https://www.svgrepo.com/show/12496/users.svg"
              navPath="/dipendenti"
              buttonText="Ricerca"
              textDesc={textDesc[0]}
            />
          </motion.div>
          <motion.div
            className="col-xxl-3 col-lg-4 d-flex justify-content-center"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
          >
            <CustomCard
              cardTitle="Presenze"
              imgSrc="https://www.svgrepo.com/show/73127/list.svg"
              navPath="/presenze"
              buttonText="Mostra"
              textDesc={textDesc[1]}
            />
          </motion.div>
          <motion.div
            className="col-xxl-3 col-lg-4 d-flex justify-content-center"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
          >
            <CustomCard
              cardTitle="Clienti"
              imgSrc="https://www.svgrepo.com/show/74282/search.svg"
              navPath="/clienti"
              buttonText="Ricerca"
              textDesc={textDesc[2]}
            />
          </motion.div>

          <motion.div
            className="col-xxl-3 col-lg-4 d-flex justify-content-center"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
          >
            <CustomCard
              cardTitle="Commesse"
              imgSrc="https://www.svgrepo.com/show/40077/briefcase.svg"
              navPath="/commesse"
              buttonText="Mostra"
              textDesc={textDesc[3]}
            />
          </motion.div>

          <motion.div
            className="col-xxl-3 col-lg-4 d-flex justify-content-center"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
          >
            <CustomCard
              cardTitle="Grafico Commesse"
              imgSrc="https://www.svgrepo.com/show/35765/graph.svg"
              navPath="/grafico/commesse"
              buttonText="Mostra"
              textDesc={textDesc[4]}
            />
          </motion.div>
        </Row>
      </div>
    </>
  );
}

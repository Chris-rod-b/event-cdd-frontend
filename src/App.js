import GlobalStyles from "./styles/global";
import styled from "styled-components";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forms from "./components/Forms";
import Grid from "./components/Grid";

import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

function App() {
  const [showForms, setShowForms] = useState(false);
  const [events, setEvents] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3030/api/events/");
      setEvents(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, [setEvents]);

  return (
    <>
      <Container>
        <Title>
          <img 
            src="https://colodedeus.com.br/wp-content/uploads/2022/08/800px-ASSINATURA-LOGO-OFICIAL-1_LOGOTIPO.png" 
            alt="Logo CDD"
            width="70"  
          />          
          Colo de Deus - Eventos
        </Title>
        <Button type="submit" onClick={() => {setShowForms(!showForms)}}>
          Novo evento
        </Button>
        {showForms && (
          <Forms />
        )}
        <Grid events={events} setEvents={setEvents} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyles />
    </>
  );
}

export default App;

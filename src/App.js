import GlobalStyles from "./styles/global";
import styled from "styled-components";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forms from "./components/Forms";
import Grid from "./components/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function App() {

  //Usar Context para todos os tipos de chamadas e variaveis aqui

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
  
  /**
   * Trocar para:
   * 
   * useEffect(() => {
   *  getEvents();
   * }, []);
   */

  useEffect(() => {
    getEvents();
  }, [setEvents]);

  return (
    <>
      <Container>
          <Header events={events}/>
          <Forms 
            onEdit={onEdit} 
            setOnEdit={setOnEdit} 
            getEvents={getEvents} 
          />
          <Grid events={events} setEvents={setEvents} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyles />
    </>
  );
}

export default App;

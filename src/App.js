import GlobalStyles from "./styles/global";
import styled from "styled-components";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forms from "./components/Forms";
import Grid from "./components/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { useEventContext } from "./context/EventContext";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Grouper = styled.div`
  width: 100%;
  margin-top: -60px;
`

const Footer = styled.footer`
  height: 100px;
  display: flex;
  align-items: center;
  justify-items: center;
`

function App() {

  const [events, setEvents] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const { booleanState } = useEventContext();

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
        <Header events={events} setOnEdit={setOnEdit}/>
        <Grouper>
          {
            booleanState && 
              <Forms 
                onEdit={onEdit} 
                setOnEdit={setOnEdit} 
                getEvents={getEvents} 
              />
          }
          <Grid events={events} setEvents={setEvents} setOnEdit={setOnEdit} />
        </Grouper>
        <Footer>
          Copyright © 2023 – Comunidade Católica Colo de Deus | Todos os direitos reservados.
        </Footer>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyles />
    </>
  );
}

export default App;

import GlobalStyles from "./styles/global";
import styled from "styled-components";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
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

function App() {
  return (
    <>
      <Container>
        <Title>
          <img 
            src="https://colodedeus.com.br/wp-content/uploads/2022/08/800px-ASSINATURA-LOGO-OFICIAL-1_LOGOTIPO.png" 
            alt="Logo CDD"
            class="transparent shrinkToFit" 
            width="70"  
          />          
          Colo de Deus - Eventos
        </Title>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyles />
    </>
  );
}

export default App;

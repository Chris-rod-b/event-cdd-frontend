import React from "react";
import styled from "styled-components";
import { useEventContext } from "../context/EventContext";

const HeaderContent = styled.div`
    background-color: #3c4fb2;
    color: #FFFFFF;
    margin: 0;
    padding: 15px 0 0 0;
    width: 100%;
    height: 325px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    width: 1200px;
    margin: 20px auto;
`;

const Logo = styled.div`
    display: flex;
`;

const Label = styled.label`
    margin: auto;
    padding-left: 15px;
    font-weight: bold;
    font-size: 22px;
`;

const Line = styled.div`
    height: 1px;
    width: 1200px;
    background-color: white;
    margin: 20px auto;
`;

const Image = styled.img`
    width: 70px;
    filter: invert();
`

const CountersWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 530px;
`

const Counters = styled.span`
    font-size: 30px;
    font-weight: bold;
`

const Button = styled.button`
    background-color: #f6bf0c;
    border: none;
    color: white;
    padding: 15px 40px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ddac0b;
    }
`

const Header = ({ events }) => {  
    
    const { toggleBoolean } = useEventContext();

    return (
        <HeaderContent>
            <Wrapper>
                <Logo>
                    <Image 
                        src="https://colodedeus.com.br/wp-content/uploads/2022/08/800px-ASSINATURA-LOGO-OFICIAL-1_LOGOTIPO.png" 
                        alt="Logo CDD"
                    />
                    <Label>
                        Colo de Deus - Eventos
                    </Label>
                </Logo>

                <div></div>       
            </Wrapper>
            
            <Line />

            <Wrapper>
                <CountersWrapper>
                    <div>
                        <Counters>{events.length}</Counters><p>Eventos no total</p>
                    </div>
                    <div>
                        <Counters>{events.filter(e => !e.concluded).length}</Counters><p>Eventos para acontecer</p>
                    </div>
                    <div>
                        <Counters>{events.filter(e => e.concluded).length}</Counters><p>Eventos finzalidos</p>
                    </div>
                </CountersWrapper>
                <Button onClick={toggleBoolean}>Novo evento</Button>
            </Wrapper>
        </HeaderContent>
    );
  };
  
  export default Header;
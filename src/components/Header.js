import React from "react";
import styled from "styled-components";

const HeaderContent = styled.div`
    background-color: #3c4fb2;
    color: #FFFFFF;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 300px;
`

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    width: 1200px;
    margin: auto;
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

const Header = ({ events }) => {  
    return (
        <HeaderContent>
            <Title>
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
            </Title>
            
            <Line />

            <div display="block">
                <h4>Total de eventos: {events.length}</h4>
                <h4>A acontecer: {events.filter(e => !e.concluded).length}</h4>
                <h4>Finzalidos: {events.filter(e => e.concluded).length}</h4>
            </div>
        </HeaderContent>
    );
  };
  
  export default Header;
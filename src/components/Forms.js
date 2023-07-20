import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    &.date {
        width: 135px;    
    }
    &.checkbox {
        width: 50px;    
    }
    width: 200px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    return (
        <FormContainer ref={ref} >
            <InputArea>
                <Label>Nome do Evento</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Localização</Label>
                <Input name="localizacao" />
            </InputArea>
            <InputArea>
                <Label>Data de Início</Label>
                <Input 
                    className="date" 
                    name="data_inicio" 
                    type="date"     
                />
            </InputArea>
            <InputArea>
                <Label>Data de Término</Label>
                <Input 
                    className="date" 
                    name="data_inicio" 
                    type="date"     
                />
            </InputArea>
            <InputArea>
                <Label>Concluído</Label>
                <Input className="checkbox" name="concluido" type="checkbox" />
            </InputArea>
            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
};

export default Form;
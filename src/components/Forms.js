import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import calenderFormat from "../util/calenderFormat";

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

const Form = ({ getEvents, onEdit, setOnEdit }) => {
    const ref = useRef();
    
    const [dataInicio, setDataInicio] = useState();
    
    useEffect(() => {
        if (onEdit) {
            const event = ref.current;

            event.nome.value = onEdit.name;
            event.localizacao.value = onEdit.location;
            event.data_inicio.value = calenderFormat(onEdit.startedDate);
            event.data_termino.value = calenderFormat(onEdit.endedDate);
            event.concluido.checked = onEdit.concluded;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const event = ref.current;
        
        if (
            !event.nome.value ||
            !event.localizacao.value ||
            !event.data_inicio.value ||
            !event.data_termino.value 
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            console.log(event.data_inicio.value);
            console.log(event.data_termino.value);

            await axios.put("http://localhost:3030/api/events/" + onEdit._id, {
                name: event.nome.value,
                location: event.localizacao.value,
                startedDate: event.data_inicio.value,
                endedDate: event.data_termino.value,
                concluded: event.concluido.checked,
            }).then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
            await axios.post("http://localhost:3030/api/events/create", {
                name: event.nome.value,
                location: event.localizacao.value,
                startedDate: event.data_inicio.value,
                endedDate: event.data_termino.value,
                concluded: event.concluido.checked,
            }).then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        event.nome.value = "";
        event.localizacao.value = "";
        event.data_inicio.value = "";
        event.data_termino.value = "";
        event.concluido.checked = false;

        setOnEdit(null);
        getEvents();
    }

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
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
                <Input className="date" name="data_inicio" 
                    type="date" onChange={(e) => setDataInicio(e.target.value)}/>
            </InputArea>
            <InputArea>
                <Label>Data de Término</Label>
                <Input className="date" name="data_termino" 
                    type="date" min={dataInicio} />
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
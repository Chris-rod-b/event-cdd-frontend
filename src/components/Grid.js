import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import formatter from "../util/formatter";
import { useEventContext } from "../context/EventContext";

const EventContent = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px 40px;
  box-shadow: 0px 0px 5px #ccc4;
  border-radius: 5px;
  max-width: 1200px;
  margin: 5px auto 15px auto;
  display: flex;
  justify-content: space-between;
`;

const WrapperContent = styled.div`
  flex: 1;

  &.col:nth-child(1) {
    flex-basis: 50%;
  }
  &.col:nth-child(2) {
    flex-basis: 25%;
  }
  &.col:nth-child(3) {
    flex-basis: 20%;
  }
  &.col:nth-child(4) {
    flex-basis: 5%;
  }
`;

const Title = styled.div`
  font-size: 23px;
  font-weight: bold;

  &.secondTitle {
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

const SubTitle = styled.div`
  color: #555968;
`;

const Fa = styled.div`
  cursor: pointer;
  &.fa:first-child {
    margin-bottom: 12px;
  }
`;

const Grid = ({ events, setEvents, setOnEdit }) => {
  
  const { setBooleanState } = useEventContext();
  
  const handleEdit = (item) => {
    setOnEdit(item);
    setBooleanState(true);
  };

  const handleDelete = async (id) => {

    await axios
      .delete("http://localhost:3030/api/events/" + id)
      .then(() => {
         const newArray = events.filter((event) => event._id !== id);

        setEvents(newArray);
        toast.success("Evento excluído com sucesso!");
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };
  
  return (
    <>
      {events.map((item, i) => (
        <EventContent key={i}>
          <WrapperContent className="col">
            <Title>{item.name}</Title>
            <SubTitle>{item.location}</SubTitle>
          </WrapperContent>
            
          <WrapperContent className="col">
            <Title className="secondTitle">DATA</Title>
            <SubTitle>{formatter(item.startedDate)} - {formatter(item.endedDate)}</SubTitle>
          </WrapperContent>

          <WrapperContent className="col">
            <Title className="secondTitle">CONCLUÍDO</Title>
            <SubTitle>{item.concluded ? "Sim" : "Não"}</SubTitle>
          </WrapperContent>

          <WrapperContent className="col">
            <Fa className="fa">
              <FaEdit onClick={() => handleEdit(item)} />
            </Fa>
            <Fa className="fa">
              <FaTrash onClick={() => handleDelete(item._id)} />
            </Fa>
          </WrapperContent>
          { /* 
            <Td width="18%">{item.name}</Td>
            <Td width="32%" onlyWeb>{item.location}</Td>
            <Td width="15%"> {formatter(item.startedDate)}</Td>
            <Td width="15%"> {formatter(item.endedDate)}</Td>
            <Td width="10%" aligncenter="true" onlyWeb> {item.concluded ? "Sim" : "Não"} </Td>
            <Td className="fa" aligncenter="true" width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td className="fa" aligncenter="true" width="5%">
              <FaTrash onClick={() => handleDelete(item._id)} />
            </Td>
          */ }
        </EventContent>
      ))}
    </>
  );
};

export default Grid;
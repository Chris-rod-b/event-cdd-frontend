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
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc4;
  border-radius: 5px;
  max-width: 1200px;
  margin: 5px auto;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  align-items: flex-end;
  gap: 15px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc4;
  border-radius: 5px;
`;

export const Td = styled.td`
  padding-top: 15px;
  padding-left: 5px;
  text-align: ${(props) => (props.aligncenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  &.fa {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
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
          {
            item.name
          }
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
import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import formatter from "../util/formatter";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  padding-left: 5px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  &.fa {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ events, setEvents, setOnEdit }) => {
  
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {

    await axios
      .delete("http://localhost:3030/api/events/" + id)
      .then(({ data }) => {
         const newArray = events.filter((event) => event._id !== id);

        setEvents(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };
  
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome Evento</Th>
          <Th onlyWeb>Localização</Th>
          <Th>Data Início</Th>
          <Th>Data Término</Th>
          <Th onlyWeb>Concluído</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {events.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.name}</Td>
            <Td width="30%" onlyWeb>{item.location}</Td>
            <Td width="15%"> {formatter(item.startedDate)}</Td>
            <Td width="15%"> {formatter(item.endedDate)}</Td>
            <Td width="10%" alignCenter onlyWeb> {item.concluded ? "Sim" : "Não"} </Td>
            <Td className="fa" alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td className="fa" alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item._id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
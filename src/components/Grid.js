import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import formatter from "../util/formatter";
import { useEventContext } from "../context/EventContext";
import Modal from './Modal';

const EventContent = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 30px 40px;
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
    flex-basis: 48%;
  }
  &.col:nth-child(2) {
    flex-basis: 20%;
  }
  &.col:nth-child(3) {
    flex-basis: 32%; 
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
  filter: drop-shadow(0 0 4px #fff); 
   &.fa:first-child {
    margin-bottom: 12px;
  }
`;

const WrapperFa = styled.div`
  position: absolute;
  margin-top: 35px;
  width: 75px;
  margin-left: 1164px;
  padding-top: 35px;
  padding-bottom: 35px;
  opacity: 0;
  transition: all .3s;
  transform: translateY(-50%);
  text-align: center;
  
  &:hover {
    opacity: 1;
  }
`

const TextSpan = styled.span`
  position: absolute;
  transition: opacity 0.3s linear;
  opacity: 0;
  left: 67%;
  margin-top: 50px;
  font-weight: bold;
  font-size: x-large;
  filter: drop-shadow(0 0 4px #fff); 
`

const ImageBanner = styled.img`
  margin-top: -30px;
  margin-bottom: -37px;
  margin-right: -40px;
  width: 530px;
  height: 130px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  object-fit: cover;
  object-position: 25% 25%;
  clip-path: polygon(9% 0, 100% 0, 100% 100%, 0% 100%);
  transition: filter 0.3s linear;

  &.concluded {
    margin: 0;
  }
`

const EventConcluded = styled.div`
  margin-top: -30px;
  margin-bottom: -30px;
  margin-right: -40px;
  width: 530px;
  height: 130px;
  clip-path: polygon(9% 0, 100% 0, 100% 100%, 0% 100%);

  &:hover {
    ${ImageBanner} {    
      filter: blur(8px);
    }
    ${TextSpan} {
      opacity: 1;
    }
  }

`

const Grid = ({ events, setEvents, setOnEdit }) => {
  
  const { setBooleanState } = useEventContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        setOnEdit(null);
        setBooleanState(false);
        toast.success("Evento excluído com sucesso!");
      })
      .catch(({ data }) => toast.error(data));
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

            { item.concluded ? (
                <EventConcluded>
                  <ImageBanner className="concluded" src={"http://localhost:3030/" + item.banner} /> 
                  <TextSpan>EVENTO CONCLUÍDO</TextSpan>
                </EventConcluded> 
              ) :
              (
                <ImageBanner src={"http://localhost:3030/" + item.banner} /> 
              )
            }
          </WrapperContent>
          <WrapperFa> 
            <Fa className="fa">
              <FaEdit onClick={() => handleEdit(item)} />
            </Fa>
            <Fa className="fa">
            <FaTrash onClick={() => {
                openModal()
                setDeletingItemId(item._id);
              }} />
            </Fa>
          </WrapperFa>
        </EventContent>
      ))}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onConfirm={() => {
          handleDelete(deletingItemId);
          closeModal();
        }} 
      />
    </>
  );
};

export default Grid;

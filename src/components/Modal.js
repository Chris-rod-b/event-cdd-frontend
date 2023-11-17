import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: rgba(60,79,178, 1);
    padding: 20px;
    border-radius: 5px;
    max-width: 400px;
    width: 100%;
    text-align: center;
    color: #fff;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  &:nth-child(1) {
    background-color: rgba(246,191,12,255);
  }
`;

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Confirmar Exclusão</ModalTitle>
        <p>Tem certeza de que deseja excluir este evento?</p>
        <ModalButtons>
          <ModalButton onClick={onConfirm}>Confirmar</ModalButton>
          <ModalButton onClick={onClose}>Cancelar</ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

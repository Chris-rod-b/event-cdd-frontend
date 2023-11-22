import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import calenderFormat from "../util/calenderFormat";
import loadImageAsFile from "../util/loadImageAsFile";
import { useEventContext } from "../context/EventContext";

const FormContainer = styled.form`
    display: flex;
    max-width: 1100px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc4;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 25px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    &.date {
        width: 135px;
        cursor: pointer;
    }

    &.checkbox {
        width: 20px;
        margin: auto;
        cursor: pointer;
    }

    &.localizacao {
        width: 300px;
    }

    &.banner {
        display: none;
    }

    width: 200px;
    padding: 0 10px;
    border: 1px solid ${({ error }) => (error ? 'red' : '#bbb')};
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #f6bf0c;
    color: white;
    height: 42px;
    font-weight: bold;
    font-size: 15px;
    margin-left: 10px;

    &.banner {
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        background-color: transparent;
        border: 1px solid ${({ error }) => (error ? 'red' : '#bbb')};
        color: #8a898d;
        font-weight: lighter;
        max-width: 100%;
        width: 460px;
        height: 120px;
        transition: color 300ms ease-in-out, background-color 300ms ease-in-out;

        &:hover {
            color: #4c4c4f;
            background-color: #ccc;
        }

        &:active {
            color: black;
            background-color: #f6bf0c;
        }
    }
`;

const ImagePreview = styled.img`
    border-radius: 5px;
    width: 460px;
    height: 120px;
    object-fit: cover;
    object-position: 25% 25%;
    background-repeat: no-repeat;
    background-size: 100%;
`

/* const Switch = styled.div`
    width: 60px;
    height: 30px;
    background-color: #bbb;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    margin-left: 10px;

    &.on {
        transition: background-color 0.3s;
        background-color: #f6bf0c;
    }

    .lever {
        width: 30px;
        height: 30px;
        background-color: #f4f4f4;
        border-radius: 50%;
        position: absolute;
        top: 0;
        transition: transform 0.3s;
    }

    &.on .lever {
        transform: translateX(30px);
    }

`; */

const Form = ({ getEvents, onEdit, setOnEdit }) => {
    const ref = useRef();
    const hiddenFileInput = useRef(null);
    
    const [dataInicio, setDataInicio] = useState('');
    const [dataTermino, setDataTermino] = useState('');

    const [previousFileName, setPreviousFileName] = useState('');
    const [banner, setBanner] = useState(null);

    //const [toggleSwitch, setToggleSwitch] = useState(false); 

    const [errorFields, setErrorFields] = useState({
        nome: false,
        localizacao: false,
        data_inicio: false,
        data_termino: false,
        banner: false,
    });

    const { toggleBoolean } = useEventContext();

    useEffect(() => {
        const loadBanner = async () => {
            if (onEdit) {
                setErrorFields({
                    nome: false,
                    localizacao: false,
                    data_inicio: false,
                    data_termino: false,
                    banner: false,
                });

                const event = ref.current;
        
                event.nome.value = onEdit.name;
                event.localizacao.value = onEdit.location;
                event.data_inicio.value = calenderFormat(onEdit.startedDate);
                event.data_termino.value = calenderFormat(onEdit.endedDate);
                event.concluido.checked = onEdit.concluded;
        
                const bannerFile = await loadImageAsFile(
                    "http://localhost:3030/" + onEdit.banner, 
                    onEdit.banner.split('/')[1]
                );
                setPreviousFileName(onEdit.banner.split('/')[1])
                setBanner(bannerFile);
            }
        };  
        loadBanner();
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const event = ref.current;

        const newBannerUpload = event.banner.files[0];

        const requiredFields = ['nome', 'localizacao', 'data_inicio', 'data_termino'];

        const errors = {};

        requiredFields.forEach((field) => {
            if (!event[field].value) {
                errors[field] = true;
            }
        });
    
        if (!banner && !newBannerUpload) {
            errors['banner'] = true;
        } else {
            errors['banner'] = false;
        }

        setErrorFields(errors);

        if (Object.values(errors).some((error) => error)) {
            return toast.warn('Preencha os campos obrigatórios!');
        }

        let data = new FormData();
        data.append('name', event.nome.value);
        data.append('location', event.localizacao.value);
        data.append('startedDate', event.data_inicio.value);
        data.append('endedDate', event.data_termino.value);
        data.append('concluded', event.concluido.checked);
        data.append('previousFileName', previousFileName);
        data.append('banner', onEdit ? banner : newBannerUpload);

        try {
            if (onEdit) {
                await axios
                    .put("http://localhost:3030/api/events/" + onEdit._id, data)
                    .then(() => toast.success("Alteração realizada com sucesso!"))
                    .catch(({ data }) => toast.error(data));
            } else {
                await axios
                    .post("http://localhost:3030/api/events/create", data)
                    .then(() => toast.success("Evento cadastrado com sucesso!"))
                    .catch(({ data }) => toast.error(data));
            }
        } catch (e) {
            toast.error(e.response?.data || "Erro ao salvar o evento.");
        }

        event.nome.value = "";
        event.localizacao.value = "";
        event.data_inicio.value = "";
        event.data_termino.value = "";
        event.concluido.checked = false;

        setBanner(null)
        setOnEdit(null);
        toggleBoolean();
        getEvents();
    }

    const handleUploadBanner = () => {
        hiddenFileInput.current.click(); 
    }

    /* const handleSwitchChange = () => {
        setToggleSwitch(!toggleSwitch);
    };
    */
    
    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome do Evento</Label>
                <Input className="nome" name="nome" error={errorFields.nome} />
            </InputArea>
            <InputArea>
                <Label>Localização</Label>
                <Input className="localizacao" name="localizacao" error={errorFields.localizacao} />
            </InputArea>
            <InputArea>
                <Label>Data de Início</Label>
                <Input className="date" name="data_inicio" error={errorFields.data_inicio}
                    type="date" onChange={(e) => setDataInicio(e.target.value)}
                    max={dataTermino}
                />
            </InputArea>
            <InputArea>
                <Label>Data de Término</Label>
                <Input className="date" name="data_termino" error={errorFields.data_termino}
                    type="date" onChange={(e) => setDataTermino(e.target.value)}
                    min={dataInicio}     
                />
            </InputArea>
            { /* <InputArea>
                <Label>Evento de data única ?</Label>
                <Switch className={toggleSwitch ? 'on' : ''} onClick={handleSwitchChange}>
                    <div className="lever"></div>
                </Switch>
            </InputArea>
              */ }
            <InputArea>
                <Label>Concluído</Label>
                <Input className="checkbox" name="concluido" type="checkbox" />
            </InputArea>
            <InputArea>
                <Button type="button" className="banner" 
                        onClick={handleUploadBanner} error={errorFields.banner}>
                    { banner ?
                            <ImagePreview 
                                name="banner" 
                                src={URL.createObjectURL(banner)} 
                            /> 
                        :
                            <>
                                <FaUpload/> Carregue um banner
                            </>   }
                </Button>
                <Input 
                    type='file' className='banner' name="banner" accept="image/*" ref={hiddenFileInput} 
                    onChange={(event) => {
                        setBanner(event.target.files[0]);
                    }}
                />
            </InputArea>
            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
};

export default Form;

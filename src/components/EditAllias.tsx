import { useState, useContext, useEffect } from 'react';
import '../App.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, InputGroup } from 'react-bootstrap'
import { Context } from "../ContextProvider";
import ApiService from "../hooks/useApi";
import Block from '../assets/block.png'

import useFetchAllias from '../hooks/useFetchAllias.tsx';


function EditAllias() {
    const MySwal = withReactContent(Swal);

    const { useApi } = ApiService();
    const { nameRef, nameSelections } = useFetchAllias();
    const { setShowEdit } = useContext(Context);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const onSubmit = async (e: Event) => {
        e.preventDefault();
        if(key !== '' && value !== ''){ 
            const api = await useApi(`name/save`);
            const resp = await api.post({customName: { [key]: value }});
            if(resp.message === 'Data saved successfully!'){
                const processName = nameRef?.[Object.keys(resp.data)[0]] ?? `esp Client ${Object.keys(resp.data)[0]}`
                setShowEdit(false)
                setKey('');
                setValue('');
                return MySwal.fire({
                    title: resp.message,
                    text: `${processName} renamed to ${resp.data[Object.keys(resp.data)[0]]}`,
                    icon: 'success',
                    confirmButtonText: 'close',
                });
            }
        }
    }

    useEffect(() => {console.log(value, key)}, [value, key])

    const canRename = (): boolean => {
        if(key !== '' && value !== '') return true
        return false
    }

  return (
    <div className='mt-4'>
        <Form onSubmit={(e) => onSubmit(e as any)}>
        <InputGroup className="mb-3" >
            <Form.Select 
                value={key}
                onChange={(e) => setKey((e.target.value).replace('esp32 Client ', ''))}
                aria-label="select esp32 client" 
                style={{ fontSize: '0.8em' }}
            >
            <option value="" disabled selected style={{ fontSize: '0.8em', color: 'grey', fontStyle: 'italic'}}> select esp32 client </option>
                {
                    nameSelections && nameSelections.map((key) => <option key={key} value={key}>{nameRef?.[key] ? `${key} - ${nameRef?.[key]}`: `esp32 Client ${key}`}</option>)
                }
            </Form.Select>
            <Form.Control 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='rename' 
                aria-label="allias" 
                style={{ fontSize: '0.8em' }}
            />
        </InputGroup>
        <button disabled={key === '' || value === ''} type='submit' className='position-absolute bottom-0 end-0 m-4 border-1 border-dark-subtle rounded-2 px-5 py-1'>
            {!canRename() && <img src={Block} alt="block" width={'15px'}/>}
            rename
            </button>
        </Form>
    </div>
  )
}

export default EditAllias

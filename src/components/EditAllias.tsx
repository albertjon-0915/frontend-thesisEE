import { useContext } from 'react';
import '../App.css'
import { Form, InputGroup } from 'react-bootstrap'
import { Context } from "../ContextProvider";

import useFetchAllias from '../hooks/useFetchAllias.tsx';


function EditAllias() {
    const { nameRef } = useFetchAllias();
    const { setShowEdit } = useContext(Context);


// TODO: input text
// TODO: functionality
// TODO: add useState
// TODO: add dialog
// TODO: button logic
  return (
    <div className='mt-4'>
        <Form onSubmit={(e) => {e.preventDefault(); setShowEdit(false)}}>
        <InputGroup className="mb-3" >
            <Form.Select aria-label="select esp32 client" style={{ fontSize: '0.8em' }}>
            <option disabled selected style={{ fontSize: '0.8em', color: 'grey', fontStyle: 'italic'}}> select esp32 client </option>
                {
                    nameRef && Object.keys(nameRef).map((key) => <option key={key}>esp32 Client {key}</option>)
                }
            </Form.Select>
        <Form.Control placeholder='rename' aria-label="allias" style={{ fontSize: '0.8em' }}/>
        </InputGroup>
        <button type='submit' className=' position-absolute bottom-0 end-0 m-4 border-1 border-dark-subtle rounded-2 px-5 py-1'>rename</button>
        </Form>
    </div>
  )
}

export default EditAllias

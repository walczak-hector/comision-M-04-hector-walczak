import { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { traerDatosDeComentarioPorID } from './../utils/llamados.js';

const FormularioEditarComentario = (props) => {
    const { id, postId, usuario, token } = props;
    const url = 'http://localhost:3000/comentario';

    const [descripcion, setDescripcion] = useState('');
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();

    const cambiarDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const verificarDatos = async () => {
        let misErrores = {}
        
        if (descripcion.length === 0) {
            misErrores.descripcion = 'Debe introducir al menos una descripcion.';
        }

        setErrores(misErrores);

        if (Object.entries(misErrores).length === 0) {
            setDeshabilitarBoton(true);

            await mandarDatos();
        }
    }

    const mandarDatos = async () => {
        const datos = {
            id: id,
            descripcion: descripcion,
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.put(url, datos, { headers: headers });

            if (respuesta.status === 200) {
                return navigate(`/ver/${postId}`);
            } else {
                setErrores({ error: 'Ocurrió un error inesperado' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado' });
        }

        setDeshabilitarBoton(false);
    }

    const traerDatos = async () => {
        if (usuario) {
            const respuesta = await traerDatosDeComentarioPorID(id);
            if (respuesta) {
                if (usuario.id !== respuesta.autor) {
                    return navigate(`/ver/${postId}`);
                }
                setDescripcion(respuesta.description);
            } else {
                setErrores({ error: 'Ocurrió un error inesperado. No se pudo obtener el comentario' });
                setDeshabilitarBoton(true);
            }
        } else {
            return navigate(`/ver/${postId}`);
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Descripción
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarDescripcion} defaultValue={descripcion} />
                    {
                        errores.descripcion && (
                            <span style={{ color: 'red' }}>
                                {errores.descripcion}
                            </span>
                        )
                    }
                </Col>
            </Form.Group>

            {
                errores.error && (
                    <Alert variant="warning">
                        {errores.error}
                    </Alert>
                )
            }

            <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>
                Editar Comentario
            </Button>
        </Form>
    );
}

export default FormularioEditarComentario;
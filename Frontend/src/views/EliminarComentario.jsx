import { useState } from 'react';
import { Card } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from 'axios';

const EliminarComentario = () => {
    const [error, setError] = useState(false);
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const location = useLocation();
    const postId = location.state ? location.state.postId : null;

    const volver = () => {
        navigate(`/ver/${postId}`);
    }

    const eliminar = async () => {
        setError(false);
        setDeshabilitarBoton(true);

        try {
            const url = 'http://localhost:3000/comentario';
            const respuesta = await axios.delete(url, { data: { id: id } });

            if (respuesta.status === 200) {
                return navigate(`/ver/${postId}`);
            } else {
                setError('Ocurrió un error inesperado');
            }
        } catch (error) {
            setError('Ocurrió un error inesperado');
        }

        setDeshabilitarBoton(false);
    }

    return (
        <Card.Body>
            <Alert variant="warning">
                ¿Está seguro que desea eliminar el comentario con ID {id}?
            </Alert>

            {
                error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )
            }

            <ButtonGroup>
                <Button variant="primary" onClick={volver} disabled={deshabilitarBoton}>
                    Volver
                </Button>
                <Button variant="danger" onClick={eliminar} disabled={deshabilitarBoton}>
                    Eliminar
                </Button>
            </ButtonGroup>
        </Card.Body>
    )
}

export default EliminarComentario

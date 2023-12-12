import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const FormularioRegistrarUsuario = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatarURL, setAvatar] = useState('');
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();

    const cambiarUsuario = (e) => {
        setUser(e.target.value);
    }

    const cambiarPassword = (e) => {
        setPassword(e.target.value);
    }

    const cambiarEmail = (e) => {
        setEmail(e.target.value);
    }

    const cambiarAvatar = (e) => {
        setAvatar(e.target.value);
    }

    const verificarDatos = async () => {
        let misErrores = {}

        if (user.length === 0) {
            misErrores.user = 'Debe introducir un usuario.';
        }

        if (password.length === 0) {
            misErrores.password = 'Debe introducir una contraseña.';
        }

        if (email.length === 0) {
            misErrores.email = 'Debe introducir un email.';
        }
        
        if (avatarURL.length === 0) {
            misErrores.avatarURL = 'Debe introducir una URL para el avatar.';
        }

        setErrores(misErrores);

        if (Object.entries(misErrores).length === 0) {
            setDeshabilitarBoton(true);

            await mandarDatos();
        }
    }

    const mandarDatos = async () => {
        const url = 'http://localhost:3000/usuario';

        const datos = {
            username: user,
            password: password,
            email: email,
            avatarURL: avatarURL,
        }

        try {
            const respuesta = await axios.post(url, datos);

            if (respuesta.status === 200) {
                return navigate('/');
            } else {
                setErrores({ error: 'Ocurrió un error inesperado' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado' });
        }

        setDeshabilitarBoton(false);
    }

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Usuario
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarUsuario} />
                    {
                        errores.user && (
                            <span style={{ color: 'red' }}>
                                {errores.user}
                            </span>
                        )
                    }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Contraseña
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" onInput={cambiarPassword} />
                    {
                        errores.password && (
                            <span style={{ color: 'red' }}>
                                {errores.password}
                            </span>
                        )
                    }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    E-mail
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="email" onInput={cambiarEmail} />
                    {
                        errores.email && (
                            <span style={{ color: 'red' }}>
                                {errores.email}
                            </span>
                        )
                    }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Avatar URL
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarAvatar} />
                    {
                        errores.avatarURL && (
                            <span style={{ color: 'red' }}>
                                {errores.avatarURL}
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
                Registrar usuario
            </Button>
        </Form>
    );
}

export default FormularioRegistrarUsuario;

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";

const TablaDeDatos = (props) => {
    const { lista, usuario } = props;

    const navigate = useNavigate();

    const ver = (id) => {
        navigate('/ver/' + id);
    }

    const editar = (id) => {
        navigate('/editar/' + id);
    }

    const eliminar = (id) => {
        navigate('/eliminar/' + id);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>

                {
                    lista.map((item, key) => (
                        <tr key={key}>
                            <td>{ key + 1 }</td>
                            <td>{ item.title }</td>
                            <td>{ item.autor.username + ' ' + item.autor.email }</td>
                            <td>
                                <ButtonGroup style={{ maxWidth: '30px' }}>
                                    <Button variant="success" onClick={() => ver(item.id)}>
                                        Ver
                                    </Button>
                                    
                                    {
                                        usuario && (usuario.id === item.autor.id) && (
                                            <>
                                                <Button variant="primary" onClick={() => editar(item.id)}>
                                                    Editar
                                                </Button>
                                                <Button variant="danger" onClick={() => eliminar(item.id)}>
                                                    Eliminar
                                                </Button>
                                            </>
                                        )
                                    }
                                    
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </Table>
    );
}

export default TablaDeDatos;
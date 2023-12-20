import { Card } from 'react-bootstrap';
import { useParams, useLocation } from "react-router-dom";

import { useAuthContext } from '../context/AuthContext';

import FormularioEditar from '../components/FormularioEditarComentario';

const EditarComentario = () => {
  const { id } = useParams();

  const { token, usuario } = useAuthContext();

  const location = useLocation();
  const postId = new URLSearchParams(location.search).get('postId');

  return (
    <Card.Body>
      <FormularioEditar id={id} postId={postId} token={token} usuario={usuario} />
      
    </Card.Body>
  )
}

export default EditarComentario
